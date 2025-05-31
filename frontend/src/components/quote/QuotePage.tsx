
import { useQuote } from "../../hooks/useQuote";

type QuotePageProp={
    id:string;
};

export default function QuotePage({id}:QuotePageProp) {
  const { data: quote, isLoading, error } = useQuote(id);

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  if (!quote) return <div>No quote found</div>;

  return (
    <div className="max-w-xl mx-auto px-4 py-8">
      <blockquote className="text-xl italic">
        “{quote.text}”
        <footer className="mt-4 text-right">
          — {quote.author} {quote.source && <span>({quote.source})</span>}
        </footer>
      </blockquote>
    </div>
  );
}
