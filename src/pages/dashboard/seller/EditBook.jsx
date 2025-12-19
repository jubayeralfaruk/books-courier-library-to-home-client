import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";

export default function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  const queryClient = useQueryClient();

  const { data: book, isLoading } = useQuery({
    queryKey: ["book", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
  });

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    author_email: "",
    image: "",
    price: "",
    rating: "",
    status: "published",
    sortDescription: "",
    description: "",
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        author_email: book.author_email || "",
        image: book.image || "",
        price: book.price || "",
        rating: book.rating || "",
        status: book.status || "published",
        sortDescription: book.sortDescription || "",
        description: book.description || "",
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const mutation = useMutation({
    mutationFn: async (updatedBook) => {
      return axiosSecure.patch(`/books/${id}`, updatedBook);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myBooks"]);
      Swal.fire("Updated", "Book updated successfully", "success").then(() => {
        navigate("/dashboard/my-books");
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating),
    });
  };

  if (isLoading) return <p className="text-center mt-10">Loading book...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold mb-6">Edit Book</h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-white">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={formData.author}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="email"
          name="author_email"
          value={book.seller_email}
          readOnly
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <input
          type="text"
          name="image"
          placeholder="Book Image URL"
          value={formData.image}
          onChange={handleChange}
          className="input input-bordered w-full"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            readOnly
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="select select-bordered w-full">
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>

        <textarea
          name="sortDescription"
          placeholder="Short Description"
          value={formData.sortDescription}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        />

        <textarea
          name="description"
          placeholder="Full Description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
          rows={4}
        />

        <button
          type="submit"
          className="btn btn-primary w-full">
          Update Book
        </button>
      </form>
    </div>
  );
}
