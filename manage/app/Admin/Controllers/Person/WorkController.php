<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_manage [ THE PROJECT NAME IS tools_manage ]
// +----------------------------------------------------------------------
// | FileName: CollegeController.php
// +----------------------------------------------------------------------
// | Function: 工作经历
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Admin\Controllers\Person;

use App\Admin\Controllers\CommonController;
use App\Admin\Controllers\UserAuthController;
use App\Models\Admin\Person\Resume;
use App\Models\Admin\Person\Work;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Godruoyi\Snowflake\Snowflake;

class WorkController extends CommonController
{
    protected $title = '工作经历';

    public function grid()
    {
        $grid = new Grid(new Work());

        $grid->column('company_name', '公司名称');
        $grid->column('address', '公司地址');
        $grid->column('start_date', '入职日期');
        $grid->column('end_date', '离职日期');
        $grid->column('duty', '担任职位');
        $grid->column('work_status', '是否离职')->using([1 => '在职', 2 => '离职']);
        $grid->column('is_show', '显示状态')->using([1 => '显示', 2 => '禁用']);

        return $grid;
    }

    public function form()
    {
        $form = new Form(new Work());

        $form->hidden('uuid', '全局标识')->default((new Snowflake())->id())->required();
        $form->hidden('wxapp_id')->default(UserAuthController::getWxAppId())->required();
        $form->hidden('resume_uuid', '简历uuid')->default((new Resume())::query()->first()->uuid);
        $form->text('company_name', '公司名称')->required();
        $form->image('avatar', '公司logo');
        $form->textarea('description', '公司介绍')->default('暂无内容');
        $form->url('url', '公司官网');
        $form->text('address', '公司地址')->required();
        $form->date('start_date', '入职日期')->required();
        $form->date('end_date', '离职日期')->required();
        $form->text('department', '所在部门')->required();
        $form->text('duty', '担任职位')->required();
        $form->textarea('duty_content', '负责内容')->help('最大长度为225')->required();
        $states = [
            'on'  => ['value' => 1, 'text' => '显示', 'color' => 'success'],
            'off' => ['value' => 2, 'text' => '禁用', 'color' => 'danger'],
        ];
        $form->switch('is_show', '显示状态')->states($states)->required()->placeholder('是否显示');

        return $form;
    }


    public function detail($id)
    {
        return new Show(Work::query()->findOrFail($id));
    }
}