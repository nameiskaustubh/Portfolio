/**
 * Navbar — Floating Morphing Navigation
 * 
 * - Floats as a pill in the center on scroll
 * - Expands to full-width header at top
 * - Active link indicator slides under items
 * - Magnetic links
 * - Mobile: fullscreen overlay with stagger reveal
 */

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import gsap from 'gsap';

const navItems = [
  { path: '/',                       label: 'Home',        short: 'H' },
  { path: '/work',                   label: 'Work',        short: 'W' },
  { path: '/teaching',               label: 'Teaching',    short: 'T' },
  { path: '/capabilities',           label: 'Skills',      short: 'S' },
  { path: '/dsa',                    label: 'DSA',         short: 'D' },
  { path: '/professionalengagements', label: 'Engagements', short: 'E' },
  { path: '/contact',                label: 'Contact',     short: 'C' },
];

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location                    = useLocation();
  const navRef                      = useRef(null);
  const mobileRef                   = useRef(null);
  const mobileItemsRef              = useRef([]);

  /* ---- Scroll detection ---- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ---- Close mobile on route change ---- */
  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  /* ---- Mobile menu animation ---- */
  useEffect(() => {
    const overlay = mobileRef.current;
    const items   = mobileItemsRef.current.filter(Boolean);

    if (mobileOpen) {
      gsap.to(overlay, {
        clipPath: 'circle(150% at 95% 5%)',
        duration: 0.8,
        ease: 'power4.inOut',
      });
      gsap.fromTo(
        items,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.5, stagger: 0.07, ease: 'power3.out', delay: 0.3 }
      );
    } else {
      gsap.to(overlay, {
        clipPath: 'circle(0% at 95% 5%)',
        duration: 0.7,
        ease: 'power4.inOut',
      });
    }
  }, [mobileOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.toLowerCase().startsWith(path.toLowerCase());
  };

  return (
    <>
      {/* ========== DESKTOP NAVBAR ========== */}
      <nav
        ref={navRef}
        style={{
          position: 'fixed',
          top: scrolled ? '1rem' : '0',
          left: scrolled ? '50%' : '0',
          transform: scrolled ? 'translateX(-50%)' : 'none',
          width: scrolled ? 'auto' : '100%',
          zIndex: 1000,
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: scrolled ? '0' : '0',
            justifyContent: scrolled ? 'center' : 'space-between',
            padding: scrolled ? '0.6rem 1.2rem' : '1.2rem 2.5rem',
            background: scrolled
              ? 'rgba(8, 8, 15, 0.85)'
              : 'transparent',
            backdropFilter: scrolled ? 'blur(20px)' : 'none',
            border: scrolled ? '1px solid rgba(255,255,255,0.08)' : 'none',
            borderRadius: scrolled ? '100px' : '0',
            transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* Brand — hidden when pill mode */}
          {!scrolled && (
            <Link
              to="/"
              style={{
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.4rem',
                  letterSpacing: '0.06em',
                  color: 'var(--text-1)',
                }}
              >
                KD
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'var(--text-3)',
                }}
              >
                Portfolio
              </span>
            </Link>
          )}

          {/* Nav Links */}
          <div
            className="hidden md:flex"
            style={{
              alignItems: 'center',
              gap: scrolled ? '0.25rem' : '0.5rem',
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  position: 'relative',
                  padding: scrolled ? '0.4rem 0.8rem' : '0.5rem 1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: isActive(item.path) ? 'var(--text-1)' : 'var(--text-3)',
                  borderRadius: '100px',
                  background: isActive(item.path) && scrolled
                    ? 'rgba(255,255,255,0.08)'
                    : 'transparent',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  if (!isActive(item.path))
                    e.currentTarget.style.color = 'var(--text-1)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive(item.path))
                    e.currentTarget.style.color = 'var(--text-3)';
                }}
              >
                {scrolled ? item.short : item.label}

                {/* Underline active indicator */}
                {isActive(item.path) && !scrolled && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Resume CTA — desktop only, non-pill */}
          {!scrolled && (
            <a
              href="/assets/Kaustubh_Deshmukh_Resume1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex"
              style={{
                padding: '0.5rem 1.2rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                color: 'var(--bg-0)',
                background: 'var(--text-1)',
                borderRadius: '100px',
                transition: 'background 0.3s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--accent)';
                e.currentTarget.style.transform = 'scale(1.04)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--text-1)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Résumé
            </a>
          )}

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden"
            aria-label="Toggle menu"
            style={{
              background: 'none',
              border: 'none',
              padding: '0.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              zIndex: 1001,
              position: 'relative',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: 'block',
                  width: i === 1 ? '18px' : '24px',
                  height: '1.5px',
                  background: 'var(--text-1)',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transformOrigin: 'center',
                  transform: mobileOpen
                    ? i === 0 ? 'rotate(45deg) translate(4px, 5px)'
                    : i === 1 ? 'scaleX(0)'
                    : 'rotate(-45deg) translate(4px, -5px)'
                    : 'none',
                }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* ========== MOBILE FULLSCREEN OVERLAY ========== */}
      <div
        ref={mobileRef}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--bg-1)',
          zIndex: 999,
          clipPath: 'circle(0% at 95% 5%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '2rem 3rem',
        }}
      >
        {/* Gradient blob */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            right: '-20%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(129,140,248,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ marginBottom: '3rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-3)',
            }}
          >
            Navigation
          </span>
        </div>

        <nav>
          {navItems.map((item, i) => (
            <Link
              key={item.path}
              to={item.path}
              ref={(el) => (mobileItemsRef.current[i] = el)}
              style={{
                display: 'block',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.5rem, 10vw, 4rem)',
                letterSpacing: '0.04em',
                textDecoration: 'none',
                color: isActive(item.path) ? 'var(--accent)' : 'var(--text-2)',
                marginBottom: '0.5rem',
                opacity: 0,
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-1)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = isActive(item.path) ? 'var(--accent)' : 'var(--text-2)')}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          style={{
            marginTop: '3rem',
            display: 'flex',
            gap: '1.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {[
            { label: 'GitHub', href: 'https://github.com/nameiskaustubh' },
            { label: 'LinkedIn', href: 'https://linkedin.com/in/kaustubh-deshmukh8851' },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'var(--text-3)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-1)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-3)')}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navbar;