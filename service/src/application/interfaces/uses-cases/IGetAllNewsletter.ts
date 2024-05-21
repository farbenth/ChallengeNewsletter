import { NewsletterDTO } from "../../dtos/NewsletterDTO";

export interface IGetAllNewsletter {
  run(): Promise<Array<NewsletterDTO>>;
}
