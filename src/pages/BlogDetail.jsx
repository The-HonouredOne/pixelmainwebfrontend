import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// Dummy data (same as in BlogSection)
const blogData = [
  {
    id: 1,
    title: "How AI is Transforming Web Development",
    description: `Explore how artificial intelligence is changing the landscape of UI/UX and frontend development.`,
    content: `
      Artificial Intelligence (AI) has revolutionized the way websites are designed, developed, and maintained. 
      From code generation tools to intelligent UX optimization, AI helps teams build smarter, faster, and more scalable applications.
      
      At PixelGenix, we integrate AI tools for SEO, design predictions, and real-time user personalization.
    `,
    image: "/blog1.jpg",
    author: "Ajay Kumar",
    date: "June 9, 2025",
    slug: "ai-transforming-web-development",
  },
  {
    id: 2,
    title: "Top 10 Web Technologies in 2025",
    description:
      "Stay ahead in the tech game with the most in-demand frameworks and tools used by IT companies.",
    content: `
      2025 is set to be an exciting year for developers. Technologies like Astro, Svelte, React Server Components, and AI-powered dev tools 
      will dominate the web development space. Businesses must stay updated to remain competitive.
    `,
    image: "/blog2.jpg",
    author: "Team PixelGenix",
    date: "June 5, 2025",
    slug: "top-10-web-technologies-2025",
  },
  {
    id: 3,
    title: "Why Every Business Needs a Custom Web Portal",
    description:
      "Discover how custom portals streamline operations, boost branding, and improve customer experience.",
    content: `
      A custom web portal provides businesses with a centralized platform for operations, communication, and data management. 
      It reflects brand identity and improves customer satisfaction. PixelGenix offers scalable and secure portal solutions tailored to your business.
    `,
    image: "/blog3.jpg",
    author: "PixelGenix Editorial",
    date: "May 25, 2025",
    slug: "business-needs-custom-web-portal",
  },
];

const BlogDetail = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const found = blogData.find((b) => b.slug === slug);
    setBlog(found);
  }, [slug]);

  if (!blog) {
    return (
      <div className="text-center py-20 text-gray-500">
        <h2 className="text-xl">Blog not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-72 object-cover rounded-xl mb-8"
      />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        <span>By {blog.author}</span> · <span>{blog.date}</span>
      </div>
      <div className="text-lg text-gray-700 leading-8 whitespace-pre-line">
        {blog.content}
      </div>
    </div>
  );
};

export default BlogDetail;
