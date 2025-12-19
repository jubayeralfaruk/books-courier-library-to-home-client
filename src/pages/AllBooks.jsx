import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import UseAxiosSecure from "../hooks/useAxiosSecure";

/* ---------------- Debounce (inline) ---------------- */
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

/* ---------------- Skeleton Card ---------------- */
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

/* ---------------- Main Page ---------------- */
export default function AllBooks() {
  const axiosSecure = UseAxiosSecure();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  const debouncedSearch = useDebounce(search);

  /* ---------- Fetch Books ---------- */
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      const res = await axiosSecure.get("/books"); // only published from backend
      return res.data;
    },
  });

  /* ---------- Search ---------- */
  let filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  /* ---------- Sort ---------- */
  if (sort === "low") filteredBooks.sort((a, b) => a.price - b.price);
  if (sort === "high") filteredBooks.sort((a, b) => b.price - a.price);

  /* ---------- Infinite Scroll ---------- */
  const visibleBooks = filteredBooks.slice(0, page * limit);
  const loadMoreRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          visibleBooks.length < filteredBooks.length
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [visibleBooks, filteredBooks]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-center text-4xl font-bold mb-7 ">All Books</h2>
      {/* ---------- Search & Sort ---------- */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search books by name..."
          className="input input-bordered max-w-[300px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:w-60"
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Sort by price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      {/* ---------- Books Grid ---------- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {isLoading &&
          [...Array(8)].map((_, i) => <BookSkeleton key={i} />)
        }

        {visibleBooks.map((book) => (
          <motion.div
            key={book._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-xl shadow-gray-900 shadow-2xl hover:shadow transition"
          >
            <Link to={`/books/${book._id}`}>
              <img
                src={book.image}
                alt={book.title}
                className="h-52 w-full object-contain p-3 rounded-t-xl"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg line-clamp-1">
                  {book.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                  {book.sortDescription}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <span className="text-yellow-500 text-sm">
                    ⭐ {book.rating}
                  </span>
                  <span className="text-blue-600 font-bold">
                    ৳ {book.price}
                  </span>
                </div>
              </div>
            </Link>

            {/* ---------- Wishlist ---------- */}
            <button
              className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:bg-pink-50"
              onClick={(e) => {
                e.preventDefault();
                // backend ready hole ekhane wishlist API call hobe
              }}
            >
              ❤️
            </button>
          </motion.div>
        ))}
      </div>

      {/* ---------- Infinite Scroll Trigger ---------- */}
      <div ref={loadMoreRef} className="h-12 mt-10"></div>

      {visibleBooks.length === 0 && (
        <p className="text-center text-gray-400 mt-16">
          No books found
        </p>
      )}
    </div>
  );
}