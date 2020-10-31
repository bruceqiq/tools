<?php
// +----------------------------------------------------------------------
// | hyperf-skeleton [ THE PROJECT NAME IS hyperf-skeleton ]
// +----------------------------------------------------------------------
// | FileName: view.php
// +----------------------------------------------------------------------
// | Function: 模板配置
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

use Hyperf\View\Engine\BladeEngine;
use Hyperf\View\Mode;

return [
    // 使用的渲染引擎
    'engine' => BladeEngine::class,
    // 不填写则默认为 Task 模式，推荐使用 Task 模式
    'mode'   => Mode::TASK,
    'config' => [
        // 若下列文件夹不存在请自行创建
        'view_path'  => BASE_PATH . '/storage/view/',
        'cache_path' => BASE_PATH . '/runtime/view/',
    ],
];