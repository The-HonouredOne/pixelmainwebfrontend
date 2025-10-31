import React, { useState } from 'react';
import axios from 'axios';

const CreateServicebox = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');



    const token = localStorage.getItem('adminToken')
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) {
      setMessage("Name is required");
      return;
    }
    
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);
    
    try {
      const response = await axios.post('https://pixelmainwebbackend.onrender.com/api/servicebox', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}` 
        }
      });
      setMessage(response.data.msg);
      setName('');
      setImage(null);
    } catch (error) {
      setMessage('Error creating service');
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg my-10">
      {/* <h2 className="text-2xl font-semibold text-center mb-4">Create Service</h2> */}
      {message && <p className="text-red-500 text-center">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Service
        </button>
      </form>
    </div>
  );
};

export default CreateServicebox;
