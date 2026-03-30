/**
 * ProfessionalEngagements.jsx — Dark Cinematic Theme
 * Preserves all existing logic, upgrades visual identity.
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Users, Code, MessageSquare } from 'lucide-react';

const engagements = [
  {
    title: 'Academic & Teaching',
    tag: '01',
    color: 'var(--accent)',
    icon: <BookOpen size={20} />,
    description:
      'Programming instruction in C and Python for engineering students. Curriculum development, academic mentorship, and preparation for technical practice.',
    details: [
      'Foundational programming and computational thinking',
      'Curriculum design aligned with industry requirements',
      'Academic guidance for project work and research',
      'Technical interview and professional preparation',
    ],
  },
  {
    title: 'Student Projects & Internships',
    tag: '02',
    color: 'var(--accent-warm)',
    icon: <Users size={20} />,
    description:
      'MCA major project coordination, including scope evaluation and feasibility assessment. Industry internship oversight and technical mentorship.',
    details: [
      'Project scope definition and feasibility analysis',
      'Internship coordination and evaluation',
      'Guidance on production-oriented implementations',
      'Technical mentorship through development lifecycle',
    ],
  },
  {
    title: 'Production Web & Software',
    tag: '03',
    color: 'var(--accent-cyan)',
    icon: <Code size={20} />,
    description:
      'End-to-end web application development with React frontends and backend integration. Architecture, maintainability, and deployment for long-term production use.',
    details: [
      'Full-stack architecture and implementation',
      'React-based frontend with backend API integration',
      'Database design and data flow management',
      'Performance optimisation and deployment strategy',
      'Code structure for maintainability and team handoff',
    ],
  },
  {
    title: 'Mentorship & Technical Reviews',
    tag: '04',
    color: '#a78bfa',
    icon: <MessageSquare size={20} />,
    description:
      'Code and architecture reviews for teams and individual developers. Technical decision guidance and career mentorship with focus on system thinking.',
    details: [
      'Code quality and architecture assessments',
      'Technical decision frameworks and trade-off analysis',
      'Career guidance for engineers and developers',
      'System design review and long-term impact evaluation',
    ],
  },
];

const EngagementCard = ({ item, index }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      onClick={() => setExpanded((e) => !e)}
      style={{
        background: 'var(--bg-1)',
        border: `1px solid ${expanded ? item.color + '30' : 'var(--border)'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.3s ease',
      }}
    >
      <div style={{ padding: '2rem' }}>
        {/* Card Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
            {/* Icon */}
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: `${item.color}12`,
                border: `1px solid ${item.color}30`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: item.color,
                flexShrink: 0,
                transition: 'background 0.3s ease',
              }}
            >
              {item.icon}
            </div>

            <div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: item.color,
                  display: 'block',
                  marginBottom: '0.4rem',
                }}
              >
                {item.tag}
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                  fontWeight: 700,
                  color: 'var(--text-1)',
                  lineHeight: 1.3,
                }}
              >
                {item.title}
              </h3>
            </div>
          </div>

          {/* Expand icon */}
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: `1px solid ${item.color}30`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: item.color,
              flexShrink: 0,
              fontSize: '1rem',
              transition: 'transform 0.3s ease, background 0.3s ease',
              transform: expanded ? 'rotate(45deg)' : 'none',
              background: expanded ? `${item.color}15` : 'transparent',
            }}
          >
            +
          </div>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.875rem',
            color: 'var(--text-3)',
            lineHeight: 1.65,
          }}
        >
          {item.description}
        </p>

        {/* Expandable details */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <ul
                style={{
                  listStyle: 'none',
                  marginTop: '1.5rem',
                  paddingTop: '1.5rem',
                  borderTop: `1px solid ${item.color}20`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {item.details.map((d, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '0.6rem',
                      fontFamily: 'var(--font-body)',
                      fontSize: '0.82rem',
                      color: 'var(--text-3)',
                      lineHeight: 1.5,
                    }}
                  >
                    <span style={{ color: item.color, flexShrink: 0, marginTop: '2px' }}>→</span>
                    {d}
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

const ProfessionalEngagements = () => {
  const principles = [
    { text: 'Honest assessment over optimism' },
    { text: 'Maintainability over rapid delivery' },
    { text: 'System thinking over isolated fixes' },
    { text: 'Long-term outcomes over immediate wins' },
  ];

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
          <div className="label" style={{ marginBottom: '1.5rem' }}>Professional Engagements</div>
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
            AREAS OF
            <br />
            <span style={{ color: 'var(--accent)' }}>ENGAGEMENT</span>
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              color: 'var(--text-3)',
              maxWidth: '520px',
              lineHeight: 1.7,
            }}
          >
            The contexts in which professional and technical engagement is
            appropriate. Each area carries specific responsibilities and standards.
          </p>
        </motion.div>

        {/* Engagements grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem',
            marginBottom: '6rem',
          }}
        >
          {engagements.map((item, i) => (
            <EngagementCard key={item.tag} item={item} index={i} />
          ))}
        </div>

        {/* Standards + Principles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '2rem',
            marginBottom: '5rem',
          }}
        >
          {/* Standards prose */}
          <div>
            <div className="label" style={{ marginBottom: '1.5rem' }}>Standards & Approach</div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-3)',
                lineHeight: 1.75,
                marginBottom: '1rem',
              }}
            >
              These engagements balance academic responsibility with production
              engineering. Each requires clear communication, honest feasibility
              assessment, and commitment to outcomes that serve their purpose
              beyond initial delivery.
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                color: 'var(--text-3)',
                lineHeight: 1.75,
              }}
            >
              Whether coordinating student work, building systems, or providing
              technical guidance, the focus remains on maintainability,
              responsible decision-making, and long-term impact.
            </p>
          </div>

          {/* Principles card */}
          <div
            style={{
              background: 'var(--bg-1)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              padding: '1.75rem',
            }}
          >
            <div className="label" style={{ marginBottom: '1.25rem' }}>Core Principles</div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {principles.map(({ text }, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    color: 'var(--text-3)',
                    padding: '0.5rem 0',
                    borderBottom: i < principles.length - 1 ? '1px solid var(--border)' : 'none',
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      flexShrink: 0,
                      marginTop: '7px',
                    }}
                  />
                  {text}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Scope definition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            padding: '2.5rem 3rem',
            borderLeft: '2px solid var(--accent)',
            background: 'var(--bg-1)',
            borderRadius: '0 16px 16px 0',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              fontWeight: 300,
              color: 'var(--text-1)',
              lineHeight: 1.75,
              maxWidth: '700px',
            }}
          >
            Professional engagement means understanding context, constraints,
            and consequences. It requires evaluating technical trade-offs,
            communicating clearly about what's feasible, and maintaining
            responsibility for decisions that affect{' '}
            <span style={{ color: 'var(--accent)' }}>students, systems, and outcomes</span>.
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
            Start a Conversation
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalEngagements;