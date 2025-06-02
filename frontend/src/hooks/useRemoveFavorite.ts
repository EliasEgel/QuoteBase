
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';

export function useRemoveFavorite() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  

  return useMutation({
    mutationFn: async ({ clerkId, quoteId }: { clerkId: string; quoteId: number }) => {
      const token = await getToken();
      const API_PATH = import.meta.env.VITE_API_PATH;
      const res = await fetch(`${API_PATH}/favorites`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clerkId, quoteId }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to remove favorite');
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favorites'] });
      queryClient.invalidateQueries({ queryKey: ['quote'] });
    },
  });
}

