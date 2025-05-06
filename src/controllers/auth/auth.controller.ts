import type { Request, Response, NextFunction } from 'express';
import { IAuthController } from './types';

export default class AuthController implements IAuthController {
  private authService = new AuthService();

  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.authenticate(email, password);
      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
}
