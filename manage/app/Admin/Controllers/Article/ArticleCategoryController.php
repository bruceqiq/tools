<?php
// +----------------------------------------------------------------------
// | park_server [ THE PROJECT NAME IS park_server ]
// +----------------------------------------------------------------------
// | FileName: ArticleTagController.php
// +----------------------------------------------------------------------
// | Function: 文章分类
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Admin\Controllers\Article;

use App\Admin\Controllers\CommonController;
use App\Admin\Controllers\UserAuthController;
use App\Models\Admin\Article\ArticleCategory;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Godruoyi\Snowflake\Snowflake;

class ArticleCategoryController extends CommonController
{
    protected $title = '分类管理';

    protected function grid()
    {
        $grid = new Grid(new ArticleCategory());
        $grid->column('id', '编号')->sortable();
        $grid->column('uuid', '全局标识');
        $grid->column('name', '分类名称')->filter();
        $grid->column('orders', '显示顺序')->sortable();
        $grid->column('is_show', '是否显示')->display(function ($isShow) {
            if ($isShow == 0) {
                return "<span class='label bg-red'>禁用</span>";
            } elseif ($isShow == 1) {
                return "<span class='label bg-green'>启用</span>";
            } else {
                return '异常';
            }
        });
        $grid->column('created_at', '创建时间');
        $grid->filter(function ($filter) {
            $filter->disableIdFilter();
            $filter->like('name', '分类名称');
        });
        return $grid;
    }

    protected function detail($id)
    {
        return new Show(ArticleCategory::query()->findOrFail($id));
    }

    protected function form()
    {
        $form = new Form(new ArticleCategory());
        $form->hidden('uuid', '全局标识')->required()->default((new Snowflake())->id());
        $form->hidden('wxapp_id')->default(UserAuthController::getWxAppId())->required();
        $form->text('name', '分类名称')->placeholder('不能超过10个字符')->required();
        $states = [
            'on'  => ['value' => 1, 'text' => '打开', 'color' => 'success'],
            'off' => ['value' => 0, 'text' => '禁用', 'color' => 'danger'],
        ];
        $form->switch('is_show', '是否启用')->states($states)->placeholder('请选择启用状态');
        $form->number('orders', '显示顺序')->required()->help('值越大，越靠前。');

        return $form;
    }
}
