import { useEffect, useState } from "react";
import { FaArrowRight, FaStar } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Swiper modules
import { EffectCoverflow, Pagination } from "swiper/modules";

const Client = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
       
        const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/clientreviews");
         console.log('hello', res.data)
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
      <div className="flex items-center justify-center font-bold text-3xl pt-4">
        <h1>Testimonials- Hear From Our Clients </h1>
      </div>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1.4}
        spaceBetween={20}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {reviews.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="container mx-auto w-full h-100 my-10 max-w-7xl flex flex-col sm:flex-row bg-[#2b2d32] bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 rounded-lg py-8">
              {/* Left Side */}
              <div className="w-[50%] h-full px-5 py-4 flex flex-col items-center justify-center sm:flex row">
                <div>
                  <div className="w-[100px] h-[100px] mx-auto flex bg-white rounded-full overflow-hidden border-1 border-white">
                    <img
                      className="rounded-full object-cover mx-auto h-[100px] w-[100px]"
                      src={item.logoUrl || "/placeholder-logo.png"}
                      alt={item.companyName}
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="text-[30px] text-white">{item.companyName}</h2>
                    <h4 className="text-[18px] text-white">{item.name}</h4>

                    <div className="flex text-amber-300 text-2xl justify-center items-center my-2">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-1 border-gray-300 flex flex-col"></div>

              {/* Center */}
              <div className="w-[50%] h-full px-1">
                <div>
                  <div className="w-full h-full flex items-center justify-center">
                    <img
                      src={item.imageUrl || "/placeholder-800x400.png"}
                      alt={item.companyName}
                      className="w-[400px] h-[335px] object-contain block mx-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Right Side */}
              <div className="border-1 border-gray-300 flex flex-col"></div>
              <div className="px-5 w-[50%] flex flex-col justify-center items-center">
                <div>
                  <div className="py-2">
                    <h2 className="font-semibold text-[18px] text-white">{item.name}</h2>
                  </div>

                  <div className="py-2">
                    <p className="text-[16px] text-white">{item.review}</p>
                  </div>

                  <div className="py-2">
                    <button
                      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 px-6 rounded-lg shadow-lg text-white flex items-center gap-1 cursor-pointer"
                      onClick={() => navigate("/testimonialsSection")}
                    >
                      Read Full Review <FaArrowRight className="w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default Client;
