import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import {
  FiShoppingCart,
  FiBook,
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiPackage,
  FiStar,
  FiEye,
  FiActivity,
} from "react-icons/fi";
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../hooks/useRole";
import useTheme from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";
import UseAxiosSecure from "../../hooks/useAxiosSecure";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const { role } = useRole();
  const { theme } = useTheme();
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();

  // Animated counters state
  const [animatedStats, setAnimatedStats] = useState({
    orders: 0,
    revenue: 0,
    books: 0,
    users: 0,
    wishlist: 0,
    reviews: 0,
    views: 0,
  });

  // Mock data generator for development (since backend endpoints don't exist yet)
  const generateMockData = (role) => {
    const baseData = {
      orders: { 
        total: Math.floor(Math.random() * 100) + 50, 
        change: Math.floor(Math.random() * 20) - 10,
        monthlyData: [30, 45, 60, 80, 95, 120],
        categoryData: [15, 25, 20, 18, 22]
      },
      revenue: { 
        total: Math.floor(Math.random() * 5000) + 2000, 
        change: Math.floor(Math.random() * 30) - 15,
        monthlyData: [500, 800, 1200, 1800, 2200, 2800]
      },
      books: { 
        total: Math.floor(Math.random() * 50) + 20, 
        change: Math.floor(Math.random() * 15) - 5,
        monthlyData: [10, 15, 20, 25, 30, 35],
        published: 25,
        draft: 8,
        outOfStock: 5
      },
      recentActivity: [
        { description: "New order received", time: "2 minutes ago" },
        { description: "Book added to inventory", time: "15 minutes ago" },
        { description: "Customer review submitted", time: "1 hour ago" },
        { description: "Payment processed", time: "2 hours ago" },
        { description: "New user registered", time: "3 hours ago" }
      ]
    };

    if (role === "admin") {
      return {
        ...baseData,
        users: { 
          total: Math.floor(Math.random() * 500) + 200, 
          change: Math.floor(Math.random() * 25) - 10,
          monthlyData: [5, 8, 12, 15, 20, 25]
        }
      };
    } else if (role === "seller") {
      return {
        ...baseData,
        reviews: { 
          total: Math.floor(Math.random() * 100) + 30,
          avgRating: Math.random() * 2 + 3, // 3.0 - 5.0 as number
          change: Math.floor(Math.random() * 10) - 3
        }
      };
    } else {
      return {
        ...baseData,
        wishlist: { 
          total: Math.floor(Math.random() * 20) + 5, 
          change: Math.floor(Math.random() * 8) - 2
        },
        reviews: { 
          total: Math.floor(Math.random() * 15) + 3, 
          change: Math.floor(Math.random() * 5) - 1
        },
        views: { 
          total: Math.floor(Math.random() * 200) + 50, 
          change: Math.floor(Math.random() * 20) - 5
        }
      };
    }
  };

  // Fetch role-specific dashboard data with fallback to mock data
  const { data: dashboardData, isLoading } = useQuery({
    queryKey: ["dashboardData", role, user?.email],
    queryFn: async () => {
      try {
        // Try to fetch real data from backend
        if (role === "admin") {
          const [ordersRes, usersRes, booksRes, revenueRes] = await Promise.all([
            axiosSecure.get("/admin/orders-stats"),
            axiosSecure.get("/admin/users-stats"),
            axiosSecure.get("/admin/books-stats"),
            axiosSecure.get("/admin/revenue-stats"),
          ]);
          return {
            orders: ordersRes.data,
            users: usersRes.data,
            books: booksRes.data,
            revenue: revenueRes.data,
          };
        } else if (role === "seller") {
          const [ordersRes, booksRes, revenueRes, reviewsRes] = await Promise.all([
            axiosSecure.get(`/seller/orders-stats?email=${user?.email}`),
            axiosSecure.get(`/seller/books-stats?email=${user?.email}`),
            axiosSecure.get(`/seller/revenue-stats?email=${user?.email}`),
            axiosSecure.get(`/seller/reviews-stats?email=${user?.email}`),
          ]);
          return {
            orders: ordersRes.data,
            books: booksRes.data,
            revenue: revenueRes.data,
            reviews: reviewsRes.data,
          };
        } else {
          // User role
          const [ordersRes, wishlistRes, reviewsRes, viewsRes] = await Promise.all([
            axiosSecure.get(`/user/orders-stats?email=${user?.email}`),
            axiosSecure.get(`/user/wishlist-stats?email=${user?.email}`),
            axiosSecure.get(`/user/reviews-stats?email=${user?.email}`),
            axiosSecure.get(`/user/views-stats?email=${user?.email}`),
          ]);
          return {
            orders: ordersRes.data,
            wishlist: wishlistRes.data,
            reviews: reviewsRes.data,
            views: viewsRes.data,
          };
        }
      } catch (error) {
        console.log("Backend endpoints not available, using mock data:", error.message);
        // Fallback to mock data for development
        return generateMockData(role);
      }
    },
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
    enabled: !!role && !!user?.email,
  });

  // Animate counters when data loads
  useEffect(() => {
    if (dashboardData && !isLoading) {
      const targets = {
        orders: dashboardData.orders?.total || 0,
        revenue: dashboardData.revenue?.total || 0,
        books: dashboardData.books?.total || 0,
        users: dashboardData.users?.total || 0,
        wishlist: dashboardData.wishlist?.total || 0,
        reviews: dashboardData.reviews?.total || 0,
        views: dashboardData.views?.total || 0,
      };

      const duration = 2000; // 2 seconds
      const steps = 60;
      const stepTime = duration / steps;

      let currentStep = 0;
      const interval = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setAnimatedStats({
          orders: Math.floor(targets.orders * progress),
          revenue: Math.floor(targets.revenue * progress),
          books: Math.floor(targets.books * progress),
          users: Math.floor(targets.users * progress),
          wishlist: Math.floor(targets.wishlist * progress),
          reviews: Math.floor(targets.reviews * progress),
          views: Math.floor(targets.views * progress),
        });

        if (currentStep >= steps) {
          clearInterval(interval);
          setAnimatedStats(targets);
        }
      }, stepTime);

      return () => clearInterval(interval);
    }
  }, [dashboardData, isLoading]);

  // Chart options with theme support
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
          font: { size: 12 }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: theme === 'dark' ? '#cbd5e1' : '#475569',
          font: { size: 11 }
        },
        grid: {
          color: theme === 'dark' ? '#334155' : '#e2e8f0'
        }
      },
      y: {
        ticks: {
          color: theme === 'dark' ? '#cbd5e1' : '#475569',
          font: { size: 11 }
        },
        grid: {
          color: theme === 'dark' ? '#334155' : '#e2e8f0'
        }
      }
    }
  };

  // Role-specific stats cards
  const getStatsCards = () => {
    if (role === "admin") {
      return [
        {
          title: "Total Orders",
          value: animatedStats.orders,
          icon: <FiShoppingCart className="text-3xl" />,
          color: "var(--color-primary)",
          change: dashboardData?.orders?.change || 0,
        },
        {
          title: "Total Users",
          value: animatedStats.users,
          icon: <FiUsers className="text-3xl" />,
          color: "var(--color-secondary)",
          change: dashboardData?.users?.change || 0,
        },
        {
          title: "Total Books",
          value: animatedStats.books,
          icon: <FiBook className="text-3xl" />,
          color: "var(--color-accent)",
          change: dashboardData?.books?.change || 0,
        },
        {
          title: "Total Revenue",
          value: `$${animatedStats.revenue.toLocaleString()}`,
          icon: <FiDollarSign className="text-3xl" />,
          color: "var(--color-success)",
          change: dashboardData?.revenue?.change || 0,
        },
      ];
    } else if (role === "seller") {
      return [
        {
          title: "My Orders",
          value: animatedStats.orders,
          icon: <FiShoppingCart className="text-3xl" />,
          color: "var(--color-primary)",
          change: dashboardData?.orders?.change || 0,
        },
        {
          title: "My Books",
          value: animatedStats.books,
          icon: <FiBook className="text-3xl" />,
          color: "var(--color-secondary)",
          change: dashboardData?.books?.change || 0,
        },
        {
          title: "My Revenue",
          value: `$${animatedStats.revenue.toLocaleString()}`,
          icon: <FiDollarSign className="text-3xl" />,
          color: "var(--color-success)",
          change: dashboardData?.revenue?.change || 0,
        },
        {
          title: "Avg Rating",
          value: dashboardData?.reviews?.avgRating ? 
            (typeof dashboardData.reviews.avgRating === 'number' ? 
              dashboardData.reviews.avgRating.toFixed(1) : 
              dashboardData.reviews.avgRating) : 
            "0.0",
          icon: <FiStar className="text-3xl" />,
          color: "var(--color-warning)",
          change: dashboardData?.reviews?.change || 0,
        },
      ];
    } else {
      return [
        {
          title: "My Orders",
          value: animatedStats.orders,
          icon: <FiShoppingCart className="text-3xl" />,
          color: "var(--color-primary)",
          change: dashboardData?.orders?.change || 0,
        },
        {
          title: "Wishlist Items",
          value: animatedStats.wishlist,
          icon: <FiPackage className="text-3xl" />,
          color: "var(--color-secondary)",
          change: dashboardData?.wishlist?.change || 0,
        },
        {
          title: "Reviews Given",
          value: animatedStats.reviews,
          icon: <FiStar className="text-3xl" />,
          color: "var(--color-accent)",
          change: dashboardData?.reviews?.change || 0,
        },
        {
          title: "Books Viewed",
          value: animatedStats.views,
          icon: <FiEye className="text-3xl" />,
          color: "var(--color-info)",
          change: dashboardData?.views?.change || 0,
        },
      ];
    }
  };

  // Role-specific charts
  const getChartData = () => {
    if (!dashboardData) return null;

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    
    if (role === "admin") {
      return {
        lineChart: {
          labels: months,
          datasets: [
            {
              label: "Orders",
              data: dashboardData.orders?.monthlyData || [30, 45, 60, 80, 95, animatedStats.orders],
              borderColor: "var(--color-primary)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.4,
            },
            {
              label: "Revenue ($)",
              data: dashboardData.revenue?.monthlyData || [500, 800, 1200, 1800, 2200, animatedStats.revenue],
              borderColor: "var(--color-success)",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              tension: 0.4,
            },
          ],
        },
        barChart: {
          labels: months,
          datasets: [
            {
              label: "New Users",
              data: dashboardData.users?.monthlyData || [5, 8, 12, 15, 20, 25],
              backgroundColor: "var(--color-secondary)",
            },
            {
              label: "New Books",
              data: dashboardData.books?.monthlyData || [10, 15, 20, 25, 30, 35],
              backgroundColor: "var(--color-accent)",
            },
          ],
        },
      };
    } else if (role === "seller") {
      return {
        lineChart: {
          labels: months,
          datasets: [
            {
              label: "My Sales",
              data: dashboardData.revenue?.monthlyData || [100, 200, 300, 400, 500, animatedStats.revenue],
              borderColor: "var(--color-primary)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.4,
            },
          ],
        },
        doughnutChart: {
          labels: ["Published", "Draft", "Out of Stock"],
          datasets: [
            {
              data: [
                dashboardData.books?.published || 0,
                dashboardData.books?.draft || 0,
                dashboardData.books?.outOfStock || 0,
              ],
              backgroundColor: ["var(--color-success)", "var(--color-warning)", "var(--color-error)"],
              borderWidth: 0,
            },
          ],
        },
      };
    } else {
      return {
        lineChart: {
          labels: months,
          datasets: [
            {
              label: "My Orders",
              data: dashboardData.orders?.monthlyData || [1, 2, 1, 3, 2, animatedStats.orders],
              borderColor: "var(--color-primary)",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              tension: 0.4,
            },
          ],
        },
        barChart: {
          labels: ["Fiction", "Non-Fiction", "Academic", "Children", "Other"],
          datasets: [
            {
              label: "Books by Category",
              data: dashboardData.orders?.categoryData || [5, 3, 2, 1, 2],
              backgroundColor: [
                "var(--color-primary)", 
                "var(--color-success)", 
                "var(--color-secondary)", 
                "var(--color-accent)", 
                "var(--color-warning)"
              ],
            },
          ],
        },
      };
    }
  };

  const statsCards = getStatsCards();
  const chartData = getChartData();

  if (isLoading) {
    return (
      <div className="flex-1 p-4 space-y-6">
        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-surface p-6 rounded-lg border border-theme animate-pulse">
              <div className="h-4 bg-theme-secondary rounded mb-2"></div>
              <div className="h-8 bg-theme-secondary rounded"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-surface p-6 rounded-lg border border-theme animate-pulse">
              <div className="h-64 bg-theme-secondary rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 space-y-6">
      {/* Welcome Message */}
      <div className="bg-surface p-6 rounded-lg border border-theme">
        <h1 className="text-2xl font-bold text-theme-primary mb-2">
          Welcome back, {user?.displayName || "User"}!
        </h1>
        <p className="text-theme-secondary">
          {role === "admin" && "Manage your platform and monitor overall performance."}
          {role === "seller" && "Track your sales, manage books, and grow your business."}
          {role === "user" && "Explore books, track orders, and manage your reading journey."}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-surface shadow-lg p-6 rounded-lg border border-theme hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-theme-secondary text-sm font-medium">{stat.title}</h3>
                <p className="text-2xl font-bold text-theme-primary mt-1">{stat.value}</p>
                {stat.change !== 0 && (
                  <div className="flex items-center mt-2">
                    <FiTrendingUp 
                      className={`text-sm mr-1 ${stat.change > 0 ? 'text-green-500' : 'text-red-500'}`} 
                    />
                    <span 
                      className={`text-xs ${stat.change > 0 ? 'text-green-500' : 'text-red-500'}`}
                    >
                      {stat.change > 0 ? '+' : ''}{stat.change}% from last month
                    </span>
                  </div>
                )}
              </div>
              <div style={{ color: stat.color }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartData?.lineChart && (
          <div className="bg-surface shadow-lg p-6 rounded-lg border border-theme">
            <h3 className="text-lg font-semibold text-theme-primary mb-4">
              {role === "admin" ? "Orders & Revenue Trend" : 
               role === "seller" ? "Sales Trend" : "My Orders Trend"}
            </h3>
            <div className="h-64">
              <Line data={chartData.lineChart} options={chartOptions} />
            </div>
          </div>
        )}

        {chartData?.barChart && (
          <div className="bg-surface shadow-lg p-6 rounded-lg border border-theme">
            <h3 className="text-lg font-semibold text-theme-primary mb-4">
              {role === "admin" ? "New Users & Books" : 
               role === "user" ? "Books by Category" : "Monthly Overview"}
            </h3>
            <div className="h-64">
              <Bar data={chartData.barChart} options={chartOptions} />
            </div>
          </div>
        )}

        {chartData?.doughnutChart && (
          <div className="bg-surface shadow-lg p-6 rounded-lg border border-theme">
            <h3 className="text-lg font-semibold text-theme-primary mb-4">Book Status</h3>
            <div className="h-64">
              <Doughnut 
                data={chartData.doughnutChart} 
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    legend: {
                      ...chartOptions.plugins.legend,
                      position: 'bottom'
                    }
                  }
                }} 
              />
            </div>
          </div>
        )}
      </div>

      {/* Recent Activity */}
      <div className="bg-surface shadow-lg p-6 rounded-lg border border-theme">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-theme-primary flex items-center">
            <FiActivity className="mr-2" />
            Recent Activity
          </h3>
          <span className="text-xs text-theme-muted">Live updates every 30s</span>
        </div>
        <div className="space-y-3">
          {dashboardData?.recentActivity?.slice(0, 5).map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-2 border-b border-theme last:border-b-0">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-2 h-2 rounded-full animate-pulse" 
                  style={{ backgroundColor: 'var(--color-primary)' }}
                ></div>
                <span className="text-theme-primary">{activity.description}</span>
              </div>
              <span className="text-theme-muted text-sm">{activity.time}</span>
            </div>
          )) || (
            <div className="text-center py-8">
              <FiActivity className="mx-auto text-4xl text-theme-muted mb-2" />
              <p className="text-theme-muted">No recent activity</p>
              <p className="text-theme-muted text-sm mt-1">Activity will appear here as it happens</p>
            </div>
          )}
        </div>
      </div>

      {/* Outlet for nested pages */}
      <Outlet />
    </div>
  );
}