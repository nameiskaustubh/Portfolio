import React from "react";

const HeroAbout = () => {
  return (
    <section id="home" className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      {/* ✅ Hero Section */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-20 gap-10">
        {/* Left Text Content */}
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Hi, I’m <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 animate-pulse">Kaustubh</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            I’m a passionate Frontend Developer with a knack for building clean, responsive, and user-friendly web interfaces.
          </p>
          <a
            href="#projects"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition"
          >
            See My Work
          </a>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="src\assets\profile .jpg"
            alt="Kaustubh Profile"
            className="w-64 h-64 rounded-full object-cover shadow-lg
            transition-transform duration-500 ease-in-out hover:scale-105 hover:rotate-3 active:scale-95"
          />
        </div>
      </div>

      {/* ✅ About Section */}
      <div id="about" className="bg-gray-100 dark:bg-gray-800 py-16 px-6 animate-slideIn" >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            I hold an MCA degree and have recently completed a frontend internship where I built real-world responsive features. I'm skilled in HTML, CSS, JavaScript, React, and Tailwind, and currently building strong DSA fundamentals alongside developing major projects like <strong>Mentii – A Mental Health Buddy</strong>. I’m aiming for roles in well organizations.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroAbout;
