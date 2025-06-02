import { useAuth } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";

export function useUserBooks(clerkId: string) {
  const { getToken } = useAuth();
  const API_PATH = import.meta.env.VITE_API_PATH;

  return useQuery({
    queryKey: ["books", clerkId],
    queryFn: async () => {
      const token = await getToken(); // Get Clerk session token
      const res = await fetch(`${API_PATH}/books?clerkId=${clerkId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch books");
      }

      return res.json();
    },
    enabled: !!clerkId,
  });
}
