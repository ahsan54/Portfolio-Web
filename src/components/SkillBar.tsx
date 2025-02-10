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
      initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : { x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="relative mb-6 overflow-hidden rounded-lg group glass-effect hover-card animated-border"
      style={{ minHeight: '140px' }}
    >
      <div className="absolute inset-0 animated-bg opacity-50"></div>
      <div className="relative z-10 p-6 h-full">
        <div className="flex justify-between mb-2">
          <motion.span 
            className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors glow-text"
            whileHover={{
              scale: 1.05,
              textShadow: "0 0 8px rgba(96, 165, 250, 0.8)"
            }}
          >
            {name}
          </motion.span>
          <motion.span 
            className="text-sm font-medium text-blue-300 group-hover:text-blue-200 transition-colors"
            whileHover={{ scale: 1.1 }}
          >
            {percentage}%
          </motion.span>
        </div>
        
        <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden skill-progress">
          <motion.div
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300"
            initial={{ width: 0 }}
            animate={inView ? { width: `${percentage}%` } : { width: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              boxShadow: '0 0 20px rgba(96, 165, 250, 0.5)',
            }}
          />
        </div>

        <motion.div 
          className="mt-4 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
