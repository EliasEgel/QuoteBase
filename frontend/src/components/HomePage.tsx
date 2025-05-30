import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

export default function HomePage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center space-y-6">
      <h1 className="text-3xl sm:text-4xl font-bold">Welcome to QuoteBase!</h1>

      <SignedIn>
        <p className="text-base sm:text-lg">
          Hello, <span className="font-semibold">{user?.username}</span>! Ready
          to explore your favorite quotes?
        </p>

        <div className="flex flex-wrap justify-center items-center gap-2 text-base sm:text-lg">
          <span>Do you want to</span>
          <Link to="/explore" className="btn btn-sm sm:btn-md w-auto">
            Explore
          </Link>
          <span>or see your</span>
          <div className="flex items-center">
            <Link to="/library" className="btn btn-sm sm:btn-md w-auto">
              Library
            </Link>
            <span className="ml-1">?</span>
          </div>
        </div>

        <div className="mt-4 text-base sm:text-lg">
          <p>Or</p>
          <Link to="/create" className="btn  mt-2 w-full sm:w-auto">
            Create
          </Link>
          <p className="mt-1">your own quotes!</p>
        </div>
      </SignedIn>

      <SignedOut>
        <p className="text-base sm:text-lg">
          Please sign in to access your favorite quotes and saved books.
        </p>
        <SignInButton>
          <button className="btn btn-primary mt-4 w-full sm:w-auto">
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
