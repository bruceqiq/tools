<?php

declare (strict_types=1);

namespace App\Model\Common;

use Hyperf\DbConnection\Model\Model;

/**
 * @property string $article_uuid
 * @property int $user_id
 * @property int $wxapp_id
 * @property int $created_time
 * @property int $updated_time
 * @property string $deleted_at
 */
class UserArticleRead extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_article_read';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'wxapp_id',
        'article_uuid',
    ];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'user_id'    => 'integer',
        'wxapp_id'   => 'integer',
        'created_at' => 'string',
        'updated_at' => 'string'
    ];
}