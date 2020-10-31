<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_manage [ THE PROJECT NAME IS tools_manage ]
// +----------------------------------------------------------------------
// | FileName: VideoController.php
// +----------------------------------------------------------------------
// | Function: 视频管理
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Admin\Controllers\Video;

use App\Admin\Controllers\CommonController;
use App\Admin\Controllers\UserAuthController;
use App\Models\Admin\Video\Video;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Godruoyi\Snowflake\Snowflake;

class VideoController extends CommonController
{
    protected $title = '视频管理';

    public function form()
    {
        $form = new Form(new Video());
        $form->hidden('uuid', '全局标识')->default((new Snowflake())->id())->required();
        $form->hidden('wxapp_id')->default(UserAuthController::getWxAppId())->required();
        $form->text('title', '视频标题')->required()->help('视频标题将作为视频的名称');
        $form->image('cover', '视频封面')->required()->uniqueName()->thumbnail('small', $width = 300, $height = 100);
        $form->url('url', '视频地址')->required();
        $form->text('source', '视频来源')->default('暂无来源')->required();
        $form->time('video_time', '视频时长')->required();
        $form->number('play_number', '视频播放数')->default(0)->required();
        $states = [
            'on'  => ['value' => 1, 'text' => '是', 'color' => 'success'],
            'off' => ['value' => 2, 'text' => '否', 'color' => 'danger'],
        ];
        $form->switch('is_show', '显示状态')->states($states)->placeholder('是否显示');
        $form->switch('is_top', '显示状态')->states($states)->placeholder('是否置顶');
        $form->number('orders', '显示顺序')->default(0)->help('值越大越显示在前')->required();

        return $form;
    }

    public function grid()
    {
        $grid = new Grid(new Video());
        $grid->column('title', '视频标题');
        $grid->column('cover', '视频封面');
        $grid->column('url', '视频地址');
        $grid->column('video_time', '视频时长');
        $grid->column('play_number', '播放数量');
        $grid->column('is_show', '显示状态')->using(['1' => '启用', '2' => '禁用']);
        $grid->column('is_top', '显示状态')->using(['1' => '启用', '2' => '禁用']);
        return $grid;
    }

    public function detail($id)
    {
        return new Show(Video::query()->findOrFail($id));
    }
}