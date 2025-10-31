import ourPortfolio1 from "../assets/ourPortfolio1.avif";
import ourPortfolio2 from "../assets/ourPortfolio2.avif";
import ourPortfolio3 from "../assets/ourPortfolio3.avif";
import ourPortfolio4 from "../assets/ourPortfolio4.avif";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef } from "react";

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


// Replace with your actual image import
const projects = [
  {
    title: "E-Commerce Mobile App",
    image: ourPortfolio1,
    description:
      "A scalable and feature-rich e-commerce mobile application for Android and iOS.",
    // link: "/portfolio/ecommerce-app",
  },
  {
    title: "SaaS Web Platform",
    image: ourPortfolio2,
    description:
      "Cloud-based SaaS platform with multi-tenant architecture and advanced analytics.",
    // link: "/portfolio/saas-platform",
  },
  {
    title: "Healthcare Portal",
    image: ourPortfolio3,
    description:
      "Secure and HIPAA-compliant healthcare management portal for patients and doctors.",
    // link: "/portfolio/healthcare-portal",
  },
  {
    title: "Travel Booking Website",
    image: ourPortfolio4,
    description:
      "User-friendly travel booking website with integrated payment gateways.",
    // link: "/portfolio/travel-booking",
  },

  {
    title: "Education Website",
    image: 'https://images.unsplash.com/photo-1642054220431-649c53b0d3de?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      "A responsive and user-centric education platform offering interactive courses, live classes, and secure enrollment system.",
    // link: "/portfolio/Education Website",
  },
  {
    title: "Retail Management System Website",
    image: 'https://plus.unsplash.com/premium_photo-1665203440894-75ed245def8e?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      "A modern retail management web and mobile solution with inventory tracking, POS integration, and customer analytics.",
    // link: "/portfolio/retail-management",
  },

  {
    title: "Logistics & Fleet Management System",
    image: 'https://plus.unsplash.com/premium_photo-1749957518506-43b55b3026e7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    description:
      "A real-time logistics and fleet management platform with route optimization, shipment tracking, and driver performance monitoring.",
    // link: "/portfolio/logistics-platform",
  }
];






const PortfolioSection = () => {
  const swiperRef = useRef(null)


  return (


    <section className="bg-gray-50 py-16">
      <div className="max-w-full  mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Our <span className="text-indigo-600">Portfolio</span>
        </h2>


        <Swiper
          spaceBetween={30}
          centeredSlides={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter:true
          }}
          pagination={{
            clickable: true,
          }}
          navigation={false}

          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2, // Medium screen pe 2 slides
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }}
        >



          {projects.map(({ title, image, description, link }) => (
            <SwiperSlide key={title} className="h-auto">


              <a
                // key={title}
                href={link}
                className="block bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="overflow-hidden group"

                  onMouseEnter={() => swiperRef.current.autoplay?.stop()}
                  onMouseLeave={() => swiperRef.current.autoplay?.start()}

                >
                  <img
                    src={image}
                    alt={title}
                    className="w-full mx-auto h-[200px] object-cover rounded-md transition-all duration-500 ease-in-out group-hover:scale-110 group-hover:h-[220px] "
                    loading="lazy"

                  />

                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{title}</h3>
                  <p className="text-gray-600">{description}</p>
                </div>
              </a>
            </SwiperSlide>
          ))}

        </Swiper >
      </div>

    </section >



  );
};

export default PortfolioSection;
