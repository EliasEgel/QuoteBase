import { Outlet, createRootRoute } from "@tanstack/react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div style={{ backgroundColor: "#87aca3", minHeight: "100vh" }}>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}
