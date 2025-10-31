import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminClientReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null); // 👈 track which review is being deleted
  const navigate = useNavigate();

  const API_URL = "https://pixelmainwebbackend.onrender.com/api/clientreviews";

  // Fetch all reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(API_URL);
      setReviews(res.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    setDeletingId(id); // 👈 mark this review as deleting

    try {
      await axios.delete(`${API_URL}/${id}`);
      Swal.fire("Deleted!", "Client review deleted.", "success");
      fetchReviews();
    } catch (err) {
      console.error("Error deleting review:", err);
      Swal.fire("Error", "Failed to delete review.", "error");
    } finally {
      setDeletingId(null); // 👈 reset deleting state
    }
  };

  if (loading)
    return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Client Reviews Dashboard
        </h1>
        <button
          onClick={() => navigate("/admin/addclientreview")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Add Review
        </button>
      </div>

      {/* All Reviews List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3 mb-3">
              <img
                src={item.logoUrl || "/placeholder-logo.png"}
                alt="Logo"
                className="w-10 h-10 object-contain rounded-full border"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.companyName}</p>
              </div>
            </div>

            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-40 object-cover rounded-md mb-3"
              />
            )}

            <p className="text-gray-600 text-sm mb-2">“{item.review}”</p>

            <div className="flex items-center justify-between mt-2">
              <span className="text-yellow-500 text-sm">
                ⭐ {item.rating}/5
              </span>
              <button
                onClick={() => handleDelete(item._id)}
                disabled={deletingId === item._id} // 👈 disable if deleting
                className={`text-sm font-semibold rounded-md px-3 py-1 transition ${
                  deletingId === item._id
                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                    : "text-red-500 hover:text-red-700"
                }`}
              >
                {deletingId === item._id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminClientReviews;
