const {
  ADDENDUM_PGHOST,
  ADDENDUM_PGPORT,
  ADDENDUM_PGDATABASE,
  ADDENDUM_PGUSER,
  ADDENDUM_PGPASSWORD,
} = process.env;

module.exports = {
  development: {
    username: ADDENDUM_PGUSER,
    password: ADDENDUM_PGPASSWORD,
    database: ADDENDUM_PGDATABASE,
    host: ADDENDUM_PGHOST,
    port: ADDENDUM_PGPORT,
    dialect: "postgres",
  },
  production: {
    username: ADDENDUM_PGUSER,
    password: ADDENDUM_PGPASSWORD,
    database: ADDENDUM_PGDATABASE,
    host: ADDENDUM_PGHOST,
    port: ADDENDUM_PGPORT,
    dialect: "postgres",
  },
};
