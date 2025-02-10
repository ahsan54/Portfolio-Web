import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl: string;
  image: string; // Local import for background image
  index: number;
}

export function ProjectCard({ title, description, githubUrl, image, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, rotateY: 5 }} 
      className="group relative overflow-hidden rounded-xl flex flex-col min-h-[350px] sm:min-h-[400px] glass-effect hover-card"
    >
      {/* Background Image from Local Import */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
        whileHover={{ scale: 1.1 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 z-10 opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative z-20 p-4 sm:p-6 flex flex-col flex-grow"> 
        <div className="flex-grow">
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
            className="text-xl sm:text-2xl font-bold text-white mb-2 glow-text transition-all duration-300"
          >
            {title}
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
            className="text-gray-300 text-sm sm:text-base mb-4 line-clamp-6 sm:line-clamp-4"
          >
            {description}
          </motion.p>
        </div>

        {/* GitHub Link Button */}
        <motion.a
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
          whileHover={{ 
            scale: 1.05,
            color: "#60A5FA",
            textShadow: "0 0 15px rgb(147, 197, 253)",
          }}
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-auto text-sm sm:text-base animated-border"
        >
          <motion.div
            whileHover={{
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 },
            }}
            className="floating"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-transform duration-300 hover:scale-110" />
          </motion.div>
          View on GitHub
        </motion.a>
      </div>

      {/* Particle effects */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="particle absolute w-1 h-1 bg-blue-400 rounded-full opacity-75"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 4 + 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </motion.div>
  );
}
