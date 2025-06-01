import { useUser } from '@clerk/clerk-react';
import { useAddBook } from '../../hooks/useAddBook'; // adjust path if needed
import { useState } from 'react';

export default function CreateBookForm() {
  const [title, setTitle] = useState('');
  const { user } = useUser();
  const addBookMutation = useAddBook();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const clerkId = user.id;
    addBookMutation.mutate(
      { title, clerkId },
      {
        onSuccess: () => {
          alert(`Book Created: ${title}`);
          setTitle('');
        },
        onError: (error: Error) => {
          alert(`Error: ${error.message}`);
        },
      }
    );
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

      <button type="submit" className="btn btn-primary w-full" disabled={addBookMutation.isPending}>
        {addBookMutation.isPending ? 'Creating...' : 'Create Book'}
      </button>
    </form>
  );
}
