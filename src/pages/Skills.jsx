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
    if (proficiency >= 80) return "from-emerald-500 to-green-500";
    if (proficiency >= 70) return "from-blue-500 to-indigo-500";
    if (proficiency >= 60) return "from-amber-500 to-orange-500";
    return "from-slate-500 to-gray-600";
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

  const getCardBackground = (category) => {
    const backgrounds = {
      frontend: "bg-white border-gray-300",
      backend: "bg-white border-gray-300", 
      programming: "bg-white border-gray-300",
      tools: "bg-white border-gray-300"
    };
    return backgrounds[category] || "bg-white border-gray-300";
  };

  return (
    <div className="min-h-screen bg-gray-200 text-gray-700">
     
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-slate-300/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gray-300/40 rounded-full blur-3xl"></div>
      </div>

      <div className="relative pt-24 pb-20">
        <div className="container mx-auto px-6">
          
          <div className="max-w-4xl mx-auto text-center mb-16">
            
            
            <h1 className=" md:text-5xl font-bold mb-6 text-blue-500">
              Skills & Technologies
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              A comprehensive overview of my technical skills, experience levels, 
              and areas of expertise in software development.
            </p>
          </div>

         
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gray-800 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 shadow-md border border-gray-300"
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
                className={`group ${getCardBackground(skill.category)} backdrop-blur-sm border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-12 h-12 bg-gray-100 rounded-full -translate-y-6 translate-x-6 opacity-50"></div>
               
                <div className="flex items-center justify-between mb-6 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl ${getIconColor(skill.name)} group-hover:scale-105 transition-transform duration-300`}>
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{skill.name}</h3>
                      <p className="text-sm text-gray-600">{skill.experience}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-700">
                      {skill.proficiency}%
                    </div>
                  </div>
                </div>

                <div className="mb-4 relative z-10">
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${getSkillColor(skill.proficiency)} transition-all duration-1000 ease-out rounded-full`}
                      style={{ width: `${skill.proficiency}%` }}
                    >
                    </div>
                  </div>
                </div>

                
                <p className="text-gray-600 text-sm leading-relaxed relative z-10">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>

         
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { value: "3+", label: "Years Experience", bg: "bg-white", border: "border-gray-300" },
              { value: skillsData.length, label: "Technologies", bg: "bg-white", border: "border-gray-300" },
              { 
                value: Math.round(skillsData.reduce((sum, skill) => sum + skill.proficiency, 0) / skillsData.length) + "%", 
                label: "Avg Proficiency", 
                bg: "bg-white", 
                border: "border-gray-300" 
              }
            ].map((stat, index) => (
              <div key={index} className={`${stat.bg} ${stat.border} border rounded-xl p-6 text-center shadow-md hover:shadow-lg transition-all duration-300`}>
                <div className="text-4xl font-bold text-gray-500 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          
          <div className="grid lg:grid-cols-2 gap-8">
           
            <div className="bg-white border border-gray-300 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-green-100 border border-green-200 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Currently Learning</h3>
              </div>
              
              <div className="space-y-3">
                {[
                  "Advanced React patterns and optimization",
                  "TypeScript for better type safety",
                  "Next.js for full-stack development",
                  "Data structures and algorithms mastery"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 bg-blue-100 border border-blue-200 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Future Goals</h3>
              </div>
              
              <div className="space-y-3">
                {[
                  "Cloud technologies (AWS, Azure)",
                  "DevOps and CI/CD pipelines",
                  "Mobile development with React Native",
                  "Machine learning fundamentals"
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600">{item}</span>
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