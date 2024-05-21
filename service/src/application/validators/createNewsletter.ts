import { z } from "zod";

export const SendNewsletterScheme = z.object({
  name: z.string(),
  description: z.string(),
  content: z.string(),
  attachment: z.string().optional(),
  scheduledFor: z.number().optional(),
  emails: z.array(z.string().email()).nonempty(),
});

export const validateSendNewsletter = (object: { [key: string]: any }) => {
  return SendNewsletterScheme.safeParse(object);
};
