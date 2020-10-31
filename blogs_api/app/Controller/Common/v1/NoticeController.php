<?php
// +----------------------------------------------------------------------
// | travel_api [ THE PROJECT NAME IS travel_api ]
// +----------------------------------------------------------------------
// | FileName: NoticeController.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Controller\Common\v1;


use App\Constants\ErrorCode;
use App\Controller\AbstractController;
use App\Functions\HttpDataResponse;
use App\Model\Common\Notice;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Hyperf\HttpServer\Contract\RequestInterface;
use Psr\Http\Message\ResponseInterface;

/**
 * @Controller(prefix="v1/common/notice")
 * Class NoticeController
 * @package App\Controller\Common\v1
 */
class NoticeController extends AbstractController
{
    /**
     * @Inject()
     * @var Notice
     */
    protected $notice;

    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $response;

    /**
     * 公告列表
     * @GetMapping(path="list")
     * @param RequestInterface $request
     * @return ResponseInterface
     */
    public function list(RequestInterface $request)
    {
        $postion = $request->input('postion', 1);
        $notice  = $this->notice->notice((int)$postion);

        return $this->response->success((array)$notice);
    }
}