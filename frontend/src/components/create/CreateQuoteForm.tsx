import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { useAddQuote } from "../../hooks/useAddQuote"; // adjust path

export default function CreateQuoteForm() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [source, setSource] = useState("");
  const { user } = useUser();
  const addQuote = useAddQuote();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return alert("User not authenticated");

    addQuote.mutate(
      {
        text,
        author,
        source,
        clerkId: user.id,
      },
      {
        onSuccess: () => {
          alert(`Quote Created:\n"${text}" - ${author}`);
          setText("");
          setAuthor("");
          setSource("");
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onError: (error: any) => {
          alert(`Error: ${error.message}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium">Quote Text</span>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g., The only limit is your imagination."
          className="textarea textarea-bordered w-full"
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
          className="input input-bordered w-full"
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium">Source (optional)</span>
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          placeholder="e.g., Book or Website"
          className="input input-bordered w-full"
        />
      </label>

      <button type="submit" className="btn btn-primary w-full" disabled={addQuote.isPending}>
        {addQuote.isPending ? "Creating..." : "Create Quote"}
      </button>
    </form>
  );
}
