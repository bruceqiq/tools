<?php
// +----------------------------------------------------------------------
// | travel_api [ THE PROJECT NAME IS travel_api ]
// +----------------------------------------------------------------------
// | FileName: BannerController.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Controller\Common\v1;

use App\Controller\AbstractController;
use App\Functions\HttpDataResponse;
use App\Model\Common\Banner;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Hyperf\HttpServer\Contract\RequestInterface;
use Psr\Http\Message\ResponseInterface;

/**
 * @Controller(prefix="v1/common/banner")
 * Class BannerController
 * @package App\Controller\Common\v1
 */
class BannerController extends AbstractController
{
    /**
     * @Inject()
     * @var Banner
     */
    protected $banner;

    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $response;

    /**
     * 轮播图列表
     * @GetMapping(path="list")
     * @param RequestInterface $request
     * @return ResponseInterface
     */
    public function banner(RequestInterface $request)
    {
        $perSize  = $request->input('size', 10);
        $position = $request->input('position', 1);
        $banner   = $this->banner->banner((int)$perSize, (int)$position);

        return $this->response->success((array)$banner);
    }
}