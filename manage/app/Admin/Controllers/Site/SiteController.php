<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_manage [ THE PROJECT NAME IS tools_manage ]
// +----------------------------------------------------------------------
// | FileName: SiteController.php
// +----------------------------------------------------------------------
// | Function: 站点
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Admin\Controllers\Site;

use App\Admin\Actions\Post\PublicSetting;
use App\Admin\Actions\Site\Redirect;
use App\Admin\Controllers\CommonController;
use App\Admin\Controllers\UserAuthController;
use App\Models\Admin\Site\Site;
use App\Models\Admin\Site\SiteCategory;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Godruoyi\Snowflake\Snowflake;

class SiteController extends CommonController
{
    protected $title = '站点管理';

    public function grid()
    {
        $grid = new Grid(new Site());
        $grid->column('id', '编号');
        $grid->column('cate.title', '分类');
        $grid->column('cover', 'logo')->lightbox(['width' => 100, 'height' => 100]);
        $grid->column('title', '一级标题');
        $grid->column('second_title', '二级标题');
        $grid->column('public_number', '公众号账号');
        $grid->column('public_cover', '公众号二维码')->display(function ($public_cover) {
            return '二维码';
        })->qrcode();
        $grid->column('public_name', '公众号名称');
        $grid->column('author', '发布人');
        $grid->column('source', '来源');
        $grid->column('public_is_show', '公众号推广')->display(function ($isShow) {
            if ($isShow == 2) {
                return "<span class='label bg-red'>禁用</span>";
            } elseif ($isShow == 1) {
                return "<span class='label bg-green'>启用</span>";
            } else {
                return '异常';
            }
        });
        $grid->column('is_show', '状态')->display(function ($isShow) {
            if ($isShow == 2) {
                return "<span class='label bg-red'>禁用</span>";
            } elseif ($isShow == 1) {
                return "<span class='label bg-green'>启用</span>";
            } else {
                return '异常';
            }
        });
        $grid->column('is_top', '置顶')->display(function ($isShow) {
            if ($isShow == 2) {
                return "<span class='label bg-red'>禁用</span>";
            } elseif ($isShow == 1) {
                return "<span class='label bg-green'>启用</span>";
            } else {
                return '异常';
            }
        });
        $grid->column('orders', '显示顺序')->sortable();
        $grid->actions(function ($actions) {
            $actions->add(new Redirect());
        });
        $grid->filter(function ($filter) {
            $filter->disableIdFilter();
            $filter->column(1 / 2, function ($filter) {
                $filter->like('title', '站点名称');
            });
            $filter->column(1 / 2, function ($filter) {
                $filter->like('site_url', '站点网址');
            });
            $filter->column(1 / 2, function ($filter) {
                $filter->equal('is_show', '启用状态')->select([1 => '启用', 2 => '禁用']);
            });
            $filter->column(1 / 2, function ($filter) {
                $filter->equal('is_top', '置顶状态')->select([1 => '启用', 2 => '禁用']);
            });
            $filter->column(1 / 2, function ($filter) {
                $filter->equal('public_is_show', '公众号状态')->select([1 => '启用', 2 => '禁用']);
            });
        });

        $grid->batchActions(function ($batch) {
            $batch->add(new PublicSetting());
        });

        return $grid;
    }

    public function form()
    {
        $form = new Form(new Site());
        $form->hidden('uuid', '全局标识')->default((new Snowflake())->id())->required();
        $form->hidden('wxapp_id')->default(UserAuthController::getWxAppId())->required();
        $category = (new SiteCategory())::query()->select(['uuid', 'title'])->where([['parent_id', '<>', 0], ['is_show', '=', 1]])->orderBy('parent_id', 'desc')->get();
        if (!empty($category)) {
            $category = $category->toArray();
        }
        $categoryIdArray    = array_column($category, 'uuid');
        $categoryTitleArray = array_column($category, 'title');
        $category           = array_combine($categoryIdArray, $categoryTitleArray);
        $form->select('site_category_uuid', '站点分类')->options($category)->required();
        $form->text('title', '一级标题')->required()->help('一级标题用于在列表页面展现，推荐使用一个好的名称');
        $form->text('second_title', '二级标题')->required()->help('二级标题用于在文章详情页面展现');
        $form->url('site_url', '网站地址')->required();
        $form->text('author', '信息发布人')->required()->help('简短最佳。');
        $form->text('source', '信息来源')->required()->help('简短最佳。');
        $form->text('desc', '站点简介')->required()->help('最大字符长度为 255，最好控制在10-20个字符之内，简短最佳。');
        $form->image('cover', '站点logo')->required();
        $form->display('public_cover', '公众号二维码预览')->with(function () use ($form) {
            return "<img src='https://youpaiyun.qqdeveloper.com/qrcode_for_gh_0275b8ba153f_258.jpg'>";
        });
        $form->text('public_cover', '公众号二维码')->default('https://youpaiyun.qqdeveloper.com/qrcode_for_gh_0275b8ba153f_258.jpg');
        $form->text('public_number', '公众号账号')->default('qq1005349393');
        $form->text('public_name', '公众号名称')->default('卡二条的技术圈');
        $form->UEditor('content', '文章内容')->required();
        $form->number('collection', '收藏数量')->default(0)->required();
        $states = [
            'on'  => ['value' => 1, 'text' => '打开', 'color' => 'success'],
            'off' => ['value' => 2, 'text' => '禁用', 'color' => 'danger'],
        ];
        $form->switch('is_show', '显示状态')->states($states)->placeholder('是否显示');
        $form->switch('is_top', '置顶状态')->states($states)->placeholder('置顶的站点将在首页展示');
        $form->switch('public_is_show', '公众号推广')->states($states);
        $form->number('orders', '显示顺序')->default(0)->help('值越大越显示在前')->required();

        return $form;
    }

    public function detail($id)
    {
        return new Show((new Site())::query()->findOrFail($id));
    }
}
