import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  label: string;
  suffix?: string;
}

export function AnimatedCounter({
  from,
  to,
  duration = 2,
  label,
  suffix = ''
}: AnimatedCounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (inView && !started) {
      setStarted(true);
      const controls = new AbortController();
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);
        count.set(from + (to - from) * progress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
      return () => controls.abort();
    }
  }, [inView, started, count, from, to, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="text-center"
    >
      <motion.div className="text-3xl sm:text-4xl font-bold text-blue-600">
        <motion.span>{rounded}</motion.span>
        <span>{suffix}</span>
      </motion.div>
      <p className="text-gray-600 mt-2 text-sm sm:text-base">{label}</p>
    </motion.div>
  );
}
