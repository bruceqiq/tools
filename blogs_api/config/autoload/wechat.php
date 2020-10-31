<?php
// +----------------------------------------------------------------------
// | hyperf-skeleton [ THE PROJECT NAME IS hyperf-skeleton ]
// +----------------------------------------------------------------------
// | FileName: wechat.php
// +----------------------------------------------------------------------
// | Function: 微信配置文件
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

return [
    // 公众号配置
    'official'     => [
        'app_id'     => env('OFFICIAL_APP_ID', ''),
        'app_secret' => env('OFFICIAL_APP_SECRET', ''),
    ],
    // 小程序
    'mini_program' => [
        // 掌上应用宝小程序
        'default' => [
            'app_id'  => env('WECHAT_MINI_PROGRAM_APPID', ''),
            'secret'  => env('WECHAT_MINI_PROGRAM_SECRET', ''),
            'token'   => env('WECHAT_MINI_PROGRAM_TOKEN', ''),
            'aes_key' => env('WECHAT_MINI_PROGRAM_AES_KEY', ''),
        ],
        // 口袋应用箱小程序
        'second'  => [
            'app_id'  => env('WECHAT_MINI_PROGRAM_APPID_SECOND', ''),
            'secret'  => env('WECHAT_MINI_PROGRAM_SECRET_SECOND', ''),
            'token'   => env('WECHAT_MINI_PROGRAM_TOKEN_SECOND', ''),
            'aes_key' => env('WECHAT_MINI_PROGRAM_AES_KEY_SECOND', ''),
        ],
    ],
];