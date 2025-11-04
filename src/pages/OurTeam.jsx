import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const OurMembers = () => {
  const [members, setMembers] = useState([]);
  const swiperRef = useRef(null);




  const getTeam = async () => {
    try {
      const { data } = await axios.get("https://pixelmainwebbackend.onrender.com/api/team");
      setMembers(data);
    } catch (error) {
      console.error("Error fetching team members:", error);
    }
  };

  useEffect(() => {
    getTeam();
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-full mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Our <span className="text-indigo-600">Team</span>
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
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
        >
          {members.length > 0 ? (
            members.map((member, index) => (
              <SwiperSlide key={index} className="h-auto w-25">
                <div className="flex flex-col items-center p-6">
                  {/* Image Section */}
                  <div
                    className="group flex justify-center items-center py-2"
                    onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                    onMouseLeave={() => swiperRef.current?.autoplay?.start()}
                  >
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-50 h-50 mx-auto object-cover rounded-full transition-all duration-500 ease-in-out group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Text Section */}
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                    <p className="text-gray-600 font-medium">{member.role}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center text-gray-500">Loading team members...</p>
          )}
        </Swiper>
      </div>
    </section>
  );
};

export default OurMembers;
