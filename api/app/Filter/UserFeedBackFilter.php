<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | travel_api [ THE PROJECT NAME IS travel_api ]
// +----------------------------------------------------------------------
// | FileName: UserFeedBackFilter.php
// +----------------------------------------------------------------------
// | Function: 用户留言反馈
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Filter;

use App\Services\JwtService;
use Hyperf\Di\Annotation\Inject;

class UserFeedBackFilter
{
    /**
     * @Inject()
     * @var JwtService
     */
    protected $jwtService;

    /**
     * 留言反馈图片数据组装
     * @param array $requestParams
     * @param int $id
     * @return array
     */
    public function feedbackImgs(array $requestParams, int $id): array
    {
        $userInfo = $this->jwtService->getUserInfo();
        $imgArray = [];
        $dateTime = date('Y-m-d H:i:s');
        foreach ($requestParams as $key => $value) {
            $imgArray[$key]['user_feedback_id'] = $id;
            $imgArray[$key]['user_id']          = $userInfo['id'];
            $imgArray[$key]['content']          = $value;
            $imgArray[$key]['wxapp_id']         = 1;
            $imgArray[$key]['created_at']       = $dateTime;
            $imgArray[$key]['updated_at']       = $dateTime;
        }
        return $imgArray;
    }

    /**
     * 留言内容数据组装
     * @param string $content
     * @return array
     */
    public function feedbackContent(string $content): array
    {
        $userInfo = $this->jwtService->getUserInfo();
        $dateTime = date('Y-m-d H:i:s');
        return [
            'user_id'    => $userInfo['id'],
            'wxapp_id'   => 1,
            'content'    => trim($content),
            'created_at' => $dateTime,
            'updated_at' => $dateTime,
        ];
    }
}