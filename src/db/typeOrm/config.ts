import dotenv from "dotenv";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { RecipeEntity, UserEntity } from "./entities";

// Cargar variables de entorno
dotenv.config();
// —— DEBUG: comprobar variables —— 
console.log("╔═🛠️  ENV VARIABLES 🛠️═╗");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);
console.log("DB_USERNAME:", process.env.DB_USERNAME);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? "****" : undefined);
console.log("DB_NAME:", process.env.DB_NAME);
console.log("DB_SYNC:", process.env.DB_SYNC);
console.log("DB_LOGGING:", process.env.DB_LOGGING);
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("═══════════════════════");
export const AppDataSource = new DataSource({
  type:  "postgres",
  url:process.env.DATABASE_URL,
  // host: process.env.DB_HOST || "localhost",
  // port: parseInt(process.env.DB_PORT || "5432"),
  // username: process.env.DB_USERNAME || "postgres",
  // password: process.env.DB_PASSWORD || "78914526",
  // database: process.env.DB_NAME || "terrand_db",
  synchronize: process.env.DB_SYNC === "true",
  logging: process.env.DB_LOGGING === "true",
  entities: [UserEntity, RecipeEntity],
  subscribers: [],
  migrations: [],
});
