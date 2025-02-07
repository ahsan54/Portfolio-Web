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
      className="relative mb-6 overflow-hidden rounded-lg group bg-gray-900/50 backdrop-blur-sm"
      style={{ minHeight: '140px' }}
    >
      <div className="relative z-10 p-6 h-full">
        <div className="flex justify-between mb-2">
          <span className="text-lg font-medium text-white group-hover:text-blue-300 transition-colors">
            {name}
          </span>
          <span className="text-sm font-medium text-blue-300 group-hover:text-blue-200 transition-colors">
            {percentage}%
          </span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
          <motion.div
            className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-300"
            initial={{ width: 0 }}
            animate={inView ? { width: `${percentage}%` } : { width: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
