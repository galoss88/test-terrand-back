import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { IAuthService } from "./types";

export class AuthJsonWebTokenService implements IAuthService {
  private userRepo: IUserRepository;

  constructor(userRepo: IUserRepository) {
    this.userRepo = userRepo;
  }

  public async authenticate(email: string, password: string): Promise<string> {
    // 1. Busca el usuario por email
    const user = await this.userRepo.findByEmail(email);
    if (!user) {
      throw new Error("Credenciales inválidas");
    }

    // 2. Compara la contraseña
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new Error("Credenciales inválidas");
    }

    // 3. Genera el payload y el token
    const payload = { sub: user.id, email: user.email };
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET no configurado");
    }

    const token = jwt.sign(payload, secret, {
      expiresIn: "1h",
    });

    return token;
  }

  public async register({
    email,
    password,
    name,
  }: {
    email: string;
    password: string;
    name: string;
  }): Promise<User> {
    const existingUser = await this.userRepo.findByEmail(email);
    if (existingUser) {
      throw new Error("El email ya está registrado");
    }

    //----------------------------------
    //Hash contraseña
    //----------------------------------
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = User.create({
      email,
      passwordHash: passwordHash,
      name,
      id: crypto.randomUUID(),
    });

    this.userRepo.save(user);
    return user;
  }
}
