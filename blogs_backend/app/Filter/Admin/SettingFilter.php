<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | travel_manage [ THE PROJECT NAME IS travel_manage ]
// +----------------------------------------------------------------------
// | FileName: Setting.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------


namespace App\Filter\Admin;


class SettingFilter
{
    /**
     * 格式化列表数据
     * @param array $list
     * @return array
     */
    public static function list(array $list): array
    {
        $array = [];
        if (is_array($list) && count($list) > 0) {
            $valuesArray = array_column($list, 'values');
            $descArray   = array_column($list, 'describe');

            foreach ($valuesArray as $key => $value) {
                $array[$value] = $descArray[$key];
            }
        }

        return $array;
    }
}