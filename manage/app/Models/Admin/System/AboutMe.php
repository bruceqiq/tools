<?php
// +----------------------------------------------------------------------
// | travel_manage [ THE PROJECT NAME IS travel_manage ]
// +----------------------------------------------------------------------
// | FileName: AboutMe.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Models\Admin\System;

use App\Scopes\WxAppId;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as AuthenticTable;

class AboutMe extends AuthenticTable
{
    use SoftDeletes;
    use Notifiable;
    /**
     * @var string
     */
    protected $table = 'about_me';
    /**
     * @var array
     */
    protected $fillable = [
        'uuid',
        'is_show',
        'wxapp_id',
        'content',
    ];

    public static function boot()
    {
        parent::boot();
        static::addGlobalScope(new WxAppId());
    }

}