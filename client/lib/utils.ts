import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormData(object: any) {
  const formData = new FormData();
  Object.keys(object).forEach((key) => {
    if (object[key]) formData.append(key, object[key]);
  });
  return formData;
}

export const fetcher = async (url: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  return fetch(url, {
    headers,
  }).then((res) => res.json());
};
