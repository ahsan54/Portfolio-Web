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
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height + padding
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
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 rounded-full py-3 px-6 shadow-xl shadow-blue-900/20 backdrop-blur-sm border border-white/10 w-auto min-w-[500px]"
    >
      <ul className="flex justify-between items-center gap-8">
        {navItems.map(({ id, label }) => (
          <li key={id} className="relative">
            <button
              onClick={() => scrollToSection(id)}
              className={`relative px-4 py-2 text-base font-medium transition-colors duration-200 ${
                activeSection === id 
                  ? 'text-blue-400' 
                  : 'text-white hover:text-blue-300'
              }`}
            >
              {label}
              {activeSection === id && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-400"
                  transition={{ 
                    type: "spring", 
                    stiffness: 400, 
                    damping: 40 
                  }}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}