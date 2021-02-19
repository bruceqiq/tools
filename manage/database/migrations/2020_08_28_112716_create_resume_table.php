<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateResumeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('resume', function (Blueprint $table) {
            $table->integer('id', true, true);
            $table->uuid('uuid')->comment('uuid');
            // 基础信息
            $table->string('name', 32)->comment('姓名');
            $table->tinyInteger('sex', false, true)->default(3)->comment('性别1男|2女|3无');
            $table->tinyInteger('age', false, true)->default(0)->comment('年龄');
            $table->string('position', 32)->comment('面试岗位');
            $table->string('native_place', 32)->comment('籍贯');
            $table->string('entry_date', 32)->comment('入职日期');
            $table->date('birthday')->comment('出生日期');
            $table->string('residential_address', 255)->nullable()->comment('居住地址');
            $table->string('home_address', 255)->nullable()->comment('家庭地址');
            $table->string('phone', 32)->comment('联系电话');
            $table->string('email', 32)->comment('联系邮箱');
            $table->string('avatar', 255)->nullable()->comment('个人头像');
            $table->string('nation', 255)->comment('民族');
            $table->string('politics', 255)->comment('政治面貌');
            $table->decimal('height', 20, 2)->default(0.00)->comment('身(cm)');
            $table->string('college_name', 32)->nullable()->comment('大学名字');
            $table->string('college_profession', 32)->nullable()->comment('所学专业');
            $table->tinyInteger('college_grade', false, true)->nullable()->default(0)->comment('学历等级');
            $table->tinyInteger('system', false, true)->nullable()->default(0)->comment('学制');
            // 个人技能
            $table->text('professional_skill')->comment('个人技能');
            // 个人介绍
            $table->text('description')->nullable()->comment('个人简介');
            $table->integer('wxapp_id', false, true)->comment('wxapp_id');
            $table->tinyInteger('is_show', false, true)->default(1)->comment('是否显示');
            $table->dateTime('created_at')->comment('创建时间');
            $table->dateTime('updated_at')->comment('修改时间');
            $table->dateTime('deleted_at')->nullable()->comment('删除时间');
        });
        $tablePrefix = env('DB_PREFIX');
        DB::select("alter table {$tablePrefix}resume comment '简历基础信息'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('resume', function (Blueprint $table) {
            //
        });
    }
}
