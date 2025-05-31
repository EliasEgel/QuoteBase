import { createFileRoute } from "@tanstack/react-router";
import ExplorePage from "../components/ExplorePage";

export const Route = createFileRoute("/explore")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <ExplorePage />
    </div>
  );
}
