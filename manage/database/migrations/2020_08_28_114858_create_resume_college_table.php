<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateResumeCollegeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resume_college', function (Blueprint $table) {
            $table->integer('id', true, true);
            $table->uuid('resume_uuid')->comment('简历uuid');
            $table->uuid('uuid')->comment('uuid');
            $table->string('college_name', 32)->nullable()->comment('大学名字');
            $table->date('college_start_date')->nullable()->comment('入学日期');
            $table->date('college_end_date')->nullable()->comment('毕业日期');
            $table->string('college_profession', 32)->nullable()->comment('所学专业');
            $table->tinyInteger('college_grade', false, true)->default(0)->comment('学历等级');
            $table->integer('wxapp_id', false, true)->comment('wxapp_id');
            $table->tinyInteger('is_show', false, true)->default(1)->comment('是否显示');
            $table->dateTime('created_at')->comment('创建时间');
            $table->dateTime('updated_at')->comment('修改时间');
            $table->dateTime('deleted_at')->nullable()->comment('删除时间');
        });
        $tablePrefix = env('DB_PREFIX');
        DB::select("alter table {$tablePrefix}resume_college comment '教育经历'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('resume_college', function (Blueprint $table) {
            //
        });
    }
}
