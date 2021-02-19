<?php


namespace App\Models\Admin\Bill;

use App\Scopes\WxAppId;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as AuthenticTable;

class Tag extends AuthenticTable
{
    use Notifiable;
    use SoftDeletes;

    protected $table = 'bill_tag';

    public static function boot()
    {
        static::addGlobalScope(new WxAppId());
        parent::boot();
    }
}
