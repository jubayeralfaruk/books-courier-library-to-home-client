import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import UseAxiosSecure from "../hooks/useAxiosSecure";
import { motion } from "framer-motion";

export default function RelatedBooks({ category, currentBookId }) {
  const axiosSecure = UseAxiosSecure();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["related-books", category],
    enabled: !!category,
    queryFn: async () => {
      const res = await axiosSecure.get(`/books?category=${category}&limit=4`);
      return res.data.books.filter(book => book._id !== currentBookId);
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-6">Related Books</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-800 rounded-xl p-4">
              <div className="h-52 bg-gray-700 rounded" />
              <div className="mt-4 h-4 bg-gray-700 rounded w-3/4" />
              <div className="mt-3 h-4 bg-gray-700 rounded w-1/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (books.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-6">Related Books</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {books.map((book) => (
          <motion.div
            key={book._id}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
            className="rounded-xl shadow-gray-900 shadow-2xl"
          >
            <Link to={`/books/${book._id}`}>
              <img 
                src={book.image} 
                alt={book.title} 
                className="h-52 w-full object-contain p-3 rounded-t-xl" 
              />
              <div className="p-4">
                <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-1 mt-1">
                  {book.author}
                </p>
                <div className="flex justify-between mt-3">
                  <span>⭐ {book.averageRating || book.rating || 0}</span>
                  <span className="font-bold">৳ {book.price}</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
