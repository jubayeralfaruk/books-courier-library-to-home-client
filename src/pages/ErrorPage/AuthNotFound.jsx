import { Link } from "react-router";

const AuthNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-red-500">404</h1>
      <p className="mt-2">Auth page not found</p>

      <Link
        to="/login"
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default AuthNotFound;