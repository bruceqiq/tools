<?php

declare(strict_types=1);

namespace App\Model\Common;

use App\Model\CommonModel;

/**
 * @property int $id
 * @property string $bill_category_uuid
 * @property int $type
 * @property string $uuid
 * @property float $money
 * @property string $transaction_date
 * @property string $remark
 * @property int $user_id
 * @property int $wxapp_id
 * @property int $is_show
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 */
class Bill extends CommonModel
{
    protected $table = 'bill';


    protected $fillable = [
        'type',
        'money',
        'user_id',
        'wxapp_id',
        'transaction_date',
        'remark',
        'uuid',
        'bill_category_uuid',
        'bill_tag_uuid',
    ];

    protected $casts = [
        'id'         => 'integer',
        'type'       => 'integer',
        'money'      => 'string',
        'user_id'    => 'integer',
        'wxapp_id'   => 'integer',
        'is_show'    => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function category()
    {
        return $this->belongsTo(BillCategory::class, 'bill_category_uuid', 'uuid');
    }

    public function tag()
    {
        return $this->belongsTo(BillTag::class, 'bill_tag_uuid', 'uuid');
    }

    public function billCreate(array $billInfo): bool
    {
        if (Bill::query()->create($billInfo)) {
            return true;
        }

        return false;
    }

    public function billUpdate(array $billInfo, int $userId, int $id): bool
    {
        if (Bill::query()->where([['user_id', '=', $userId], ['id', '=', $id]])->update($billInfo)) {
            return true;
        }

        return false;

    }

    public function list(int $size, int $userId, array $searchWhere): array
    {
        $dateGroup = Bill::query()->select(['transaction_date'])
            ->where($searchWhere)->groupBy(['transaction_date'])
            ->orderByDesc('transaction_date')
            ->paginate($size);

        // 当前总支出
        $incomeMoney = Bill::query()->where([['type', '=', 1], ['user_id', '=', $userId]])
            ->where($searchWhere)
            ->sum('money');
        // 当前总收入
        $expendMoney = Bill::query()->where([['type', '=', 2], ['user_id', '=', $userId]])
            ->where($searchWhere)
            ->sum('money');
        $items       = $dateGroup->items();
        $returnData  = [
            'items'        => $items,
            'total'        => $dateGroup->total(),
            'page'         => $dateGroup->currentPage(),
            'size'         => $size,
            'income_money' => $incomeMoney,
            'expend_money' => $expendMoney,
        ];
        if (!empty($items)) {
            $maxDate            = $items[0]->transaction_date;
            $minDate            = $items[count($items) - 1]->transaction_date;
            $itemsChildrenItems = Bill::query()->with(['category:id,name,uuid,cover', 'tag:id,name,uuid,cover'])
                ->where([['user_id', '=', $userId], ['transaction_date', '>=', $minDate], ['transaction_date', '<=', $maxDate]])
                ->where($searchWhere)
                ->orderByDesc('transaction_date')
                ->get(['id', 'uuid', 'user_id', 'money', 'type', 'remark', 'transaction_date', 'bill_category_uuid', 'bill_tag_uuid']);
            $listArray          = [];
            foreach ($items as $key => $value) {
                $list                                = [];
                $i                                   = 0;
                $incomeTotalMoney                    = 0.00;
                $expendTotalMoney                    = 0.00;
                $listArray[$key]['transaction_date'] = $value->transaction_date;
                foreach ($itemsChildrenItems as $v) {
                    // 按照日期分组
                    if ($value->transaction_date == $v->transaction_date) {
                        $list[$i] = $v;
                        ++$i;
                        // 处理日期总支出与总收入
                        if ($v->type == 1) {
                            $incomeTotalMoney += $v->money;
                        } else {
                            $expendTotalMoney += $v->money;
                        }
                    }
                }
                $listArray[$key]['income_total_money'] = sprintf('%01.2f', $incomeTotalMoney);
                $listArray[$key]['expend_total_money'] = sprintf('%01.2f', $expendTotalMoney);
                $listArray[$key]['list']               = $list;
            }
            $returnData['items'] = $listArray;
        }

        return $returnData;
    }

    public function detail(int $userId, int $id): array
    {
        $bean = Bill::query()->with(['category:id,name,uuid,cover', 'tag:id,name,uuid,cover'])
            ->where([['user_id', '=', $userId], ['id', '=', $id]])
            ->orderByDesc('transaction_date')
            ->first(['id', 'uuid', 'user_id', 'money', 'type', 'remark', 'transaction_date', 'bill_category_uuid', 'bill_tag_uuid', 'created_at', 'updated_at']);

        return !empty($bean) ? $bean->toArray() : [];
    }

    public function del(int $userId, int $id): int
    {
        return Bill::query()->where([['user_id', '=', $userId], ['id', '=', $id]])->delete();
    }
}
