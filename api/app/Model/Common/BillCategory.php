<?php

declare (strict_types=1);

namespace App\Model\Common;

use App\Model\CommonModel;

/**
 * @property int $id
 * @property string $uuid
 * @property int $type
 * @property string $name
 * @property int $parent_id
 * @property string $remark
 * @property int $wxapp_id
 * @property int $is_show
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 */
class BillCategory extends CommonModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'bill_category';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'         => 'integer',
        'type'       => 'integer',
        'parent_id'  => 'integer',
        'wxapp_id'   => 'integer',
        'is_show'    => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function list(): array
    {
        // 收入
        $secondIncomeItems = BillCategory::query()->where([['type', '=', 1], ['parent_id', '=', 0]])->get(['id', 'name']);
        $thirdIncomeItems  = BillCategory::query()->where([['type', '=', 1], ['parent_id', '<>', 0]])->get(['id', 'uuid', 'parent_id', 'name']);
        foreach ($secondIncomeItems as $val) {
            $array = [];
            $i     = 0;
            foreach ($thirdIncomeItems as $k => $v) {
                if ($val->id == $v->parent_id) {
                    $array[$i] = $v;
                    ++$i;
                }
            }
            $val->product = $array;
        }
        // 支出
        $secondExpendItems = BillCategory::query()->where([['type', '=', 2], ['parent_id', '=', 0]])->get(['id', 'name']);
        $thirdExpendItems  = BillCategory::query()->where([['type', '=', 2], ['parent_id', '<>', 0]])->get(['id', 'uuid', 'parent_id', 'name']);
        foreach ($secondExpendItems as $val) {
            $array = [];
            $i     = 0;
            foreach ($thirdExpendItems as $k => $v) {
                if ($val->id == $v->parent_id) {
                    $array[$i] = $v;
                    ++$i;
                }
            }
            $val->product = $array;
        }

        return [
            ['id' => 0, 'name' => '支出', 'dept' => $secondExpendItems],
            ['id' => 1, 'name' => '收入', 'dept' => $secondIncomeItems]
        ];
    }

    public function getCoverAttribute($key)
    {
        return env('QINIU_URI') . '/' . $key;
    }
}