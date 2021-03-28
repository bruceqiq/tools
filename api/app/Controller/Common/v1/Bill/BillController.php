<?php


namespace App\Controller\Common\v1\Bill;


use App\Controller\AbstractController;
use App\Functions\HttpDataResponse;
use App\Model\Common\Bill;
use App\Services\JwtService;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Annotation\Controller;
use Hyperf\HttpServer\Annotation\GetMapping;
use Hyperf\HttpServer\Annotation\Middleware;
use Hyperf\HttpServer\Annotation\PostMapping;
use Psr\Http\Message\ResponseInterface;
use App\Middleware\Auth\UserAuthMiddleware;

/**
 * @Controller(prefix="v1/bill")
 * Class BillController
 * @package App\Controller\Common\v1\Bill
 */
class BillController extends AbstractController
{
    private $billModel = null;

    public function __construct(Bill $bill)
    {
        $this->billModel = $bill;
    }

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
     * @Middleware(UserAuthMiddleware::class)
     * @PostMapping(path="create")
     * @return ResponseInterface
     */
    public function create()
    {
        $formData = $this->request->all();
        $userInfo = $this->jwtService->getUserInfo();
        $billInfo = [
            'type'               => $formData['firstTypeId'] == 1 ? 1 : 2,
            'money'              => trim($formData['money']),
            'user_id'            => $userInfo['id'],
            'wxapp_id'           => 0,
            'transaction_date'   => $formData['currentDate'],
            'remark'             => $formData['remark'],
            'uuid'               => time(),
            'bill_category_uuid' => $formData['thirdTypeId'],
            'bill_tag_uuid'      => $formData['tagId'],
        ];
        if (!empty($formData['billId'])) {
            $result = $this->billModel->billUpdate((array)$billInfo, (int)$userInfo['id'], (int)$formData['billId']);
        } else {
            $result = $this->billModel->billCreate((array)$billInfo);
        }

        return $result ? $this->httpResponse->success() : $this->httpResponse->error();
    }

    /**
     * @Middleware(UserAuthMiddleware::class)
     * @GetMapping(path="list")
     * @return ResponseInterface
     */
    public function list()
    {
        $requestParams = $this->request->all();
        $userInfo      = $this->jwtService->getUserInfo();
        $searchWhere   = [
            ['transaction_date', '>=', empty($requestParams['start_date']) ? date('Y-m-d') : $requestParams['start_date']],
            ['transaction_date', '<=', empty($requestParams['end_date']) ? date('Y-m-d') : $requestParams['end_date']],
            ['user_id', '=', $userInfo['id']]
        ];
        if (!empty($requestParams['tag_id'])) {
            array_push($searchWhere, ['bill_tag_uuid', '=', $requestParams['tag_id']]);
        }
        $list = $this->billModel->list((int)$requestParams['size'], (array)$searchWhere);

        return $this->httpResponse->success($list);
    }

    /**
     * @Middleware(UserAuthMiddleware::class)
     * @GetMapping(path="detail")
     * @return ResponseInterface
     */
    public function detail()
    {
        $userInfo = $this->jwtService->getUserInfo();
        $bean     = $this->billModel->detail((int)$userInfo['id'], (int)$this->request->all()['id']);

        return $this->httpResponse->success($bean);
    }

    /**
     * @Middleware(UserAuthMiddleware::class)
     * @PostMapping(path="delete")
     * @return ResponseInterface
     */
    public function delete()
    {
        $userInfo     = $this->jwtService->getUserInfo();
        $deleteResult = $this->billModel->del((int)$userInfo['id'], (int)$this->request->all()['id']);

        return $deleteResult ? $this->httpResponse->success() : $this->httpResponse->error();
    }
}
