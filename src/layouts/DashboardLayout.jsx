import { useState, useEffect, useRef } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";
import useRole from "../hooks/useRole";
import useTheme from "../hooks/useTheme";
import { Moon, Sun } from "lucide-react";
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
  const sidebarRef = useRef();

  const { role } = useRole();
  const { theme, toggleTheme } = useTheme();
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
    <div className="flex h-screen bg-theme-primary transition-colors">
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 w-64 bg-surface border-r border-theme transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:static md:inset-0 z-30`}>
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-center h-16 text-2xl font-bold border-b border-theme text-theme-primary">
              <Link to="/" className="text-2xl font-bold">
                Books<span className="p-0" style={{ color: 'var(--color-primary)' }}>Courier</span>
              </Link>
            </div>
            <ul className="p-4 space-y-2">
              {menuItems().map((item) => (
                <li key={item.text}>
                  <Link
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-theme-secondary transition-colors text-theme-primary">
                    {item.icon}
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom section */}
          <div className="p-4 border-t border-theme">
            <Link
              to="/myProfile"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-theme-secondary mb-2 transition-colors text-theme-primary">
              <FiUser />
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-2 rounded-lg w-full hover:bg-theme-secondary mb-2 transition-colors text-left text-theme-primary">
              <FiLogOut />
              Logout
            </button>
            <button
              onClick={toggleTheme}
              className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-theme-secondary transition-colors text-theme-primary">
              <span className="flex items-center gap-3">
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                Theme
              </span>
              <span className="text-sm text-theme-muted">
                {theme === "dark" ? "Light" : "Dark"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar */}
        <div className="flex items-center justify-between bg-surface border-b border-theme h-16 px-4 transition-colors">
          <button
            className="md:hidden text-2xl text-theme-primary"
            onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </button>
          <h1 className="text-xl font-bold text-theme-primary">Dashboard</h1>
          
          {/* Theme toggle for mobile/tablet */}
          <button
            onClick={toggleTheme}
            className="md:hidden p-2 rounded-lg hover:bg-theme-secondary transition-colors text-theme-primary"
            aria-label="Toggle theme">
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Dashboard content */}
        <main className="flex-1 p-4 overflow-auto space-y-6 bg-theme-secondary transition-colors">
          <Outlet />
        </main>
      </div>
    </div>
  );
}