import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";

export default function ManageBooks() {
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  // 🔹 Fetch all books
  const { data: books = [], isLoading } = useQuery({
    queryKey: ["dashboardBooks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/dashboard/books");
      return res.data;
    },
  });

  // 🔹 Publish / Unpublish
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      return axiosSecure.patch(`/admin/books/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminBooks"]);
      Swal.fire("Updated", "Book status updated", "success");
    },
  });

  // 🔹 Delete book
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axiosSecure.delete(`/admin/books/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminBooks"]);
      Swal.fire("Deleted", "Book and all related orders deleted", "success");
    },
  });

  const handleStatusChange = (id, currentStatus) => {
    const newStatus =
      currentStatus === "published" ? "unpublished" : "published";

    Swal.fire({
      title: "Are you sure?",
      text: `Change status to ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((res) => {
      if (res.isConfirmed) {
        statusMutation.mutate({ id, status: newStatus });
      }
    });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Danger!",
      text: "This will delete the book and all related orders!",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((res) => {
      if (res.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // if (isLoading) {
  //   return <p className="text-center mt-10">Loading books...</p>;
  // }

  return (
    <div className="p-6 bg-base-100 rounded-xl shadow">
      <h2 className="text-2xl text-white font-bold mb-6">Manage Books</h2>

      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Book</th>
              <th>Author</th>
              <th>Seller</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          {isLoading ? (
            <tbody>
              <td colSpan={6}>
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
                <tr
                  key={book._id}
                  className="text-white">
                  <td>{index + 1}</td>

                  <td className="flex items-center gap-3">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-12 h-16 rounded"
                    />
                    <Link
                      to={`/books/${book._id}`}
                      className="font-medium">
                      {book.title}
                    </Link>
                  </td>

                  <td>{book.author}</td>
                  <td>{book.seller_email}</td>
                  <td>${book.price}</td>

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

                  <td className="space-x-2">
                    <button
                      className="btn btn-xs btn-info"
                      onClick={() => handleStatusChange(book._id, book.status)}>
                      {book.status === "published" ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(book._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>

        {books.length === 0 && (
          <p className="text-center py-10 text-gray-400">No books found</p>
        )}
      </div>
    </div>
  );
}
