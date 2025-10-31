import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BlogList = ({ refresh }) => {
  const [blogs, setBlogs] = useState([]);

  const token = localStorage.getItem('adminToken')



  const fetchBlogs = async () => { 
    try {
      const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/blog", {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setBlogs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the blog",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });
    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`https://pixelmainwebbackend.onrender.com/api/blog/${id}`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        }
      });
      Swal.fire("Deleted!", "Blog deleted successfully", "success");
      fetchBlogs();
    } catch (err) {
      Swal.fire("Error", err.response?.data?.msg || "Failed to delete blog", "error");
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [refresh]);


  const navigate=useNavigate()

  return (
    <div className="mt-10 w-full max-w-4xl mx-auto">


      <button className="flex flex-row text-right items-end rounded cursor-pointer p-1 justify-end shadow hover:text-blue-500 bg-green-500 mb-10 text-white text-xl"
        onClick={() => navigate('/admin/blogs')}
      >
        Add a Blog
      </button>



      <h2 className="text-xl font-semibold mb-4">All Blogs</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog._id} className="border rounded-xl p-4 shadow-md bg-white">
            {blog.imageUrl && (
              <img src={blog.imageUrl} alt={blog.title} className="rounded-lg w-full h-48 object-cover mb-3" />
            )}
            <h3 className="text-lg font-semibold">{blog.title}</h3>
            <p className="text-gray-500 text-sm mb-2">By: {blog.name}</p>
            <p className="text-gray-700 text-sm mb-3">{blog.description}</p>
            <button
              onClick={() => handleDelete(blog._id)}
              className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;
