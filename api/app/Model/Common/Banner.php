<?php

declare (strict_types=1);

namespace App\Model\Common;

use App\Exception\DBException;
use Hyperf\Database\Model\SoftDeletes;
use Hyperf\DbConnection\Model\Model;
use Throwable;

/**
 * @property int $id
 * @property string $uuid
 * @property string $title
 * @property string $cover
 * @property int $orders
 * @property string $url
 * @property int $position
 * @property int $is_show
 * @property int $wxapp_id
 * @property string $created_at
 * @property string $updated_at
 * @property string $deleted_at
 */
class Banner extends Model
{
    use SoftDeletes;
    protected $dateFormat = "U";
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'banner';
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
        'orders'     => 'integer',
        'position'   => 'integer',
        'is_show'    => 'integer',
        'wxapp_id'   => 'integer',
        'created_at' => 'string',
        'updated_at' => 'string'
    ];

    /**
     * banner
     * @param int $perSize
     * @param int $position
     * @return array
     */
    public function banner(int $perSize, int $position): array
    {
        try {
            $items = Banner::query()
                ->where([['position', '=', $position], ['is_show', '=', 1]])
                ->select(['title', 'cover', 'url'])
                ->orderBy('orders', 'desc')
                ->paginate($perSize);
        } catch (Throwable $throwable) {
            throw  new DBException($throwable->getMessage(), 500);
        }

        return [
            'items' => $items->items(),
            'total' => $items->total(),
            'page'  => $items->currentPage(),
            'size'  => $perSize,
        ];
    }

    public function getCoverAttribute($key)
    {
        return env('QINIU_URI') . '/' . $key;
    }
}