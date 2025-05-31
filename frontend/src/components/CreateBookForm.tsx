import { useState } from "react";

export default function CreateBookForm() {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send book data to backend
    alert(`Book Created: ${title}`);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label className="block">
        <span className="text-sm font-medium">Book Title</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., My Favorite Quotes"
          className="input input-bordered w-full"
          required
        />
      </label>

      <button type="submit" className="btn btn-primary w-full">
        Create Book
      </button>
    </form>
  );
}