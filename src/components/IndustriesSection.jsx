import { useState } from "react";
import industryImage1 from "../assets/industryImage1.avif";
import industryImage2 from "../assets/industryImage2.avif";
import industryImage3 from "../assets/industryImage3.avif";
import industryImage4 from "../assets/industryImage4.avif";
import industryImage5 from "../assets/industryImage5.avif";
import industryImage6 from "../assets/industryImage6.avif";
import { useEffect } from "react";
import axios from "axios";
// const industries = [
//   {
//     name: "FinTech",
//     image: industryImage1,
//   },
//   {
//     name: "Healthcare",
//     image:
//       industryImage2,
//   },
//   {
//     name: "Education",
//     image:
//       industryImage3,
//   },
//   {
//     name: "Retail",
//     image:
//       industryImage4,
//   },
//   {
//     name: "Travel & Hospitality",
//     image:
//       industryImage5,
//   },
//   {
//     name: "Logistics",
//     image:
//       industryImage6,
//   },
// ];

const IndustriesSection = () => {


  const [industries, setIndustries]=useState([])

  const handleIndustry=async()=>{
    try {
      const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/industries");
      console.log("Full response:", res.data.industry);
      setIndustries(res.data.industry)
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(()=>{
    handleIndustry()
  },[])


  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
          Industries We <span className="text-indigo-600">Serve</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Empowering businesses across sectors with innovative technology
          solutions tailored to each industry's needs.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map(({ name, imageUrl }) => (
            <div
              key={name}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 p-4 flex flex-col items-center"
            >
              <img
                src={imageUrl}
                alt={name}
                className="h-16 w-16 object-cover rounded-full mb-3 border-2 border-indigo-100"
                loading="lazy"
              />
              <p className="text-gray-800 font-semibold text-sm">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
