<?php

declare (strict_types=1);

namespace App\Model\Common;

use App\Model\CommonModel;

/**
 * @property int $id
 * @property string $uuid
 * @property string $name
 * @property string $remark
 * @property int $wxapp_id
 * @property int $is_show
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 */
class BillTag extends CommonModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'bill_tag';
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
        'id'         => 'string',
        'wxapp_id'   => 'integer',
        'is_show'    => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    public function list(): array
    {
        $items = BillTag::query()->get(['uuid as id', 'name']);

        if (!empty($items)) {
            $lists = $items->toArray();
            return [
                'list' => $lists,
                'item' => array_column($lists, 'name'),
            ];
        }

        return [];
    }

    public function getCoverAttribute($key)
    {
        return env('QINIU_URI') . '/' . $key;
    }

}