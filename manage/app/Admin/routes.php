<?php

use Illuminate\Routing\Router;

Admin::routes();

Route::group([
    'prefix'     => config('admin.route.prefix'),
    'namespace'  => config('admin.route.namespace'),
    'middleware' => config('admin.route.middleware'),
], function (Router $router) {
    $router->get('/', 'HomeController@index')->name('admin.home');
    $router->resource('users', UserController::class);
    $router->resource('article/tags', Article\ArticleTagController::class);
    $router->resource('article/category', Article\ArticleCategoryController::class);
    $router->resource('article/list', Article\ArticleController::class);
    $router->resource('system/data', SetDataController::class);
    $router->resource('banner', System\BannerController::class);
    $router->resource('notice', System\NoticeController::class);
    $router->resource('about_me', System\AboutMeController::class);
    $router->resource('video', Video\VideoController::class);
    $router->resource('menu', System\MenuController::class);
    $router->resource('set', System\SetDataController::class);
    $router->resource('site/category', Site\CategoryController::class);
    $router->resource('site', Site\SiteController::class);
    $router->resource('resume/college', Person\CollegeController::class);
    $router->resource('resume/work', Person\WorkController::class);
    $router->resource('resume/project', Person\ProjectController::class);
    $router->resource('resume', Person\ResumeController::class);
    $router->resource('bill/category', Bill\CategoryController::class);
    $router->resource('bill/tag', Bill\TagController::class);
    $router->resource('bill', Bill\BillController::class);
});
