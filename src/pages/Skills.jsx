import React, { useState } from "react";
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

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const skillsData = [
    { 
      name: "HTML5", 
      icon: <FaHtml5 />, 
      proficiency: 90, 
      category: "frontend",
      experience: "3+ years",
      description: "Semantic markup, accessibility, modern HTML5 features"
    },
    { 
      name: "CSS3", 
      icon: <FaCss3Alt />, 
      proficiency: 85, 
      category: "frontend",
      experience: "3+ years",
      description: "Flexbox, Grid, animations, responsive design"
    },
    { 
      name: "JavaScript", 
      icon: <FaJs />, 
      proficiency: 70, 
      category: "frontend",
      experience: "1+ years",
      description: "ES6+, async programming, DOM manipulation"
    },
    { 
      name: "React.js", 
      icon: <FaReact />, 
      proficiency: 70, 
      category: "frontend",
      experience: "0.6+ years",
      description: "Hooks, context, component architecture"
    },
    { 
      name: "Tailwind CSS", 
      icon: <SiTailwindcss />, 
      proficiency: 60, 
      category: "frontend",
      experience: "1+ year",
      description: "Utility-first CSS, responsive design"
    },
    { 
      name: "Firebase", 
      icon: <SiFirebase />, 
      proficiency: 65, 
      category: "backend",
      experience: "1+ year",
      description: "Authentication, Firestore, hosting"
    },
    { 
      name: "MySQL", 
      icon: <SiMysql />, 
      proficiency: 70, 
      category: "backend",
      experience: "2+ years",
      description: "Database design, queries, optimization"
    },
    { 
      name: "Node.js", 
      icon: <FaNodeJs />, 
      proficiency: 50, 
      category: "backend",
      experience: "0.6+ year",
      description: "Server-side JavaScript, APIs"
    },
    { 
      name: "Java", 
      icon: <DiJava />, 
      proficiency: 70, 
      category: "programming",
      experience: "2+ years",
      description: "OOP, data structures, algorithms"
    },
    { 
      name: "C++", 
      icon: <SiCplusplus />, 
      proficiency: 70, 
      category: "programming",
      experience: "2+ years",
      description: "System programming, competitive programming"
    },
    { 
      name: "Git", 
      icon: <FaGitAlt />, 
      proficiency: 65, 
      category: "tools",
      experience: "1+ years",
      description: "Version control, branching, collaboration"
    }
  ];

  const categories = [
    { id: "all", name: "All Skills", count: skillsData.length },
    { id: "frontend", name: "Frontend", count: skillsData.filter(s => s.category === "frontend").length },
    { id: "backend", name: "Backend", count: skillsData.filter(s => s.category === "backend").length },
    { id: "programming", name: "Programming", count: skillsData.filter(s => s.category === "programming").length },
    { id: "tools", name: "Tools", count: skillsData.filter(s => s.category === "tools").length }
  ];

  const filteredSkills = activeCategory === "all" 
    ? skillsData 
    : skillsData.filter(skill => skill.category === activeCategory);

  const getSkillColor = (proficiency) => {
    if (proficiency >= 80) return "from-green-500 to-emerald-500";
    if (proficiency >= 70) return "from-blue-500 to-cyan-500";
    if (proficiency >= 60) return "from-yellow-500 to-orange-500";
    return "from-gray-500 to-gray-600";
  };

  const getIconColor = (name) => {
    const colors = {
      "HTML5": "text-orange-500",
      "CSS3": "text-blue-500",
      "JavaScript": "text-yellow-400",
      "React.js": "text-cyan-400",
      "Tailwind CSS": "text-sky-400",
      "Firebase": "text-orange-400",
      "MySQL": "text-blue-600",
      "Node.js": "text-green-500",
      "Java": "text-red-500",
      "C++": "text-blue-700",
      "Git": "text-orange-600"
    };
    return colors[name] || "text-gray-400";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
     
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative pt-24 pb-20">
        <div className="container mx-auto px-6">
          
          
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-full px-5 py-2 mb-8">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-blue-400 text-sm font-medium">Technical Expertise</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white">
              Skills & Technologies
            </h1>
            
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              A comprehensive overview of my technical skills, experience levels, 
              and areas of expertise in software development.
            </p>
          </div>

         
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/25"
                    : "bg-gray-800/80 text-gray-400 hover:bg-gray-700 hover:text-white border border-gray-700"
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div>

         
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredSkills.map((skill, index) => (
              <div
                key={index}
                className="group bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all duration-300 hover:-translate-y-1"
              >
               
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl ${getIconColor(skill.name)} group-hover:scale-110 transition-transform`}>
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                      <p className="text-sm text-gray-400">{skill.experience}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">{skill.proficiency}%</div>
                  </div>
                </div>

              
                <div className="mb-4">
                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getSkillColor(skill.proficiency)} transition-all duration-1000 ease-out rounded-full`}
                      style={{ width: `${skill.proficiency}%` }}
                    ></div>
                  </div>
                </div>

               
                <p className="text-gray-400 text-sm leading-relaxed">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

         
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">3+</div>
              <div className="text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">{skillsData.length}</div>
              <div className="text-gray-400">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">
                {Math.round(skillsData.reduce((sum, skill) => sum + skill.proficiency, 0) / skillsData.length)}%
              </div>
              <div className="text-gray-400">Avg Proficiency</div>
            </div>
          </div>

          
          <div className="grid lg:grid-cols-2 gap-8">
            
            
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">Currently Learning</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  "Advanced React patterns and optimization",
                  "TypeScript for better type safety",
                  "Next.js for full-stack development",
                  "Data structures and algorithms mastery"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white">Future Goals</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  "Cloud technologies (AWS, Azure)",
                  "DevOps and CI/CD pipelines",
                  "Mobile development with React Native",
                  "Machine learning fundamentals"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Skills;