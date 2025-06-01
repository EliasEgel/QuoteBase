import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import type { QuotePayload } from '../types/quotePayload';



const addQuote = async (quote: QuotePayload, token: string | null) => {
  const response = await fetch('http://localhost:8080/api/quotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(quote),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add quote');
  }

  return response.json();
};

export function useAddQuote() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (quote: QuotePayload) => {
      const token = await getToken();
      return addQuote(quote, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quotes'] });
    },
  });
}
