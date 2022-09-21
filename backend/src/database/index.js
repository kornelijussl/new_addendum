// DEBUG
import debug from "debug";

// SEQUELIZE
import Sequelize from "sequelize";

// CLS
import cls from "cls-hooked";

// --------------------------------------------------------------------------------------------------

const logger = debug("addendum-backend:database");

const {
  ADDENDUM_PGHOST,
  ADDENDUM_PGDATABASE,
  ADDENDUM_PGUSER,
  ADDENDUM_PGPASSWORD,
  ADDENDUM_PGPORT,
} = process.env;

const namespace = cls.createNamespace("addendum-transaction");
Sequelize.useCLS(namespace);

const sequelize = new Sequelize(
  `postgres://${ADDENDUM_PGUSER}:${ADDENDUM_PGPASSWORD}@${ADDENDUM_PGHOST}:${ADDENDUM_PGPORT}/${ADDENDUM_PGDATABASE}`,
);

logger(
  `Connection to host: ${sequelize.config.host} port: ${sequelize.config.port} database: ${sequelize.config.database} dialect: ${sequelize.connectionManager.dialectName} has been established successfully.`,
);

export default sequelize;
