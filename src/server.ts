import cors from "cors";
import express from "express";
import { AppDataSource } from "./db/typeOrm/config";
import routesApp from "./routes/index.route";
import { registerRoute } from "./utils";

const app = express();
// ---------------------------------------------------------------
// Cors
// ---------------------------------------------------------------

app.use(
  cors({
    origin: "*", // o '*' para permitir todos
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// ---------------------------------------------------------------
// Middlewares de rutas
// ---------------------------------------------------------------

app.use(express.json());

// ---------------------------------------------------------------
// Ruta principales de la api
// ---------------------------------------------------------------

registerRoute({ app, path: "/api/v1", router: routesApp });

// ---------------------------------------------------------------
// Inicialización de la base de datos
// ---------------------------------------------------------------
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Base de datos conectada");

    app.listen(3003, () => {
      console.log("🚀 Servidor iniciado en http://localhost:3003");
    });
  })
  .catch((err) => {
    console.error("❌ Error al conectar con la base de datos", err);
    process.exit(1);
  });

//---------------------------------------------------------------
//Listener servidor
//---------------------------------------------------------------

app.listen(3003, () => {
  console.log("Server login");
});
