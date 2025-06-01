/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUser } from "@clerk/clerk-react";
import { useFavoriteQuotes } from "../../hooks/useFavoriteQuotes";
import QuoteCard from "../QuoteCard";

export default function UserFavoritesSection() {
  const { user } = useUser();
  const clerkId = user?.id || "";

  const {
    data: favorites,
    isLoading,
    isError,
  } = useFavoriteQuotes(clerkId);

  return (
    <section>
      <h2 className="text-xl font-semibold border-b pb-1 mb-3">Favorite Quotes</h2>

      {isLoading ? (
        <p>Loading favorites...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load favorites.</p>
      ) : favorites && favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {favorites.map((quote: any) => (
            <QuoteCard
              key={quote.id}
              id={quote.id}
              text={quote.text}
              author={quote.author}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">
          You haven’t favorited any quotes yet.
        </p>
      )}
    </section>
  );
}