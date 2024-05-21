import { Subscription } from "../../domain/entities/Subscription";
import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";

export class SubscriptionRepository implements ISubscriptionRepository {
  private subscriptions: Array<Subscription> = [];

  update(entity: Subscription): Promise<boolean> {
    this.subscriptions = this.subscriptions.filter((s) => s.id == entity.id);
    this.subscriptions.push(entity);

    return Promise.resolve(true);
  }
  insert(entity: Subscription): Promise<Subscription> {
    this.subscriptions.push(entity);
    return Promise.resolve(entity);
  }

  insertMultiple(entities: Subscription[]): Promise<Subscription[]> {
    this.subscriptions = this.subscriptions.concat(entities);
    return Promise.resolve(entities);
  }

  getAll(): Promise<Subscription[]> {
    return Promise.resolve(this.subscriptions);
  }

  getAllByEmail(email: string): Promise<Array<Subscription>> {
    return Promise.resolve(this.subscriptions.filter((s) => s.email == email));
  }
  getById(id: string): Promise<Subscription | undefined> {
    const entity = this.subscriptions.find((s) => s.id == id);
    return Promise.resolve(entity);
  }
  getCount(): Promise<number> {
    return Promise.resolve(this.subscriptions.length);
  }
  getSubscriberCount(): Promise<number> {
    return Promise.resolve(
      this.subscriptions.filter((s) => s.unsubscribedAt == null).length
    );
  }
  getUnSubscriberCount(): Promise<number> {
    return Promise.resolve(
      this.subscriptions.filter((s) => s.unsubscribedAt != null).length
    );
  }
  getAllByNewsletterId(newsletterId: string): Promise<Subscription[]> {
    return Promise.resolve(
      this.subscriptions.filter((s) => s.newsletterId == newsletterId)
    );
  }
}
