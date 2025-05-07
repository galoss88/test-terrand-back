import { NextFunction, Request, Response } from "express";

export interface IRecipeController {
  getRecipesById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  create(req: Request, res: Response, next: NextFunction): Promise<void>;
  getDetail(req: Request, res: Response, next: NextFunction): Promise<void>;
  update(req: Request, res: Response, next: NextFunction): Promise<void>;
}
