<?php

declare (strict_types=1);

namespace App\Model\Common;

use App\Model\CommonModel;
use Hyperf\Database\Model\SoftDeletes;

/**
 * @property int $id
 * @property string $resume_uuid
 * @property string $uuid
 * @property string $company_name
 * @property string $avatar
 * @property string $start_date
 * @property string $end_date
 * @property string $description
 * @property string $duty
 * @property string $duty_content
 * @property string $url
 * @property string $address
 * @property int $wxapp_id
 * @property int $is_show
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 * @property string $position
 */
class WorkExperience extends CommonModel
{
    use SoftDeletes;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'work_experience';
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
    protected $casts = ['id' => 'integer', 'wxapp_id' => 'integer', 'is_show' => 'integer', 'created_at' => 'datetime', 'updated_at' => 'datetime'];

    public function workSelect(): array
    {
        $items = WorkExperience::query()->select($this->searchFields())->orderByDesc('end_date')->get();

        return empty($items) ? [] : $items->toArray();
    }

    private function searchFields(): array
    {
        return [
            'company_name',
            'avatar',
            'start_date',
            'end_date',
            'end_date as work_status',
            'description',
            'duty',
            'duty_content',
            'department',
            'address',
            'url'
        ];
    }

    /**
     * 处理离职状态
     * @param $key
     * @return int
     */
    public function getWorkStatusAttribute($key)
    {
        $currentDate = date('Y-m-d');
        if (strtotime($currentDate) >= strtotime($key)) {
            return 2;
        } else {
            return 1;
        }
    }

    public function getUrlAttribute($key)
    {
        return empty($key) ? '' : $key;
    }
}