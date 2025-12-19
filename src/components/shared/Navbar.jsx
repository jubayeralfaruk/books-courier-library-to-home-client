import React, { use } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import useRole from "../../hooks/useRole";
import { BookOpen } from "lucide-react";

const Navbar = () => {
  const { user, signOutUser } = use(AuthContext);
  const location = useLocation();
  const { role } = useRole();

  const { displayName, photoURL } = user || {};

  const handleSingOut = () => {
    signOutUser()
      .then(() => {
        toast.success("LogOut Successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const links = (
    <>
      <li className="nav-btn">
        <NavLink to="/">Home</NavLink>
      </li>

      <li className="nav-btn">
        <NavLink to="/books">Books</NavLink>
      </li>

      {user && (
        <>
          <li className="nav-btn">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          {role === "user" && (
            <li className="nav-btn">
              <NavLink to="create-seller-account">Apply as Seller</NavLink>
            </li>
          )}
        </>
      )}
      <li className="nav-btn">
        <NavLink to="/coverage">Coverage</NavLink>
      </li>
      <li className="nav-btn">
        <NavLink to="/about">About Us</NavLink>
      </li>
      <li className="nav-btn">
        <NavLink to="/contact">Contact</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-gray-900 shadow-sm sticky top-0 z-50 opacity-95">
      <div className="navbar-start">
        {/* Mobile dropdown */}
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>

        <Link
          to="/"
          className="text-2xl font-bold flex items-center justify-center">
          <BookOpen className="mr-1 mt-1.5" /> Books<span className="p-0 text-primary">Courier</span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      <div className="navbar-end gap-3">
        {user ? (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    photoURL
                      ? photoURL
                      : "https://i.ibb.co/V0bqcmvx/41-410093-circled-user-icon-user-profile-icon-png.jpg"
                  }
                  alt={`user ${displayName} profile photo`}
                />
              </div>
            </div>

            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <Link to="/myProfile">Profile</Link>
              </li>
              <li>
                <a onClick={handleSingOut}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link
              to="/login"
              className="btn secondary-btn gradient-border font-semibold">
              Login
            </Link>

            {/* <Link
              to="/register"
              className="btn primary-btn">
              Register
            </Link> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
