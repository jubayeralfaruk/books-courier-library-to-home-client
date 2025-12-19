import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";

export default function SellerOrderManagement() {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  // 🔹 Backend filtered orders
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["sellerOrders", search, status],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/seller-orders?search=${search}&status=${status}`
      );
      return res.data;
    },
  });

  // 🔹 Update order status
  const mutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return axiosSecure.patch(`/seller-orders/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["sellerOrders"]);
      Swal.fire("Updated", "Order status updated successfully", "success");
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

  if (isLoading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  return (
    <div className="p-6 bg-base-100 text-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Seller Order Management</h2>

      {/* 🔍 Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by product / email / order ID"
          className="input input-bordered w-full"
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

      {/* 📦 Orders Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Qty</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={order._id}>
                <td>{i + 1}</td>
                <td>{order._id}</td>
                <td>{order.customerEmail}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>${order.total}</td>
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
                  {order.status === "pending" && (
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() =>
                        handleStatusChange(order._id, "shipped")
                      }
                    >
                      Ship
                    </button>
                  )}
                  {order.status === "shipped" && (
                    <button
                      className="btn btn-xs btn-success"
                      onClick={() =>
                        handleStatusChange(order._id, "delivered")
                      }
                    >
                      Deliver
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <p className="text-center py-10 text-gray-400">
            No orders found
          </p>
        )}
      </div>
    </div>
  );
}