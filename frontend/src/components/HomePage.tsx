import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

export default function HomePage() {
  const { user } = useUser();

  return (
    <div
      className="flex flex-col items-center justify-start min-h-screen px-4 pt-20 text-center space-y-6"
      style={{ backgroundColor: '#87aca3' }}
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-[#0c1446]">
        Welcome to QuoteBase!
      </h1>

      <SignedIn>
        <p className="text-base sm:text-lg text-[#0c1446]">
          Hello, <span className="font-semibold">{user?.username}</span>! Ready
          to explore your favorite quotes?
        </p>

        <div className="flex flex-wrap justify-center items-center gap-2 text-base sm:text-lg text-[#0c1446]">
          <span>Do you want to</span>
          <Link
            to="/explore"
            className="btn btn-sm sm:btn-md w-auto text-white"
            style={{ backgroundColor: '#2b7c85' }}
          >
            Explore
          </Link>
          <span>or see your</span>
          <div className="flex items-center">
            <Link
              to="/library"
              className="btn btn-sm sm:btn-md w-auto text-white"
              style={{ backgroundColor: '#2b7c85' }}
            >
              Library
            </Link>
            <span className="ml-1">?</span>
          </div>
        </div>

        <div className="mt-4 text-base sm:text-lg text-[#0c1446]">
          <p>Or</p>
          <Link
            to="/create"
            className="btn mt-2 w-full sm:w-auto text-white"
            style={{ backgroundColor: '#2b7c85' }}
          >
            Create
          </Link>
          <p className="mt-1">your own quotes!</p>
        </div>
      </SignedIn>

      <SignedOut>
        <p className="text-base sm:text-lg text-[#0c1446]">
          Please sign in to access your favorite quotes and saved books.
        </p>
        <SignInButton>
          <button
            className="btn mt-4 w-full sm:w-auto text-white"
            style={{ backgroundColor: '#2b7c85' }}
          >
            Sign In
          </button>
        </SignInButton>
        <p className="text-base sm:text-lg text-[#0c1446]">
          You can still{" "}
          <Link
            to="/explore"
            className="btn btn-sm sm:btn-md w-auto text-white"
            style={{ backgroundColor: '#2b7c85' }}
          >
            Explore
          </Link>{" "}
          other peoples Quotes!
        </p>
      </SignedOut>
    </div>
  );
}

