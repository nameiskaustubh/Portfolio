import React from "react";
import { Code, Palette, Rocket, Database, Globe, Wrench } from "lucide-react";

const services = [
  {
    title: "Frontend Development",
    description: "Building responsive and interactive websites using React, Tailwind CSS, and modern JavaScript.",
    icon: <Code className="w-8 h-8 text-blue-600" />,
    gradient: "from-blue-50 to-blue-100",
    hoverGradient: "hover:from-blue-100 hover:to-blue-200",
  },
  {
    title: "Full-Stack Development",
    description: "Developing scalable web apps with MERN stack (MongoDB, Express, React, Node.js).",
    icon: <Database className="w-8 h-8 text-emerald-600" />,
    gradient: "from-emerald-50 to-emerald-100",
    hoverGradient: "hover:from-emerald-100 hover:to-emerald-200",
  },
  {
    title: "UI/UX Design",
    description: "Designing clean and intuitive user experiences with a focus on usability and aesthetics.",
    icon: <Palette className="w-8 h-8 text-pink-600" />,
    gradient: "from-pink-50 to-pink-100",
    hoverGradient: "hover:from-pink-100 hover:to-pink-200",
  },
  {
    title: "Deployment & Hosting",
    description: "Deploying apps seamlessly on Vercel, Netlify, or Firebase for global reach.",
    icon: <Rocket className="w-8 h-8 text-purple-600" />,
    gradient: "from-purple-50 to-purple-100",
    hoverGradient: "hover:from-purple-100 hover:to-purple-200",
  },
  {
    title: "SEO Optimization",
    description: "Improving visibility of websites with optimized structure and best practices.",
    icon: <Globe className="w-8 h-8 text-amber-600" />,
    gradient: "from-amber-50 to-amber-100",
    hoverGradient: "hover:from-amber-100 hover:to-amber-200",
  },
  {
    title: "Custom Projects",
    description: "Delivering tailored solutions such as portfolios, blogs, and e-commerce applications.",
    icon: <Wrench className="w-8 h-8 text-red-600" />,
    gradient: "from-red-50 to-red-100",
    hoverGradient: "hover:from-red-100 hover:to-red-200",
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-200 pt-20 pb-16">
      {/* Header Section */}
      <div className="text-center mb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-6">
            My Services
          </h1>
          <p className="text-gray-600 text-lg md:text-xl mb-8 leading-relaxed">
            Turning ideas into reality with code, design, and innovation. 
            I deliver comprehensive digital solutions tailored to your needs.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100 
                         hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out
                         bg-gradient-to-br ${service.gradient} ${service.hoverGradient}`}
            >
              {/* Icon Container */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
                  {service.icon}
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors duration-200">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                  {service.description}
                </p>
              </div>

              {/* Subtle hover accent */}
              <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/5 pointer-events-none group-hover:ring-gray-900/10 transition-all duration-300"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-20 px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Let's collaborate to bring your vision to life with cutting-edge technology and thoughtful design.
          </p>
          <button
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                     text-white font-medium rounded-full shadow-lg hover:shadow-xl 
                     hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-0.5 
                     transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Get In Touch
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Services;