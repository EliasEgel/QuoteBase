import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import type { Quote, PagedResponse } from "../types/quote";

export function useFavoriteQuotes(clerkId: string, page = 0, size = 6) {
  const API_PATH = import.meta.env.VITE_API_PATH;
  const { getToken } = useAuth();

  return useQuery<PagedResponse<Quote>, Error>({
    queryKey: ["favoriteQuotes", clerkId, page, size],
    queryFn: async () => {
      const token = await getToken();
      const res = await fetch(`${API_PATH}/favorites?clerkId=${clerkId}&page=${page}&size=${size}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch favorite quotes");
      }

      return res.json();
    },
    enabled: !!clerkId,
    staleTime: 1000 * 60,
  });
}
