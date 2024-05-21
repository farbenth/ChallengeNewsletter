import { Newsletter } from "../../domain/entities/Newsletter";
import { Subscription } from "../../domain/entities/Subscription";
import { INewsletterRepository } from "../../domain/repositories/INewsletterRepository";
import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";
import { IMailer } from "../../domain/services/IMailer";
import { NewsletterDTO } from "../dtos/NewsletterDTO";
import { ISendNewsletter } from "../interfaces/uses-cases/ISendNewsletter";
import crypto from "node:crypto";
import Handlebars from "handlebars";

export class SendNewsletter implements ISendNewsletter {
  constructor(
    private newsletterRespository: INewsletterRepository,
    private subscriptionRespository: ISubscriptionRepository,
    private mailerService: IMailer
  ) {}

  async run(request: NewsletterDTO): Promise<NewsletterDTO> {
    const newsletter = new Newsletter(
      crypto.randomUUID(),
      request.name,
      request.description,
      Date.now(),
      request.content,
      request.attachment,
      request.scheduledFor
    );

    const subscriptions = request.emails.map(
      (email) =>
        new Subscription(
          crypto.randomUUID(),
          newsletter.id,
          email,
          newsletter.name,
          newsletter.description,
          Date.now()
        )
    );

    await this.newsletterRespository.insert(newsletter);
    await this.subscriptionRespository.insertMultiple(subscriptions);

    if (!newsletter.scheduledFor) {
      const mailTemplate = Handlebars.compile(newsletter.content);
      subscriptions.forEach((subscription) => {
        this.mailerService.sendEmail({
          subject: newsletter.name,
          to: subscription.email,
          body: mailTemplate({ email: subscription.email }),
          attachment: newsletter.attachment,
        });
      });
    }

    return { ...request, id: newsletter.id };
  }
}
