import { useState, useEffect, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import useRole from "../hooks/useRole";
import {
  FiMenu,
  FiLogOut,
  FiUser,
  FiHome,
  FiShoppingCart,
  FiBook,
  FiClipboard,
  FiUsers,
  FiPlus,
  FiList,
} from "react-icons/fi";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const sidebarRef = useRef();

  const { role } = useRole();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((err) => console.error(err));
  };

  const menuItems = () => {
    if (role === "admin") {
      return [
        { text: "Dashboard", path: "/dashboard", icon: <FiHome /> },
        { text: "Approve Seller", path: "approve-seller", icon: <FiUsers /> },
        { text: "Manage Users", path: "users-management", icon: <FiUsers /> },
        { text: "Manage Books", path: "manage-books", icon: <FiBook /> },
      ];
    }
    if (role === "seller") {
      return [
        { text: "Dashboard", path: "/dashboard", icon: <FiHome /> },
        { text: "Add Book", path: "add-book", icon: <FiPlus /> },
        { text: "My Books", path: "my-books", icon: <FiBook /> },
        { text: "Order Management", path: "order-management", icon: <FiClipboard /> },
        { text: "My Orders", path: "my-orders", icon: <FiShoppingCart /> },
        { text: "Payment History", path: "order-history", icon: <FiList /> },
      ];
    }
    return [
      { text: "Dashboard", path: "/dashboard", icon: <FiHome /> },
      { text: "My Orders", path: "my-orders", icon: <FiShoppingCart /> },
      { text: "Payment History", path: "order-history", icon: <FiList /> },
    ];
  };

  // Close sidebar on click outside (mobile)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform md:translate-x-0 md:static md:inset-0 z-30`}>
          <div className="flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center justify-center h-16 text-2xl font-bold border-b border-gray-200 dark:border-gray-700">
                <Link to="/" className="text-2xl font-bold">
                  Books<span className="p-0 text-primary">Courier</span>
                </Link>
              </div>
              <ul className="p-4 space-y-2">
                {menuItems().map((item) => (
                  <li key={item.text}>
                    <Link
                      to={item.path}
                      onClick={() => setSidebarOpen(false)} // close on mobile
                      className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                      {item.icon}
                      {item.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Bottom section */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <Link
                to="/myProfile"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 mb-2">
                <FiUser />
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2 rounded-lg w-full hover:bg-gray-200 dark:hover:bg-gray-700 mb-2">
                <FiLogOut />
                Logout
              </button>
              <div className="flex items-center justify-between px-4 py-2">
                <span>Dark Mode</span>
                <input
                  type="checkbox"
                  className="toggle toggle-sm"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          {/* Top navbar */}
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 px-4">
            <button
              className="md:hidden text-2xl"
              onClick={() => setSidebarOpen(!sidebarOpen)}>
              <FiMenu />
            </button>
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>

          {/* Dashboard content */}
          <main className="flex-1 p-4 overflow-auto space-y-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}