import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch portfolio data from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/portfolios");
        // console.log(res.data)
        setProjects(res.data  || []);
      } catch (err) {
        console.error("Error fetching portfolios:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const selectedProject = projects.find((p) => p._id === selectedId);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <>
      <section>
        {/* Hero Section */}
        <div className="relative h-[100vh] flex items-center justify-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1581091012184-5c7aca3893d4?auto=format&fit=crop&q=80&w=1600')",
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
          <motion.div
            className="relative z-10 text-white text-center px-6 max-w-4xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Crafting Digital Success Stories with{" "}
              <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                Pixel Genix
              </span>
            </h2>
            <p className="text-md md:text-lg">
              Explore our diverse portfolio of projects where we empowered
              businesses to lead with smart, scalable, and future-ready digital
              products.
            </p>
          </motion.div>
        </div>

        {/* Portfolio Section */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold text-center mb-12">
            Our <span className="text-indigo-600">Portfolio</span>
          </h1>

          {selectedId === null ? (
            <Swiper
              spaceBetween={30}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
            >
              {projects.map(({ _id, title, description, imageUrl }) => (
                <SwiperSlide key={_id}>
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition cursor-pointer bg-white"
                    onClick={() => setSelectedId(_id)}
                  >
                    <img
                      src={imageUrl}
                      alt={title}
                      className="w-full h-52 object-cover"
                    />

                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">{title}</h3>
                      <p className="text-gray-600 text-sm">{description}</p>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                ← Back to Portfolio
              </button>
              <img
                src={selectedProject?.imageUrl || selectedProject?.imageUrl}
                alt={selectedProject?.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
              <h2 className="text-2xl font-bold mb-2">
                {selectedProject?.title}
              </h2>
              <p className="text-gray-700 mb-4">
                {selectedProject?.description}
              </p>

              {selectedProject?.technologies?.length > 0 && (
                <>
                  <h4 className="text-lg font-semibold mb-1">
                    Technologies Used:
                  </h4>
                  <ul className="list-disc list-inside text-gray-700 mb-4">
                    {selectedProject.technologies.map((tech, index) => (
                      <li key={index}>{tech}</li>
                    ))}
                  </ul>
                </>
              )}

              {selectedProject?.howBuilt && (
                <>
                  <h4 className="text-lg font-semibold mb-1">How We Built It:</h4>
                  <p className="text-gray-700 mb-4">
                    {selectedProject.howBuilt}
                  </p>
                </>
              )}

              {selectedProject?.whyBetter && (
                <>
                  <h4 className="text-lg font-semibold mb-1">
                    Why This is Better for You:
                  </h4>
                  <p className="text-gray-700">{selectedProject.whyBetter}</p>
                </>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default Portfolio;
