"use client";

import { fetcher } from "@/lib/utils";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useNewsletters() {
  const { data, error, isLoading, mutate } = useSWR(
    `${API_URL}/api/newsletter`,
    fetcher
  );

  return {
    newsletters: data,
    isLoading,
    isError: error,
    mutate,
  };
}
