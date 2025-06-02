import { useQuery } from '@tanstack/react-query';
import type { Quote } from '../types/quote';

const fetchQuotes = async (): Promise<Quote[]> => {
  const API_PATH = import.meta.env.VITE_API_PATH;
  const res = await fetch(`${API_PATH}/quotes`);//to:do change to env variable
  if (!res.ok) {
    throw new Error('Failed to fetch quotes');
  }
  return res.json();
};

export const useQuotes = () => {
  return useQuery<Quote[]>({
    queryKey: ['quotes'],
    queryFn: fetchQuotes,
  });
};