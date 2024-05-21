import { NewsletterDTO } from "../../dtos/NewsletterDTO";

export interface ISendNewsletter {
  run(requests: NewsletterDTO): Promise<NewsletterDTO>;
}
