/**
 * useJourneyEngine.js — The Master Scroll ↔ 3D Brain
 *
 * Maps raw scroll position → camera target Z → section activation.
 * Uses refs for ALL hot-path state (zero React re-renders on scroll).
 * GSAP drives HTML element animation; this hook drives the numbers.
 *
 * Architecture:
 *   scroll (0→1) → cameraTargetZ (50 → -110) → section triggers
 *   mouse (raw)  → smoothed mouse ref (lerped in rAF)
 *   velocity     → camera shake + warp intensity
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

const CAMERA_START_Z =  50;  // camera rushes from here on load
const CAMERA_END_Z   = -110;

/* ── easing helpers ── */
const lerp = (a, b, t) => a + (b - a) * t;
const easeOutCubic = (t) => 1 - Math.pow(1 - Math.max(0, Math.min(1, t)), 3);

export function useJourneyEngine() {
  /* ── Exposed refs (read from 3D components via engineRef.current) ── */
  const scrollProgress  = useRef(0);     // 0 → 1
  const cameraTargetZ   = useRef(CAMERA_START_Z);
  const cameraCurrentZ  = useRef(CAMERA_START_Z); // smooth follower
  const velocity        = useRef(0);     // scroll velocity (signed)
  const speed           = useRef(0);     // abs velocity, smoothed
  const activeStation   = useRef('hero');

  /* Mouse: raw target + smoothed output */
  const mouse = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  /* Section activation callbacks — register from UI side */
  const sectionCallbacks = useRef({});

  const onStation = useCallback((id, fn) => {
    sectionCallbacks.current[id] = fn;
  }, []);

  /* ── Section activator ── */
  const lastActive = useRef('');
  const activateStation = useCallback((id) => {
    if (lastActive.current === id) return;
    lastActive.current = id;
    activeStation.current = id;
    const fn = sectionCallbacks.current[id];
    if (fn) fn();
  }, []);

  /* ── Scroll driver ── */
  useEffect(() => {
    let lastScrollY = 0;
    let rafId = null;
    let mounted = true;

    /* Resize: recalculate total height */
    const getTotalH = () =>
      Math.max(1, document.body.scrollHeight - window.innerHeight);

    /* ── Scroll handler (raw) ── */
    const onScroll = () => {
      const raw = window.scrollY / getTotalH();
      scrollProgress.current = Math.max(0, Math.min(1, raw));

      velocity.current = (window.scrollY - lastScrollY) * 0.01;
      lastScrollY = window.scrollY;

      /* Camera Z: rush-in phase first, then journey */
      const p = scrollProgress.current;
      const RUSH_END = 0.04;

      if (p < RUSH_END) {
        // Rush from CAMERA_START_Z → 0
        cameraTargetZ.current = lerp(
          CAMERA_START_Z, 0,
          easeOutCubic(p / RUSH_END)
        );
      } else {
        // Linear journey 0 → CAMERA_END_Z
        cameraTargetZ.current = lerp(
          0, CAMERA_END_Z,
          (p - RUSH_END) / (1 - RUSH_END)
        );
      }

      /* Station trigger */
      for (let i = STATIONS.length - 1; i >= 0; i--) {
        if (p >= STATIONS[i].threshold - 0.02) {
          activateStation(STATIONS[i].id);
          break;
        }
      }
    };

    /* ── Mouse handler ── */
    const onMouseMove = (e) => {
      mouse.current.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.current.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    /* ── rAF loop: smooth mouse + smooth speed ── */
    const tick = () => {
      if (!mounted) return;
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.055;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.055;

      const absVel = Math.abs(velocity.current);
      speed.current += (absVel - speed.current) * 0.08;

      // Smooth camera Z (used by CameraRig too but we expose the target)
      cameraCurrentZ.current += (cameraTargetZ.current - cameraCurrentZ.current) * 0.06;

      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll',    onScroll,    { passive: true });
    window.addEventListener('mousemove', onMouseMove, { passive: true });
    rafId = requestAnimationFrame(tick);
    onScroll(); // init

    return () => {
      mounted = false;
      window.removeEventListener('scroll',    onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [activateStation]);

  return {
    /* refs — safe to read from R3F useFrame or GSAP tickers */
    scrollProgress,
    cameraTargetZ,
    cameraCurrentZ,
    velocity,
    speed,
    mouse,
    activeStation,
    /* helpers */
    onStation,
  };
}