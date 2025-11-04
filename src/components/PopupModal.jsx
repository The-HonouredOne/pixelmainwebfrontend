import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import logo from "../assets/logo.jpg";
import { FaArrowCircleRight } from "react-icons/fa";

const PopupModal = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://pixelmainwebbackend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your message has been sent successfully!",
        });
        setShowModal(false);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Try again later.",
      });
    }
  };

return (
  <>
    {showModal && (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4">
        <div
          className="
            bg-white w-full max-w-5xl rounded-2xl shadow-2xl relative 
            overflow-y-auto max-h-[90vh] sm:max-h-[85vh]
            animate-fadeIn
          "
        >
          {/* Close Button */}
          <button
            onClick={() => setShowModal(false)}
            className="sticky top-2 right-2 ml-auto mr-3 text-3xl font-bold text-gray-500 hover:text-red-600 transition z-50"
          >
            ×
          </button>

          <div className="grid md:grid-cols-2">
            {/* LEFT SIDE */}
            <div className="bg-blue-50 p-5 sm:p-8 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
                  Wait! Before You Press <span className="text-red-600">X</span>,
                </h2>
                <p className="text-lg sm:text-2xl font-semibold text-gray-800 mb-5">
                  See What You Could Gain!
                </p>

                <ul className="space-y-4 text-gray-700 text-sm sm:text-base">
                  <li className="flex gap-3 items-start">
                    <FaArrowCircleRight className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Free Exact Time & Cost Estimation
                      </p>
                      <p className="text-sm text-gray-600">
                        Get precise estimation for your project — no surprises, only clarity.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3 items-start">
                    <FaArrowCircleRight className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        AI-Driven Revenue Boost
                      </p>
                      <p className="text-sm text-gray-600">
                        Discover how AI can 10× your business growth and efficiency.
                      </p>
                    </div>
                  </li>

                  <li className="flex gap-3 items-start">
                    <FaArrowCircleRight className="text-blue-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900">
                        Avoid Common Pitfalls
                      </p>
                      <p className="text-sm text-gray-600">
                        Learn why 90% of startups fail and how you can be in the top 10%.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="flex justify-start gap-3 mt-6 flex-wrap">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
                  alt="AWS"
                  className="h-5 sm:h-7"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo.svg"
                  alt="Azure"
                  className="h-5 sm:h-7"
                />
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                  alt="Google"
                  className="h-5 sm:h-7"
                />
              </div>
            </div>

            {/* RIGHT SIDE - Form */}
            <div className="p-5 sm:p-8">
              <p className="text-xs sm:text-sm text-red-500 font-medium mb-3">
                * Mandatory Field
              </p>
              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <span className="px-3 text-gray-600 text-sm">+91</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="flex-1 px-3 py-2 focus:ring-0 focus:outline-none text-sm"
                  />
                </div>
                <input
                  type="text"
                  name="budget"
                  placeholder="Budget (Optional)"
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm"
                />
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-sm"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition-all duration-300 text-sm"
                >
                  SUBMIT
                </button>
              </form>

              <div className="flex items-center justify-center mt-4 gap-2">
                <img src={logo} alt="Logo" className="h-5 w-5 rounded-full" />
                <p className="text-xs text-gray-500">Trusted by 100+ Global Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
);

};

export default PopupModal;
