import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const faqs = [
    { 
      q: "How does book delivery work?", 
      a: "We deliver books from nearby libraries to your doorstep within 24-48 hours. Simply browse, order, and we'll handle the rest!" 
    },
    { 
      q: "What is the delivery charge?", 
      a: "Delivery is free for orders above ৳500. Below that, a ৳50 delivery fee applies to cover logistics costs." 
    },
    { 
      q: "Can I return a book?", 
      a: "Yes, you can return within 7 days if the book is in original condition. Contact our support team to initiate a return." 
    },
    { 
      q: "How do I become a seller?", 
      a: "Click 'Apply as Seller' in your dashboard and submit required documents. Our team will review and approve within 2-3 business days." 
    },
    { 
      q: "What payment methods do you accept?", 
      a: "We accept all major credit/debit cards, mobile banking (bKash, Nagad), and cash on delivery for eligible areas." 
    },
    { 
      q: "How can I track my order?", 
      a: "Go to Dashboard > My Orders to see real-time tracking information and delivery status for all your orders." 
    },
  ];

  return (
    <section className="pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-700 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpen(open === idx ? null : idx)}
                className="w-full flex justify-between items-center p-4 text-left hover:bg-gray-800 hover:text-gray-300 transition"
              >
                <span className="font-semibold pr-4">{faq.q}</span>
                <ChevronDown 
                  className={`transition-transform duration-300 flex-shrink-0 ${open === idx ? "rotate-180" : ""}`} 
                  size={20}
                />
              </button>
              <AnimatePresence>
                {open === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 bg-gray-800 text-gray-300 border-t border-gray-700">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
