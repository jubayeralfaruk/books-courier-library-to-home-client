import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { useEffect, useRef, useState } from "react";
import UseAxiosSecure from "../hooks/useAxiosSecure";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmptyState from "../components/EmptyState";

/* ---------------- Debounce Hook ---------------- */
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
    <div className="animate-pulse bg-surface rounded-xl shadow-lg border border-theme p-4">
      <div className="h-52 bg-theme-secondary rounded" />
      <div className="mt-4 h-4 bg-theme-secondary rounded w-3/4" />
      <div className="mt-2 h-3 bg-theme-secondary rounded w-full" />
      <div className="mt-3 h-4 bg-theme-secondary rounded w-1/3" />
    </div>
  );
}

/* ---------------- Main Component ---------------- */
export default function AllBooks() {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();

  /* ---------- State ---------- */
  const [search, setSearch] = useState("");
  const [minRating, setMinRating] = useState("");
  const [priceSort, setPriceSort] = useState("");
  const [timeSort, setTimeSort] = useState("latest");
  const [page, setPage] = useState(1);
  const [allBooks, setAllBooks] = useState([]);

  const limit = 8;
  const debouncedSearch = useDebounce(search);
  const loadMoreRef = useRef(null);

  /* ---------- Fetch Books ---------- */
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      "books",
      debouncedSearch,
      minRating,
      priceSort,
      timeSort,
      page,
    ],
    queryFn: async () => {
      const url = `/books?search=${debouncedSearch}&rating=${minRating}&sort=${priceSort}&time=${timeSort}&page=${page}&limit=${limit}`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
    keepPreviousData: false,
  });

  const currentBooks = data?.books || [];
  const total = data?.total || 0;

  /* ---------- Accumulate Books (Infinite Scroll) ---------- */
  useEffect(() => {
    if (page === 1) {
      setAllBooks(currentBooks);
    } else if (currentBooks.length) {
      setAllBooks((prev) => [...prev, ...currentBooks]);
    }
  }, [currentBooks, page]);

  /* ---------- Reset on Filter Change ---------- */
  useEffect(() => {
    setPage(1);
    setAllBooks([]);
  }, [debouncedSearch, minRating, priceSort, timeSort]);

  /* ---------- Infinite Scroll Observer ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          allBooks.length < total &&
          !isFetching &&
          !isLoading
        ) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [allBooks, total, isFetching, isLoading]);

  /* ---------- Wishlist ---------- */
  const { data: wishlist = [], refetch: refetchWishlist } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });

  const wishlistIds = wishlist.map((item) => item.bookId);

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
          data: { user_email: user.email, bookId: book._id },
        });
        toast.info("Removed from wishlist");
      }

      refetchWishlist();
    } catch {
      toast.error("Wishlist action failed");
    }
  };

  /* ---------- UI ---------- */
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-theme-primary min-h-screen">
      <h2 className="text-center text-4xl font-bold mb-7 text-theme-primary">
        All Books
      </h2>

      {/* ---------- Filters ---------- */}
      <div className="flex flex-wrap justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search books..."
          className="flex-1 min-w-[200px] px-4 py-3 bg-surface border border-theme rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="w-40 px-4 py-3 bg-surface border border-theme rounded-lg"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        >
          <option value="">All Ratings</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
        </select>

        <select
          className="w-40 px-4 py-3 bg-surface border border-theme rounded-lg"
          value={priceSort}
          onChange={(e) => setPriceSort(e.target.value)}
        >
          <option value="">Price Sort</option>
          <option value="low">Low → High</option>
          <option value="high">High → Low</option>
        </select>

        <select
          className="w-40 px-4 py-3 bg-surface border border-theme rounded-lg"
          value={timeSort}
          onChange={(e) => setTimeSort(e.target.value)}
        >
          <option value="latest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>

      {/* ---------- Books Grid ---------- */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {(isLoading && page === 1) &&
          [...Array(8)].map((_, i) => <BookSkeleton key={i} />)}

        {allBooks.map((book) => (
          <motion.div
            key={book._id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.04 }}
            className="relative rounded-xl shadow-lg bg-surface border border-theme"
          >
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
                <p className="text-sm line-clamp-2">
                  {book.sortDescription}
                </p>

                <div className="flex justify-between mt-3">
                  <span>⭐ {book?.rating || 0}</span>
                  <span className="font-bold">৳ {book.price}</span>
                </div>
              </div>
            </Link>

            <button
              className="absolute top-3 right-3 bg-surface p-2 rounded-full border"
              onClick={(e) => {
                e.preventDefault();
                handleWishlistToggle(book);
              }}
            >
              {wishlistIds.includes(book._id) ? (
                <FavoriteIcon color="error" />
              ) : (
                <FavoriteBorderIcon />
              )}
            </button>
          </motion.div>
        ))}
      </div>

      {/* ---------- Loader ---------- */}
      {isFetching && page > 1 && (
        <div className="flex justify-center mt-6">
          <div className="animate-spin h-8 w-8 border-b-2 rounded-full" />
        </div>
      )}

      <div ref={loadMoreRef} className="h-12 mt-10" />

      {allBooks.length === 0 && !isLoading && (
        <EmptyState
          type={search ? "search" : "books"}
          description={
            search
              ? `No books found for "${search}"`
              : "Try adjusting filters"
          }
        />
      )}
    </div>
  );
}
