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
      transition={{ duration: 0.5, delay: index * 0.1 }} // Reduced delay between cards
      whileHover={{ scale: 1.05, rotateY: 5 }}
      className="group relative overflow-hidden rounded-xl flex flex-col" // Changed this line to flex-col
    >
      <div
        className="absolute inset-0 bg-cover bg-center z-0 transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
      <div className="relative z-20 p-6 flex flex-col justify-between min-h-[320px]"> {/* Changed justify-start to justify-between */}
        <div>
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }} // Faster animations
            className="text-2xl font-bold text-white mb-2"
          >
            {title}
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }} // Faster animations
            className="text-gray-300 mb-4"
          >
            {description}
          </motion.p>
        </div>
        {/* Fixed position for the GitHub link */}
        <motion.a
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: index * 0.1 + 0.4 }} // Faster animations
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors absolute bottom-6 left-6"
        >
          <Github className="w-5 h-5 mr-2" />
          View on GitHub
        </motion.a>
      </div>
    </motion.div>
  );
}
