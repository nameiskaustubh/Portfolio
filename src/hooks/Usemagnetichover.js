/**
 * useMagneticHover
 * 
 * Creates a magnetic pull effect on interactive elements.
 * Element follows cursor within a defined radius.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * useMagneticHover
 * @param {number} strength - 0.2–0.6 recommended
 * @param {number} radius   - activation distance in px
 */
export function useMagneticHover(strength = 0.35, radius = 80) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < radius) {
        gsap.to(el, {
          x: dx * strength,
          y: dy * strength,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };

    const onMouseLeave = () => {
      gsap.to(el, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength, radius]);

  return ref;
}

/**
 * useMagneticText
 * Each letter repels from cursor.
 */
export function useMagneticText(strength = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const chars = container.querySelectorAll('.split-char');

    const onMouseMove = (e) => {
      chars.forEach((char) => {
        const rect = char.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 60 - dist) / 60;

        gsap.to(char, {
          x: -dx * strength * force,
          y: -dy * strength * force,
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    };

    const onMouseLeave = () => {
      chars.forEach((char) => {
        gsap.to(char, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.4)',
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [strength]);

  return ref;
}