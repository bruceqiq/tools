<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_api [ THE PROJECT NAME IS tools_api ]
// +----------------------------------------------------------------------
// | FileName: CategoryController.php
// +----------------------------------------------------------------------
// | Function: 站点分类
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Controller\Common\v1\Site;

use App\Controller\AbstractController;
use App\Functions\HttpDataResponse;
use App\Model\Common\SiteCategory;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Psr\Http\Message\ResponseInterface;

/**
 * @Controller(prefix="v1/site/category")
 * Class CategoryController
 * @package App\Controller\Common\v1\Site
 */
class CategoryController extends AbstractController
{
    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $httpResponse;

    /**
     * 查询站点一级分类
     * @GetMapping(path="first/list")
     * @param SiteCategory $siteCategory
     * @return ResponseInterface
     */
    public function firstCategory(SiteCategory $siteCategory)
    {
        $list = $siteCategory->siteCategorySelect();
        return $this->httpResponse->success((array)$list);
    }

}