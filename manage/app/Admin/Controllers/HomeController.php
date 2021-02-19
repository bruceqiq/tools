<?php

namespace App\Admin\Controllers;

use Encore\Admin\Layout\Content;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    public function index(Content $content)
    {
        return $content;
    }
}
