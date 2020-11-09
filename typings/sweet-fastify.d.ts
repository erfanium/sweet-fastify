import { FastifyReply, FastifyRequest, HookHandlerDoneFunction, HTTPMethods, RouteOptions } from 'fastify';
export declare const authDataSymbol: unique symbol;
export interface FastifyRequestWithAuthData<T> extends FastifyRequest {
    [authDataSymbol]?: T;
}
export interface SweetHandler<Params, Res, AuthData> {
    (params: Params, authData: AuthData, req: FastifyRequest, rep: FastifyReply): Promise<Res>;
}
export interface SweetAuth<AuthData> {
    (req: FastifyRequestWithAuthData<AuthData>, rep: FastifyReply, done: HookHandlerDoneFunction): Promise<unknown> | void;
}
export interface SweetRoute<Params, Res, AuthData> {
    method: HTTPMethods | HTTPMethods[];
    url: string;
    params?: any;
    mergeParams?: boolean;
    auth?: SweetAuth<AuthData>;
    handler: SweetHandler<Params, Res, AuthData>;
}
export declare function sweet<Params, Res, AuthData>(route: SweetRoute<Params, Res, AuthData>): RouteOptions;
