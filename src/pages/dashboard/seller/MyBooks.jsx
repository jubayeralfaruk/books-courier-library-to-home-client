import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

export default function MyBooks() {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth();

  const {
    data: books = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myBooks"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/dashboard/books?seller_email=${user?.email}`
      );
      return res.data;
    },
  });

  if (isError) {
    return (
      <p className="text-center mt-10 text-red-500">Failed to load books</p>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Books</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Book</th>
                <th>Author</th>
                <th>Status</th>
                <th>Price</th>
                <th>Created</th>
                <th>Action</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <td colSpan={7}>
                  <div className="p-4">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-16 mb-3 rounded-lg bg-gray-200 animate-pulse"
                      />
                    ))}
                  </div>
                </td>
              </tbody>
            ) : (
              <tbody>
                {books.map((book, index) => (
                  <tr key={book._id}>
                    <td>{index + 1}</td>
                    <td className="flex items-center gap-3">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded"
                      />
                      <span>{book.title}</span>
                    </td>
                    <td>{book.author || "N/A"}</td>
                    <td>
                      <span
                        className={`badge ${
                          book.status === "published"
                            ? "badge-success"
                            : "badge-warning"
                        }`}>
                        {book.status}
                      </span>
                    </td>
                    <td>৳{book.price}</td>
                    <td>{new Date(book.createdAt).toLocaleDateString()}</td>
                    <td className="space-x-2">
                      <Link
                        to={`/dashboard/edit-book/${book._id}`}
                        className="btn btn-xs btn-info">
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      {books.length === 0 && !isLoading && (
        <p className="text-center py-10 text-gray-400">
          No orders found
        </p>
      )}
    </div>
  );
}
