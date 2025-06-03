import { useState } from "react";
import ExploreHeader from "./ExploreHeader";
import QuoteCard from "../QuoteCard";
import { useQuotes } from "../../hooks/useQuotes";

export default function ExplorePage() {
  const [page, setPage] = useState(0);
  const { data: quotesPage, isLoading, error } = useQuotes(page);
  const totalPages = quotesPage?.totalPages ?? 0;
  const isLastPage = page >= totalPages - 1;

  const quotes = quotesPage?.content ?? [];

  return (
    <div className="px-4 py-8 max-w-3xl mx-auto space-y-6">
      <ExploreHeader />

      {isLoading && <p>Loading quotes...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} {...quote} />
        ))}
      </div>

      <div className="flex justify-center gap-4 pt-6">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
          disabled={page === 0 || isLoading}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={isLastPage || isLoading}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
