<?php

namespace App\Admin\Controllers;

use Encore\Admin\Layout\Content;
use App\Http\Controllers\Controller;
use Encore\Admin\Widgets\Box;

class HomeController extends Controller
{
    public function index(Content $content)
    {
        $content->title('系统总览')->description('系统数据统计');

        $content->body(new Box('用户统计', view('dashboard1', [

        ])));

        $content->body(new Box('账单统计', view('dashboard2', [

        ])));

        return $content;
    }
}
