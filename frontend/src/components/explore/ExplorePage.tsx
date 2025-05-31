import ExploreHeader from "./ExploreHeader";
import QuoteCard from "../QuoteCard";
import { useQuotes } from "../../hooks/useQuotes";
import type { JSX } from "react/jsx-runtime";

export default function ExplorePage() {
  const { data: quotes, isLoading, error } = useQuotes();

  return (
    <div className="px-4 py-8 max-w-3xl mx-auto space-y-6">
      <ExploreHeader />

      {isLoading && <p>Loading quotes...</p>}
      {error instanceof Error && <p className="text-red-500">Error: {error.message}</p>}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {quotes?.map((quote: JSX.IntrinsicAttributes & { id: number; text: string; author: string; }) => (
          <QuoteCard key={quote.id} {...quote} />
        ))}
      </div>
    </div>
  );
}
