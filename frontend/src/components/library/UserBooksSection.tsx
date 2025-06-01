import { useUser } from "@clerk/clerk-react";
import { useUserBooks } from "../../hooks/useUserBooks"; // adjust path
import BookCard from "../BookCard";

export default function UserBooksSection() {
  const { user } = useUser();
  const clerkId = user?.id;
  const {
    data: books,
    isLoading,
    isError,
  } = useUserBooks(clerkId || "");

  return (
    <section>
      <h2 className="text-xl font-semibold border-b pb-1 mb-3">Books</h2>
      {isLoading ? (
        <p>Loading books...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load books.</p>
      ) : books && books.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {books.map(
            (
              book: { id: number; title: string; quoteCount: number }
            ) => (
              <BookCard
                key={book.id }
                id={book.id}
                title={book.title}
                quoteCount={book.quoteCount}
              />
            )
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          You haven’t created any books yet.
        </p>
      )}
    </section>
  );
}
