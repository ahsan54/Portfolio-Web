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
      className="mb-6 bg-white/10 p-6 rounded-lg backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex justify-between mb-2">
        <span className="text-lg font-medium text-white">{name}</span>
        <span className="text-sm font-medium text-blue-300">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3">
        <motion.div
          className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-300"
          initial={{ width: 0 }}
          animate={inView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}