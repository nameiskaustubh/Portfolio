/**
 * Home.jsx — Cinematic Hero + Scroll Journey
 * 
 * Sections:
 *  1. Hero — Full-screen, GSAP split text reveal, floating role tags
 *  2. Ticker — Scrolling marquee of skills
 *  3. Stats — Animated counters
 *  4. Philosophy — Reveal on scroll with parallax
 *  5. What I Do — Bento grid
 *  6. Manifesto — Dark cinematic section
 *  7. Stack — Tech logos grid
 *  8. CTA
 */

import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import profileImg from '../assets/profile.jpg';
import { useCountUp } from '../hooks/useScrollReveal';
import { useMagneticHover } from '../hooks/Usemagnetichover';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

/* ---- Animated counter ---- */
const StatCounter = ({ target, suffix, label }) => {
  const ref = useRef(null);
  useCountUp(ref, target, suffix);
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        ref={ref}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3rem, 7vw, 6rem)',
          color: 'var(--text-1)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        0{suffix}
      </div>
      <div className="label" style={{ marginTop: '0.5rem', color: 'var(--text-3)' }}>
        {label}
      </div>
    </div>
  );
};

/* ---- Ticker / marquee ---- */
const Ticker = ({ items }) => {
  const trackRef = useRef(null);
  useEffect(() => {
    gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });
  }, []);
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: 'hidden', padding: '1.5rem 0' }}>
      <div
        ref={trackRef}
        style={{ display: 'flex', gap: '3rem', whiteSpace: 'nowrap', willChange: 'transform' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.2rem, 2.5vw, 2rem)',
              letterSpacing: '0.1em',
              color: i % 4 === 0 ? 'var(--accent)' : i % 4 === 2 ? 'var(--accent-warm)' : 'var(--text-3)',
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

const tickerItems = [
  'React', '★', 'Node.js', '★', 'Firebase', '★', 'Python', '★',
  'Tailwind', '★', 'GSAP', '★', 'Framer Motion', '★', 'MySQL', '★',
  'DSA', '★', 'Teaching', '★', 'System Design', '★', 'Mentorship',
];

/* ---- Bento card ---- */
const BentoCard = ({ title, items, accent, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{
      background: 'var(--bg-1)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '2rem',
      transition: 'border-color 0.3s ease',
    }}
    whileHover={{ borderColor: 'var(--border-hover)', scale: 1.01 }}
  >
    <div
      style={{
        width: '32px',
        height: '3px',
        background: accent || 'var(--accent)',
        borderRadius: '2px',
        marginBottom: '1.25rem',
      }}
    />
    <h3
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        fontWeight: 700,
        color: 'var(--text-1)',
        marginBottom: '1rem',
      }}
    >
      {title}
    </h3>
    <ul style={{ listStyle: 'none' }}>
      {items.map((item, i) => (
        <li
          key={i}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'var(--text-3)',
            padding: '0.3rem 0',
            borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
            letterSpacing: '0.05em',
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

const Home = () => {
  const heroRef      = useRef(null);
  const nameRef      = useRef(null);
  const taglineRef   = useRef(null);
  const tagsRef      = useRef(null);
  const imgRef       = useRef(null);
  const scrollIndRef = useRef(null);
  const cta1Ref      = useMagneticHover();
  const cta2Ref      = useMagneticHover();

  /* ---- Hero GSAP intro ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      // Name — slice in from below
      const nameEl = nameRef.current;
      if (nameEl) {
        const text = nameEl.textContent;
        const words = text.split(' ');
        nameEl.innerHTML = words
          .map(
            (w) =>
              `<span class="split-word"><span class="split-word-inner">${w}</span></span>`
          )
          .join(' ');

        tl.to('.split-word-inner', {
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: 'power4.out',
        });
      }

      // Tagline
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

      // Role tags
      tl.fromTo(
        tagsRef.current?.children || [],
        { opacity: 0, scale: 0.85, y: 10 },
        { opacity: 1, scale: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'back.out(1.4)' },
        '-=0.5'
      );

      // Profile image
      tl.fromTo(
        imgRef.current,
        { opacity: 0, scale: 0.95, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.8'
      );

      // Scroll indicator
      tl.fromTo(
        scrollIndRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.3'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ---- Parallax on hero bg blob ---- */
  const blobRef = useRef(null);
  useEffect(() => {
    gsap.to(blobRef.current, {
      y: -120,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  return (
    <div style={{ background: 'var(--bg-0)', color: 'var(--text-1)' }}>

      {/* ============================
          HERO
          ============================ */}
      <section
        ref={heroRef}
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '8rem 0 4rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient blobs */}
        <div
          ref={blobRef}
          style={{
            position: 'absolute',
            top: '10%',
            right: '-10%',
            width: '600px',
            height: '600px',
            background:
              'radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 65%)',
            pointerEvents: 'none',
            willChange: 'transform',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '10%',
            left: '-5%',
            width: '400px',
            height: '400px',
            background:
              'radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            maxWidth: '1300px',
            margin: '0 auto',
            padding: '0 2.5rem',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Left — Text */}
          <div>
            {/* Label */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 12px var(--accent)',
                  animation: 'pulse-glow 2s infinite',
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'var(--text-3)',
                }}
              >
                Available for Collaboration
              </span>
            </div>

            {/* Name — GSAP splits this */}
            <h1
              ref={nameRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 10vw, 10rem)',
                lineHeight: 0.9,
                letterSpacing: '0.01em',
                color: 'var(--text-1)',
                marginBottom: '1.5rem',
                overflow: 'hidden',
              }}
            >
              KAUSTUBH DESHMUKH
            </h1>

            {/* Tagline */}
            <p
              ref={taglineRef}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                fontWeight: 400,
                color: 'var(--text-2)',
                maxWidth: '580px',
                lineHeight: 1.7,
                marginBottom: '2.5rem',
                opacity: 0,
              }}
            >
              I teach engineers how to think, build production systems that last,
              and bridge the gap between academic rigor and real-world software.
            </p>

            {/* Role tags */}
            <div
              ref={tagsRef}
              style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', marginBottom: '3rem' }}
            >
              {[
                { label: 'Asst. Professor', color: 'var(--accent)' },
                { label: 'Full-Stack Dev', color: 'var(--accent-warm)' },
                { label: 'React Engineer', color: 'var(--accent-cyan)' },
                { label: 'MCA Coordinator', color: 'var(--text-3)' },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.4rem 0.9rem',
                    borderRadius: '100px',
                    background: 'var(--bg-1)',
                    border: `1px solid ${color}30`,
                    color,
                    opacity: 0,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div ref={cta1Ref}>
                <Link
                  to="/work"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.9rem 2rem',
                    background: 'var(--text-1)',
                    color: 'var(--bg-0)',
                    borderRadius: '100px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'background 0.3s ease, transform 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--accent)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--text-1)';
                  }}
                >
                  View Work
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div ref={cta2Ref}>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    padding: '0.9rem 2rem',
                    borderRadius: '100px',
                    border: '1px solid var(--border-hover)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: 'var(--text-2)',
                    transition: 'border-color 0.3s, color 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent)';
                    e.currentTarget.style.color = 'var(--text-1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-hover)';
                    e.currentTarget.style.color = 'var(--text-2)';
                  }}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Right — Profile Image */}
          <div ref={imgRef} style={{ opacity: 0 }}>
            <div
              className="float"
              style={{
                position: 'relative',
                width: 'clamp(200px, 24vw, 320px)',
                aspectRatio: '1',
              }}
            >
              {/* Rotating border frame */}
              <div
                className="animated-border"
                style={{
                  position: 'absolute',
                  inset: '-8px',
                  borderRadius: '24px',
                  opacity: 0.8,
                }}
              />
              <img
                src={profileImg}
                alt="Kaustubh Deshmukh"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '18px',
                  filter: 'grayscale(20%) contrast(1.05)',
                  display: 'block',
                }}
                onError={(e) => {
                  e.target.parentElement.innerHTML = `
                    <div style="width:100%;height:100%;background:var(--bg-2);border-radius:18px;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:4rem;color:var(--text-3);">KD</div>`;
                }}
              />

              {/* Experience badge */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-1rem',
                  right: '-1rem',
                  background: 'var(--bg-1)',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '0.75rem 1rem',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.8rem',
                    color: 'var(--accent)',
                    lineHeight: 1,
                  }}
                >
                  2+
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.1em',
                    color: 'var(--text-3)',
                    textTransform: 'uppercase',
                    marginTop: '0.25rem',
                  }}
                >
                  Yrs Teaching
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndRef}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            opacity: 0,
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
            }}
          >
            Scroll
          </div>
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, var(--text-3), transparent)',
              animation: 'float 2s ease-in-out infinite',
            }}
          />
        </div>
      </section>

      {/* ============================
          TICKER
          ============================ */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <Ticker items={tickerItems} />
      </div>

      {/* ============================
          STATS
          ============================ */}
      <section style={{ padding: '6rem 2.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
              padding: '3rem 2rem',
              background: 'var(--bg-1)',
              border: '1px solid var(--border)',
              borderRadius: '20px',
            }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <StatCounter target={100} suffix="+" label="Students Taught" />
            <StatCounter target={10}  suffix="+" label="Projects Coordinated" />
            <StatCounter target={2}   suffix=""  label="Core Courses" />
          </motion.div>
        </div>
      </section>

      {/* ============================
          PHILOSOPHY
          ============================ */}
      <section style={{ padding: '4rem 2.5rem 8rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              marginBottom: '4rem',
            }}
          >
            How I Think
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2px' }}>
            {[
              {
                num: '01',
                title: 'Teaching builds thinking',
                body: 'Programming instruction means teaching problem decomposition and logic, not just syntax. I prepare students for systems they haven\'t encountered yet.',
                color: 'var(--accent)',
              },
              {
                num: '02',
                title: 'Projects require judgment',
                body: 'Coordinating student work means evaluating feasibility and learning outcomes. Good projects teach when to simplify, when to architect, when to deliver.',
                color: 'var(--accent-warm)',
              },
              {
                num: '03',
                title: 'Systems outlive intentions',
                body: 'Production work requires different decisions than prototypes. I build for the people who inherit the code and maintain the architecture.',
                color: 'var(--accent-cyan)',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.15 }}
                style={{
                  padding: '2.5rem',
                  background: 'var(--bg-1)',
                  borderRadius: i === 0 ? '16px 0 0 16px' : i === 2 ? '0 16px 16px 0' : '0',
                  border: '1px solid var(--border)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{ background: 'var(--bg-2)' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '5rem',
                    color: `${item.color}10`,
                    position: 'absolute',
                    top: '-1rem',
                    right: '1rem',
                    lineHeight: 1,
                    userSelect: 'none',
                  }}
                >
                  {item.num}
                </div>
                <div
                  style={{
                    width: '24px',
                    height: '2px',
                    background: item.color,
                    marginBottom: '1.5rem',
                    borderRadius: '1px',
                  }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: 'var(--text-1)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.9rem',
                    color: 'var(--text-3)',
                    lineHeight: 1.7,
                  }}
                >
                  {item.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          BENTO GRID — What I Do
          ============================ */}
      <section style={{ padding: '2rem 2.5rem 8rem', background: 'var(--bg-0)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '3rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--text-3)',
              }}
            >
              What I Do
            </span>
            <Link
              to="/capabilities"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                textDecoration: 'none',
              }}
            >
              All Skills →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1rem',
            }}
          >
            <BentoCard
              title="Teaching"
              items={['C Programming', 'Python & PPS', 'First-Year Engineering', 'Algorithmic Thinking']}
              accent="var(--accent)"
              delay={0}
            />
            <BentoCard
              title="Coordination"
              items={['MCA Major Projects', 'Industry Internships', 'Technical Mentorship', 'Feasibility Review']}
              accent="var(--accent-warm)"
              delay={0.1}
            />
            <BentoCard
              title="Engineering"
              items={['React Applications', 'Firebase & Node.js', 'API Design', 'System Architecture']}
              accent="var(--accent-cyan)"
              delay={0.2}
            />
            <BentoCard
              title="Practice"
              items={['DSA — LeetCode', 'System Design', 'Code Review', 'Documentation']}
              accent="var(--text-3)"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* ============================
          MANIFESTO (dark cinematic)
          ============================ */}
      <section
        style={{
          padding: '8rem 2.5rem',
          background: 'var(--bg-1)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(129,140,248,0.05) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
              fontWeight: 300,
              color: 'var(--text-1)',
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
            }}
          >
            I prepare students for industry problems, evaluate project complexity,
            and make technical decisions that outlast implementation.{' '}
            <span style={{ color: 'var(--accent)' }}>
              This requires understanding constraints, consequences,
              and what matters beyond delivery.
            </span>
          </motion.p>
        </div>
      </section>

      {/* ============================
          TECH STACK
          ============================ */}
      <section style={{ padding: '8rem 2.5rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              marginBottom: '4rem',
            }}
          >
            Technical Foundation
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              { area: 'Languages', skills: ['C', 'C++', 'JavaScript', 'Python', 'SQL'], color: 'var(--accent)' },
              { area: 'Frontend', skills: ['React', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Vite'], color: 'var(--accent-warm)' },
              { area: 'Backend & Data', skills: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'Firebase'], color: 'var(--accent-cyan)' },
              { area: 'Practices', skills: ['DSA', 'System Design', 'Code Review', 'Agile', 'OBE/NBA'], color: 'var(--text-2)' },
            ].map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ borderTop: `2px solid ${cap.color}`, paddingTop: '1.5rem' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--text-1)',
                    marginBottom: '1rem',
                  }}
                >
                  {cap.area}
                </div>
                {cap.skills.map((s) => (
                  <div
                    key={s}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--text-3)',
                      padding: '0.25rem 0',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {s}
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================
          CTA
          ============================ */}
      <section
        style={{
          padding: '6rem 2.5rem',
          borderTop: '1px solid var(--border)',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2rem, 5vw, 4rem)',
                letterSpacing: '0.02em',
                color: 'var(--text-1)',
                marginBottom: '1rem',
              }}
            >
              LET'S BUILD SOMETHING
            </div>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                color: 'var(--text-3)',
                marginBottom: '2.5rem',
                lineHeight: 1.6,
              }}
            >
              Open to collaboration — academic partnerships, frontend consulting,
              and meaningful mentorship.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MagneticButton href="/contact" variant="primary">
                Get in Touch
              </MagneticButton>
              <MagneticButton href="/work" variant="outline">
                See My Work
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;