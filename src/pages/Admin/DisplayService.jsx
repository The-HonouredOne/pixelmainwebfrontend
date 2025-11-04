import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Image as ImageIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [message, setMessage] = useState("");

  const token = localStorage.getItem('adminToken')

  const fetchServices = async () => {
    try {
      const response = await axios.get("https://pixelmainwebbackend.onrender.com/api/servicebox", {
        headers:{Authorization: `Bearer ${token}` }
      });

      setServices(response.data);
    } catch (error) {
      setMessage("⚠️ Error fetching services");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await axios.delete(`https://pixelmainwebbackend.onrender.com/api/servicebox/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Service deleted')
      setServices((prev) => prev.filter((service) => service._id !== id));
    } catch (error) {
      setMessage("❌ Error deleting service");
    }
  };


  const navigate=useNavigate()



  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gray-50 min-h-screen">

        <button  className="flex flex-row text-right items-end rounded cursor-pointer p-1 justify-end bg-blue-500 mb-10 text-white text-xl"
        onClick={()=>navigate('/admin/createservicebox')}
         >
          Add a service
        </button>
      

      {message && (
        <div className="text-center mb-6 text-red-600 font-medium">
          {message}
        </div>
      )}

      {services.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No services found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 rounded-2xl overflow-hidden group"
            >
              {/* Image section */}
              <div className="relative">
                {service.imageUrl ? (
                  <img
                    src={service.imageUrl}
                    alt={service.name}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex items-center justify-center h-52 bg-gray-100 text-gray-400">
                    <ImageIcon size={48} />
                  </div>
                )}
              </div>

              {/* Content section */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {service.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  Added on:{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(service.createdAt).toLocaleDateString()}
                  </span>
                </p>

                <div className="flex justify-end">
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="flex items-center gap-2 bg-red-600 text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceList;
