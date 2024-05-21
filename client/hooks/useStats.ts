"use client";

import { fetcher } from "@/lib/utils";
import { Stats } from "@/models/Stats";
import useSWR from "swr";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function useStats() {
  const { data, error, isLoading, mutate } = useSWR<Stats>(
    `${API_URL}/api/stats`,
    fetcher
  );

  return {
    stats: data,
    isLoading,
    isError: error,
    mutate,
  };
}
