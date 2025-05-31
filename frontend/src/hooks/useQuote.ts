import { useQuery } from "@tanstack/react-query";
import type { Quote } from "../types/quote";

const fetchQuoteById = async (id: string): Promise<Quote> => {
  const res = await fetch(`http://localhost:8080/api/quotes/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch quote");
  }
  return res.json();
};

export const useQuote = (id: string | undefined) => {
  return useQuery<Quote>({
    queryKey: ["quote", id],
    queryFn: () => fetchQuoteById(id!),
    enabled: !!id, // Only runs the query if id is truthy
  });
};
