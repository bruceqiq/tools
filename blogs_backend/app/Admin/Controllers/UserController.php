<?php
// +----------------------------------------------------------------------
// | park_server [ THE PROJECT NAME IS park_server ]
// +----------------------------------------------------------------------
// | FileName: UserController.php
// +----------------------------------------------------------------------
// | Function: 微信用户管理
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Admin\Controllers;

use App\Models\Admin\User;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;

class UserController extends CommonController
{
    protected $title = '用户管理';

    protected function grid()
    {
        $grid = new Grid(new User);
        $grid->column('id', '编号')->sortable();
        $grid->column('wxapp_id', '小程序ID');
        $grid->column('avatar_url', '头像')->lightbox(['width' => 100, 'height' => 100]);
        $grid->column('nickname', '用户昵称')->filter('like');
        $grid->column('openid', 'OPENID')->copyable();
        $grid->column('gender', '性别')->using(['1' => '男', '2' => '女', '0' => '未知'])->filter(['1' => '男', '2' => '女', '0' => '未知']);
        $grid->column('created_at', '注册时间');
        $grid->column('status', '账号状态')->using(['1' => '启用', '0' => '禁用'])->editable();
        $grid->column('country', '所属国家');
        $grid->column('province', '所属省份');
        $grid->column('city', '所属城市');
        $grid->disableCreateButton();
        $grid->actions(function (Grid\Displayers\Actions $actions) {
            $actions->disableEdit();
        });
        $grid->filter(function ($filter) {
            $filter->column(1 / 2, function ($filter) {
                $filter->like('nickName', '微信昵称');
            });
            $filter->column(1 / 2, function ($filter) {
                $filter->equal('status', '账号状态')->select(['1' => '启用', '0' => '禁用']);
            });
        });
        return $grid;
    }

    protected function detail($id)
    {
        $show = new Show(User::findOrFail($id));
        $show->panel()->tools(function ($tools) {
            $tools->disableDelete();
            $tools->disableEdit();
        });
        return $show;
    }

    protected function form()
    {
        $form = new Form(new User);
        $form->number('status', '账号状态')->max(1)->min(0);

        return $form;
    }
}