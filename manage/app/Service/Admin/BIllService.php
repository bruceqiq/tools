<?php

namespace App\Service\Admin;

use App\Models\Admin\Bill\Bill;

class BillService
{
    protected $billModel;

    public function __construct()
    {
        $this->billModel = new Bill();
    }

    /**
     * 统计月份收支数据
     */
    public function getEchartsDataByMoney(): array
    {
       $items = $this->billModel::query()->groupBy('transaction_date')->get(['id', 'transaction_date', 'money']);
       
       return $items->toArray();
    }
}
