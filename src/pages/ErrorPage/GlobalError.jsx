import { useRouteError, Link } from "react-router";

const GlobalError = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-bold text-red-600">Something went wrong</h1>

      <p className="mt-4 text-gray-600">
        {error?.statusText || error?.message || "Unexpected error occurred"}
      </p>

      <Link
        to="/"
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded"
      >
        Go Home
      </Link>
    </div>
  );
};

export default GlobalError;