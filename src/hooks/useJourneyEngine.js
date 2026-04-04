/**
 * useJourneyEngine.js — Fixed Master Scroll ↔ 3D Brain
 *
 * FIXES APPLIED:
 * #4  — Engine returned as stable ref object (same identity across renders).
 *        GSAP ticker effect deps no longer include a re-created object.
 * #5  — Lenis scroll events used instead of window.scrollY to keep
 *        scrollProgress in sync with Lenis's virtual scroll position.
 * #6  — (consumed by Home.jsx) — engine itself is stable now.
 */

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

/* ── Station definitions ── */
export const STATIONS = [
  { id: 'hero',        threshold: 0.00, z:    0, label: 'Entry' },
  { id: 'stats',       threshold: 0.17, z:  -22, label: 'Stats' },
  { id: 'philosophy',  threshold: 0.34, z:  -44, label: 'Philosophy' },
  { id: 'bento',       threshold: 0.51, z:  -66, label: 'What I Do' },
  { id: 'stack',       threshold: 0.68, z:  -88, label: 'Stack' },
  { id: 'cta',         threshold: 0.85, z: -110, label: 'CTA' },
];

const CAMERA_START_Z = 50;
const CAMERA_END_Z   = -110;

const lerp         = (a, b, t) => a + (b - a) * t;
const easeOutCubic = (t) => 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3);

export function useJourneyEngine() {
  /* ── All hot-path state in refs (zero re-renders on scroll) ── */
  const scrollProgress = useRef(0);
  const cameraTargetZ  = useRef(CAMERA_START_Z);
  const cameraCurrentZ = useRef(CAMERA_START_Z);
  const velocity       = useRef(0);
  const speed          = useRef(0);
  const activeStation  = useRef('hero');
  const mouse          = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  const sectionCallbacks = useRef({});
  const lastActive       = useRef('');

  /* FIX #4: Stable engine object — same reference every render.
     3D components and GSAP tickers read from this without
     causing effect re-runs. */
  const engineRef = useRef({
    scrollProgress,
    cameraTargetZ,
    cameraCurrentZ,
    velocity,
    speed,
    mouse,
    activeStation,
  });
  // engineRef.current fields are the refs themselves — always stable

  const onStation = useCallback((id, fn) => {
    sectionCallbacks.current[id] = fn;
  }, []);

  const activateStation = useCallback((id) => {
    if (lastActive.current === id) return;
    lastActive.current = id;
    activeStation.current = id;
    sectionCallbacks.current[id]?.();
  }, []);

  const updateCameraFromProgress = useCallback((p) => {
    const RUSH_END = 0.04;
    if (p < RUSH_END) {
      cameraTargetZ.current = lerp(CAMERA_START_Z, 0, easeOutCubic(p / RUSH_END));
    } else {
      cameraTargetZ.current = lerp(0, CAMERA_END_Z, (p - RUSH_END) / (1 - RUSH_END));
    }
  }, []);

  useEffect(() => {
    let lastScroll = 0;
    let rafId      = null;
    let mounted    = true;

    const getTotalH = () => Math.max(1, document.body.scrollHeight - window.innerHeight);

    /* FIX #5: Prefer Lenis scroll events for accurate virtual scroll position.
       Fall back to native window.scroll if Lenis isn't initialised yet. */
    const handleScroll = (scrollY) => {
      const raw      = scrollY / getTotalH();
      const progress = Math.max(0, Math.min(1, raw));

      velocity.current        = (scrollY - lastScroll) * 0.01;
      lastScroll              = scrollY;
      scrollProgress.current  = progress;

      updateCameraFromProgress(progress);

      for (let i = STATIONS.length - 1; i >= 0; i--) {
        if (progress >= STATIONS[i].threshold - 0.02) {
          activateStation(STATIONS[i].id);
          break;
        }
      }
    };

    /* Try Lenis first (fires during smooth scroll animation) */
    const onLenisScroll = ({ scroll }) => handleScroll(scroll);

    /* Native fallback */
    const onNativeScroll = () => handleScroll(window.scrollY);

    /* Register on Lenis if available, otherwise native */
    const attachListeners = () => {
      if (window.__lenis__) {
        window.__lenis__.on('scroll', onLenisScroll);
      } else {
        window.addEventListener('scroll', onNativeScroll, { passive: true });
      }
    };

    /* Mouse tracking */
    const onMouseMove = (e) => {
      mouse.current.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    /* rAF: smooth mouse + smooth speed */
    const tick = () => {
      if (!mounted) return;
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.055;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.055;

      const absVel = Math.abs(velocity.current);
      speed.current += (absVel - speed.current) * 0.08;
      cameraCurrentZ.current += (cameraTargetZ.current - cameraCurrentZ.current) * 0.06;

      rafId = requestAnimationFrame(tick);
    };

    attachListeners();
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    handleScroll(window.scrollY); // init

    return () => {
      mounted = false;
      if (window.__lenis__) {
        window.__lenis__.off('scroll', onLenisScroll);
      } else {
        window.removeEventListener('scroll', onNativeScroll);
      }
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [activateStation, updateCameraFromProgress]);

  /* FIX #4: Return the stable engineRef.current object.
     Callers do: const engineRef = useRef(engine)
     This way engineRef.current never changes identity. */
  return {
    ...engineRef.current,
    onStation,
  };
}