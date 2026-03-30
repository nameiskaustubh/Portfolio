/**
 * Loader
 * 
 * Cinematic intro sequence:
 * 1. Scan line sweeps across screen
 * 2. Counter counts 0 → 100
 * 3. Name + tagline appear letter by letter
 * 4. Full screen wipe reveals the site
 * 
 * Props:
 *   onComplete: () => void — called when loader exits
 */

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const Loader = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const counterRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const progressRef = useRef(null);
  const panelsRef = useRef([]);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          onComplete?.();
        },
      });

      // Phase 1: Count up 0 → 100
      const obj = { val: 0 };
      tl.to(obj, {
        val: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate() {
          const v = Math.round(obj.val);
          setCounter(v);
          if (progressRef.current) {
            progressRef.current.style.transform = `scaleX(${v / 100})`;
          }
        },
      });

      // Phase 2: Pause at 100
      tl.to({}, { duration: 0.3 });

      // Phase 3: Name reveal
      tl.fromTo(
        nameRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      );

      // Phase 4: Subtitle reveal
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
        '-=0.3'
      );

      // Phase 5: Hold
      tl.to({}, { duration: 0.6 });

      // Phase 6: Exit — panels slide up like venetian blinds
      const panels = panelsRef.current.filter(Boolean);
      tl.to(panels, {
        yPercent: -100,
        duration: 0.9,
        stagger: 0.06,
        ease: 'power4.inOut',
      });
    }, loaderRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div ref={loaderRef} id="loader" role="status" aria-label="Loading portfolio">
      {/* Scan line */}
      <div className="scan-line" />

      {/* Exit panels (venetian blind effect) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => (panelsRef.current[i] = el)}
            style={{
              flex: 1,
              background: 'var(--bg-0)',
              willChange: 'transform',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 20,
          textAlign: 'center',
          width: '100%',
          maxWidth: '600px',
          padding: '0 2rem',
        }}
      >
        {/* Counter */}
        <div
          ref={counterRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(4rem, 12vw, 9rem)',
            fontWeight: 300,
            color: 'var(--text-1)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            marginBottom: '2rem',
            opacity: 0.15,
          }}
        >
          {String(counter).padStart(3, '0')}
        </div>

        {/* Progress bar */}
        <div className="progress-bar" style={{ marginBottom: '2.5rem' }}>
          <div ref={progressRef} className="progress-bar-fill" />
        </div>

        {/* Name */}
        <div
          ref={nameRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            letterSpacing: '0.08em',
            color: 'var(--text-1)',
            opacity: 0,
          }}
        >
          KAUSTUBH DESHMUKH
        </div>

        {/* Subtitle */}
        <div
          ref={subtitleRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginTop: '0.75rem',
            opacity: 0,
          }}
        >
          Engineer • Educator • Builder
        </div>
      </div>

      {/* Corner decorations */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--text-3)',
          letterSpacing: '0.1em',
        }}
      >
        PORTFOLIO 2025
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          color: 'var(--text-3)',
          letterSpacing: '0.1em',
        }}
      >
        NASHIK, MH, IN
      </div>

      {/* Top corner bracket decorations */}
      {[
        { top: '1.5rem', left: '1.5rem', borderTop: '1px solid', borderLeft: '1px solid', width: '30px', height: '30px' },
        { top: '1.5rem', right: '1.5rem', borderTop: '1px solid', borderRight: '1px solid', width: '30px', height: '30px' },
        { bottom: '1.5rem', left: '1.5rem', borderBottom: '1px solid', borderLeft: '1px solid', width: '30px', height: '30px' },
        { bottom: '1.5rem', right: '1.5rem', borderBottom: '1px solid', borderRight: '1px solid', width: '30px', height: '30px' },
      ].map((style, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            borderColor: 'var(--border-hover)',
            pointerEvents: 'none',
            ...style,
          }}
        />
      ))}
    </div>
  );
};

export default Loader;