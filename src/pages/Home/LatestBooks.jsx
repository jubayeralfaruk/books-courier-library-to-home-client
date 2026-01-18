import { Link } from "react-router";
import UseAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const LatestBooks = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    data: books = [],
    isLoading,
    isFetching,
    isError,
  } = useQuery({
    queryKey: ["latest-books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books?limit=4&sort=latest");
      return res.data.books; // ✅ FIX
    },
  });

  function BookSkeleton() {
    return (
      <div className="animate-pulse bg-white rounded-xl shadow p-4">
        <div className="h-52 bg-gray-200 rounded" />
        <div className="mt-4 h-4 bg-gray-200 rounded w-3/4" />
        <div className="mt-2 h-3 bg-gray-200 rounded w-full" />
        <div className="mt-3 h-4 bg-gray-200 rounded w-1/3" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-red-500">Failed to load books</div>
    );
  }

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          📚 Latest Books
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-8">
          {(isLoading || isFetching) &&
            [...Array(4)].map((_, i) => <BookSkeleton key={i} />)}
          {books.map((book) => (
            <motion.div
              key={book._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-xl shadow-lg bg-surface border border-theme">
              <Link to={`/books/${book._id}`}>
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-52 w-full object-contain p-3"
                />

                <div className="p-4">
                  <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {book.sortDescription}
                  </p>

                  <div className="flex justify-between mt-3">
                    <span>⭐ {book.averageRating || book.rating || 0}</span>
                    <span className="font-bold">৳ {book.price}</span>
                  </div>
                </div>
              </Link>

              {/* Wishlist */}
              <button className="absolute top-3 right-3 bg-white p-2 rounded-full opacity-70">
                <p className="text-green-700 font-extrabold text-[10px]">New</p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBooks;
