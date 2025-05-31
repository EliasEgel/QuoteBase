import { createFileRoute } from "@tanstack/react-router";
import ExplorePage from "../components/explore/ExplorePage";

export const Route = createFileRoute("/explore")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 text-center">
        <ExplorePage />
      
    </div>
  );
}
