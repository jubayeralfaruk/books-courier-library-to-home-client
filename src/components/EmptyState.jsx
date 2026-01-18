import { motion } from "framer-motion";
import { BookOpen, Search, ShoppingCart, Heart } from "lucide-react";
import { Link } from "react-router";

export default function EmptyState({ 
  type = "books", 
  title, 
  description, 
  actionText, 
  actionLink 
}) {
  const icons = {
    books: <BookOpen size={64} />,
    search: <Search size={64} />,
    cart: <ShoppingCart size={64} />,
    wishlist: <Heart size={64} />,
  };

  const defaultMessages = {
    books: {
      title: "No Books Found",
      description: "Try adjusting your filters or search terms",
      actionText: "Browse All Books",
      actionLink: "/books",
    },
    search: {
      title: "No Results Found",
      description: "We couldn't find any books matching your search",
      actionText: "Clear Search",
      actionLink: "/books",
    },
    cart: {
      title: "Your Cart is Empty",
      description: "Add some books to get started",
      actionText: "Browse Books",
      actionLink: "/books",
    },
    wishlist: {
      title: "Your Wishlist is Empty",
      description: "Save books you love for later",
      actionText: "Discover Books",
      actionLink: "/books",
    },
  };

  const message = defaultMessages[type];
  const finalTitle = title || message.title;
  const finalDescription = description || message.description;
  const finalActionText = actionText || message.actionText;
  const finalActionLink = actionLink || message.actionLink;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="text-gray-400 mb-6">
        {icons[type]}
      </div>
      <h3 className="text-2xl font-bold mb-2">{finalTitle}</h3>
      <p className="text-gray-500 mb-6 text-center max-w-md">{finalDescription}</p>
      {finalActionLink && (
        <Link
          to={finalActionLink}
          className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {finalActionText}
        </Link>
      )}
    </motion.div>
  );
}
