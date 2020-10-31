<?php

declare(strict_types=1);

namespace App\Middleware\Auth;

use App\Constants\ErrorCode;
use App\Functions\HttpDataResponse;
use Hyperf\Di\Annotation\Inject;
use Hyperf\HttpServer\Contract\ResponseInterface as HttpResponse;
use Psr\Container\ContainerInterface;
use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class UserAuthMiddleware implements MiddlewareInterface
{
    /**
     * @var ContainerInterface
     */
    protected $container;

    /**
     * @var
     */
    protected $httpResponse;

    /**
     * @Inject()
     * @var HttpDataResponse
     */
    protected $response;

    /**
     * UserAuthMiddleware constructor.
     * @param ContainerInterface $container
     * @param HttpResponse $response
     */

    public function __construct(ContainerInterface $container, HttpResponse $response)
    {
        $this->container    = $container;
        $this->httpResponse = $response;
    }

    public function process(ServerRequestInterface $request, RequestHandlerInterface $handler): ResponseInterface
    {
        $authentication = $request->getCookieParams('authentication');
        if (empty($authentication)) {
            return $this->response->response(
                (int)ErrorCode::NO_LOGIN,
                (string)ErrorCode::getMessage(ErrorCode::NO_LOGIN),
                (array)[]);
        }
        return $handler->handle($request);
    }
}