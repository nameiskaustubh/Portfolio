import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
  })
};

const DSA = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeetCodeStats = async () => {
      try {
        setLoading(true);
        const username = 'afcpwRGndV';
        const apiEndpoints = [
          `https://alfa-leetcode-api.onrender.com/userProfile/${username}`,
          `https://leetcode-stats-api.herokuapp.com/${username}`,
          `https://leetcodeapi-v1.vercel.app/${username}`
        ];

        let data = null;
        for (const endpoint of apiEndpoints) {
          try {
            const response = await fetch(endpoint, {
              headers: { 'Accept': 'application/json' },
              mode: 'cors'
            });
            
            if (response.ok) {
              const result = await response.json();
              
              if (result.totalSolved !== undefined || result.totalQuestionsSolved !== undefined) {
                data = {
                  totalSolved: result.totalSolved || result.totalQuestionsSolved || 0,
                  easySolved: result.easySolved || 0,
                  mediumSolved: result.mediumSolved || 0,
                  hardSolved: result.hardSolved || 0,
                  ranking: result.ranking || 'N/A'
                };
                break;
              }
            }
          } catch (err) {
            continue;
          }
        }

        if (data) {
          setStats(data);
        } else {
          setError('Unable to fetch data');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLeetCodeStats();
  }, []);

  const approach = {
    methodology: [
      {
        phase: "Pattern Recognition",
        description: "Study common algorithmic patterns and solution templates to build a framework for approaching new problems.",
        practices: [
          "Categorize problems by underlying patterns (sliding window, two pointers, etc.)",
          "Build mental models for when to apply specific algorithms",
          "Document pattern variations and edge cases",
          "Review multiple solutions to understand trade-offs"
        ]
      },
      {
        phase: "Consistent Practice",
        description: "Daily problem-solving to reinforce concepts and maintain algorithmic thinking skills.",
        practices: [
          "Solve 2-3 problems daily with focus on understanding, not speed",
          "Alternate between easy/medium problems for balanced growth",
          "Revisit previously solved problems to explore optimizations",
          "Participate in weekly contests for timed practice"
        ]
      },
      {
        phase: "Iterative Review",
        description: "Regular revisiting of solved problems to reinforce learning and explore alternative approaches.",
        practices: [
          "Implement same problems using different algorithms",
          "Analyze time and space complexity improvements",
          "Document learning in personal knowledge base",
          "Connect DSA concepts to real-world engineering problems"
        ]
      }
    ],

    currentFocus: [
      "Arrays and string manipulation algorithms",
      "Dynamic programming pattern recognition",
      "Binary tree and graph traversal techniques",
      "Optimization strategies and complexity analysis"
    ],

    teachingConnection: [
      {
        title: "Reinforces Teaching",
        description: "DSA practice strengthens my ability to explain algorithmic concepts to students with clarity and precision."
      },
      {
        title: "Problem-Solving Framework",
        description: "The systematic approach I use for DSA translates directly to teaching students how to decompose complex problems."
      },
      {
        title: "Code Quality Standards",
        description: "Writing clean, efficient solutions helps me set and maintain high coding standards in student projects."
      }
    ]
  };

  const goals = {
    shortTerm: [
      "Achieve 300+ problems solved by mid-2026",
      "Strengthen dynamic programming and graph algorithms",
      "Maintain daily solving consistency",
      "Improve contest performance and ranking"
    ],
    longTerm: [
      "Reach top 20% global ranking on LeetCode",
      "Build comprehensive DSA teaching materials",
      "Apply advanced algorithms in production projects",
      "Mentor students through technical interview preparation"
    ]
  };

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
            Data Structures & Algorithms
          </h1>
          <p className="text-3xl md:text-4xl text-slate-900 font-light max-w-4xl">
            Systematic practice in algorithmic problem-solving — building both teaching foundations and engineering discipline.
          </p>
        </motion.div>

        {/* Positioning Statement */}
        <motion.section
          className="mb-20 p-8 bg-slate-50 rounded-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <p className="text-lg text-slate-700 leading-relaxed">
            DSA practice serves dual purposes: strengthening my ability to teach algorithmic thinking 
            to students while maintaining the problem-solving rigor required for production engineering. 
            This is not competitive programming—it's systematic skill development that reinforces both 
            teaching and technical capabilities.
          </p>
        </motion.section>

        {/* LeetCode Stats */}
        {loading ? (
          <motion.div
            className="mb-20 p-12 bg-slate-50 rounded-2xl text-center"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-200 border-t-slate-900 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading progress data...</p>
          </motion.div>
        ) : error ? (
          <motion.div
            className="mb-20 p-8 bg-slate-50 rounded-2xl"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <p className="text-slate-600 text-center">
              Problem-solving progress tracked via LeetCode platform
            </p>
          </motion.div>
        ) : stats ? (
          <motion.section
            className="mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-8">
              Current Progress
            </h2>
            
            <div className="grid md:grid-cols-4 gap-6 mb-8">
              <div className="bg-slate-50 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-slate-900 mb-2">{stats.totalSolved}</div>
                <div className="text-sm text-slate-600">Problems Solved</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center border border-green-100">
                <div className="text-4xl font-bold text-green-700 mb-2">{stats.easySolved}</div>
                <div className="text-sm text-green-700">Easy</div>
              </div>
              <div className="bg-amber-50 rounded-xl p-6 text-center border border-amber-100">
                <div className="text-4xl font-bold text-amber-700 mb-2">{stats.mediumSolved}</div>
                <div className="text-sm text-amber-700">Medium</div>
              </div>
              <div className="bg-red-50 rounded-xl p-6 text-center border border-red-100">
                <div className="text-4xl font-bold text-red-700 mb-2">{stats.hardSolved}</div>
                <div className="text-sm text-red-700">Hard</div>
              </div>
            </div>

            <div className="flex justify-center">
              <a
                href="https://leetcode.com/u/afcpwRGndV"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:border-slate-400 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                View LeetCode Profile
              </a>
            </div>
          </motion.section>
        ) : null}

        {/* Learning Methodology */}
        <motion.section
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-8">
            Learning Methodology
          </h2>
          
          <div className="space-y-12">
            {approach.methodology.map((method, idx) => (
              <motion.div
                key={idx}
                className="border-l-2 border-slate-300 pl-8"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                custom={idx}
              >
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {method.phase}
                </h3>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  {method.description}
                </p>
                <ul className="space-y-2">
                  {method.practices.map((practice, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <span className="text-slate-400 mt-1">•</span>
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Current Focus */}
        <motion.section
          className="mb-20 p-8 bg-slate-50 rounded-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-6">
            Current Focus Areas
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {approach.currentFocus.map((focus, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <span className="text-slate-400 mt-1">•</span>
                <span className="text-slate-700">{focus}</span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Teaching Connection */}
        <motion.section
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-8">
            Connection to Teaching
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {approach.teachingConnection.map((connection, idx) => (
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
                  {connection.title}
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {connection.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Goals */}
        <motion.section
          className="mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
        >
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-8">
            Development Goals
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                2025 Objectives
              </h3>
              <ul className="space-y-3">
                {goals.shortTerm.map((goal, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <span className="text-slate-400 mt-1">•</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-50 rounded-xl p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">
                Long-term Vision
              </h3>
              <ul className="space-y-3">
                {goals.longTerm.map((goal, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700">
                    <span className="text-slate-400 mt-1">•</span>
                    <span>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* Why DSA Matters */}
        <motion.section
          className="py-16 px-8 bg-slate-900 text-white rounded-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
        >
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">
            Why This Matters
          </h2>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>
              For teaching: DSA practice keeps me sharp in the concepts I teach students. 
              When explaining recursion, dynamic programming, or graph algorithms, I draw 
              from recent problem-solving experience, not just textbook knowledge.
            </p>
            <p>
              For engineering: Algorithmic thinking translates to better code in production. 
              Understanding time complexity helps me write efficient React components. 
              Knowing data structures informs database schema design and API optimization.
            </p>
            <p>
              For students: I model the continuous learning mindset I expect from them. 
              When they see their professor actively practicing DSA, it reinforces that 
              engineering is a discipline of ongoing skill development, not static knowledge.
            </p>
          </div>
        </motion.section>

        {/* CTA */}
        <motion.div
          className="mt-20 pt-12 border-t border-slate-200 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <p className="text-slate-600 mb-4">
            DSA practice is part of a broader commitment to technical excellence and teaching effectiveness.
          </p>
          
        </motion.div>
      </div>
    </div>
  );
};

export default DSA;