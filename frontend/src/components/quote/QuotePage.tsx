import { useQuote } from "../../hooks/useQuote";
import { useUser } from "@clerk/clerk-react";
import { useRemoveFavorite } from "../../hooks/useRemoveFavorite";
import { useAddFavorite } from "../../hooks/useAddFavorite";
import { useDeleteQuote } from "../../hooks/useDeleteQuote";
import AddToBookDropdown from "./AddToBookDropdown";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";

type QuotePageProp = {
  id: string;
};

export default function QuotePage({ id }: QuotePageProp) {
  const { user } = useUser();
  const navigate = useNavigate();
  const { data: quote, isLoading, error } = useQuote(id);
  const { mutate: removeFavorite, isPending: isRemoving } = useRemoveFavorite();
  const { mutate: addFavorite, isPending: isAdding } = useAddFavorite();
  const { mutate: deleteQuote, isPending: isDeleting } = useDeleteQuote();

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;
  if (!quote) return <div>No quote found</div>;

  const handleRemoveFavorite = () => {
    if (!user) return;
    removeFavorite(
      { clerkId: user.id, quoteId: Number(id) },
      {
        onSuccess: () => {
          toast.info("Quote removed from favorites.", {
            position: "top-center",
            autoClose: 3000,
          });
        },
        onError: (error: Error) => {
          toast.error(`Error: ${error.message}`, {
            position: "top-center",
            autoClose: 3000,
          });
        },
      }
    );
  };

  const handleAddFavorite = () => {
    if (!user) return;
    addFavorite(Number(id), {
      onSuccess: () => {
        toast.success("Quote added to favorites!", {
          position: "top-center",
          autoClose: 3000,
        });
      },
      onError: (error: Error) => {
        toast.error(`Error: ${error.message}`, {
          position: "top-center",
          autoClose: 3000,
        });
      },
    });
  };

  const handleDeleteQuote = () => {
    if (!user) return;
    if (window.confirm("Are you sure you want to delete this quote?")) {
      deleteQuote(Number(id), {
        onSuccess: () => {
          toast.success("Quote deleted.", {
            position: "top-center",
            autoClose: 3000,
          });
          navigate({ to: "/library" });
        },
        onError: (error: Error) => {
          toast.error(`Error: ${error.message}`, {
            position: "top-center",
            autoClose: 3000,
          });
        },
      });
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-12 space-y-6 text-[#0c1446] mt-16">
      <div
        className="rounded-lg p-6 shadow-md relative"
        style={{ backgroundColor: "#87aca3", border: "1px solid #175873" }}
      >
        {quote.isCreatedByUser && (
          <div
            className="absolute top-2 right-2 text-yellow-400"
            title="You created this quote"
          >
            ⭐
          </div>
        )}
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

          {quote.isCreatedByUser && (
            <button
              onClick={handleDeleteQuote}
              disabled={isDeleting}
              className="w-full sm:w-auto px-4 py-2 rounded text-white transition-colors bg-red-600 hover:bg-red-700"
            >
              {isDeleting ? "Deleting..." : "Delete Quote"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
