"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const token = await this.authService.authenticate(email, password);
            res.status(200).json({ token, email });
        }
        catch (error) {
            next(error);
        }
    }
    async register(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const userCreate = await this.authService.register({
                name,
                email,
                password,
            });
            res.status(200).json(userCreate);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.default = AuthController;
