import { useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

export default function AddBook() {
  const axiosSecure = UseAxiosSecure();
  const { user } = useAuth()

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    seller_email: "",
    image: "",
    price: "",
    rating: "",
    status: "published",
    sortDescription: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      ...formData,
      price: Number(formData.price),
      rating: Number(formData.rating),
      createdAt: new Date(),
      seller_email: user?.email
    };

    try {
      const res = await axiosSecure.post("/books", bookData);
      if (res.data.insertedId) {
        Swal.fire("Success", "Book added successfully", "success");
        setFormData({
          title: "",
          author: "",
          seller_email: "",
          image: "",
          price: "",
          rating: "",
          status: "published",
          sortDescription: "",
          description: "",
        });
      }
    } catch (error) {
      Swal.fire("Error", "Failed to add book", "error");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 shadow rounded">
      <h2 className="text-2xl font-semibold mb-6">Add New Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4 text-white">
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
          name="seller_email"
          placeholder="Seller Email"
          value={user?.email}
          className="input input-bordered w-full"
          readOnly
        />

        <input
          type="text"
          name="image"
          placeholder="Book Image URL"
          value={formData.image}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
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

        <button type="submit" className="btn btn-primary w-full">
          Add Book
        </button>
      </form>
    </div>
  );
}