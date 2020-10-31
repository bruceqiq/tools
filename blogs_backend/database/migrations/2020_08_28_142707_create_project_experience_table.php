<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateProjectExperienceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_experience', function (Blueprint $table) {
            $table->integer('id', true, true);
            $table->uuid('resume_uuid')->comment('简历uuid');
            $table->uuid('work_experience_uuid')->comment('工作经历uuid');
            $table->uuid('uuid')->comment('uuid');
            $table->string('project_name', 255)->comment('项目名称');
            $table->date('project_start_date')->comment('项目开始时间');
            $table->date('project_end_date')->comment('项目结束时间');
            $table->tinyInteger('develop_status', false, true)->default(2)->comment('项目进度1开发中|2开发结束');
            $table->text('description')->comment('项目介绍');
            $table->text('project_skill')->comment('技术介绍');
            $table->string('duty', 32)->comment('担任角色');
            $table->text('duty_content')->comment('负责内容');
            $table->text('url')->nullable()->comment('项目链接');
            $table->integer('wxapp_id', false, true)->comment('wxapp_id');
            $table->tinyInteger('is_show', false, true)->default(1)->comment('是否显示');
            $table->dateTime('created_at')->comment('创建时间');
            $table->dateTime('updated_at')->comment('修改时间');
            $table->dateTime('deleted_at')->nullable()->comment('删除时间');
        });
        $tablePrefix = env('DB_PREFIX');
        DB::select("alter table {$tablePrefix}project_experience comment '项目经历'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('project_experience', function (Blueprint $table) {
            //
        });
    }
}
