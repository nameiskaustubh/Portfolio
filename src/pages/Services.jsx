import React from "react";
import { Link } from "react-router-dom";
import { Code, Palette, Rocket, Database, Globe, Wrench } from "lucide-react"; // icons

const services = [
  {
    title: "Frontend Development",
    description: "Building responsive and interactive websites using React, Tailwind CSS, and modern JavaScript.",
    icon: <Code className="w-10 h-10 text-blue-400" />,
  },
  {
    title: "Full-Stack Development",
    description: "Developing scalable web apps with MERN stack (MongoDB, Express, React, Node.js).",
    icon: <Database className="w-10 h-10 text-green-400" />,
  },
  {
    title: "UI/UX Design",
    description: "Designing clean and intuitive user experiences with a focus on usability and aesthetics.",
    icon: <Palette className="w-10 h-10 text-pink-400" />,
  },
  {
    title: "Deployment & Hosting",
    description: "Deploying apps seamlessly on Vercel, Netlify, or Firebase for global reach.",
    icon: <Rocket className="w-10 h-10 text-purple-400" />,
  },
  {
    title: "SEO Optimization",
    description: "Improving visibility of websites with optimized structure and best practices.",
    icon: <Globe className="w-10 h-10 text-yellow-400" />,
  },
  {
    title: "Custom Projects",
    description: "Delivering tailored solutions such as portfolios, blogs, and e-commerce applications.",
    icon: <Wrench className="w-10 h-10 text-red-400" />,
  },
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-900 pt-20 pb-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-white mb-4">My Services</h1>
        <p className="text-gray-400 text-xl mb-8">
          Turning ideas into reality with code, design, and innovation.
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* Services Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
          >
            <div className="mb-6">{service.icon}</div>
            <h3 className="text-2xl font-semibold text-white mb-4">
              {service.title}
            </h3>
            <p className="text-gray-400">{service.description}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16">
        <p className="text-gray-300 text-lg mb-4">
          Have a project in mind? Let’s build it together.
        </p>
        <Link
          to="/Contact"
          className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-xl transition-all"
        >
          Contact Me
        </Link>
      </div>
    </div>
  );
};

export default Services;
