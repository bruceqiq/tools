<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_manage [ THE PROJECT NAME IS tools_manage ]
// +----------------------------------------------------------------------
// | FileName: Video.php
// +----------------------------------------------------------------------
// | Function: 视频管理
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Models\Admin\Video;

use App\Scopes\WxAppId;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as AuthenticTable;

class Video extends AuthenticTable
{
    use SoftDeletes;
    use Notifiable;
    /**
     * @var string
     */
    protected $table = 'video';
    /**
     * @var array
     */
    protected $fillable = [
        'uuid',
        'title',
        'cover',
        'url',
        'is_show',
        'is_top',
        'wxapp_id',
        'orders',
        'source',
        'play_number',
        'video_time',
    ];

    public static function boot()
    {
        parent::boot();
        static::addGlobalScope(new WxAppId());
    }
}