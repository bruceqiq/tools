<?php

declare (strict_types=1);

namespace App\Model\Common;

use App\Scopes\WxAppIdSearchScope;
use Hyperf\Database\Model\SoftDeletes;
use Hyperf\DbConnection\Model\Model;

/**
 * @property int $id
 * @property string $uuid
 * @property string $title
 * @property string $cover
 * @property string $url
 * @property string $source
 * @property int $play_number
 * @property string $video_time
 * @property int $is_top
 * @property int $is_show
 * @property int $wxapp_id
 * @property int $orders
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 */
class Video extends Model
{
    use SoftDeletes;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'video';
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
        'id'          => 'string',
        'play_number' => 'integer',
        'is_top'      => 'integer',
        'is_show'     => 'integer',
        'wxapp_id'    => 'integer',
        'orders'      => 'integer',
        'created_at'  => 'datetime',
        'updated_at'  => 'datetime',
    ];

    protected function boot(): void
    {
        static::addGlobalScope(new WxAppIdSearchScope());
        parent::boot();
    }

    /**
     * 查询视频
     * @param int $page 当前页
     * @param int $size 分页大小
     * @return array
     */
    public function videoSelect(int $page, int $size, array $searchWhere): array
    {
        $items = Video::query()->where($searchWhere)->select(['uuid as id', 'play_number', 'url', 'cover', 'video_time', 'source', 'title'])->paginate($size);

        return [
            'items' => $items->items(),
            'total' => $items->total(),
            'page'  => $items->currentPage(),
            'size'  => $size,
        ];
    }

    public function getCoverAttribute($key)
    {
        return env('QINIU_URI') . '/' . $key;
    }
}