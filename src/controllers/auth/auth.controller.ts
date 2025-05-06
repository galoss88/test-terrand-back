import type { NextFunction, Request, Response } from "express";
import { IAuthService } from "../../services/auth/types";
import { ErrorMessage } from "../types";
import { IAuthController } from "./types";

export default class AuthController implements IAuthController {
  constructor(private authService: IAuthService) {}

  public async login(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.authenticate(email, password);
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password } = req.body;
      await this.authService.register({ name, email, password });
      //Ejecutar servicio de registro
    } catch (error: ErrorMessage) {
      next(error);
    }
  }
}
