<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | travel_api [ THE PROJECT NAME IS travel_api ]
// +----------------------------------------------------------------------
// | FileName: FeedBackController.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Controller\MiNi\v1\User;

use App\Controller\AbstractController;
use App\Filter\UserFeedBackFilter;
use App\Functions\HttpDataResponse;
use App\Model\MiNi\UserFeedback;
use App\Model\MiNi\UserFeedbackImg;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\Middleware;
use Hyperf\HttpServer\Annotation\Middlewares;
use Hyperf\HttpServer\Annotation\PostMapping;
use Hyperf\HttpServer\Contract\RequestInterface;
use App\Middleware\Auth\UserAuthMiddleware;
use Psr\Http\Message\ResponseInterface;

/**
 * @Controller(prefix="v1/mini/user/feedbak")
 * Class FeedBackController
 * @package App\Controller\MiNi\v1\User
 */
class FeedBackController extends AbstractController
{
    /**
     * @Inject()
     * @var UserFeedback
     */
    protected $userFeedback;

    /**
     * @Inject()
     * @var UserFeedbackImg
     */
    protected $userFeedImg;

    /**
     * @Inject()
     * @var UserFeedBackFilter
     */
    protected $userFeedBackFilter;

    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $response;

    /**
     * 反馈信息提交
     * @PostMapping(path="submit")
     * @Middlewares({@Middleware(UserAuthMiddleware::class)})
     * @param RequestInterface $request
     * @return ResponseInterface
     */
    public function submit(RequestInterface $request)
    {
        $desc     = $request->input('desc', '');
        $imgs     = $request->input('imgs', '');
        $content  = $this->userFeedBackFilter->feedbackContent((string)$desc);
        $createId = $this->userFeedback->insertFeedBack((array)$content);

        $imagesArray = empty($imgs) ? [] : json_decode($imgs, true);
        if ($createId && count($imagesArray) != 0) {
            $imgs = $this->userFeedBackFilter->feedbackImgs((array)$imagesArray, (int)$createId);
            $this->userFeedImg->insertFeedImg($imgs);
        }

        return (empty($createId)) ? ($this->response->error()) : ($this->response->success());
    }
}