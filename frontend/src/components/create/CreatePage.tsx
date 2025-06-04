import { useState } from "react";
import CreateBookForm from "./CreateBookForm";
import CreateQuoteForm from "./CreateQuoteForm";

export default function CreatePage() {
  const [type, setType] = useState<"book" | "quote">("quote");

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-6 text-[#0c1446] mt-16">
      <h1 className="text-2xl font-bold text-center">Create</h1>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setType("quote")}
          className="px-4 py-2 rounded transition-colors"
          style={{
            backgroundColor: type === "quote" ? "#2b7c85" : "transparent",
            color: type === "quote" ? "white" : "#175873",
            border: "1px solid #175873",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              type === "quote" ? "#0c1446" : "#0c1446")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              type === "quote" ? "#2b7c85" : "transparent")
          }
        >
          Quote
        </button>
        <button
          onClick={() => setType("book")}
          className="px-4 py-2 rounded transition-colors"
          style={{
            backgroundColor: type === "book" ? "#2b7c85" : "transparent",
            color: type === "book" ? "white" : "#175873",
            border: "1px solid #175873",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              type === "book" ? "#0c1446" : "#0c1446")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor =
              type === "book" ? "#2b7c85" : "transparent")
          }
        >
          Book
        </button>
      </div>

      {type === "book" ? <CreateBookForm /> : <CreateQuoteForm />}
    </div>
  );
}
