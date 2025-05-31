import { createFileRoute } from "@tanstack/react-router";
import ExplorePage from "../components/explore/ExplorePage";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export const Route = createFileRoute("/explore")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 text-center">
      <SignedIn>
        <ExplorePage />
      </SignedIn>

      <SignedOut>
        <p className="text-lg mb-4">You must be signed in to view this page.</p>
        <SignInButton>
          <button className="btn btn-primary">Sign In</button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
