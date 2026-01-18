import { useState } from "react";
import { toast } from "react-toastify";
import { Mail } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter email");
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Please enter a valid email");
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Subscribed successfully! Check your inbox.");
      setEmail("");
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-r py-16 from-purple-600 to-pink-600">
      <div className="max-w-3xl mx-auto px-6 text-center text-white">
        <Mail size={48} className="mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
        <p className="mb-6 text-lg">Subscribe to get latest books, exclusive offers, and reading recommendations</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="input flex-1 text-gray-900"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <button 
            type="submit" 
            className="btn bg-white text-purple-600 hover:bg-gray-100 font-semibold"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
      </div>
    </section>
  );
}
