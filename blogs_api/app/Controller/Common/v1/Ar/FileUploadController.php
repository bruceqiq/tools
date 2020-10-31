<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | travel_api [ THE PROJECT NAME IS travel_api ]
// +----------------------------------------------------------------------
// | FileName: FileUploadController.php
// +----------------------------------------------------------------------
// | Function: 
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------


namespace App\Controller\Common\v1\Ar;


use App\Controller\AbstractController;
use App\Functions\HttpDataResponse;
use App\Services\JwtService;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\PostMapping;
use Hyperf\HttpServer\Contract\RequestInterface;
use Psr\Http\Message\ResponseInterface;

/**
 * @Controller(prefix="v1/common/ai/file")
 * Class FileUploadController
 * @package App\Controller\Common\v1\Ar
 */
class FileUploadController extends AbstractController
{
    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $httpResponse;

    /**
     * @Inject()
     * @var JwtService
     */
    protected $jwtService;

    /**
     * 文件上传
     * @PostMapping(path="upload")
     * @param RequestInterface $request
     * @return ResponseInterface
     */
    public function upload(RequestInterface $request)
    {
        // 验证文件
        if ($request->hasFile('file') && $request->file('file')->isValid()) {
            // 获取用户登录信息
            $userInfo = $this->jwtService->getUserInfo();
            // 存储文件
            $file     = $request->file('file');
            $rootPath = config('server.settings.document_root');
            $dirName  = $rootPath . '/images/' . $userInfo['id'] . '/' . date('Y-m-d');
            if (!is_dir($dirName)) {
                mkdir($dirName, 0777, true);
            }
            $fileName = $file->getClientFilename() . time() . '.' . $file->getExtension();
            $file->moveTo($dirName . "/{$fileName}");
            // 请求百度AI API地址
            return $this->httpResponse->success();
        } else {
            return $this->httpResponse->error();
        }
    }

    /**
     * 图片识别场景
     * @param string $scene 场景
     * @param string $filePath 文件路径
     * @return array
     */
    private function getAiScene(string $scene, string $filePath): array
    {
        $strArray = explode('-', $scene);
        $count    = count($strArray);
        $str      = '';
        for ($i = 1; $i < $count; $i++) {
            $str .= ucfirst($strArray[$i]);
        }
        $method = $strArray[0] . $str;
        return $this->$method((string)$filePath);
    }

    /**
     * 菜品识别
     * @param string $filePath
     * @return array
     */
    private function vegetable(string $filePath): array
    {

    }

    /**
     * 汽车识别
     * @param string $filePath
     * @return array
     */
    private function car(string $filePath): array
    {

    }

    /**
     * 动物识别
     * @param string $filePath
     * @return array
     */
    private function animal(string $filePath): array
    {

    }

    /**
     * 植被识别
     * @param string $filePath
     * @return array
     */
    private function plant(string $filePath): array
    {

    }

    /**
     * 红酒识别
     * @param string $filePath
     * @return array
     */
    private function redWine(string $filePath): array
    {

    }

    /**
     * 货币识别
     * @param string $filePath
     * @return array
     */
    private function money(string $filePath): array
    {

    }
}