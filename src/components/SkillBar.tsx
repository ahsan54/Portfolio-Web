import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface SkillBarProps {
  name: string;
  percentage: number;
  index: number;
}

export function SkillBar({ name, percentage, index }: SkillBarProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0, y: 0, x: 0 }} // Start from center, scaled down
      animate={inView ? { scale: 1, y: -50 * (index % 2 === 0 ? 1 : -1), x: 50 * (index % 2 === 0 ? 1 : -1) } : { scale: 0, y: 0, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: 'easeOut' }}
      whileHover={{
        scale: 1.1,
        boxShadow: '0 20px 40px 0px rgba(0, 0, 0, 0.4)',
        rotate: 2,
        transition: { duration: 0.5, ease: 'easeInOut' },
      }}
      className="relative mb-6 overflow-hidden rounded-lg group glass-effect hover-card animated-border"
      style={{ minHeight: '140px' }}
    >
      <div className="absolute inset-0 animated_bg opacity-50"></div>
      <div className="relative z-10 p-6 h-full flex flex-col justify-center">
        <div className="flex justify-between mb-2">
          <motion.h3 
            className="text-2xl font-semibold text-white group-hover:text-blue-300 transition-colors glow-text"
            whileHover={{
              scale: 1.1,
              textShadow: "0 0 15px rgba(96, 165, 250, 1), 0 0 30px rgba(96, 165, 250, 0.9)",
              rotate: 2,
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
          >
            {name}
          </motion.h3>
          <motion.span 
            className="text-base font-medium text-blue-300 group-hover:text-blue-200 transition-colors"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{
              scale: 1.2,
              textShadow: "0 0 10px rgba(147, 197, 253, 0.8)",
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
          >
            {percentage}%
          </motion.span>
        </div>
        
        <div className="w-full bg-gray-700/50 rounded-full h-5 overflow-hidden skill-progress">
          <motion.div
            className="h-5 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300"
            initial={{ width: 0 }}
            animate={inView ? { width: `${percentage}%` } : { width: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              boxShadow: '0 0 20px rgba(96, 165, 250, 0.5)',
            }}
            whileHover={{
              scaleX: 1.1,
              boxShadow: '0 0 40px rgba(96, 165, 250, 0.9)',
              rotate: 1,
              transition: { duration: 0.5, ease: 'easeInOut' },
            }}
          />
        </div>

        <motion.div 
          className="mt-4 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{
            scale: 1.05,
            color: '#a0aec0',
            transition: { duration: 0.5, ease: 'easeInOut' },
          }}
        >
          {/* Skill description goes here */}
        </motion.div>
      </div>
    </motion.div>
  );
}
