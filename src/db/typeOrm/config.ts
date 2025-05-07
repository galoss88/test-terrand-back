import "reflect-metadata";
import { DataSource } from "typeorm";
import { RecipeEntity, UserEntity } from "./entities";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as "postgres",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "78914526",
  database: process.env.DB_NAME || "terrand_db",
  synchronize: process.env.DB_SYNC === "true",
  logging: process.env.DB_LOGGING === "true",
  entities: [UserEntity, RecipeEntity],
  subscribers: [],
  migrations: [],
});