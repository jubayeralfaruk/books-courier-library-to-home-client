import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { getAuth, signOut } from "firebase/auth";
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
import { FaDollarSign } from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import useRole from "../../hooks/useRole";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [orders, setOrders] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [users, setUsers] = useState(0);

  const { role } = useRole();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigate("/login"))
      .catch((err) => console.error(err));
  };

  // Animated counters
  useEffect(() => {
    let ordersTarget = 120;
    let revenueTarget = 5200;
    let usersTarget = 32;
    let step = 1;
    const interval = setInterval(() => {
      setOrders((prev) => (prev < ordersTarget ? prev + step : prev));
      setRevenue((prev) => (prev < revenueTarget ? prev + 50 : prev));
      setUsers((prev) => (prev < usersTarget ? prev + 1 : prev));
    }, 50);

    return () => clearInterval(interval);
  }, []);

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
        {
          text: "Order Management",
          path: "order-management",
          icon: <FiClipboard />,
        },
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

  // Sample chart data
  const salesData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Sales ($)",
        data: [500, 1200, 900, 1500, 2000, revenue],
        borderColor: "#3b82f6",
        backgroundColor: "#3b82f6",
        tension: 0.4,
      },
    ],
  };

  const ordersData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Orders",
        data: [30, 50, 40, 70, 90, orders],
        backgroundColor: "#10b981",
      },
    ],
  };

  return (
    <div className="flex-1 flex flex-col ">

          {/* Dashboard content */}
          <main className="flex-1 p-4 overflow-auto space-y-6">
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="card bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-gray-500 dark:text-gray-400">
                      Total Orders
                    </h2>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {orders}
                    </p>
                  </div>
                  <FiShoppingCart className="text-3xl text-blue-500" />
                </div>
              </div>
              <div className="card bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-gray-500 dark:text-gray-400">
                      Revenue
                    </h2>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      ${revenue}
                    </p>
                  </div>
                  <FaDollarSign className="text-3xl text-green-500" />
                </div>
              </div>
              <div className="card bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-gray-500 dark:text-gray-400">
                      New Users
                    </h2>
                    <p className="text-2xl font-bold text-gray-800 dark:text-white">
                      {users}
                    </p>
                  </div>
                  <FiUsers className="text-3xl text-purple-500" />
                </div>
              </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="card bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg">
                <h2 className="text-gray-500 dark:text-gray-400 mb-4">
                  Sales Overview
                </h2>
                <Line data={salesData} />
              </div>
              <div className="card bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg">
                <h2 className="text-gray-500 dark:text-gray-400 mb-4">
                  Orders Overview
                </h2>
                <Bar data={ordersData} />
              </div>
            </div>

            {/* Outlet for nested pages */}
            <Outlet />
          </main>
        </div>
  );
}