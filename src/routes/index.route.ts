import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import privateRoutes from "./private/index.route";
import publicRoutes from "./public/index.route";
const router = Router();

router.use("/public", publicRoutes);
router.use("/private", authMiddleware, privateRoutes);

export default router;
