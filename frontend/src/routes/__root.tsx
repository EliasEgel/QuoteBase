import { Outlet, createRootRoute } from "@tanstack/react-router";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ backgroundColor: "#87aca3" }}
    >
      <NavBar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        closeOnClick
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
      />
    </div>
  );
}

