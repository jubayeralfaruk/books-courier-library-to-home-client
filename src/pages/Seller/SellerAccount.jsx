import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

export default function SellerAccount() {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Fetch existing seller application
  const { data: existingApplication, isLoading } = useQuery({
    queryKey: ["sellerApplication", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/sellers?email=${user.email}`);
      return res.data?.[0] || null;
    },
    enabled: !!user?.email,
  });

  const mutation = useMutation({
    mutationFn: async (sellerData) => {
      const res = await axiosSecure.post("/sellers", sellerData);
      return res.data;
    },
    onSuccess: (data) => {
      if (data.insertedId) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Seller account request submitted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Submission failed",
        text: error?.message || "Something went wrong",
      });
    },
  });

  const onSubmit = (formData) => {
    const sellerData = {
      name: user.displayName,
      email: user.email,
      libraryName: formData.libraryName,
      libraryAddress: formData.libraryAddress,
      nidNumber: formData.nidNumber,
      birthDate: formData.birthDate,
      role: "seller",
      status: "pending",
    };
    mutation.mutate(sellerData);
  };

  // Skeleton loader component
  const Skeleton = () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl animate-pulse space-y-4">
        <div className="h-8 bg-gray-300 rounded w-3/4 mx-auto"></div>
        <div className="h-6 bg-gray-300 rounded"></div>
        <div className="h-6 bg-gray-300 rounded"></div>
        <div className="h-6 bg-gray-300 rounded"></div>
        <div className="h-10 bg-gray-300 rounded mt-4"></div>
      </div>
    </div>
  );

  if (isLoading) return <Skeleton />;

  // If already applied
  if (existingApplication) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className=" shadow-2xl rounded-2xl w-full max-w-lg p-8 text-center"
        data-aos="fade-up"
      >
        <h1 className="text-3xl font-bold mb-4">Seller Application Status</h1>

        <div className="flex flex-col items-center mb-6 space-y-2">
          <span className="text-lg font-medium">Library Name:</span>
          <p className="text-gray-700">{existingApplication.libraryName}</p>

          <span className="text-lg font-medium">Library Address:</span>
          <p className="text-gray-700">{existingApplication.libraryAddress}</p>

          <span className="text-lg font-medium">Phone Number:</span>
          <p className="text-gray-700">{existingApplication.phoneNumber}</p>

          <span className="text-lg font-medium">NID Number:</span>
          <p className="text-gray-700">{existingApplication.nidNumber}</p>

          <span className="text-lg font-medium">Birth Date:</span>
          <p className="text-gray-700">{existingApplication.birthDate}</p>
        </div>

        <div className="mt-4">
          {existingApplication.status === "pending" && (
            <span className="inline-block bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full font-semibold">
              Pending
            </span>
          )}
          {existingApplication.status === "approved" && (
            <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold">
              Approved
            </span>
          )}
          {existingApplication.status === "rejected" && (
            <span className="inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full font-semibold">
              Rejected
            </span>
          )}
        </div>

        <p className="mt-6 text-gray-600">
          You have already submitted a seller account request. Please wait for approval.
        </p>
      </div>
    </div>
  );
}


  // Form view
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="shadow-2xl rounded-2xl w-full max-w-xl p-8"
        data-aos="fade-up">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Seller Account Request
        </h1>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              value={user.displayName || ""}
              readOnly
              className="input input-bordered w-full "
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={user.email || ""}
              readOnly
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^01[3-9]\d{8}$/,
                  message:
                    "Enter a valid Bangladeshi phone number (11 digits, starts with 01)",
                },
              })}
              placeholder="01712345678"
              className="input input-bordered w-full"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Library Name</label>
            <input
              type="text"
              {...register("libraryName", {
                required: "Library name is required",
              })}
              className="input input-bordered w-full"
            />
            {errors.libraryName && (
              <p className="text-red-500 text-sm">
                {errors.libraryName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Library Address</label>
            <textarea
              {...register("libraryAddress", {
                required: "Library address is required",
              })}
              className="textarea textarea-bordered w-full"
            />
            {errors.libraryAddress && (
              <p className="text-red-500 text-sm">
                {errors.libraryAddress.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">NID Number</label>
            <input
              type="text"
              {...register("nidNumber", { required: "NID number is required" })}
              className="input input-bordered w-full"
            />
            {errors.nidNumber && (
              <p className="text-red-500 text-sm">{errors.nidNumber.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Birth Date</label>
            <input
              type="date"
              {...register("birthDate", { required: "Birth date is required" })}
              className="input input-bordered w-full"
            />
            {errors.birthDate && (
              <p className="text-red-500 text-sm">{errors.birthDate.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`btn btn-primary w-full mt-4 ${
              mutation.isLoading ? "loading" : ""
            }`}>
            {mutation.isLoading ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </div>
    </div>
  );
}
