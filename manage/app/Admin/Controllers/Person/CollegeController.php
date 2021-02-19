<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_manage [ THE PROJECT NAME IS tools_manage ]
// +----------------------------------------------------------------------
// | FileName: CollegeController.php
// +----------------------------------------------------------------------
// | Function: 教育经历
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Admin\Controllers\Person;

use App\Admin\Controllers\CommonController;
use App\Admin\Controllers\UserAuthController;
use App\Models\Admin\Person\College;
use App\Models\Admin\Person\Resume;
use App\Models\Admin\System\Setting;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Godruoyi\Snowflake\Snowflake;

class CollegeController extends CommonController
{
    protected $title = '教育经历';

    private $collegeGrade = 'college_grade';

    public function grid()
    {
        $grid = new Grid(new College());

        $grid->column('college_name', '大学名称');
        $grid->column('college_start_date', '入学日期');
        $grid->column('college_end_date', '毕业日期');
        $grid->column('college_profession', '所学专业');
        $grid->column('college_grade', '学历等级')->using((new Setting())->list((string)$this->collegeGrade));
        $grid->column('is_show', '显示状态')->using(['1' => '启用', '2' => '禁用']);

        return $grid;
    }

    public function form()
    {
        $form = new Form(new College());

        $form->hidden('uuid', '全局标识')->default((new Snowflake())->id())->required();
        $form->hidden('wxapp_id')->default(UserAuthController::getWxAppId())->required();
        $form->hidden('resume_uuid', '简历uuid')->default((new Resume())::query()->first()->uuid);
        $form->text('college_name', '大学名称')->required();
        $form->date('college_start_date', '入学日期')->required();
        $form->date('college_end_date', '毕业日期')->help('小程序端将以毕业时间，倒序显示')->required();
        $form->text('college_profession', '所学专业')->required();
        $form->select('college_grade', '学历等级')->options((new Setting())->list((string)$this->collegeGrade))->required();
        $states = [
            'on'  => ['value' => 1, 'text' => '打开', 'color' => 'success'],
            'off' => ['value' => 2, 'text' => '禁用', 'color' => 'danger'],
        ];
        $form->switch('is_show', '显示状态')->states($states)->placeholder('是否显示');

        return $form;
    }

    public function detail($id)
    {
        return new Show(College::query()->findOrFail($id));
    }
}