<?php

declare (strict_types=1);

namespace App\Model\Common;

use Hyperf\Database\Model\Relations\Pivot;

/**
 * @property string $article_uuid
 * @property string $article_category_uuid
 * @property int $wxapp_id
 * @property string $created_time
 * @property string $updated_time
 */
class ArticleCategoryRelation extends Pivot
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'article_category_relation';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];

}