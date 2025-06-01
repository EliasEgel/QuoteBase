/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserBooks } from "../../hooks/useUserBooks";
import { useAddQuoteToBook } from "../../hooks/useAddQuoteToBook";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";

type AddToBookDropdownProps = {
  quoteId: number;
};

export default function AddToBookDropdown({ quoteId }: AddToBookDropdownProps) {
  const { user } = useUser();
  const clerkId = user?.id || "";
  const { data: books, isLoading } = useUserBooks(clerkId);
  const { mutate: addQuoteToBook, isPending } = useAddQuoteToBook();
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  if (isLoading) return <p>Loading books...</p>;

  const handleAdd = () => {
    if (!selectedBookId) return;
    addQuoteToBook({ bookId: selectedBookId, quoteId });
  };

  return (
    <div className="space-y-2">
      <select
        className="select select-bordered w-full"
        onChange={(e) => setSelectedBookId(Number(e.target.value))}
        value={selectedBookId || ""}
      >
        <option disabled value="">Select a book</option>
        {books.map((book: any) => {
          const alreadyHasQuote = book.quoteIds.includes(quoteId);
          return (
            <option key={book.id} value={book.id} disabled={alreadyHasQuote}>
              {book.title} {alreadyHasQuote ? "(Already added)" : ""}
            </option>
          );
        })}
      </select>

      <button
        className="btn btn-primary w-full"
        onClick={handleAdd}
        disabled={!selectedBookId || isPending}
      >
        {isPending ? "Adding..." : "Add Quote to Book"}
      </button>
    </div>
  );
}

