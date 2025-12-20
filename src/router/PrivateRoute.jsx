import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl animate-pulse space-y-4">
            <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-6 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded mt-4"></div>
          </div>
        </div>
      </>
    );
  }

  if (!user) {
    return <Navigate to={"/login"} state={{ from: location }} replace ></Navigate>;
  }
  return children;
};

export default PrivateRoute;
