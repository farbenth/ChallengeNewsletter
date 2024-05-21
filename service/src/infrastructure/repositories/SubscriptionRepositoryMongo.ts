import { Subscription } from "../../domain/entities/Subscription";
import { ISubscriptionRepository } from "../../domain/repositories/ISubscriptionRepository";
import { SubscriptionModel } from "../db/models/subscription.model";

export class SubscriptionRepositoryMongo implements ISubscriptionRepository {
  async update(entity: Subscription): Promise<boolean> {
    const result = await SubscriptionModel.findOneAndUpdate(
      { id: entity.id },
      entity
    ).exec();
    return Boolean(result);
  }
  async insert(entity: Subscription): Promise<Subscription> {
    const result = await SubscriptionModel.create(entity);
    result.save();

    return new Subscription(
      result.id,
      result.newsletterId,
      result.email,
      result.title,
      result.decription,
      result.subscribedAt,
      result.unsubscribedAt
    );
  }
  async insertMultiple(entities: Subscription[]): Promise<Subscription[]> {
    const result = await SubscriptionModel.insertMany(entities);
    return result.map(
      (res) =>
        new Subscription(
          res.id,
          res.newsletterId,
          res.email,
          res.title,
          res.decription,
          res.subscribedAt,
          res.unsubscribedAt
        )
    );
  }

  async getAll(): Promise<Subscription[]> {
    const result = await SubscriptionModel.find({}).exec();
    return result.map(
      (res) =>
        new Subscription(
          res.id,
          res.newsletterId,
          res.email,
          res.title,
          res.decription,
          res.subscribedAt,
          res.unsubscribedAt
        )
    );
  }

  async getAllByEmail(email: string): Promise<Array<Subscription>> {
    const result = await SubscriptionModel.find({ email }).exec();
    return result.map(
      (res) =>
        new Subscription(
          res.id,
          res.newsletterId,
          res.email,
          res.title,
          res.decription,
          res.subscribedAt,
          res.unsubscribedAt
        )
    );
  }
  async getById(id: string): Promise<Subscription | undefined> {
    const result = await SubscriptionModel.findOne({ id });
    if (result)
      return new Subscription(
        result.id,
        result.newsletterId,
        result.email,
        result.title,
        result.decription,
        result.subscribedAt,
        result.unsubscribedAt
      );
  }

  getCount(): Promise<number> {
    return SubscriptionModel.countDocuments().exec();
  }

  async getSubscriberCount(): Promise<number> {
    const result = await SubscriptionModel.find({ unsubscribedAt: null })
      .countDocuments()
      .exec();
    return result;
  }
  async getUnSubscriberCount(): Promise<number> {
    const result = await SubscriptionModel.find({
      unsubscribedAt: { $ne: null },
    })
      .countDocuments()
      .exec();
    return result;
  }

  async getAllByNewsletterId(newsletterId: string): Promise<Subscription[]> {
    const result = await SubscriptionModel.find({
      newsletterId: newsletterId,
    }).exec();
    return result.map(
      (res) =>
        new Subscription(
          res.id,
          res.newsletterId,
          res.email,
          res.title,
          res.decription,
          res.subscribedAt,
          res.unsubscribedAt
        )
    );
  }
}
