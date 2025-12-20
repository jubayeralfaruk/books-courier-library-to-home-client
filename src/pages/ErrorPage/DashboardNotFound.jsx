import { Link } from "react-router";

const DashboardNotFound = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="mt-2 text-gray-600">Dashboard page not found</p>

      <Link
        to="/dashboard"
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
      >
        Back to Dashboard
      </Link>
    </div>
  );
};

export default DashboardNotFound;