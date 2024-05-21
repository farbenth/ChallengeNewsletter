import { makeRequest } from "@/lib/api";

export const addNewsletter = async (newsletter: any) => {
  return makeRequest("POST", `/api/newsletter`, newsletter);
};

export const updateSubscriptions = async (subscriptions: any) => {
  return makeRequest("POST", `/api/subscription`, subscriptions);
};
