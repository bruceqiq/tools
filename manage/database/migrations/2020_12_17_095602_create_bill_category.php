<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateBillCategory extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bill_category', function (Blueprint $table) {
            $table->integer('id', true, true);
            $table->uuid('uuid')->comment('uuid');
            $table->tinyInteger('type', false, true)->default(1)->comment('收支类型1收入 2 支出');
            $table->string('name', 255)->comment('类型名称');
            $table->integer('parent_id', false, true)->comment(0)->comment('上级分类');
            $table->string('remark')->nullable()->comment('备注');
            $table->integer('wxapp_id', false, true)->comment('wxapp_id');
            $table->tinyInteger('is_show', false, true)->default(1)->comment('是否显示');
            $table->dateTime('created_at')->comment('创建时间');
            $table->dateTime('updated_at')->comment('修改时间');
            $table->dateTime('deleted_at')->nullable()->comment('删除时间');
        });
        $tablePrefix = env('DB_PREFIX');
        DB::select("alter table {$tablePrefix}bill_category comment '账单分类'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bill_category');
    }
}
