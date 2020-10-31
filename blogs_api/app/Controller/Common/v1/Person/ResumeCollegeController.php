<?php
declare(strict_types=1);
// +----------------------------------------------------------------------
// | tools_api [ THE PROJECT NAME IS tools_api ]
// +----------------------------------------------------------------------
// | FileName: ResumeCollegeController.php
// +----------------------------------------------------------------------
// | Function: 教育经历
// +----------------------------------------------------------------------
// | Site ( http://www.qqdeveloper.com )
// +----------------------------------------------------------------------
// | Author: 卡二条 <2665274677@qq.com>
// +----------------------------------------------------------------------

namespace App\Controller\Common\v1\Person;

use App\Controller\AbstractController;
use App\Functions\HttpDataResponse;
use App\Model\Common\ResumeCollege;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Psr\Http\Message\ResponseInterface;


/**
 * @Controller(prefix="v1/site/resume")
 * Class ResumeController
 * @package App\Controller\Common\v1\Person
 */
class ResumeCollegeController extends AbstractController
{
    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $httpResponse;

    /**
     * @GetMapping(path="college")
     * @param ResumeCollege $resumeCollege
     * @return ResponseInterface
     */
    public function index(ResumeCollege $resumeCollege)
    {
        $college = $resumeCollege->collegeSelect();

        return $this->httpResponse->success((array)$college);
    }
}