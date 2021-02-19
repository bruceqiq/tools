<?php

declare (strict_types=1);

namespace App\Model\MiNi;

use Hyperf\DbConnection\Model\Model;

/**
 * @property int $id
 * @property string $openid
 * @property string $nickname
 * @property string $avatar_url
 * @property int $gender
 * @property string $country
 * @property string $province
 * @property string $city
 * @property string $deleted_at
 * @property int $wxapp_id
 * @property string $created_at
 * @property string $updated_at
 * @property int $status
 */
class User extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'user';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'openid',
        'nickname',
        'avatar_url',
        'gender',
        'country',
        'province',
        'city',
        'wxapp_id',
        'status'
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id'          => 'integer',
        'gender'      => 'integer',
        'deleted_at'  => 'string',
        'wxapp_id'    => 'integer',
        'create_at'   => 'string',
        'update_time' => 'string',
        'status'      => 'integer'
    ];


    /**
     * 小程序用户登录
     * @param array $userInfo
     * @return array
     */
    public function createUser(array $userInfo): array
    {
        try {
            $user = User::query()->firstOrCreate(['openid' => $userInfo['openid']], $userInfo);
            return $user->where('openid', '=', $userInfo['openid'])->select(['*'])->get()->toArray();
        } catch (\Exception $exception) {
            var_dump($exception->getMessage());
        }

    }
}