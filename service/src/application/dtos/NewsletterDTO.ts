export interface NewsletterDTO {
  id?: string;
  name: string;
  description: string;
  createdAt?: number;
  content: string;
  attachment?: string;
  scheduledFor?: number | null;
  emails: string[];
}
