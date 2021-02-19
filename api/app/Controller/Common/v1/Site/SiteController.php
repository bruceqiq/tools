<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_api [ THE PROJECT NAME IS tools_api ]
// +----------------------------------------------------------------------
// | FileName: SiteController.php
// +----------------------------------------------------------------------
// | Function: 站点管理
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Controller\Common\v1\Site;

use App\Controller\AbstractController;
use App\Functions\HttpDataResponse;
use App\Middleware\Auth\UserAuthMiddleware;
use App\Model\Common\Site;
use App\Model\Common\UserSiteCollection;
use App\Services\JwtService;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Hyperf\HttpServer\Annotation\Middleware;
use Hyperf\HttpServer\Annotation\PostMapping;
use Psr\Http\Message\ResponseInterface;

/**
 * @Controller(prefix="v1/common/site")
 * Class SiteController
 * @package App\Controller\Common\v1\Site
 */
class SiteController extends AbstractController
{
    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $httpResponse;

    /**
     * @Inject()
     * @var JwtService
     */
    protected $jwtService;

    /**
     * 站点列表
     * @GetMapping(path="list")
     * @param Site $site
     * @return ResponseInterface
     */
    public function site(Site $site)
    {
        $page         = $this->request->input('page', 1);
        $size         = $this->request->input('size', 10);
        $title        = $this->request->input('title', '');
        $cateGoryUuid = $this->request->input('id', '');

        $list = $site->siteSelect((int)$page, (int)$size, (string)$title, (string)$cateGoryUuid);

        return $this->httpResponse->success((array)$list);
    }

    /**
     * 站点置顶
     * @GetMapping(path="top")
     * @param Site $site
     * @return ResponseInterface
     */
    public function top(Site $site)
    {
        $list = $site->topSelect();

        return $this->httpResponse->success((array)$list);
    }

    /**
     * 站点详情
     * @GetMapping(path="detail")
     * @Middleware(UserAuthMiddleware::class)
     * @param Site $site
     * @return ResponseInterface
     */
    public function detail(Site $site, UserSiteCollection $userSiteCollection)
    {
        $searchWhere = [];
        if (!empty($this->request->input('id'))) {
            array_push($searchWhere, ['uuid', '=', $this->request->input('id')]);
        }

        $userInfo   = $this->jwtService->getUserInfo();
        $collection = $userSiteCollection->siteCollectionSelect((int)$userInfo['id'], (string)$this->request->input('id'));
        $detail     = $site->detail((array)$searchWhere);

        return $this->httpResponse->success((array)['detail' => $detail, 'collection' => $collection]);
    }

    /**
     * 站点收藏
     * @Middleware(UserAuthMiddleware::class)
     * @PostMapping(path="collection")
     * @return ResponseInterface
     */
    public function collection(UserSiteCollection $collection)
    {
        $siteId   = $this->request->input('site_id', '');
        $userInfo = $this->jwtService->getUserInfo();
        $collection->collectionCreate((string)$siteId, (int)$userInfo['id']);

        return $this->httpResponse->success((array)[], (int)0, (string)'收藏成功');
    }
}