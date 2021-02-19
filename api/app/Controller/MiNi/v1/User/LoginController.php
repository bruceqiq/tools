<?php
// +----------------------------------------------------------------------
// | tools [ THE PROJECT NAME IS tools ]
// +----------------------------------------------------------------------
// | FileName: LoginController.php
// +----------------------------------------------------------------------
// | Function: 用户登录
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Controller\MiNi\v1\User;

use App\Constants\ErrorCode;
use App\Controller\AbstractController;
use App\Model\MiNi\User;
use App\Services\JwtService;
use EasyWeChat\Kernel\Exceptions\DecryptException;
use EasyWeChat\Kernel\Exceptions\InvalidConfigException;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\PostMapping;
use App\Kernel\Oauth\WeChatFactory;
use Hyperf\HttpServer\Contract\RequestInterface;
use Hyperf\HttpServer\Contract\ResponseInterface;

/**
 * @Controller(prefix="v1/mini/user")
 * Class LoginController
 * @package App\Controller\MiNi\User
 */
class LoginController extends AbstractController
{

    /**
     * @Inject()
     * @var WeChatFactory
     */
    protected $factory;

    /**
     * @Inject()
     * @var JwtService
     */
    protected $jwtService;

    /**
     * @Inject()
     * @var User
     */
    protected $user;

    /**
     * 用户登录
     * @PostMapping(path="login")
     * @param RequestInterface $request
     * @param ResponseInterface $response
     * @return \Psr\Http\Message\ResponseInterface
     * @throws DecryptException
     * @throws InvalidConfigException
     */
    public function login(RequestInterface $request, ResponseInterface $response)
    {
        $code          = $request->input('code');
        $encryptedData = $request->input('encrypted_data');
        $iv            = $request->input('iv');

        $app      = $this->factory->create();
        $session  = $app->auth->session($code);
        $userInfo = $app->encryptor->decryptData($session['session_key'], $iv, $encryptedData);

        $userInfo = $this->user->createUser([
            'openid'     => $userInfo['openId'],
            'nickname'   => $userInfo['nickName'],
            'avatar_url' => $userInfo['avatarUrl'],
            'gender'     => $userInfo['gender'],
            'country'    => $userInfo['country'],
            'province'   => $userInfo['province'],
            'city'       => $userInfo['city'],
            'wxapp_id'   => $request->input('wxapp_id'),
            'status'     => 1
        ]);
        $jwtToken = $this->jwtService->setUserLoginToken((array)$userInfo[0]);

        return $response->json([
            'code'    => ErrorCode::LOGIN_SUCCESS,
            'message' => ErrorCode::getMessage(ErrorCode::LOGIN_SUCCESS),
            'data'    => ['userInfo' => $userInfo[0], 'token' => $jwtToken],
        ]);
    }
}