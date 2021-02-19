<?php
// +----------------------------------------------------------------------
// | travel_manage [ THE PROJECT NAME IS travel_manage ]
// +----------------------------------------------------------------------
// | FileName: Banner.php
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

class Menu extends AuthenticTable
{
    use SoftDeletes;
    use Notifiable;
    /**
     * @var string
     */
    protected $table = 'menu';
    /**
     * @var array
     */
    protected $fillable = [
        'uuid',
        'title',
        'url',
        'is_show',
        'wxapp_id',
        'orders',
        'position'
    ];

    public static function boot()
    {
        parent::boot();
        static::addGlobalScope(new WxAppId());
    }
}