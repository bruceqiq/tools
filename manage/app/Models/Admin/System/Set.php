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

class Set extends AuthenticTable
{
    use SoftDeletes;
    use Notifiable;
    /**
     * @var string
     */
    protected $table = 'setting';
    /**
     * @var array
     */
    protected $fillable = [
        'key',
        'describe',
        'values',
        'wxapp_id',
        'created_at',
        'updated_at',
        'deleted_at',
    ];

    public static function boot()
    {
        parent::boot();
        static::addGlobalScope(new WxAppId());
    }
}