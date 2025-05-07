"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoute = registerRoute;
function registerRoute({ app, path, router, }) {
    app.use(path, router);
}
