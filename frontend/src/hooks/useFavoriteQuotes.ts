import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export function useFavoriteQuotes(clerkId: string) {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["favoriteQuotes", clerkId],
    queryFn: async () => {
      const token = await getToken();
      const res = await fetch(`http://localhost:8080/api/favorites?clerkId=${clerkId}`, {
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
  });
}
