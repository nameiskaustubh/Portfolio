import React from "react";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectsSection = () => {
  const projects = [
    {
      title: "Mentii - Your Mental Health Buddy",
      description:
        "A React-based platform using Firebase with CBT chatbot, sentiment analyzer, and mood prediction game.",
      image: "/assets/mentii-cover.png",
      techStack: ["React", "Firebase", "Tailwind", "TensorFlow"],
      github: "https://github.com/yourname/mentii",
      live: "https://mentii.netlify.app",
    },
    {
      title: "Color Maze Mood Game",
      description:
        "A JavaScript maze game predicting user's mood based on color and time. Firebase stores results.",
      image: "/assets/maze-game.png",
      techStack: ["JavaScript", "Firebase", "HTML", "CSS"],
      github: "https://github.com/yourname/maze-mood-game",
      live: "https://maze-mood.netlify.app",
    },
  ];

  return (
    <div className="w-full bg-gray-900 py-16"> {/* Full-width parent division */}
      <section className="bg-gray-800 py-16 px-4 md:px-20 text-white shadow-md w-full">
        <h2 className="text-4xl font-bold text-center text-white mb-10">
          Projects
        </h2>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-gray-700 rounded-2xl shadow-lg p-4 hover:shadow-xl transition-transform transform hover:-translate-y-1"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-bold text-blue-400 mb-2">
                {project.title}
              </h3>
              <p className="text-sm mb-3 text-gray-300">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {project.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-blue-600 text-sm px-2 py-1 rounded-full"
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
                  className="text-blue-400 hover:text-white flex items-center gap-1"
                >
                  <FaGithub /> Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-white flex items-center gap-1"
                >
                  <FaExternalLinkAlt /> Live
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProjectsSection;
