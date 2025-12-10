import { Link } from "react-router";
import UseAxiosSecure from "../hooks/useAxiosSecure";

export default function AllBooks() {
  const books = [];
  const axiosSecure = UseAxiosSecure();
  axiosSecure.get("/books").then((res) => {
    books.push(...res.data);
  });
  return (
    <>
      <div className="max-w-7xl mx-auto my-8 p-3">
        <div className="grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-6 p-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="border shadow-md rounded-md p-4 cursor-pointer"
              onClick={() => (window.location.href = `/books/${book._id}`)}>
              <img
                src={book.image}
                alt={book.title}
                className="h-48 w-full object-cover rounded"
              />

              <h2 className="text-xl font-bold mt-3">{book.title}</h2>
              <p className="text-gray-600">{book.sortDescription}</p>
              <p className="text-yellow-600 font-semibold">⭐ {book.rating}</p>

              <p className="text-blue-600 font-bold mt-2">৳ {book.price}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
