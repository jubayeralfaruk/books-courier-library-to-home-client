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
      <p className="text-center mt-10" style={{ color: 'var(--color-error)' }}>Failed to load books</p>
    );
  }

  return (
    <div className="p-6 bg-theme-primary min-h-screen">
      <h2 className="text-2xl font-semibold mb-6 text-theme-primary">My Books</h2>
        <div className="overflow-x-auto rounded-xl shadow-lg">
          <table className="table w-full bg-surface">
            <thead className="bg-theme-secondary">
              <tr className="text-theme-primary">
                <th className="font-semibold">#</th>
                <th className="font-semibold">Book</th>
                <th className="font-semibold">Author</th>
                <th className="font-semibold">Status</th>
                <th className="font-semibold">Price</th>
                <th className="font-semibold">Created</th>
                <th className="font-semibold">Action</th>
              </tr>
            </thead>
            {isLoading ? (
              <tbody>
                <td colSpan={7}>
                  <div className="p-4">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-16 mb-3 rounded-lg bg-theme-secondary animate-pulse"
                      />
                    ))}
                  </div>
                </td>
              </tbody>
            ) : (
              <tbody>
                {books.map((book, index) => (
                  <tr key={book._id} className="hover:bg-theme-secondary text-theme-primary">
                    <td className="text-theme-primary">{index + 1}</td>
                    <td className="flex items-center gap-3">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-12 h-16 object-cover rounded border border-theme"
                      />
                      <span className="text-theme-primary">{book.title}</span>
                    </td>
                    <td className="text-theme-secondary">{book.author || "N/A"}</td>
                    <td>
                      <span
                        className="badge text-white"
                        style={{
                          backgroundColor: book.status === "published" ? 'var(--color-success)' : 'var(--color-warning)'
                        }}>
                        {book.status}
                      </span>
                    </td>
                    <td className="text-theme-primary">৳{book.price}</td>
                    <td className="text-theme-secondary">{new Date(book.createdAt).toLocaleDateString()}</td>
                    <td className="space-x-2">
                      <Link
                        to={`/dashboard/edit-book/${book._id}`}
                        className="btn btn-xs text-white"
                        style={{ backgroundColor: 'var(--color-info)' }}>
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
        <p className="text-center py-10 text-theme-muted">
          No books found
        </p>
      )}
    </div>
  );
}
