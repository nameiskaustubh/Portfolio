/**
 * Capabilities.jsx — Interactive Skills Universe
 * 
 * Features:
 * - 3D React Three Fiber Skills Galaxy Sphere replacing the old orbit
 * - Filterable skill cards with hover depth effects
 * - "What I bring" dark manifesto section
 */

import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/* ================================================================
   3D SKILL GALAXY (Replaces OrbitSystem & ProficiencyBars)
   ================================================================ */
const skillsData = [
  { label: 'React', color: '#61dafb', size: 1.2 },
  { label: 'Python', color: '#3b82f6', size: 1.1 },
  { label: 'Node.js', color: '#68a063', size: 1.1 },
  { label: 'Firebase', color: '#f59e0b', size: 1.0 },
  { label: 'Tailwind', color: '#38bdf8', size: 1.0 },
  { label: 'MySQL', color: '#f97316', size: 0.9 },
  { label: 'GSAP', color: '#88ce02', size: 1.0 },
  { label: 'TypeScript', color: '#3178c6', size: 1.1 },
  { label: 'C / C++', color: '#9ca3af', size: 1.1 },
  { label: 'MongoDB', color: '#4db33d', size: 1.0 },
  { label: 'Express', color: '#6b7280', size: 1.0 },
  { label: 'Vite', color: '#bd34fe', size: 1.0 },
  { label: 'Git', color: '#f05032', size: 0.9 },
];

function SkillNode({ skill, position }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      {/* Visual node anchor point */}
      <mesh>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color={hovered ? '#ffffff' : skill.color} />
      </mesh>
      {/* HTML label synced to 3D position */}
      <Html distanceFactor={15} center zIndexRange={[100, 0]}>
        <div
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          style={{
            padding: '6px 14px',
            borderRadius: '100px',
            background: 'rgba(2, 6, 23, 0.85)',
            border: `1px solid ${hovered ? '#ffffff' : skill.color}60`,
            backdropFilter: 'blur(8px)',
            fontFamily: 'var(--font-mono)',
            fontSize: `${skill.size}rem`,
            color: hovered ? '#ffffff' : skill.color,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            letterSpacing: '0.08em',
            boxShadow: hovered ? `0 0 20px ${skill.color}50` : 'none',
            transition: 'all 0.3s ease',
            textTransform: 'uppercase',
            pointerEvents: 'auto',
          }}
        >
          {skill.label}
        </div>
      </Html>
    </group>
  );
}

function GalaxyCloud() {
  const groupRef = useRef();

  // Create spherical layout logic using Fibonacci spiral
  const nodes = useMemo(() => {
    const list = [];
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
    const total = skillsData.length;
    const radius = 5.5; // Radius of the galaxy

    for (let i = 0; i < total; i++) {
      const y = 1 - (i / (total - 1)) * 2; // -1 to 1
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      list.push({
        position: [x * radius, y * radius, z * radius],
        skill: skillsData[i]
      });
    }
    return list;
  }, []);

  // Ambient dust particles
  const dustParticles = useMemo(() => {
    const temp = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 20;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 20;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return temp;
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#818cf8" transparent opacity={0.08} />
      </mesh>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={500} array={dustParticles} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#c7d2fe" transparent opacity={0.4} />
      </points>

      {nodes.map((node, i) => (
        <SkillNode key={i} skill={node.skill} position={node.position} />
      ))}
    </group>
  );
}

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
      { name: 'Styling & UI', skills: ['Tailwind CSS', 'Responsive Design', 'Animation', 'Accessibility'] },
      { name: 'Build & Deploy', skills: ['Vite', 'Firebase', 'Vercel', 'Git Workflow'] },
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
      { name: 'Curriculum Design', skills: ['Course Planning', 'Assessment Design', 'Learning Outcomes', 'NBA/OBE Mapping'] },
      { name: 'Student Mentorship', skills: ['Project Guidance', 'Career Counseling', 'Code Review', 'Tech Interview Prep'] },
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
      { name: 'Firebase', skills: ['Authentication', 'Firestore', 'Real-time Data', 'Cloud Functions'] },
      { name: 'API Development', skills: ['RESTful APIs', 'Node.js + Express', 'Middleware', 'Data Validation'] },
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
      { name: 'Problem Solving', skills: ['Algorithm Design', 'Data Structures', 'Optimization', 'Debugging'] },
      { name: 'Quality Assurance', skills: ['Code Standards', 'Error Handling', 'Testing Mindset', 'Performance'] },
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
          style={{ marginBottom: '4rem' }}
        >
          <div className="label" style={{ marginBottom: '1.5rem' }}>Capabilities</div>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 8vw, 6.5rem)',
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
            thinking — mapped across a 3D constellation. Feel free to explore and drag the galaxy!
          </p>
        </motion.div>

        {/* ---- 3D GALAXY CANVAS ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            width: '100%',
            height: 'clamp(400px, 60vh, 700px)',
            marginBottom: '7rem',
            position: 'relative',
            borderRadius: '24px',
            overflow: 'hidden',
            border: '1px solid var(--border)',
            background: 'rgba(15, 23, 42, 0.4)',
            cursor: 'grab',
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 15], fov: 50 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#818cf8" />
            <GalaxyCloud />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
          </Canvas>
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: 'var(--text-3)',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          >
            [ DRAG TO ROTATE ]
          </div>
        </motion.div>

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
              { title: 'Academic Rigor', body: 'Systematic problem-solving, clear documentation, and emphasis on maintainable code others can extend.', color: 'var(--accent)' },
              { title: 'Industry Awareness', body: 'Understanding of production constraints, deployment workflows, and trade-offs between ideal and practical.', color: 'var(--accent-warm)' },
              { title: 'Teaching Mindset', body: 'Ability to explain complex technical decisions clearly and create documentation as a learning resource.', color: 'var(--accent-cyan)' },
              { title: 'Coordination Proven', body: 'Track record coordinating multi-person projects, conducting reviews, and maintaining technical standards.', color: '#a78bfa' },
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