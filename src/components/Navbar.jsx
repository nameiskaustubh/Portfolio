import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const location = useLocation();

  const navItems = [
    { path: '/about', label: 'About', id: 'about' },
    { path: '/education', label: 'Education', id: 'education' },
    { path: '/skills', label: 'Skills', id: 'skills' },
    { path: '/projects', label: 'Projects', id: 'projects' },
    { path: '/leetcode', label: 'LeetCode', id: 'leetcode' },
    { path: '/Contact', label: 'Contact', id: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;
      
      setIsScrolled(scrollPosition > 50);
      
      // Calculate scroll progress
      if (maxScroll > 0) {
        const progress = Math.min(100, (scrollPosition / maxScroll) * 100);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    // Initial calculation
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [location]); // Re-run when location changes

  useEffect(() => {
    setIsMobileMenuOpen(false);
    // Reset scroll progress when navigating to a new page
    setScrollProgress(0);
    // Recalculate after a short delay to allow page content to load
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
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-lg border-b border-gray-200/20 dark:border-gray-700/20' 
          : 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
  <Link to="/" className="flex items-center gap-2">
    <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
      <span className="text-white font-bold text-sm">KD</span>
    </div>
    <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">
      Portfolio
    </span>
  </Link>
</div>


            <div className="hidden md:block animate-in slide-in-from-top duration-700 delay-200">
              <div className="ml-10 flex items-baseline space-x-1">
                {navItems.map((item, index) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`relative px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 group hover:scale-105 ${
                      location.pathname === item.path
                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                        : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <span className="flex items-center space-x-2">
                      <span>{item.label}</span>
                    </span>
                    
                    {location.pathname === item.path && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gradient-to-r from-blue-500 to-blue-500 rounded-full animate-pulse"></div>
                    )}
                    
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:hidden animate-in slide-in-from-right duration-700">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all duration-300"
                aria-expanded="false"
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
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg border-t border-gray-200/20 dark:border-gray-700/20">
            {navItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                className={`w-full text-left block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 hover:scale-[1.02] ${
                  location.pathname === item.path
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                }`}
                style={{ 
                  animationDelay: `${index * 50}ms`,
                  transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)'
                }}
              >
                <span className="flex items-center space-x-3">
                  <span>{item.label}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Fixed Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200/20 dark:bg-gray-700/20">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-sky-500 transition-all duration-150 ease-out"
          style={{
            width: `${scrollProgress}%`
          }}
        ></div>
      </div>
    </>
  );
};

export default Navbar;