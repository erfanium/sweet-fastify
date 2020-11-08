import { FastifyReply, FastifyRequest, HTTPMethods, onRequestHookHandler, RouteOptions } from 'fastify';
export declare const authDataSymbol: unique symbol;
export interface FastifyRequestWithAuthData<T = any> extends FastifyRequest {
    [authDataSymbol]?: T;
}
export interface SweetHandler<Params, Res> {
    (params: Params, authData: any, req: FastifyRequest, rep: FastifyReply): Promise<Res>;
}
export interface SweetRoute<Params, Res> {
    method: HTTPMethods | HTTPMethods[];
    url: string;
    params?: any;
    auth?: onRequestHookHandler;
    handler: SweetHandler<Params, Res>;
}
export declare function sweet<Params, Res>(route: SweetRoute<Params, Res>): RouteOptions;
