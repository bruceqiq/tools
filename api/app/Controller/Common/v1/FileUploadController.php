<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_api [ THE PROJECT NAME IS tools_api ]
// +----------------------------------------------------------------------
// | FileName: FielUploadController.php
// +----------------------------------------------------------------------
// | Function: 统一文件上传入口
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Controller\Common\v1;

use App\Controller\AbstractController;
use App\Functions\HttpDataResponse;
use App\Services\JwtService;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\Middleware;
use Hyperf\HttpServer\Annotation\PostMapping;
use League\Flysystem\Filesystem;
use App\Middleware\Auth\UserAuthMiddleware;

/**
 * @Controller(prefix="v1/common/file")
 * @Middleware(UserAuthMiddleware::class)
 * Class FileUploadController
 * @package App\Controller\Common\v1
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
     * @param Filesystem $filesystem
     * @return \Psr\Http\Message\ResponseInterface
     * @throws \League\Flysystem\FileExistsException
     */
    public function upload(Filesystem $filesystem)
    {
        $file   = $this->request->file('file');
        $stream = fopen($file->getRealPath(), 'r+');
        $filesystem->writeStream($file->getClientFilename(), $stream);
        fclose($stream);

        return $this->httpResponse->success(['url' => config('data.qiniu_http_url') . $file->getClientFilename()]);
    }
}