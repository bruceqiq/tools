<?php
// +----------------------------------------------------------------------
// | travel_api [ THE PROJECT NAME IS travel_api ]
// +----------------------------------------------------------------------
// | FileName: WxAppIdSearchScope.php
// +----------------------------------------------------------------------
// | Function: 全局查询作用域
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Scopes;

use Hyperf\Database\Model\Builder;
use Hyperf\Database\Model\Model;
use Hyperf\Database\Model\Scope;
use Hyperf\HttpServer\Contract\RequestInterface;

class WxAppIdSearchScope implements Scope
{

    /**
     * @inheritDoc
     */
    public function apply(Builder $builder, Model $model)
    {
        $builder->where([['wxapp_id', '=', 0], ['is_show', '=', 1]]);
    }

    public function getRequestParams(RequestInterface $request): string
    {
        return $request->input('wxapp_id', '');
    }
}