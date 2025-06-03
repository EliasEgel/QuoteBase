import { useQuote } from "../../hooks/useQuote";
import { useUser } from "@clerk/clerk-react";
import { useRemoveFavorite } from "../../hooks/useRemoveFavorite";
import { useAddFavorite } from "../../hooks/useAddFavorite";
import AddToBookDropdown from "./AddToBookDropdown";

type QuotePageProp = {
  id: string;
};

export default function QuotePage({ id }: QuotePageProp) {
  const { user } = useUser();
  const { data: quote, isLoading, error } = useQuote(id);
  const { mutate: removeFavorite, isPending: isRemoving } = useRemoveFavorite();
  const { mutate: addFavorite, isPending: isAdding } = useAddFavorite();

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  if (!quote) return <div>No quote found</div>;

  const handleRemoveFavorite = () => {
    if (!user) return;
    removeFavorite({ clerkId: user.id, quoteId: Number(id) });
  };

  const handleAddFavorite = () => {
    if (!user) return;
    addFavorite(Number(id));
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-6 text-[#0c1446] mt-16">
      <div
        className="rounded-lg p-6 shadow-md"
        style={{ backgroundColor: "#87aca3", border: "1px solid #175873" }}
      >
        <blockquote className="text-xl italic leading-relaxed">
          “{quote.text}”
          <footer className="mt-4 text-right text-base font-medium">
            — {quote.author}{" "}
            {quote.source && <span className="italic">({quote.source})</span>}
          </footer>
        </blockquote>
      </div>

      {user && (
        <div className="space-y-4">
          {quote.isFavoritedByUser ? (
            <button
              onClick={handleRemoveFavorite}
              disabled={isRemoving}
              className="w-full sm:w-auto px-4 py-2 rounded text-white transition-colors"
              style={{
                backgroundColor: "#3f6f6d",
                opacity: isRemoving ? 0.6 : 1,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#dc2626")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#3f6f6d")
              }
            >
              {isRemoving ? "Removing..." : "Remove from Favorites"}
            </button>
          ) : (
            <button
              onClick={handleAddFavorite}
              disabled={isAdding}
              className="w-full sm:w-auto px-4 py-2 rounded text-white transition-colors"
              style={{ backgroundColor: "#2b7c85" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#0c1446")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#2b7c85")
              }
            >
              {isAdding ? "Adding..." : "Add to Favorites"}
            </button>
          )}

          <AddToBookDropdown quoteId={Number(id)} />
        </div>
      )}
    </div>
  );
}
