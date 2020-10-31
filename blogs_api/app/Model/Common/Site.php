<?php

declare (strict_types=1);

namespace App\Model\Common;

use App\Scopes\WxAppIdSearchScope;
use Hyperf\DbConnection\Model\Model;

/**
 * @property int $id
 * @property string $uuid
 * @property string $title
 * @property string $desc
 * @property string $content
 * @property int $orders
 * @property int $collection
 * @property string $author
 * @property string $source
 * @property int $is_show
 * @property int $wxapp_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 * @property string $cover
 * @property string site_url
 * @property int $site_category_id
 */
class Site extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'site';
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
        'id'               => 'string',
        'orders'           => 'integer',
        'collection'       => 'integer',
        'is_show'          => 'integer',
        'wxapp_id'         => 'integer',
        'created_at'       => 'datetime',
        'updated_at'       => 'datetime',
        'site_category_id' => 'integer'
    ];

    protected function boot(): void
    {
        static::addGlobalScope((new WxAppIdSearchScope()));
        parent::boot();
    }

    /**
     * 查询站点列表
     * @param int $page
     * @param int $perSize
     * @param string $title
     * @param string $categoryUuid
     * @return array
     */
    public function siteSelect(int $page, int $perSize, string $title, string $categoryUuid): array
    {
        $items = self::query()->where([['site_category_uuid', '=', $categoryUuid], ['title', 'like', '%' . $title . '%']])->select([
            'uuid as id',
            'title',
            'desc',
            'author',
            'source',
            'cover',
            'collection',
            'site_url',
            'created_at',
        ])->orderByDesc('orders')->paginate($perSize);

        return [
            'items' => $items->items(),
            'total' => $items->total(),
            'page'  => $page,
            'size'  => $perSize,
        ];
    }

    /**
     * 站点详情
     * @param array $searchWhere 查询条件
     * @return array
     */
    public function detail(array $searchWhere): array
    {
        $item = self::query()->where($searchWhere)->select(['content', 'public_is_show', 'public_cover', 'public_number', 'public_name'])->first();
        if (!empty($item)) {
            return $item->toArray();
        } else {
            return [];
        }
    }

    public function getCoverAttribute($key)
    {
        return config('data.qiniu_http_url') . '/' . $key;
    }

    public function getCreatedAtAttribute($key)
    {
        return date('Y-m-d', strtotime($key));
    }
}