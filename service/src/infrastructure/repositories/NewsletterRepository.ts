import { Newsletter } from "../../domain/entities/Newsletter";
import { INewsletterRepository } from "../../domain/repositories/INewsletterRepository";

export class NewsletterRepository implements INewsletterRepository {
  private newsletters: Array<Newsletter> = [];

  update(entity: Newsletter): Promise<boolean> {
    this.newsletters = this.newsletters.filter((s) => s.id == entity.id);
    this.newsletters.push(entity);

    return Promise.resolve(true);
  }
  insert(entity: Newsletter): Promise<Newsletter> {
    this.newsletters.push(entity);
    return Promise.resolve(entity);
  }
  insertMultiple(entities: Newsletter[]): Promise<Newsletter[]> {
    this.newsletters = this.newsletters.concat(entities);
    return Promise.resolve(entities);
  }

  getAll(): Promise<Newsletter[]> {
    return Promise.resolve(this.newsletters);
  }
  getById(id: string): Promise<Newsletter | undefined> {
    const entity = this.newsletters.find((s) => s.id == id);
    return Promise.resolve(entity);
  }
  getCount(): Promise<number> {
    return Promise.resolve(this.newsletters.length);
  }
  async getScheduledNewsletter(): Promise<Newsletter[]> {
    const entities = this.newsletters.filter((s) => s.scheduledFor != null);
    return Promise.resolve(entities);
  }
}
