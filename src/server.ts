import express, { Request, Response } from "express";
const app = express();

app.get("/", (req:Request, res:Response) => {
  
});

app.listen(3003, () => {
  console.log("Server login");
});
