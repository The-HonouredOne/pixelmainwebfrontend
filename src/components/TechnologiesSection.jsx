import React from "react";
import { motion } from "framer-motion";

const technologies = [
  "MERN/MEAN", "PHP with MySQL", "Java", "AI with Python", "iOS App Development", "React Native", "Swift", "Flutter", "Kotlin", "Angular", "Vue.JS", "Ionic", "AI / ML", "Python", "Blockchain",
  "TensorFlow",
  "Software Testing",
  "Cloud Computing",
  ,

];

const TechnologiesSection = () => {
  return (
    <section className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] py-20">
      <div className="max-w-7xl mx-auto px-6 text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold mb-4"
        >
          Technologies We <span className="text-indigo-400">Root For</span>
        </motion.h2>
        <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
          Your Trusted Partner Navigating the Digital Era with Innovation, Scalability & Intelligence.
        </p>

        <div className="flex flex-wrap justify-center gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="backdrop-blur-lg bg-white/5 border border-white/10 text-white px-6 py-3 rounded-2xl shadow-md hover:shadow-xl hover:bg-white/10 transition-all duration-300 font-medium text-lg"
            >
              {tech}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesSection;
