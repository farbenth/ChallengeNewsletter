import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";
import { ISaveSubscriptions } from "../interfaces/uses-cases/ISaveSubscriptions";
import { SubscriptionDTO } from "../dtos/SubscriptionDTO";

export class SaveSubscription implements ISaveSubscriptions {
  constructor(private subscriptionRespository: ISubscriptionRepository) {}

  async run(request: SubscriptionDTO[]): Promise<boolean> {
    const updates = request.map(async (sub) => {
      const subscription = await this.subscriptionRespository.getById(sub.id);

      if (subscription) {
        subscription.unsubscribedAt = sub.active ? null : Date.now();
        this.subscriptionRespository.update(subscription);
      }
    });

    await Promise.all(updates);

    return true;
  }
}
