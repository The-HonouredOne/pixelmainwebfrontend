import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";

const TestimonialsSection = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = "https://pixelmainwebbackend.onrender.com/api/clientreviews";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(API_URL);
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-20 text-gray-500 text-lg font-medium">
        Loading testimonials...
      </div>
    );

  if (!reviews.length)
    return (
      <div className="flex justify-center items-center py-20 text-gray-500 text-lg font-medium">
        No testimonials available yet.
      </div>
    );

  return (
    <section className="relative py-20 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f]">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-500 mb-4">
            What Makes Us the Buzz of Tech Town
          </h1>
          <p className="text-gray-400 text-lg font-light">
            Here’s what our business partners say about us.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {reviews.map(
            ({ _id, name, companyName, title, imageUrl, logoUrl, review, rating }) => (
              <motion.div
                key={_id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative bg-[#161616]/80 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header Section */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative">
                    <img
                      src={imageUrl || "/placeholder.jpg"}
                      alt={name}
                      className="w-20 h-20 object-cover rounded-full border-2 border-amber-400"
                    />
                    {logoUrl && (
                      <img
                        src={logoUrl}
                        alt={`${companyName} logo`}
                        className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full border border-gray-700 bg-white p-1"
                      />
                    )}
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-white">{name}</h3>
                    <p className="text-sm text-amber-300 font-medium">
                      {companyName}
                    </p>
                    <div className="flex text-yellow-400 mt-2">
                      {[...Array(rating || 5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Body Section */}
                <div className="bg-gradient-to-br from-[#1e1e1e] to-[#121212] rounded-xl p-6 text-left border border-gray-800">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    {title || "Project Summary"}
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-[15px]">
                    {review}
                  </p>
                </div>

                {/* Accent Gradient Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 rounded-t-xl"></div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
