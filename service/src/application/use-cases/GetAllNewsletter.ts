import { INewsletterRepository } from "../../domain/repositories/INewsletterRepository";
import { NewsletterDTO } from "../dtos/NewsletterDTO";
import { IGetAllNewsletter } from "../interfaces/uses-cases/IGetAllNewsletter";

export class GetAllNewsletter implements IGetAllNewsletter {
  constructor(private newsletterRespository: INewsletterRepository) {}

  async run(): Promise<NewsletterDTO[]> {
    const newsletters = await this.newsletterRespository.getAll();
    return newsletters.map((newsletters) => ({ ...newsletters, emails: [] }));
  }
}
