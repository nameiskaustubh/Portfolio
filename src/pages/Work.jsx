/**
 * Work.jsx — 3D Tilt Cards + Cinematic Project Reveals
 * 
 * - Filter bar with morphing active state
 * - 3D tilt cards via react-tilt (fallback if not installed)
 * - Hovering reveals project details via animated overlay
 * - CTA links open with transform + icon animation
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   DATA
   ================================================================ */
const projects = [
  {
    id: 1,
    title: 'Mentii',
    subtitle: 'Mental Health Support Platform',
    category: 'fullstack',
    year: '2024',
    type: 'Major Academic Project',
    badge: 'Featured',
    badgeColor: 'var(--accent)',
    accentColor: '#818cf8',
    problem:
      'Students lack accessible, stigma-free mental health resources. Traditional counseling barriers — cost, availability, privacy — prevent early intervention.',
    decisions: [
      'React SPA with component-driven architecture for maintainability',
      'CBT-based chatbot using pattern matching (zero-cost NLP)',
      'Firebase for real-time sync + auth (zero infrastructure cost)',
      'TensorFlow.js for client-side sentiment analysis (privacy-first)',
      'Mood prediction via color psychology game mechanic',
    ],
    outcome: [
      'Production deployment serving real users',
      '<2s load time via code splitting + lazy loading',
      'Zero hosting cost — Firebase free tier',
      '4-member team coordination through full SDLC',
    ],
    stack: ['React', 'Firebase', 'TensorFlow.js', 'Tailwind CSS', 'Vite'],
    links: {
      github: 'https://github.com/nameiskaustubh/mentiii',
      live: 'https://mentiii-kaustubhds-projects.vercel.app/',
    },
  },
  {
    id: 2,
    title: 'PasteApp',
    subtitle: 'Clipboard Management System',
    category: 'frontend',
    year: '2024',
    type: 'Portfolio Project',
    badge: null,
    accentColor: '#fbbf24',
    problem:
      'Persistent, searchable clipboard history with cross-session sharing capabilities.',
    decisions: [
      'Redux Toolkit for centralized state management',
      'localStorage persistence with automatic sync layer',
      'Debounced search for instant, performant filtering',
      'Component hierarchy designed for reusability',
    ],
    outcome: [
      'Full CRUD with instant search across all entries',
      'Clean UI/State/Storage separation of concerns',
      'Extracted reusable component library',
      'Vercel deployment with zero config',
    ],
    stack: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Vite'],
    links: {
      github: 'https://github.com/nameiskaustubh/Paste-App',
      live: 'https://paste-app-silk-alpha.vercel.app/',
    },
  },
  {
    id: 3,
    title: 'WeatherApp',
    subtitle: 'Real-time Data Visualization',
    category: 'frontend',
    year: '2024',
    type: 'API Integration Project',
    badge: null,
    accentColor: '#22d3ee',
    problem:
      'Location-based weather with forecasting, graceful offline handling, and mobile-first UX.',
    decisions: [
      'OpenWeather API integration with proper error boundaries',
      'Geolocation with cascading fallback mechanisms',
      'Material-UI component system for rapid UI',
      'Response caching strategy for sub-second repeat loads',
    ],
    outcome: [
      '5-day forecast with hourly breakdown',
      'Sub-second response for cached locations',
      'Graceful degradation on API failures',
      'Mobile-first responsive across all breakpoints',
    ],
    stack: ['React', 'OpenWeather API', 'Material-UI', 'Vite'],
    links: {
      github: 'https://github.com/nameiskaustubh/weather-app',
      live: 'https://weather-app-kaustubh-deshmukhs-projects.vercel.app/',
    },
  },
  {
    id: 4,
    title: 'ColorMaze',
    subtitle: 'Mood Predictor Game',
    category: 'experimental',
    year: '2024',
    type: 'Psychology × Engineering',
    badge: 'Experimental',
    badgeColor: 'var(--accent-warm)',
    accentColor: '#f472b6',
    problem:
      'Exploring correlation between color preferences and emotional states through interactive gameplay.',
    decisions: [
      'Custom game engine with Canvas API for 60fps performance',
      'Color psychology mapping algorithm (hue → emotion)',
      'Firebase Analytics for behavior pattern research',
      'Completion time tracking as a secondary mood signal',
    ],
    outcome: [
      'Smooth 60fps gameplay with Canvas optimization',
      'Mood data collection for research purposes',
      'Novel approach to emotional state inference',
      'Demonstrated advanced vanilla JS capabilities',
    ],
    stack: ['JavaScript', 'Canvas API', 'Firebase', 'CSS3'],
    links: { github: '#', live: '#' },
  },
];

/* ================================================================
   PROJECT CARD
   ================================================================ */
const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -8;
    const rotY = ((x - cx) / cx) * 8;

    gsap.to(card, {
      rotateX: rotX,
      rotateY: rotY,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 1200,
    });

    // Move glow
    if (glowRef.current) {
      glowRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, ${project.accentColor}15, transparent 60%)`;
    }
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.4)',
    });
    if (glowRef.current) glowRef.current.style.background = 'transparent';
    setHovered(false);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ marginBottom: '2px' }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          position: 'relative',
          background: 'var(--bg-1)',
          border: '1px solid var(--border)',
          borderRadius: '20px',
          overflow: 'hidden',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transition: 'border-color 0.3s ease',
          cursor: 'none',
        }}
      >
        {/* Mouse-track glow */}
        <div
          ref={glowRef}
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'background 0.1s',
          }}
        />

        {/* Accent stripe */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, ${project.accentColor}, transparent)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        <div style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)', position: 'relative', zIndex: 2 }}>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1.5rem',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.5rem',
                  flexWrap: 'wrap',
                }}
              >
                {project.badge && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.65rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '100px',
                      background: `${project.accentColor}20`,
                      color: project.badgeColor,
                      border: `1px solid ${project.accentColor}40`,
                    }}
                  >
                    {project.badge}
                  </span>
                )}
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-3)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {project.type} · {project.year}
                </span>
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  letterSpacing: '0.02em',
                  color: 'var(--text-1)',
                  lineHeight: 1,
                  marginBottom: '0.25rem',
                }}
              >
                {project.title}
              </h2>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  color: 'var(--text-3)',
                }}
              >
                {project.subtitle}
              </p>
            </div>

            {/* Stack pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', maxWidth: '280px' }}>
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.08em',
                    padding: '0.3rem 0.7rem',
                    borderRadius: '100px',
                    background: 'var(--bg-2)',
                    color: 'var(--text-3)',
                    border: '1px solid var(--border)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Content grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
              marginBottom: '2rem',
            }}
          >
            {/* Problem */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: project.accentColor,
                  marginBottom: '0.75rem',
                }}
              >
                Problem
              </div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.875rem',
                  color: 'var(--text-2)',
                  lineHeight: 1.6,
                }}
              >
                {project.problem}
              </p>
            </div>

            {/* Decisions */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: project.accentColor,
                  marginBottom: '0.75rem',
                }}
              >
                Technical Decisions
              </div>
              <ul style={{ listStyle: 'none' }}>
                {project.decisions.map((d, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '0.6rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.82rem',
                      color: 'var(--text-3)',
                      marginBottom: '0.4rem',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: project.accentColor, flexShrink: 0, marginTop: '2px' }}>→</span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Outcome */}
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: project.accentColor,
                  marginBottom: '0.75rem',
                }}
              >
                Outcome
              </div>
              <ul style={{ listStyle: 'none' }}>
                {project.outcome.map((o, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '0.6rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.82rem',
                      color: 'var(--text-3)',
                      marginBottom: '0.4rem',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }}>✓</span>
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Links */}
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              paddingTop: '1.5rem',
              borderTop: '1px solid var(--border)',
              flexWrap: 'wrap',
            }}
          >
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.5rem',
                borderRadius: '100px',
                background: 'var(--text-1)',
                color: 'var(--bg-0)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                fontWeight: 600,
                transition: 'background 0.3s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = project.accentColor)}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--text-1)')}
            >
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Source
            </a>

            {project.links.live !== '#' && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 1.5rem',
                  borderRadius: '100px',
                  border: '1px solid var(--border-hover)',
                  color: 'var(--text-2)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'border-color 0.3s, color 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = project.accentColor;
                  e.currentTarget.style.color = 'var(--text-1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-hover)';
                  e.currentTarget.style.color = 'var(--text-2)';
                }}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
};

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
const Work = () => {
  const [filter, setFilter] = useState('all');
  const filterBarRef = useRef(null);

  const filters = [
    { id: 'all',          label: 'All',         count: projects.length },
    { id: 'fullstack',    label: 'Full-Stack',   count: 1 },
    { id: 'frontend',     label: 'Frontend',     count: 2 },
    { id: 'experimental', label: 'Experimental', count: 1 },
  ];

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div style={{ background: 'var(--bg-0)', color: 'var(--text-1)', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '8rem 2.5rem 6rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '5rem' }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              marginBottom: '1.5rem',
            }}
          >
            Selected Work
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              letterSpacing: '0.01em',
              color: 'var(--text-1)',
              lineHeight: 0.95,
              marginBottom: '1.5rem',
            }}
          >
            ENGINEERING
            <br />
            <span style={{ color: 'var(--accent)' }}>CASE STUDIES</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-3)',
              maxWidth: '500px',
              lineHeight: 1.7,
            }}
          >
            Problem-solving, technical decision-making, and production deployment.
            Each project is documented as an engineering case study.
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          ref={filterBarRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '4rem',
            background: 'var(--bg-1)',
            border: '1px solid var(--border)',
            borderRadius: '100px',
            padding: '0.35rem',
            width: 'fit-content',
            flexWrap: 'wrap',
          }}
        >
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              style={{
                padding: '0.5rem 1.2rem',
                borderRadius: '100px',
                border: 'none',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                background: filter === f.id ? 'var(--text-1)' : 'transparent',
                color: filter === f.id ? 'var(--bg-0)' : 'var(--text-3)',
                transition: 'all 0.3s ease',
                cursor: 'none',
              }}
            >
              {f.label}
              <span style={{ opacity: 0.5, marginLeft: '0.4rem' }}>({f.count})</span>
            </button>
          ))}
        </motion.div>

        {/* Projects */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            marginTop: '8rem',
            paddingTop: '4rem',
            borderTop: '1px solid var(--border)',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--text-3)',
              marginBottom: '2rem',
              fontSize: '0.9rem',
            }}
          >
            Interested in technical collaboration or project consultation?
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.9rem 2.5rem',
              borderRadius: '100px',
              background: 'transparent',
              border: '1px solid var(--border-hover)',
              color: 'var(--text-1)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.color = 'var(--accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-hover)';
              e.currentTarget.style.color = 'var(--text-1)';
            }}
          >
            Get in Touch
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default Work;