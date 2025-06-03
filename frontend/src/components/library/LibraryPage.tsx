import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";
import UserBooksSection from "./UserBooksSection";
import UserFavoritesSection from "./UserFavoritesSection";
import UserCreatedQuotesSection from "./UserCreatedQuotesSection";

export default function LibraryPage() {
  return (
    <div className="px-4 py-12 max-w-5xl mx-auto space-y-8 text-[#0c1446] mt-16">
      <h1 className="text-2xl sm:text-3xl font-bold text-center">Library</h1>

      <SignedIn>
        {/* BOOKS SECTION */}
        <UserBooksSection />

        {/* FAVORITE QUOTES SECTION */}
        <UserFavoritesSection />

        {/* CREATED QUOTES SECTION */}
        <UserCreatedQuotesSection />
      </SignedIn>

      <SignedOut>
        <div className="text-center space-y-4">
          <p className="text-base">Please sign in to view your library.</p>
          <SignInButton>
            <button
              className="w-full sm:w-auto text-white rounded px-4 py-2 transition-colors"
              style={{ backgroundColor: "#2b7c85" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#87aca3")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#2b7c85")
              }
            >
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>
    </div>
  );
}
