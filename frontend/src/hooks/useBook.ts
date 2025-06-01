import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";

export function useBook(bookId: string) {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["book", bookId],
    queryFn: async () => {
      const token = await getToken();
      const res = await fetch(`http://localhost:8080/api/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch book");
      }

      return res.json();
    },
    enabled: !!bookId,
  });
}