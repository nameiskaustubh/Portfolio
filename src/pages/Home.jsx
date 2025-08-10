import React from "react";
import profilePic from "../assets/profile.jpg";
// import LeetCodeTracker from "../components/LeetCodeTracker";

const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
     
      <section className="pt-20 pb-10">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between max-w-6xl mx-auto px-6 py-20 gap-10">
         
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Hi, I'm{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-pink-400 animate-pulse">
                Kaustubh
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              I'm a passionate Frontend Developer with a knack for building clean, responsive, and user-friendly web interfaces.
            </p>
            <div className="flex gap-4">
              <a
                href="/projects"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition"
              >
                See My Work
              </a>
              <a
                href="#about"
                className="inline-block border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-6 py-3 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <img
              src={profilePic}
              alt="Kaustubh Profile"
              className="w-64 h-64 rounded-full object-cover shadow-lg
              transition-transform duration-500 ease-in-out hover:scale-105 hover:rotate-3 active:scale-95"
            />
          </div>
        </div>
      </section>

      <section id="about" className="bg-gray-100 dark:bg-gray-800 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">About Me</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
                I hold an MCA degree and have recently completed a frontend internship where I built real-world responsive features. 
                I'm skilled in HTML, CSS, JavaScript, React, and Tailwind, and currently building strong DSA fundamentals.
              </p>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                I'm currently developing major projects like <strong>Mentii – A Mental Health Buddy</strong> and aiming for roles in well-established organizations.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">Quick Facts</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  📍 Based in Nashik, Maharashtra
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  🎓 MCA Graduate (2025)
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  💻 Frontend Developer
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  🧩 DSA Enthusiast
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Let's Build Something Amazing Together</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            I'm always excited to work on new projects and collaborate with fellow developers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/projects"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition transform hover:scale-105 shadow-lg"
            >
              View My Projects
            </a>
            <a
              href="/skills"
              className="bg-gradient-to-r from-green-500 to-teal-600 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-teal-700 transition transform hover:scale-105 shadow-lg"
            >
              Explore My Skills
            </a>
          </div>
        </div>
      </section>
      <section>
       
      </section>
    </div>
  );
};

export default Home;