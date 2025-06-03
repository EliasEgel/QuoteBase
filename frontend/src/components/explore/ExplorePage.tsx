import { useState } from "react";
import ExploreHeader from "./ExploreHeader";
import QuoteCard from "../QuoteCard";
import { useQuotes } from "../../hooks/useQuotes";
import SearchBar from "./SearchBar";

export default function ExplorePage() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  const { data: quotesPage, isLoading, error } = useQuotes(page, 6, search);
  const totalPages = quotesPage?.totalPages ?? 0;
  const isLastPage = page >= totalPages - 1;
  const quotes = quotesPage?.content ?? [];

  const handleSearch = (term: string) => {
    setPage(0); // Reset pagination
    setSearch(term);
  };

  return (
    <div className="mt-16 px-4 py-8 max-w-3xl mx-auto space-y-6 text-[#0c1446]">
      <ExploreHeader />
      <SearchBar onSearch={handleSearch} />

      {isLoading && <p>Loading quotes...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      {!isLoading && !error && quotes.length === 0 ? (
        <p className="text-center text-sm text-[#0c1446]">
          No quotes found{search ? ` for "${search}"` : ""}.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {quotes.map((quote) => (
            <QuoteCard key={quote.id} {...quote} />
          ))}
        </div>
      )}

      <div className="flex justify-center gap-4 pt-6">
        {!isLoading && page > 0 && (
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            className="px-4 py-2 rounded text-white transition-colors"
            style={{
              backgroundColor: "#2b7c85",
            }}
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
        {!isLoading && !isLastPage && (
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 rounded text-white transition-colors"
            style={{
              backgroundColor: "#2b7c85",
            }}
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
    </div>
  );
}
