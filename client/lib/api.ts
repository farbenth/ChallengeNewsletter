import { toast } from "@/components/ui/use-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3100";

export const makeRequest = async <T>(
  method: string,
  url: string,
  data?: any
): Promise<T | undefined> => {
  try {
    const headers: HeadersInit = {};
    let body = data;

    if (!(data instanceof FormData)) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(data);
    }

    const response = await fetch(API_URL + url, {
      method,
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    if (response.status == 204) {
      return true as T;
    }

    return await response.json();
  } catch (error: unknown) {
    console.error(error);
    toast({
      title: "Error",
      description:
        (error as Error)?.message || "Se produjo un error en la solicitud.",
      variant: "destructive",
    });
  }
};
