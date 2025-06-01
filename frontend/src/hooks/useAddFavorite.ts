import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";

export function useAddFavorite() {
  const queryClient = useQueryClient();
  const { getToken, userId } = useAuth();

  return useMutation({
    mutationFn: async (quoteId: number) => {
      const token = await getToken();

      const res = await fetch(`http://localhost:8080/api/favorites?clerkId=${userId}&quoteId=${quoteId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to favorite quote");
      }

      return res.json();
    },
    onSuccess: () => {
      // Match the remove hook so the quote gets refetched correctly
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["quote"] });
    },
  });
}

