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
 * @property string $url
 * @property int $position
 * @property int $orders
 * @property string $img
 * @property string $key
 * @property string $type
 * @property int $is_show
 * @property int $wxapp_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 */
class Menu extends Model
{
    use SoftDeletes;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'menu';
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
        'position'   => 'integer',
        'orders'     => 'integer',
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
     * 查询菜单
     * @param int $position 显示位置
     * @return \Hyperf\Database\Model\Builder[]|\Hyperf\Database\Model\Collection
     */
    public function menuSelect(int $position)
    {
        $items = Menu::query()->select(['title', 'url', 'img', 'key', 'type'])->where([['position', '=', $position]])->orderByDesc('orders')->paginate(100);

        return $items->items();
    }

    public function getImgAttribute($key)
    {
        return env('QINIU_URI') . '/' . $key;
    }

    public function getKeyAttribute($key)
    {
        return (empty($key) || $key == null) ? '' : $key;
    }

    public function getTypeAttribute($key)
    {
        return (empty($key) || $key == null) ? '' : $key;
    }

    public function getUrlAttribute($key)
    {
        return (empty($key) || $key == null) ? '' : $key;
    }
}