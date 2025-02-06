import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

const navItems = [
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState('');
  const [prevSection, setPrevSection] = useState('');
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(2, 6, 23, 0)', 'rgba(2, 6, 23, 0.95)']
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
      style={{ backgroundColor }}
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 rounded-full py-2 px-3 sm:py-3 sm:px-6 shadow-xl shadow-blue-900/20 backdrop-blur-sm border border-white/10 w-auto max-w-[95vw] overflow-x-auto"
    >
      <ul className="flex items-center gap-2 sm:gap-8 whitespace-nowrap">
        {navItems.map(({ id, label }) => (
          <li key={id} className="relative">
            <button
              onClick={() => scrollToSection(id)}
              className={`relative px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-base font-medium transition-colors duration-200 ${
                activeSection === id 
                  ? 'text-blue-400' 
                  : 'text-white hover:text-blue-300'
              }`}
            >
              {label}
              {activeSection === id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600"
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 40 
                  }}
                >
                  <motion.div
                    className="absolute inset-0 bg-blue-400"
                    initial={{ x: prevSection > id ? "100%" : "-100%" }}
                    animate={{ x: "0%" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{
                      boxShadow: "0 0 10px #60A5FA, 0 0 20px #60A5FA, 0 0 30px #60A5FA",
                    }}
                  />
                </motion.div>
              )}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}
