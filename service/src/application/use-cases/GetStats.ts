import { INewsletterRepository } from "../../domain/repositories/INewsletterRepository";
import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";
import { StatsDTO } from "../dtos/StatsDTO";
import { IGetStats } from "../interfaces/uses-cases/IGetStats";

export class GetStats implements IGetStats {
  constructor(
    private newsletterRespository: INewsletterRepository,
    private subscriptionRepository: ISubscriptionRepository
  ) {}

  async run(): Promise<StatsDTO> {
    return Promise.all([
      this.subscriptionRepository.getSubscriberCount(),
      this.subscriptionRepository.getCount(),
      this.subscriptionRepository.getUnSubscriberCount(),
      this.newsletterRespository.getCount(),
    ]).then(
      ([
        totalActiveSubscribers,
        totalSubscribers,
        totalUnsubscribers,
        totalNewsletter,
      ]) => {
        return {
          totalActiveSubscribers,
          totalSubscribers,
          totalUnsubscribers,
          totalNewsletter,
        };
      }
    );
  }
}
