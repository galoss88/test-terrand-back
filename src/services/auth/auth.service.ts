// src/services/AuthService.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { IAuthService } from './types';
import { IUserRepository } from '../../domain/repositories/IUserRepository';

export class AuthJsonWebTokenService implements IAuthService {
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  public async authenticate(email: string, password: string): Promise<string> {
    // 1. Busca el usuario por email
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // 2. Compara la contraseña
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new Error('Credenciales inválidas');
    }

    // 3. Genera el payload y el token
    const payload = { sub: user.id, email: user.email };
    const secret  = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET no configurado');
    }

    const token = jwt.sign(payload, secret, {
      expiresIn: '1h'
    });

    return token;
  }
}
