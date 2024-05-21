import { Router } from "express";
import { SubscriptionRepository } from "../../infrastructure/repositories/SubscriptionRepository";
import GetAllByEmailController from "../controllers/subscription/GetAllByEmailController";
import { GetSubscriptionsByEmail } from "../../application/use-cases/GetSubscriptionsByEmail";
import { SubscriptionRepositoryMongo } from "../../infrastructure/repositories/SubscriptionRepositoryMongo";
import PostController from "../controllers/subscription/PostController";
import { SaveSubscription } from "../../application/use-cases/SaveSubscription";

export class SubscriptionRoutes {
  static get routes(): Router {
    const router = Router();

    const subscriptionRepository = new SubscriptionRepositoryMongo();

    const getAll = new GetSubscriptionsByEmail(subscriptionRepository);
    const getAllController = new GetAllByEmailController(getAll);

    const saveSubs = new SaveSubscription(subscriptionRepository);
    const postController = new PostController(saveSubs);

    router.get("/", getAllController.run);
    router.post("/", postController.run);

    return router;
  }
}
