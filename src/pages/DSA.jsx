/**
 * DSA.jsx — Dark Theme + Live LeetCode Stats
 * Preserves existing API fetching logic, upgrades the UI.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const methodology = [
  {
    num: '01',
    phase: 'Pattern Recognition',
    color: 'var(--accent)',
    body: 'Study common algorithmic patterns and solution templates to build a reusable mental framework for approaching new problems.',
    practices: [
      'Categorize problems by underlying patterns (sliding window, two pointers, etc.)',
      'Build mental models for when to apply specific algorithms',
      'Document pattern variations and edge cases',
      'Review multiple solutions to understand trade-offs',
    ],
  },
  {
    num: '02',
    phase: 'Consistent Practice',
    color: 'var(--accent-warm)',
    body: 'Daily problem-solving to reinforce concepts and maintain algorithmic thinking skills.',
    practices: [
      'Solve 2–3 problems daily with focus on understanding, not speed',
      'Alternate easy/medium problems for balanced growth',
      'Revisit previously solved problems to explore optimizations',
      'Participate in weekly contests for timed practice',
    ],
  },
  {
    num: '03',
    phase: 'Iterative Review',
    color: 'var(--accent-cyan)',
    body: 'Regular revisiting of solved problems to reinforce learning and explore alternative approaches.',
    practices: [
      'Implement same problems using different algorithms',
      'Analyse time and space complexity improvements',
      'Document learning in personal knowledge base',
      'Connect DSA concepts to real-world engineering problems',
    ],
  },
];

const StatCard = ({ value, label, color, sublabel }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    style={{
      background: 'var(--bg-1)',
      border: `1px solid ${color}30`,
      borderRadius: '16px',
      padding: '2rem',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(circle at 50% 0%, ${color}08 0%, transparent 70%)`,
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(2.5rem, 6vw, 4rem)',
        color,
        lineHeight: 1,
        marginBottom: '0.4rem',
        position: 'relative',
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.65rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--text-3)',
        position: 'relative',
      }}
    >
      {label}
    </div>
    {sublabel && (
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color, marginTop: '0.25rem', position: 'relative' }}>
        {sublabel}
      </div>
    )}
  </motion.div>
);

const DSA = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const username = 'afcpwRGndV';
        const endpoints = [
          `https://alfa-leetcode-api.onrender.com/userProfile/${username}`,
          `https://leetcode-stats-api.herokuapp.com/${username}`,
        ];

        for (const url of endpoints) {
          try {
            const res = await fetch(url, { headers: { Accept: 'application/json' }, mode: 'cors' });
            if (!res.ok) continue;
            const data = await res.json();
            const total = data.totalSolved ?? data.totalQuestionsSolved;
            if (total !== undefined) {
              setStats({
                totalSolved: total,
                easySolved: data.easySolved ?? 0,
                mediumSolved: data.mediumSolved ?? 0,
                hardSolved: data.hardSolved ?? 0,
                ranking: data.ranking ?? 'N/A',
              });
              return;
            }
          } catch { continue; }
        }
        setError('Could not load stats');
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
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
          <div className="label" style={{ marginBottom: '1.5rem' }}>Data Structures & Algorithms</div>
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
            SHARPENING
            <br />
            <span style={{ color: 'var(--accent)' }}>THE BLADE</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--text-3)', maxWidth: '520px', lineHeight: 1.7 }}>
            Systematic practice in algorithmic problem-solving — building both
            teaching foundations and engineering discipline. Not competitive
            programming — <em style={{ color: 'var(--text-2)' }}>deliberate skill development</em>.
          </p>
        </motion.div>

        {/* Stats */}
        {loading ? (
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '5rem' }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1, height: '120px', borderRadius: '16px',
                  background: 'var(--bg-1)', border: '1px solid var(--border)',
                  animation: 'pulse-glow 2s infinite',
                }}
              />
            ))}
          </div>
        ) : error ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginBottom: '5rem',
              padding: '2rem',
              background: 'var(--bg-1)',
              border: '1px solid var(--border)',
              borderRadius: '16px',
              textAlign: 'center',
            }}
          >
            <p style={{ fontFamily: 'var(--font-body)', color: 'var(--text-3)' }}>
              Progress tracked via{' '}
              <a
                href="https://leetcode.com/u/afcpwRGndV"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)', textDecoration: 'none' }}
              >
                LeetCode →
              </a>
            </p>
          </motion.div>
        ) : stats ? (
          <div style={{ marginBottom: '5rem' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1.5rem',
              }}
            >
              <div className="label">Current Progress</div>
              <a
                href="https://leetcode.com/u/afcpwRGndV"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                }}
              >
                View Profile →
              </a>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '1rem' }}>
              <StatCard value={stats.totalSolved}  label="Solved"  color="var(--text-1)" />
              <StatCard value={stats.easySolved}   label="Easy"   color="#34d399" sublabel="Foundation" />
              <StatCard value={stats.mediumSolved} label="Medium" color="var(--accent-warm)" sublabel="Core" />
              <StatCard value={stats.hardSolved}   label="Hard"   color="#f87171" sublabel="Advanced" />
            </div>
          </div>
        ) : null}

        {/* Methodology */}
        <div style={{ marginBottom: '5rem' }}>
          <div className="label" style={{ marginBottom: '2.5rem' }}>Learning Methodology</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {methodology.map((m, i) => (
              <motion.div
                key={m.num}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.12 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '2rem',
                  background: 'var(--bg-1)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '2rem',
                  transition: 'border-color 0.3s ease',
                }}
                whileHover={{ borderColor: `${m.color}40` }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '4rem',
                    color: `${m.color}20`,
                    lineHeight: 1,
                    userSelect: 'none',
                    flexShrink: 0,
                  }}
                >
                  {m.num}
                </div>
                <div>
                  <div
                    style={{
                      width: '20px', height: '2px',
                      background: m.color, borderRadius: '1px',
                      marginBottom: '0.75rem',
                    }}
                  />
                  <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '0.5rem' }}>
                    {m.phase}
                  </h3>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--text-3)', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {m.body}
                  </p>
                  <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.4rem' }}>
                    {m.practices.map((p, pi) => (
                      <li key={pi} style={{ display: 'flex', gap: '0.5rem', fontFamily: 'var(--font-body)', fontSize: '0.78rem', color: 'var(--text-3)', lineHeight: 1.4 }}>
                        <span style={{ color: m.color, flexShrink: 0 }}>→</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Teaching Connection + Goals */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '5rem' }}>
          {[
            { title: 'Reinforces Teaching',     color: 'var(--accent)',      body: 'DSA practice keeps me sharp in the exact concepts I teach. When explaining recursion or graph traversal, I draw from recent experience, not just textbooks.' },
            { title: 'Problem-Solving Frame',   color: 'var(--accent-warm)', body: 'My systematic approach to DSA directly translates to how I teach students to decompose complex, multi-part problems.' },
            { title: 'Code Quality Standards',  color: 'var(--accent-cyan)', body: 'Writing clean, efficient solutions daily helps me set and maintain high coding standards when reviewing student project code.' },
          ].map((c) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '1.75rem',
              }}
            >
              <div style={{ width: '20px', height: '2px', background: c.color, borderRadius: '1px', marginBottom: '1rem' }} />
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '0.5rem' }}>{c.title}</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-3)', lineHeight: 1.6 }}>{c.body}</p>
            </motion.div>
          ))}
        </div>

        {/* Goals */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '5rem' }}>
          {[
            {
              heading: '2025–26 Objectives',
              items: ['300+ problems solved by mid-2026', 'Strengthen DP and graph algorithms', 'Maintain daily solving consistency', 'Improve contest performance'],
              color: 'var(--accent)',
            },
            {
              heading: 'Long-term Vision',
              items: ['Top 20% global LeetCode ranking', 'Comprehensive DSA teaching materials', 'Apply advanced algorithms in production', 'Mentor students through FAANG prep'],
              color: 'var(--accent-warm)',
            },
          ].map(({ heading, items, color }) => (
            <motion.div
              key={heading}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{
                background: 'var(--bg-1)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '1.75rem',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '1.25rem' }}>{heading}</h3>
              <ul style={{ listStyle: 'none' }}>
                {items.map((item, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex', gap: '0.5rem',
                      fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'var(--text-3)',
                      padding: '0.4rem 0',
                      borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
                    }}
                  >
                    <span style={{ color, flexShrink: 0 }}>→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            padding: '3rem',
            background: 'var(--bg-1)',
            border: '1px solid var(--border)',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: '-50%', right: '-10%',
            width: '300px', height: '300px',
            background: 'radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div className="label" style={{ marginBottom: '1.5rem', color: 'var(--accent)' }}>Why This Matters</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
            {[
              { prefix: 'For teaching:', body: 'DSA practice keeps me sharp in the concepts I teach. When explaining recursion or graph algorithms, I draw from recent problem-solving experience, not just textbook knowledge.' },
              { prefix: 'For engineering:', body: 'Algorithmic thinking translates to better production code. Understanding time complexity helps me write efficient React components and design optimised database schemas.' },
              { prefix: 'For students:', body: 'I model the continuous learning mindset I expect from them. When they see their professor actively practicing DSA, it reinforces that engineering is a discipline of ongoing skill development.' },
            ].map(({ prefix, body }) => (
              <p key={prefix} style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: 'var(--text-3)', lineHeight: 1.7 }}>
                <span style={{ color: 'var(--text-1)', fontWeight: 600 }}>{prefix}</span>{' '}{body}
              </p>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DSA;