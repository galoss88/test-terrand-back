import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
const ctrl = new UserController();

router.use(authMiddleware);
router.get("/", (req, res, next) => ctrl.getAll(req, res, next));
router.get("/:id", (req, res, next) => ctrl.getById(req, res, next));

export default router;
