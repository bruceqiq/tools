<?php

declare (strict_types=1);

namespace App\Model\Common;

use App\Scopes\WxAppIdSearchScope;
use Hyperf\Database\Model\SoftDeletes;
use Hyperf\DbConnection\Db;
use Hyperf\DbConnection\Model\Model;

/**
 * @property int $id
 * @property string $uuid
 * @property string $title
 * @property string $author
 * @property string $description
 * @property string $cover
 * @property string $content
 * @property int $reading_score
 * @property int $share_score
 * @property int $click_score
 * @property int $collection_score
 * @property int $is_show
 * @property int $is_top
 * @property int $is_hot
 * @property int $orders
 * @property string $publish_time
 * @property int $reading
 * @property int $click
 * @property int $share
 * @property int $collection
 * @property int $oppose
 * @property int $wxapp_id
 * @property string $created_time
 * @property string $updated_time
 * @property string $deleted_at
 * @property string $keywords
 */
class Article extends Model
{
    use SoftDeletes;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'article';
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
        'reading_score'    => 'integer',
        'share_score'      => 'integer',
        'click_score'      => 'integer',
        'collection_score' => 'integer',
        'is_show'          => 'integer',
        'is_top'           => 'integer',
        'is_hot'           => 'integer',
        'orders'           => 'integer',
        'reading'          => 'integer',
        'click'            => 'integer',
        'share'            => 'integer',
        'collection'       => 'integer',
        'oppose'           => 'integer',
        'wxapp_id'         => 'integer',
        'created_at'       => 'string',
        'updated_at'       => 'string'
    ];

    public function category()
    {
        return $this->belongsToMany(ArticleCategory::class, 'article_category_relation', 'article_uuid',
            'article_category_uuid', 'uuid', 'uuid');
    }

    protected function boot(): void
    {
        static::addGlobalScope(new WxAppIdSearchScope());
        parent::boot();
    }

    /**
     * article
     * @param int $perSize
     * @param int $categoryId
     * @return array
     */
    public function article(int $perSize, int $categoryId, array $searchWhere = []): array
    {
        $uuidArray   = ArticleCategoryRelation::query()->where('article_category_uuid', '=', $categoryId)->select(['article_uuid'])->get()->toArray();
        $articleUuId = array_column($uuidArray, 'article_uuid');
        $searchField = [
            'uuid as id',
            'title',
            'cover',
            'description',
            'is_top',
            'author',
            'reading',
            'created_at',
            'publish_time',
            'is_hot',
            'second_title',
        ];
        $items       = Article::query()->whereIn('uuid', $articleUuId)->where($searchWhere)->select($searchField)->paginate($perSize);
        return [
            'items' => $items->items(),
            'total' => $items->total(),
            'page'  => $items->currentPage(),
            'size'  => $perSize,
        ];
    }

    /**
     * article-detail
     * @param int $articleId
     * @return array
     */
    public function detail(int $articleId): array
    {
        return Article::query()
            ->where('uuid', '=', $articleId)
            ->select([
                'uuid as id',
                'author',
                'title',
                'description',
                'publish_time',
                'collection',
                'reading',
                'click',
                'share',
                'content',
                'created_at',
                'second_title',
            ])
            ->first()
            ->toArray();
    }

    /**
     * add article-click history
     * @param string $articleUid
     * @param int $userId
     * @return bool
     */
    public function click(string $articleUid, int $userId): bool
    {
        // 1.increment article click num.
        // 2.create user click-history of the article.
        $returnVal = false;
        Db::beginTransaction();
        try {
            $createHistory = UserArticleClick::query()->firstOrNew(['article_uuid' => $articleUid, 'user_id' => $userId],
                ['article_uuid' => $articleUid, 'user_id' => $userId, 'wxapp_id' => 1]);
            $create        = $createHistory->save();
            $increClick    = Article::query()->where('uuid', '=', $articleUid)->increment('click', 1);
            var_dump($create, $increClick);
            if ($create && $increClick) {
                Db::commit();
                $returnVal = true;
            } else {
                Db::rollBack();
            }
        } catch (\Exception $exception) {
            Db::rollBack();
        }

        return $returnVal;
    }

    /**
     * add article-read history
     * @param string $articleUid
     * @param int $userId
     * @return bool
     */
    public function read(string $articleUid, int $userId): bool
    {
        // 1.increment article read num.
        // 2.create user read-history of the article.
        $returnVal = false;
        Db::beginTransaction();
        try {
            $createHistory = UserArticleRead::query()->firstOrNew(['article_uuid' => $articleUid, 'user_id' => $userId],
                ['article_uuid' => $articleUid, 'user_id' => $userId]);
            $create        = $createHistory->save();
            $increRead     = Article::query()->where('uuid', '=', $articleUid)->increment('reading', 1);
            if ($create && $increRead) {
                Db::commit();
                $returnVal = true;
            } else {
                Db::rollBack();
            }
        } catch (\Exception $exception) {
            Db::rollBack();
        }

        return $returnVal;
    }

    public function getPublishTimeAttribute($key)
    {
        return empty($key) ? date('Y-m-d', strtotime($this->getAttribute('created_at'))) : $key;
    }

    public function getCoverAttribute($key)
    {
        return env('QINIU_URI') . '/' . $key;
    }


}