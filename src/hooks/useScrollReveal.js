/**
 * useScrollReveal.js — Fixed GSAP ScrollTrigger Reveal Hook
 *
 * FIX #11: Cleanup now only kills triggers created by THIS hook invocation.
 *          Previously `ScrollTrigger.getAll().forEach(t => t.kill())` was
 *          destroying triggers registered by other components (Teaching.jsx
 *          timeline, Capabilities.jsx bars), causing them to break on unmount.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal() {
  useEffect(() => {
    // FIX #11: Collect only the triggers THIS hook creates
    const triggers = [];

    const batches = [
      {
        selector: '.reveal',
        vars: { opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out' },
        start: 'top 88%',
      },
      {
        selector: '.reveal-left',
        vars: { opacity: 1, x: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' },
        start: 'top 85%',
      },
      {
        selector: '.reveal-right',
        vars: { opacity: 1, x: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out' },
        start: 'top 85%',
      },
      {
        selector: '.reveal-scale',
        vars: { opacity: 1, scale: 1, duration: 0.7, stagger: 0.06, ease: 'back.out(1.4)' },
        start: 'top 88%',
      },
    ];

    batches.forEach(({ selector, vars, start }) => {
      // ScrollTrigger.batch returns an array of ScrollTrigger instances
      const batch = ScrollTrigger.batch(selector, {
        onEnter: (els) => gsap.to(els, vars),
        start,
        once: true,
      });
      triggers.push(...batch);
    });

    // FIX #11: Kill ONLY our triggers, not everything on the page
    return () => triggers.forEach((t) => t.kill());
  }, []);
}

/**
 * useParallax
 */
export function useParallax(speed = -0.3) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const trigger = gsap.to(ref.current, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start:   'top bottom',
        end:     'bottom top',
        scrub:   true,
      },
    });

    return () => trigger.kill();
  }, [speed]);

  return ref;
}

/**
 * useSplitTextReveal
 */
export function useSplitTextReveal(selector, options = {}) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    const triggers = [];

    elements.forEach((el) => {
      const text  = el.textContent;
      const chars = text.split('').map((char) => {
        const span = document.createElement('span');
        span.textContent  = char === ' ' ? '\u00A0' : char;
        span.className    = 'split-char';
        span.style.cssText = 'opacity:0;transform:translateY(60px) rotateX(-90deg);display:inline-block;transform-origin:bottom center;';
        return span;
      });

      el.textContent = '';
      chars.forEach((c) => el.appendChild(c));

      const t = ScrollTrigger.create({
        trigger: el,
        start:   'top 85%',
        once:    true,
        onEnter: () => {
          gsap.to(chars, {
            opacity:  1,
            y:        0,
            rotateX:  0,
            duration: 0.6,
            stagger:  options.stagger ?? 0.025,
            ease:     'power4.out',
            delay:    options.delay ?? 0,
          });
        },
      });
      triggers.push(t);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [selector]);
}

/**
 * useCountUp
 */
export function useCountUp(ref, target, suffix = '') {
  useEffect(() => {
    if (!ref.current) return;

    const obj = { val: 0 };

    const trigger = ScrollTrigger.create({
      trigger: ref.current,
      start:   'top 80%',
      once:    true,
      onEnter: () => {
        gsap.to(obj, {
          val:      target,
          duration: 2,
          ease:     'power2.out',
          onUpdate: () => {
            if (ref.current) ref.current.textContent = Math.round(obj.val) + suffix;
          },
        });
      },
    });

    return () => trigger.kill();
  }, [ref, target, suffix]);
}