/**
 * App.jsx — Root Application
 * 
 * Orchestrates:
 *  - Loader (cinematic intro, shown once)
 *  - CustomCursor (global magnetic cursor)
 *  - Lenis (smooth scroll)
 *  - Navbar + Footer
 *  - Framer Motion page transitions
 *  - GSAP scroll reveals (global .reveal class batch)
 * 
 * ROUTE NAMING FIX:
 *  All routes are lowercase to match Navbar links.
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import Navbar       from './components/Navbar';
import Footer       from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Loader       from './components/Loader';

import Home                   from './pages/Home';
import Capabilities           from './pages/Capabilities';
import DSA                    from './pages/DSA';
import Work                   from './pages/Work';
import Teaching               from './pages/Teaching';
import ProfessionalEngagements from './pages/ProfessionalEngagements';
import Contact                from './pages/Contact';

import { useLenis } from './hooks/useLenis';
import './styles/Global.css';

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   Page transition variants
   ============================================================ */
const pageVariants = {
  initial: { opacity: 0, y: 20, filter: 'blur(4px)' },
  enter:   { opacity: 1, y: 0,  filter: 'blur(0px)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, y: -20, filter: 'blur(4px)',
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] } },
};

/* ============================================================
   Animated routes
   ============================================================ */
function AnimatedRoutes() {
  const location = useLocation();

  // Re-register scroll reveals after route change
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        style={{ width: '100%' }}
      >
        <Routes location={location}>
          <Route path="/"                       element={<Home />} />
          <Route path="/work"                   element={<Work />} />
          <Route path="/teaching"               element={<Teaching />} />
          <Route path="/capabilities"           element={<Capabilities />} />
          <Route path="/dsa"                    element={<DSA />} />
          <Route path="/professionalengagements" element={<ProfessionalEngagements />} />
          <Route path="/contact"                element={<Contact />} />
          {/* Redirect old capitalized routes for backwards compat */}
          <Route path="/Work"                   element={<Work />} />
          <Route path="/Teaching"               element={<Teaching />} />
          <Route path="/Capabilities"           element={<Capabilities />} />
          <Route path="/DSA"                    element={<DSA />} />
          <Route path="/ProfessionalEngagements" element={<ProfessionalEngagements />} />
          <Route path="/Contact"                element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

/* ============================================================
   App shell with Lenis
   ============================================================ */
function AppShell() {
  useLenis(); // Initialize smooth scroll

  return (
    <div
      style={{
        background: 'var(--bg-0)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  );
}

/* ============================================================
   Root
   ============================================================ */
function App() {
  const [loaded, setLoaded] = useState(false);

  // Check sessionStorage so loader only plays once per session
  const [showLoader, setShowLoader] = useState(() => {
    return !sessionStorage.getItem('portfolio_loaded');
  });

  const handleLoaderComplete = () => {
    sessionStorage.setItem('portfolio_loaded', 'true');
    setShowLoader(false);
    setLoaded(true);
  };

  return (
    <Router>
      {/* Custom cursor — global */}
      <CustomCursor />

      {/* Cinematic loader — first visit only */}
      <AnimatePresence>
        {showLoader && (
          <Loader onComplete={handleLoaderComplete} />
        )}
      </AnimatePresence>

      {/* Main site — fades in after loader */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded || !showLoader ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {(!showLoader || loaded) && <AppShell />}
      </motion.div>
    </Router>
  );
}

export default App;