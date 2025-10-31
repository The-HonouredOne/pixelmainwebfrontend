
// import AjaySir from '../assets/AjaySir.jpg';
import AnkitSir from '../assets/AnkitSir.jpg'
import VeenaMam from '../assets/VeenaMam.jpg'
import RahulSir from '../assets/RahulSir.jpg'

import Ajay from '../assets/Ajay.jpg'
import HeavenSir from '../assets/HEAvenSir.jpg'
import vanshika from '../assets/Vanshika.jpg'
import Lucky1 from '../assets/Lucky1.jpg'
import Goransh from '../assets/Goransh.jpg'
// Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useRef } from "react";
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'

// const projects = [


//   {
//     name: " Mr Rahul Yadav",
//     Roll: 'Project Manager',
//     image: RahulSir,
//   },
//   {
//     name: "Mr Ankit Parmar",
//     Roll: 'Full Stack Developer',
//     image: AnkitSir,
//   },

//   {
//     name: "Mr Havan Mishra",
//     Roll: 'Entrepreneur',
//     image: HeavenSir,
//   },
//   {
//     name: " Miss Vanshikha Sharma",
//     Roll: "Frontend Developer",
//     image: vanshika,
//   },
//   {
//     name: " Mr Lucky Kumawat",
//     Roll: "Web Developer",
//     image: Lucky1,
//   },
//   {
//     name: " Mr Goransh Khandelwal",
//     Roll: "Graphic Designer",
//     image: Goransh,
//   }

// ];

const OurMembers = () => {
  const swiperRef = useRef(null);
  const [member, setMember]=useState([])


  const handleMember=async()=>{
const res=await axios.get('https://pixelmainwebbackend.onrender.com/api/ourmember')
console.log(res.data)
setMember(res.data)

  }

  useEffect(()=>{
    handleMember()
  },[])


  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-full mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Our <span className="text-indigo-600">Members</span>
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
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {member.map(({ title, imageUrl, name, Exprience, Roll }, index) => (
            <SwiperSlide key={index} className="h-auto w-25">
              <div className=" flex flex-col items-center p-6 ">
                {/* Image Section */}
                <div
                  className=" group flex justify-center items-center py-2"
                  onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
                  onMouseLeave={() => swiperRef.current?.autoplay?.start()}
                >
                  <img
                    src={imageUrl}
                    alt={title}
                    className="w-50 h-50 mx-auto object-cover rounded-full transition-all duration-500 ease-in-out group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                {/* Text Section */}
                <div className="text-center mt-4">
                  <h3 className="text-xl font-semibold mb-1">{name}</h3>
                  <p className="text-gray-600 font-medium">{title}</p>
                  {/* <p className="text-gray-600 font-medium">{Exprience}</p> */}
                  <p className="text-gray-600 font-medium">{Roll}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OurMembers;
