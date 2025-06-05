import { createFileRoute } from "@tanstack/react-router";
import CreatePage from "../components/create/CreatePage";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center">
      <SignedIn>
        <CreatePage />
      </SignedIn>

      <SignedOut>
        <p className="text-lg mb-4 ">
          You must be signed in to view this page.
        </p>
        <SignInButton>
          <button
            className="btn btn-primary"
            style={{ backgroundColor: "#2b7c85" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#0c1446")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#2b7c85")
            }
          >
            Sign In
          </button>
        </SignInButton>
      </SignedOut>
    </div>
  );
}
