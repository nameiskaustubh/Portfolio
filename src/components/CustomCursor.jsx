/**
 * CustomCursor
 * 
 * - Dot: snaps instantly to mouse (mix-blend-mode: difference)
 * - Ring: lags behind with elastic easing (magnetic pull feel)
 * - States: default | hover | link | text
 */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  // Smoothed position
  const mouse = useRef({ x: 0, y: 0 });
  const ring  = useRef({ x: 0, y: 0 });
  const raf   = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Initial position off-screen
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50 });

    /* ---- Mouse tracking ---- */
    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Dot is instant
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    };

    /* ---- Smooth ring follow ---- */
    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current?.x || 0, mouse.current.x, 0.12);
      ring.current.y = lerp(ring.current?.y || 0, mouse.current.y, 0.12);
      gsap.set(ringRef.current, { 
        x: ring.current.x, 
        y: ring.current.y 
      });
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    /* ---- State changes ---- */
    const addHover = () => {
      dot.classList.add('cursor-hover');
      ringRef.current.classList.add('cursor-hover');
    };
    const removeHover = () => {
      dot.classList.remove('cursor-hover');
      ringRef.current.classList.remove('cursor-hover');
    };
    const addLink = () => {
      dot.classList.add('cursor-link');
      ringRef.current.classList.add('cursor-link');
    };
    const removeLink = () => {
      dot.classList.remove('cursor-link');
      ringRef.current.classList.remove('cursor-link');
    };

    // Interactive element queries
    const links    = document.querySelectorAll('a, button');
    const hovers   = document.querySelectorAll('[data-cursor="hover"]');
    const magnets  = document.querySelectorAll('[data-magnetic]');

    links.forEach((el) => {
      el.addEventListener('mouseenter', addLink);
      el.addEventListener('mouseleave', removeLink);
    });

    hovers.forEach((el) => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', removeHover);
    });

    /* ---- Hide on leave / show on enter ---- */
    const hideCursor = () => gsap.to([dot, ringRef.current], { opacity: 0, duration: 0.3 });
    const showCursor = () => gsap.to([dot, ringRef.current], { opacity: 1, duration: 0.3 });

    document.addEventListener('mouseleave', hideCursor);
    document.addEventListener('mouseenter', showCursor);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', hideCursor);
      document.removeEventListener('mouseenter', showCursor);
      cancelAnimationFrame(raf.current);
      links.forEach((el) => {
        el.removeEventListener('mouseenter', addLink);
        el.removeEventListener('mouseleave', removeLink);
      });
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