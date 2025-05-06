import express from "express";
import routesApp from "./routes/index.route";
const app = express();

app.use("/", routesApp);

app.listen(3003, () => {
  console.log("Server login");
});
