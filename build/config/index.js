"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = exports.AppEnvironmentEnum = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: process.env.API_ENV_PATH,
});
var AppEnvironmentEnum;
(function (AppEnvironmentEnum) {
    AppEnvironmentEnum["TEST"] = "test";
    AppEnvironmentEnum["LOCAL"] = "local";
    AppEnvironmentEnum["DEVELOPMENT"] = "development";
    AppEnvironmentEnum["STAGING"] = "staging";
    AppEnvironmentEnum["PRODUCTION"] = "production";
})(AppEnvironmentEnum = exports.AppEnvironmentEnum || (exports.AppEnvironmentEnum = {}));
const config = {
    db: {
        database: process.env.DB_NAME,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT,
    },
    // redis: {
    //   mode: process.env.REDIS_MODE! || "cluster",
    //   host: process.env.REDIS_HOST!,
    //   port: +process.env.REDIS_PORT!,
    //   password: process.env.REDIS_PASSWORD!,
    // },
    env: {
        isProduction: process.env.NODE_ENV === AppEnvironmentEnum.PRODUCTION,
        isDevelopment: process.env.NODE_ENV === AppEnvironmentEnum.DEVELOPMENT,
        isTest: process.env.NODE_ENV === AppEnvironmentEnum.TEST,
    },
    app: {
        env: process.env.APP_ENV,
        isProduction: process.env.APP_ENV === AppEnvironmentEnum.PRODUCTION,
        port: +process.env.PORT,
        jwtSecret: process.env.JWT_SECRET,
    },
    cloudinary: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        folder: process.env.CLOUDINARY_FOLDER,
    }
    // mailgun: {
    //   apiKey: process.env.MAILGUN_API_KEY!,
    //   domain: process.env.MAILGUN_DOMAIN!,
    // },
};
const validateConfig = () => {
    const missingKeys = [];
    Object.entries(config).forEach(([baseKey, baseValue]) => {
        Object.entries(baseValue).forEach(([key, value]) => {
            if (value === "" || value === undefined) {
                missingKeys.push(`${baseKey}.${key}`);
            }
        });
    });
    if (missingKeys.length) {
        global.console.error(`The following configuration keys are not set: ${missingKeys.join(", ")}`);
        process.exit(1);
    }
};
exports.validateConfig = validateConfig;
(0, exports.validateConfig)();
exports.default = config;
//# sourceMappingURL=index.js.map