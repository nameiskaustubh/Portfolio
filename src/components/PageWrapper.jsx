/**
 * PageWrapper
 * Used per-page for consistent fade-in/up transitions.
 * App.jsx also handles route-level transitions —
 * use this for sub-section stagger if needed.
 */

import { motion } from 'framer-motion';

const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 24, filter: 'blur(2px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    exit={{ opacity: 0, y: -24, filter: 'blur(2px)' }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    style={{ width: '100%' }}
  >
    {children}
  </motion.div>
);

export default PageWrapper;