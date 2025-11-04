import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddClientReview = () => {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    review: "",
    rating: 5,
    image: null,
    logo: null,
  });

  const [loading, setLoading] = useState(false);
  const navigate=useNavigate()
  const API_URL = "https://pixelmainwebbackend.onrender.com/api/clientreviews"; // adjust baseURL if needed

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));

      await axios.post(API_URL, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Success!", "Client review created successfully.", "success");
      setFormData({
        name: "",
        companyName: "",
        review: "",
        rating: 5,
        image: null,
        logo: null,
      });
      navigate('/admin/clientreviews')
    } catch (err) {
      console.error("Error creating review:", err);
      Swal.fire("Error!", "Failed to create review.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-md rounded-lg mt-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add Client Review
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name & Company */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Client Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Company Name
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="e.g. Pixel Genix"
              className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
              required
            />
          </div>
        </div>

        {/* Review */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Review
          </label>
          <textarea
            name="review"
            value={formData.review}
            onChange={handleChange}
            rows="4"
            placeholder="Write the client's review..."
            className="border rounded-lg p-2 w-full focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Rating (1–5)
          </label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            min="1"
            max="5"
            onChange={handleChange}
            className="border rounded-lg p-2 w-24 focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        {/* Image Uploads */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Client Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Company Logo
            </label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="border rounded-lg p-2 w-full"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition disabled:bg-indigo-400 w-full"
        >
          {loading ? "Creating..." : "Create Review"}
        </button>
      </form>
    </div>
  );
};

export default AddClientReview;
