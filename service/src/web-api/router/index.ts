import { Router } from "express";
import { NewsletterRoutes } from "./newsletter.route";
import { SubscriptionRoutes } from "./subscription.route";
import { StatsRoutes } from "./stats.route";
export class AppRoutes {
  static get routes(): Router {
    const router = Router();
    router.use("/newsletter", NewsletterRoutes.routes);
    router.use("/subscription", SubscriptionRoutes.routes);
    router.use("/stats", StatsRoutes.routes);
    return router;
  }
}
