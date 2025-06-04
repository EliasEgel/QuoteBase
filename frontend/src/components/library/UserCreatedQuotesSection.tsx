import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useCreatedQuotes } from "../../hooks/useCreatedQuotes";
import QuoteCard from "../QuoteCard";
import Pagination from "../Pagination";

export default function UserCreatedQuotesSection() {
  const { user } = useUser();
  const clerkId = user?.id || "";
  const [page, setPage] = useState(0);

  const {
    data: createdQuotesPage,
    isLoading,
    isError,
  } = useCreatedQuotes(clerkId, page);
  const totalPages = createdQuotesPage?.totalPages ?? 0;
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

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      ) : (
        <p className="text-sm text-gray-600">
          You haven’t created any quotes yet.
        </p>
      )}
    </section>
  );
}
