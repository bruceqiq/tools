<?php
/**
 * 微信用户表
 */

use Hyperf\Database\Schema\Schema;
use Hyperf\Database\Schema\Blueprint;
use Hyperf\DbConnection\Db;
use Hyperf\Database\Migrations\Migration;

class CreateUserTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('openid', 255)->comment('openid');
            $table->string('nickname', 255)->nullable()->comment('用户昵称');
            $table->tinyInteger('sex', false, true)->default(0)->nullable()->comment('用户性别1男|2女|0未知');
            $table->string('province', 255)->nullable()->default()->comment('省份');
            $table->string('city', 255)->nullable()->default()->comment('城市');
            $table->string('country', 255)->nullable()->default()->comment('国家');
            $table->text('headimgurl')->nullable()->comment('用户头像');
            $table->json('privilege')->nullable()->comment('用户特权信息');
            $table->string('unionid', 255)->nullable()->comment('用户unionid');
            $table->string('login_number')->nullable()->comment('管理系统登录账号');
            $table->string('login_pwd', 255)->nullable()->comment('管理系统登录密码');
            $table->timestamp('deleted_at')->nullable()->comment('逻辑删除时间');
            $table->tinyInteger('is_forbidden')->nullable()->default(1)->comment('账号状态1正常|2禁用');
            $table->integer('user_id', false, true)->nullable()->default(0)->comment('管理系统用户id');
            $table->timestamps();
        });
        Db::select("alter table `user`  comment '微信用户信息表'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user');
    }
}
