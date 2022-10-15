"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericModelWithoutId = exports.genericFields = void 0;
const sequelize_1 = require("sequelize");
exports.genericFields = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    createdAt: sequelize_1.DataTypes.DATE,
    updatedAt: sequelize_1.DataTypes.DATE,
};
class GenericModelWithoutId extends sequelize_1.Model {
}
exports.GenericModelWithoutId = GenericModelWithoutId;
class GenericModel extends GenericModelWithoutId {
}
exports.default = GenericModel;
//# sourceMappingURL=index.js.map