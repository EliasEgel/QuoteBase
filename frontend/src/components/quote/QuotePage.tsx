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
    <div className="max-w-xl mx-auto px-4 py-8 space-y-4">
      <blockquote className="text-xl italic">
        “{quote.text}”
        <footer className="mt-4 text-right">
          — {quote.author} {quote.source && <span>({quote.source})</span>}
        </footer>
      </blockquote>

      {user && (
        <div className="space-y-2">
          {quote.isFavoritedByUser ? (
            <button
              className="btn btn-outline btn-error"
              onClick={handleRemoveFavorite}
              disabled={isRemoving}
            >
              {isRemoving ? "Removing..." : "Remove from Favorites"}
            </button>
          ) : (
            <button
              className="btn btn-outline btn-primary"
              onClick={handleAddFavorite}
              disabled={isAdding}
            >
              {isAdding ? "Adding..." : "Add to Favorites"}
            </button>
          )}

          {/* Add To Book */}
          {user && <AddToBookDropdown quoteId={Number(id)} />}
        </div>
      )}
    </div>
  );
}

