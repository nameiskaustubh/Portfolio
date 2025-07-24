import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaGitAlt,
  FaReact,
  FaNodeJs,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiFirebase,
  SiMysql,
  SiCplusplus,
} from "react-icons/si";
import { DiJava } from "react-icons/di";

const skills = [
  { name: "HTML5", icon: <FaHtml5 className="text-orange-600" />, proficiency: 90, barColor: "#e34c26" },
  { name: "CSS3", icon: <FaCss3Alt className="text-blue-600" />, proficiency: 80, barColor: "#264de4" },
  { name: "JavaScript", icon: <FaJs className="text-yellow-500" />, proficiency: 70, barColor: "#f0db4f" },
  { name: "React.js", icon: <FaReact className="text-cyan-400" />, proficiency: 50, barColor: "#61DBFB" },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="text-sky-400" />, proficiency: 50, barColor: "#38bdf8" },
  { name: "Firebase", icon: <SiFirebase className="text-yellow-400" />, proficiency: 60, barColor: "#ffca28" },
  { name: "MySQL", icon: <SiMysql className="text-blue-700" />, proficiency: 70, barColor: "#00758F" },
  { name: "Git", icon: <FaGitAlt className="text-red-500" />, proficiency: 50, barColor: "#f34f29" },
  { name: "Java", icon: <DiJava size={40} color="#5382A1" />, proficiency: 70, barColor: "#5382A1" },
  { name: "C++", icon: <SiCplusplus size={40} color="#00599C" />, proficiency: 70, barColor: "#00599C" },
];


const Skills = () => {
  return (
    <section id="skills" className="py-12 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-gray-800 dark:text-white">
          Tech Stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md hover:scale-105 transform transition"
            >
              <div className="text-4xl mb-2">{skill.icon}</div>
              <p className="text-gray-800 dark:text-white text-sm font-medium">
                {skill.name}
              </p>
              <div className="w-full mt-1 bg-gray-300 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${skill.proficiency}%`,
                    backgroundColor: skill.barColor
                  }}
                  
                ></div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 text-center">
                {skill.proficiency}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
