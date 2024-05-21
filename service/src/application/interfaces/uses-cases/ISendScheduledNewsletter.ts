import { NewsletterDTO } from "../../dtos/NewsletterDTO";

export interface ISendScheduledNewsletter {
  run(): Promise<boolean>;
}
