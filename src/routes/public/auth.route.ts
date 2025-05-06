// src/routes/public/auth.route.ts
import { Router } from "express";
import AuthController from "../../controllers/auth";

const router = Router();
const ctrl = new AuthController();

// login y registro NO llevan auth middleware
router.post("/login",  (req, res, next) => ctrl.login(req, res, next));
router.post("/register", (req, res, next) => ctrl.register(req, res, next));

export default router;
