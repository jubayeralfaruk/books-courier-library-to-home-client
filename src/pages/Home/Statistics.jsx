import { motion } from "framer-motion";
import { BookOpen, Users, TruckIcon, Star } from "lucide-react";

export default function Statistics() {
  const stats = [
    { icon: <BookOpen size={40} />, value: "10,000+", label: "Books Available" },
    { icon: <Users size={40} />, value: "5,000+", label: "Happy Readers" },
    { icon: <TruckIcon size={40} />, value: "50+", label: "Delivery Areas" },
    { icon: <Star size={40} />, value: "4.8/5", label: "Average Rating" },
  ];

  return (
    <section className="bg-gradient-to-r py-16 from-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <h3 className="text-4xl font-bold">{stat.value}</h3>
              <p className="text-blue-100 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
