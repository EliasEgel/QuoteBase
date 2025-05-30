import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

export default function NavBar() {
  return (
    <div className="navbar sticky top-0 z-50 shadow-md px-4">
      <div className="flex-1 text-xl font-bold">
        <Link to="/" className="btn btn-ghost text-xl">
          <span className="lg:hidden">QB</span>
          <span className="hidden lg:inline">QuoteBase</span>
        </Link>
      </div>

      <div className="flex-none lg:hidden">
        <SignedOut>
          <SignInButton>
            <button className="btn">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow"
            >
              <li className="rounded-lg">
                <button className="btn">
                  <Link to="/explore">Explore</Link>
                </button>
              </li>
              <li>
                <button className="btn">
                  <Link to="/create">Create</Link>
                </button>
              </li>
              <li>
                <button className="btn">
                  <Link to="/library">Library</Link>
                </button>
              </li>
              <li>
                <UserButton>
                  <button className="btn">Sign Out</button>
                </UserButton>
              </li>
            </ul>
          </div>
        </SignedIn>
      </div>

      <div className="hidden lg:flex">
        <SignedOut>
          <SignInButton>
            <button className="btn">Sign In</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <ul className="menu menu-horizontal px-1">
            <li className="rounded-lg">
              <button className="btn">
                <Link to="/explore">Explore</Link>
              </button>
            </li>
            <li className="rounded-lg">
              <button className="btn">
                <Link to="/create">Create</Link>
              </button>
            </li>
            <li className="rounded-lg">
              <button className="btn">
                <Link to="/library">Library</Link>
              </button>
            </li>
            <li className="rounded-lg">
              <UserButton>
                <button className="btn">Sign Out</button>
              </UserButton>
            </li>
          </ul>
        </SignedIn>
      </div>
    </div>
  );
}
