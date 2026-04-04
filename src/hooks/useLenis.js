/**
 * useLenis.js — Fixed Smooth Scroll Hook
 *
 * FIX #5: Exposes lenis instance on window.__lenis__ so useJourneyEngine
 *         can subscribe to Lenis scroll events instead of native window.scrollY.
 *         This eliminates the scroll position lag between Lenis's virtual
 *         position and the raw DOM scroll.
 */

import { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration:        1.2,
      easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation:     'vertical',
      smoothWheel:     true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    /* FIX #5: Expose on window so useJourneyEngine can subscribe
       to the Lenis scroll event instead of native window.scrollY.
       Using 'scroll' on lenis gives the virtual (smoothed) position,
       which matches what the user actually sees on screen. */
    window.__lenis__ = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const ticker = gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
      window.__lenis__ = null;
    };
  }, []);

  return lenisRef;
}

/**
 * scrollTo — Programmatic smooth scroll
 * Usage: scrollTo('#section-work', { offset: -80 })
 */
export function scrollTo(target, options = {}) {
  if (window.__lenis__) {
    window.__lenis__.scrollTo(target, { duration: 1.4, ...options });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}