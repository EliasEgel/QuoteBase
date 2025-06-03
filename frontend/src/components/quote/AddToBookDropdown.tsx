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
    <div className="space-y-4 text-[#0c1446] mt-4">
      <select
        className="w-full p-2 border rounded"
        style={{ borderColor: "#175873" }}
        onChange={(e) => setSelectedBookId(Number(e.target.value))}
        value={selectedBookId || ""}
      >
        <option disabled value="">
          Select a book
        </option>
        {books.map((book: any) => {
          const alreadyHasQuote = book.quoteIds.includes(quoteId);
          return (
            <option key={book.id} value={book.id} disabled={alreadyHasQuote}>
              {book.title} {alreadyHasQuote ? "(Already added)" : ""}
            </option>
          );
        })}
      </select>

      {selectedBookId && (
        <button
          onClick={handleAdd}
          disabled={isPending}
          className="w-full text-white rounded py-2 transition-colors"
          style={{
            backgroundColor: "#2b7c85",
            opacity: isPending ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!isPending) e.currentTarget.style.backgroundColor = "#0c1446";
          }}
          onMouseLeave={(e) => {
            if (!isPending) e.currentTarget.style.backgroundColor = "#2b7c85";
          }}
        >
          {isPending ? "Adding..." : "Add Quote to Book"}
        </button>
      )}
    </div>
  );
}
