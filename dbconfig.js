require('dotenv').config();

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "src/database/storage/db.sqlite"
  },
  test: {
    dialect: "sqlite",
    storage: "src/database/storage/db.sqlite"
  },
  production: {
    dialect: "sqlite",
    storage: "build/database/storage/db.sqlite"
  },
};
