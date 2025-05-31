import { useState } from "react";
import ExploreHeader from "./ExploreHeader";
import QuoteCard from "../QuoteCard";

const mockQuotes = [
  { id: 1, text: "The only limit is your imagination.", author: "Unknown" },
  { id: 2, text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  {
    id: 3,
    text: "Be yourself; everyone else is already taken.",
    author: "Oscar Wilde",
  },
];

export default function ExplorePage() {
  const [quotes] = useState(mockQuotes);

  return (
    <div className="px-4 py-8 max-w-3xl mx-auto space-y-6">
      <ExploreHeader />

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {quotes.map((quote) => (
          <QuoteCard key={quote.id} {...quote} />
        ))}
      </div>
    </div>
  );
}
