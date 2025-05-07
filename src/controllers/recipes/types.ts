import { NextFunction, Request, Response } from "express";

export interface IRecipeController {
  getRecipesById(req: Request, res: Response, next: NextFunction): Promise<void>;
}
