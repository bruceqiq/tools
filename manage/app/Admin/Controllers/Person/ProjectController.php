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
use App\Models\Admin\Person\Project;
use App\Models\Admin\Person\Resume;
use App\Models\Admin\Person\Work;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Godruoyi\Snowflake\Snowflake;

class ProjectController extends CommonController
{
    protected $title = '项目经验';

    private $projectModel;

    public function __construct(Project $project)
    {
        $this->projectModel = new Project();
    }

    public function grid()
    {
        $grid = new Grid($this->projectModel);

        $grid->column('work.company_name', '所属公司');
        $grid->column('project_name', '项目名称');
        $grid->column('project_start_date', '项目开始日期');
        $grid->column('project_end_date', '项目结束日期');
        $grid->column('duty', '担任职位');
        $grid->column('develop_status', '项目状态')->using([1 => '开发中', 2 => '开发结束']);
        $grid->column('is_show', '显示状态')->using([1 => '显示', 2 => '禁用']);

        return $grid;
    }

    public function form()
    {
        $form = new Form($this->projectModel);

        $form->hidden('uuid', '全局标识')->default((new Snowflake())->id())->required();
        $form->hidden('wxapp_id')->default(UserAuthController::getWxAppId())->required();
        $form->hidden('resume_uuid', '简历uuid')->default((new Resume())::query()->first()->uuid);
        $form->select('work_experience_uuid', '所属公司')->options(((new Work())->workSelect()));
        $form->text('project_name', '项目名称')->required();
        $form->textarea('description', '项目介绍')->default('暂无内容')->required();
        $form->textarea('project_skill', '技术介绍')->default('暂无内容')->required();
        $form->url('url', '项目链接');
        $form->date('project_start_date', '项目开始日期')->required();
        $form->date('project_end_date', '项目结束日期')->required();
        $form->text('duty', '担任角色')->required();
        $form->textarea('duty_content', '负责内容')->required();
        $states     = [
            'on'  => ['value' => 1, 'text' => '显示', 'color' => 'success'],
            'off' => ['value' => 2, 'text' => '禁用', 'color' => 'danger'],
        ];
        $workStatus = [
            'on'  => ['value' => 1, 'text' => '开发中', 'color' => 'success'],
            'off' => ['value' => 2, 'text' => '开发结束', 'color' => 'danger'],
        ];
        $form->switch('develop_status', '项目状态')->states($workStatus);
        $form->switch('is_show', '显示状态')->states($states)->required()->placeholder('是否显示');

        return $form;
    }


    public function detail($id)
    {
        return new Show($this->projectModel::query()->findOrFail($id));
    }
}