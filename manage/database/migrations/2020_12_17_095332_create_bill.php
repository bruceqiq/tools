<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateBill extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bill', function (Blueprint $table) {
            $table->integer('id', true, true);
            $table->uuid('bill_category_uuid')->comment('分类 uuid');
            $table->uuid('bill_tag_uuid')->comment('账户 uuid');
            $table->tinyInteger('type', false, true)->comment('收支类型1收入 2 支出');
            $table->uuid('uuid')->comment('uuid');
            $table->decimal('money', 20, 2)->unsigned()->comment('收支金额');
            $table->date('transaction_date')->comment('收支日期');
            $table->string('remark')->nullable()->comment('收支备注');
            $table->integer('user_id', false, true)->comment('用户 id');
            $table->integer('wxapp_id', false, true)->comment('wxapp_id');
            $table->tinyInteger('is_show', false, true)->default(1)->comment('是否显示');
            $table->dateTime('created_at')->comment('创建时间');
            $table->dateTime('updated_at')->comment('修改时间');
            $table->dateTime('deleted_at')->nullable()->comment('删除时间');
        });
        $tablePrefix = env('DB_PREFIX');
        DB::select("alter table {$tablePrefix}bill comment '账单明细'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bill');
    }
}
