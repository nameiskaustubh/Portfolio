/**
 * useLenis — Smooth Scroll Hook
 * 
 * Initializes Lenis for buttery 60fps scroll.
 * Integrates with GSAP ScrollTrigger so all
 * scroll-based animations stay in sync.
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
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const ticker = gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return lenisRef;
}

/**
 * scrollTo — Programmatic smooth scroll
 * Usage: scrollTo('#section-work', { offset: -80 })
 */
export function scrollTo(target, options = {}) {
  const lenis = window.__lenis__;
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, ...options });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: 'smooth' });
  }
}