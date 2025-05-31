import { useState } from "react";

export default function CreateQuoteForm() {
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");
  const [source, setSource] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send quote data to backend
    alert(`Quote Created:\n"${text}" - ${author}`);
    setText("");
    setAuthor("");
    setSource("");
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

      <button type="submit" className="btn btn-primary w-full">
        Create Quote
      </button>
    </form>
  );
}
