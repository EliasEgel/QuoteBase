import { useBook } from "../../hooks/useBook";
import QuoteCard from "../QuoteCard";

type BookPageProps = {
  id: string;
};

export default function BookPage({ id }: BookPageProps) {
  const { data: book, isLoading, error } = useBook(id);

  if (isLoading) return <div>Loading book...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">{book.title}</h1>

      {book.quotes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {book.quotes.map((quote: any) => (
            <QuoteCard
              key={quote.id}
              id={quote.id}
              text={quote.text}
              author={quote.author}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">This book has no quotes yet.</p>
      )}
    </div>
  );
}