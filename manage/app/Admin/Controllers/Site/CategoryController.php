<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_manage [ THE PROJECT NAME IS tools_manage ]
// +----------------------------------------------------------------------
// | FileName: CategoryContoller.php
// +----------------------------------------------------------------------
// | Function: 站点分类
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Admin\Controllers\Site;

use App\Admin\Controllers\CommonController;
use App\Admin\Controllers\UserAuthController;
use App\Models\Admin\Site\SiteCategory;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Godruoyi\Snowflake\Snowflake;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class CategoryController extends CommonController
{
    protected $title = '站点分类';

    public function grid()
    {
        $grid = new Grid(new SiteCategory());
        $grid->column('id', '数据编号');
        $grid->column('title', '分类名称');
        $grid->column('cover', '分类封面')->lightbox(['width' => 100, 'height' => 100]);
        $grid->column('orders', '显示顺序')->sortable();
        $grid->column('is_show', '状态')->display(function ($isShow) {
            if ($isShow == 2) {
                return "<span class='label bg-red'>禁用</span>";
            } elseif ($isShow == 1) {
                return "<span class='label bg-green'>启用</span>";
            } else {
                return '异常';
            }
        });       
        $grid->filter(function ($filter) {
            $filter->disableIdFilter();
            $filter->column(1 / 2, function ($filter) {
                $filter->like('title', '分类名称');
            });
            $filter->column(1 / 2, function ($filter) {
                $filter->equal('is_show', '启用状态')->select([1 => '启用', 2 => '禁用']);
            });
        });

        return $grid;
    }

    public function form()
    {
        $form = new Form(new SiteCategory());
        $form->hidden('uuid', '全局标识')->default((new Snowflake())->id())->required();
        $form->hidden('wxapp_id')->default(UserAuthController::getWxAppId())->required();
        $category = (new SiteCategory())::query()->select(['id', 'title'])->where('parent_id', '=', 0)->get();
        if (!empty($category)) {
            $category = $category->toArray();
        }
        $categoryIdArray    = array_column($category, 'id');
        $categoryTitleArray = array_column($category, 'title');
        $category           = array_combine($categoryIdArray, $categoryTitleArray);
        $category[0]        = '顶级分类';
        $form->select('parent_id', '上级分类')->options($category)->required();
        $form->text('title', '分类名称')->required()->help('站点分类,建议四个汉字');
        $form->image('cover', '分类封面');
        $states = [
            'on'  => ['value' => 1, 'text' => '打开', 'color' => 'success'],
            'off' => ['value' => 2, 'text' => '禁用', 'color' => 'danger'],
        ];
        $form->switch('is_show', '显示状态')->states($states)->placeholder('是否显示');
        $form->number('orders', '显示顺序')->default(0)->help('值越大越显示在前')->required();

        return $form;
    }

    /**
     * 站点详情
     * @param $id
     * @user: quanquan
     * @return Builder|Builder[]|Collection|Model
     */
    public function detail($id)
    {
        return (new SiteCategory())::query()->findOrFail($id);
    }
}