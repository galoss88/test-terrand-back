import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
    }
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
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

    const decoded = jwt.verify(token, secret) as {
      sub: string;
      email: string;
    };

    //Asignamos los datos de usuarios en la request para ser usado posteriormente
    req.user = {
      id: decoded.sub,
      email: decoded.email,
    };

    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        success: false,
        message: "Token inválido o expirado",
      });
    }

    console.error("Error en middlware de autenticación:", error);
    return res.status(500).json({
      success: false,
      message: "Error interno del servidor",
    });
  }
};

export default authMiddleware;
