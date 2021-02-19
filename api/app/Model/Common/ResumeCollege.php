<?php

declare (strict_types=1);

namespace App\Model\Common;

use App\Model\CommonModel;
use Hyperf\Database\Model\SoftDeletes;

/**
 * @property int $id
 * @property string $resume_uuid
 * @property string $uuid
 * @property string $college_name
 * @property string $college_start_date
 * @property string $college_end_date
 * @property string $college_profession
 * @property int $college_grade
 * @property int $wxapp_id
 * @property int $is_show
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 */
class ResumeCollege extends CommonModel
{
    use SoftDeletes;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'resume_college';
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
    protected $casts = ['id' => 'integer', 'college_grade' => 'integer', 'wxapp_id' => 'integer', 'is_show' => 'integer', 'created_at' => 'datetime', 'updated_at' => 'datetime'];

    public function collegeSelect(): array
    {
        $items = ResumeCollege::query()->select($this->searchFields())->orderByDesc('college_end_date')->get();

        return empty($items) ? [] : $items->toArray();
    }

    private function searchFields(): array
    {
        return [
            'college_name',
            'college_start_date',
            'college_end_date',
            'college_profession',
            'college_grade',
            'college_end_date as college_status'
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
     * 处理毕业状态
     * @param $key
     * @return int
     */
    public function getCollegeStatusAttribute($key)
    {
        $currentDate = date('Y-m-d');
        if (strtotime($currentDate) >= strtotime($key)) {
            return 2;
        } else {
            return 1;
        }
    }
}