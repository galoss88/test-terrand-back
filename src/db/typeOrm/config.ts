import "reflect-metadata";
import { DataSource } from "typeorm";
import { RecipeEntity, UserEntity } from "./entities";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "78914526",
  database: "terrand_db",
  synchronize: true,
  logging: false,
  entities: [UserEntity, RecipeEntity],
  subscribers: [],
  migrations: [],
  // logger: "simple-console",
});
