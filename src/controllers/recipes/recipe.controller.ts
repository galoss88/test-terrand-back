import { NextFunction, Request, Response } from "express";
import { IRecipeService } from "../../services/recipe/types";
import { ErrorMessage } from "../types";
import { IRecipeController } from "./types";

export class RecipeController implements IRecipeController {
  constructor(private readonly recipeService: IRecipeService) {}

  public async getRecipesById(req: Request, res: Response, next: NextFunction) {
    try {
      const idUser = req?.user?.id;
      if (!idUser) {
        throw new Error("No hay usuario de quien obtener las recetas");
      }

      const recipesUser = await this.recipeService.getAllById(idUser);
      res.status(200).json(recipesUser);
    } catch (error: ErrorMessage) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const bodyWithUserId = {
        ...req.body,
        userId: req.user?.id,
      };
      const recipeCreated = await this.recipeService.create(bodyWithUserId);
      res.status(200).json(recipeCreated);
    } catch (e: ErrorMessage) {
      next(e);
    }
  }
}
