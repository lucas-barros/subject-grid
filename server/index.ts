import { config } from "./src/application/config";
import { createServer } from "./src/application/server";
import {
  createDataSource,
  dataSourceOptions,
} from "./src/infrastructure/database/data-source";

createServer(createDataSource(dataSourceOptions[config.nodeEnv]));
