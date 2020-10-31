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

use App\Filter\Admin\SettingFilter;
use App\Scopes\WxAppId;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as AuthenticTable;

class Setting extends AuthenticTable
{
    use SoftDeletes;
    use Notifiable;
    /**
     * @var string
     */
    protected $table = 'setting';


    public static function boot()
    {
        parent::boot();
        static::addGlobalScope(new WxAppId());
    }

    /**
     * 获取系统参数配置
     * @param string $key 配置键
     * @return array
     */
    public function list(string $key): array
    {
        $item = Setting::query()->where('key', '=', $key)->select(["*"])->get();
        if (!empty($item)) {
            return SettingFilter::list((array)$item->toArray());
        } else {
            return [];
        }
    }
}