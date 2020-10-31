<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools [ THE PROJECT NAME IS tools ]
// +----------------------------------------------------------------------
// | FileName: LoginController.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------


namespace App\Controller\Official\v1\User;


use App\Controller\AbstractController;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\PostMapping;

/**
 * @Controller(prefix="v1/occicia/user")
 * Class LoginController
 * @package App\Controller\Official\User
 */
class LoginController extends AbstractController
{
    /**
     * 用户登录
     * @PostMapping(path="login")
     * @return array
     */
    public function login()
    {
        return [];
    }
}