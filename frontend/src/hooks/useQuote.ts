import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/clerk-react";
import type { Quote } from "../types/quote";

const fetchQuoteById = async (id: string, clerkId?: string): Promise<Quote> => {
  const url = new URL(`http://localhost:8080/api/quotes/${id}`);
  if (clerkId) {
    url.searchParams.set("clerkId", clerkId);
  }

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error("Failed to fetch quote");
  }
  return res.json();
};

export const useQuote = (id: string | undefined) => {
  const { user } = useUser();
  const clerkId = user?.id;

  return useQuery<Quote>({
    queryKey: ["quote", id, clerkId],
    queryFn: () => fetchQuoteById(id!, clerkId),
    enabled: !!id,
  });
};
