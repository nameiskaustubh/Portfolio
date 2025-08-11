import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './components/About';

import Education from './pages/Education';
import Skills from './pages/Skills';
import Projects from './pages/ProjectsSection';
import LeetCode from './pages/Leetcode';
import Contact  from './pages/Contact';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/education" element={<Education />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/leetcode" element={<LeetCode />} />
            <Route path="/Contact" element={<Contact/>} />

            
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;