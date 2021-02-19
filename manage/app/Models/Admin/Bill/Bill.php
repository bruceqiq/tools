<?php


namespace App\Models\Admin\Bill;

use App\Models\Admin\User;
use App\Scopes\WxAppId;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as AuthenticTable;
use Illuminate\Notifications\Notifiable;

class Bill extends AuthenticTable
{
    use Notifiable;
    use SoftDeletes;

    protected $table = 'bill';

    public static function boot()
    {
        static::addGlobalScope(new WxAppId());
        parent::boot();
    }

    public function category()
    {
        return $this->belongsTo(Category::class, 'bill_category_uuid', 'uuid');
    }

    public function tag()
    {
        return $this->belongsTo(Tag::class, 'bill_tag_uuid', 'uuid');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
