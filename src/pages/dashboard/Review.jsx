import { useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Star, Send, CheckCircle } from "lucide-react";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

export default function Review() {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  /* ------------------ react-hook-form ------------------ */
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      rating: 0,
      review: "",
    },
  });

  const rating = watch("rating");
  const reviewText = watch("review");

  /* ------------------ Fetch order ------------------ */
  const { data: order = {} } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/orders/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  /* ------------------ Check existing review ------------------ */
  const { data: existingReview } = useQuery({
    queryKey: ["review", id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/reviews?orderId=${id}`
      );
      return res.data[0]; // backend should return array
    },
    enabled: !!id,
  });

  /* ------------------ SUBMIT ------------------ */
  const onSubmit = async (data) => {
    if (data.rating === 0) {
      toast.error("Please give a rating");
      return;
    }

    const reviewData = {
      user_name: user.displayName,
      user_image: user.photoURL,
      user_email: user.email,
      rating: data.rating,
      review: data.review,
      bookId: order.bookId,
      orderId: order._id,
      createdAt: new Date(),
    };

    try {
      const res = await axiosSecure.post(
        "/reviews",
        reviewData
      );

      if (res.data.insertedId) {
        toast.success("Review submitted successfully!");
        reset();
        setSubmitted(true);
        navigate("/dashboard/my-orders");
      }
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  /* ------------------ Already Reviewed ------------------ */
  if (existingReview) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl font-semibold text-gray-600">
          You have already reviewed this order.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-10 text-white">
            <h1 className="text-3xl font-bold mb-2">
              Share Your Experience
            </h1>
            <p className="text-blue-100">
              Your feedback helps us improve BookCourier
            </p>
          </div>

          {/* Form */}
          <div className="px-8 py-10">
            {!submitted ? (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Overall Rating *
                  </label>

                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setValue("rating", star)
                        }
                        onMouseEnter={() =>
                          setHoveredRating(star)
                        }
                        onMouseLeave={() =>
                          setHoveredRating(0)
                        }
                      >
                        <Star
                          size={40}
                          className={`${
                            star <=
                            (hoveredRating || rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {rating === 0 && (
                    <p className="text-sm text-red-500 mt-2">
                      Rating is required
                    </p>
                  )}
                </div>

                {/* Review */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Your Review *
                  </label>

                  <textarea
                    {...register("review", {
                      required: "Review is required",
                      minLength: {
                        value: 10,
                        message:
                          "Minimum 10 characters required",
                      },
                    })}
                    rows="6"
                    className="w-full text-black px-4 py-3 border rounded-lg"
                  />

                  {errors.review && (
                    <p className="text-sm text-red-500 mt-2">
                      {errors.review.message}
                    </p>
                  )}

                  <p className="mt-2 text-sm text-gray-500">
                    {reviewText.length} characters
                  </p>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 flex justify-center gap-2 disabled:opacity-50"
                >
                  <Send size={20} />
                  {isSubmitting
                    ? "Submitting..."
                    : "Submit Review"}
                </button>
              </form>
            ) : (
              <div className="text-center py-12">
                <CheckCircle
                  size={60}
                  className="mx-auto text-green-600"
                />
                <h2 className="text-2xl font-bold mt-4">
                  Thank You!
                </h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
