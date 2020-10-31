<?php
// +----------------------------------------------------------------------
// | park_server [ THE PROJECT NAME IS park_server ]
// +----------------------------------------------------------------------
// | FileName: UserAuthContoller.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Admin\Controllers;


use Encore\Admin\Facades\Admin;

class UserAuthController
{
    public static function getUserInfo(): array
    {
        return Admin::user()->toArray();
    }

    public static function getUserId(): int
    {
        return Admin::user()->id;
    }

    public static function getUserRole(): array
    {
        return Admin::user()->roles->toArray();
    }

    public static function getWxAppId(): int
    {
        return Admin::user()->wxapp_id;
    }
}