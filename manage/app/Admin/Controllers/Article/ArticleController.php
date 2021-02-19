<?php
// +----------------------------------------------------------------------
// | park_server [ THE PROJECT NAME IS park_server ]
// +----------------------------------------------------------------------
// | FileName: ArticleTagController.php
// +----------------------------------------------------------------------
// | Function: 文章管理
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------
declare(strict_types=1);

namespace App\Admin\Controllers\Article;

use App\Admin\Controllers\CommonController;
use App\Admin\Controllers\UserAuthController;
use App\Models\Admin\Article\Article;
use App\Models\Admin\Article\ArticleCategory;
use App\Models\Admin\Article\ArticleCategoryRelation;
use App\Models\Admin\Article\ArticleTag;
use App\Models\Admin\Article\ArticleTagRelation;
use Encore\Admin\Form;
use Encore\Admin\Grid;
use Encore\Admin\Show;
use Godruoyi\Snowflake\Snowflake;

class ArticleController extends CommonController
{
    protected $title = '文章管理';

    protected function grid()
    {
        $grid = new Grid(new Article());
        $grid->column('id', '编号')->sortable();
        $grid->column('category.article_category_uuid', '文章分类')->display(function ($articleCategoryUuid) {
            $categoryName = ArticleCategory::where('uuid', '=', $articleCategoryUuid)->select(['name'])->first();
            return empty($categoryName) ? '' : $categoryName->name;
        });
        $grid->column('uuid', '全局标识');
        $grid->column('title', '一级标题')->filter();
        $grid->column('second_title', '二级标题')->filter();
        $grid->column('orders', '显示顺序')->sortable();
        $grid->column('is_show', '是否显示')->display(function ($isShow) {
            if ($isShow == 0) {
                return "<span class='label bg-red'>禁用</span>";
            } elseif ($isShow == 1) {
                return "<span class='label bg-green'>启用</span>";
            } else {
                return '异常';
            }
        });
        $grid->column('created_at', '创建时间');
        $grid->filter(function ($filter) {
            $filter->disableIdFilter();
            $filter->like('title', '文章标题');
        });
        $grid->actions(function ($actions) {
            $actions->disableView();
        });
        return $grid;
    }

    protected function detail($id)
    {
        return new Show(Article::findOrFail($id));
    }

    protected function form()
    {
        $form = new Form(new Article());
        $form->hidden('uuid', '全局标识')->default((new Snowflake())->id())->required();
        $form->hidden('wxapp_id')->default(UserAuthController::getWxAppId())->required();
        $form->tab('基础信息', function ($form) {
            // 查询文章分类
            $articleCategoryItems = ArticleCategory::where('is_show', '=', 1)->get();
            $articleCategoryArray = [];
            foreach ($articleCategoryItems as $value) {
                $articleCategoryArray[$value->uuid] = $value->name;
            }
            // 查询文章标签
            $articleTagItems = ArticleTag::where('is_show', '=', 1)->get();
            $articleTagArray = [];
            foreach ($articleTagItems as $value) {
                $articleTagArray[$value->uuid] = $value->name;
            }
            // 处理回显问题
            if ($form->isEditing()) {
                $requestParams       = request()->route()->parameters();
                $articleUuId         = (Article::where('id', '=', $requestParams['list'])->select('uuid')->first())->uuid;
                $articleCategoryUuId = (ArticleCategoryRelation::where('article_uuid', '=', $articleUuId)
                    ->select('article_category_uuid')
                    ->first())->article_category_uuid;
                $articleTagUuId      = (ArticleTagRelation::where('article_uuid', '=', $articleUuId)
                    ->select('article_tag_uuid')
                    ->first())->article_tag_uuid;
                $form->select('category_uuid', '文章分类')->options($articleCategoryArray)->default($articleCategoryUuId)->required();
                $form->select('tag_uuid', '文章标签')->options($articleTagArray)->default($articleTagUuId)->required();
            } elseif ($form->isCreating()) {
                $form->select('category_uuid', '文章分类')->options($articleCategoryArray)->required();
                $form->select('tag_uuid', '文章标签')->options($articleTagArray)->required();
            }
            $form->tags('keywords', '文章标签')->help('输入标签按回车键');
            $form->text('title', '文章标题')->required()->help('用于详情导航栏展示,推荐文字数量不要超过8个');
            $form->text('second_title', '文章标题')->required()->help('用于列表页面和详情页展示');
            $form->text('author', '发布作者')->required()->help('最大长度不能超过32位');
            $form->text('description', '文章简介')->required()->help('最大长度不能超过32位');
            $form->image('cover', '文章封面')->required()->downloadable();
            $form->datetime('publish_time', '自动发布时间');
        })->tab('内容设置', function ($form) {
            $form->UEditor('content', '文章内容')->options(['initialFrameHeight' => 400])->required();
        })->tab('积分设置', function ($form) {
            $form->number('reading_score', '阅读积分')->required()->default(1);
            $form->number('click_score', '点赞积分')->required()->default(1);
            $form->number('share_score', '分享积分')->required()->default(1);
            $form->number('collection_score', '收藏积分')->required()->default(1);
        })->tab('阅读设置', function ($form) {
            $form->number('reading', '阅读数量')->default(0);
            $form->number('click', '点赞数量')->default(0);
            $form->number('share', '分享数量')->default(0);
            $form->number('collection', '收藏数量')->default(0);
            $form->number('oppose', '反对数量')->default(0);
        })->tab('状态设置', function ($form) {
            $states = [
                'on'  => ['value' => 1, 'text' => '打开', 'color' => 'success'],
                'off' => ['value' => 0, 'text' => '禁用', 'color' => 'danger'],
            ];
            $form->switch('is_show', '显示状态')->states($states)->placeholder('是否显示');
            $form->switch('is_top', '置顶状态')->states($states)->placeholder('是否置顶');
            $form->switch('is_hot', '热门状态')->states($states)->placeholder('是否热门');
            $form->number('orders', '显示顺序')->required()->default(0);
        });
        $form->ignore('category_uuid');
        $form->ignore('tag_uuid');
        // 文章标签和分类处理
        $form->saved(function (Form $form) {
            $articleUuId  = Article::find($form->model()->id)->uuid;
            $categoryUuId = request('category_uuid');
            $tagUuId      = request('tag_uuid');
            if ($form->isCreating()) {
                $this->createArticleCategoryRelation((string)$categoryUuId, $articleUuId);
                $this->createArticleTagRelation((string)$tagUuId, (string)$articleUuId);
            } elseif ($form->isEditing()) {
                $this->updateArticleCategoryRelation((string)$categoryUuId, $articleUuId);
                $this->updateArticleTagRelation((string)$tagUuId, (string)$articleUuId);
            }
        });
        return $form;
    }

    private function createArticleCategoryRelation(string $categoryUuId, string $articleUuId): bool
    {
        ArticleCategoryRelation::create([
            'article_category_uuid' => $categoryUuId,
            'article_uuid'          => $articleUuId,
            'wxapp_id'              => UserAuthController::getWxAppId()
        ]);

        return true;
    }

    private function createArticleTagRelation(string $tagUuId, string $articleUuId): bool
    {
        ArticleTagRelation::create([
            'article_tag_uuid' => $tagUuId,
            'article_uuid'     => $articleUuId,
            'wxapp_id'         => UserAuthController::getWxAppId()
        ]);

        return true;
    }

    public function updateArticleCategoryRelation(string $categoryUuId, string $articleUuId): bool
    {
        ArticleCategoryRelation::where('article_uuid', '=', $articleUuId)->update([
            'article_category_uuid' => $categoryUuId,
            'article_uuid'          => $articleUuId,
            'wxapp_id'              => UserAuthController::getWxAppId()
        ]);

        return true;
    }

    public function updateArticleTagRelation(string $tagUuId, string $articleUuId): bool
    {
        ArticleTagRelation::where('article_uuid', '=', $articleUuId)->update([
            'article_tag_uuid' => $tagUuId,
            'article_uuid'     => $articleUuId,
            'wxapp_id'         => UserAuthController::getWxAppId()
        ]);

        return true;
    }
}
