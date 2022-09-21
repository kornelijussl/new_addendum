// NODE
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// DOTENV
import { config as configEnvironmentVariables } from "dotenv";

// EXPRESS
import express from "express";

// DEBUG
import debug from "debug";

(async () => {
  global.appRoot = path.resolve(dirname(fileURLToPath(import.meta.url)));
  const logger = debug("addendum-backend:server");
  configEnvironmentVariables();

  const app = express();

  const host = "0.0.0.0";
  const port = 8080;

  app.use(express.json({ limit: "50mb" }));

  // ROUTES
  const routes = await import("./global/router/index.js");
  app.use("/", routes.default);

  // DATABASE
  await import("./database/models");
  const sequelize = await import("./database");

  app.listen(port, host, () => {
    logger(`Process is listening at http://${host}:${port}`);
  });
})();
