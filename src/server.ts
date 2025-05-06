import express from "express";
import routesApp from "./routes/index.route";
import { registerRoute } from "./utils";

const app = express();

app.use(express.json());

// ---------------------------------------------------------------
// Ruta principales de la api
// ---------------------------------------------------------------

registerRoute({ app, path: "/api/v1", router: routesApp });

//---------------------------------------------------------------
//Listener servidor
//---------------------------------------------------------------

app.listen(3003, () => {
  console.log("Server login");
});
