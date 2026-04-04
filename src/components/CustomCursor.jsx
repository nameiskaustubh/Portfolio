/**
 * CustomCursor.jsx — Fixed
 *
 * FIX #10: Replaced per-element event listeners (registered once on mount,
 *          missing all dynamically added links) with event delegation on
 *          document. This correctly handles links added by React after mount,
 *          route changes, lazy-loaded components, and portals.
 *
 * FIX #21 (partial): cursor:none is not applied to input/textarea via JS —
 *          fix the Global.css rule to not include those elements.
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);

  useEffect(() => {
    const dot      = dotRef.current;
    const ringEl   = ringRef.current;
    if (!dot || !ringEl) return;

    gsap.set([dot, ringEl], { xPercent: -50, yPercent: -50 });

    /* ── Mouse position (dot snaps instantly) ── */
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    };

    /* ── Smooth ring follow ── */
    const lerp = (a, b, t) => a + (b - a) * t;
    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.12);
      gsap.set(ringEl, { x: ring.current.x, y: ring.current.y });
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    /* ── FIX #10: Event delegation — catches all interactive elements,
         including those rendered after mount (route changes, lazy loads) ── */
    const isInteractive = (el) => el.closest('a, button, [data-cursor="hover"]');

    const onMouseOver = (e) => {
      if (!isInteractive(e.target)) return;
      dot.classList.add('cursor-link');
      ringEl.classList.add('cursor-link');
    };

    const onMouseOut = (e) => {
      if (!isInteractive(e.target)) return;
      dot.classList.remove('cursor-link');
      ringEl.classList.remove('cursor-link');
    };

    /* ── Visibility ── */
    const hideCursor = () => gsap.to([dot, ringEl], { opacity: 0, duration: 0.3 });
    const showCursor = () => gsap.to([dot, ringEl], { opacity: 1, duration: 0.3 });

    document.addEventListener('mouseover',  onMouseOver);
    document.addEventListener('mouseout',   onMouseOut);
    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);
    window.addEventListener('mousemove',    onMouseMove);

    return () => {
      window.removeEventListener('mousemove',    onMouseMove);
      document.removeEventListener('mouseover',  onMouseOver);
      document.removeEventListener('mouseout',   onMouseOut);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
};

export default CustomCursor;