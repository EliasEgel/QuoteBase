import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { Quote, PagedResponse } from "../types/quote";

const fetchQuotes = async (
  page: number,
  size = 6,
  search?: string
): Promise<PagedResponse<Quote>> => {
  const API_PATH = import.meta.env.VITE_API_PATH;
  const searchParam = search ? `&search=${encodeURIComponent(search)}` : "";
  const res = await fetch(`${API_PATH}/quotes?page=${page}&size=${size}${searchParam}`);
  if (!res.ok) {
    throw new Error("Failed to fetch quotes");
  }
  return res.json();
};


export const useQuotes = (
  page: number,
  size: number = 6,
  search?: string
): UseQueryResult<PagedResponse<Quote>, Error> =>
  useQuery<
    PagedResponse<Quote>,
    Error,
    PagedResponse<Quote>,
    [string, number, number, string?]
  >({
    queryKey: ["quotes", page, size, search],
    queryFn: () => fetchQuotes(page, size, search),
    staleTime: 1000 * 60,
  });
