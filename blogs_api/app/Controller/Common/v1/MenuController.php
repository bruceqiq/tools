<?php
// +----------------------------------------------------------------------
// | travel_api [ THE PROJECT "name" IS travel_api ]
// +----------------------------------------------------------------------
// | File"name"=>MenuController.php
// +----------------------------------------------------------------------
// | Function=> 菜单配置
// +----------------------------------------------------------------------
// | Site ( http=>//www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author=>卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Controller\Common\v1;

use App\Controller\AbstractController;
use App\Functions\HttpDataResponse;
use App\Model\Common\Menu;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Psr\Http\Message\ResponseInterface;

/**
 * @Controller(prefix="v1/common/menu")
 * Class MenuController
 * @package App\Controller\Common\v1
 */
class MenuController extends AbstractController
{
    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $response;

    /**
     * 首页菜单
     * @GetMapping(path="home")
     * @return ResponseInterface
     */
    public function home()
    {
        $menu = [
            [
                "img"  => "https://youpaiyun.qqdeveloper.com/tools-weather.png",
                "name" => "今日天气",
                "url"  => "/pages/weather/weather",
                'key'  => '今日天气',
            ],
//            [
//                "img"  => "/static/images/classify/map.png",
//                "name" => "地图搜索",
//                "url"  => "/pages/maps/maps",
//                'key'  => '加油站',
//            ],
//            [
//                "img"  => "/static/images/classify/read.png",
//                "name" => "文章阅读",
//                "url"  => "/pages/article/news/news",
//                'key'  => '文章阅读',
//            ],
            [
                "img"  => "https://youpaiyun.qqdeveloper.com/tools-maps.png",
                "name" => "地图搜索",
                "url"  => "/pages/maps/maps",
                'key'  => '酒店',
            ],
//            [
//                "img"  => "/static/images/classify/vr.png",
//                "name" => "加油站",
//                "url"  => "/pages/maps/maps",
//                'key'  => '附近加油站',
//            ],
            [
                "img"  => "https://youpaiyun.qqdeveloper.com/tools-route.png",
                "name" => "路线规划",
                "url"  => "",
                'key'  => '路线规划',
                'type' => 'road'
            ],
            [
                "img"  => "https://youpaiyun.qqdeveloper.com/tools-subway.png",
                "name" => "地铁路线",
                "url"  => "",
                'key'  => '地铁路线',
                'type' => 'subway'
            ],
            [
                "img"  => "https://youpaiyun.qqdeveloper.com/tools-shopping.png",
                "name" => "附件商场",
                "url"  => "",
                'key'  => '商场',
                'type' => 'search'
            ],
        ];

        return $this->response->success((array)$menu);
    }

    /**
     * 全部菜单
     * @return ResponseInterface
     */
    public function list()
    {
        $menu = [
            [
                "img"  => "/static/images/classify/map.png",
                "name" => "地图搜索",
                "url"  => "/pages/maps/maps",
            ],
            [
                "img"  => "/static/images/classify/read.png",
                "name" => "文章阅读",
                "url"  => "/pages/article/news/news",
            ],
            [
                "img"  => "/static/images/classify/flight.png",
                "name" => "机场查询",
                "url"  => "/pages/maps/maps",
            ],
            [
                "img"  => "/static/images/classify/vr.png",
                "name" => "AI识别",
                "url"  => "/pages/maps/maps",
            ],
            [
                "img"  => "/static/images/classify/weather.png",
                "name" => "今日天气",
                "url"  => "/pages/weather/weather",
            ],
        ];
        return $this->response->success((array)$menu);
    }

    /**
     * 菜单列表
     * @GetMapping(path="list")
     * @param Menu $menu
     * @return ResponseInterface
     */
    public function lists(Menu $menu)
    {
        $position = $this->request->input('position', 1);
        $lists    = $menu->menuSelect((int)$position);
        return $this->response->success((array)$lists);
    }
}