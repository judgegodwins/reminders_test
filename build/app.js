"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const Logger_1 = require("./core/Logger");
const config_1 = __importDefault(require("./config"));
process.on("uncaughtException", (e) => {
    Logger_1.errorLogger.error(e);
});
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true, limit: "10mb", parameterLimit: 50000 }));
app.use((0, morgan_1.default)(config_1.default.env.isProduction ? 'common' : 'dev'));
exports.default = app;
//# sourceMappingURL=app.js.map