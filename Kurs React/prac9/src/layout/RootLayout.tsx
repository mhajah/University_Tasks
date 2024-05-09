import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

export default function RootLayout() {
  const location = useLocation();

  return (
    <div>
      <nav className="flex justify-between px-20 py-10 text-xl font-outfit">
        <p>Michał Hajahmadov</p>
        <ul className="flex justify-center gap-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `${isActive ? "underline text-green-600" : ""}`}
              state={{ from: location.pathname }}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => `${isActive ? "underline text-blue-600" : ""}`}
              state={{ from: location.pathname }}
            >
              About Me
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/projects"
              className={({ isActive }) => `${isActive ? "underline text-red-600" : ""}`}
              state={{ from: location.pathname }}
            >
              Projects
            </NavLink>
          </li>

        </ul>
      </nav>
      <main className="h-svh">
        <Outlet />
      </main>


    </div>
  );
}