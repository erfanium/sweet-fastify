import {
  FastifyReply,
  FastifyRequest,
  HTTPMethods,
  onRequestHookHandler,
  RouteOptions,
} from 'fastify';

export const authDataSymbol = Symbol('authData');

export interface FastifyRequestWithAuthData<T = any> extends FastifyRequest {
  [authDataSymbol]?: T;
}

export interface SweetHandler<Params, Res> {
  (
    params: Params,
    authData: any,
    req: FastifyRequest,
    rep: FastifyReply
  ): Promise<Res>;
}

export interface SweetRoute<Params, Res> {
  method: HTTPMethods | HTTPMethods[];
  url: string;
  params?: any;
  auth?: onRequestHookHandler;
  handler: SweetHandler<Params, Res>;
}

export function sweet<Params, Res>(
  route: SweetRoute<Params, Res>
): RouteOptions {
  return {
    method: route.method,
    url: route.url,
    schema: {
      body: route.params,
    },
    onRequest: route.auth,
    preValidation: (req, rep, next) => {
      if (req.body === null) req.body = {};
      if (Array.isArray(req.body)) {
        const array = req.body
        req.body = {
          body: array
        }
      }
      Object.assign(req.body, req.params, req.query);
      next();
    },
    handler(req: FastifyRequestWithAuthData, rep) {
      return route.handler(req.body as Params, req[authDataSymbol], req, rep);
    },
  };
}
