<?php

declare (strict_types=1);

namespace App\Model\Common;

use App\Exception\DBException;
use Hyperf\Database\Model\SoftDeletes;
use Hyperf\DbConnection\Model\Model;

/**
 * @property int $id
 * @property string $uuid
 * @property int $wxapp_id
 * @property string $content
 * @property int $is_show
 * @property string $created_time
 * @property string $updated_time
 * @property string $deleted_at
 */
class AboutMe extends Model
{
    use SoftDeletes;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'about_me';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'           => 'string',
        'wxapp_id'     => 'integer',
        'is_show'      => 'integer',
        'created_time' => 'string',
        'updated_time' => 'string'
    ];

    /**
     * 关于我们
     * @return array
     */
    public function aboutMe(): array
    {
        $bean = AboutMe::query()->where('is_show', '=', 1)
            ->select(['content', 'click', 'uuid as id'])
            ->first();

        return (!empty($bean)) ? ($bean->toArray()) : ([]);
    }

    /**
     * 更新点赞
     * @param string $id
     * @return int
     */
    public function updateClick(string $id): int
    {
        try {
            return AboutMe::query()->where('uuid', '=', $id)->increment('click');
        } catch (\Throwable $throwable) {
            throw new DBException('更新异常', 500);
            return 0;
        }
    }
}