"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapServiceAction = exports.getAllConstraints = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const ApiError_1 = require("../core/ApiError");
const getAllConstraints = (errors) => {
    const constraints = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const error of errors) {
        if (error.constraints) {
            constraints.push(error.constraints);
        }
        if (error.children) {
            constraints.push(...(0, exports.getAllConstraints)(error.children));
        }
    }
    return constraints;
};
exports.getAllConstraints = getAllConstraints;
function wrapServiceAction(params) {
    if (!params.schema) {
        return params.handler;
    }
    return async (...args) => {
        const transformed = (0, class_transformer_1.plainToClass)(params.schema, args[0]);
        const errors = await (0, class_validator_1.validate)(transformed, {
            whitelist: true,
            forbidNonWhitelisted: true,
            validationError: { target: false },
        });
        if (errors.length > 0) {
            const constraints = (0, exports.getAllConstraints)(errors);
            throw new ApiError_1.ValidationError(constraints.map((c) => Object.values(c)).flat());
        }
        return params.handler(transformed);
    };
}
exports.wrapServiceAction = wrapServiceAction;
//# sourceMappingURL=core.js.map