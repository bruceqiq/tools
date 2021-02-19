<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_api [ THE PROJECT NAME IS tools_api ]
// +----------------------------------------------------------------------
// | FileName: CommonModel.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------


namespace App\Model;

use App\Scopes\WxAppIdSearchScope;
use Hyperf\Database\Model\SoftDeletes;
use Hyperf\DbConnection\Model\Model;

class CommonModel extends Model
{
    use SoftDeletes;

    protected function boot(): void
    {
        static::addGlobalScope(new WxAppIdSearchScope());
        parent::boot();
    }
}