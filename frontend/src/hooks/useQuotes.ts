import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { Quote, PagedResponse } from "../types/quote";

const fetchQuotes = async (
  page: number,
  size = 6
): Promise<PagedResponse<Quote>> => {
  const API_PATH = import.meta.env.VITE_API_PATH;
  const res = await fetch(`${API_PATH}/quotes?page=${page}&size=${size}`);
  if (!res.ok) {
    throw new Error("Failed to fetch quotes");
  }
  return res.json();
};

export const useQuotes = (
  page: number,
  size: number = 6
): UseQueryResult<PagedResponse<Quote>, Error> =>
  useQuery<
    PagedResponse<Quote>,
    Error,
    PagedResponse<Quote>,
    [string, number, number]
  >({
    queryKey: ["quotes", page, size],
    queryFn: () => fetchQuotes(page, size),
    staleTime: 1000 * 60,
  });
