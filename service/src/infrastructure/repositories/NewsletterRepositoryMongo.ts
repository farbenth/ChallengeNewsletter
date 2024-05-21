import { Newsletter } from "../../domain/entities/Newsletter";
import { INewsletterRepository } from "../../domain/repositories/INewsletterRepository";
import { NewsletterModel } from "../db/models/newsletter.model";

export class NewsletterRepositoryMongo implements INewsletterRepository {
  async update(entity: Newsletter): Promise<boolean> {
    const result = await NewsletterModel.findOneAndUpdate(
      { id: entity.id },
      entity
    );
    return Boolean(result);
  }
  async insert(entity: Newsletter): Promise<Newsletter> {
    const result = await NewsletterModel.create(entity);
    result.save();

    return new Newsletter(
      result.id,
      result.name,
      result.description,
      result.createdAt,
      result.content,
      result.attachment,
      result.scheduledFor
    );
  }
  async insertMultiple(entities: Newsletter[]): Promise<Newsletter[]> {
    const result = await NewsletterModel.insertMany(entities);
    return result.map(
      (res) =>
        new Newsletter(
          res.id,
          res.name,
          res.description,
          res.createdAt,
          res.content,
          res.attachment,
          res.scheduledFor
        )
    );
  }

  async getAll(): Promise<Newsletter[]> {
    const result = await NewsletterModel.find({}).exec();
    return result.map(
      (res) =>
        new Newsletter(
          res.id,
          res.name,
          res.description,
          res.createdAt,
          res.content,
          res.attachment,
          res.scheduledFor
        )
    );
  }
  async getById(id: string): Promise<Newsletter | undefined> {
    const result = await NewsletterModel.findOne({ id });
    if (result)
      return new Newsletter(
        result?.id,
        result?.name,
        result?.description,
        result?.createdAt,
        result?.content,
        result?.attachment,
        result?.scheduledFor
      );

    return;
  }
  getCount(): Promise<number> {
    return NewsletterModel.countDocuments().exec();
  }

  async getScheduledNewsletter(): Promise<Newsletter[]> {
    const result = await NewsletterModel.find({
      scheduledFor: { $lte: Date.now() },
    }).exec();
    return result.map(
      (res) =>
        new Newsletter(
          res.id,
          res.name,
          res.description,
          res.createdAt,
          res.content,
          res.attachment,
          res.scheduledFor
        )
    );
  }
}
