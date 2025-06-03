import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useFavoriteQuotes } from "../../hooks/useFavoriteQuotes";
import QuoteCard from "../QuoteCard";

export default function UserFavoritesSection() {
  const { user } = useUser();
  const clerkId = user?.id || "";
  const [page, setPage] = useState(0);

  const {
    data: favoritesPage,
    isLoading,
    isError,
  } = useFavoriteQuotes(clerkId, page);

  const quotes = favoritesPage?.content ?? [];

  return (
    <section>
      <h2 className="text-xl font-semibold border-b pb-1 mb-3">Favorite Quotes</h2>

      {isLoading ? (
        <p>Loading favorites...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load favorites.</p>
      ) : quotes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {quotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                id={quote.id}
                text={quote.text}
                author={quote.author}
              />
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
              disabled={page === 0}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={favoritesPage && page + 1 >= favoritesPage.totalPages}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-500">You haven’t favorited any quotes yet.</p>
      )}
    </section>
  );
}
