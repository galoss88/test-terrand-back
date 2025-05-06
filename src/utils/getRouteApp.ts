import type { Application, Router } from "express";

export function registerRoute({
  app,
  path,
  router,
}: {
  app: Application;
  path: string;
  router: Router;
}): void {
  app.use(path, router);
}
