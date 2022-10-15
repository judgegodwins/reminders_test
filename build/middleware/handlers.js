"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notAllowedHandler = exports.notFoundHandler = exports.errorHandler = void 0;
const ApiError_1 = require("../core/ApiError");
const Logger_1 = require("../core/Logger");
const config_1 = __importDefault(require("../config"));
const logError = (err, req) => {
    Logger_1.errorLogger.error(err.message, {
        url: req.originalUrl,
        method: req.method,
        body: req.body,
        stack: err.stack,
    });
};
const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError_1.ApiError) {
        ApiError_1.ApiError.handle(err, res);
    }
    else {
        if (config_1.default.env.isDevelopment)
            logError(err, req);
        ApiError_1.ApiError.handle(new ApiError_1.InternalError(), res);
    }
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res, next) => next(new ApiError_1.NotFoundError());
exports.notFoundHandler = notFoundHandler;
const notAllowedHandler = (req, res, next) => next(new ApiError_1.NotALlowedError());
exports.notAllowedHandler = notAllowedHandler;
//# sourceMappingURL=handlers.js.map