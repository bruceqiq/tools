<?php
// +----------------------------------------------------------------------
// | travel_api [ THE PROJECT NAME IS travel_api ]
// +----------------------------------------------------------------------
// | FileName: JwtService.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Services;

use Firebase\JWT\JWT;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Contract\RequestInterface;

class JwtService
{
    private $key = 'jwtKey';

    /**
     * @Inject()
     * @var RequestInterface
     */
    protected $request;

    /**
     * 生成JWT
     * @param array $userInfo
     * @return string
     */
    private function createJwt(array $userInfo): string
    {
        $time  = time();
        $token = [
            'iss'      => 'https://www.qqdeveloper.com',// 签发人
            'exp'      => $time + 86400 * 100,// 过期时间(这里的有效期时间为1天)
            'sub'      => '主题内容',// 主题
            'aud'      => '受众内容',// 受众
            'nbf'      => $time,// 生效时间
            'iat'      => $time,// 签发时间
            'jti'      => 123,// 编号
            // 额外自定义的数据
            'userInfo' => [
                $userInfo
            ]
        ];
        // 调用生成加密方法('Payloadn内容','加密的键',['加密算法'],['加密的可以'],['JWT的header头'])
        return JWT::encode($token, $this->key);
    }

    /**
     * 解析jwt
     * @param string $jwtToken
     * @return array
     */
    private function analysisJwt(string $jwtToken): array
    {
        // 调用解密方法('JWT内容','解密的键,和加密时的加密键一直','加密算法')
        try {
            $decoded = JWT::decode($jwtToken, $this->key, array('HS256'));
            $data    = json_decode(json_encode($decoded, JSON_UNESCAPED_UNICODE), true);
            return (count($data) != 0) ? $data['userInfo'][0] : [];
        } catch (\Throwable $throwable) {
            var_dump($throwable->getMessage());
            return [];
        }

    }

    /**
     * 设置登录token
     * @param array $userInfo
     * @return string
     */
    public function setUserLoginToken(array $userInfo): string
    {
        return $this->createJwt((array)$userInfo);
    }

    /**
     * 获取登录token
     * @return string
     */
    public function getUserLoginToken(): ?string
    {
        return $this->request->cookie('authentication');
    }

    /**
     * 获取用户信息
     * @return array
     */
    public function getUserInfo(): array
    {
        $token = $this->getUserLoginToken();
        return $this->analysisJwt((string)$token);
    }
}