import { Link, useLocation } from "react-router";
import { ChevronRight, Home } from "lucide-react";

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Don't show breadcrumbs on home page
  if (pathnames.length === 0) return null;

  const formatName = (name) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <nav className="max-w-7xl mx-auto px-4 py-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link
            to="/"
            className="flex items-center text-gray-500 hover:text-blue-600 transition"
          >
            <Home size={16} className="mr-1" />
            Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={name} className="flex items-center">
              <ChevronRight size={16} className="text-gray-400 mx-2" />
              {isLast ? (
                <span className="text-gray-700 font-semibold">
                  {formatName(name)}
                </span>
              ) : (
                <Link
                  to={routeTo}
                  className="text-gray-500 hover:text-blue-600 transition"
                >
                  {formatName(name)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
