<?php


namespace App\Controller\Common\v1\Bill;


use App\Controller\AbstractController;
use App\Functions\HttpDataResponse;
use App\Model\Common\BillCategory;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Psr\Http\Message\ResponseInterface;

/**
 * Class CategoryController
 * @Controller(prefix="v1/bill/category")
 * @package App\Controller\Common\v1\Bill
 */
class CategoryController extends AbstractController
{
    private $billCategoryModel = null;

    public function __construct(BillCategory $bill)
    {
        $this->billCategoryModel = $bill;
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
        return $this->httpResponse->success((array)$this->billCategoryModel->list());
    }
}