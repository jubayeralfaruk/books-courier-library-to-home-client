import React, { useState } from "react";
import { useNavigate, Link } from "react-router";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

export default function MyOrdersTailwind() {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  const [order, setOrders] = useState([]);
  const navigate = useNavigate();

  const { data: orders = [], refetch: refetchOrders } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders?user_email=${user.email}`);
      return res.data;
    },
  });

  const handlePay = (orderId) => {
    navigate(`/dashboard/payment/${orderId}`);
  };

  const handleCancel = (orderId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/orders/${orderId}`, { status: "cancelled" })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire({
                title: "Cancelled!",
                text: "Your order has been cancelled.",
                icon: "success",
              });
              // Refetch orders
              refetchOrders();
            }
          });
      }
    });
  };

  const getStatusClass = (status) => {
    switch ((status || "").toLowerCase()) {
      case "pending":
        return "badge badge-warning";
      case "paid":
        return "badge badge-success";
      case "shipped":
        return "badge badge-info";
      case "cancelled":
        return "badge badge-outline";
      default:
        return "badge";
    }
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-xl shadow-lg">
        <table className="table w-full">
          <thead className="">
            <tr className="text-gray-700 text-sm">
              <th className="font-semibold">Book</th>
              <th className="font-semibold">Details</th>
              <th className="font-semibold">Order Date</th>
              <th className="font-semibold">Payment</th>
              <th className="font-semibold">Status</th>
              <th className="font-semibold">Action</th>
            </tr>
          </thead>
          {orders.length === 0 ? (
            <tbody>
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-6 text-gray-500">
                  No orders found.
                </td>
              </tr>
            </tbody>
          ) : (
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="hover">
                  <td>{order.bookTitle || order.bookId}</td>
                  <td>
                    <Link
                      to={`/books/${order.bookId}`}
                      className="btn btn-xs btn-outline">
                      View
                    </Link>
                  </td>
                  <td>{order.orderDate?.slice(0, 10) || "—"}</td>
                  <td>
                    <span
                      className={
                        order.paymentStatus === "paid"
                          ? "badge badge-success"
                          : "badge badge-error"
                      }>
                      {order.paymentStatus || "unpaid"}
                    </span>
                  </td>
                  <td>
                    <span className={getStatusClass(order.status)}>
                      {order.status || "—"}
                    </span>
                  </td>
                  <td>
                    {order.status === "pending" ? (
                      <div className="flex gap-2">
                        <button
                          className="btn btn-xs btn-error"
                          onClick={() => handleCancel(order._id)}>
                          Cancel
                        </button>
                        {order.paymentStatus !== "paid" && (
                          <button
                            className="btn btn-xs btn-primary"
                            onClick={() => handlePay(order._id)}>
                            Pay Now
                          </button>
                        )}
                      </div>
                    ) : (
                      <span>—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="card bg-white shadow-lg rounded-xl p-4">
            <h2 className="font-semibold text-lg">
              {order.bookTitle || order.bookId}
            </h2>
            <p className="text-sm text-gray-500">
              Order Date: {order.orderDate?.slice(0, 10)}
            </p>
            <div className="flex flex-wrap gap-2 mt-2">
              <span
                className={
                  order.paymentStatus === "paid"
                    ? "badge badge-success"
                    : "badge badge-error"
                }>
                {order.paymentStatus || "unpaid"}
              </span>
              <span className={getStatusClass(order.status)}>
                {order.status}
              </span>
            </div>
            <div className="flex gap-2 mt-3">
              {order.status === "pending" && (
                <>
                  <button
                    className="btn btn-xs btn-error"
                    onClick={() => handleCancel(order._id)}>
                    Cancel
                  </button>
                  {order.paymentStatus !== "paid" && (
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() => handlePay(order._id)}>
                      Pay Now
                    </button>
                  )}
                </>
              )}
              <Link
                to={`/books/${order.bookId}`}
                className="btn btn-xs btn-outline">
                View Book
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
