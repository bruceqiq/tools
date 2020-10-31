<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | travel_api [ THE PROJECT NAME IS travel_api ]
// +----------------------------------------------------------------------
// | FileName: HttpDataResponse.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------


namespace App\Functions;


use App\Constants\ErrorCode;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Contract\ResponseInterface;

class HttpDataResponse
{
    /**
     * @Inject()
     * @var ResponseInterface
     */
    protected $response;

    /**
     * 成功时返回数据格式
     * @param int $code 业务状态码
     * @param string $message 业务状态信息
     * @param array $data 业务数据
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function success(array $data = [], int $code = 0, string $message = ''): \Psr\Http\Message\ResponseInterface
    {
        return $this->response->json([
            'code'    => empty($code) ? ErrorCode::REQUEST_SUCCESS : $code,
            'message' => empty($message) ? ErrorCode::getMessage(ErrorCode::REQUEST_SUCCESS) : $message,
            'data'    => $data
        ]);

    }

    /**
     * 失败时返回数据格式
     * @param int $code 业务状态码
     * @param string $message 业务状态信息
     * @param array $data 业务数据
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function error(array $data = [], int $code = 0, string $message = ''): \Psr\Http\Message\ResponseInterface
    {
        return $this->response->json([
            'code'    => empty($code) ? ErrorCode::REQUEST_ERROR : $code,
            'message' => empty($message) ? ErrorCode::getMessage(ErrorCode::REQUEST_ERROR) : $message,
            'data'    => $data
        ]);
    }

    /**
     * 自定义返回数据格式
     * @param int $code 业务状态码
     * @param string $message 业务状态信息
     * @param array $data 业务数据
     * @return \Psr\Http\Message\ResponseInterface
     */
    public function response(int $code, string $message, array $data): \Psr\Http\Message\ResponseInterface
    {
        return $this->response->json([
            'code'    => $code,
            'message' => $message,
            'data'    => $data
        ]);
    }
}