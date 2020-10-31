<?php

declare (strict_types=1);

namespace App\Model\Common;

use Hyperf\DbConnection\Model\Model;

/**
 * @property string $key
 * @property string $describe
 * @property string $values
 * @property int $wxapp_id
 * @property \Carbon\Carbon $created_at
 * @property \Carbon\Carbon $updated_at
 * @property string $deleted_at
 * @property int $id
 */
class Setting extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'setting';
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
    protected $casts = ['wxapp_id' => 'integer', 'created_at' => 'datetime', 'updated_at' => 'datetime', 'id' => 'integer'];
}