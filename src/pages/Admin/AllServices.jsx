import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FaTrashAlt, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("adminToken");

  // Fetch all services
  const fetchServices = async () => {
    try {
      setLoading(true);
      const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/services", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setServices(res.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      Swal.fire("Error", "Failed to load services", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Delete service
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the service",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`https://pixelmainwebbackend.onrender.com/api/services/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire("Deleted!", "Service deleted successfully.", "success");
      setServices((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      Swal.fire("Error", "Failed to delete service", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
          All Services
        </h1>
        <button
          onClick={() => navigate("/admin/createservice")}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
        >
          <FaPlus className="text-sm" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Loading State */}
      {loading && (
        <p className="text-center text-gray-500 mt-20">Loading services...</p>
      )}

      {/* Empty State */}
      {!loading && services.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
            alt="No services"
            className="w-24 h-24 mb-4 opacity-70"
          />
          <p className="text-gray-600 mb-4">No services found.</p>
          <button
            onClick={() => navigate("/admin/createservice")}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
          >
            Add Your First Service
          </button>
        </div>
      )}

      {/* Services Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {services.map((service) => (
          <div
            key={service._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 duration-200 flex flex-col"
          >
            <img
              src={service.imageUrl}
              alt={service.title}
              className="w-full h-52 object-cover rounded-t-xl"
            />
            <div className="p-4 flex flex-col justify-between flex-grow">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                  {service.description}
                </p>

                {/* Packages */}
                {service.packages?.length > 0 && (
                  <div className="border-t pt-2 mt-2">
                    <h4 className="text-sm font-semibold text-gray-700 mb-1">
                      Packages:
                    </h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {service.packages.map((pkg, index) => (
                        <li
                          key={index}
                          className="bg-gray-100 px-2 py-1 rounded-md flex justify-between"
                        >
                          <span className="font-medium">{pkg.name}</span>
                          <span className="text-gray-500">
                            {pkg.price ? `₹${pkg.price}` : "Free"}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(service._id)}
                className="mt-4 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-md transition"
              >
                <FaTrashAlt className="text-sm" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllServices;
