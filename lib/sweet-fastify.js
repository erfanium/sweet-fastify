"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sweet = exports.authDataSymbol = void 0;
exports.authDataSymbol = Symbol('authData');
const preValidation = (req, rep, next) => {
    if (req.body === null)
        req.body = {};
    if (Array.isArray(req.body)) {
        const array = req.body;
        req.body = {
            body: array,
        };
    }
    Object.assign(req.body, req.params, req.query);
    next();
};
function sweet(route) {
    if (typeof route.mergeParams !== 'boolean') {
        route.mergeParams = route.method !== 'POST';
    }
    return {
        method: route.method,
        url: route.url,
        schema: {
            body: route.params,
        },
        onRequest: route.auth,
        preValidation: route.mergeParams ? preValidation : undefined,
        handler(req, rep) {
            return route.handler(req.body, req[exports.authDataSymbol], req, rep);
        },
    };
}
exports.sweet = sweet;
