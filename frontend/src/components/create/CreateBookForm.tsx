import { useUser } from "@clerk/clerk-react";
import { useAddBook } from "../../hooks/useAddBook";
import { useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CreateBookForm() {
  const [title, setTitle] = useState("");
  const { user } = useUser();
  const addBookMutation = useAddBook();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("User not authenticated", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    const clerkId = user.id;
    addBookMutation.mutate(
      { title, clerkId },
      {
        onSuccess: () => {
          toast.success(`Book Created: ${title}`, {
            position: "top-center",
            autoClose: 3000,
          });
          setTitle("");
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

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 text-[#0c1446]">
        <label className="block">
          <span className="text-sm font-medium">Book Title</span>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., My Favorite Quotes"
            className="w-full p-2 border rounded"
            style={{ borderColor: "#175873" }}
            required
          />
        </label>

        <button
          type="submit"
          disabled={addBookMutation.isPending}
          className="w-full text-white rounded py-2 transition-colors"
          style={{
            backgroundColor: addBookMutation.isPending ? "#87aca3" : "#2b7c85",
            opacity: addBookMutation.isPending ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!addBookMutation.isPending)
              e.currentTarget.style.backgroundColor = "#0c1446";
          }}
          onMouseLeave={(e) => {
            if (!addBookMutation.isPending)
              e.currentTarget.style.backgroundColor = "#2b7c85";
          }}
        >
          {addBookMutation.isPending ? "Creating..." : "Create Book"}
        </button>
      </form>
    </>
  );
}
