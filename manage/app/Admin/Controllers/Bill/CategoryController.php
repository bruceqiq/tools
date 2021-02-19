<?php

namespace App\Admin\Controllers\Bill;

use App\Admin\Controllers\CommonController;
use App\Admin\Controllers\UserAuthController;
use App\Models\Admin\Bill\Category;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Godruoyi\Snowflake\Snowflake;

class CategoryController extends CommonController
{
    protected $title = '账单分类';

    public function grid()
    {
        $grid = new Grid(new Category());
        $grid->column('id', '编号')->sortable();
        $grid->column('type', '分类类型')->display(function ($isShow) {
            if ($isShow == 2) {
                return "<span class='label bg-red'>支出</span>";
            } elseif ($isShow == 1) {
                return "<span class='label bg-green'>收入</span>";
            } else {
                return '异常';
            }
        });
        $grid->column('name', '标签名称');
        $grid->column('remark', '标签描述');
        $grid->column('cover', '分类图标')->lightbox(
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
                $filter->like('name', '分类名称');
            });
            $filter->column(1 / 2, function ($filter) {
                $filter->equal('type', '类型')->select([1 => '收入', 2 => '支出']);
            });
            $filter->column(1 / 2, function ($filter) {
                $filter->equal('is_show', '启用状态')->select([1 => '启用', 2 => '禁用']);
            });
        });

        return $grid;
    }

    public function form()
    {
        $model     = new Category();
        $form      = new Form($model);
        $items     = $model::query()->where('parent_id', '=', 0)->get(['id', 'name', 'type', 'parent_id']);
        $cateArray = [0 => '一级分类'];
        foreach ($items as $value) {
            if ($value->parent_id == 0) {
                $cateArray[$value->id] = ($value->type == 1 ? '收入' : '支出') . '--|' . $value->name;
            }
        }
        $form->hidden('uuid', '全局标识')->default((new Snowflake())->id())->required();
        $form->hidden('wxapp_id')->default(UserAuthController::getWxAppId())->required();
        $form->radio('type', '分类类型')->options([1 => '收入', 2 => '支出'])->default(1);
        $form->image('cover', '分类图标')->downloadable();
        $form->select('parent_id', '上级类型')->options($cateArray)->placeholder('收支分类最多支持两级');
        $form->text('name', '分类名称')->required();
        $form->textarea('remark', '分类描述');
        $states = [
            'on'  => ['value' => 1, 'text' => '打开', 'color' => 'success'],
            'off' => ['value' => 2, 'text' => '禁用', 'color' => 'danger'],
        ];
        $form->switch('is_show', '显示状态')->states($states)->placeholder('是否显示');

        return $form;
    }

    public function detail($id)
    {
        return new Show(Category::query()->findOrFail($id));
    }
}
