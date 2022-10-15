"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRefreshResponse = exports.AccessTokenErrorResponse = exports.InternalErrorResponse = exports.ValidationErrorResponse = exports.BadRequestResponse = exports.ForbiddenResponse = exports.NotAllowedResponse = exports.AuthFailureResponse = exports.NotFoundResponse = exports.CreatedResponse = exports.SuccessResponse = exports.FailureMsgResponse = exports.SuccessMsgResponse = void 0;
// import { PaginationResult } from '../utils';
// import { PaginationResult } from '../helpers/Pagination';
var StatusCode;
(function (StatusCode) {
    StatusCode["SUCCESS"] = "10000";
    StatusCode["FAILURE"] = "10001";
    StatusCode["RETRY"] = "10002";
    StatusCode["INVALID_ACCESS_TOKEN"] = "10003";
})(StatusCode || (StatusCode = {}));
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus[ResponseStatus["SUCCESS"] = 200] = "SUCCESS";
    ResponseStatus[ResponseStatus["CREATED"] = 201] = "CREATED";
    ResponseStatus[ResponseStatus["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    ResponseStatus[ResponseStatus["VALIDATION_ERROR"] = 422] = "VALIDATION_ERROR";
    ResponseStatus[ResponseStatus["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    ResponseStatus[ResponseStatus["FORBIDDEN"] = 403] = "FORBIDDEN";
    ResponseStatus[ResponseStatus["NOT_FOUND"] = 404] = "NOT_FOUND";
    ResponseStatus[ResponseStatus["INTERNAL_ERROR"] = 500] = "INTERNAL_ERROR";
    ResponseStatus[ResponseStatus["NOT_ALLOWED"] = 405] = "NOT_ALLOWED";
})(ResponseStatus || (ResponseStatus = {}));
class ApiResponse {
    constructor(success, status, message) {
        this.success = success;
        this.status = status;
        this.message = message;
    }
    prepare(res, response) {
        return res.status(this.status).json(ApiResponse.sanitize(response));
    }
    send(res) {
        return this.prepare(res, this);
    }
    static sanitize(response) {
        const clone = {};
        Object.assign(clone, response);
        //@ts-ignore
        delete clone.status;
        for (const i in clone) {
            if (typeof clone[i] === 'undefined')
                delete clone[i];
        }
        return clone;
    }
}
class SuccessMsgResponse extends ApiResponse {
    constructor(message) {
        super(true, ResponseStatus.SUCCESS, message);
    }
}
exports.SuccessMsgResponse = SuccessMsgResponse;
class FailureMsgResponse extends ApiResponse {
    constructor(message) {
        super(false, ResponseStatus.SUCCESS, message);
    }
}
exports.FailureMsgResponse = FailureMsgResponse;
class SuccessResponse extends ApiResponse {
    constructor(message, data) {
        super(true, ResponseStatus.SUCCESS, message);
        this.data = data;
    }
    send(res) {
        return super.prepare(res, this);
    }
}
exports.SuccessResponse = SuccessResponse;
class CreatedResponse extends ApiResponse {
    constructor(message, data) {
        super(true, ResponseStatus.CREATED, message);
        this.data = data;
    }
    send(res) {
        return super.prepare(res, this);
    }
}
exports.CreatedResponse = CreatedResponse;
// export class PaginationResponse<T> extends ApiResponse {
//   private data: PaginationResult<T>["data"];
//   private pageData: PaginationResult<T>["pageData"];
//   constructor(message: string, result: PaginationResult<T>) {
//     super(true, ResponseStatus.SUCCESS, message);
//     this.data = result.data;
//     this.pageData = result.pageData;
//   }
// }
class NotFoundResponse extends ApiResponse {
    constructor(message = 'Not Found') {
        super(false, ResponseStatus.NOT_FOUND, message);
    }
    send(res) {
        var _a;
        this.url = (_a = res.req) === null || _a === void 0 ? void 0 : _a.originalUrl;
        return this.prepare(res, this);
    }
}
exports.NotFoundResponse = NotFoundResponse;
class AuthFailureResponse extends ApiResponse {
    constructor(message = 'Authentication Failure') {
        super(false, ResponseStatus.UNAUTHORIZED, message);
    }
}
exports.AuthFailureResponse = AuthFailureResponse;
class NotAllowedResponse extends ApiResponse {
    constructor(message = 'Method not allowed') {
        super(false, ResponseStatus.NOT_ALLOWED, message);
    }
}
exports.NotAllowedResponse = NotAllowedResponse;
class ForbiddenResponse extends ApiResponse {
    constructor(message = 'Forbidden') {
        super(false, ResponseStatus.FORBIDDEN, message);
    }
}
exports.ForbiddenResponse = ForbiddenResponse;
class BadRequestResponse extends ApiResponse {
    constructor(message = 'Bad Parameters') {
        super(false, ResponseStatus.BAD_REQUEST, message);
    }
}
exports.BadRequestResponse = BadRequestResponse;
class ValidationErrorResponse extends ApiResponse {
    constructor(message = 'Invalid Input', errors) {
        super(false, ResponseStatus.VALIDATION_ERROR, message);
        this.errors = errors;
    }
}
exports.ValidationErrorResponse = ValidationErrorResponse;
class InternalErrorResponse extends ApiResponse {
    constructor(message = 'Internal Error') {
        super(false, ResponseStatus.INTERNAL_ERROR, message);
    }
}
exports.InternalErrorResponse = InternalErrorResponse;
class AccessTokenErrorResponse extends ApiResponse {
    constructor(message = 'Access token invalid') {
        super(false, ResponseStatus.UNAUTHORIZED, message);
        this.instruction = 'refresh_token';
    }
    send(res) {
        res.setHeader('instruction', this.instruction);
        return super.prepare(res, this);
    }
}
exports.AccessTokenErrorResponse = AccessTokenErrorResponse;
class TokenRefreshResponse extends ApiResponse {
    constructor(message, accessToken, refreshToken) {
        super(true, ResponseStatus.SUCCESS, message);
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
    send(res) {
        return super.prepare(res, this);
    }
}
exports.TokenRefreshResponse = TokenRefreshResponse;
//# sourceMappingURL=ApiResponse.js.map