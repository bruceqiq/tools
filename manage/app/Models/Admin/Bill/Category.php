<?php


namespace App\Models\Admin\Bill;


use App\Scopes\WxAppId;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as AuthenticTable;

class Category extends AuthenticTable
{
    use Notifiable;
    use SoftDeletes;

    protected $table = 'bill_category';

    public static function boot()
    {
        static::addGlobalScope(new WxAppId());
        parent::boot();
    }
}
