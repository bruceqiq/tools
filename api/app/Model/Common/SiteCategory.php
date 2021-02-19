<?php

declare (strict_types=1);

namespace App\Model\Common;

use App\Scopes\WxAppIdSearchScope;
use Hyperf\DbConnection\Model\Model;

/**
 * @property int $id
 * @property string $uuid
 * @property string $title
 * @property int $orders
 * @property int $parent_id
 * @property string $cover
 * @property int $is_show
 * @property int $wxapp_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 */
class SiteCategory extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'site_category';
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
        'orders'     => 'integer',
        'parent_id'  => 'integer',
        'is_show'    => 'integer',
        'wxapp_id'   => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    protected function boot(): void
    {
        static::addGlobalScope(new WxAppIdSearchScope());
        parent::boot();
    }

    /**
     * 查询站点分类
     * @return array
     */
    public function siteCategorySelect(): array
    {
        $firstCategory = self::query()->where('parent_id', '=', 0)->select(['id', 'title'])->get()->toArray();
        foreach ($firstCategory as $key => $value) {
            $firstCategory[$key]['children'] = self::query()->where('parent_id', '=', $value['id'])->select(['title', 'cover', 'uuid as id'])->get();
        }

        return $firstCategory;
    }

    public function getCoverAttribute($key)
    {
        return config('data.qiniu_http_url') . '/' . $key;
    }
}