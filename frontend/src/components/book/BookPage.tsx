/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useBook } from "../../hooks/useBook";
import { useRemoveQuoteFromBook } from "../../hooks/useRemoveQuoteFromBook";
import { useUser } from "@clerk/clerk-react";
import QuoteCard from "../QuoteCard";

type BookPageProps = {
  id: string;
};

export default function BookPage({ id }: BookPageProps) {
  const { data: book, isLoading, error } = useBook(id);
  const { mutate: removeQuote, isPending } = useRemoveQuoteFromBook();
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  if (isLoading) return <div>Loading book...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  if (!book) return <div>Book not found</div>;

  const handleRemove = (quoteId: number) => {
    removeQuote({ bookId: Number(id), quoteId });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-6 text-[#0c1446] mt-16 text-center">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-center">{book.title}</h1>
        {user && (
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="btn btn-sm text-white transition-colors"
            style={{ backgroundColor: "#2b7c85" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#0c1446")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#2b7c85")
            }
          >
            {isEditing ? "Done" : "Edit"}
          </button>
        )}
      </div>

      {book.quotes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {book.quotes.map((quote: any) => (
            <div key={quote.id} className="relative group h-full">
              {/* Disable navigation when editing */}
              <div
                className={`h-full ${isEditing ? "pointer-events-none opacity-70" : ""}`}
              >
                <div className="h-full flex flex-col">
                  <QuoteCard
                    id={quote.id}
                    text={quote.text}
                    author={quote.author}
                  />
                </div>
              </div>

              {user && isEditing && (
                <button
                  onClick={() => handleRemove(quote.id)}
                  disabled={isPending}
                  className="absolute top-2 right-2 text-xs text-white btn btn-sm transition-colors"
                  style={{ backgroundColor: "#dc2626" }}
                  onMouseEnter={
                    (e) => (e.currentTarget.style.backgroundColor = "#b91c1c") // deeper red
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#dc2626")
                  }
                >
                  ✕ Remove
                </button>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          This book has no quotes yet.
        </p>
      )}
    </div>
  );
}
