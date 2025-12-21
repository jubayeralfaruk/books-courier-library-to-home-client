import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

export default function Payment() {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();

  // 1️⃣ Order query
  const { data: order = {}, isLoading: orderLoading } = useQuery({
    queryKey: ["order-details", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${id}`);
      return res.data;
    },
  });

  // 2️⃣ Book query (wait until bookId exists)
  const { data: bookData = {}, isLoading: bookLoading } = useQuery({
    queryKey: ["book-details", order.bookId],
    enabled: !!order.bookId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${order.bookId}`);
      return res.data;
    },
  });

  // Loading state
  if (orderLoading || bookLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const handlePayment = async (e) => {
    e.preventDefault();

    const paymentInfo = {
      orderId: id,
      amount: bookData.price,
      bookId: order.bookId,
      customer_phone: order.phone,
      bookTitle: bookData.title,
      customer_email: order.email,
      status: "paid",
    };

    try {
      const res = await axiosSecure.post(
        "/payment-checkout-session",
        paymentInfo
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      toast.error("Payment failed!");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="shadow-2xl rounded-2xl w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
         Please  Complete Book Payment
        </h1>

        <p className="text-center mb-4">
          <strong>Book:</strong> {bookData.title}
        </p>
        <p className="text-center mb-6">
          <strong>Amount:</strong> ৳{bookData.price}
        </p>

        <button
          onClick={handlePayment}
          className="btn btn-primary w-full">
          Pay Now
        </button>
      </div>
    </div>
  );
}
