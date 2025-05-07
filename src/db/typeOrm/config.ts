import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { RecipeEntity, UserEntity } from "./entities";

dotenv.config();

const isDev = process.env.NODE_ENV === "development";

const common: Pick<
  DataSourceOptions,
  "synchronize" | "logging" | "entities" | "subscribers" | "migrations"
> = {
  synchronize: process.env.DB_SYNC === "true",
  logging: process.env.DB_LOGGING === "true",
  entities: [UserEntity, RecipeEntity],
  subscribers: [],
  migrations: [],
};

let dataSourceOptions: DataSourceOptions;

if (isDev) {
  dataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST!,
    port: parseInt(process.env.DB_PORT!, 10),
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    ...common,
  };
} else {
  if (!process.env.DATABASE_URL) {
    console.error("❌ No existe DATABASE_URL en el entorno");
    process.exit(1);
  }
  dataSourceOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    ...common,
  };
}

export const AppDataSource = new DataSource(dataSourceOptions);
