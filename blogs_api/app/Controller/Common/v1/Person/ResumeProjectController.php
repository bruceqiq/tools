<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_api [ THE PROJECT NAME IS tools_api ]
// +----------------------------------------------------------------------
// | FileName: ResumeProjectController.php
// +----------------------------------------------------------------------
// | Function: 项目经验
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Controller\Common\v1\Person;

use App\Controller\AbstractController;
use App\Functions\HttpDataResponse;
use App\Model\Common\ProjectExperience;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Psr\Http\Message\ResponseInterface;


/**
 * @Controller(prefix="v1/site/resume")
 * Class ResumeController
 * @package App\Controller\Common\v1\Person
 */
class ResumeProjectController extends AbstractController
{
    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $httpResponse;

    /**
     * @GetMapping(path="project")
     * @param ProjectExperience $projectExperience
     * @return ResponseInterface
     */
    public function index(ProjectExperience $projectExperience)
    {
        $work = $projectExperience->projectSelect();

        return $this->httpResponse->success((array)$work);
    }
}