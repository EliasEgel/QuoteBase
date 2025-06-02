import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@clerk/clerk-react';
import type { Book } from '../types/book';

const addBook = async (newBook: Book, token: string | null) => {
  const API_PATH = import.meta.env.VITE_API_PATH;
  const response = await fetch(`${API_PATH}/books`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newBook),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add book');
  }

  return response.json();
};

export function useAddBook() {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async (newBook: Book) => {
      const token = await getToken();
      return addBook(newBook, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books'] });
    },
  });
}
