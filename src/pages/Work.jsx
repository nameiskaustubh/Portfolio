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

const Work = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: "Mentii — Mental Health Support Platform",
      category: "fullstack",
      year: "2024",
      type: "Academic Major Project",
      
      problem: "Students lack accessible, stigma-free mental health resources. Traditional counseling barriers (cost, availability, privacy concerns) prevent early intervention.",
      
      constraints: [
        "Academic timeline: 6-month development cycle",
        "Zero budget for third-party APIs",
        "Privacy-first architecture required",
        "Must function offline for core features"
      ],
      
      approach: [
        "Built React-based SPA with component-driven architecture for maintainability",
        "Implemented CBT-based chatbot using pattern matching (no expensive NLP APIs)",
        "Integrated Firebase for real-time data sync and authentication",
        "Developed sentiment analysis using TensorFlow.js for client-side processing",
        "Created mood prediction game using color psychology principles"
      ],
      
      outcome: [
        "Deployed production application serving real users",
        "Achieved <2s load time through code splitting and lazy loading",
        "Zero-cost hosting via Firebase free tier",
        "Coordinated 4-member team through full SDLC",
        "Presented at college technical symposium"
      ],
      
      stack: ["React", "Firebase", "TensorFlow.js", "Tailwind CSS"],
      
      links: {
        github: "https://github.com/nameiskaustubh/mentiii",
        live: "https://mentiii-kaustubhds-projects.vercel.app/"
      },
      
      featured: true
    },
    {
      id: 2,
      title: "Paste App — Clipboard Management System",
      category: "frontend",
      year: "2024",
      type: "Portfolio Project",
      
      problem: "Need for persistent, searchable clipboard history with sharing capabilities across sessions.",
      
      constraints: [
        "State management complexity with multiple operations",
        "Performance with large text content",
        "Browser storage limitations"
      ],
      
      approach: [
        "Architected Redux Toolkit for centralized state management",
        "Implemented localStorage persistence layer with automatic sync",
        "Built search functionality with debouncing for performance",
        "Designed component hierarchy for reusability",
        "Applied Tailwind utility classes for responsive design"
      ],
      
      outcome: [
        "Fully functional CRUD application with instant search",
        "Clean separation of concerns (UI/State/Storage)",
        "Reusable component library extracted",
        "Production-ready deployment on Vercel"
      ],
      
      stack: ["React", "Redux Toolkit", "Tailwind CSS", "Vite"],
      
      links: {
        github: "https://github.com/nameiskaustubh/Paste-App",
        live: "https://paste-app-silk-alpha.vercel.app/"
      },
      
      featured: false
    },
    {
      id: 3,
      title: "Weather Application — Real-time Data Visualization",
      category: "frontend",
      year: "2024",
      type: "API Integration Project",
      
      problem: "Users need quick access to location-based weather data with forecasting.",
      
      constraints: [
        "External API rate limits",
        "Varying response times",
        "Multiple data formats to normalize"
      ],
      
      approach: [
        "Integrated OpenWeather API with proper error handling",
        "Implemented geolocation with fallback mechanisms",
        "Built responsive UI with Material-UI components",
        "Optimized API calls with caching strategy",
        "Designed loading states and error boundaries"
      ],
      
      outcome: [
        "Reliable weather data display with 5-day forecast",
        "Sub-second response time for cached locations",
        "Graceful degradation on API failures",
        "Mobile-first responsive design"
      ],
      
      stack: ["React", "OpenWeather API", "Material-UI", "Vite"],
      
      links: {
        github: "https://github.com/nameiskaustubh/weather-app",
        live: "https://weather-app-kaustubh-deshmukhs-projects.vercel.app/"
      },
      
      featured: false
    },
    {
      id: 4,
      title: "Color Maze Mood Predictor",
      category: "frontend",
      year: "2024",
      type: "Experimental Psychology Project",
      
      problem: "Exploring correlation between color preferences and emotional states through interactive gameplay.",
      
      constraints: [
        "Canvas API performance limitations",
        "Complex game state management",
        "Data collection without backend"
      ],
      
      approach: [
        "Built custom game engine using Canvas API",
        "Implemented color psychology mapping algorithm",
        "Designed Firebase integration for analytics",
        "Created completion time tracking mechanism",
        "Developed mood prediction based on user choices"
      ],
      
      outcome: [
        "Interactive game with smooth 60fps performance",
        "Data collection system for research purposes",
        "Insights into user behavior patterns",
        "Demonstrated advanced JavaScript capabilities"
      ],
      
      stack: ["JavaScript", "Canvas API", "Firebase", "CSS3"],
      
      links: {
        github: "#",
        live: "#"
      },
      
      featured: false
    }
  ];

  const filters = [
    { id: 'all', label: 'All Work', count: projects.length },
    { id: 'fullstack', label: 'Full-Stack', count: projects.filter(p => p.category === 'fullstack').length },
    { id: 'frontend', label: 'Frontend', count: projects.filter(p => p.category === 'frontend').length }
  ];

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedFilter);

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
            Selected Work
          </h1>
          <p className="text-3xl md:text-4xl text-slate-900 font-light max-w-3xl">
            Engineering case studies demonstrating problem-solving, technical decision-making, and production deployment.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          className="flex flex-wrap gap-3 mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                selectedFilter === filter.id
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {filter.label} <span className="opacity-60">({filter.count})</span>
            </button>
          ))}
        </motion.div>

        {/* Project List */}
        <div className="space-y-24">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              className="border-b border-slate-200 pb-24 last:border-0"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
            >
              {/* Project Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {project.featured && (
                    <span className="px-3 py-1 bg-slate-900 text-white text-xs font-medium rounded-full">
                      Featured
                    </span>
                  )}
                  <span className="text-sm text-slate-500">{project.type}</span>
                  <span className="text-sm text-slate-400">•</span>
                  <span className="text-sm text-slate-500">{project.year}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
                  {project.title}
                </h2>
              </div>

              {/* Problem Statement */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
                  Problem
                </h3>
                <p className="text-slate-700 leading-relaxed">
                  {project.problem}
                </p>
              </div>

              {/* Constraints */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
                  Constraints
                </h3>
                <ul className="space-y-2">
                  {project.constraints.map((constraint, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <span className="text-slate-400 mt-1">•</span>
                      <span>{constraint}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technical Approach */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
                  Technical Decisions
                </h3>
                <ul className="space-y-2">
                  {project.approach.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <span className="text-slate-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Outcome */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
                  Outcome
                </h3>
                <ul className="space-y-2">
                  {project.outcome.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-700">
                      <span className="text-slate-400 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">
                  Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  View Code
                </a>
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-300 text-slate-700 text-sm font-medium rounded-lg hover:border-slate-400 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          className="mt-24 pt-12 border-t border-slate-200 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={fadeUp}
        >
          <p className="text-slate-600 mb-6">
            Interested in technical collaboration or project consultation?
          </p>
          <a
            href="contact"
            className="inline-block px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Get in Touch
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Work;