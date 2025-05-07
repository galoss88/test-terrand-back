import cors from "cors";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import { AppDataSource } from "./db/typeOrm/config";
import routesApp from "./routes/index.route";
import { registerRoute } from "./utils";

dotenv.config();

// ---------------------------------------------------------------
// Servidor
// ---------------------------------------------------------------

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
// Manejador errores global
// ---------------------------------------------------------------

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  const status = err.status || err.statusCode || 500;
  const message = err.message || "Error interno del servidor";

  res.status(status).json({
    success: false,
    message,
  });
});
// ---------------------------------------------------------------
// Inicialización de la base de datos
// ---------------------------------------------------------------
AppDataSource.initialize()
  .then(() => {
    console.log("✅ Base de datos conectada");

    app.listen(process.env.PORT, () => {
      console.log(`🚀 Servidor iniciado en http://localhost:${process.env.PORT}`);
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
