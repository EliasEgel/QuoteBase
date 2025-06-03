import { createFileRoute } from "@tanstack/react-router";
import CreatePage from "../components/create/CreatePage";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div >
      <SignedIn>
        <CreatePage />
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
