import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";
import { SubscriptionDTO } from "../dtos/SubscriptionDTO";
import { IGetSubscriptionsByEmail } from "../interfaces/uses-cases/IGetSubscriptionsByEmail";

export class GetSubscriptionsByEmail implements IGetSubscriptionsByEmail {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  async run(requests: { email: string }): Promise<SubscriptionDTO[]> {
    const subscriptions = await this.subscriptionRepository.getAllByEmail(
      requests.email
    );

    return subscriptions.map((subs) => ({
      id: subs.id,
      active: !subs.unsubscribedAt,
      newsletterId: subs.newsletterId,
      title: subs.title,
      description: subs.decription,
      email: subs.email,
    }));
  }
}
