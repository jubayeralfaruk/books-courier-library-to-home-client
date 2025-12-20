import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import UseAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth"; // Kept this import in case you need it later

/* ---------------- Skeleton ---------------- */
const ReviewSkeleton = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
    {[...Array(3)].map((_, i) => (
      <div
        key={i}
        className="bg-white p-6 rounded-xl shadow space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div className="space-y-2">
            <div className="w-32 h-4 bg-gray-200 rounded"></div>
            <div className="w-20 h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
      </div>
    ))}
  </div>
);

export default function BookReview({ bookId }) {
  const axiosSecure = UseAxiosSecure();
  const {
    data: reviews = [],
    isLoading,
  } = useQuery({
    queryKey: ["reviews", bookId],
    enabled: !!bookId,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?bookId=${bookId}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto mt-10 px-4">
        <ReviewSkeleton />
      </div>
    );
  }

  if (!reviews || reviews.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-10">
        No reviews yet. Be the first to review!
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4">
      <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev?._id}
            className="p-6 rounded-3xl shadow-gray-900 shadow-2xl overflow-hidden border border-gray-900 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={rev?.user_image || "/default-avatar.png"} // Fallback image
                alt={rev?.user_name || "User"}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{rev?.user_name || "Anonymous"}</p>
                <div className="flex items-center">
                  {[...Array(rev?.rating || 0)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">
              {rev?.review || "No review text"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}