import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Professional Excellence',
    role: 'Proven Track Record',
    text: 'Consistently delivering high-quality OdooERP solutions with attention to detail and timely project completion.',
    rating: 5,
    icon: '⭐'
  },
  {
    name: 'Technical Mastery',
    role: 'Advanced Skillset',
    text: 'Deep expertise in Python, Odoo architecture, and database design. Capable of handling complex business requirements.',
    rating: 5,
    icon: '🚀'
  },
  {
    name: 'Team Collaboration',
    role: 'Effective Communication',
    text: 'Works seamlessly with teams, mentors junior developers, and maintains clear documentation throughout projects.',
    rating: 5,
    icon: '🤝'
  },
];

export function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-24 px-4 sm:px-8 max-w-6xl mx-auto relative">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 bg-blue-100 rounded-full border border-blue-200 text-sm text-gray-600 mb-4">
            ✨ Featured By
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Highlights & Achievements
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Recognition of expertise, dedication, and commitment to excellence in software development.
          </p>
        </motion.div>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false }}
      >
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -10 }}
              className="glass-effect-lg rounded-2xl p-8 h-full border border-blue-200 hover:border-blue-300 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <span className="text-4xl">{testimonial.icon}</span>
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {testimonial.name}
              </h3>
              <p className="text-sm text-blue-600 mb-4 font-medium">
                {testimonial.role}
              </p>

              <p className="text-gray-700 leading-relaxed mb-6">
                {testimonial.text}
              </p>

              <motion.div
                className="inline-block px-4 py-2 bg-blue-100 rounded-lg text-xs text-blue-700 font-medium"
                whileHover={{ scale: 1.05 }}
              >
                Learn More →
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-16 text-center"
      >
        <div className="glass-effect rounded-2xl p-8 sm:p-12 border border-blue-200 inline-block max-w-2xl mx-auto">
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            Looking for a dedicated developer to bring your vision to life? Let's collaborate and create something extraordinary.
          </p>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)' }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-gray-900 font-semibold rounded-lg hover:shadow-soft-lg transition-all"
          >
            Let's Get Started →
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
