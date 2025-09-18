import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', id: 'Home' },
    { path: '/about', label: 'About', id: 'about' },
    { path: '/skills', label: 'Skills', id: 'skills' },
    { path: '/projects', label: 'Projects', id: 'projects' },
    { path: '/leetcode', label: 'LeetCode', id: 'leetcode' },
    { path: '/Services', label: 'Services', id: 'Services' },
    { path: '/Contact', label: 'Contact', id: 'Contact' },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;
      
      if (maxScroll > 0) {
        const progress = Math.min(100, (scrollPosition / maxScroll) * 100);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location]); 

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setScrollProgress(0);
    setTimeout(() => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;
      
      if (maxScroll > 0) {
        const progress = Math.min(100, (scrollPosition / maxScroll) * 100);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    }, 100);
  }, [location]);

  return (
    <>
   
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-50/95 backdrop-blur-lg shadow-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center gap-2 hover:scale-105 transition-transform duration-200">
                <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                  <span className="text-white font-bold text-sm">KD</span>
                </div>
                <span className="text-xl font-serif text-gray-800">
                  Labs
                </span>
              </Link>
            </div>

          
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group hover:scale-105 ${
                      location.pathname === item.path
                        ? 'text-blue-600 bg-blue-50/80 shadow-sm'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-white/60'
                    }`}
                  >
                    <span>{item.label}</span>
                    {location.pathname === item.path && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full"></div>
                    )}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                ))}
              </div>
            </div>

          
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-gray-600 hover:text-blue-600 hover:bg-white/60 transition-all duration-300"
              >
                <span className="sr-only">Open main menu</span>
                <div className="relative w-6 h-6">
                  <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'
                  }`}></span>
                  <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}></span>
                  <span className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'
                  }`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

       
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/90 backdrop-blur-lg border-t border-gray-200/30">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full text-left block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:scale-[1.02] ${
                  location.pathname === item.path
                    ? 'text-blue-600 bg-blue-50/80 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50/60'
                }`}
              >
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

     
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200/40">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-blue-500 transition-all duration-150 ease-out shadow-sm"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </>
  );
};

export default Navbar;