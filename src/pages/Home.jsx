import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

const AnimatedCounter = ({ value, suffix = "" }) => {
  const [inView, setInView] = useState(false);
  const digits = value.toString().split('');

  return (
    <motion.div
      className="inline-flex items-center overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      onViewportEnter={() => setInView(true)}
    >
      {digits.map((digit, idx) => (
        <div key={idx} className="inline-block overflow-hidden h-10" style={{ width: '1.2ch' }}>
          <motion.div
            initial={{ y: 0 }}
            animate={inView ? { y: -parseInt(digit) * 40 } : { y: 0 }}
            transition={{
              duration: 2,
              ease: [0.22, 1, 0.36, 1],
              delay: idx * 0.05
            }}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <div key={num} className="h-10 flex items-center justify-center">
                {num}
              </div>
            ))}
          </motion.div>
        </div>
      ))}
      {suffix && <span className="ml-0.5">{suffix}</span>}
    </motion.div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  })
};

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
    
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            <motion.div
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={fadeUp}
                className="mb-6"
              >
                <div className="inline-flex items-center gap-2 text-sm text-slate-600">
                  <span>Assistant Professor</span>
                  <span className="text-slate-300">•</span>
                  <span>Software Engineer</span>
                </div>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-6xl font-semibold text-slate-900 mb-6 leading-tight"
                variants={fadeUp}
                custom={1}
              >
               Kaustubh Deshmukh
              </motion.h1>

              <motion.p
                className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl"
                variants={fadeUp}
                custom={2}
              >
                I teach programming fundamentals, coordinate student projects, and build production systems. My work bridges academic responsibility with engineering judgment.
              </motion.p>
              
              <motion.div
                className="flex flex-col gap-2 text-sm text-slate-600 mb-10"
                variants={fadeUp}
                custom={3}
              >
                <div>R.H. Sapat College of Engineering, Management Studies & Research</div>
                <div>MCA Project Coordinator • C and Python Instructor</div>
              </motion.div>

              <motion.div
                className="flex flex-wrap gap-3"
                variants={fadeUp}
                custom={4}
              >
                <a
                  href="work"
                  className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                >
                  View Work
                </a>
                <a
                  href="contact"
                  className="px-5 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium hover:border-slate-400 transition-colors"
                >
                  Contact
                </a>
                <a
                  href="/assets/Kaustubh_Deshmukh_Resume1.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-slate-600 text-sm font-medium hover:text-slate-900 transition-colors"
                >
                  Resume →
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={5}
            >
              <div className="w-72 h-72 border border-slate-300 bg-white shadow-sm">
                <img
                  src="/src/assets/profile.jpg"
                  alt="Kaustubh Deshmukh"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `
                      <div class="w-full h-full flex items-center justify-center bg-slate-50">
                        <div class="text-center">
                          <div class="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-3 flex items-center justify-center text-slate-600 text-2xl font-semibold">
                            KD
                          </div>
                        </div>
                      </div>
                    `;
                  }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            {[
              { number: 100, suffix: "+", label: "Students instructed" },
              { number: 10, suffix: "+", label: "Projects coordinated" },
              { number: 2, suffix: "", label: "Core courses taught" }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={idx}
              >
                <div className="text-3xl font-semibold text-slate-900 mb-1">
                  <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-slate-500">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How I Think */}
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-12">
              How I Think
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  principle: "Teaching builds thinking",
                  explanation: "Programming instruction means teaching problem decomposition and logic, not just syntax. I prepare students for systems they haven't encountered yet."
                },
                {
                  principle: "Projects require judgment",
                  explanation: "Coordinating student work means evaluating feasibility and learning outcomes. Good projects teach when to simplify, when to architect, and when to deliver."
                },
                {
                  principle: "Systems outlive intentions",
                  explanation: "Production work requires different decisions than prototypes. I build for the people who inherit the code and maintain the architecture."
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                  custom={idx}
                >
                  <h3 className="text-lg font-semibold text-slate-900 mb-3">
                    {item.principle}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {item.explanation}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-12">
              What I Do
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Teaching",
                  items: [
                    "C Programming fundamentals",
                    "Python problem-solving",
                    "First-year engineering instruction"
                  ]
                },
                {
                  title: "Coordination",
                  items: [
                    "MCA project oversight",
                    "Industry internship guidance",
                    "Technical mentorship"
                  ]
                },
                {
                  title: "Engineering",
                  items: [
                    "Web application development",
                    "System architecture decisions",
                    "Production maintenance"
                  ]
                }
              ].map((section, idx) => (
                <motion.div
                  key={idx}
                  className="border-t border-slate-200 pt-6"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                  custom={idx}
                >
                  <h3 className="text-base font-semibold text-slate-900 mb-4">
                    {section.title}
                  </h3>
                  <div className="space-y-2 text-sm text-slate-600">
                    {section.items.map((item, i) => (
                      <div key={i}>{item}</div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <p className="text-2xl md:text-3xl font-light leading-relaxed">
              I prepare students for industry problems, evaluate project complexity, and make technical decisions that outlast implementation. This requires understanding constraints, consequences, and what matters beyond delivery.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
          >
            <h2 className="text-sm font-medium text-slate-500 uppercase tracking-wide mb-12">
              Technical Foundation
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  area: "Languages",
                  skills: ["C", "C++", "JavaScript", "Python","SQL"]
                },
                {
                  area: "Frontend",
                  skills: ["React", "Tailwind CSS","Bootstrap", "Component Architecture", "State Management"]
                },
                {
                  area: "Backend & Data",
                  skills: ["Node.js", "Express", "MongoDB","MySQL", "API Design"]
                },
                {
                  area: "Practice",
                  skills: ["Data Structures", "Algorithms", "System Design", "Code Review"]
                }
              ].map((capability, idx) => (
                <motion.div
                  key={idx}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={fadeUp}
                  custom={idx}
                >
                  <h3 className="font-semibold text-slate-900 mb-3">{capability.area}</h3>
                  <div className="space-y-1.5 text-sm text-slate-600">
                    {capability.skills.map((skill, i) => (
                      <div key={i}>{skill}</div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h2 className="text-2xl font-semibold text-slate-900 mb-4">
              Open to appropriate collaboration
            </h2>
            <p className="text-base text-slate-600 mb-8 max-w-2xl mx-auto">
              Academic partnerships, technical work, and mentorship that aligns with teaching, project coordination, or production engineering.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="contact"
                className="px-6 py-3 bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
              >
                Get in Touch
              </a>
              <a
                href="work"
                className="px-6 py-3 border border-slate-300 text-slate-700 text-sm font-medium hover:border-slate-400 transition-colors"
              >
                View Work
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;