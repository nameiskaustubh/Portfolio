import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaCode, FaEye } from "react-icons/fa";

import mentiiImage from '../components/assets/mentiii.png';
import colormazImage from '../components/assets/colormaz.png';
import weatherImage from '../components/assets/weather.png';
import pasteAppImage from '../components/assets/Paste.png';


const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  // const projects = [
  //   {
  //     title: "Mentii - Your Mental Health Buddy",
  //     description:
  //       "A comprehensive React-based mental health platform featuring a CBT chatbot, sentiment analyzer, and mood prediction game. Built with Firebase for real-time data management.",
  //     image: "src/components/assets/mentiii.png",
  //     techStack: ["React", "Firebase", "Tailwind CSS", "TensorFlow", "JavaScript"],
  //     github: "https://github.com/nameiskaustubh/mentiii",
  //     live: "https://mentiii-kaustubhds-projects.vercel.app/",
  //     category: "fullstack",
  //     featured: true,
  //     status: "completed"
  //   },
  //   {
  //     title: "Color Maze Mood Game",
  //     description:
  //       "An interactive JavaScript maze game that predicts user mood based on color choices and completion time. Features Firebase integration for storing user results and analytics.",
  //     image: "src/components/assets/colormaz.png",
  //     techStack: ["JavaScript", "Firebase", "HTML5", "CSS3", "Canvas API"],
  //     github: "https://github.com/yourname/maze-mood-game",
  //     live: "https://maze-mood.netlify.app",
  //     category: "frontend",
  //     featured: false,
  //     status: "completed"
  //   },
  //   {
  //     title: "Weather App",
  //     description:
  //       "A responsive weather application built with React and TailwindCSS. Uses OpenWeather API to display real-time weather conditions, forecasts, and location-based weather data.",
  //     image: "src/components/assets/weather.png",
  //     techStack: ["React", "TailwindCSS", "OpenWeather API", "Vite", "Material UI"],
  //     github: "https://github.com/nameiskaustubh/weather-app",
  //     live: "https://weather-app-kaustubh-deshmukhs-projects.vercel.app/",
  //     category: "frontend",
  //     featured: false,
  //     status: "completed"
  //   }
  // ];


  const projects = [
    {
      title: "Mentii - Your Mental Health Buddy",
      description: "A comprehensive React-based mental health platform...",
      image: mentiiImage, // ✅ use imported variable
      techStack: ["React", "Firebase", "Tailwind CSS", "TensorFlow", "JavaScript"],
      github: "https://github.com/nameiskaustubh/mentiii",
      live: "https://mentiii-kaustubhds-projects.vercel.app/",
      category: "fullstack",
      featured: true,
      status: "completed"
    },
    {
      title: "Color Maze Mood Game",
      description: "An interactive JavaScript maze game...",
      image: colormazImage, // ✅
      techStack: ["JavaScript", "Firebase", "HTML5", "CSS3", "Canvas API"],
      github: "https://github.com/yourname/maze-mood-game",
      live: "https://maze-mood.netlify.app",
      category: "frontend",
      featured: false,
      status: "completed"
    },
    {
      title: "Weather App",
      description: "A responsive weather application...",
      image: weatherImage, // ✅
      techStack: ["React", "TailwindCSS", "OpenWeather API", "Vite", "Material UI"],
      github: "https://github.com/nameiskaustubh/weather-app",
      live: "https://weather-app-kaustubh-deshmukhs-projects.vercel.app/",
      category: "frontend",
      featured: false,
      status: "completed"
    },
    {
      title: "Paste App - Simple Online Clipboard",
      description: "A React + Redux based application that allows users to create, edit, view, delete, and share text snippets (pastes). Features include search, copy-to-clipboard, and localStorage persistence.",
      image: pasteAppImage, // ✅ import an image screenshot or logo as pasteAppImage
      techStack: ["React", "Redux Toolkit", "Tailwind CSS", "JavaScript", "Vite"],
      github: "https://github.com/nameiskaustubh/Paste-App",
      live: "https://paste-app-silk-alpha.vercel.app/",
      category: "frontend",
      featured: true,
      status: "completed"
    }

  ];


  const categories = [
    { id: 'all', name: 'All Projects', count: projects.length },
    { id: 'fullstack', name: 'Full Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'frontend', name: 'Frontend', count: projects.filter(p => p.category === 'frontend').length },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="container mx-auto px-6 py-12">

        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Projects</span>
          </h1>
          <p className="text-gray-400 text-xl mb-8">
            Showcasing my journey through code, creativity, and problem-solving
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
        </div>


        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>
            <div className="grid lg:grid-cols-1 gap-8">
              {featuredProjects.map((project, index) => (
                <div key={index} className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center mb-4">
                        <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-3 py-1 rounded-full text-sm font-semibold mr-3">
                          ⭐ Featured
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                          {project.status === 'completed' ? '✅ Completed' : '🚧 In Progress'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="bg-blue-600/20 text-blue-300 border border-blue-500/30 text-sm px-3 py-1 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex gap-4">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                        >
                          <FaGithub /> <span>Code</span>
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105"
                        >
                          <FaExternalLinkAlt /> <span>Live Demo</span>
                        </a>
                      </div>
                    </div>
                    <div className="order-first md:order-last">
                      <img
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-48 rounded-xl transition-transform duration-500 ${project.title.includes("Paste App")
                            ? "object-contain bg-white p-4 group-hover:scale-105"
                            : "object-cover group-hover:scale-110"
                          }`}
                      />

                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}


        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 ${selectedCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>


        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group"
            >
              <div className="relative overflow-hidden rounded-xl mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
                    >
                      <FaCode />
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all"
                    >
                      <FaEye />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-blue-400 group-hover:text-blue-300 transition-colors">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="text-yellow-400 text-sm">⭐</span>
                )}
              </div>

              <p className="text-sm mb-4 text-gray-300 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-600/20 text-blue-300 text-xs px-2 py-1 rounded-full border border-blue-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors flex-1 justify-center py-2 bg-gray-700/50 rounded-lg hover:bg-gray-700"
                >
                  <FaGithub /> <span className="text-sm">Code</span>
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors flex-1 justify-center py-2 bg-blue-600/20 rounded-lg hover:bg-blue-600/30"
                >
                  <FaExternalLinkAlt /> <span className="text-sm">Live</span>
                </a>
              </div>
            </div>
          ))}
        </div>


        <div className="text-center mt-16 bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-8">
          <h3 className="text-2xl font-bold text-white mb-4">Interested in collaborating?</h3>
          <p className="text-gray-400 mb-6">
            I'm always open to discussing new projects and opportunities
          </p>
          <a
            href="mailto:kaustubhvdeshmukh2001@gmail.com"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg"
          >
            Let's Connect
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;