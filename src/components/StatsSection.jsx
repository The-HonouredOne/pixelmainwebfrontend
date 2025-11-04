import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const StatsSection = () => {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section
      ref={ref}
      className="bg-white py-16 border-t border-b border-gray-100 text-center"
    >
      <div className="max-w-4xl mx-auto px-6 mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Enhancing Business Experience with{" "}
          <span className="text-indigo-600">Technology at Heart</span>
        </h2>
        <p className="text-gray-600">
          At <span className="font-semibold text-indigo-600">PixelGenix</span>, we don’t just deliver tech
          solutions — we blend magic with innovation. Our techies give your business a new identity with
          out-of-the-box products that make life better.
        </p>
      </div>

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Stat 1 */}
        <div>
          <h3 className="text-4xl font-bold text-indigo-600">
            {inView && <CountUp end={100} duration={2} />}+
          </h3>
          <p className="mt-2 text-gray-700">Projects Completed</p>
          <p className="text-sm text-gray-500">
            Achieving success one milestone at a time
          </p>
        </div>

        {/* Stat 2 */}
        <div>
          <h3 className="text-4xl font-bold text-indigo-600">
            {inView && <CountUp end={50} duration={2} />}+
          </h3>
          <p className="mt-2 text-gray-700">Expert Members</p>
          <p className="text-sm text-gray-500">
            Bringing technical expertise with a twist of creativity.
          </p>
        </div>

        {/* Stat 3 */}
        <div>
          <h3 className="text-4xl font-bold text-indigo-600">
            {inView && <CountUp end={1000} duration={2} />}+
          </h3>
          <p className="mt-2 text-gray-700">Happy Clients</p>
          <p className="text-sm text-gray-500">
            Spreading the spirit of technology globally
          </p>
        </div>

        {/* Stat 4 */}
        <div>
          <h3 className="text-4xl font-bold text-indigo-600">
            {inView && <CountUp end={25} duration={2} />}+
          </h3>
          <p className="mt-2 text-gray-700">Running Projects</p>
          <p className="text-sm text-gray-500">
            Paving the way for futuristic products
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
