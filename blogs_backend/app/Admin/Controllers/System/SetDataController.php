<?php
// +----------------------------------------------------------------------
// | park_server [ THE PROJECT NAME IS park_server ]
// +----------------------------------------------------------------------
// | FileName: SetController.php
// +----------------------------------------------------------------------
// | Function: 系统设置
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Admin\Controllers\System;

use App\Admin\Controllers\CommonController;
use App\Admin\Controllers\UserAuthController;
use App\Models\Admin\System\Set;
use Encore\Admin\Form;
use Encore\Admin\Grid;

class SetDataController extends CommonController
{
    protected $title = '参数配置';

    public function form()
    {
        $form = new Form(new Set());
        $form->hidden('wxapp_id')->default(UserAuthController::getWxAppId())->required();
        $form->text('key', '配置键')->required()->autofocus();
        $form->text('describe', '配置描述')->required();
        $form->text('values', '配置值')->required();

        return $form;
    }

    public function grid()
    {
        $grid = new Grid(new Set());
        $grid->column('id', '数据编号');
        $grid->column('key', '配置键');
        $grid->column('describe', '配置描述');
        $grid->column('values', '配置值');

        return $grid;
    }

    public function detail($id)
    {
        return (new Set())::query()->findOrFail($id);
    }
}