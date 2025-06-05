import { createFileRoute } from "@tanstack/react-router";
import BookPage from "../../components/book/BookPage";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export const Route = createFileRoute("/book/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <div className="text-center">
      <SignedIn>
        <BookPage id={id} />
      </SignedIn>
      <SignedOut>
        <p className="text-lg mb-4 text-center">
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
