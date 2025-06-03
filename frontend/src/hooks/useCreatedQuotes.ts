import { useAuth } from '@clerk/clerk-react';
import { useQuery } from '@tanstack/react-query';
import type { Quote, PagedResponse } from '../types/quote';

export function useCreatedQuotes(clerkId: string, page: number) {
  const { getToken } = useAuth();

  return useQuery<PagedResponse<Quote>>({
    queryKey: ['createdQuotes', clerkId, page],
    queryFn: async () => {
      const token = await getToken();
      const API_PATH = import.meta.env.VITE_API_PATH;
      const res = await fetch(
        `${API_PATH}/created?clerkId=${clerkId}&page=${page}&size=6`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch created quotes');
      }

      return res.json();
    },
    enabled: !!clerkId,
  });
}
