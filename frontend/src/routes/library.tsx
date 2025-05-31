import { createFileRoute } from "@tanstack/react-router";
import LibraryPage from "../components/library/LibraryPage";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export const Route = createFileRoute("/library")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 text-center">
      <SignedIn>
        <LibraryPage />
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
