<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateWorkExperienceTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('work_experience', function (Blueprint $table) {
            $table->integer('id', true, true);
            $table->uuid('resume_uuid')->comment('简历uuid');
            $table->uuid('uuid')->comment('uuid');
            $table->string('company_name', 255)->comment('公司名称');
            $table->string('avatar', 255)->nullable()->comment('公司logo');
            $table->date('start_date')->comment('工作开始时间');
            $table->date('end_date')->comment('工作结束时间');
            $table->text('description')->comment('公司介绍');
            $table->string('duty', 32)->comment('担任角色');
            $table->string('department', 32)->comment('所在部门');
            $table->text('duty_content')->comment('负责内容');
            $table->string('url', 255)->nullable()->comment('公司链接');
            $table->string('address', 255)->nullable()->comment('公司地址');
            $table->integer('wxapp_id', false, true)->comment('wxapp_id');
            $table->tinyInteger('is_show', false, true)->default(1)->comment('是否显示');
            $table->dateTime('created_at')->comment('创建时间');
            $table->dateTime('updated_at')->comment('修改时间');
            $table->dateTime('deleted_at')->nullable()->comment('删除时间');
        });
        $tablePrefix = env('DB_PREFIX');
        DB::select("alter table {$tablePrefix}work_experience comment '工作经历'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('work_experience', function (Blueprint $table) {
            //
        });
    }
}
