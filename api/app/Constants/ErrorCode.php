<?php

declare(strict_types=1);
/**
 * This file is part of Hyperf.
 * @link     https://www.hyperf.io
 * @document https://doc.hyperf.io
 * @contact  group@hyperf.io
 * @license  https://github.com/hyperf-cloud/hyperf/blob/master/LICENSE
 */

namespace App\Constants;

use Hyperf\Constants\AbstractConstants;
use Hyperf\Constants\Annotation\Constants;

/**
 * @Constants
 */
class ErrorCode extends AbstractConstants
{
    /**
     * @Message("服务器内部错误")
     */
    const SERVER_ERROR = 500;

    /**
     * @Message("请求成功")
     */
    const REQUEST_SUCCESS = 1000;

    /**
     * @Message("请求失败")
     */
    const REQUEST_ERROR = 1001;

    /**
     * @Message("登录失败")
     */
    const LOGIN_ERROE = 1002;

    /**
     * @Message("登录成功")
     */
    const LOGIN_SUCCESS = 1003;

    /**
     * @Message("请先登录")
     */
    const NO_LOGIN = 1004;

}
