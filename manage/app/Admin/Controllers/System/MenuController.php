<?php

declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_manage [ THE PROJECT NAME IS tools_manage ]
// +----------------------------------------------------------------------
// | FileName: MenuController.php
// +----------------------------------------------------------------------
// | Function: 菜单管理
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Admin\Controllers\System;

use App\Admin\Controllers\CommonController;
use App\Admin\Controllers\UserAuthController;
use App\Models\Admin\System\Menu;
use App\Models\Admin\System\Setting;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Godruoyi\Snowflake\Snowflake;

class MenuController extends CommonController
{
    protected $title = '菜单管理';

    private $key = 'menu';

    public function form()
    {
        $form = new Form(new Menu());
        $form->hidden('uuid', '全局标识')->default((new Snowflake())->id())->required();
        $form->hidden('wxapp_id')->default(UserAuthController::getWxAppId())->required();
        $form->text('title', '菜单名称')->required()->help('建议统一4个汉字');
        $form->text('url', '跳转地址');
        $states   = [
            'on'  => ['value' => 1, 'text' => '是', 'color' => 'success'],
            'off' => ['value' => 2, 'text' => '否', 'color' => 'danger'],
        ];
        $position = (new Setting())->list((string)$this->key);
        $form->select('position', '显示位置')->options($position);
        $form->switch('is_show', '显示状态')->states($states)->placeholder('是否显示');
        $form->image('img', '菜单图标')->required();
        $form->text('key', '菜单key')->help('用于小程序端，跳转到搜索页面，增加默认搜索。酒店');
        $form->select('type', '菜单类型')->options([
            'search'        => '地图搜索',
            'subway'        => '地铁路线',
            'road'          => '路线规划',
            'min'           => '外部应用(小程序)',
            'tabbar'        => '内部应用(菜单页面)',
            'page'          => '内部应用(非菜单页面)',
            'image_preview' => '当前页面图片预览',
        ])->help('适用于页面不同的跳转做处理。')->required();
        $form->number('orders', '显示顺序')->default(0)->help('值越大越显示在前')->required();

        return $form;
    }

    public function grid()
    {
        $grid     = new Grid(new Menu());
        $position = (new Setting())->list((string)$this->key);
        $grid->column('position', '显示位置')->using($position);
        $grid->column('title', '菜单名称');
        $grid->column('url', '跳转地址');
        $grid->column('orders', '显示顺序')->sortable();
        $grid->column('is_show', '是否显示')->display(function ($isShow) {
            if ($isShow == 2) {
                return "<span class='label bg-red'>禁用</span>";
            } elseif ($isShow == 1) {
                return "<span class='label bg-green'>启用</span>";
            } else {
                return '异常';
            }
        });
        $grid->column('img', '菜单图标')->lightbox(
            [
                'zooming' => true,
                'width'   => 50,
                'height'  => 50,
                'server'  => config('admin.img_url'),
            ]
        );

        $grid->filter(function ($filter) {
            $filter->disableIdFilter();
            $filter->column(1 / 2, function ($filter) {
                $filter->like('title', '菜单名称');
            });
            $filter->column(1 / 2, function ($filter) {
                $filter->equal('is_show', '启用状态')->select([1 => '启用', 2 => '禁用']);
            });
        });

        return $grid;
    }

    public function detail($id)
    {
        return new Show(Menu::query()->findOrFail($id));
    }
}
