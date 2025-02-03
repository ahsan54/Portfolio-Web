import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl: string;
  image: string;
  index: number;
}

export function ProjectCard({ title, description, githubUrl, image, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, rotateY: 5 }} // Smoother hover effect
      className="group relative overflow-hidden rounded-xl flex flex-col min-h-[350px] sm:min-h-[400px] bg-gray-900/50 backdrop-blur-sm"
    >
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 z-10" />
      
      <div className="relative z-20 p-4 sm:p-6 flex flex-col flex-grow"> 
        <div className="flex-grow">
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
            className="text-xl sm:text-2xl font-bold text-white mb-2"
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

        <motion.a
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }}
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors mt-auto text-sm sm:text-base"
        >
          <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          View on GitHub
        </motion.a>
      </div>
    </motion.div>
  );
}
