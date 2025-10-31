import React, { useState } from "react";
import {
  FaMobileAlt,
  FaCode,
  FaGlobe,
  FaGamepad,
  FaBullhorn,
  FaRocket,
  FaArrowRight,

} from "react-icons/fa";
import { FaArrowsLeftRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import OurTeam from '../assets/OurTeam.png'
import HowWeServe from '../assets/HowWEserve.jpg'
import Media from '../assets/Media.png'
import operate from '../assets/Operate.png'
import BusinessModal from '../assets/BusinessModal.png'
import recognition from '../assets/recognition.png'

// import appDevelopmentImage from "../assets/appdevelpoment.jpg";

const serviceData = [
  {
    title: "Our Story",
    text: 'Driven by Passion, Built with Code',
    description:
      `Pixelgenix IT Solutions started with a vision to turn creative ideas into powerful digital solutions. Based in Jaipur, we are a passionate team of developers, designers, and strategists helping businesses grow through custom websites, apps, branding, and digital marketing.
      From startups to enterprises, we focus on quality, creativity, and user experience.
      We don’t just build products — we build value.`,
    icon: <FaMobileAlt className="text-indigo-600 text-4xl" />,
    image: Media,

  },
  {
    title: "Who We Serve",
    text: 'Cutting-Edge IT Solutions for Next-Gen Entertainment',
    description:
      "We serve a diverse client base ranging from small startups to large enterprises across industries like e-commerce, logistics, healthcare, education, and finance. Our solutions are crafted to align with each client’s goals — whether it's building a scalable web platform, a mobile app, or an AI-powered system",
    icon: <FaCode className="text-indigo-600 text-4xl" />,
    image: HowWeServe,

  },
  {
    title: "How we Operate",
    text: 'Our Approach to Success',
    description:
      "At PixelGenix, we follow a transparent and agile development process. From initial consultation to final deployment, we prioritize communication, flexibility, and timely delivery. Our team collaborates closely with clients, ensuring each solution is tailor-made, scalable, and future-proof.",
    icon: <FaGlobe className="text-indigo-600 text-4xl" />,
    image: operate,


  },
  {
    title: "Meet The Team",
    text: 'Behind Every Great Company is a Great Team',
    description: "Our team is a blend of experienced engineers, creative designers, strategic thinkers, and passionate project managers. Each member brings a unique skill set, united by a shared goal: to build impactful digital products. Together, we turn ideas into reality.",
    icon: <FaGamepad className="text-indigo-600 text-4xl" />,
    image: OurTeam,


  },
  {
    title: "Business Modal",
    text: 'Built for Impact: Our Unique Business Approach',
    description:
      "We offer flexible engagement models that fit your business needs — whether it’s fixed pricing, hourly billing, or dedicated team allocation. Our approach is customer-first: we adapt to your workflow and ensure cost-effective, high-quality delivery every time.",
    icon: <FaBullhorn className="text-indigo-600 text-4xl" />,
    image: BusinessModal


  },
  {
    title: "Recognition",
    text: 'Recognition: Celebrating Excellence and Achievements',
    description: "Over the years, we’ve been recognized for innovation, design excellence, and client satisfaction. From industry awards to heartfelt testimonials, these recognitions are a reflection of our commitment to excellence and the strong relationships we’ve built with our clients.",
    icon: <FaRocket className="text-indigo-600 text-4xl" />,
    image: recognition,


  },

];

const About = () => {
  const [selectedService, setSelectedService] = useState(serviceData[0]);
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-white to-indigo-50 py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">
          About <span className="text-gray-900">US</span>
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Left Sidebar */}
          <div className="col-span-1">
            <div className="bg-white p-4 rounded-xl shadow-md space-y-3">
              {serviceData.map((service, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedService(service)}
                  className={`cursor-pointer p-3 rounded-lg transition-all duration-200 flex items-center gap-3 hover:bg-indigo-50 ${selectedService.title === service.title
                    ? "bg-indigo-100 border-l-4 border-indigo-500"
                    : ""
                    }`}
                >
                  <div>{service.icon}</div>
                  <span className="text-sm font-medium text-gray-800">
                    {service.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="col-span-3 relative">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 p-6 flex flex-col justify-between h-full ">

              {/* Content Box */}
              {/* <div className="z-10 w-70">
                <h1 className="text-[32px] font-semibold">{selectedService.text}</h1>
                <p className="text-gray-700 mb-6 text-justify">{selectedService.description}</p>
                <button onClick={() => navigate('/our-story-page')} className="bg-indigo-600 px-6 py-2 text-white rounded-md inline-flex items-center gap-2 cursor-pointer font-semibold">Know More <FaArrowRight />

                </button>
              </div>   */}

              <div className="z-10 w-70">
                <h1 className="text-[28px] font-semibold leading-9 my-3">{selectedService.text}</h1>
                <p className=" mb-6 text-justify">{selectedService.description}</p>
                <button
                  onClick={() =>
                    selectedService.title === 'Our Story'
                      ? navigate('/our-story')   
                      : selectedService.title === 'Who We Serve'
                      ? navigate('/who-we-serve')
                      : selectedService.title === 'How we Operate'
                      ? navigate('/how-we-operate')
                      : selectedService.title === 'Meet The Team'
                      ? navigate('/meet-the-team')
                      : selectedService.title === 'Business Modal'
                      ? navigate('/business-modal')
                      : selectedService.title === 'Recognition'
                      ? navigate('/recognition')
                  : navigate('error') // default fallback
                  }
                  className="bg-indigo-600 px-6 py-2 text-white rounded-md inline-flex items-center gap-2 cursor-pointer font-semibold">
                  Know More <FaArrowRight />
                </button>
              </div>


              {/* Image in bottom-right corner */}
              {selectedService.image && (
                <div className="absolute bottom-0 right-3 w-100 h-100 rounded-lg overflow-hidden ">
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    className="w-full h-full object-cover "
                  />
                </div>

              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
