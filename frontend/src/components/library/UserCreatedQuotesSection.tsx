import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useCreatedQuotes } from "../../hooks/useCreatedQuotes";
import QuoteCard from "../QuoteCard";

export default function UserCreatedQuotesSection() {
  const { user } = useUser();
  const clerkId = user?.id || "";
  const [page, setPage] = useState(0);

  const {
    data: createdQuotesPage,
    isLoading,
    isError,
  } = useCreatedQuotes(clerkId, page);

  const quotes = createdQuotesPage?.content ?? [];

  return (
    <section className="text-[#0c1446] mt-8">
      <h2
        className="text-xl font-semibold border-b pb-1 mb-3"
        style={{ borderColor: "#175873" }}
      >
        Your Quotes
      </h2>

      {isLoading ? (
        <p>Loading your quotes...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load your quotes.</p>
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
                  (e.currentTarget.style.backgroundColor = "#0c1446")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2b7c85")
                }
              >
                Previous
              </button>
            )}
            {createdQuotesPage && page + 1 < createdQuotesPage.totalPages && (
              <button
                onClick={() => setPage((prev) => prev + 1)}
                className="px-4 py-2 rounded text-white transition-colors"
                style={{ backgroundColor: "#2b7c85" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0c1446")
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
          You haven’t created any quotes yet.
        </p>
      )}
    </section>
  );
}
