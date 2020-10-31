<?php

namespace App\Admin\Actions\Site;

use App\Models\Admin\Site\Site;
use Encore\Admin\Actions\RowAction;
use Illuminate\Database\Eloquent\Model;

class Redirect extends RowAction
{
    public $name = '跳转网址';


    public function handle(Model $model)
    {
        $this->href();
    }

    public function href()
    {
        $id   = $this->getKey();
        $item = Site::query()->where('id', '=', $id)->first();
        return $item->site_url;
    }

}