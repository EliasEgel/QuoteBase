import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";

export function useRemoveQuoteFromBook() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const API_PATH = import.meta.env.VITE_API_PATH;

  return useMutation({
    mutationFn: async ({
      bookId,
      quoteId,
    }: {
      bookId: number;
      quoteId: number;
    }) => {
      
      const token = await getToken();

      const res = await fetch(
        `${API_PATH}/books/${bookId}/quotes/${quoteId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Failed to remove quote from book"
        );
      }

      return res.json();
    },
    onSuccess: (_, { bookId }) => {
      queryClient.invalidateQueries({ queryKey: ["book", String(bookId)] });
    },
  });
}

