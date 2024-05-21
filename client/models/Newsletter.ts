export interface Newsletter {
  id: string;
  name: string;
  description: string;
  content: string;
  attachment?: string;
  scheduledFor?: number | null;
  emails: string[];
}
