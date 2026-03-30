/**
 * useScrollReveal — GSAP ScrollTrigger Reveal Hook
 * 
 * Animates elements with .reveal, .reveal-left, .reveal-right,
 * .reveal-scale classes as they enter the viewport.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * useScrollReveal
 * Call once in App.jsx or per-page component after mount.
 * Registers batch reveals for performance.
 */
export function useScrollReveal() {
  useEffect(() => {
    // Batch reveals for performance
    ScrollTrigger.batch('.reveal', {
      onEnter: (els) => {
        gsap.to(els, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
        });
      },
      start: 'top 88%',
      once: true,
    });

    ScrollTrigger.batch('.reveal-left', {
      onEnter: (els) => {
        gsap.to(els, {
          opacity: 1,
          x: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
        });
      },
      start: 'top 85%',
      once: true,
    });

    ScrollTrigger.batch('.reveal-right', {
      onEnter: (els) => {
        gsap.to(els, {
          opacity: 1,
          x: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: 'power3.out',
        });
      },
      start: 'top 85%',
      once: true,
    });

    ScrollTrigger.batch('.reveal-scale', {
      onEnter: (els) => {
        gsap.to(els, {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'back.out(1.4)',
        });
      },
      start: 'top 88%',
      once: true,
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);
}

/**
 * useParallax
 * Apply parallax movement to a ref element.
 * 
 * @param {number} speed - negative = slower, positive = faster
 */
export function useParallax(speed = -0.3) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const tl = gsap.to(ref.current, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => tl.kill();
  }, [speed]);

  return ref;
}

/**
 * useSplitTextReveal
 * Splits heading text into chars and animates them in stagger.
 */
export function useSplitTextReveal(selector, options = {}) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    elements.forEach((el) => {
      const text = el.textContent;
      const chars = text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.className = 'split-char';
        span.style.opacity = '0';
        span.style.transform = 'translateY(60px) rotateX(-90deg)';
        span.style.display = 'inline-block';
        span.style.transformOrigin = 'bottom center';
        return span;
      });

      el.textContent = '';
      chars.forEach((c) => el.appendChild(c));

      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(chars, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.6,
            stagger: options.stagger || 0.025,
            ease: 'power4.out',
            delay: options.delay || 0,
          });
        },
      });
    });
  }, [selector]);
}

/**
 * useCountUp
 * Animates a number from 0 to target on scroll enter.
 */
export function useCountUp(ref, target, suffix = '') {
  useEffect(() => {
    if (!ref.current) return;

    const obj = { val: 0 };

    ScrollTrigger.create({
      trigger: ref.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 2,
          ease: 'power2.out',
          onUpdate: () => {
            ref.current.textContent = Math.round(obj.val) + suffix;
          },
        });
      },
    });
  }, [ref, target, suffix]);
}