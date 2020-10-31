<?php

declare (strict_types=1);

namespace App\Model\Common;

use Hyperf\Database\Model\SoftDeletes;
use Hyperf\DbConnection\Model\Model;

/**
 * @property int $id
 * @property string $uuid
 * @property int $wxapp_id
 * @property string $title
 * @property int $position
 * @property int $is_show
 * @property int $orders
 * @property string $created_at
 * @property string $updated_at
 * @property string $deleted_at
 */
class Notice extends Model
{
    use SoftDeletes;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'notice';
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
        'wxapp_id'   => 'integer',
        'position'   => 'integer',
        'is_show'    => 'integer',
        'orders'     => 'integer',
        'created_at' => 'string',
        'updated_at' => 'string'
    ];

    /**
     * @param int $position
     * @return array
     */
    public function notice(int $position): array
    {
        $items = Notice::query()->where([['position', '=', $position], ['is_show', '=', 1]])
            ->orderBy('orders', 'desc')
            ->select(['title'])
            ->get()
            ->toArray();

        return $items;
    }
}