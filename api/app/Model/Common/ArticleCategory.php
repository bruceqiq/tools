<?php

declare (strict_types=1);

namespace App\Model\Common;

use App\Scopes\WxAppIdSearchScope;
use Hyperf\Database\Model\SoftDeletes;
use Hyperf\DbConnection\Model\Model;

/**
 * @property int $id
 * @property string $uuid
 * @property string $name
 * @property int $orders
 * @property int $is_show
 * @property string $deleted_at
 * @property int $wxapp_id
 * @property int $created_time
 * @property int $updated_time
 */
class ArticleCategory extends Model
{
    use SoftDeletes;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'article_category';
    /**
     * softDelete
     * @var string
     */
    protected $dateFormat = "U";
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
        'id'           => 'string',
        'orders'       => 'integer',
        'is_show'      => 'integer',
        'wxapp_id'     => 'integer',
        'created_time' => 'integer',
        'updated_time' => 'integer'
    ];

    protected function boot(): void
    {
        static::addGlobalScope(new WxAppIdSearchScope());
        parent::boot();
    }

    /**
     * articel-category
     * @param int $perSize
     * @return array
     */
    public function category(int $perSize): array
    {
        $items = ArticleCategory::query()
            ->orderBy('orders', 'desc')
            ->select(['name as title', 'uuid as id'])
            ->paginate($perSize);

        return [
            'items' => $items->items(),
            'total' => $items->total(),
            'size'  => $perSize,
            'page'  => $items->currentPage(),
        ];
    }
}