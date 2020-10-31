<?php
// +----------------------------------------------------------------------
// | travel_manage [ THE PROJECT NAME IS travel_manage ]
// +----------------------------------------------------------------------
// | FileName: AboutMeController.php
// +----------------------------------------------------------------------
// | Function: 关于我们
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Admin\Controllers\System;


use App\Admin\Controllers\UserAuthController;
use App\Models\Admin\System\AboutMe;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Godruoyi\Snowflake\Snowflake;

class AboutMeController extends AdminController
{
    protected $title = '关于我们';

    public function grid()
    {
        $grid = new Grid(new AboutMe());
        $grid->column('content', '公告内容');
        $grid->column('is_show', '显示状态')->using(['1' => '启用', '2' => '禁用']);
        return $grid;
    }

    public function form()
    {
        $form = new Form(new AboutMe());
        $form->hidden('uuid', '全局标识')->default((new Snowflake())->id())->required();
        $form->hidden('wxapp_id')->default(UserAuthController::getWxAppId())->required();
        $form->UEditor('content', '公告内容')->options(['initialFrameHeight' => 400])->required();
        $states = [
            'on'  => ['value' => 1, 'text' => '打开', 'color' => 'success'],
            'off' => ['value' => 2, 'text' => '禁用', 'color' => 'danger'],
        ];
        $form->switch('is_show', '显示状态')->states($states)->placeholder('是否显示');
        return $form;
    }

    public function detail($id)
    {
        return new Show(AboutMe::findOrFail($id));
    }
}