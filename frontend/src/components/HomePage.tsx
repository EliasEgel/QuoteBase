import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";

export default function HomePage() {
  const { user } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to QuoteBase!</h1>
      
      <SignedIn>
        <p className="text-lg">
          Hello, <span className="font-semibold">{user?.username}</span>! Ready to explore your favorite quotes?
        </p>
      </SignedIn>

      <SignedOut>
        <p className="text-lg mb-4">Please sign in to access your favorite Qoutes and saved Books</p>
        <SignInButton>
          <button className="btn">Sign In</button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
