import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Navbar.css'; // Import the CSS file

const navItems = [
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [prevSection, setPrevSection] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.8)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(10px)', 'blur(20px)']
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPrevSection(activeSection);
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -80% 0px',
      }
    );

    navItems.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [activeSection]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      style={{ 
        backgroundColor,
        backdropFilter: backdropBlur,
      }}
      onMouseMove={handleMouseMove}
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 rounded-full py-3 px-6 sm:py-4 sm:px-8 shadow-2xl w-auto max-w-[95vw] overflow-hidden navbar-container"
    >
      {/* Smoky Flame Background - No boxes */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Smooth flame layers */}
        <motion.div
          className="flame-smoke-1"
          animate={{
            y: [0, -8, 0],
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="flame-smoke-2"
          animate={{
            y: [0, -12, 0],
            opacity: [0.15, 0.35, 0.15],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        />
        <motion.div
          className="flame-smoke-3"
          animate={{
            y: [0, -15, 0],
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        
        {/* Mouse follow glow - smooth circular */}
        <motion.div
          className="absolute w-24 h-24 rounded-full pointer-events-none mouse-glow"
          style={{
            left: mousePosition.x - 48,
            top: mousePosition.y - 48,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

      {/* Corner glows */}
      <div className="corner-glow-tl" />
      <div className="corner-glow-tr" />
      <div className="corner-glow-bl" />
      <div className="corner-glow-br" />

      {/* Navigation items */}
      <ul className="flex items-center gap-2 sm:gap-8 whitespace-nowrap relative z-10">
        {navItems.map(({ id, label }, index) => (
          <li key={id} className="relative">
            <motion.button
              onClick={() => scrollToSection(id)}
              className={`relative px-3 sm:px-5 py-2 sm:py-3 text-sm sm:text-base font-bold transition-all duration-300 rounded-full ${
                activeSection === id 
                  ? 'text-white nav-item-active' 
                  : 'text-gray-300 hover:text-white nav-item-hover'
              }`}
              whileHover={{ 
                scale: 1.05,
                textShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">{label}</span>
              
              {/* Active indicator */}
              {activeSection === id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full active-indicator"
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 40 
                  }}
                />
              )}
            </motion.button>
          </li>
        ))}
      </ul>

      {/* Floating particles */}
      <div className="particles-container">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="floating-particle"
            animate={{
              y: [0, -60],
              opacity: [0, 0.6, 0],
              x: [0, Math.sin(i) * 10],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "easeOut",
            }}
            style={{
              left: `${10 + i * 10}%`,
            }}
          />
        ))}
      </div>
    </motion.nav>
  );
}

