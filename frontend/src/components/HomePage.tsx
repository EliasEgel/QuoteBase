import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

export default function HomePage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to QuoteBase!</h1>

      <SignedIn>
        <p className="text-lg">
          Hello, <span className="font-semibold">{user?.username}</span>! Ready
          to explore your favorite quotes?
        </p>
        <p className="text-lg">
          Do you want to{" "}
          <button className="btn">
            <Link to="/explore">Explore</Link>
          </button>{" "}
          or see your{" "}
          <button className="btn">
            <Link to="/library">Library</Link>
          </button>
          ?
        </p>
        <p className="text-lg">
          Or{" "}
          <button className="btn">
            <Link to="/create">Create</Link>
          </button>{" "}
          your own quotes!
        </p>
      </SignedIn>

      <SignedOut>
        <p className="text-lg mb-4">
          Please sign in to access your favorite Qoutes and saved Books
        </p>
        <SignInButton>
          <button className="btn">Sign In</button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
