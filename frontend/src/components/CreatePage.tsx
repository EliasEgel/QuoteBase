import { useState } from "react";
import CreateBookForm from "./CreateBookForm";
import CreateQuoteForm from "./CreateQuoteForm";

export default function CreatePage() {
  const [type, setType] = useState<"book" | "quote">("book");

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold text-center">Create</h1>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setType("book")}
          className={`btn ${type === "book" ? "btn-primary" : "btn-outline"}`}
        >
          Book
        </button>
        <button
          onClick={() => setType("quote")}
          className={`btn ${type === "quote" ? "btn-primary" : "btn-outline"}`}
        >
          Quote
        </button>
      </div>

      {type === "book" ? <CreateBookForm /> : <CreateQuoteForm />}
    </div>
  );
}
