import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

export default function Payment() {
  const { id } = useParams();
  console.log(id);

  const axiosSecure = UseAxiosSecure();
  const { data: order = {}, isLoading: orderLoading } = useQuery({
    queryKey: ["order-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${id}`);
      return res.data;
    },
  });
  console.log(order);

  const { data: bookData = {}, isLoading } = useQuery({
    queryKey: ["book-details", order.bookId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${order.bookId}`);
      return res.data;
    },
  });
  console.log(bookData);

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

    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    console.log(res.data);

    if (res.data.url) {
      window.location.href = res.data.url;
    }

    // Implement payment processing logic here
    // toast.success("Payment processed successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Complete Payment
        </h1>
        <button
          onClick={handlePayment}
          type="submit"
          className="btn btn-primary w-full">
          Pay Now
        </button>
      </div>
    </div>
  );
}
