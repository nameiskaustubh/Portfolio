import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center bg-gray-900 px-6 py-16 text-white"
    >
      {/* Heading */}
      <motion.h2
        className="text-4xl md:text-5xl font-bold mb-8 text-gray-100"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        About Me
      </motion.h2>

      {/* Content box */}
      <motion.div
        className="max-w-4xl bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-700"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <p className="text-lg text-gray-300 leading-relaxed mb-6">
          I’m an aspiring{" "}
          <span className="text-indigo-300 font-semibold">Frontend Developer</span>&nbsp; 
          with a strong interest in building clean, modern, and user-friendly websites.  
          I hold a{" "}
          <span className="text-indigo-300 font-semibold">Bachelor’s in Computer Applications (BCA)</span>&nbsp; 
          and a{" "}
          <span className="text-indigo-300 font-semibold">Master’s in Computer Applications (MCA)</span>.  
          My background has given me a solid foundation in programming, problem-solving, and software design.
        </p>

        <p className="text-lg text-gray-300 leading-relaxed mb-6">
  I focus primarily on frontend technologies like HTML, CSS, JavaScript, React, and Tailwind CSS,  
  while also exploring backend development to become a well-rounded full-stack developer.  
  I’m proficient in <span className="text-indigo-300 font-semibold">C++</span> and <span className="text-indigo-300 font-semibold">Java</span>,  
  and have experience working with databases like <span className="text-indigo-300 font-semibold">MySQL</span> and cloud services like <span className="text-indigo-300 font-semibold">Firebase</span>.  
  Currently, I’m strengthening my problem-solving skills by learning Data Structures & Algorithms in C++.
</p>


        <p className="text-lg text-gray-300 leading-relaxed">
          I believe every project is a chance to learn and improve.  
          I aim to build{" "}
          <span className="text-indigo-300 font-semibold">meaningful digital experiences</span>&nbsp;  
          that help people and businesses thrive in the digital world.  
          With curiosity as my guide, I’m always ready for new challenges.
        </p>
      </motion.div>

      {/* Buttons */}
      <motion.div
        className="flex gap-4 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <a
          href="/projects"
          className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md transition-transform transform hover:scale-105"
        >
          View Projects
        </a>
        <a
          href="/contact"
          className="px-6 py-3 rounded-lg border border-indigo-500 text-indigo-300 hover:bg-indigo-600 hover:text-white font-semibold shadow-md transition-transform transform hover:scale-105"
        >
          Contact Me
        </a>
      </motion.div>
    </section>
  );
};

export default About;
