import React, { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../hooks/useAxiosSecure";

export default function ApproveSeller() {
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  // Fetch sellers
  const {
    data: sellers = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["sellers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sellers");
      return res.data;
    },
  });

  // Approve seller
  const approveMutation = useMutation({
    mutationFn: async (seller) => {
      const res = await axiosSecure.patch(`/sellers/${seller._id}`, {
        email: seller.email,
        status: "approved",
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Seller approved!",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    },
  });

  // Reject seller
  const rejectMutation = useMutation({
    mutationFn: async (seller) => {
      const res = await axiosSecure.patch(`/sellers/${seller._id}`, {
        email: seller.email,
        status: "rejected",
      });
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "error",
        title: "Seller rejected!",
        timer: 1500,
        showConfirmButton: false,
      });
      refetch();
    },
  });

  // Skeleton Loader
  const Skeleton = () => (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-lg p-5 animate-pulse space-y-4">
          <div className="h-6 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-10 bg-gray-300 rounded"></div>
        </div>
      ))}
    </div>
  );

  if (isLoading) return <Skeleton />;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1
        className="text-3xl font-bold mb-6"
        data-aos="fade-up">
        Approve Seller Accounts
      </h1>

      {/* Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellers.map((seller) => (
          <div
            key={seller._id}
            className="bg-white p-6 rounded-2xl shadow-xl border animate__animated animate__fadeIn"
            data-aos="fade-up">
            <h2 className="text-xl font-bold mb-2">{seller.libraryName}</h2>

            <p className="text-gray-700">
              <span className="font-semibold">Owner:</span> {seller.name}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {seller.email}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">NID:</span> {seller.nidNumber}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Birth Date:</span>{" "}
              {seller.birthDate}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Address:</span>{" "}
              {seller.libraryAddress}
            </p>

            {/* Status Badge */}
            <div className="mt-3">
              {seller.status === "pending" && (
                <span className="badge badge-warning text-sm">Pending</span>
              )}
              {seller.status === "approved" && (
                <span className="badge badge-success text-sm">Approved</span>
              )}
              {seller.status === "rejected" && (
                <span className="badge badge-error text-sm">Rejected</span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="mt-4 w-full flex items-center gap-3">
              <button
                className="btn btn-success btn-sm"
                disabled={seller.status !== "pending"}
                onClick={() => approveMutation.mutate(seller)}>
                Approve
              </button>

              <button
                className="btn btn-error btn-sm"
                disabled={seller.status !== "pending"}
                onClick={() => rejectMutation.mutate(seller)}>
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
