<?php
// +----------------------------------------------------------------------
// | park_server [ THE PROJECT NAME IS park_server ]
// +----------------------------------------------------------------------
// | FileName: Article.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Models\Admin\Article;

use App\Scopes\WxAppId;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as AuthenticTable;
use Illuminate\Notifications\Notifiable;

class Article extends AuthenticTable
{
    use Notifiable;
    use SoftDeletes;

    protected $table = 'article';

    protected $fillable = [
        'uuid',
        'title',
        'author',
        'description',
        'cover',
        'content',
        'reading_score',
        'click_score',
        'share_score',
        'collection_score',
        'reading',
        'click',
        'share',
        'collection',
        'oppose',
        'is_show',
        'is_top',
        'is_hot',
        'orders',
        'publish_time',
        'wxapp_id'
    ];

    public function category()
    {
        return $this->hasOne(ArticleCategoryRelation::class, 'article_uuid', 'uuid');
    }

    public function getKeywordsAttribute($key): array
    {
        $str = [];
        if (!empty($key)) {
            $str = explode(',', $key);
        }
        return $str;
    }

    public static function boot()
    {
        static::addGlobalScope(new WxAppId());
        parent::boot();
    }

}