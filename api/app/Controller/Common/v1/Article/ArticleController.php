<?php
// +----------------------------------------------------------------------
// | travel_api [ THE PROJECT NAME IS travel_api ]
// +----------------------------------------------------------------------
// | FileName: ArticleController.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Controller\Common\v1\Article;

use App\Controller\AbstractController;
use App\Functions\HttpDataResponse;
use App\Middleware\Auth\UserAuthMiddleware;
use App\Model\Common\Article;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Hyperf\HttpServer\Annotation\Middleware;
use Hyperf\HttpServer\Annotation\Middlewares;
use Hyperf\HttpServer\Annotation\PostMapping;
use Hyperf\HttpServer\Contract\RequestInterface;
use Psr\Http\Message\ResponseInterface;

/**
 * @Controller(prefix="v1/common/article")
 * Class ArticleController
 * @package App\Controller\Common\v1
 */
class ArticleController extends AbstractController
{
    /**
     * @Inject()
     * @var Article
     */
    protected $article;

    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $response;

    /**
     * 文章列表
     * @GetMapping(path="list")
     * @param RequestInterface $request
     * @return ResponseInterface
     */
    public function list(RequestInterface $request)
    {
        $categoryId  = $request->input('category_id', 0);
        $title       = $request->input('title', '');
        $perSize     = $request->input('size');
        $searchWhere = [['title', 'like', '%' . $title . '%']];
        $article     = $this->article->article((int)$perSize, (int)$categoryId, (array)$searchWhere);

        return $this->response->success((array)$article);
    }

    /**
     * 文章详情
     * @GetMapping(path="detail")
     * @param RequestInterface $request
     * @return ResponseInterface
     */
    public function detail(RequestInterface $request)
    {
        $articelId       = $request->input('id');
        $article         = $this->article->detail((int)$articelId);
        $article['show'] = 2;
        return $this->response->success((array)$article);
    }

    /**
     * 文章增加阅读量
     * @PostMapping(path="read")
     * @Middlewares({@Middleware(UserAuthMiddleware::class)})
     * @param RequestInterface $request
     * @return ResponseInterface
     */
    public function read(RequestInterface $request)
    {
        $articleUuid = $request->input('id', 0);
        $this->article->read((string)$articleUuid, (int)1);

        return $this->response->success();
    }

    /**
     * 文章点赞
     * @PostMapping(path="click")
     * @Middlewares({@Middleware(UserAuthMiddleware::class)})
     * @param RequestInterface $request
     * @return ResponseInterface
     */
    public function click(RequestInterface $request)
    {
        $articleUuid = $request->input('id', 0);
        $this->article->click((string)$articleUuid, (int)1);

        return $this->response->success();
    }
}