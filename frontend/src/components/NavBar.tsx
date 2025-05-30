export default function NavBar() {
  return (
    <div className="navbar sticky top-0 z-50 shadow-md px-4">
      <div className="flex-1 text-xl font-bold">
        <span className="lg:hidden">QB</span>
        <span className="hidden lg:inline">QuoteBase</span>
      </div>
      <div className="flex-none lg:hidden">
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
            <li>
              <a>Favorites</a>
            </li>
            <li>
              <a> About</a>
            </li>
            <li>
              <a href="https://github.com/EliasEgel/react-mvp">Github</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li className="rounded-lg">
            <a href="https://github.com/EliasEgel/react-mvp">Github</a>
          </li>
          <li className="rounded-lg">
            <a href="https://github.com/EliasEgel/react-mvp">Github</a>
          </li>
          <li className="rounded-lg">
            <a href="https://github.com/EliasEgel/react-mvp">Github</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
