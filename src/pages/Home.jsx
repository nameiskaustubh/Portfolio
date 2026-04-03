/**
 * Home.jsx — Cinematic Journey Experience
 * v3.0 — 3D scroll-driven universe
 *
 * Architecture:
 *  ┌─────────────────────────────────────────┐
 *  │  <div style={{height:'600vh'}}>          │  ← scroll space
 *  │    <div style={{position:'sticky'}}>     │  ← sticky viewport
 *  │      <Scene />           (fixed canvas)  │
 *  │      <WarpVignette />    (speed overlay) │
 *  │      <JourneyProgress /> (nav dots)      │
 *  │      <HeroPanel />                       │  ← content panels
 *  │      <StatsPanel />                      │    fade in/out
 *  │      <PhilosophyPanel />                 │    driven by
 *  │      <BentoPanel />                      │    scroll progress
 *  │      <StackPanel />                      │
 *  │      <CTAPanel />                        │
 *  │    </div>                                │
 *  │  </div>                                  │
 *  └─────────────────────────────────────────┘
 *
 * Mobile / prefers-reduced-motion → renders classic scroll layout (no 3D).
 */

import { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import profileImg from '../assets/profile.jpg';
import { useCountUp } from '../hooks/useScrollReveal';
import { useMagneticHover } from '../hooks/Usemagnetichover';
import MagneticButton from '../components/MagneticButton';
import { useJourneyEngine, STATIONS } from '../hooks/useJourneyEngine';

/* Lazy-load the heavy 3D scene — keeps initial bundle lean */
const Scene = lazy(() => import('../3d/Scene'));

/* ─────────────────────────── Feature detection ─────────────────────── */
function useJourneyCapable() {
  const [capable, setCapable] = useState(false);
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile      = window.innerWidth < 768;
    setCapable(!reducedMotion && !isMobile);
  }, []);
  return capable;
}

/* ─────────────────────────── Window size ────────────────────────────── */
function useWindowSize() {
  const [width, setWidth] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  useEffect(() => {
    const h = () => setWidth(window.innerWidth);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, []);
  return width;
}

/* ─────────────────────────── Stat Counter ───────────────────────────── */
const StatCounter = ({ target, suffix, label }) => {
  const ref = useRef(null);
  useCountUp(ref, target, suffix);
  return (
    <div style={{ textAlign: 'center' }}>
      <div ref={ref} style={{
        fontFamily: 'var(--font-display)',
        fontSize:   'clamp(1.8rem,5vw,4.5rem)',
        color:      'var(--text-1)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>
        0{suffix}
      </div>
      <div style={{ marginTop: '0.4rem', color: 'var(--text-3)', fontSize: '0.6rem' }}>
        {label}
      </div>
    </div>
  );
};

/* ─────────────────────────── Ticker ─────────────────────────────────── */
const tickerItems = [
  'React','★','Node.js','★','Firebase','★','Python','★',
  'Tailwind','★','GSAP','★','Framer Motion','★','MySQL','★',
  'DSA','★','Teaching','★','System Design','★','Mentorship',
];

const Ticker = ({ items }) => {
  const trackRef = useRef(null);
  useEffect(() => {
    gsap.to(trackRef.current, { xPercent: -50, duration: 20, ease: 'none', repeat: -1 });
  }, []);
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: 'hidden', padding: '1.25rem 0' }}>
      <div ref={trackRef} style={{ display: 'flex', gap: '2.5rem', whiteSpace: 'nowrap', willChange: 'transform' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily:    'var(--font-display)',
            fontSize:      'clamp(1rem,2.5vw,2rem)',
            letterSpacing: '0.1em',
            color: i % 4 === 0 ? 'var(--accent)' : i % 4 === 2 ? 'var(--accent-warm)' : 'var(--text-3)',
          }}>{item}</span>
        ))}
      </div>
    </div>
  );
};

/* ─────────────────────────── Bento Card ─────────────────────────────── */
const BentoCard = ({ title, items, accent, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    style={{
      background: 'var(--bg-1)', border: '1px solid var(--border)',
      borderRadius: '16px', padding: '1.25rem', backdropFilter: 'blur(12px)',
    }}
    whileHover={{ borderColor: 'var(--border-hover)' }}
  >
    <div style={{ width: '24px', height: '3px', background: accent || 'var(--accent)', borderRadius: '2px', marginBottom: '0.875rem' }} />
    <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '0.65rem' }}>
      {title}
    </h3>
    <ul style={{ listStyle: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-3)',
          padding: '0.2rem 0', letterSpacing: '0.04em',
          borderBottom: i < items.length - 1 ? '1px solid var(--border)' : 'none',
        }}>{item}</li>
      ))}
    </ul>
  </motion.div>
);

/* ─────────────────────────── Journey Progress Dots ─────────────────── */
const JourneyProgress = ({ activeStation }) => (
  <div style={{
    position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)',
    display: 'flex', flexDirection: 'column', gap: '0.75rem', zIndex: 20,
  }}>
    {STATIONS.map(({ id, label }) => {
      const isActive = activeStation === id;
      return (
        <div key={id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexDirection: 'row-reverse' }}>
          <div style={{
            width:  isActive ? '8px' : '5px',
            height: isActive ? '8px' : '5px',
            borderRadius: '50%',
            background:   isActive ? 'var(--accent)' : 'var(--text-3)',
            boxShadow:    isActive ? '0 0 10px var(--accent)' : 'none',
            transition:   'all 0.4s ease',
            flexShrink: 0,
          }} />
          <span style={{
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.5rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color:         isActive ? 'var(--text-2)' : 'transparent',
            transition:    'color 0.4s ease',
            whiteSpace:    'nowrap',
          }}>{label}</span>
        </div>
      );
    })}
  </div>
);

/* ─────────────────────────── Warp Vignette ──────────────────────────── */
/* Intensifies when scrolling fast — sells the speed / travel feeling */
const WarpVignette = ({ vignetteRef }) => (
  <div ref={vignetteRef} style={{
    position: 'absolute', inset: 0, zIndex: 2, opacity: 0, pointerEvents: 'none',
    background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, #020617 100%)',
    mixBlendMode: 'multiply',
  }} />
);

/* ─────────────────────────── Panel Wrapper ──────────────────────────── */
/* Each section lives in this — absolutely positioned, fills sticky viewport */
const Panel = ({ panelRef, children, style = {} }) => (
  <div ref={panelRef} style={{
    position:   'absolute',
    inset:      0,
    overflowY:  'auto',
    overflowX:  'hidden',
    opacity:    0,
    willChange: 'transform, opacity',
    display:    'flex',
    alignItems: 'center',
    ...style,
  }}>
    {children}
  </div>
);

/* ═══════════════════════════ MAIN COMPONENT ════════════════════════════ */
const Home = () => {
  const windowWidth  = useWindowSize();
  const isMobile     = windowWidth < 768;
  const isTablet     = windowWidth < 1024;
  const isCapable    = useJourneyCapable();

  /* ── Engine ── */
  const engine    = useJourneyEngine();
  const engineRef = useRef(engine);
  engineRef.current = engine;

  /* ── Panel refs (journey mode) ── */
  const heroRef   = useRef(null);
  const statsRef  = useRef(null);
  const philRef   = useRef(null);
  const bentoRef  = useRef(null);
  const stackRef  = useRef(null);
  const ctaRef    = useRef(null);
  const vigRef    = useRef(null);

  /* ── Hero GSAP intro (shared between both modes) ── */
  const heroContentRef = useRef(null);
  const nameRef        = useRef(null);
  const taglineRef     = useRef(null);
  const tagsRef        = useRef(null);
  const imgRef         = useRef(null);
  const blobRef        = useRef(null);
  const cta1Ref        = useMagneticHover();
  const cta2Ref        = useMagneticHover();

  /* ── Active station for progress dots ── */
  const [activeStation, setActiveStation] = useState('hero');

  const imgSize = isMobile ? '150px' : isTablet ? '200px' : 'clamp(220px,22vw,290px)';

  /* ── Hero text intro animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      if (nameRef.current) {
        const words = nameRef.current.textContent.trim().split(' ');
        nameRef.current.innerHTML = words
          .map(w => `<span style="overflow:hidden;display:inline-block;"><span class="split-word-inner" style="display:inline-block;transform:translateY(100%);">${w}</span></span>`)
          .join(' ');
        tl.to('.split-word-inner', { y: 0, duration: 1, stagger: 0.1, ease: 'power4.out' });
      }

      if (taglineRef.current) {
        tl.fromTo(taglineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.5');
      }

      const tagEls = tagsRef.current?.children;
      if (tagEls?.length) {
        tl.fromTo(tagEls, { opacity: 0, scale: 0.85, y: 10 }, { opacity: 1, scale: 1, y: 0, stagger: 0.07, duration: 0.5, ease: 'back.out(1.4)' }, '-=0.5');
      }

      if (imgRef.current) {
        tl.fromTo(imgRef.current, { opacity: 0, scale: 0.95, y: 20 }, { opacity: 1, scale: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.8');
      }
    }, heroContentRef);

    return () => ctx.revert();
  }, []);

  /* ── Journey mode: GSAP ticker drives panel visibility ── */
  useEffect(() => {
    if (!isCapable) return;

    /* Panel definitions in scroll order */
    const PANELS = [
      { ref: heroRef,  range: [0.00, 0.17] },
      { ref: statsRef, range: [0.17, 0.34] },
      { ref: philRef,  range: [0.34, 0.51] },
      { ref: bentoRef, range: [0.51, 0.66] },
      { ref: stackRef, range: [0.66, 0.83] },
      { ref: ctaRef,   range: [0.83, 1.00] },
    ];

    const FADE = 0.038; // scroll fraction for enter/exit fade

    /* Per-frame panel visibility update */
    const tickerFn = () => {
      const p   = engine.scrollProgress.current;
      const spd = engine.speed.current;

      /* Update active station for dots */
      setActiveStation(engine.activeStation.current);

      /* Warp vignette */
      if (vigRef.current) {
        gsap.set(vigRef.current, { opacity: Math.min(spd * 2.5, 0.75) });
      }

      PANELS.forEach(({ ref, range: [start, end] }) => {
        if (!ref.current) return;

        let opacity = 0;
        let y = 0;

        if (p >= start && p <= end) {
          opacity = 1; y = 0;
        } else if (p > end && p < end + FADE) {
          const t = (p - end) / FADE;
          opacity = 1 - t;
          y = -t * 40;
        } else if (p > start - FADE && p < start) {
          const t = (p - (start - FADE)) / FADE;
          opacity = t;
          y = (1 - t) * 40;
        }

        gsap.set(ref.current, { opacity, y, force3D: true });
      });
    };

    gsap.ticker.add(tickerFn);

    /* Show hero panel immediately */
    gsap.set(heroRef.current, { opacity: 1, y: 0 });

    return () => gsap.ticker.remove(tickerFn);
  }, [isCapable, engine]);

  /* ── Section entrance callbacks (one-shot) ── */
  useEffect(() => {
    if (!isCapable) return;

    /* Stats: trigger count-up */
    engine.onStation('stats', () => {
      document.querySelectorAll('.stat-counter-val').forEach((el) => {
        const target  = parseFloat(el.dataset.target);
        const suffix  = el.dataset.suffix || '';
        gsap.to({ val: 0 }, {
          val: target, duration: 2, ease: 'power2.out',
          onUpdate: function () {
            el.textContent = `${Math.round(this.targets()[0].val)}${suffix}`;
          },
        });
      });
    });

    /* Philosophy: stagger cards */
    engine.onStation('philosophy', () => {
      gsap.fromTo('.phil-card', { opacity: 0, x: -30 }, { opacity: 1, x: 0, stagger: 0.15, duration: 0.8, ease: 'power3.out' });
    });

    /* Bento: stagger grid */
    engine.onStation('bento', () => {
      gsap.fromTo('.bento-card-item', { opacity: 0, scale: 0.9, y: 20 }, { opacity: 1, scale: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'back.out(1.4)' });
    });

    /* Stack: reveal columns */
    engine.onStation('stack', () => {
      gsap.fromTo('.stack-col', { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.7, ease: 'power3.out' });
    });

    /* CTA: pulse */
    engine.onStation('cta', () => {
      gsap.fromTo('.cta-headline', { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out' });
    });
  }, [isCapable, engine]);

  /* ── Shared CSS ── */
  const sharedCSS = `
    .hero-grid {
      display: grid; grid-template-columns: 1fr auto; gap: 3rem;
      align-items: center; max-width: 1300px; margin: 0 auto;
      padding: 0 2.5rem; width: 100%;
    }
    @media (max-width: 1023px) { .hero-grid { padding: 0 2rem; gap: 2rem; } }
    @media (max-width: 767px) {
      .hero-grid { grid-template-columns: 1fr; gap: 1.75rem; padding: 0 1.25rem; }
      .hero-img-col  { order: -1; display: flex; justify-content: center; }
      .hero-text-col { order: 1; text-align: center; }
      .hero-tags     { justify-content: center !important; }
      .hero-ctas     { justify-content: center !important; }
    }
    .stats-grid {
      display: grid; grid-template-columns: repeat(3,1fr);
      gap: 1rem; padding: 2.5rem 2rem;
      background: var(--bg-1); border: 1px solid var(--border); border-radius: 20px;
    }
    @media (max-width: 767px) { .stats-grid { padding: 1.75rem 1rem; gap: 0.5rem; } }
    .philosophy-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(240px,1fr)); gap: 1px;
    }
    @media (max-width: 767px) { .philosophy-grid { gap: 0.75rem; } }
    .bento-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(200px,1fr)); gap: 0.875rem;
    }
    @media (max-width: 479px) { .bento-grid { grid-template-columns: repeat(2,1fr); gap: 0.625rem; } }
    .stack-grid {
      display: grid; grid-template-columns: repeat(auto-fit, minmax(170px,1fr)); gap: 1.5rem;
    }
    @media (max-width: 479px) { .stack-grid { grid-template-columns: repeat(2,1fr); gap: 1rem; } }
    .sec-lg { padding: 8rem 2.5rem; }
    .sec-md { padding: 6rem 2.5rem; }
    @media (max-width: 767px) { .sec-lg { padding: 4rem 1.25rem; } .sec-md { padding: 3.5rem 1.25rem; } }
    @media (min-width: 768px) and (max-width: 1023px) { .sec-lg { padding: 6rem 2rem; } .sec-md { padding: 4rem 2rem; } }
    .hw-inner { max-width: 1100px; margin: 0 auto; }
    .cta-row  { display: flex; gap: 1rem; flex-wrap: wrap; }
    @media (max-width: 380px) { .cta-row { flex-direction: column; align-items: stretch; } .cta-row a { width: 100% !important; justify-content: center; } }
    @media (max-width: 767px) { .scroll-ind { display: none !important; } }

    /* Journey mode panel container */
    .journey-sticky { position: sticky; top: 0; height: 100vh; width: 100%; overflow: hidden; }

    /* Station station label */
    @media (max-width: 767px) { .journey-progress { display: none !important; } }
  `;

  /* ══════════════════════════════════════════════════════════════════
     HERO CONTENT — shared between both modes
  ══════════════════════════════════════════════════════════════════ */
  const HeroContent = (
    <div ref={heroContentRef} className="hero-grid">
      {/* Text */}
      <div className="hero-text-col">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 10px var(--accent)', animation: 'pulse-glow 2s infinite', flexShrink: 0 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
            Available for Collaboration
          </span>
        </div>

        <h1 ref={nameRef} style={{
          fontFamily: 'var(--font-display)',
          fontSize:   isMobile ? 'clamp(2.6rem,11vw,4.5rem)' : 'clamp(3.5rem,7vw,8.5rem)',
          lineHeight: 0.92, letterSpacing: '0.01em', color: 'var(--text-1)',
          marginBottom: '1.25rem', wordBreak: 'break-word', overflowWrap: 'break-word',
        }}>KAUSTUBH DESHMUKH</h1>

        <p ref={taglineRef} style={{
          fontFamily:   'var(--font-body)',
          fontSize:      isMobile ? '0.92rem' : 'clamp(0.95rem,1.6vw,1.1rem)',
          color:         'var(--text-2)',
          maxWidth:      isMobile ? '100%' : '520px',
          lineHeight:    1.75,
          marginBottom: '1.75rem',
          opacity:       0,
        }}>
          I teach engineers how to think, build production systems that last, and bridge the gap between academic rigor and real-world software.
        </p>

        <div ref={tagsRef} className="hero-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '2.25rem' }}>
          {[
            { label: 'Asst. Professor', color: 'var(--accent)' },
            { label: 'Full-Stack Dev',  color: 'var(--accent-warm)' },
            { label: 'React Engineer',  color: 'var(--accent-cyan)' },
            { label: 'MCA Coordinator', color: 'var(--text-3)' },
          ].map(({ label, color }) => (
            <span key={label} style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.08em',
              textTransform: 'uppercase', padding: '0.3rem 0.75rem', borderRadius: '100px',
              background: 'var(--bg-1)', border: `1px solid ${color}30`, color, opacity: 0,
            }}>{label}</span>
          ))}
        </div>

        <div className="hero-ctas cta-row">
          <div ref={cta1Ref}>
            <Link to="/work" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.8rem 1.6rem', background: 'var(--text-1)', color: 'var(--bg-0)',
              borderRadius: '100px', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              letterSpacing: '0.1em', textTransform: 'uppercase', textDecoration: 'none',
              fontWeight: 600, transition: 'background 0.3s ease', whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--accent)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'var(--text-1)')}
            >
              View Work
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div ref={cta2Ref}>
            <Link to="/contact" style={{
              display: 'inline-flex', padding: '0.8rem 1.6rem', borderRadius: '100px',
              border: '1px solid var(--border-hover)', fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase',
              textDecoration: 'none', color: 'var(--text-2)', transition: 'border-color 0.3s, color 0.3s',
              whiteSpace: 'nowrap',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--text-1)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-hover)'; e.currentTarget.style.color = 'var(--text-2)'; }}
            >Contact</Link>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className="hero-img-col" ref={imgRef} style={{ opacity: 0, flexShrink: 0 }}>
        <div className={isMobile ? '' : 'float'} style={{ position: 'relative', width: imgSize, height: imgSize }}>
          <div className="animated-border" style={{ position: 'absolute', inset: '-6px', borderRadius: isMobile ? '18px' : '22px', opacity: 0.8 }} />
          <img src={profileImg} alt="Kaustubh Deshmukh" style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center',
            borderRadius: isMobile ? '14px' : '18px', filter: 'grayscale(20%) contrast(1.05)', display: 'block',
          }} onError={e => {
            e.target.parentElement.innerHTML = `<div style="width:100%;height:100%;background:var(--bg-2);border-radius:18px;display:flex;align-items:center;justify-content:center;font-family:var(--font-display);font-size:2.5rem;color:var(--text-3);">KD</div>`;
          }} />
          {!isMobile && (
            <div style={{
              position: 'absolute', bottom: '-0.75rem', right: '-0.75rem',
              background: 'var(--bg-1)', border: '1px solid var(--border)', borderRadius: '10px',
              padding: '0.55rem 0.85rem', backdropFilter: 'blur(20px)',
            }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--accent)', lineHeight: 1 }}>2+</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.52rem', letterSpacing: '0.1em', color: 'var(--text-3)', textTransform: 'uppercase', marginTop: '0.2rem' }}>Yrs</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  /* ══════════════════════════════════════════════════════════════════
     JOURNEY MODE — 3D cinematic experience
  ══════════════════════════════════════════════════════════════════ */
  if (isCapable) {
    return (
      <div style={{ background: 'transparent', color: 'var(--text-1)' }}>
        <style>{sharedCSS}</style>

        {/* 600vh scroll space — drives the whole journey */}
        <div style={{ height: '600vh', position: 'relative' }}>

          {/* Sticky viewport — everything lives here */}
          <div className="journey-sticky">

            {/* ── 3D Scene (fixed canvas behind all UI) ── */}
            <Suspense fallback={<div style={{ position: 'absolute', inset: 0, background: '#020617' }} />}>
              <Scene engineRef={engineRef} />
            </Suspense>

            {/* ── Warp speed vignette ── */}
            <WarpVignette vignetteRef={vigRef} />

            {/* ── Journey progress dots ── */}
            <div className="journey-progress" style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', zIndex: 20 }}>
              <JourneyProgress activeStation={activeStation} />
            </div>

            {/* ── Scroll hint (hero only) ── */}
            <div style={{
              position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
              zIndex: 20, pointerEvents: 'none',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.57rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
                Scroll to travel
              </span>
              <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, var(--text-3), transparent)', animation: 'float 2s ease-in-out infinite' }} />
            </div>

            {/* ══ PANEL 1: HERO ══ */}
            <Panel panelRef={heroRef} style={{ alignItems: 'center' }}>
              <div style={{
                width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center',
                padding: isMobile ? '6rem 0 3rem' : '0',
              }}>
                {HeroContent}
              </div>
            </Panel>

            {/* ══ PANEL 2: STATS ══ */}
            <Panel panelRef={statsRef}>
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '3rem', padding: '0 2rem' }}>

                {/* Glassy header */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.5rem' }}>
                    By the numbers
                  </div>
                  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem,5vw,4rem)', color: 'var(--text-1)', letterSpacing: '0.02em' }}>
                    IMPACT SO FAR
                  </h2>
                </div>

                <div className="stats-grid hw-inner" style={{ width: '100%', maxWidth: '700px' }}>
                  {/* These use data-* attrs for the GSAP counter triggered onStation */}
                  {[
                    { target: 100, suffix: '+', label: 'Students Taught' },
                    { target: 10,  suffix: '+', label: 'Projects Coordinated' },
                    { target: 2,   suffix: '',  label: 'Core Courses' },
                  ].map(({ target, suffix, label }) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                      <div
                        className="stat-counter-val"
                        data-target={target}
                        data-suffix={suffix}
                        style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,5vw,4.5rem)', color: 'var(--text-1)', lineHeight: 1, letterSpacing: '-0.02em' }}
                      >
                        0{suffix}
                      </div>
                      <div style={{ marginTop: '0.4rem', color: 'var(--text-3)', fontSize: '0.6rem' }}>{label}</div>
                    </div>
                  ))}
                </div>

                {/* Ticker strip */}
                <div style={{ width: '100%', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(2,6,23,0.5)', backdropFilter: 'blur(12px)' }}>
                  <Ticker items={tickerItems} />
                </div>
              </div>
            </Panel>

            {/* ══ PANEL 3: PHILOSOPHY ══ */}
            <Panel panelRef={philRef}>
              <div className="sec-lg hw-inner" style={{ width: '100%' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: isMobile ? '2rem' : '3.5rem' }}>
                  How I Think
                </div>
                <div className="philosophy-grid">
                  {[
                    { num: '01', title: 'Teaching builds thinking',   body: "Programming instruction means teaching problem decomposition and logic, not just syntax. I prepare students for systems they haven't encountered yet.", color: 'var(--accent)' },
                    { num: '02', title: 'Projects require judgment',  body: 'Coordinating student work means evaluating feasibility and learning outcomes. Good projects teach when to simplify, when to architect, when to deliver.', color: 'var(--accent-warm)' },
                    { num: '03', title: 'Systems outlive intentions', body: 'Production work requires different decisions than prototypes. I build for the people who inherit the code and maintain the architecture.', color: 'var(--accent-cyan)' },
                  ].map((item, i) => (
                    <div key={i} className="phil-card" style={{
                      padding: isMobile ? '1.75rem 1.5rem' : '2.5rem',
                      background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(16px)',
                      borderRadius: isMobile ? '14px' : (i === 0 ? '16px 0 0 16px' : i === 2 ? '0 16px 16px 0' : '0'),
                      border: '1px solid var(--border)', position: 'relative', overflow: 'hidden', opacity: 0,
                    }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: `${item.color}10`, position: 'absolute', top: '-0.5rem', right: '1rem', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{item.num}</div>
                      <div style={{ width: '20px', height: '2px', background: item.color, marginBottom: '1.1rem', borderRadius: '1px' }} />
                      <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '0.6rem' }}>{item.title}</h3>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'var(--text-3)', lineHeight: 1.7 }}>{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            {/* ══ PANEL 4: BENTO ══ */}
            <Panel panelRef={bentoRef}>
              <div className="sec-md hw-inner" style={{ width: '100%' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-3)' }}>What I Do</span>
                  <Link to="/capabilities" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', textDecoration: 'none' }}>All Skills →</Link>
                </div>
                <div className="bento-grid">
                  {[
                    { title: 'Teaching',      items: ['C Programming', 'Python & PPS', 'First-Year Eng.', 'Algorithmic Thinking'], accent: 'var(--accent)' },
                    { title: 'Coordination',  items: ['MCA Major Projects', 'Industry Internships', 'Tech Mentorship', 'Feasibility Review'], accent: 'var(--accent-warm)' },
                    { title: 'Engineering',   items: ['React Apps', 'Firebase & Node.js', 'API Design', 'System Architecture'], accent: 'var(--accent-cyan)' },
                    { title: 'Practice',      items: ['DSA — LeetCode', 'System Design', 'Code Review', 'Documentation'], accent: 'var(--text-3)' },
                  ].map((card, i) => (
                    <div key={i} className="bento-card-item" style={{ opacity: 0 }}>
                      <BentoCard {...card} delay={0} />
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            {/* ══ PANEL 5: STACK ══ */}
            <Panel panelRef={stackRef}>
              <div className="sec-lg hw-inner" style={{ width: '100%' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: isMobile ? '2rem' : '3.5rem' }}>
                  Technical Foundation
                </div>
                <div className="stack-grid">
                  {[
                    { area: 'Languages',       skills: ['C', 'C++', 'JavaScript', 'Python', 'SQL'], color: 'var(--accent)' },
                    { area: 'Frontend',        skills: ['React', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Vite'], color: 'var(--accent-warm)' },
                    { area: 'Backend & Data',  skills: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'Firebase'], color: 'var(--accent-cyan)' },
                    { area: 'Practices',       skills: ['DSA', 'System Design', 'Code Review', 'Agile', 'OBE/NBA'], color: 'var(--text-2)' },
                  ].map((cap, i) => (
                    <div key={i} className="stack-col" style={{ borderTop: `2px solid ${cap.color}`, paddingTop: '1.25rem', opacity: 0 }}>
                      <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '0.75rem' }}>{cap.area}</div>
                      {cap.skills.map(s => (
                        <div key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)', padding: '0.18rem 0', letterSpacing: '0.04em' }}>{s}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </Panel>

            {/* ══ PANEL 6: CTA ══ */}
            <Panel panelRef={ctaRef} style={{ alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ maxWidth: '600px', textAlign: 'center', padding: '0 2rem' }}>
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.25em',
                  textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '1.5rem',
                }}>
                  Final destination
                </div>

                <div className="cta-headline" style={{ opacity: 0 }}>
                  <div style={{
                    fontFamily: 'var(--font-display)',
                    fontSize:   'clamp(2rem,6vw,4.5rem)',
                    letterSpacing: '0.02em', color: 'var(--text-1)', marginBottom: '1rem',
                    lineHeight: 0.95,
                  }}>
                    LET'S BUILD<br />
                    <span style={{ color: 'var(--accent)' }}>SOMETHING</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--text-3)', marginBottom: '2.5rem', lineHeight: 1.65 }}>
                    Open to collaboration — academic partnerships, frontend consulting, and meaningful mentorship.
                  </p>
                  <div className="cta-row" style={{ justifyContent: 'center' }}>
                    <MagneticButton href="/contact" variant="primary">Get in Touch</MagneticButton>
                    <MagneticButton href="/work"    variant="outline">See My Work</MagneticButton>
                  </div>
                </div>

                {/* Glowing ring decoration */}
                <div style={{
                  position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {[200, 320, 450].map((size, i) => (
                    <div key={i} style={{
                      position: 'absolute', width: size, height: size, borderRadius: '50%',
                      border: `1px solid rgba(129,140,248,${0.12 - i * 0.03})`,
                      animation: `float ${3 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.4}s`,
                    }} />
                  ))}
                </div>
              </div>
            </Panel>

          </div>
        </div>
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════════════════
     CLASSIC FALLBACK — mobile / prefers-reduced-motion
     Preserves original v2.1 scroll experience exactly
  ══════════════════════════════════════════════════════════════════ */
  return (
    <div style={{ background: 'var(--bg-0)', color: 'var(--text-1)' }}>
      <style>{sharedCSS}</style>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        padding: isMobile ? '6rem 0 3rem' : '8rem 0 4rem',
        position: 'relative', overflow: 'hidden',
      }}>
        <div ref={blobRef} style={{
          position: 'absolute', top: '10%', right: '-10%',
          width: isMobile ? '300px' : '500px', height: isMobile ? '300px' : '500px',
          background: 'radial-gradient(circle, rgba(129,140,248,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />
        {HeroContent}
      </section>

      {/* TICKER */}
      <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <Ticker items={tickerItems} />
      </div>

      {/* STATS */}
      <section className="sec-md">
        <div className="hw-inner">
          <motion.div className="stats-grid" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <StatCounter target={100} suffix="+" label="Students Taught" />
            <StatCounter target={10}  suffix="+" label="Projects Coordinated" />
            <StatCounter target={2}   suffix=""  label="Core Courses" />
          </motion.div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="sec-lg">
        <div className="hw-inner">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: isMobile ? '2rem' : '3.5rem' }}>How I Think</div>
          <div className="philosophy-grid">
            {[
              { num: '01', title: 'Teaching builds thinking',   body: "Programming instruction means teaching problem decomposition and logic, not just syntax. I prepare students for systems they haven't encountered yet.", color: 'var(--accent)' },
              { num: '02', title: 'Projects require judgment',  body: 'Coordinating student work means evaluating feasibility and learning outcomes. Good projects teach when to simplify, when to architect, when to deliver.', color: 'var(--accent-warm)' },
              { num: '03', title: 'Systems outlive intentions', body: 'Production work requires different decisions than prototypes. I build for the people who inherit the code and maintain the architecture.', color: 'var(--accent-cyan)' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.12 }}
                style={{ padding: isMobile ? '1.75rem 1.5rem' : '2.5rem', background: 'var(--bg-1)', borderRadius: isMobile ? '14px' : (i === 0 ? '16px 0 0 16px' : i === 2 ? '0 16px 16px 0' : '0'), border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '4rem', color: `${item.color}10`, position: 'absolute', top: '-0.5rem', right: '1rem', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>{item.num}</div>
                <div style={{ width: '20px', height: '2px', background: item.color, marginBottom: '1.1rem', borderRadius: '1px' }} />
                <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '0.6rem' }}>{item.title}</h3>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'var(--text-3)', lineHeight: 1.7 }}>{item.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO */}
      <section className="sec-md">
        <div className="hw-inner">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2rem' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-3)' }}>What I Do</span>
            <Link to="/capabilities" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--accent)', textDecoration: 'none' }}>All Skills →</Link>
          </div>
          <div className="bento-grid">
            <BentoCard title="Teaching"     items={['C Programming', 'Python & PPS', 'First-Year Eng.', 'Algorithmic Thinking']} accent="var(--accent)"      delay={0}   />
            <BentoCard title="Coordination" items={['MCA Major Projects', 'Industry Internships', 'Tech Mentorship', 'Feasibility Review']} accent="var(--accent-warm)" delay={0.1} />
            <BentoCard title="Engineering"  items={['React Apps', 'Firebase & Node.js', 'API Design', 'System Architecture']} accent="var(--accent-cyan)"  delay={0.2} />
            <BentoCard title="Practice"     items={['DSA — LeetCode', 'System Design', 'Code Review', 'Documentation']} accent="var(--text-3)"      delay={0.3} />
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="sec-lg" style={{ background: 'var(--bg-1)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(129,140,248,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative' }}>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 1.5 }}
            style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1.05rem,2.8vw,2rem)', fontWeight: 300, color: 'var(--text-1)', lineHeight: 1.6, letterSpacing: '-0.01em' }}>
            I build real-world applications, design scalable systems, and teach engineers how to think beyond code — bridging the gap between learning and production-ready software.{' '}
            <span style={{ color: 'var(--accent)' }}>Every decision is driven by constraints, trade-offs, and long-term impact.</span>
          </motion.p>
        </div>
      </section>

      {/* STACK */}
      <section className="sec-lg">
        <div className="hw-inner">
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: isMobile ? '2rem' : '3.5rem' }}>Technical Foundation</div>
          <div className="stack-grid">
            {[
              { area: 'Languages',      skills: ['C', 'C++', 'JavaScript', 'Python', 'SQL'], color: 'var(--accent)' },
              { area: 'Frontend',       skills: ['React', 'Tailwind CSS', 'GSAP', 'Framer Motion', 'Vite'], color: 'var(--accent-warm)' },
              { area: 'Backend & Data', skills: ['Node.js', 'Express', 'MongoDB', 'MySQL', 'Firebase'], color: 'var(--accent-cyan)' },
              { area: 'Practices',      skills: ['DSA', 'System Design', 'Code Review', 'Agile', 'OBE/NBA'], color: 'var(--text-2)' },
            ].map((cap, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ borderTop: `2px solid ${cap.color}`, paddingTop: '1.25rem' }}>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-1)', marginBottom: '0.75rem' }}>{cap.area}</div>
                {cap.skills.map(s => <div key={s} style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-3)', padding: '0.18rem 0', letterSpacing: '0.04em' }}>{s}</div>)}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="sec-md" style={{ borderTop: '1px solid var(--border)', textAlign: 'center' }}>
        <div style={{ maxWidth: '540px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem,5vw,3.5rem)', letterSpacing: '0.02em', color: 'var(--text-1)', marginBottom: '1rem' }}>LET'S BUILD SOMETHING</div>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.92rem', color: 'var(--text-3)', marginBottom: '2rem', lineHeight: 1.65 }}>
              Open to collaboration — academic partnerships, frontend consulting, and meaningful mentorship.
            </p>
            <div className="cta-row" style={{ justifyContent: 'center' }}>
              <MagneticButton href="/contact" variant="primary">Get in Touch</MagneticButton>
              <MagneticButton href="/work"    variant="outline">See My Work</MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;