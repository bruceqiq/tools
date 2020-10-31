<?php
// +----------------------------------------------------------------------
// | park_server [ THE PROJECT NAME IS park_server ]
// +----------------------------------------------------------------------
// | FileName: ArticleTagController.php
// +----------------------------------------------------------------------
// | Function: 简历管理
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Admin\Controllers\Person;

use App\Admin\Controllers\CommonController;
use App\Admin\Controllers\UserAuthController;
use App\Models\Admin\Person\Resume;
use App\Models\Admin\System\Setting;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Godruoyi\Snowflake\Snowflake;

class ResumeController extends CommonController
{
    protected $title = '简历管理';

    private $sexKey = 'sex';

    private $collegeGrade = 'college_grade';

    private $system = 'college_system';

    public function grid()
    {
        $grid = new Grid(new Resume());

        $grid->column('position', '面试岗位');
        $grid->column('entry_date', '入职日期');
        $grid->column('name', '姓名');
        $grid->column('sex', '性别')->using((new Setting())->list((string)$this->sexKey));
        $grid->column('age', '年龄');
        $grid->column('phone', '联系电话');
        $grid->column('email', '联系邮箱');
        $grid->column('college_name', '毕业学校');
        $grid->column('college_profession', '所学专业');
        $grid->column('college_grade', '学历等级')->using((new Setting())->list((string)$this->collegeGrade));
        $grid->column('system', '学制等级')->using((new Setting())->list((string)$this->system));
        $grid->column('is_show', '显示状态')->using(['1' => '启用', '2' => '禁用']);

        if (!empty(Resume::query()->first())) {
            $grid->disableCreateButton();
        }

        return $grid;
    }

    public function form()
    {
        $form = new Form(new Resume());

        $form->hidden('uuid', '全局标识')->default((new Snowflake())->id())->required();
        $form->hidden('wxapp_id')->default(UserAuthController::getWxAppId())->required();
        $form->text('name', '姓名')->required();
        $form->text('position', '面试岗位')->required();
        $form->text('entry_date', '入职日期')->required();
        $form->select('sex', '性别')->options((new Setting())->list((string)$this->sexKey))->required();
        $form->number('age', '年龄')->required()->default(20);
        $form->date('birthday', '出生日期')->required();
        $form->text('native_place', '籍贯')->required();
        $form->text('residential_address', '居住地址')->default('暂无设置');
        $form->text('home_address', '家庭地址')->default('暂无设置');
        $form->mobile('phone', '联系电话')->required();
        $form->email('email', '联系邮箱')->required();
        $form->image('avatar', '个人头像');
        $form->text('nation', '民族')->default('汉族');
        $form->text('politics', '政治面貌')->default('团员');
        $form->decimal('height', '身高')->default(0.00)->help('单位cm(厘米)');
        $form->text('college_name', '毕业学校')->default('暂无');
        $form->text('college_profession', '所学专业')->default('暂无');
        $form->select('college_grade', '学历等级')->options((new Setting())->list((string)$this->collegeGrade));
        $form->select('system', '学制等级')->options((new Setting())->list((string)$this->system));
        $form->UEditor('professional_skill', '个人技能')->options(['initialFrameHeight' => 400])->required();
        $form->textarea('description', '个人介绍')->default('暂无设置');
        $states = [
            'on'  => ['value' => 1, 'text' => '打开', 'color' => 'success'],
            'off' => ['value' => 2, 'text' => '禁用', 'color' => 'danger'],
        ];
        $form->switch('is_show', '显示状态')->states($states)->placeholder('是否显示');

        return $form;
    }

    public function detail($id)
    {
        return new Show(Resume::query()->findOrFail($id));
    }
}