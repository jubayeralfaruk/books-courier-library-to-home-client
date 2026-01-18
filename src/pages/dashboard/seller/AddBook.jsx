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
    <div className="max-w-3xl mx-auto p-6 bg-surface shadow-lg rounded-xl border border-theme">
      <h2 className="text-2xl font-semibold mb-6 text-theme-primary">Add New Book</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Book Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-300"
          required
        />

        <input
          type="text"
          name="author"
          placeholder="Author Name"
          value={formData.author}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-300"
        />

        <input
          type="email"
          name="seller_email"
          placeholder="Seller Email"
          value={user?.email}
          className="w-full px-4 py-3 bg-theme-tertiary border border-theme rounded-lg text-theme-muted cursor-not-allowed"
          readOnly
        />

        <input
          type="text"
          name="image"
          placeholder="Book Image URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-300"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-300"
            required
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            value={formData.rating}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-300"
          />
        </div>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-300"
        >
          <option value="published">Published</option>
          <option value="unpublished">Unpublished</option>
        </select>

        <textarea
          name="sortDescription"
          placeholder="Short Description"
          value={formData.sortDescription}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-300"
        />

        <textarea
          name="description"
          placeholder="Full Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full px-4 py-3 bg-theme-secondary border border-theme rounded-lg text-theme-primary placeholder:text-theme-muted focus:outline-none focus:border-[var(--color-primary)] transition-colors duration-300"
          rows={4}
        />

        <button 
          type="submit" 
          className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors duration-300"
          style={{ backgroundColor: 'var(--color-primary)' }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-primary)'}
        >
          Add Book
        </button>
      </form>
    </div>
  );
}