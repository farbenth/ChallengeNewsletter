import { Router } from "express";
import GetAllController from "../controllers/newsletter/GetAllController";
import { GetAllNewsletter } from "../../application/use-cases/GetAllNewsletter";
import PostController from "../controllers/newsletter/PostController";
import { SendNewsletter } from "../../application/use-cases/SendNewsletter";
import multer from "multer";
import { MailerNodemailer } from "../../infrastructure/services/MailerNodemailer";
import { NewsletterRepositoryMongo } from "../../infrastructure/repositories/NewsletterRepositoryMongo";
import { SubscriptionRepositoryMongo } from "../../infrastructure/repositories/SubscriptionRepositoryMongo";
import cron from "node-cron";
import { SendScheduledNewsletter } from "../../application/use-cases/SendScheduledNewsletters";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

export class NewsletterRoutes {
  static get routes(): Router {
    const router = Router();

    const newsletterRepository = new NewsletterRepositoryMongo();
    const subscriptionRepository = new SubscriptionRepositoryMongo();

    const mailerService = new MailerNodemailer();

    const getAll = new GetAllNewsletter(newsletterRepository);
    const getAllController = new GetAllController(getAll);

    const sendNewsletter = new SendNewsletter(
      newsletterRepository,
      subscriptionRepository,
      mailerService
    );
    const getPostController = new PostController(sendNewsletter);

    const sendScheduledNewsletter = new SendScheduledNewsletter(
      newsletterRepository,
      subscriptionRepository,
      mailerService
    );

    router.get("/", getAllController.run);
    router.post("/", upload.single("attachment"), getPostController.run);
    cron.schedule("*/1 * * * *", () => {
      console.log("checking if there are emails to send");
      sendScheduledNewsletter.run();
    });
    return router;
  }
}
