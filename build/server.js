"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const http_1 = __importDefault(require("http"));
const stoppable_1 = __importDefault(require("stoppable"));
const Logger_1 = require("./core/Logger");
const config_1 = __importDefault(require("./config"));
const initialize_1 = __importDefault(require("./initialize"));
console.log(process.env.NODE_ENV);
global.server = {
    isStartingUp: false,
    isShuttingDown: false,
};
const startServer = async () => {
    global.server.isStartingUp = true;
    const { app, dbConnection } = await (0, initialize_1.default)();
    const server = (0, stoppable_1.default)(http_1.default.createServer(app));
    server.listen(config_1.default.app.port, () => {
        Logger_1.generalLogger.info(`Server Started and Listening on Port: ${config_1.default.app.port} with PID: ${process.pid}`);
        global.server.isStartingUp = false;
    });
    process.on("SIGINT", async () => {
        global.server.isShuttingDown = true;
        Logger_1.generalLogger.info("Starting graceful server shutdown");
        server.stop(async () => {
            // await dbConnection
            //   .close()
            //   .then(() =>
            //     generalLogger.info(
            //       "Mongoose default connection disconnected through app termination"
            //     )
            //   )
            //   .catch(generalLogger.error);
            // await redisConnection
            //   .quit()
            //   .then(() => generalLogger.info("Redis connection closed"))
            //   .catch(generalLogger.error);
            Logger_1.generalLogger.info("Graceful server shutdown completed");
            process.exit(0);
        });
    });
};
const start = async () => {
    try {
        await startServer();
    }
    catch (e) {
        Logger_1.errorLogger.error(e);
        process.exit(1);
    }
};
exports.default = start();
//# sourceMappingURL=server.js.map