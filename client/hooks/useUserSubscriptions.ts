"use client";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useUserSubscriptions(email: string | null) {
  const { data, error, isLoading, mutate } = useSWR(
    `${API_URL}/api/subscription?email=${email}`,
    fetcher
  );

  return {
    subscriptions: data,
    isLoading,
    isError: error,
    mutate,
  };
}
