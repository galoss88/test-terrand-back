"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthJsonWebTokenService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = require("../../domain/entities/User");
class AuthJsonWebTokenService {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async authenticate(email, password) {
        // 1. Busca el usuario por email
        const user = await this.userRepo.findByEmail(email);
        if (!user) {
            throw new Error("Credenciales inválidas");
        }
        // 2. Compara la contraseña
        const isValid = await bcrypt_1.default.compare(password, user.passwordHash);
        if (!isValid) {
            throw new Error("Credenciales inválidas");
        }
        // 3. Genera el payload y el token
        const payload = { sub: user.id, email: user.email };
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET no configurado");
        }
        const token = jsonwebtoken_1.default.sign(payload, secret, {
            expiresIn: "1h",
        });
        return token;
    }
    async register({ email, password, name, }) {
        const existingUser = await this.userRepo.findByEmail(email);
        if (existingUser) {
            throw new Error("El email ya está registrado");
        }
        //----------------------------------
        //Hash contraseña
        //----------------------------------
        const salt = await bcrypt_1.default.genSalt(10);
        const passwordHash = await bcrypt_1.default.hash(password, salt);
        const user = User_1.User.create({
            email,
            passwordHash: passwordHash,
            name,
            id: crypto.randomUUID(),
        });
        this.userRepo.save(user);
        return user;
    }
}
exports.AuthJsonWebTokenService = AuthJsonWebTokenService;
