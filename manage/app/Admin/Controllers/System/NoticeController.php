<?php
// +----------------------------------------------------------------------
// | travel_manage [ THE PROJECT NAME IS travel_manage ]
// +----------------------------------------------------------------------
// | FileName: NoticeController.php
// +----------------------------------------------------------------------
// | Function: 站点公告
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Admin\Controllers\System;


use App\Admin\Controllers\UserAuthController;
use App\Models\Admin\System\Notice;
use App\Models\Admin\System\Setting;
use Encore\Admin\Controllers\AdminController;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Godruoyi\Snowflake\Snowflake;

class NoticeController extends AdminController
{
    protected $title = '公告管理';

    private $key = 'notice';

    public function grid()
    {
        $grid     = new Grid(new Notice());
        $position = (new Setting())->list((string)$this->key);
        $grid->column('position', '显示位置')->using($position);
        $grid->column('title', '公告标题');
        $grid->column('orders', '显示顺序')->editable();
        $grid->column('is_show', '显示状态')->using(['1' => '启用', '2' => '禁用']);
        return $grid;
    }

    public function form()
    {
        $form = new Form(new Notice());
        $form->hidden('uuid', '全局标识')->default((new Snowflake())->id())->required();
        $form->hidden('wxapp_id')->default(UserAuthController::getWxAppId())->required();
        $form->text('title', '公告标题')->required()->autofocus();
        $position = (new Setting())->list((string)$this->key);
        $form->select('position', '显示位置')->options($position);
        $states = [
            'on'  => ['value' => 1, 'text' => '打开', 'color' => 'success'],
            'off' => ['value' => 2, 'text' => '禁用', 'color' => 'danger'],
        ];
        $form->switch('is_show', '显示状态')->states($states)->placeholder('是否显示');
        $form->number('orders', '显示顺序')->help('值越大越显示在前')->required();
        return $form;
    }

    public function detail($id)
    {
        $show = new Show(Notice::findOrFail($id));
        return $show;
    }
}