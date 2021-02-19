<?php


namespace App\Controller\Common\v1\Bill;


use App\Controller\AbstractController;
use App\Functions\HttpDataResponse;
use App\Model\Common\BillTag;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Psr\Http\Message\ResponseInterface;

/**
 * Class TagController
 * @Controller(prefix="v1/bill/tag")
 * @package App\Controller\Common\v1\Bill
 */
class TagController extends AbstractController
{
    private $billTagModel = null;

    public function __construct(BillTag $bill)
    {
        $this->billTagModel = $bill;
    }

    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $httpResponse;

    /**
     * @GetMapping(path="list")
     * @return ResponseInterface
     */
    public function list()
    {
        return $this->httpResponse->success((array)$this->billTagModel->list());
    }
}