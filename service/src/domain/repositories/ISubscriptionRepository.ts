import { Subscription } from "../entities/Subscription";
import { IRepository } from "./IRepository";

export interface ISubscriptionRepository
  extends IRepository<Subscription, string> {
  getAllByEmail(email: string): Promise<Array<Subscription>>;
  getAllByNewsletterId(newsletterId: string): Promise<Array<Subscription>>;
  getSubscriberCount(): Promise<number>;
  getUnSubscriberCount(): Promise<number>;
}
