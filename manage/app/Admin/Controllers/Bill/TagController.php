<?php


namespace App\Admin\Controllers\Bill;


use App\Admin\Controllers\CommonController;
use App\Admin\Controllers\UserAuthController;
use App\Models\Admin\Bill\Tag;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Godruoyi\Snowflake\Snowflake;

class TagController extends CommonController
{
    protected $title = '账单标签';

    public function grid()
    {
        $grid = new Grid(new Tag());
        $grid->column('id', '编号')->sortable();
        $grid->column('name', '账户名称');
        $grid->column('remark', '账户描述');
        $grid->column('cover', '账户封面')->lightbox(
            [
                'zooming' => true,
                'width'   => 50,
                'height'  => 50,
                'server'  => config('admin.img_url'),
            ]
        );
        $grid->column('is_show', '是否显示')->display(function ($isShow) {
            if ($isShow == 2) {
                return "<span class='label bg-red'>禁用</span>";
            } elseif ($isShow == 1) {
                return "<span class='label bg-green'>启用</span>";
            } else {
                return '异常';
            }
        });


        $grid->filter(function ($filter) {
            $filter->disableIdFilter();
            $filter->column(1 / 2, function ($filter) {
                $filter->like('name', '账户名称');
            });
            $filter->column(1 / 2, function ($filter) {
                $filter->equal('is_show', '启用状态')->select([1 => '启用', 2 => '禁用']);
            });
        });

        return $grid;
    }

    public function detail($id)
    {
        return new Show(Tag::query()->findOrFail($id));
    }

    public function form()
    {
        $form = new Form(new Tag());
        $form->hidden('uuid', '全局标识')->default((new Snowflake())->id())->required();
        $form->hidden('wxapp_id')->default(UserAuthController::getWxAppId())->required();
        $form->text('name', '账户名称')->required();
        $form->image('cover', '账户封面')->downloadable();
        $form->textarea('remark', '账户描述');

        $states = [
            'on'  => ['value' => 1, 'text' => '打开', 'color' => 'success'],
            'off' => ['value' => 2, 'text' => '禁用', 'color' => 'danger'],
        ];
        $form->switch('is_show', '显示状态')->states($states)->placeholder('是否显示');

        return $form;
    }
}
