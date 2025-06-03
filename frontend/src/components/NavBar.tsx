import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { Link } from "@tanstack/react-router";

export default function NavBar() {
  return (
    <div
      className="navbar sticky top-0 z-50 shadow-md px-4"
      style={{ backgroundColor: "#175873" }}
    >
      <div className="flex-1 text-xl font-bold">
        <Link
          to="/"
          className="btn btn-ghost text-xl text-white hover:bg-[#0c1446] transition-colors duration-200"
        >
          <span className="lg:hidden">QB</span>
          <span className="hidden lg:inline">QuoteBase</span>
        </Link>
      </div>

      <div className="flex-none lg:hidden">
        <SignedOut>
          <SignInButton>
            <button
              className="btn text-white"
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
        <SignedIn>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost text-white">
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
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-lg"
              style={{ backgroundColor: "#2b7c85" }}
            >
              <li>
                <Link
                  to="/explore"
                  className="btn text-white hover:bg-[#87aca3]"
                  style={{ backgroundColor: "#2b7c85" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0c1446")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2b7c85")
                  }
                >
                  Explore
                </Link>
              </li>
              <li>
                <Link
                  to="/create"
                  className="btn text-white hover:bg-[#87aca3]"
                  style={{ backgroundColor: "#2b7c85" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0c1446")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2b7c85")
                  }
                >
                  Create
                </Link>
              </li>
              <li>
                <Link
                  to="/library"
                  className="btn text-white hover:bg-[#87aca3]"
                  style={{ backgroundColor: "#2b7c85" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0c1446")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#2b7c85")
                  }
                >
                  Library
                </Link>
              </li>
              <li>
                <UserButton />
              </li>
            </ul>
          </div>
        </SignedIn>
      </div>

      <div className="hidden lg:flex">
        <SignedOut>
          <SignInButton>
            <button
              className="btn text-white"
              style={{ backgroundColor: "#2b7c85" }}
            >
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link
                to="/explore"
                className="btn text-white hover:bg-[#87aca3]"
                style={{ backgroundColor: "#2b7c85" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0c1446")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2b7c85")
                }
              >
                Explore
              </Link>
            </li>
            <li>
              <Link
                to="/create"
                className="btn text-white hover:bg-[#87aca3]"
                style={{ backgroundColor: "#2b7c85" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0c1446")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2b7c85")
                }
              >
                Create
              </Link>
            </li>
            <li>
              <Link
                to="/library"
                className="btn text-white hover:bg-[#87aca3]"
                style={{ backgroundColor: "#2b7c85" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0c1446")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#2b7c85")
                }
              >
                Library
              </Link>
            </li>
            <li>
              <UserButton />
            </li>
          </ul>
        </SignedIn>
      </div>
    </div>
  );
}
