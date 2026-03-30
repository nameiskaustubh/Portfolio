/**
 * Capabilities.jsx — Interactive Skills Universe
 * 
 * Features:
 * - CSS orbit animation for core skill cluster
 * - GSAP-animated progress bars on scroll
 * - Filterable skill cards with hover depth effects
 * - "What I bring" dark manifesto section
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ================================================================
   ORBITING SKILLS CORE
   ================================================================ */
const orbitSkills = [
  { label: 'React',       angle: 0,   orbit: 140, speed: '12s', color: '#61dafb', size: 40 },
  { label: 'Python',      angle: 51,  orbit: 140, speed: '12s', color: '#3b82f6', size: 36 },
  { label: 'Node.js',     angle: 102, orbit: 140, speed: '12s', color: '#68a063', size: 36 },
  { label: 'Firebase',    angle: 153, orbit: 140, speed: '12s', color: '#f59e0b', size: 34 },
  { label: 'Tailwind',    angle: 204, orbit: 140, speed: '12s', color: '#38bdf8', size: 32 },
  { label: 'MySQL',       angle: 255, orbit: 140, speed: '12s', color: '#f97316', size: 30 },
  { label: 'GSAP',        angle: 306, orbit: 140, speed: '12s', color: '#88ce02', size: 32 },

  { label: 'TypeScript',  angle: 0,   orbit: 220, speed: '20s', color: '#3178c6', size: 28 },
  { label: 'C / C++',     angle: 60,  orbit: 220, speed: '20s', color: '#9ca3af', size: 28 },
  { label: 'MongoDB',     angle: 120, orbit: 220, speed: '20s', color: '#4db33d', size: 26 },
  { label: 'Express',     angle: 180, orbit: 220, speed: '20s', color: '#6b7280', size: 26 },
  { label: 'Vite',        angle: 240, orbit: 220, speed: '20s', color: '#bd34fe', size: 26 },
  { label: 'Git',         angle: 300, orbit: 220, speed: '20s', color: '#f05032', size: 24 },
];

const OrbitSystem = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '500px',
        height: '500px',
        flexShrink: 0,
      }}
    >
      {/* Orbit rings */}
      {[140, 220].map((r) => (
        <div
          key={r}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: r * 2,
            height: r * 2,
            marginTop: -r,
            marginLeft: -r,
            borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.05)',
          }}
        />
      ))}

      {/* Center core */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--accent), var(--accent-warm))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 40px rgba(129,140,248,0.4)',
          zIndex: 10,
        }}
        className="pulse-glow"
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            color: 'var(--bg-0)',
            letterSpacing: '0.05em',
          }}
        >
          KD
        </span>
      </div>

      {/* Orbiting pills */}
      {orbitSkills.map((skill, i) => {
        const angleRad = (skill.angle * Math.PI) / 180;
        const x = Math.cos(angleRad) * skill.orbit;
        const y = Math.sin(angleRad) * skill.orbit;

        return (
          <div
            key={skill.label}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: -14,
              marginLeft: -14,
              animation: `orbit ${skill.speed} linear infinite`,
              '--start-angle': `${skill.angle}deg`,
              '--orbit-r': `${skill.orbit}px`,
            }}
            className="orbit-item"
          >
            <div
              style={{
                padding: '4px 10px',
                borderRadius: '100px',
                background: 'var(--bg-2)',
                border: `1px solid ${skill.color}40`,
                fontFamily: 'var(--font-mono)',
                fontSize: `${Math.max(0.55, skill.size / 60)}rem`,
                color: skill.color,
                whiteSpace: 'nowrap',
                letterSpacing: '0.08em',
                boxShadow: `0 0 12px ${skill.color}20`,
                transition: 'transform 0.2s ease',
              }}
            >
              {skill.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/* ================================================================
   PROFICIENCY BARS
   ================================================================ */
const proficiencyData = [
  { label: 'Frontend (React, Tailwind, GSAP)',  pct: 88, color: 'var(--accent)' },
  { label: 'Backend (Node.js, Firebase, SQL)',   pct: 72, color: 'var(--accent-cyan)' },
  { label: 'Teaching & Pedagogy',               pct: 92, color: 'var(--accent-warm)' },
  { label: 'Systems Thinking & DSA',            pct: 78, color: '#a78bfa' },
  { label: 'Python & Scripting',                pct: 80, color: '#34d399' },
];

const ProficiencyBar = ({ item, index }) => {
  const barRef = useRef(null);

  useEffect(() => {
    if (!barRef.current) return;
    gsap.fromTo(
      barRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        delay: index * 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: barRef.current,
          start: 'top 85%',
          once: true,
        },
      }
    );
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ marginBottom: '1.5rem' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.85rem',
            color: 'var(--text-2)',
          }}
        >
          {item.label}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: item.color,
          }}
        >
          {item.pct}%
        </span>
      </div>
      <div
        style={{
          height: '2px',
          background: 'var(--border)',
          borderRadius: '2px',
          overflow: 'hidden',
        }}
      >
        <div
          ref={barRef}
          style={{
            height: '100%',
            width: `${item.pct}%`,
            background: `linear-gradient(90deg, ${item.color}, ${item.color}80)`,
            borderRadius: '2px',
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }}
        />
      </div>
    </motion.div>
  );
};

/* ================================================================
   CAPABILITY AREA CARD
   ================================================================ */
const capabilities = [
  {
    key: 'engineering',
    title: 'Frontend Engineering',
    tag: 'Engineering',
    color: 'var(--accent)',
    summary: 'Building production-grade React applications with clean component architecture.',
    areas: [
      { name: 'React Development', skills: ['Component Architecture', 'Hooks & Context', 'State Management', 'Performance Opt.'] },
      { name: 'Modern JavaScript', skills: ['ES6+ Features', 'Async/Await', 'API Integration', 'Error Handling'] },
      { name: 'Styling & UI',      skills: ['Tailwind CSS', 'Responsive Design', 'Animation', 'Accessibility'] },
      { name: 'Build & Deploy',    skills: ['Vite', 'Firebase', 'Vercel', 'Git Workflow'] },
    ],
  },
  {
    key: 'teaching',
    title: 'Teaching & Pedagogy',
    tag: 'Teaching',
    color: 'var(--accent-warm)',
    summary: 'Translating complex technical concepts into structured learning experiences.',
    areas: [
      { name: 'Programming Fundamentals', skills: ['C Programming', 'Python', 'Problem Decomposition', 'Debugging Methodology'] },
      { name: 'Curriculum Design',        skills: ['Course Planning', 'Assessment Design', 'Learning Outcomes', 'NBA/OBE Mapping'] },
      { name: 'Student Mentorship',       skills: ['Project Guidance', 'Career Counseling', 'Code Review', 'Tech Interview Prep'] },
    ],
  },
  {
    key: 'backend',
    title: 'Backend & Data',
    tag: 'Backend',
    color: 'var(--accent-cyan)',
    summary: 'Databases, APIs, and server-side technologies for complete full-stack solutions.',
    areas: [
      { name: 'Database Management', skills: ['MySQL', 'MongoDB', 'Schema Design', 'Query Optimization'] },
      { name: 'Firebase',            skills: ['Authentication', 'Firestore', 'Real-time Data', 'Cloud Functions'] },
      { name: 'API Development',     skills: ['RESTful APIs', 'Node.js + Express', 'Middleware', 'Data Validation'] },
    ],
  },
  {
    key: 'systems',
    title: 'System Thinking',
    tag: 'Systems',
    color: '#a78bfa',
    summary: 'Holistic problem-solving with consideration for architecture and maintainability.',
    areas: [
      { name: 'Project Coordination', skills: ['Team Leadership', 'Technical Planning', 'Code Review', 'Documentation'] },
      { name: 'Problem Solving',      skills: ['Algorithm Design', 'Data Structures', 'Optimization', 'Debugging'] },
      { name: 'Quality Assurance',    skills: ['Code Standards', 'Error Handling', 'Testing Mindset', 'Performance'] },
    ],
  },
];

const CapabilityCard = ({ cap, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      style={{
        background: 'var(--bg-1)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease',
      }}
      whileHover={{ borderColor: `${cap.color}40` }}
    >
      {/* Header */}
      <div
        onClick={() => setExpanded((e) => !e)}
        style={{
          padding: '1.75rem',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: cap.color,
              display: 'block',
              marginBottom: '0.5rem',
            }}
          >
            {cap.tag}
          </span>
          <h3
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--text-1)',
              marginBottom: '0.35rem',
            }}
          >
            {cap.title}
          </h3>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-3)' }}>
            {cap.summary}
          </p>
        </div>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: `1px solid ${cap.color}40`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: cap.color,
            flexShrink: 0,
            transition: 'transform 0.3s ease, background 0.3s ease',
            transform: expanded ? 'rotate(45deg)' : 'none',
            background: expanded ? `${cap.color}15` : 'transparent',
          }}
        >
          +
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '0 1.75rem 1.75rem',
                borderTop: '1px solid var(--border)',
                paddingTop: '1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {cap.areas.map((area, i) => (
                <div key={i}>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      color: 'var(--text-1)',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {area.name}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {area.skills.map((skill) => (
                      <span
                        key={skill}
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.65rem',
                          letterSpacing: '0.06em',
                          padding: '0.25rem 0.65rem',
                          borderRadius: '100px',
                          background: `${cap.color}12`,
                          color: cap.color,
                          border: `1px solid ${cap.color}30`,
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

/* ================================================================
   MAIN COMPONENT
   ================================================================ */
const Capabilities = () => {
  const [activeTag, setActiveTag] = useState('all');
  const tags = ['all', 'Engineering', 'Teaching', 'Backend', 'Systems'];

  const filtered = activeTag === 'all'
    ? capabilities
    : capabilities.filter((c) => c.tag === activeTag);

  return (
    <div style={{ background: 'var(--bg-0)', minHeight: '100vh', color: 'var(--text-1)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '8rem 2.5rem 6rem' }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '6rem' }}
        >
          <div className="label" style={{ marginBottom: '1.5rem' }}>Capabilities</div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              letterSpacing: '0.01em',
              lineHeight: 0.95,
              marginBottom: '1.5rem',
              color: 'var(--text-1)',
            }}
          >
            SKILLS &amp;
            <br />
            <span style={{ color: 'var(--accent)' }}>EXPERTISE</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-3)',
              maxWidth: '480px',
              lineHeight: 1.7,
            }}
          >
            A hybrid skill set spanning teaching, engineering, and systems
            thinking — built to deliver both in the classroom and in production.
          </p>
        </motion.div>

        {/* ---- ORBIT SYSTEM + Proficiency ---- */}
        <div
          style={{
            display: 'flex',
            gap: '4rem',
            alignItems: 'center',
            marginBottom: '7rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Orbit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ flex: '0 0 auto' }}
          >
            <OrbitSystem />
          </motion.div>

          {/* Proficiency bars */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div className="label" style={{ marginBottom: '2rem' }}>Proficiency</div>
            {proficiencyData.map((item, i) => (
              <ProficiencyBar key={item.label} item={item} index={i} />
            ))}
          </div>
        </div>

        {/* ---- Filter ---- */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}
        >
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={{
                padding: '0.45rem 1.1rem',
                borderRadius: '100px',
                border: '1px solid var(--border)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.08em',
                textTransform: 'capitalize',
                background: activeTag === tag ? 'var(--text-1)' : 'transparent',
                color: activeTag === tag ? 'var(--bg-0)' : 'var(--text-3)',
                transition: 'all 0.3s ease',
                cursor: 'none',
              }}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* ---- Capability cards ---- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTag}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            {filtered.map((cap, i) => (
              <CapabilityCard key={cap.key} cap={cap} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* ---- What I Bring ---- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            marginTop: '6rem',
            padding: '3rem',
            background: 'var(--bg-1)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
          }}
        >
          <div className="label" style={{ marginBottom: '2rem' }}>What I Bring to Projects</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              { title: 'Academic Rigor',       body: 'Systematic problem-solving, clear documentation, and emphasis on maintainable code others can extend.', color: 'var(--accent)' },
              { title: 'Industry Awareness',   body: 'Understanding of production constraints, deployment workflows, and trade-offs between ideal and practical.', color: 'var(--accent-warm)' },
              { title: 'Teaching Mindset',     body: 'Ability to explain complex technical decisions clearly and create documentation as a learning resource.', color: 'var(--accent-cyan)' },
              { title: 'Coordination Proven',  body: 'Track record coordinating multi-person projects, conducting reviews, and maintaining technical standards.', color: '#a78bfa' },
            ].map((item) => (
              <div key={item.title}>
                <div
                  style={{
                    width: '24px',
                    height: '2px',
                    background: item.color,
                    marginBottom: '1rem',
                    borderRadius: '1px',
                  }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'var(--text-1)',
                    marginBottom: '0.5rem',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.82rem',
                    color: 'var(--text-3)',
                    lineHeight: 1.6,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ---- Currently Strengthening ---- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ marginTop: '5rem' }}
        >
          <div className="label" style={{ marginBottom: '2rem' }}>Continuous Development</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
            }}
          >
            {[
              {
                heading: 'Currently Strengthening',
                items: [
                  'Advanced React patterns & performance',
                  'TypeScript for type-safe development',
                  'Next.js full-stack applications',
                  'DSA mastery via LeetCode daily practice',
                  'System design principles & scalability',
                ],
              },
              {
                heading: 'Future Exploration',
                items: [
                  'AWS / Azure for scalable deployment',
                  'Docker & Kubernetes for DevOps',
                  'React Native cross-platform mobile',
                  'GraphQL API design',
                  'Testing frameworks & TDD',
                ],
              },
            ].map(({ heading, items }) => (
              <div
                key={heading}
                style={{
                  background: 'var(--bg-1)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '1.75rem',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    fontWeight: 700,
                    color: 'var(--text-1)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {heading}
                </h3>
                <ul style={{ listStyle: 'none' }}>
                  {items.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        color: 'var(--text-3)',
                        padding: '0.35rem 0',
                        borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      <span style={{ color: 'var(--accent)', flexShrink: 0 }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Capabilities;