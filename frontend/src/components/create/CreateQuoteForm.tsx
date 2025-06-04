import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useAddQuote } from "../../hooks/useAddQuote";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function CreateQuoteForm() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [source, setSource] = useState("");
  const { user } = useUser();
  const addQuote = useAddQuote();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("User not authenticated", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    addQuote.mutate(
      {
        text,
        author,
        source,
        clerkId: user.id,
      },
      {
        onSuccess: () => {
          toast.success(`Quote Created:\n"${text}" - ${author}`, {
            position: "top-center",
            autoClose: 3000,
          });
          setText("");
          setAuthor("");
          setSource("");
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
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
      <ToastContainer />
      <form onSubmit={handleSubmit} className="space-y-6 text-[#0c1446]">
        <label className="block">
          <span className="text-sm font-medium">Quote Text</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="e.g., The only limit is your imagination."
            className="w-full p-2 border rounded"
            style={{ borderColor: "#175873" }}
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Author</span>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="e.g., Albert Einstein"
            className="w-full p-2 border rounded"
            style={{ borderColor: "#175873" }}
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Source (optional)</span>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="e.g., Book or Website"
            className="w-full p-2 border rounded"
            style={{ borderColor: "#175873" }}
          />
        </label>

        <button
          type="submit"
          disabled={addQuote.isPending}
          className="w-full text-white rounded py-2 transition-colors"
          style={{
            backgroundColor: addQuote.isPending ? "#87aca3" : "#2b7c85",
            opacity: addQuote.isPending ? 0.6 : 1,
          }}
          onMouseEnter={(e) => {
            if (!addQuote.isPending)
              e.currentTarget.style.backgroundColor = "#0c1446";
          }}
          onMouseLeave={(e) => {
            if (!addQuote.isPending)
              e.currentTarget.style.backgroundColor = "#2b7c85";
          }}
        >
          {addQuote.isPending ? "Creating..." : "Create Quote"}
        </button>
      </form>
    </>
  );
}

