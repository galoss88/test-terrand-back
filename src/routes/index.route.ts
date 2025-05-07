import { Router } from "express";
import privateRoutes from "./private/index.route";
import publicRoutes from "./public/index.route";
const router = Router();

router.use("/public", publicRoutes);
router.use("/private", privateRoutes);

export default router;
