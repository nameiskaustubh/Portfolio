/**
 * Home.jsx — Cinematic Hero + Scroll Journey
 * v2.1 — Full mobile responsiveness fix
 *
 * Strategy: inject a <style> block for media-query-driven layout.
 * Inline styles handle theming; CSS classes handle breakpoints.
 * useWindowSize hook drives GSAP-side conditionals only.
 */

import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import profileImg from '../assets/profile.jpg';
import { useCountUp } from '../hooks/useScrollReveal';
import { useMagneticHover } from '../hooks/Usemagnetichover';
import MagneticButton from '../components/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   Responsive hook — avoids SSR issues
   ============================================================ */
function useWindowSize() {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  useEffect(() => {
    const handler = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handler, { passive: true });
    return () => window.removeEventListener('resize', handler);
  }, []);
  return width;
}

/* ============================================================
   Animated counter
   ============================================================ */
const StatCounter = ({ target, suffix, label }) => {
  const ref = useRef(null);
  useCountUp(ref, target, suffix);
  return (
    <div style={{ textAlign: 'center' }}>
      <div
        ref={ref}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.8rem, 5vw, 4.5rem)',
          color: 'var(--text-1)',
          lineHeight: 1,
          letterSpacing: '-0.02em',
        }}
      >
        0{suffix}
      </div>
      <div
        className="label"
        style={{ marginTop: '0.4rem', color: 'var(--text-3)', fontSize: '0.6rem' }}
      >
        {label}
      </div>
    </div>
  );
};

/* ============================================================
   Ticker / Marquee
   ============================================================ */
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
    <div style={{ overflow: 'hidden', padding: '1.25rem 0' }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '2.5rem',
          whiteSpace: 'nowrap',
          willChange: 'transform',
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1rem, 2.5vw, 2rem)',
              letterSpacing: '0.1em',
              color:
                i % 4 === 0
                  ? 'var(--accent)'
                  : i % 4 === 2
                  ? 'var(--accent-warm)'
                  : 'var(--text-3)',
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
  'React','★','Node.js','★','Firebase','★','Python','★',
  'Tailwind','★','GSAP','★','Framer Motion','★','MySQL','★',
  'DSA','★','Teaching','★','System Design','★','Mentorship',
];

/* ============================================================
   Bento card
   ============================================================ */
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
      padding: '1.25rem',
      transition: 'border-color 0.3s ease',
    }}
    whileHover={{ borderColor: 'var(--border-hover)' }}
  >
    <div
      style={{
        width: '24px',
        height: '3px',
        background: accent || 'var(--accent)',
        borderRadius: '2px',
        marginBottom: '0.875rem',
      }}
    />
    <h3
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: '0.9rem',
        fontWeight: 700,
        color: 'var(--text-1)',
        marginBottom: '0.65rem',
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
            fontSize: '0.68rem',
            color: 'var(--text-3)',
            padding: '0.2rem 0',
            borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
            letterSpacing: '0.04em',
          }}
        >
          {item}
        </li>
      ))}
    </ul>
  </motion.div>
);

/* ============================================================
   Main Component
   ============================================================ */
const Home = () => {
  const windowWidth = useWindowSize();
  const isMobile    = windowWidth < 768;
  const isTablet    = windowWidth < 1024;

  const heroRef      = useRef(null);
  const nameRef      = useRef(null);
  const taglineRef   = useRef(null);
  const tagsRef      = useRef(null);
  const imgRef       = useRef(null);
  const scrollIndRef = useRef(null);
  const blobRef      = useRef(null);
  const cta1Ref      = useMagneticHover();
  const cta2Ref      = useMagneticHover();

  /* ---- Hero GSAP intro ---- */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });

      const nameEl = nameRef.current;
      if (nameEl) {
        const words = nameEl.textContent.trim().split(' ');
        nameEl.innerHTML = words
          .map(
            (w) =>
              `<span style="overflow:hidden;display:inline-block;"><span class="split-word-inner" style="display:inline-block;transform:translateY(100%);">${w}</span></span>`
          )
          .join(' ');

        tl.to('.split-word-inner', {
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: 'power4.out',
        });
      }

      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      );

      const tagEls = tagsRef.current?.children;
      if (tagEls?.length) {
        tl.fromTo(
          tagEls,
          { opacity: 0, scale: 0.85, y: 10 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'back.out(1.4)' },
          '-=0.5'
        );
      }

      if (imgRef.current) {
        tl.fromTo(
          imgRef.current,
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=0.8'
        );
      }

      if (scrollIndRef.current) {
        tl.fromTo(
          scrollIndRef.current,
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.6 },
          '-=0.3'
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  /* ---- Parallax blob ---- */
  useEffect(() => {
    if (!blobRef.current || isMobile) return;
    const t = gsap.to(blobRef.current, {
      y: -120,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
    return () => t.kill();
  }, [isMobile]);

  /* ---- Image size ---- */
  const imgSize = isMobile ? '150px' : isTablet ? '200px' : 'clamp(220px, 22vw, 290px)';

  return (
    <div style={{ background: 'var(--bg-0)', color: 'var(--text-1)' }}>

      {/* ── Responsive CSS ── */}
      <style>{`
        /* ---- Hero grid ---- */
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 3rem;
          align-items: center;
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 2.5rem;
          width: 100%;
        }
        /* Tablet */
        @media (max-width: 1023px) {
          .hero-grid { padding: 0 2rem; gap: 2rem; }
        }
        /* Mobile — single column, image stacks above text */
        @media (max-width: 767px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
            padding: 0 1.25rem;
          }
          .hero-img-col { order: -1; display: flex; justify-content: center; }
          .hero-text-col { order: 1; text-align: center; }
          .hero-tags  { justify-content: center !important; }
          .hero-ctas  { justify-content: center !important; }
        }

        /* ---- Stats row ---- */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
          padding: 2.5rem 2rem;
          background: var(--bg-1);
          border: 1px solid var(--border);
          border-radius: 20px;
        }
        @media (max-width: 767px) {
          .stats-grid { padding: 1.75rem 1rem; gap: 0.5rem; }
        }

        /* ---- Philosophy cards ---- */
        .philosophy-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1px;
        }
        @media (max-width: 767px) {
          .philosophy-grid { gap: 0.75rem; }
          .phil-card-inner { border-radius: 14px !important; }
        }

        /* ---- Bento grid ---- */
        .bento-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 0.875rem;
        }
        @media (max-width: 479px) {
          .bento-grid { grid-template-columns: repeat(2, 1fr); gap: 0.625rem; }
        }

        /* ---- Stack grid ---- */
        .stack-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 1.5rem;
        }
        @media (max-width: 479px) {
          .stack-grid { grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        }

        /* ---- Section padding ---- */
        .sec-lg { padding: 8rem 2.5rem; }
        .sec-md { padding: 6rem 2.5rem; }
        @media (max-width: 767px) {
          .sec-lg { padding: 4rem 1.25rem; }
          .sec-md { padding: 3.5rem 1.25rem; }
        }
        @media (min-width: 768px) and (max-width: 1023px) {
          .sec-lg { padding: 6rem 2rem; }
          .sec-md { padding: 4rem 2rem; }
        }

        /* ---- Shared inner wrapper ---- */
        .hw-inner { max-width: 1100px; margin: 0 auto; }

        /* ---- CTA row ---- */
        .cta-row { display: flex; gap: 1rem; flex-wrap: wrap; }
        @media (max-width: 380px) {
          .cta-row { flex-direction: column; align-items: stretch; }
          .cta-row a { width: 100% !important; justify-content: center; }
        }

        /* ---- Scroll indicator hidden on mobile ---- */
        @media (max-width: 767px) {
          .scroll-ind { display: none !important; }
        }
      `}</style>

      {/* ══════════════ HERO ══════════════ */}
      <section
        ref={heroRef}
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: isMobile ? '6rem 0 3rem' : '8rem 0 4rem',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* BG blobs */}
        <div
          ref={blobRef}
          style={{
            position: 'absolute',
            top: '10%',
            right: '-10%',
            width: isMobile ? '300px' : '500px',
            height: isMobile ? '300px' : '500px',
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
            width: '350px',
            height: '350px',
            background:
              'radial-gradient(circle, rgba(251,191,36,0.05) 0%, transparent 65%)',
            pointerEvents: 'none',
          }}
        />

        {/* ── Grid ── */}
        <div className="hero-grid">
          {/* Text column */}
          <div className="hero-text-col">
            {/* Status pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '1.25rem',
              }}
            >
              <span
                style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 10px var(--accent)',
                  animation: 'pulse-glow 2s infinite',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--text-3)',
                }}
              >
                Available for Collaboration
              </span>
            </div>

            {/* Name */}
            <h1
              ref={nameRef}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: isMobile
                  ? 'clamp(2.6rem, 11vw, 4.5rem)'
                  : 'clamp(3.5rem, 7vw, 8.5rem)',
                lineHeight: 0.92,
                letterSpacing: '0.01em',
                color: 'var(--text-1)',
                marginBottom: '1.25rem',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              KAUSTUBH DESHMUKH
            </h1>

            {/* Tagline */}
            <p
              ref={taglineRef}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: isMobile ? '0.92rem' : 'clamp(0.95rem, 1.6vw, 1.1rem)',
                color: 'var(--text-2)',
                maxWidth: isMobile ? '100%' : '520px',
                lineHeight: 1.75,
                marginBottom: '1.75rem',
                opacity: 0,
              }}
            >
              I teach engineers how to think, build production systems that
              last, and bridge the gap between academic rigor and real-world
              software.
            </p>

            {/* Role tags */}
            <div
              ref={tagsRef}
              className="hero-tags"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.45rem',
                marginBottom: '2.25rem',
              }}
            >
              {[
                { label: 'Asst. Professor', color: 'var(--accent)' },
                { label: 'Full-Stack Dev',  color: 'var(--accent-warm)' },
                { label: 'React Engineer',  color: 'var(--accent-cyan)' },
                { label: 'MCA Coordinator', color: 'var(--text-3)' },
              ].map(({ label, color }) => (
                <span
                  key={label}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    padding: '0.3rem 0.75rem',
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
            <div className="hero-ctas cta-row">
              <div ref={cta1Ref}>
                <Link
                  to="/work"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.8rem 1.6rem',
                    background: 'var(--text-1)',
                    color: 'var(--bg-0)',
                    borderRadius: '100px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    fontWeight: 600,
                    transition: 'background 0.3s ease',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = 'var(--accent)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = 'var(--text-1)')
                  }
                >
                  View Work
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
              <div ref={cta2Ref}>
                <Link
                  to="/contact"
                  style={{
                    display: 'inline-flex',
                    padding: '0.8rem 1.6rem',
                    borderRadius: '100px',
                    border: '1px solid var(--border-hover)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    color: 'var(--text-2)',
                    transition: 'border-color 0.3s, color 0.3s',
                    whiteSpace: 'nowrap',
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

          {/* ── Image column ── */}
          <div
            className="hero-img-col"
            ref={imgRef}
            style={{ opacity: 0, flexShrink: 0 }}
          >
            <div
              className={isMobile ? '' : 'float'}
              style={{ position: 'relative', width: imgSize, height: imgSize }}
            >
              {/* Animated border */}
              <div
                className="animated-border"
                style={{
                  position: 'absolute',
                  inset: '-6px',
                  borderRadius: isMobile ? '18px' : '22px',
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
                  objectPosition: 'top center',
                  borderRadius: isMobile ? '14px' : '18px',
                  filter: 'grayscale(20%) contrast(1.05)',
                  display: 'block',
                }}
                onError={(e) => {
                  e.target.parentElement.innerHTML = `
                    <div style="width:100%;height:100%;background:var(--bg-2);border-radius:18px;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:2.5rem;color:var(--text-3);">KD</div>`;
                }}
              />

              {/* Experience badge — desktop/tablet only */}
              {!isMobile && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '-0.75rem',
                    right: '-0.75rem',
                    background: 'var(--bg-1)',
                    border: '1px solid var(--border)',
                    borderRadius: '10px',
                    padding: '0.55rem 0.85rem',
                    backdropFilter: 'blur(20px)',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      color: 'var(--accent)',
                      lineHeight: 1,
                    }}
                  >
                    2+
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.52rem',
                      letterSpacing: '0.1em',
                      color: 'var(--text-3)',
                      textTransform: 'uppercase',
                      marginTop: '0.2rem',
                    }}
                  >
                    Yrs Teaching
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollIndRef}
          className="scroll-ind"
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
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.57rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: '1px',
              height: '36px',
              background: 'linear-gradient(to bottom, var(--text-3), transparent)',
              animation: 'float 2s ease-in-out infinite',
            }}
          />
        </div>
      </section>

      {/* ══════════════ TICKER ══════════════ */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <Ticker items={tickerItems} />
      </div>

      {/* ══════════════ STATS ══════════════ */}
      <section className="sec-md">
        <div className="hw-inner">
          <motion.div
            className="stats-grid"
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

      {/* ══════════════ PHILOSOPHY ══════════════ */}
      <section className="sec-lg">
        <div className="hw-inner">
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              marginBottom: isMobile ? '2rem' : '3.5rem',
            }}
          >
            How I Think
          </div>

          <div className="philosophy-grid">
            {[
              {
                num: '01',
                title: 'Teaching builds thinking',
                body: "Programming instruction means teaching problem decomposition and logic, not just syntax. I prepare students for systems they haven't encountered yet.",
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
                transition={{ duration: 0.7, delay: i * 0.12 }}
                className="phil-card-inner"
                style={{
                  padding: isMobile ? '1.75rem 1.5rem' : '2.5rem',
                  background: 'var(--bg-1)',
                  borderRadius:
                    isMobile
                      ? '14px'
                      : i === 0
                      ? '16px 0 0 16px'
                      : i === 2
                      ? '0 16px 16px 0'
                      : '0',
                  border: '1px solid var(--border)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '4rem',
                    color: `${item.color}10`,
                    position: 'absolute',
                    top: '-0.5rem',
                    right: '1rem',
                    lineHeight: 1,
                    userSelect: 'none',
                    pointerEvents: 'none',
                  }}
                >
                  {item.num}
                </div>
                <div
                  style={{
                    width: '20px',
                    height: '2px',
                    background: item.color,
                    marginBottom: '1.1rem',
                    borderRadius: '1px',
                  }}
                />
                <h3
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '1rem',
                    fontWeight: 700,
                    color: 'var(--text-1)',
                    marginBottom: '0.6rem',
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.84rem',
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

      {/* ══════════════ BENTO — What I Do ══════════════ */}
      <section className="sec-md" style={{ background: 'var(--bg-0)' }}>
        <div className="hw-inner">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '2rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
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
                fontSize: '0.68rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                textDecoration: 'none',
              }}
            >
              All Skills →
            </Link>
          </div>

          <div className="bento-grid">
            <BentoCard
              title="Teaching"
              items={['C Programming', 'Python & PPS', 'First-Year Eng.', 'Algorithmic Thinking']}
              accent="var(--accent)"
              delay={0}
            />
            <BentoCard
              title="Coordination"
              items={['MCA Major Projects', 'Industry Internships', 'Tech Mentorship', 'Feasibility Review']}
              accent="var(--accent-warm)"
              delay={0.1}
            />
            <BentoCard
              title="Engineering"
              items={['React Apps', 'Firebase & Node.js', 'API Design', 'System Architecture']}
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

      {/* ══════════════ MANIFESTO ══════════════ */}
      <section
        className="sec-lg"
        style={{ background: 'var(--bg-1)', position: 'relative', overflow: 'hidden' }}
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
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5 }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(1.05rem, 2.8vw, 2rem)',
              fontWeight: 300,
              color: 'var(--text-1)',
              lineHeight: 1.6,
              letterSpacing: '-0.01em',
            }}
          >I build real-world applications, design scalable systems, and teach engineers how to think beyond code — bridging the gap between learning and production-ready software.{' '}
<span style={{ color: 'var(--accent)' }}>
  Every decision is driven by constraints, trade-offs, and long-term impact.
</span>
          </motion.p>
        </div>
      </section>

      {/* ══════════════ TECH STACK ══════════════ */}
      <section className="sec-lg">
        <div className="hw-inner">
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
              marginBottom: isMobile ? '2rem' : '3.5rem',
            }}
          >
            Technical Foundation
          </div>

          <div className="stack-grid">
            {[
              {
                area: 'Languages',
                skills: ['C', 'C++', 'JavaScript', 'Python', 'SQL'],
                color: 'var(--accent)',
              },
              {
                area: 'Frontend',
                skills: ['React', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Vite'],
                color: 'var(--accent-warm)',
              },
              {
                area: 'Backend & Data',
                skills: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'Firebase'],
                color: 'var(--accent-cyan)',
              },
              {
                area: 'Practices',
                skills: ['DSA', 'System Design', 'Code Review', 'Agile', 'OBE/NBA'],
                color: 'var(--text-2)',
              },
            ].map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ borderTop: `2px solid ${cap.color}`, paddingTop: '1.25rem' }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    color: 'var(--text-1)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {cap.area}
                </div>
                {cap.skills.map((s) => (
                  <div
                    key={s}
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.7rem',
                      color: 'var(--text-3)',
                      padding: '0.18rem 0',
                      letterSpacing: '0.04em',
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

      {/* ══════════════ CTA ══════════════ */}
      <section
        className="sec-md"
        style={{ borderTop: '1px solid var(--border)', textAlign: 'center' }}
      >
        <div style={{ maxWidth: '540px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.8rem, 5vw, 3.5rem)',
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
                fontSize: '0.92rem',
                color: 'var(--text-3)',
                marginBottom: '2rem',
                lineHeight: 1.65,
              }}
            >
              Open to collaboration — academic partnerships, frontend
              consulting, and meaningful mentorship.
            </p>
            <div className="cta-row" style={{ justifyContent: 'center' }}>
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