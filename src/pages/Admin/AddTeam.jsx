import React, { useState } from 'react';
import axios from 'axios';

const AddTeam = () => {
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    image: null,
  });

  const [message, setMessage] = useState('');

  const token = localStorage.getItem('adminToken')

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setMessage('Name is required');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const response = await axios.post('https://pixelmainwebbackend.onrender.com/api/team', data, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }, 
      });

      setMessage(response.data.msg || 'Team member added successfully!');
      setFormData({ name: '', role: '', image: null });
    } catch (error) {
      console.error(error);
      setMessage('Error creating team');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10">
      {message && <p className="text-red-500 text-center mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role:</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image:</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add to Team
        </button>
      </form>
    </div>
  );
};

export default AddTeam;
