<?php

declare (strict_types=1);

namespace App\Model\Common;

use App\Model\CommonModel;
use Hyperf\Database\Model\SoftDeletes;

/**
 * @property int $id
 * @property string $uuid
 * @property string $name
 * @property int $sex
 * @property int $age
 * @property string $birthday
 * @property string $residential_address
 * @property string $home-address
 * @property string $phone
 * @property string $email
 * @property string $avatar
 * @property string $nation
 * @property string $politics
 * @property float $height
 * @property string $college_name
 * @property string $college_profession
 * @property int $college_grade
 * @property int $system
 * @property string $professional_skill
 * @property string $description
 * @property int $wxapp_id
 * @property int $is_show
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 */
class Resume extends CommonModel
{
    use SoftDeletes;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'resume';
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
        'id'            => 'integer',
        'sex'           => 'integer',
        'age'           => 'integer',
        'height'        => 'float',
        'college_grade' => 'integer',
        'system'        => 'integer',
        'wxapp_id'      => 'integer',
        'is_show'       => 'integer',
        'created_at'    => 'datetime',
        'updated_at'    => 'datetime'
    ];

    public function resumeSelect(): array
    {
        $item = Resume::query()->select($this->searchFields())->first();

        return empty($item) ? [] : $item->toArray();
    }

    private function searchFields(): array
    {
        return [
            'name',
            'sex',
            'position',
            'entry_date',
            'phone',
            'email',
            'college_name',
            'college_profession',
            'college_grade',
            'system',
            'age',
            'native_place',
            'residential_address',
            'birthday',
            'home_address',
            'nation',
            'professional_skill',
        ];
    }

    /**
     * 处理学历等级
     * @param $key
     * @return mixed
     */
    public function getCollegeGradeAttribute($key)
    {
        $items           = Setting::query()->where('key', '=', 'college_grade')->select(['describe', 'values'])->get()->toArray();
        $itemsKeyArray   = array_column($items, 'values');
        $itemsValueArray = array_column($items, 'describe');
        $newArray        = array_combine($itemsKeyArray, $itemsValueArray);

        return empty($newArray[$key]) ? '' : $newArray[$key];
    }

    /**
     * 处理性别
     * @param $key
     * @return mixed
     */
    public function getSexAttribute($key)
    {
        $items           = Setting::query()->where('key', '=', 'sex')->select(['describe', 'values'])->get()->toArray();
        $itemsKeyArray   = array_column($items, 'values');
        $itemsValueArray = array_column($items, 'describe');
        $newArray        = array_combine($itemsKeyArray, $itemsValueArray);

        return empty($newArray[$key]) ? '' : $newArray[$key];
    }

    /**
     * 处理学制
     * @param $key
     * @return mixed
     */
    public function getSystemAttribute($key)
    {
        $items           = Setting::query()->where('key', '=', 'college_system')->select(['describe', 'values'])->get()->toArray();
        $itemsKeyArray   = array_column($items, 'values');
        $itemsValueArray = array_column($items, 'describe');
        $newArray        = array_combine($itemsKeyArray, $itemsValueArray);

        return empty($newArray[$key]) ? '' : $newArray[$key];
    }
}