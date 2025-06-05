import { createFileRoute } from "@tanstack/react-router";
import BookPage from "../../components/book/BookPage";
import { SignedIn, SignedOut, SignInButton } from "@clerk/clerk-react";

export const Route = createFileRoute("/book/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  return (
    <div>
      <SignedIn>
        <BookPage id={id} />
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
