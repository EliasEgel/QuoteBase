import { createFileRoute } from "@tanstack/react-router";
import ExplorePage from "../components/explore/ExplorePage";

export const Route = createFileRoute("/explore")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="text-center">
        <ExplorePage />
      
    </div>
  );
}
