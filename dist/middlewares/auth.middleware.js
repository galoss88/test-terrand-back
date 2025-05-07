"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        console.log("req header", req.headers);
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                success: false,
                message: "Acceso no autorizado. Token no proporcionado.",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET no configurado");
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        //Asignamos los datos de usuarios en la request para ser usado posteriormente
        req.user = {
            id: decoded.sub,
            email: decoded.email,
        };
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            res.status(401).json({
                success: false,
                message: "Token inválido o expirado",
            });
        }
        console.error("Error en middlware de autenticación:", error);
        res.status(500).json({
            success: false,
            message: "Error interno del servidor",
        });
    }
};
exports.default = authMiddleware;
