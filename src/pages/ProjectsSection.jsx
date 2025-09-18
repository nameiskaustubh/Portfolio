import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaCode, FaEye } from "react-icons/fa";


import mentiiImage from '../components/assets/mentiii.png';
import colormazImage from '../components/assets/colormaz.png';
import weatherImage from '../components/assets/weather.png';
import pasteAppImage from '../components/assets/Paste.png';

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const projects = [
    {
      title: "Mentii - Your Mental Health Buddy",
      description: "A comprehensive React-based mental health platform featuring a CBT chatbot, sentiment analyzer, and mood prediction game. Built with Firebase for real-time data management.",
      image: mentiiImage,
      techStack: ["React", "Firebase", "Tailwind CSS", "TensorFlow", "JavaScript"],
      github: "https://github.com/nameiskaustubh/mentiii",
      live: "https://mentiii-kaustubhds-projects.vercel.app/",
      category: "fullstack",
      featured: true,
      status: "completed"
    },
    {
      title: "Color Maze Mood Game",
      description: "An interactive JavaScript maze game that predicts user mood based on color choices and completion time. Features Firebase integration for storing user results and analytics.",
      image: colormazImage, 
      techStack: ["JavaScript", "Firebase", "HTML5", "CSS3", "Canvas API"],
      github: "https://github.com/yourname/maze-mood-game",
      live: "https://maze-mood.netlify.app",
      category: "frontend",
      featured: false,
      status: "completed"
    },
    {
      title: "Weather App",
      description: "A responsive weather application built with React and TailwindCSS. Uses OpenWeather API to display real-time weather conditions, forecasts, and location-based weather data.",
      image: weatherImage, 
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
      image: pasteAppImage,
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
    <div className="min-h-screen bg-gray-200 pt-10">
      <div className="container mx-auto px-6 py-12">

      
        <div className="text-center mb-16">
         
          <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-4">
            My Projects
          </h1>
          <p className="text-gray-600 text-xl mb-8 max-w-2xl mx-auto">
            Showcasing my journey through code, creativity, and problem-solving
          </p>
          <div className="w-24 h-1 bg-gray-400 mx-auto rounded-full"></div>
        </div>

        
        {featuredProjects.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Featured Projects</h2>
            <div className="grid lg:grid-cols-1 gap-8">
              {featuredProjects.map((project, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-300">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <div className="flex items-center mb-4">
                        <span className="bg-amber-100 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-sm font-medium mr-3">
                          ⭐ Featured
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          project.status === 'completed' 
                            ? 'bg-green-100 text-green-700 border border-green-200' 
                            : 'bg-blue-100 text-blue-700 border border-blue-200'
                        }`}>
                          {project.status === 'completed' ? '✅ Completed' : '🚧 In Progress'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-semibold text-gray-800 mb-4">{project.title}</h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="bg-blue-50 text-blue-700 border border-blue-200 text-sm px-3 py-1 rounded-full"
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
                          className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                        >
                          <FaGithub /> <span>Code</span>
                        </a>
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-md"
                        >
                          <FaExternalLinkAlt /> <span>Live Demo</span>
                        </a>
                      </div>
                    </div>
                    <div className="order-first md:order-last">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 rounded-lg object-cover shadow-md hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gray-800 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-300'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-300 group"
            >
              <div className="relative overflow-hidden rounded-lg mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
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
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                {project.featured && (
                  <span className="text-amber-500 text-sm">⭐</span>
                )}
              </div>

              <p className="text-sm mb-4 text-gray-600 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full border border-gray-200"
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
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors flex-1 justify-center py-2 bg-gray-100 rounded-lg hover:bg-gray-200 border border-gray-200"
                >
                  <FaGithub /> <span className="text-sm">Code</span>
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-500 transition-colors flex-1 justify-center py-2 bg-blue-50 rounded-lg hover:bg-blue-100 border border-blue-200"
                >
                  <FaExternalLinkAlt /> <span className="text-sm">Live</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-white rounded-xl p-8 shadow-lg border border-gray-300">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Interested in collaborating?</h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            I'm always open to discussing new projects and opportunities
          </p>
          <a
            href="mailto:kaustubhvdeshmukh2001@gmail.com"
            className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 shadow-md"
          >
            Let's Connect
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;