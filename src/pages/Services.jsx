import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaMobileAlt,
  FaCode,
  FaGlobe,
  FaGamepad,
  FaBullhorn,
  FaRocket,
  FaRobot,
  FaShoppingCart,
} from "react-icons/fa";

const iconMap = {
  "mobile app development": <FaMobileAlt className="text-indigo-600 text-3xl" />,
  "software development": <FaCode className="text-indigo-600 text-3xl" />,
  "web development": <FaGlobe className="text-indigo-600 text-3xl" />,
  "game development": <FaGamepad className="text-indigo-600 text-3xl" />,
  "digital marketing": <FaBullhorn className="text-indigo-600 text-3xl" />,
  "on-demand": <FaRocket className="text-indigo-600 text-3xl" />,
  "ai development": <FaRobot className="text-indigo-600 text-3xl" />,
  "ecommerce development": <FaShoppingCart className="text-indigo-600 text-3xl" />,
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);

  //  Fetch services from backend
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/services");
        const fetchedServices = res.data;

        const withIcons = fetchedServices.map((service) => ({
          ...service,
          icon:
            iconMap[service.title?.toLowerCase()] ||
            <FaCode className="text-indigo-600 text-3xl" />,
        }));

        setServices(withIcons);
        setSelectedService(withIcons[0]); // Default to first service
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          Loading services...
        </p>
      </div>
    );

  if (!services.length)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg font-medium">
          No services found.
        </p>
      </div>
    );

  return (
    <section className="bg-gradient-to-br from-white to-indigo-50 py-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-12">
          Our <span className="text-gray-900">Services</span>
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="col-span-1">
            <div className="bg-white p-4 rounded-xl shadow-md space-y-3">
              {services.map((service, i) => (
                <div
                  key={service._id || i}
                  onClick={() => setSelectedService(service)}
                  className={`cursor-pointer p-3 rounded-lg flex items-center gap-3 transition-all duration-200 ${
                    selectedService?._id === service._id
                      ? "bg-indigo-100 border-l-4 border-indigo-500"
                      : "hover:bg-indigo-50"
                  }`}
                >
                  <div>{service.icon}</div>
                  <span className="text-sm font-medium text-gray-800 capitalize">
                    {service.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300">
              {/* ✅ Image */}
              {selectedService?.imageUrl ? (
                <div className="relative h-64 w-full">
                  <img
                    src={selectedService.imageUrl}
                    alt={selectedService.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/800x400?text=No+Image";
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-64 bg-gray-100 text-gray-400">
                  No image available
                </div>
              )}

              {/* ✅ Service Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-indigo-700 mb-3">
                  {selectedService?.title}
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {selectedService?.description}
                </p>

                {/* ✅ Packages Section */}
                {selectedService?.packages?.length > 0 && (
                  <>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">
                      Packages
                    </h4>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {selectedService.packages.map((pkg, i) => (
                        <div
                          key={i}
                          className="bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 p-5 rounded-lg shadow-sm transition duration-300"
                        >
                          <h5 className="text-lg font-semibold text-indigo-700 mb-1">
                            {pkg.name}
                          </h5>
                          <p className="text-gray-600 font-medium mb-2">
                            ₹{pkg.price || "N/A"}
                          </p>
                          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                            {pkg.features?.length ? (
                              pkg.features.map((feature, j) => (
                                <li key={j}>{feature}</li>
                              ))
                            ) : (
                              <li>No features listed</li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
