import { Router } from "express";
import { NewsletterRepositoryMongo } from "../../infrastructure/repositories/NewsletterRepositoryMongo";
import { SubscriptionRepositoryMongo } from "../../infrastructure/repositories/SubscriptionRepositoryMongo";
import { GetStats } from "../../application/use-cases/GetStats";
import GetStatsController from "../controllers/stats/GetStatsController";

export class StatsRoutes {
  static get routes(): Router {
    const router = Router();

    const newsletterRepository = new NewsletterRepositoryMongo();
    const subscriptionRepository = new SubscriptionRepositoryMongo();

    const getStats = new GetStats(newsletterRepository, subscriptionRepository);
    const getStatsController = new GetStatsController(getStats);

    router.get("/", getStatsController.run);

    return router;
  }
}
