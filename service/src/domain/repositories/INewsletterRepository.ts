import { Newsletter } from "../entities/Newsletter";
import { IRepository } from "./IRepository";

export interface INewsletterRepository extends IRepository<Newsletter, string> {
  getScheduledNewsletter(): Promise<Array<Newsletter>>;
}
