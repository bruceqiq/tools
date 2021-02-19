<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class CreateBillTagRelation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bill_tag_relation', function (Blueprint $table) {
            $table->uuid('bill_uuid')->comment('账单 uuid');
            $table->uuid('tag_uuid')->comment('账单标签 uuid');
        });
        $tablePrefix = env('DB_PREFIX');
        DB::select("alter table {$tablePrefix}bill_tag_relation comment '账单标签关联'");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bill_tag_relation');
    }
}
