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
        $grid->column('title', '名称');
        $grid->column('public_number', '公众号账号');
        $grid->column('public_cover', '公众号二维码')->display(function ($public_cover) {
            return '二维码';
        })->qrcode();
        $grid->column('public_name', '公众号名称');
        $grid->column('public_is_show', '公众号推广')->using(['1' => '启用', '2' => '禁用']);
        $grid->column('author', '发布人');
        $grid->column('source', '来源');
        $grid->column('is_show', '状态')->using(['1' => '启用', '2' => '禁用']);
        $grid->actions(function ($actions) {
            $actions->add(new Redirect());
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
        $form->text('title', '站点名称')->required()->help('站点名称');
        $form->url('site_url', '网站地址')->required();
        $form->text('author', '信息发布人')->required()->help('简短最佳。');
        $form->text('source', '信息来源')->required()->help('简短最佳。');
        $form->text('desc', '站点简介')->required()->help('最好控制在10-20个字符之内，简短最佳。');
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
        $form->switch('public_is_show', '公众号推广')->states($states);
        $form->number('orders', '显示顺序')->default(0)->help('值越大越显示在前')->required();

        return $form;
    }

    public function detail($id)
    {
        return new Show((new Site())::query()->findOrFail($id));
    }
}