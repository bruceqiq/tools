<?php
// +----------------------------------------------------------------------
// | park_server [ THE PROJECT NAME IS park_server ]
// +----------------------------------------------------------------------
// | FileName: User.php
// +----------------------------------------------------------------------
// | Function: 微信用户
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Models\Admin;

use App\Scopes\WxAppId;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as AuthenticTable;

class User extends AuthenticTable
{
    use Notifiable;

    protected $table = 'user';

    protected $primaryKey = 'user_id';


    public static function boot()
    {
        static::addGlobalScope(new WxAppId());
        parent::boot();
    }
}