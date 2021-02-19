<?php

namespace App\Admin\Controllers\Bill;

use App\Admin\Controllers\CommonController;
use App\Models\Admin\Bill\Bill;
use App\Models\Admin\Bill\Category;
use App\Models\Admin\Bill\Tag;
use Encore\Admin\Grid;

class BillController extends CommonController
{
    protected $title = '账单列表';

    public function grid()
    {
        $grid = new Grid(new Bill());
        $grid->column('id', '数据编号')->sortable();
        $grid->column('type', '收支类型')->display(function ($isShow) {
            if ($isShow == 2) {
                return "<span class='label bg-red'>支出</span>";
            } elseif ($isShow == 1) {
                return "<span class='label bg-green'>收入</span>";
            } else {
                return '异常';
            }
        });
        $grid->column('category.name', '账单类型');
        $grid->column('tag.name', '账户类型');
        $grid->column('user.nickname', '用户昵称');
        $grid->column('transaction_date', '消费日期')->sortable();
        $grid->column('money', '收支金额')->display(function ($money) {
            if ($this->type == 2) {
                return "<span class='label bg-red'>" . $money . "</span>";
            } elseif ($this->type == 1) {
                return "<span class='label bg-green'>" . $money . "</span>";
            } else {
                return '异常';
            }
        })->sortable()->totalRow(function ($money) {
            return "总收支金额:<span class='text-danger text-bold'><i class='fa fa-yen'></i> {$money} 元</span>";
        });
        $grid->column('remark', '收支备注');
        $grid->column('created_at', '创建时间')->sortable();
        $grid->disableActions();
        $grid->disableCreateButton();
        $grid->tools(function ($tools) {
            $tools->batch(function ($batch) {
                $batch->disableDelete();
            });
        });
        $grid->filter(function ($filter) {
            $filter->disableIdFilter();
            $filter->column(1 / 2, function ($filter) {
                $filter->between('transaction_date', '交易日期')->date();
            });
            $filter->column(1 / 2, function ($filter) {
                $filter->between('money', '交易金额');
            });
            $filter->column(1 / 2, function ($filter) {
                $category      = (new Category())::query()->get(['name', 'uuid'])->toArray();
                $categoryArray = [];
                foreach ($category as $value) {
                    $categoryArray[$value['uuid']] = $value['name'];
                }
                $filter->equal('bill_category_uuid', '收支类型')->select($categoryArray);
            });
            $filter->column(1 / 2, function ($filter) {
                $tag      = (new Tag())::query()->get(['name', 'uuid'])->toArray();
                $tagArray = [];
                foreach ($tag as $value) {
                    $tagArray[$value['uuid']] = $value['name'];
                }
                $filter->equal('bill_tag_uuid', '收支账户')->select($tagArray);
            });
            $filter->column(1 / 2, function ($filter) {
                $filter->equal('type', '收支类型')->select([1 => '收入', 2 => '支出']);
            });
        });

        return $grid;
    }
}
