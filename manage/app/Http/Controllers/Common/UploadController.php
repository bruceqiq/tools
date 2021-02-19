<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | travel_manage [ THE PROJECT NAME IS travel_manage ]
// +----------------------------------------------------------------------
// | FileName: UploadController.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------


namespace App\Http\Controllers\Common;


use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class UploadController extends Controller
{
    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function upload(Request $request)
    {
        if ($request->hasFile('file')) {
            $url         = $request->file('file');
            $fileContent = file_get_contents($url->path());
            $fileName    = date('YmdHis') . '/' . time() . '.jpg';
            Storage::disk('admin')->put($fileName, $fileContent);
            $url = config('filesystems.disks.admin.url') . '/' . $fileName;
        } else {
            $url = 'https://pic.cnblogs.com/face/1501373/20200119190802.png';
        }

        return response()->json([
            'code'    => 1000,
            'message' => 'success',
            'data'    => [
                'url' => $url,
            ],
        ]);

    }
}