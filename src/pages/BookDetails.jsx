import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import UseAxiosSecure from "../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookReview from "../components/BookReview";
import GlobalError from "./ErrorPage/GlobalError";

export default function BookDetails() {
  const { user } = useAuth();
  const axiosSecure = UseAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { data: book = {}, isLoading } = useQuery({
    queryKey: ["book-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });

  const { data: wishlist = [], refetch: refetchWishlist } = useQuery({
    queryKey: ["wishlist", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
      return res.data;
    },
  });

  const wishlistIds = wishlist.map((item) => item.bookId);
  const isWishlisted = wishlistIds.includes(book._id);

  const handleWishlistToggle = async () => {
    if (!user) {
      toast.error("Please login first");
      return;
    }

    try {
      if (!isWishlisted) {
        // ➕ ADD
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
        // ➖ REMOVE (correct way)
        await axiosSecure.delete("/wishlist", {
          data: {
            user_email: user.email,
            bookId: book._id,
          },
        });

        toast.info("Removed from wishlist");
      }

      refetchWishlist(); // 🔁 sync UI
    } catch (error) {
      toast.error("Wishlist action failed");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const orderDate = new Date().toISOString();
    data.orderDate = orderDate;
    await axiosSecure
      .post("/orders", {
        ...data,
        user_name: user.displayName,
        user_email: user.email,
        bookTitle: book.title,
        bookImage: book.image,
        bookId: book._id,
        seller_email: book.seller_email,
        status: "pending",
        paymentStatus: "unpaid",
      })
      .then((res) => {
        if (res.data.insertedId) {
          toast.success("Order placed successfully!");
          setOpen(false);
          reset();
          navigate("/dashboard/my-orders");
        }
      });

    setOpen(false);
    reset();
  };

  useEffect(() => {
    AOS.init({ duration: 1200, easing: "ease-out-cubic", once: true });
  }, []);

  if (isLoading) return <p className="text-center py-10">Loading...</p>;
  if (book._id !== id) return <GlobalError></GlobalError>;
  

  return (
    <div className="min-h-screen py-12 px-6 md:px-16">
      {/* Main Card */}
      <div
        className="max-w-6xl mx-auto rounded-3xl p-4 shadow-gray-900 shadow-2xl overflow-hidden border border-gray-900"
        data-aos="fade-up">
        <div className="grid md:grid-cols-2 gap-2">
          {/* Left Image */}
          <div
            className="relative border border-gray-800 p-2 rounded-3xl"
            data-aos="fade-right">
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-full object-contain rounded-3xl md:h-[520px]"
            />
            <div className="absolute top-4 bg-gray-600 left-4 backdrop-blur-xl px-3 py-1 rounded-full text-sm font-medium shadow-md">
              {book.status}
            </div>
          </div>

          {/* Right Content */}
          <div
            className="p-10 flex flex-col justify-center"
            data-aos="fade-left">
            <h1 className="text-4xl font-extrabold text-gray-300 leading-tight mb-3">
              {book.title}
            </h1>

            <p className="text-gray-400 text-sm mb-4">
              Author:{" "}
              <span className="text-gray-700 font-medium">{book.author}</span>
            </p>

            <p className="text-lg text-gray-700 mb-3 border-l-4 border-blue-600 pl-3">
              {book.sortDescription}
            </p>

            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500 text-2xl">⭐</span>
              <span className="text-gray-800 font-semibold text-lg">
                {book.rating} / 5.0
              </span>
            </div>

            <p className="text-4xl font-bold text-blue-700 mb-6 drop-shadow-sm">
              ৳ {book.price}
            </p>

            {/* Buttons */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  user ? setOpen(true) : navigate("/login");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg transition transform hover:scale-105"
                data-aos="zoom-in">
                Order Now
              </button>

              <button
                onClick={handleWishlistToggle}
                className="border border-blue-600 text-blue-700 px-6 py-3 rounded-2xl font-semibold hover:bg-blue-50 transition flex items-center gap-2"
                data-aos="zoom-in">
                {isWishlisted ? (
                  <>
                    <FavoriteIcon className="text-pink-500" />
                    Remove Wishlist
                  </>
                ) : (
                  <>
                    <FavoriteBorderIcon />
                    Add Wishlist
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="mt-0 md:mt-10">
          <p className="text-[min(5vh,20px)], font-semibold">
            Book Description:
          </p>
          <p className="text-gray-600 leading-relaxed mb-6 text-justify">
            {book.description}
          </p>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          data-aos="zoom-in">
          <div className=" w-full max-w-lg p-8 rounded-2xl shadow-2xl relative ">
            <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4">
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="w-full mt-1 p-3 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full mt-1 p-3 border rounded-xl"
                />
              </div>

              <div>
                <label className="font-medium">Phone Number</label>
                <input
                  type="text"
                  {...register("phone", { required: true })}
                  className="w-full mt-1 p-3 border rounded-xl"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm">Phone is required</p>
                )}
              </div>

              <div>
                <label className="font-medium">Address</label>
                <textarea
                  {...register("address", { required: true })}
                  className="w-full mt-1 p-3 border rounded-xl"></textarea>
                {errors.address && (
                  <p className="text-red-500 text-sm">Address is required</p>
                )}
              </div>

              {/* Submit + Cancel Buttons */}
              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-lg font-semibold">
                  Place Order
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-xl text-lg font-semibold">
                  Cancel
                </button>
              </div>
            </form>

            {/* Close Icon */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">
              ×
            </button>
          </div>
        </div>
      )}

        <BookReview bookId={id}></BookReview>
      {/* Extra Section */}
      <div className="max-w-6xl mx-auto mt-14 grid md:grid-cols-3 gap-8">
        {/* <div
          className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
          data-aos="fade-up">
          <h3 className="font-bold text-xl mb-2">📦 Fast Delivery</h3>
          <p className="text-gray-600">
            Get your book delivered anywhere within 2–4 days.
          </p>
        </div>

        <div
          className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
          data-aos="fade-up"
          data-aos-delay="200">
          <h3 className="font-bold text-xl mb-2">💳 Secure Payment</h3>
          <p className="text-gray-600">
            100% safe and encrypted online payments.
          </p>
        </div>

        <div
          className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
          data-aos="fade-up"
          data-aos-delay="400">
          <h3 className="font-bold text-xl mb-2">📚 Premium Quality</h3>
          <p className="text-gray-600">
            All books are original print with excellent page quality.
          </p>
        </div> */}
      </div>
    </div>
  );
}
