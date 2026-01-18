import { Link } from "react-router";
import { BookOpen, Briefcase, Heart, Lightbulb, Rocket, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function Categories() {
  const categories = [
    { name: "Fiction", icon: <BookOpen size={32} />, color: "bg-blue-500" },
    { name: "Business", icon: <Briefcase size={32} />, color: "bg-green-500" },
    { name: "Romance", icon: <Heart size={32} />, color: "bg-pink-500" },
    { name: "Self-Help", icon: <Lightbulb size={32} />, color: "bg-yellow-500" },
    { name: "Sci-Fi", icon: <Rocket size={32} />, color: "bg-purple-500" },
    { name: "Education", icon: <GraduationCap size={32} />, color: "bg-indigo-500" },
  ];

  return (
    <section className="">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((cat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                to={`/books?category=${cat.name}`}
                className="flex flex-col items-center p-6 rounded-xl bg-gray-800 text-white  hover:bg-gray-700 transition group"
              >
                <div className={`${cat.color} p-4 rounded-full mb-3 group-hover:scale-110 transition text-white`}>
                  {cat.icon}
                </div>
                <span className="font-semibold">{cat.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
