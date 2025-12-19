import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import UseAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

/* ---------------- Debounce ---------------- */
function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}

/* ---------------- Skeleton ---------------- */
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
  const { user } = useAuth();

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  const debouncedSearch = useDebounce(search);
  const loadMoreRef = useRef(null);

  /* ---------- Fetch Books (SERVER SIDE) ---------- */
  const {
    data,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["books", debouncedSearch, sort, page],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/books?search=${debouncedSearch}&sort=${sort}&page=${page}&limit=${limit}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const books = data?.books || [];
  const total = data?.total || 0;

  /* ---------- Infinite Scroll ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          books.length < total &&
          !isFetching
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [books, total, isFetching]);

  /* ---------- Reset page on search/sort ---------- */
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sort]);

  /* ---------- Fetch Wishlist ---------- */
  const { data: wishlist = [], refetch: refetchWishlist } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });

  const wishlistIds = wishlist.map((item) => item.bookId);

  /* ---------- Wishlist Toggle ---------- */
  const handleWishlistToggle = async (book) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    const isWishlisted = wishlistIds.includes(book._id);

    try {
      if (!isWishlisted) {
        await axiosSecure.post("/wishlist", {
          user_email: user.email,
          bookId: book._id,
          title: book.title,
          image: book.image,
          price: book.price,
          sortDescription: book.sortDescription,
        });
        toast.success("Added to wishlist");
      } else {
        await axiosSecure.delete("/wishlist", {
          data: {
            user_email: user.email,
            bookId: book._id,
          },
        });
        toast.info("Removed from wishlist");
      }

      refetchWishlist();
    } catch {
      toast.error("Wishlist action failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-center text-4xl font-bold mb-7">
        All Books
      </h2>

      {/* ---------- Search & Sort ---------- */}
      <div className="flex justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search books by name..."
          className="input input-bordered max-w-[300px]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-60"
          value={sort}
          onChange={(e) => setSort(e.target.value)}>
          <option value="">Sort by price</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>
      </div>

      {/* ---------- Books Grid ---------- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(isLoading || isFetching) &&
          [...Array(8)].map((_, i) => <BookSkeleton key={i} />)}

        {books.map((book) => (
          <motion.div
            key={book._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-xl shadow-gray-900 shadow-2xl">

            <Link to={`/books/${book._id}`}>
              <img
                src={book.image}
                alt={book.title}
                className="h-52 w-full object-contain p-3"
              />

              <div className="p-4">
                <h3 className="font-semibold line-clamp-1">
                  {book.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {book.sortDescription}
                </p>

                <div className="flex justify-between mt-3">
                  <span>⭐ {book.rating}</span>
                  <span className="font-bold">৳ {book.price}</span>
                </div>
              </div>
            </Link>

            {/* Wishlist */}
            <button
              className="absolute top-3 right-3 bg-white p-2 rounded-full"
              onClick={(e) => {
                e.preventDefault();
                handleWishlistToggle(book);
              }}>
              {wishlistIds.includes(book._id) ? (
                <FavoriteIcon className="text-pink-500" />
              ) : (
                <FavoriteBorderIcon className="text-gray-600" />
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* ---------- Infinite Scroll Trigger ---------- */}
      <div ref={loadMoreRef} className="h-12 mt-10" />

      {books.length === 0 && !isLoading && (
        <p className="text-center text-gray-400 mt-16">
          No books found
        </p>
      )}
    </div>
  );
}