<?php

declare (strict_types=1);

namespace App\Model\MiNi;

use Carbon\Carbon;
use Hyperf\DbConnection\Model\Model;

/**
 * @property int $id
 * @property string $content
 * @property int $user_id
 * @property int $wxapp_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 */
class UserFeedback extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_feedback';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
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
        'id'         => 'integer',
        'user_id'    => 'integer',
        'wxapp_id'   => 'integer',
        'created_at' => 'datetime',
        'updated_at' => 'datetime'
    ];

    /**
     * @param array $feedBackInfo
     * @return int
     */
    public function insertFeedBack(array $feedBackInfo): int
    {
        $returnVal = 0;
        try {
            $returnVal = UserFeedback::query()->insertGetId($feedBackInfo);
        } catch (\Exception $exception) {
            // TODO 记录错误信息
            var_dump($exception->getMessage());
        }
        return $returnVal;
    }
}