<?php

/**
 * Laravel-admin - admin builder based on Laravel.
 * @author z-song <https://github.com/z-song>
 *
 * Bootstraper for Admin.
 *
 * Here you can remove builtin form field:
 * Encore\Admin\Form::forget(['map', 'editor']);
 *
 * Or extend custom form field:
 * Encore\Admin\Form::extend('php', PHPEditor::class);
 *
 * Or require js and css assets:
 * Admin::css('/packages/prettydocs/css/styles.css');
 * Admin::js('/packages/prettydocs/js/main.js');
 *
 */

use Encore\Admin\Facades\Admin;

// 禁用自带的地图和编辑器(加速)
Encore\Admin\Form::forget(['map', 'editor']);
// 自定义views目录
app('view')->prependNamespace('admin', resource_path('views/admin'));
// 自定义导航栏
Admin::navbar(function (Encore\Admin\Widgets\Navbar $navbar) {
    $navbar->right(view('search-bar'));
});
