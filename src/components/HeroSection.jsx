import React from "react";
import { Link } from "react-router-dom";

import heroVideo from "../assets/hero_video.mp4"; // Adjust the path as necessary

const HeroSection = () => {
  return (
    <section className="relative h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src={heroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-indigo-900 to-black opacity-70 z-10" />

      {/* Main Content */}
      <div className="relative z-20 text-white text-center px-6 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-md">
          Empowering Ideas with{" "}
          <span className="text-indigo-400">Technology</span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-2xl mx-auto">
          At <strong className="text-indigo-300">PixelGenix</strong>, we craft
          cutting-edge web, mobile, and AI-powered software that helps
          businesses transform and scale globally.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/contact"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium transition"
          >
            Get Free Consultation
          </Link>
          <Link
            to="/portfolio"
            className="px-6 py-3 border border-indigo-400 text-indigo-300 hover:bg-indigo-500 hover:text-white rounded-full text-sm font-medium transition"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
