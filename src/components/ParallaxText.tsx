import { motion } from "framer-motion";

interface ParallaxProps {
  children: string;
  baseVelocity?: number;
}

export function ParallaxText({ children }: ParallaxProps) {
  return (
    <div className="overflow-hidden m-0 whitespace-nowrap">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-6xl font-bold text-white tracking-tight text-center"
      >
        {children}
      </motion.div>
    </div>
  );
}
