<?php

declare (strict_types=1);

namespace App\Model\Common;

use App\Exception\DBException;
use Hyperf\DbConnection\Model\Model;

/**
 * @property int $id
 * @property string $uuid
 * @property string $site_uuid
 * @property int $user_id
 * @property int $is_show
 * @property int $wxapp_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 */
class UserSiteCollection extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user_site_collection';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = ['uuid', 'user_id', 'site_uuid'];
    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = ['id' => 'integer', 'user_id' => 'integer', 'is_show' => 'integer', 'wxapp_id' => 'integer', 'created_at' => 'datetime', 'updated_at' => 'datetime'];

    /**
     * 创建用户站点收藏
     * @param string $siteUUid 站点uuid
     * @param int $userId 用户id
     * @param int $wxAppId
     * @return bool
     */
    public function collectionCreate(string $siteUUid, int $userId, int $wxAppId = 0): bool
    {
        $returnVal = false;
        try {
            self::query()->create([
                'site_uuid' => $siteUUid,
                'user_id'   => $userId,
                'wxapp_id'  => $wxAppId,
                'uuid'      => time(),
            ]);
            Site::query()->where('uuid', '=', $siteUUid)->increment('collection');
            $returnVal = true;
        } catch (\Throwable $throwable) {
            throw new DBException($throwable->getMessage(), 500);
        }

        return $returnVal;
    }

    /**
     * 查询用户站点收藏情况
     * @param int $userId 用户id
     * @param string $siteUuid 站点uuid
     * @return int
     */
    public function siteCollectionSelect(int $userId, string $siteUuid): int
    {
        $bean = self::query()->where([['site_uuid', '=', $siteUuid], ['user_id', '=', $userId]])->select(['id'])->first();

        return !empty($bean) ? 1 : 2;
    }
}