<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_manage [ THE PROJECT NAME IS tools_manage ]
// +----------------------------------------------------------------------
// | FileName: Work.php
// +----------------------------------------------------------------------
// | Function: 工作经历
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Models\Admin\Person;

use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as AuthenticTable;
use Illuminate\Notifications\Notifiable;

class Work extends AuthenticTable
{
    use Notifiable;
    use SoftDeletes;

    protected $table = 'work_experience';

    public function workSelect(array $searchWhere = []): array
    {
        $items = self::query()->where($searchWhere)->select(['uuid', 'company_name'])->get();
        if (!empty($items)) {
            $itemsArray       = $items->toArray();
            $keysArray        = array_column($itemsArray, 'uuid');
            $companyNameArray = array_column($itemsArray, 'company_name');
            return array_combine($keysArray, $companyNameArray);
        } else {
            return [];
        }
    }
}