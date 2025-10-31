import { useParams } from "react-router-dom";
import {
  FaUserTie, FaLaptopCode, FaBriefcase, FaNetworkWired,
  FaCommentAlt, FaUserFriends, FaNewspaper, FaProjectDiagram
} from "react-icons/fa";

import Portfolio1 from "../assets/portfolio1.avif";
import Portfolio2 from '../assets/portfolio2.avif' 

// Full content for each company section
const companyData = {
  about: {
    title: "About Us",
    description: "Learn about our app and software development services.",
    icon: <FaUserTie className="text-indigo-600 text-4xl mb-4" />,
    content: (
      <>
        <p className="mb-4">
          PixelGenix is a leading IT company specializing in modern software solutions, web and mobile app development, AI automation, and enterprise solutions.
        </p>
        <p className="mb-4">
          We are passionate about transforming ideas into impactful digital products through innovative thinking and cutting-edge technologies.
        </p>
        <ul className="list-disc list-inside text-left text-gray-700 space-y-1">
          <li>15+ years industry experience</li>
          <li>100+ team members globally</li>
          <li>Clients across 12+ countries</li>
        </ul>
      </>
    )
  },
  "case-studies": {
    title: "Case Studies",
    description: "Explore our successful real-world solutions.",
    icon: <FaLaptopCode className="text-indigo-600 text-4xl mb-4" />,
    content: (
      <>
        <p className="mb-4">
          Discover how PixelGenix helped businesses solve critical problems through innovative solutions.
        </p>
        <h3 className="text-lg font-semibold mt-4 mb-2">Case Study: E-commerce Automation</h3>
        <p className="mb-2">
          We developed a scalable solution for an eCommerce brand that reduced operational cost by 40% and boosted conversions by 65%.
        </p>
        <h3 className="text-lg font-semibold mt-4 mb-2">Case Study: Healthcare CRM</h3>
        <p>
          Our team built a HIPAA-compliant CRM system for a medical network that improved patient interaction and retention.
        </p>
      </>
    )
  },
  career: {
    title: "Career",
    description: "Join our team & grow in a dynamic environment.",
    icon: <FaBriefcase className="text-indigo-600 text-4xl mb-4" />,
    content: (
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* LEFT SIDE: Text Info */}
        <div>
          <p className="mb-4">
            At PixelGenix, we believe in empowering our people with a creative and growth-driven environment.
          </p>
          <ul className="list-disc list-inside text-left text-gray-700 space-y-1 mb-6">
            <li>Flexible work hours</li>
            <li>Remote & hybrid opportunities</li>
            <li>Upskilling programs and certifications</li>
            <li>Performance-based growth</li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">Current Openings:</h3>
          <ul className="list-disc list-inside text-left text-gray-700 space-y-1">
            <li>Frontend Developer (React, Tailwind)</li>
            <li>Backend Developer (Node.js, MongoDB)</li>
            <li>UI/UX Designer</li>
            <li>Digital Marketing Executive</li>
          </ul>
        </div>
  
        {/* RIGHT SIDE: Form */}
        <div className="bg-white border rounded-xl shadow-lg p-6">
          <h4 className="text-xl font-semibold mb-4 text-indigo-700">Apply Now</h4>
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full p-2 border rounded-md" />
            <input type="email" placeholder="Email" className="w-full p-2 border rounded-md" />
            <input type="tel" placeholder="Phone Number" className="w-full p-2 border rounded-md" />
            <select className="w-full p-2 border rounded-md">
              <option>Select Position</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>UI/UX Designer</option>
              <option>Digital Marketer</option>
            </select>
            <input type="file" className="w-full" />
            <textarea placeholder="Your Message" rows="4" className="w-full p-2 border rounded-md"></textarea>
            <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
              Submit Application
            </button>
          </form>
        </div>
      </div>
    )
  },
  
  infrastructure: {
    title: "Infrastructure",
    description: "Modern setup that ensures efficiency & security.",
    icon: <FaNetworkWired className="text-indigo-600 text-4xl mb-4" />,
    content: (
      <>
        <p className="mb-4">
          Our advanced development centers are equipped with high-speed connectivity, secure VPNs, and modern cloud infrastructure.
        </p>
        <ul className="list-disc list-inside text-left text-gray-700 space-y-1">
          <li>ISO-certified workspaces</li>
          <li>24/7 server monitoring</li>
          <li>Data encryption and disaster recovery</li>
        </ul>
      </>
    )
  },
  testimonials: {
    title: "Testimonials",
    description: "See how we’ve helped our clients succeed.",
    icon: <FaCommentAlt className="text-indigo-600 text-4xl mb-4" />,
    content: (
      <div className="space-y-6">
        <div className="bg-white border rounded-xl shadow-md p-6">
          <p className="text-gray-700 italic">
            “PixelGenix delivered our project on time with exceptional quality. Their communication was clear and professional throughout the entire process.”
          </p>
          <div className="mt-4 font-semibold text-indigo-600">— Rakesh Sharma, CEO at TechNova</div>
        </div>
  
        <div className="bg-white border rounded-xl shadow-md p-6">
          <p className="text-gray-700 italic">
            “They created a fully responsive and user-friendly app for us. Very happy with their UI/UX and dedication to details.”
          </p>
          <div className="mt-4 font-semibold text-indigo-600">— Priya Malhotra, Marketing Head at EduSphere</div>
        </div>
  
        <div className="bg-white border rounded-xl shadow-md p-6">
          <p className="text-gray-700 italic">
            “Team PixelGenix was proactive in solving challenges. Would definitely recommend them for complex web apps.”
          </p>
          <div className="mt-4 font-semibold text-indigo-600">— Ankit Verma, CTO at RetailCore</div>
        </div>
      </div>
    )
  },
  
  "referral-partner": {
    title: "Referral Partner",
    description: "Refer clients, earn rewards, grow your network.",
    icon: <FaUserFriends className="text-indigo-600 text-4xl mb-4" />,
    content: (
      <>
        <p className="mb-4">
          Become our referral partner and earn lucrative commissions by introducing clients to us.
        </p>
        <ul className="list-disc list-inside text-left text-gray-700 space-y-1">
          <li>Up to 20% revenue share</li>
          <li>Priority support for your referrals</li>
          <li>Transparent process and monthly reports</li>
        </ul>
        <p className="mt-4">📩 Contact: <strong>partners@pixelgenix.in</strong></p>
      </>
    )
  },
  news: {
    title: "News",
    description: "Stay updated on achievements & trends.",
    icon: <FaNewspaper className="text-indigo-600 text-4xl mb-4" />,
    content: (
      <>
        <h3 className="text-lg font-semibold mb-2">Recent Headlines:</h3>
        <ul className="list-disc list-inside text-left text-gray-700 space-y-1">
          <li>PixelGenix wins “Top Innovation Company 2025” award</li>
          <li>Launched new AI-Powered LMS platform</li>
          <li>Opened new development center in Bangalore</li>
        </ul>
      </>
    )
  },
  portfolio: {
    title: "Portfolio",
    description: "Creative and expert project showcases.",
    icon: <FaProjectDiagram className="text-indigo-600 text-4xl mb-4" />,
    content: (
      <div className="grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg shadow-lg p-4 bg-white">
          <img src={Portfolio2} alt="Project 1" className="rounded mb-3" />
          <h4 className="text-lg font-semibold text-indigo-700 mb-1">EduPlus LMS</h4>
          <p className="text-sm text-gray-600 mb-2">
            A full-fledged Learning Management System with real-time quizzes, user analytics, and admin dashboard.
          </p>
          <p className="text-xs text-gray-500">Tech Stack: React, Node.js, MongoDB, Tailwind</p>
        </div>
  
        <div className="border rounded-lg shadow-lg p-4 bg-white">
          <img src={Portfolio1} alt="Project 2" className="rounded mb-3" />
          <h4 className="text-lg font-semibold text-indigo-700 mb-1">ShopEase eCommerce</h4>
          <p className="text-sm text-gray-600 mb-2">
            Custom-built eCommerce platform for a lifestyle brand. Integrated payment, product filters & cart features.
          </p>
          <p className="text-xs text-gray-500">Tech Stack: Next.js, Express, Stripe, TailwindCSS</p>
        </div>
      </div>
    )
  },
};  


const Company = () => {
  const { section } = useParams();
  const content = companyData[section];

  if (!content) {
    return (
      <div className="text-center py-20 text-gray-500">
        <h2 className="text-xl">Page Not Found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <div className="text-center mb-6">
        {content.icon}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{content.title}</h1>
        <p className="text-gray-600 text-lg">{content.description}</p>
      </div>
      <div className="text-gray-700 text-base leading-7">{content.content}</div>
    </div>
  );
};

export default Company;
