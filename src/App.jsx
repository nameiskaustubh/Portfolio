import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './components/About';
import Education from './pages/Education';
import Skills from './pages/Skills';
import Projects from './pages/ProjectsSection';
import LeetCode from './pages/Leetcode';
import Services from './pages/Services';
import Contact from './pages/Contact';
import PageWrapper from './components/PageWrapper';
import GalaxyBackground from "./components/GalaxyBackground";

import './App.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
        <Route path="/education" element={<PageWrapper><Education /></PageWrapper>} />
        <Route path="/skills" element={<PageWrapper><Skills /></PageWrapper>} />
        <Route path="/projects" element={<PageWrapper><Projects /></PageWrapper>} />
        <Route path="/leetcode" element={<PageWrapper><LeetCode /></PageWrapper>} />
        <Route path="/Services" element={<PageWrapper><Services /></PageWrapper>} />
        <Route path="/Contact" element={<PageWrapper><Contact /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="App bg-gray-800 min-h-screen flex flex-col relative">
        
      <GalaxyBackground />

        <Navbar />
        
        <main className="flex-grow relative z-10">
          <AnimatedRoutes />
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
