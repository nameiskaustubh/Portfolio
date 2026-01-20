import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  })
};

const Teaching = () => {
  const courses = [
    {
      code: "FPL",
      name: "Fundamentals of Programming Language",
      language: "C Programming",
      level: "First-Year Engineering",
      topics: [
        "Programming fundamentals and problem decomposition",
        "Variables, operators, and control structures",
        "Functions, arrays, and pointers",
        "Memory management and data structures",
        "File handling and modular programming"
      ],
      approach: "Emphasis on logical thinking and algorithmic problem-solving. Students build foundations for systems programming and computer science concepts.",
      outcomes: [
        "Write structured, efficient C programs",
        "Understand memory allocation and pointers",
        "Debug and optimize code systematically",
        "Apply programming concepts to solve real problems"
      ]
    },
    {
      code: "PPS",
      name: "Programming and Problem Solving",
      language: "Python",
      level: "First-Year Engineering",
      topics: [
        "Python syntax and data types",
        "Control flow and iteration",
        "Functions and modular programming",
        "Data structures (lists, dictionaries, sets)",
        "Object-oriented programming concepts",
        "File I/O and exception handling"
      ],
      approach: "Focus on practical problem-solving with clean, readable code. Students learn to translate problems into algorithmic solutions using Python's expressive syntax.",
      outcomes: [
        "Develop solutions using Python's core libraries",
        "Write maintainable, documented code",
        "Apply OOP principles appropriately",
        "Solve computational problems independently"
      ]
    }
  ];

  const responsibilities = [
    {
      title: "MCA Major Project Coordinator",
      description: "Oversee final-year MCA students through complete project lifecycle, from ideation to deployment.",
      activities: [
        "Guide teams through requirements analysis and system design",
        "Review architectural decisions and technology choices",
        "Conduct code reviews and technical evaluations",
        "Mentor on industry best practices and standards",
        "Coordinate project presentations and demonstrations"
      ],
      impact: "Ensuring students deliver production-ready projects that demonstrate industry-relevant skills and engineering maturity."
    },
    {
      title: "Industrial Internship Coordination",
      description: "Facilitate industry connections and prepare MCA students for professional engineering environments.",
      activities: [
        "Connect students with technology companies",
        "Prepare students for technical interviews",
        "Monitor internship progress and learning outcomes",
        "Bridge academic concepts with industry practices",
        "Evaluate internship work and provide feedback"
      ],
      impact: "Bridging the academic-industry gap by ensuring students gain real-world exposure and professional readiness."
    }
  ];

  const teachingPhilosophy = {
    principles: [
      {
        title: "Industry Readiness",
        description: "Teaching extends beyond syntax. Students learn how professional engineers think, debug, and build systems that scale."
      },
      {
        title: "Logical Rigor",
        description: "Programming is taught as a discipline of clear thinking. Every concept builds toward systematic problem decomposition."
      },
      {
        title: "Practical Application",
        description: "Theory meets practice. Students work on problems that mirror real engineering challenges they'll face in industry."
      },
      {
        title: "Mentorship Focus",
        description: "Education is a long-term investment. I guide students not just through courses, but toward career trajectories in technology."
      }
    ]
  };

  const studentImpact = {
    metrics: [
      { value: "100+", label: "Students Taught Annually" },
      { value: "10+", label: "Major Projects Coordinated" },
      // { value: "15+", label: "Industry Internships Facilitated" },
      { value: "2", label: "Core Courses" }
    ]
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.div
          className="mb-20"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <h1 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">
            Teaching & Mentorship
          </h1>
          <p className="text-3xl md:text-4xl text-slate-900 font-light max-w-4xl mb-8">
            Preparing first-year engineers for systems thinking and guiding MCA students toward industry-grade development.
          </p>
          <div className="text-slate-600">
            <p className="mb-2">Assistant Professor</p>
            <p>R.H. Sapat College of Engineering, Management Studies & Research, Nashik</p>
          </div>
        </motion.div>

        {/* Student Impact Metrics */}
        <motion.section
          className="mb-24 py-12 px-8 bg-slate-50 rounded-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {studentImpact.metrics.map((metric, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                  {metric.value}
                </div>
                <div className="text-sm text-slate-600">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Courses Taught */}
        <motion.section
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-8">
            Courses Taught
          </h2>
          
          <div className="space-y-16">
            {courses.map((course, idx) => (
              <motion.div
                key={idx}
                className="border-l-2 border-slate-300 pl-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={idx}
              >
                <div className="mb-6">
                  <div className="inline-block px-3 py-1 bg-slate-900 text-white text-xs font-medium rounded-full mb-3">
                    {course.code}
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                    {course.name}
                  </h3>
                  <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                    <span>{course.language}</span>
                    <span>•</span>
                    <span>{course.level}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
                      Core Topics
                    </h4>
                    <ul className="space-y-2">
                      {course.topics.map((topic, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700">
                          <span className="text-slate-400 mt-1">•</span>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
                      Teaching Approach
                    </h4>
                    <p className="text-slate-700 leading-relaxed">
                      {course.approach}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
                      Student Outcomes
                    </h4>
                    <ul className="space-y-2">
                      {course.outcomes.map((outcome, i) => (
                        <li key={i} className="flex items-start gap-3 text-slate-700">
                          <span className="text-slate-400 mt-1">•</span>
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Coordination Responsibilities */}
        <motion.section
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-8">
            Academic Leadership
          </h2>
          
          <div className="space-y-12">
            {responsibilities.map((resp, idx) => (
              <motion.div
                key={idx}
                className="bg-slate-50 rounded-2xl p-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={idx}
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {resp.title}
                </h3>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  {resp.description}
                </p>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
                    Key Activities
                  </h4>
                  <ul className="space-y-2">
                    {resp.activities.map((activity, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700">
                        <span className="text-slate-400 mt-1">•</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600 italic">
                    {resp.impact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Teaching Philosophy */}
        <motion.section
          className="mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-8">
            Teaching Philosophy
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {teachingPhilosophy.principles.map((principle, idx) => (
              <motion.div
                key={idx}
                className="space-y-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={idx}
              >
                <h3 className="text-lg font-semibold text-slate-900">
                  {principle.title}
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Academic-Industry Bridge */}
        <motion.section
          className="py-16 px-8 bg-slate-900 text-white rounded-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <div className="max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
              The Academic-Industry Bridge
            </h2>
            <p className="text-slate-300 leading-relaxed mb-6">
              I don't just teach programming — I prepare students for real industry problems. 
              My dual role as educator and practicing engineer allows me to bring current 
              development practices directly into the classroom.
            </p>
            <p className="text-slate-300 leading-relaxed">
              Students learn not just syntax, but how to think like professional engineers: 
              debugging systematically, writing maintainable code, understanding trade-offs, 
              and building systems that solve real problems.
            </p>
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
            Academic Collaboration
          </h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Open to curriculum development, guest lectures, technical workshops, 
            and collaborative research in computer science education.
          </p>
          <a
            href="Contact"
            className="inline-block px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Connect for Collaboration
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Teaching;