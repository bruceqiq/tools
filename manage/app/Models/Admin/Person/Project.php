<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_manage [ THE PROJECT NAME IS tools_manage ]
// +----------------------------------------------------------------------
// | FileName: Work.php
// +----------------------------------------------------------------------
// | Function: 项目经历
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Models\Admin\Person;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as AuthenticTable;
use Illuminate\Notifications\Notifiable;

class Project extends AuthenticTable
{
    use Notifiable;
    use SoftDeletes;

    protected $table = 'project_experience';

    public function work()
    {
        return $this->belongsTo(Work::class, 'work_experience_uuid', 'uuid');
    }
}