import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";
import QuoteCard from "./QuoteCard";

export default function LibraryPage() {
  const { user } = useUser();

  // Mock data
  const books = [
    { id: 1, title: "Inspiration", quoteCount: 5 },
    { id: 2, title: "Wisdom", quoteCount: 3 },
    { id: 3, title: "Love", quoteCount: 8 },
  ];

  const favorites = [
    {
      id: 1,
      text: "Be yourself; everyone else is taken.",
      author: "Oscar Wilde",
    },
    { id: 2, text: "So it goes.", author: "Kurt Vonnegut" },
    { id: 3, text: "Stay hungry. Stay foolish.", author: "Steve Jobs" },
  ];

  return (
    <div className="px-4 py-6 max-w-5xl mx-auto space-y-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">Library</h1>

      <SignedIn>
        {/* BOOKS SECTION */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-1 mb-3">Books</h2>
          {books.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {books.map((book) => (
                <Link
                  key={book.id}
                  to={`/books/${book.id}`}
                  className="border rounded-lg p-4 shadow hover:bg-gray-50 transition"
                >
                  <h3 className="font-bold text-gray-600 text-lg">{book.title}</h3>
                  <p className="text-sm text-gray-500">
                    {book.quoteCount} quotes
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              You haven’t created any books yet.
            </p>
          )}
        </section>

        {/* FAVORITE QUOTES SECTION */}
        <section>
          <h2 className="text-xl font-semibold border-b pb-1 mb-3">Quotes</h2>
          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {favorites.map((quote) => (
                <QuoteCard key={quote.id} id={quote.id} text={quote.text} author={quote.author} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              You haven’t favorited any quotes yet.
            </p>
          )}
        </section>
      </SignedIn>

      <SignedOut>
        <div className="text-center space-y-4">
          <p className="text-base">Please sign in to view your library.</p>
          <SignInButton>
            <button className="btn btn-primary w-full sm:w-auto">
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}
