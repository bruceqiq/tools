<?php

declare(strict_types=1);
// +----------------------------------------------------------------------
// | travel_api [ THE PROJECT NAME IS travel_api ]
// +----------------------------------------------------------------------
// | FileName: SceneController.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------


namespace App\Controller\Common\v1\Ar;


use App\Controller\AbstractController;
use App\Functions\HttpDataResponse;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Psr\Http\Message\ResponseInterface;

/**
 * @Controller(prefix="v1/common/ai/scene")
 * Class SceneController
 * @package App\Controller\Common\v1\Ar
 */
class SceneController extends AbstractController
{
    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $httpResponse;

    /**
     * ai识别场景
     * @GetMapping(path="scene")
     * @return ResponseInterface
     */
    public function list()
    {
        return $this->httpResponse->success((array)$this->config());
    }

    private function config()
    {
        return [
            ['text' => '汽车识别', 'url' => '', 'scene' => 'car', 'use_number' => 1],
            ['text' => '动物识别', 'url' => '', 'scene' => 'car', 'use_number' => 2],
            ['text' => '火车识别', 'url' => '', 'scene' => 'car', 'use_number' => 3],
            ['text' => '汽车识别', 'url' => '', 'scene' => 'car', 'use_number' => 4],
        ];
    }
}
