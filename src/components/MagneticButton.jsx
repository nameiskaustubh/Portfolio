/**
 * MagneticButton
 * 
 * A button that elastically follows the cursor within its radius.
 * Pass variant="primary" | "outline" | "ghost"
 */

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

const MagneticButton = ({
  children,
  href,
  onClick,
  variant = 'outline',
  className = '',
  strength = 0.35,
  radius = 90,
  target,
  rel,
  ...props
}) => {
  const wrapRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const text = textRef.current;
    if (!wrap) return;

    const onMouseMove = (e) => {
      const rect = wrap.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        gsap.to(wrap, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.4,
          ease: 'power2.out',
        });
        gsap.to(text, {
          x: dx * strength * 0.5,
          y: dy * strength * 0.5,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to([wrap, text], {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.35)',
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    wrap.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      wrap.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength, radius]);

  const baseStyle = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.875rem 2rem',
    borderRadius: '100px',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    willChange: 'transform',
    overflow: 'hidden',
    transition: 'background 0.3s ease, color 0.3s ease',
    cursor: 'none',
  };

  const variants = {
    primary: {
      background: 'var(--text-1)',
      color: 'var(--bg-0)',
      border: 'none',
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-1)',
      border: '1px solid var(--border-hover)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-2)',
      border: 'none',
      padding: '0.5rem 1rem',
    },
    accent: {
      background: 'var(--accent)',
      color: 'var(--bg-0)',
      border: 'none',
    },
  };

  const style = { ...baseStyle, ...variants[variant] };

  const content = (
    <>
      {/* Hover fill effect */}
      {variant !== 'ghost' && (
        <span
          style={{
            position: 'absolute',
            inset: 0,
            background: variant === 'primary' ? 'var(--accent)' : 'var(--bg-glass)',
            transform: 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
            borderRadius: 'inherit',
          }}
          className="btn-fill"
        />
      )}
      <span ref={textRef} style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </span>

      <style>{`
        .mag-btn:hover .btn-fill { transform: scaleX(1) !important; }
        .mag-btn:hover { color: ${variant === 'outline' ? 'var(--text-1)' : 'var(--bg-0)'} !important; }
      `}</style>
    </>
  );

  if (href) {
    return (
      <a
        ref={wrapRef}
        href={href}
        target={target}
        rel={rel}
        style={style}
        className={`mag-btn magnetic-btn ${className}`}
        data-magnetic
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={wrapRef}
      onClick={onClick}
      style={style}
      className={`mag-btn magnetic-btn ${className}`}
      data-magnetic
      {...props}
    >
      {content}
    </button>
  );
};

export default MagneticButton;