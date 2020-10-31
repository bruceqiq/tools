<?php
// +----------------------------------------------------------------------
// | travel_api [ THE PROJECT NAME IS travel_api ]
// +----------------------------------------------------------------------
// | FileName: ArticleCategoryController.php
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
use App\Model\Common\ArticleCategory;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Hyperf\HttpServer\Contract\RequestInterface;
use Psr\Http\Message\ResponseInterface;

/**
 * @Controller(prefix="v1/article/category")
 * Class ArticleCategoryController
 * @package App\Controller\Common
 */
class ArticleCategoryController extends AbstractController
{
    /**
     * @Inject()
     * @var ArticleCategory
     */
    private $articleCategory;

    /**
     * @Inject()
     * @var RequestInterface
     */
    protected $request;

    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $response;

    /**
     * 文章分类
     * @GetMapping(path="list")
     * @return ResponseInterface
     */
    public function list()
    {
        $perSize  = $this->request->input('size', 10);
        $category = $this->articleCategory->category((int)$perSize);

        return $this->response->success((array)$category);
    }
}