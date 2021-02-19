<?php
// +----------------------------------------------------------------------
// | travel_api [ THE PROJECT NAME IS travel_api ]
// +----------------------------------------------------------------------
// | FileName: AboutMeController.php
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
use App\Model\Common\AboutMe;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Hyperf\HttpServer\Annotation\Middleware;
use Hyperf\HttpServer\Annotation\Middlewares;
use Hyperf\HttpServer\Annotation\PostMapping;
use Hyperf\HttpServer\Contract\RequestInterface;
use App\Middleware\Auth\UserAuthMiddleware;
use Psr\Http\Message\ResponseInterface;

/**
 * @Controller(prefix="v1/common/about/me")
 * Class AboutMeController
 * @package App\Controller\Common\v1
 */
class AboutMeController extends AbstractController
{
    /**
     * @Inject()
     * @var AboutMe
     */
    protected $about;

    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $response;

    /**
     * 关于我们
     * @GetMapping(path="detail")
     * @return ResponseInterface
     */
    public function aboutMe()
    {
        $aboutMe = $this->about->aboutMe();
        return $this->response->success((array)$aboutMe);
    }

    /**
     * 关于我们
     * @PostMapping(path="click")
     * @Middlewares({@Middleware(UserAuthMiddleware::class)})
     * @param RequestInterface $request
     * @return ResponseInterface
     */
    public function click(RequestInterface $request)
    {
        $id = $request->input('id');
        $this->about->updateClick((string)$id);

        return $this->response->success();
    }
}