"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const index_route_1 = __importDefault(require("./private/index.route"));
const index_route_2 = __importDefault(require("./public/index.route"));
const router = (0, express_1.Router)();
router.use("/public", index_route_2.default);
router.use("/private", auth_middleware_1.default, index_route_1.default);
exports.default = router;
