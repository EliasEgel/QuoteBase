import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import QuoteCard from "../QuoteCard";
import UserBooksSection from "./UserBooksSection";
import UserFavoritesSection from "./UserFavoritesSection";

export default function LibraryPage() {


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
        <UserBooksSection />

        {/* FAVORITE QUOTES SECTION */}
        <UserFavoritesSection />
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
