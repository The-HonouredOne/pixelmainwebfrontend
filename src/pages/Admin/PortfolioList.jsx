import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const PortfolioList = () => {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch portfolios
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/portfolios");
        setPortfolios(res.data);
      } catch (err) {
        console.error("Error fetching portfolios:", err);
        Swal.fire("Error", "Failed to fetch portfolios", "error");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Delete portfolio
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the portfolio!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`https://pixelmainwebbackend.onrender.com/api/portfolios/${id}`);
      setPortfolios((prev) => prev.filter((p) => p._id !== id));
      Swal.fire("Deleted!", "Portfolio deleted successfully.", "success");
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire("Error", "Failed to delete portfolio", "error");
    }
  };

  if (loading)
    return <div className="text-center py-10 text-gray-600">Loading portfolios...</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Manage Portfolios</h1>
        <button
          onClick={() => navigate("/admin/createportfolio")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
        >
          + Create Portfolio
        </button>
      </div>

      {/* Table/Grid */}
      {portfolios.length === 0 ? (
        <div className="text-center text-gray-500 py-10">No portfolios found.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {portfolios.map((item) => (
            <div
              key={item._id}
              className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition overflow-hidden bg-white"
            >
              {/* Image */}
              <div className="h-44 w-full overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                  {item.description}
                </p>

                {/* Technologies */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.technologies?.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {item.technologies?.length > 4 && (
                    <span className="text-xs text-gray-500">+{item.technologies.length - 4}</span>
                  )}
                </div>

                {/* Actions */}
                <div className=" ">
                
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-white mt-4 bg-red-600 px-2 py-1 rounded text-sm cursor-pointer"
                  >
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

export default PortfolioList;
