import { z } from "zod";

export const SaveSubscriptionScheme = z.object({
  subscriptions: z
    .object({
      id: z.string(),
      active: z.boolean(),
    })
    .array()
    .min(1),
});

export const validateSaveSubscriptions = (object: { [key: string]: any }) => {
  return SaveSubscriptionScheme.safeParse(object);
};
