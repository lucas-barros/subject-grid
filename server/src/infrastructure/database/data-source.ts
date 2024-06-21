import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { Subject } from "./model/Subject";

const postgresOptions: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [Subject],
  migrations: [],
  subscribers: [],
  seedTracking: true,
};

export const dataSourceOptions: Record<
  "production" | "development" | "test",
  DataSourceOptions & SeederOptions
> = {
  test: {
    type: "sqlite",
    database: ":memory:",
    dropSchema: true,
    entities: [Subject],
    synchronize: true,
    logging: false,
  },
  development: postgresOptions,
  production: postgresOptions,
};

export const createDataSource = (options: DataSourceOptions & SeederOptions) =>
  new DataSource(options);
