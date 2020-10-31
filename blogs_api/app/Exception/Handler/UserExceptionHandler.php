<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | travel_api [ THE PROJECT NAME IS travel_api ]
// +----------------------------------------------------------------------
// | FileName: DBExceptionHandler.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------


namespace App\Exception\Handler;


use App\Constants\ErrorCode;
use App\Exception\DBException;
use Hyperf\ExceptionHandler\ExceptionHandler;
use Hyperf\HttpMessage\Stream\SwooleStream;
use Psr\Http\Message\ResponseInterface;
use Throwable;

class UserExceptionHandler extends ExceptionHandler
{

    /**
     * @inheritDoc
     */
    public function handle(Throwable $throwable, ResponseInterface $response)
    {
        if ($throwable instanceof DBException) {
            $data = json_encode([
                'code'    => ErrorCode::SERVER_ERROR,
                'message' => ErrorCode::getMessage(ErrorCode::SERVER_ERROR),
                'data'    => []
            ], JSON_UNESCAPED_UNICODE);
            return $response->withStatus(ErrorCode::SERVER_ERROR)->withBody(new SwooleStream($data));
        }
        return $response;
    }

    /**
     * @inheritDoc
     */
    public function isValid(Throwable $throwable): bool
    {
        return true;
    }
}