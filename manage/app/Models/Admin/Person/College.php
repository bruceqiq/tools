<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_manage [ THE PROJECT NAME IS tools_manage ]
// +----------------------------------------------------------------------
// | FileName: Resume.php
// +----------------------------------------------------------------------
// | Function: 教育经历
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------


namespace App\Models\Admin\Person;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as AuthenticTable;
use Illuminate\Notifications\Notifiable;

class College extends AuthenticTable
{
    use Notifiable;
    use SoftDeletes;

    protected $table = 'resume_college';
}