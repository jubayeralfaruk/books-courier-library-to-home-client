import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

export default function SellerOrderManagement() {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders", search, status],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/seller-orders?seller_email=${user.email}&search=${search}&status=${status}`
      );
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: async ({ id, status }) =>
      axiosSecure.patch(`/seller-orders/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries(["sellerOrders"]);
      Swal.fire("Updated!", "Order status updated", "success");
    },
  });

  const handleStatusChange = (id, status) => {
    Swal.fire({
      title: "Confirm?",
      text: `Change status to ${status}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res.isConfirmed) {
        mutation.mutate({ id, status });
      }
    });
  };

  const handleCancel = (id) => {
    Swal.fire({
      title: "Cancel this order?",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Cancel",
    }).then((res) => {
      if (res.isConfirmed) {
        mutation.mutate({ id, status: "cancelled" });
      }
    });
  };

  return (
    <div className="bg-base-100 p-4 md:p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6">📦 Order Management</h2>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          className="input input-bordered w-full"
          placeholder="Search by book or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-56"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {isLoading && (
        <div className="text-center py-20">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* 📱 MOBILE CARD VIEW */}
      <div className="grid gap-4 md:hidden">
        {orders.map((order) => (
          <div
            key={order._id}
            className="card bg-base-200 shadow-md p-4"
          >
            <div className="flex gap-4">
              <img
                src={order.bookImage}
                alt=""
                className="w-16 h-20 rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{order.bookTitle}</h3>
                <p className="text-sm text-gray-500">{order.user_email}</p>
                <p className="text-sm">📞 {order.phone}</p>

                <span
                  className={`badge mt-2 ${
                    order.status === "pending"
                      ? "badge-warning"
                      : order.status === "shipped"
                      ? "badge-info"
                      : "badge-success"
                  }`}
                >
                  {order.status}
                </span>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <select
                className="select select-sm select-bordered flex-1"
                value={order.status}
                disabled={order.status === "delivered"}
                onChange={(e) =>
                  handleStatusChange(order._id, e.target.value)
                }
              >
                <option value="pending">Pending</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>

              <button
                className="btn btn-sm btn-error"
                disabled={order.status === "delivered"}
                onClick={() => handleCancel(order._id)}
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 💻 DESKTOP TABLE VIEW */}
      <div className="hidden md:block overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Customer</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Change Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id}>
                <td>{i + 1}</td>

                <td className="flex gap-3 items-center">
                  <img
                    src={order.bookImage}
                    className="w-12 h-14 rounded"
                    alt=""
                  />
                  {order.bookTitle}
                </td>

                <td>{order.user_email}</td>
                <td>{order.phone}</td>

                <td>
                  <span
                    className={`badge ${
                      order.status === "pending"
                        ? "badge-warning"
                        : order.status === "shipped"
                        ? "badge-info"
                        : "badge-success"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                <td>
                  <select
                    className="select select-sm select-bordered"
                    value={order.status}
                    disabled={order.status === "delivered"}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </td>

                <td>
                  <button
                    className="btn btn-sm btn-error"
                    disabled={order.status === "delivered"}
                    onClick={() => handleCancel(order._id)}
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {orders.length === 0 && !isLoading && (
        <p className="text-center py-10 text-gray-400">
          No orders found
        </p>
      )}
    </div>
  );
}