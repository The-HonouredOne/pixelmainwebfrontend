// src/pages/BlogPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [activeCat, setActiveCat] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const PER_PAGE = 6;

  // Fetch blogs from backend
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://pixelmainwebbackend.onrender.com/api/blog"); // change base URL if required
        setBlogs(res.data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Helper: format createdAt into "12 June, 2025" in Asia/Kolkata timezone
  const formatDate = (isoOrDate) => {
    if (!isoOrDate) return "";
    const d = new Date(isoOrDate);
    // Use toLocaleString parts to ensure the timezone is Asia/Kolkata and format exactly as requested
    const day = d.toLocaleString("en-GB", { day: "2-digit", timeZone: "Asia/Kolkata" });
    const month = d.toLocaleString("en-GB", { month: "long", timeZone: "Asia/Kolkata" });
    const year = d.toLocaleString("en-GB", { year: "numeric", timeZone: "Asia/Kolkata" });
    return `${day} ${month}, ${year}`;
  };

  // Categories derived from fetched blogs
  const categories = ["All", ...Array.from(new Set(blogs.map((b) => b.category).filter(Boolean)))];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = activeCat === "All" || blog.category === activeCat;
    const matchesSearch = blog.title?.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredBlogs.length / PER_PAGE);
  const displayPosts = filteredBlogs.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero + Search */}
      <div className="py-16 bg-gray-100">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto px-6 text-center"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Insights on Technology That Builds Futuristic Businesses
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            Explore expert articles around mobile, fintech, app ideas, and more.
          </p>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search..."
            className="w-full md:w-2/3 p-3 rounded-md border border-gray-300 focus:ring-indigo-500 focus:outline-none"
          />
        </motion.div>
      </div>

      {/* Categories Tabs */}
      <div className="mt-8 max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCat(cat);
                setPage(1);
                setSelectedPost(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${activeCat === cat ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-700"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading ? (
          <p className="text-center text-gray-600">Loading blogs...</p>
        ) : selectedPost ? (
          // Single Post Detail View
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <img
                src={selectedPost.imageUrl || selectedPost.imageUrl || selectedPost.image} // try common fields
                alt={selectedPost.title}
                className="w-full h-96 object-cover rounded"
              />
              <h2 className="text-3xl font-bold mt-6 mb-2 text-gray-800">
                {selectedPost.title}
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                By {selectedPost.name || selectedPost.author} | {formatDate(selectedPost.createdAt || selectedPost.created_at || selectedPost.date)}
              </p>
              <p className="text-lg text-gray-700 whitespace-pre-wrap">
                {selectedPost.description || selectedPost.content}
              </p>
            </div>

            <div className="bg-gray-50 rounded p-4 shadow-md">
              <h3 className="text-xl font-semibold mb-4">Related Posts</h3>

              {blogs
                .filter(
                  (b) =>
                    b._id !== selectedPost._id &&
                    b.category === selectedPost.category // ✅ Only same-category blogs
                )
                .slice(0, 3)
                .map((blog) => (
                  <div
                    key={blog._id || blog.id}
                    onClick={() => setSelectedPost(blog)}
                    className="cursor-pointer mb-4"
                  >
                    <p className="text-sm text-indigo-600 font-medium">{blog.category}</p>
                    <p className="text-md font-semibold text-gray-800">{blog.title}</p>
                    <p className="text-xs text-gray-500">
                      {formatDate(blog.createdAt || blog.created_at || blog.date)}
                    </p>
                  </div>
                ))}

              {/* If no related blogs found */}
              {blogs.filter(
                (b) =>
                  b._id !== selectedPost._id &&
                  b.category === selectedPost.category
              ).length === 0 && (
                  <p className="text-gray-500 text-sm">No related blogs found.</p>
                )}
            </div>

          </div>
        ) : (
          <>
            {/* Posts Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayPosts.map((blog) => (
                <div
                  key={blog._id || blog.id}
                  onClick={() => setSelectedPost(blog)}
                  className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg"
                >
                  <img
                    src={blog.imageUrl || blog.image} // try common fields
                    alt={blog.title}
                    className="w-full h-60 object-cover"
                  />
                  <div className="p-4">
                    <p className="text-sm text-indigo-500 font-semibold mb-1">
                      {blog.category}
                    </p>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      {blog.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      By {blog.name || blog.author} | {formatDate(blog.createdAt || blog.created_at || blog.date)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-10 flex justify-center gap-4">
                <button
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
