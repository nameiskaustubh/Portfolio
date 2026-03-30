/**
 * Teaching.jsx — Animated Journey Timeline
 * 
 * Features:
 * - GSAP-driven vertical timeline with progress line
 * - Scroll-triggered timeline nodes
 * - Stats counters
 * - Course cards with expandable content
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const courses = [
  {
    code: 'PPS',
    name: 'Programming & Problem Solving',
    language: 'Python',
    level: 'First-Year MCA',
    accentColor: 'var(--accent)',
    topics: [
      'Python syntax, data types & operators',
      'Control flow, iteration, comprehensions',
      'Functions, recursion & modular design',
      'Lists, dicts, sets & tuples',
      'OOP — classes, inheritance, polymorphism',
      'File I/O & exception handling',
    ],
    approach:
      'Focus on practical problem-solving with clean, readable code. Students learn to translate problems into algorithmic solutions using Python\'s expressive syntax.',
    outcomes: [
      'Develop solutions using Python core libraries',
      'Write maintainable, documented code',
      'Apply OOP principles appropriately',
      'Solve computational problems independently',
    ],
  },
  {
    code: 'CC',
    name: 'Cloud Computing',
    language: 'Concepts + AWS/GCP',
    level: 'Second-Year MCA',
    accentColor: 'var(--accent-cyan)',
    topics: [
      'Cloud service models — IaaS, PaaS, SaaS',
      'Virtualization & containerization',
      'AWS and GCP services overview',
      'Distributed systems fundamentals',
      'Cloud security and compliance',
      'Deployment and scaling strategies',
    ],
    approach:
      'Bridging conceptual cloud architecture with practical service usage. Students gain exposure to real cloud environments through guided labs.',
    outcomes: [
      'Understand cloud service trade-offs',
      'Deploy applications to cloud platforms',
      'Articulate security and cost considerations',
      'Design scalable distributed architectures',
    ],
  },
];

const responsibilities = [
  {
    title: 'MCA Major Project Coordinator',
    icon: '◈',
    color: 'var(--accent)',
    description:
      'Oversee final-year MCA students through complete project lifecycle — from ideation to deployment.',
    activities: [
      'Guide teams through requirements analysis and system design',
      'Review architectural decisions and technology choices',
      'Conduct code reviews and technical evaluations',
      'Coordinate project presentations and demonstrations',
    ],
  },
  {
    title: 'Class Coordinator — SY MCA',
    icon: '◉',
    color: 'var(--accent-warm)',
    description:
      'Administrative and academic coordination for the Second Year MCA batch.',
    activities: [
      'Academic scheduling and timetable coordination',
      'Student grievance handling and counseling',
      'Internal assessment management',
      'Industry visit and workshop organization',
    ],
  },
  {
    title: 'Industrial Internship Coordination',
    icon: '◎',
    color: 'var(--accent-cyan)',
    description:
      'Facilitate industry connections and prepare MCA students for professional engineering environments.',
    activities: [
      'Connect students with technology companies',
      'Prepare students for technical interviews',
      'Monitor internship progress and learning outcomes',
      'Bridge academic concepts with industry practices',
    ],
  },
];

/* ---- Timeline node ---- */
const TimelineNode = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', gap: '2rem', position: 'relative', zIndex: 1 }}
    >
      {/* Node */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            background: 'var(--bg-0)',
            border: `2px solid ${item.color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            color: item.color,
            flexShrink: 0,
            boxShadow: `0 0 20px ${item.color}30`,
          }}
        >
          {item.icon}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          paddingBottom: '3rem',
          background: 'var(--bg-1)',
          border: '1px solid var(--border)',
          borderRadius: '16px',
          padding: '1.75rem',
          transition: 'border-color 0.3s ease',
          cursor: 'pointer',
        }}
        onClick={() => setExpanded((e) => !e)}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = item.color + '40')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '1rem',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--text-1)',
              marginBottom: '0.5rem',
            }}
          >
            {item.title}
          </h3>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-3)',
              transition: 'transform 0.3s ease',
              transform: expanded ? 'rotate(45deg)' : 'none',
              flexShrink: 0,
            }}
          >
            +
          </span>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--text-3)',
            lineHeight: 1.6,
          }}
        >
          {item.description}
        </p>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <ul style={{ listStyle: 'none', marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
                {item.activities.map((act, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '0.6rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.82rem',
                      color: 'var(--text-3)',
                      marginBottom: '0.5rem',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: item.color, flexShrink: 0 }}>→</span>
                    {act}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

/* ---- Course card ---- */
const CourseCard = ({ course, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      style={{
        background: 'var(--bg-1)',
        border: '1px solid var(--border)',
        borderRadius: '20px',
        overflow: 'hidden',
      }}
    >
      {/* Card header */}
      <div
        onClick={() => setExpanded((e) => !e)}
        style={{
          padding: '2rem',
          cursor: 'pointer',
          borderBottom: expanded ? '1px solid var(--border)' : 'none',
          transition: 'background 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-2)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.15em',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '100px',
                  background: `${course.accentColor}20`,
                  color: course.accentColor,
                  border: `1px solid ${course.accentColor}40`,
                  textTransform: 'uppercase',
                }}
              >
                {course.code}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  color: 'var(--text-3)',
                  letterSpacing: '0.08em',
                }}
              >
                {course.level}
              </span>
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                fontWeight: 700,
                color: 'var(--text-1)',
                marginBottom: '0.25rem',
              }}
            >
              {course.name}
            </h3>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-3)',
              }}
            >
              {course.language}
            </span>
          </div>

          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1.5rem',
              color: 'var(--text-3)',
              transform: expanded ? 'rotate(45deg)' : 'none',
              transition: 'transform 0.3s ease',
            }}
          >
            +
          </span>
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div
              style={{
                padding: '2rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '2rem',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: course.accentColor,
                    marginBottom: '0.75rem',
                  }}
                >
                  Core Topics
                </div>
                <ul style={{ listStyle: 'none' }}>
                  {course.topics.map((t, i) => (
                    <li
                      key={i}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        color: 'var(--text-3)',
                        padding: '0.3rem 0',
                        borderBottom: i < course.topics.length - 1 ? '1px solid var(--border)' : 'none',
                      }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: course.accentColor,
                    marginBottom: '0.75rem',
                  }}
                >
                  Teaching Approach
                </div>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: 'var(--text-3)',
                    lineHeight: 1.7,
                    marginBottom: '1.5rem',
                  }}
                >
                  {course.approach}
                </p>

                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: course.accentColor,
                    marginBottom: '0.75rem',
                  }}
                >
                  Student Outcomes
                </div>
                <ul style={{ listStyle: 'none' }}>
                  {course.outcomes.map((o, i) => (
                    <li
                      key={i}
                      style={{
                        display: 'flex',
                        gap: '0.5rem',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.82rem',
                        color: 'var(--text-3)',
                        marginBottom: '0.4rem',
                      }}
                    >
                      <span style={{ color: 'var(--accent)' }}>✓</span>
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
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
const Teaching = () => {
  const timelineLineRef = useRef(null);

  useEffect(() => {
    if (!timelineLineRef.current) return;
    gsap.fromTo(
      timelineLineRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineLineRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: true,
        },
      }
    );
  }, []);

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
            Teaching & Mentorship
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
            SHAPING THE
            <br />
            <span style={{ color: 'var(--accent)' }}>NEXT BUILDERS</span>
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
            Preparing first-year engineers for systems thinking and guiding
            MCA students toward industry-grade development.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1px',
            background: 'var(--border)',
            border: '1px solid var(--border)',
            borderRadius: '16px',
            overflow: 'hidden',
            marginBottom: '6rem',
          }}
        >
          {[
            { val: '100+', label: 'Students Taught' },
            { val: '10+',  label: 'Projects Coordinated' },
            { val: '2',    label: 'Courses' },
            { val: '3',    label: 'Roles Held' },
          ].map(({ val, label }) => (
            <div
              key={label}
              style={{
                background: 'var(--bg-1)',
                padding: '2rem',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  color: 'var(--text-1)',
                  lineHeight: 1,
                  marginBottom: '0.5rem',
                }}
              >
                {val}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-3)',
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Courses */}
        <div style={{ marginBottom: '6rem' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              marginBottom: '2rem',
            }}
          >
            Courses Taught
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {courses.map((course, i) => (
              <CourseCard key={course.code} course={course} index={i} />
            ))}
          </div>
        </div>

        {/* Timeline — Academic Leadership */}
        <div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              marginBottom: '2.5rem',
            }}
          >
            Academic Leadership
          </div>

          <div style={{ position: 'relative' }}>
            {/* Vertical timeline line */}
            <div
              style={{
                position: 'absolute',
                left: '21px',
                top: '22px',
                bottom: '22px',
                width: '1px',
                background: 'var(--border)',
              }}
            >
              <div
                ref={timelineLineRef}
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(to bottom, var(--accent), var(--accent-warm))`,
                  transformOrigin: 'top',
                  transform: 'scaleY(0)',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {responsibilities.map((item, i) => (
                <TimelineNode key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>

        {/* Philosophy */}
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
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-50%',
              right: '-20%',
              width: '400px',
              height: '400px',
              background: 'radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '1.5rem',
            }}
          >
            Teaching Philosophy
          </div>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              fontWeight: 300,
              color: 'var(--text-1)',
              lineHeight: 1.7,
              maxWidth: '680px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            I don't just teach programming — I prepare students for real industry problems.
            My dual role as educator and practicing engineer allows me to bring{' '}
            <span style={{ color: 'var(--accent)' }}>current development practices</span>{' '}
            directly into the classroom.
          </p>
        </motion.div>

        {/* CTA */}
        <div style={{ marginTop: '5rem', textAlign: 'center' }}>
          <a
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.9rem 2.5rem',
              borderRadius: '100px',
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
            Academic Collaboration
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Teaching;