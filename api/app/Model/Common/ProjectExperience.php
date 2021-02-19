<?php

declare (strict_types=1);

namespace App\Model\Common;

use App\Model\CommonModel;

/**
 * @property int $id
 * @property string $resume_uuid
 * @property string $uuid
 * @property string $project_name
 * @property string $project_start_date
 * @property string $project_end_date
 * @property int $develop_status
 * @property string $description
 * @property string $project_skill
 * @property string $duty
 * @property string $duty_content
 * @property string $url
 * @property int $wxapp_id
 * @property int $is_show
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 * @property string $work_experience_uuid
 */
class ProjectExperience extends CommonModel
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'project_experience';
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
    protected $casts = ['id' => 'integer', 'develop_status' => 'integer', 'wxapp_id' => 'integer', 'is_show' => 'integer', 'created_at' => 'datetime', 'updated_at' => 'datetime'];

    public function work()
    {
        return $this->belongsTo(WorkExperience::class, 'work_experience_uuid', 'uuid');
    }

    public function projectSelect(): array
    {
        $items = ProjectExperience::query()->with(['work:uuid,company_name'])->select($this->searchFields())->orderByDesc('work_experience_uuid')->get();

        return empty($items) ? [] : $items->toArray();
    }

    private function searchFields(): array
    {
        return [
            'project_name',
            'description',
            'project_skill',
            'project_start_date',
            'project_end_date',
            'develop_status',
            'duty',
            'duty_content',
            'url',
            'work_experience_uuid'
        ];
    }

    public function getUrlAttribute($key)
    {
        return empty($key) ? '' : $key;
    }
}