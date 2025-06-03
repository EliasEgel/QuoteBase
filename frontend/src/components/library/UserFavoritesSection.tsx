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
    <section className="text-[#0c1446] mt-8">
      <h2
        className="text-xl font-semibold border-b pb-1 mb-3"
        style={{ borderColor: "#175873" }}
      >
        Favorite Quotes
      </h2>

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
            {page > 0 && (
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                className="px-4 py-2 rounded text-white transition-colors"
                style={{ backgroundColor: "#2b7c85" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#87aca3")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2b7c85")
                }
              >
                Previous
              </button>
            )}
            {favoritesPage && page + 1 < favoritesPage.totalPages && (
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 rounded text-white transition-colors"
                style={{ backgroundColor: "#2b7c85" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#87aca3")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2b7c85")
                }
              >
                Next
              </button>
            )}
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-600">
          You haven’t favorited any quotes yet.
        </p>
      )}
    </section>
  );
}
