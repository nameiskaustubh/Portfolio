import React, { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  })
};

const Capabilities = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const capabilities = {
    teaching: {
      title: "Teaching & Pedagogy",
      description: "Translating complex technical concepts into structured learning experiences for first-year engineers and graduate students.",
      areas: [
        {
          name: "Programming Fundamentals",
          skills: ["C Programming", "Python", "Problem Decomposition", "Algorithmic Thinking"],
          depth: "Teaching students to think systematically about problems before writing code. Emphasis on logical rigor and debugging methodology."
        },
        {
          name: "Curriculum Design",
          skills: ["Course Planning", "Assessment Design", "Learning Outcomes", "Practical Labs"],
          depth: "Developing coursework that balances theoretical foundations with industry-relevant applications."
        },
        {
          name: "Student Mentorship",
          skills: ["Project Guidance", "Career Counseling", "Code Review", "Technical Interview Prep"],
          depth: "Guiding students from academic concepts to professional engineering practices through hands-on mentorship."
        }
      ]
    },
    
    engineering: {
      title: "Frontend Engineering",
      description: "Building production-grade web applications with modern JavaScript ecosystem and component-driven architecture.",
      areas: [
        {
          name: "React Development",
          skills: ["Component Architecture", "Hooks & Context", "State Management", "Performance Optimization"],
          depth: "Architecting scalable React applications with clean separation of concerns and reusable component libraries."
        },
        {
          name: "Modern JavaScript",
          skills: ["ES6+ Features", "Async Programming", "DOM Manipulation", "API Integration"],
          depth: "Writing maintainable JavaScript with modern syntax, proper error handling, and efficient data flow."
        },
        {
          name: "Styling & UI",
          skills: ["Tailwind CSS", "Responsive Design", "CSS Architecture", "Accessibility"],
          depth: "Creating responsive, accessible interfaces using utility-first CSS and mobile-first design principles."
        },
        {
          name: "Build & Deploy",
          skills: ["Vite", "Firebase", "Vercel", "Git Workflow"],
          depth: "Managing development workflows from local setup through production deployment with CI/CD awareness."
        }
      ]
    },
    
    backend: {
      title: "Backend & Data",
      description: "Working with databases, APIs, and server-side technologies to build complete full-stack solutions.",
      areas: [
        {
          name: "Database Management",
          skills: ["MySQL", "Database Design", "SQL Queries", "Data Modeling"],
          depth: "Designing normalized database schemas and writing optimized queries for data integrity and performance."
        },
        {
          name: "Firebase Integration",
          skills: ["Authentication", "Firestore", "Real-time Data", "Cloud Functions"],
          depth: "Implementing serverless backend solutions with Firebase for rapid prototyping and production apps."
        },
        {
          name: "API Development",
          skills: ["RESTful APIs", "Node.js", "Express", "Data Validation"],
          depth: "Building server-side APIs with proper routing, middleware, and error handling patterns."
        }
      ]
    },
    
    systems: {
      title: "System Thinking",
      description: "Approaching problems holistically with consideration for architecture, scalability, and maintainability.",
      areas: [
        {
          name: "Project Coordination",
          skills: ["Team Leadership", "Technical Planning", "Code Review", "Documentation"],
          depth: "Coordinating multi-person projects through complete development lifecycle with clear technical standards."
        },
        {
          name: "Problem Solving",
          skills: ["Algorithm Design", "Data Structures", "Optimization", "Debugging"],
          depth: "Breaking down complex problems into manageable components using appropriate algorithms and data structures."
        },
        {
          name: "Quality Assurance",
          skills: ["Code Standards", "Error Handling", "Testing Mindset", "Performance Monitoring"],
          depth: "Ensuring code quality through systematic review, proper error boundaries, and performance considerations."
        }
      ]
    },
    
    languages: {
      title: "Programming Languages",
      description: "Proficiency across multiple languages for teaching, development, and problem-solving contexts.",
      areas: [
        {
          name: "Primary Languages",
          skills: ["JavaScript", "C", "Python", "Java", "C++"],
          depth: "Strong foundation in multiple paradigms: procedural (C), object-oriented (Java, C++), and multi-paradigm (JavaScript, Python)."
        },
        {
          name: "Academic Focus",
          skills: ["C for Systems", "Python for Scripting", "Java for OOP", "C++ for DSA"],
          depth: "Teaching language fundamentals while connecting concepts to real-world engineering applications."
        }
      ]
    }
  };

  const categories = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'backend', label: 'Backend' },
    { id: 'systems', label: 'Systems' },
    { id: 'languages', label: 'Languages' }
  ];

  const filteredCapabilities = activeCategory === 'all' 
    ? Object.entries(capabilities)
    : [[activeCategory, capabilities[activeCategory]]];

  const technicalProficiency = [
    { category: "Frontend", level: 85, tools: "React, JavaScript, Tailwind CSS" },
    { category: "Backend", level: 70, tools: "Node.js, Firebase, MySQL" },
    { category: "Teaching", level: 90, tools: "C, Python, Curriculum Design" },
    { category: "Systems", level: 75, tools: "DSA, Problem Solving, Architecture" }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Capabilities
          </h1>
          <p className="text-3xl md:text-4xl text-slate-900 font-light max-w-4xl">
            A hybrid skill set spanning teaching, engineering, and systems thinking — built to deliver both in the classroom and in production.
          </p>
        </motion.div>

        {/* Proficiency Overview */}
        <motion.section
          className="mb-20 p-8 bg-slate-50 rounded-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-8">
            Technical Proficiency
          </h2>
          
          <div className="space-y-6">
            {technicalProficiency.map((item, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline mb-3">
                  <div>
                    <span className="font-semibold text-slate-900">{item.category}</span>
                    <span className="text-sm text-slate-600 ml-3">{item.tools}</span>
                  </div>
                  <span className="text-sm font-medium text-slate-700">{item.level}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2">
                  <motion.div
                    className="h-full bg-slate-900 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.1 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap gap-3 mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Capabilities Grid */}
        <div className="space-y-20">
          {filteredCapabilities.map(([key, capability], index) => (
            <motion.section
              key={key}
              className="border-b border-slate-200 pb-20 last:border-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              <div className="mb-10">
                <h2 className="text-2xl font-semibold text-slate-900 mb-3">
                  {capability.title}
                </h2>
                <p className="text-slate-700 leading-relaxed max-w-3xl">
                  {capability.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {capability.areas.map((area, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-slate-50 rounded-xl p-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={fadeUp}
                    custom={idx}
                  >
                    <h3 className="text-lg font-semibold text-slate-900 mb-4">
                      {area.name}
                    </h3>
                    
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {area.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-white text-slate-700 text-sm rounded-full border border-slate-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      {area.depth}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        {/* What I Bring */}
        <motion.section
          className="mt-24 py-16 px-8 bg-slate-900 text-white rounded-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-8">
            What I Bring to Projects
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-slate-200">
                Academic Rigor
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Systematic problem-solving methodology, clear documentation, and emphasis on 
                maintainable code that can be understood and extended by others.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-slate-200">
                Industry Awareness
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Understanding of production constraints, deployment workflows, and the trade-offs 
                between ideal solutions and practical delivery timelines.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-slate-200">
                Teaching Mindset
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Ability to explain complex technical decisions clearly, mentor junior developers, 
                and create documentation that serves as a learning resource.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 text-slate-200">
                Coordination Experience
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Proven track record coordinating multi-person projects, conducting code reviews, 
                and ensuring technical standards across team contributions.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Continuous Learning */}
        <motion.section
          className="mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-8">
            Continuous Development
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Currently Strengthening
              </h3>
              <ul className="space-y-3">
                {[
                  "Advanced React patterns and performance optimization",
                  "TypeScript for type-safe application development",
                  "Next.js for full-stack React applications",
                  "Data structures and algorithms mastery (LeetCode practice)",
                  "System design principles and scalability patterns"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <span className="text-slate-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Future Exploration
              </h3>
              <ul className="space-y-3">
                {[
                  "Cloud technologies (AWS, Azure) for scalable deployment",
                  "DevOps practices and CI/CD pipeline implementation",
                  "React Native for cross-platform mobile development",
                  "GraphQL for efficient API design",
                  "Testing frameworks and test-driven development"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <span className="text-slate-400 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          className="mt-24 pt-12 border-t border-slate-200 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <h3 className="text-2xl font-semibold text-slate-900 mb-4">
            Looking for Technical Collaboration?
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Available for frontend development projects, technical consulting, 
            curriculum development, and academic-industry partnerships.
          </p>
          
        </motion.div>
      </div>
    </div>
  );
};

export default Capabilities;