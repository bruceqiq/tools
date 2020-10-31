<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools [ THE PROJECT NAME IS tools ]
// +----------------------------------------------------------------------
// | FileName: SignController.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------


namespace App\Controller\MiNi\v1\User;


use App\Controller\AbstractController;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\PostMapping;

/**
 * @Controller(prefix="v1/mini/user")
 * Class SignController
 * @package App\Controller\MiNi\v1\User
 */
class SignController extends AbstractController
{
    /**
     * @PostMapping(path="sign")
     * @return array
     */
    public function sign()
    {
        return ['code' => 200, 'message' => '签到成功!'];
    }
}