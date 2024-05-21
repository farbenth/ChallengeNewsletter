import { Newsletter } from "../../domain/entities/Newsletter";
import { Subscription } from "../../domain/entities/Subscription";
import { INewsletterRepository } from "../../domain/repositories/INewsletterRepository";
import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";
import { IMailer } from "../../domain/services/IMailer";
import { NewsletterDTO } from "../dtos/NewsletterDTO";
import { ISendNewsletter } from "../interfaces/uses-cases/ISendNewsletter";
import crypto from "node:crypto";
import Handlebars from "handlebars";
import { ISendScheduledNewsletter } from "../interfaces/uses-cases/ISendScheduledNewsletter";

export class SendScheduledNewsletter implements ISendScheduledNewsletter {
  constructor(
    private newsletterRespository: INewsletterRepository,
    private subscriptionRespository: ISubscriptionRepository,
    private mailerService: IMailer
  ) {}

  async run(): Promise<boolean> {
    const newsletters =
      await this.newsletterRespository.getScheduledNewsletter();

    console.log("mails programados", newsletters);
    const newsletterPromises = newsletters?.map(async (newsletter) => {
      const mailTemplate = Handlebars.compile(newsletter.content);
      const subscriptions =
        await this.subscriptionRespository.getAllByNewsletterId(newsletter.id);
      const subsPromises = subscriptions.map((subscription) => {
        return this.mailerService.sendEmail({
          subject: newsletter.name,
          to: subscription.email,
          body: mailTemplate({ email: subscription.email }),
          attachment: newsletter.attachment,
        });
      });

      await this.newsletterRespository.update({
        ...newsletter,
        scheduledFor: null,
      });
      return subsPromises;
    });

    await Promise.all(newsletterPromises);

    return true;
  }
}
