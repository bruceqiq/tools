<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_manage [ THE PROJECT NAME IS tools_manage ]
// +----------------------------------------------------------------------
// | FileName: SiteCategory.php
// +----------------------------------------------------------------------
// | Function: 站点分类
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Models\Admin\Site;

use App\Scopes\WxAppId;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as AuthenticTable;
use Illuminate\Notifications\Notifiable;

class Site extends AuthenticTable
{
    use Notifiable;
    use SoftDeletes;

    protected $table = 'site';

    protected $fillable = [
        'uuid',
        'title',
        'orders',
        'site_category_id',
        'content',
        'collection',
        'author',
        'source',
        'desc',
        'cover',
        'is_show',
        'wxapp_id',
    ];

    public function cate()
    {
        return $this->belongsTo(SiteCategory::class, 'site_category_uuid', 'uuid');
    }

    public static function boot()
    {
        parent::boot();
        static::addGlobalScope(new WxAppId());
    }
}