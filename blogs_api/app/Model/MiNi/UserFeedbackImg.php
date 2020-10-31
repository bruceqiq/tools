<?php

declare (strict_types=1);

namespace App\Model\MiNi;

use Carbon\Carbon;
use Hyperf\DbConnection\Model\Model;

/**
 * @property int $id
 * @property string $content
 * @property int $user_id
 * @property int $user_feedback_id
 * @property int $wxapp_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 */
class UserFeedbackImg extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_feedback_img';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_feedback_id',
        'wxapp_id',
        'user_id',
        'content',
    ];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'               => 'integer',
        'user_id'          => 'integer',
        'user_feedback_id' => 'integer',
        'wxapp_id'         => 'integer',
        'created_at'       => 'datetime',
        'updated_at'       => 'datetime'
    ];

    /**
     * @param array $imgInfo
     * @return bool
     */
    public function insertFeedImg(array $imgInfo): bool
    {
        $returnVal = false;
        try {
            $returnVal = UserFeedbackImg::query()->insert($imgInfo);
        } catch (\Exception $exception) {
            // TODO 记录错误信息
        }

        return $returnVal;
    }
}