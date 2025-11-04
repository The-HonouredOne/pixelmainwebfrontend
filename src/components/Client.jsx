import { useEffect, useState } from "react";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination } from "swiper/modules";

const Client = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/clientreviews");
        setReviews(res.data);
      } catch (err) {
        console.error("Error fetching client reviews:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center text-white py-10">
        Loading testimonials...
      </div>
    );

  if (!reviews.length)
    return (
      <div className="flex items-center justify-center text-white py-10">
        No client reviews yet.
      </div>
    );

  return (
    <>
      <div className="flex items-center justify-center font-bold text-3xl pt-4 text-white text-center">
        <h1>Testimonials - Hear From Our Clients</h1>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.1}
        spaceBetween={20}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {reviews.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="container mx-auto max-w-6xl my-10 bg-[#2b2d32] bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-lg p-6 flex flex-col lg:flex-row lg:items-center gap-6">

              {/* Left: Logo + Company Info */}
              <div className="flex flex-col items-center text-center lg:w-1/3">
                <div className="w-24 h-24 bg-white rounded-full overflow-hidden border border-white mb-3">
                  <img
                    src={item.logoUrl || "/placeholder-logo.png"}
                    alt={item.companyName}
                    className="object-cover w-full h-full"
                  />
                </div>
                <h2 className="text-xl md:text-2xl font-semibold text-white">{item.companyName}</h2>
                <h4 className="text-sm md:text-lg text-gray-200">{item.name}</h4>
                <div className="flex text-amber-300 text-lg md:text-xl justify-center items-center my-2">
                  {[...Array(item.rating || 5)].map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
              </div>

              {/* Middle: Image */}
              <div className="lg:w-1/3 w-full flex justify-center items-center">
                <img
                  src={item.imageUrl || "/placeholder-800x400.png"}
                  alt={item.companyName}
                  className="object-contain w-[90%] max-h-[300px] rounded-lg"
                />
              </div>

              {/* Right: Review */}
              <div className="lg:w-1/3 w-full text-center lg:text-left flex flex-col justify-center items-center lg:items-start">
                <h2 className="text-lg md:text-xl font-semibold text-white mb-2">
                  {item.name}
                </h2>
                <p className="text-sm md:text-base text-gray-200 mb-4 px-2 md:px-0">
                  {item.review}
                </p>
                <button
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 px-6 rounded-lg shadow-lg text-white flex items-center gap-1 hover:scale-105 transition-transform"
                  onClick={() => navigate("/testimonialsSection")}
                >
                  Read Full Review <FaArrowRight className="w-5" />
                </button>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Client;
