<?php

namespace App\Admin\Actions\Post;

use Encore\Admin\Actions\BatchAction;
use Illuminate\Database\Eloquent\Collection;

class PublicSetting extends BatchAction
{
    public $name = '公众号设置';

    public function handle(Collection $collection)
    {
        foreach ($collection as $model) {
            $bean = $model::query()->where([['id', '=', $model->id]])->first(['id', 'public_is_show']);
            if ($bean->public_is_show == 1) {
                $model::query()->where([['id', '=', $model->id]])->update(['public_is_show' => 2]);
            } elseif ($bean->public_is_show == 2) {
                $model::query()->where([['id', '=', $model->id]])->update(['public_is_show' => 1]);
            }
        }

        return $this->response()->success('设置成功')->refresh();
    }

}
