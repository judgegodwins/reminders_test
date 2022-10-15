"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnection = void 0;
const sequelize_1 = require("sequelize");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const config_1 = __importDefault(require("../config"));
const Logger_1 = __importDefault(require("../core/Logger"));
const basename = path_1.default.basename(__filename);
const models = {};
const db = {};
const modelsDir = path_1.default.resolve(__dirname, "models");
const initializeModel = async (sequelize, file) => {
    const model = (await Promise.resolve().then(() => __importStar(require(path_1.default.resolve(modelsDir, file))))).init(sequelize);
    return model;
};
const createConnection = async () => {
    const sequelize = new sequelize_1.Sequelize(config_1.default.db.database, config_1.default.db.username, config_1.default.db.password, {
        // host: config.db.host,
        dialect: "sqlite",
        storage: path_1.default.resolve(__dirname, 'storage', 'db.sqlite')
    });
    const files = await fs_1.default.promises.readdir(modelsDir);
    const filteredFiles = files.filter((file) => {
        const ext = file.slice(-3);
        return (file.indexOf(".") !== 0 &&
            file !== basename &&
            (ext === ".js" || ext === ".ts"));
    });
    (await Promise.all(filteredFiles.map((file) => initializeModel(sequelize, file)))).forEach((model) => {
        models[model.name] = model;
    });
    db.models = models;
    Object.keys(db.models).forEach((modelName) => {
        if (Boolean(db.models[modelName].associate)) {
            db.models[modelName].associate(db.models);
        }
    });
    db.sequelize = sequelize;
    db.Sequelize = sequelize_1.Sequelize;
    await sequelize.authenticate();
    // if (config.env.isDevelopment) await sequelize.sync();
    Logger_1.default.info("DB Connected");
    return db;
};
exports.createConnection = createConnection;
//# sourceMappingURL=index.js.map