"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExternalAPIError = exports.AccessTokenError = exports.NoDataError = exports.TokenExpiredError = exports.BadTokenError = exports.NoEntryError = exports.ForbiddenError = exports.NotALlowedError = exports.NotFoundError = exports.ValidationError = exports.BadRequestError = exports.InternalError = exports.AuthFailureError = exports.ApiError = void 0;
const config_1 = __importDefault(require("../config"));
const ApiResponse_1 = require("./ApiResponse");
var ErrorType;
(function (ErrorType) {
    ErrorType["BAD_TOKEN"] = "BadTokenError";
    ErrorType["EXTERNAL_API"] = "ExternalAPIError";
    ErrorType["TOKEN_EXPIRED"] = "TokenExpiredError";
    ErrorType["UNAUTHORIZED"] = "AuthFailureError";
    ErrorType["ACCESS_TOKEN"] = "AccessTokenError";
    ErrorType["INTERNAL"] = "InternalError";
    ErrorType["NOT_FOUND"] = "NotFoundError";
    ErrorType["NO_ENTRY"] = "NoEntryError";
    ErrorType["NO_DATA"] = "NoDataError";
    ErrorType["BAD_REQUEST"] = "BadRequestError";
    ErrorType["FORBIDDEN"] = "ForbiddenError";
    ErrorType["VALIDATION_ERROR"] = "ValidationError";
    ErrorType["NOT_ALLOWED"] = "NotAllowedError";
})(ErrorType || (ErrorType = {}));
class ApiError extends Error {
    constructor(type, message = 'error') {
        super(type);
        this.type = type;
        this.message = message;
    }
    static handle(err, res) {
        switch (err.type) {
            case ErrorType.BAD_TOKEN:
            case ErrorType.TOKEN_EXPIRED:
            case ErrorType.UNAUTHORIZED:
                return new ApiResponse_1.AuthFailureResponse(err.message).send(res);
            case ErrorType.ACCESS_TOKEN:
                return new ApiResponse_1.AccessTokenErrorResponse(err.message).send(res);
            case ErrorType.INTERNAL:
                return new ApiResponse_1.InternalErrorResponse(err.message).send(res);
            case ErrorType.NOT_FOUND:
            case ErrorType.NO_ENTRY:
            case ErrorType.NO_DATA:
                return new ApiResponse_1.NotFoundResponse(err.message).send(res);
            case ErrorType.BAD_REQUEST:
                return new ApiResponse_1.BadRequestResponse(err.message).send(res);
            case ErrorType.VALIDATION_ERROR:
                return new ApiResponse_1.ValidationErrorResponse(err.message, err.errors).send(res);
            case ErrorType.FORBIDDEN:
                return new ApiResponse_1.ForbiddenResponse(err.message).send(res);
            case ErrorType.EXTERNAL_API:
                return res.status(err.code).send({ success: false, message: err.message });
            case ErrorType.NOT_ALLOWED:
                return new ApiResponse_1.NotAllowedResponse(err.message).send(res);
            default: {
                let message = err.message;
                // Do not send failure message in production as it may send sensitive data
                if (config_1.default.env.isProduction)
                    message = 'Something wrong happened.';
                return new ApiResponse_1.InternalErrorResponse(message).send(res);
            }
        }
    }
}
exports.ApiError = ApiError;
class AuthFailureError extends ApiError {
    constructor(message = 'Invalid Credentials') {
        super(ErrorType.UNAUTHORIZED, message);
    }
}
exports.AuthFailureError = AuthFailureError;
class InternalError extends ApiError {
    constructor(message = 'Internal error') {
        super(ErrorType.INTERNAL, message);
    }
}
exports.InternalError = InternalError;
class BadRequestError extends ApiError {
    constructor(message = 'Bad Request') {
        super(ErrorType.BAD_REQUEST, message);
    }
}
exports.BadRequestError = BadRequestError;
class ValidationError extends ApiError {
    constructor(errors = []) {
        const message = `${errors[0]}`;
        super(ErrorType.VALIDATION_ERROR, message);
        this.errors = errors;
    }
}
exports.ValidationError = ValidationError;
class NotFoundError extends ApiError {
    constructor(message = 'Not Found') {
        super(ErrorType.NOT_FOUND, message);
    }
}
exports.NotFoundError = NotFoundError;
class NotALlowedError extends ApiError {
    constructor(message = 'Method not Allowed') {
        super(ErrorType.NOT_ALLOWED, message);
    }
}
exports.NotALlowedError = NotALlowedError;
class ForbiddenError extends ApiError {
    constructor(message = 'Permission denied') {
        super(ErrorType.FORBIDDEN, message);
    }
}
exports.ForbiddenError = ForbiddenError;
class NoEntryError extends ApiError {
    constructor(message = "Entry doesn't exist") {
        super(ErrorType.NO_ENTRY, message);
    }
}
exports.NoEntryError = NoEntryError;
class BadTokenError extends ApiError {
    constructor(message = 'Token is not valid') {
        super(ErrorType.BAD_TOKEN, message);
    }
}
exports.BadTokenError = BadTokenError;
class TokenExpiredError extends ApiError {
    constructor(message = 'Token is expired') {
        super(ErrorType.TOKEN_EXPIRED, message);
    }
}
exports.TokenExpiredError = TokenExpiredError;
class NoDataError extends ApiError {
    constructor(message = 'No data available') {
        super(ErrorType.NO_DATA, message);
    }
}
exports.NoDataError = NoDataError;
class AccessTokenError extends ApiError {
    constructor(message = 'Invalid access token') {
        super(ErrorType.ACCESS_TOKEN, message);
    }
}
exports.AccessTokenError = AccessTokenError;
class ExternalAPIError extends ApiError {
    constructor(message, code) {
        super(ErrorType.EXTERNAL_API, message);
        this.code = code;
    }
}
exports.ExternalAPIError = ExternalAPIError;
//# sourceMappingURL=ApiError.js.map