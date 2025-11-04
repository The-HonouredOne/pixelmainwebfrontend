import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const PortfolioSection = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/portfolios");
        setProjects(res.data || []);
      } catch (err) {
        console.error("Error fetching portfolio items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolios();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center py-16 text-gray-700">
        Loading portfolio...
      </div>
    );

  if (!projects.length)
    return (
      <div className="flex justify-center items-center py-16 text-gray-700">
        No portfolio items found.
      </div>
    );

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-full mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Our <span className="text-indigo-600">Portfolio</span>
        </h2>

        <Swiper
          spaceBetween={30}
          centeredSlides={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{ clickable: true }}
          navigation={false}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            640: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
        >
          {projects.map((item) => (
            <SwiperSlide key={item._id} className="h-auto">
              <div
                className="block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                onMouseLeave={() => swiperRef.current?.autoplay?.start()}
              >
                <div className="overflow-hidden group">
                  <img
                    src={item.imageUrl || "/placeholder-portfolio.jpg"}
                    alt={item.title}
                    className="w-full h-[200px] md:h-[250px] object-cover rounded-md transition-all duration-500 ease-in-out group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-3">{item.description}</p>

                  {item.technologies && item.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default PortfolioSection;
