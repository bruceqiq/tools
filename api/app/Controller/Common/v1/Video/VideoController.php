<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_api [ THE PROJECT NAME IS tools_api ]
// +----------------------------------------------------------------------
// | FileName: VideoController.php
// +----------------------------------------------------------------------
// | Function: 视频管理
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Controller\Common\v1\Video;

use App\Controller\AbstractController;
use App\Functions\HttpDataResponse;
use App\Model\Common\Video;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Psr\Http\Message\ResponseInterface;

/**
 * @Controller(prefix="common/v1/video")
 * Class VideoController
 * @package App\Controller\Common\v1\Video
 */
class VideoController extends AbstractController
{
    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $httpResponse;

    /**
     * 视频列表
     * @GetMapping(path="list")
     * @param Video $video
     * @return ResponseInterface
     */
    public function list(Video $video)
    {
        $page        = $this->request->input('page', 1);
        $size        = $this->request->input('size', 10);
        $title       = $this->request->input('title', '');
        $searchWhere = [['title', 'like', '%' . $title . '%']];
        $list        = $video->videoSelect((int)$page, (int)$size, (array)$searchWhere);

        return $this->httpResponse->success((array)$list);
    }
}