import { motion } from 'framer-motion';

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="glass-effect-lg rounded-2xl p-8 sm:p-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-gray-900">
              About Me
            </h2>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                I'm a passionate <span className="text-blue-600 font-semibold">Python Developer</span> specializing in <span className="text-blue-600 font-semibold">OdooERP</span> solutions with over 2 years of professional experience.
              </p>

              <p>
                My journey in software development began with a deep curiosity about enterprise systems and business automation. I've dedicated myself to mastering the complexities of ERP implementation, custom module development, and seamless system integration.
              </p>

              <p>
                Beyond code, I'm passionate about solving real-world business problems, mentoring junior developers, and staying at the forefront of technology trends.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { label: 'Projects', value: '14+' },
                { label: 'Experience', value: '2y' },
                { label: 'Proficiency', value: '85%' }
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200"
                >
                  <div className="text-2xl font-bold text-blue-600">{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect rounded-xl p-6 border-l-4 border-blue-500"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Expertise</h3>
            <div className="space-y-2">
              {['Odoo ERP Development', 'Python Programming', 'PostgreSQL Database Design', 'API Integration', 'System Architecture'].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ x: 10 }}
                  className="flex items-center text-gray-700"
                >
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  {item}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="glass-effect rounded-xl p-6 border-l-4 border-blue-500"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Philosophy</h3>
            <p className="text-gray-700 leading-relaxed">
              I believe in writing clean, maintainable code that solves real problems. Every line of code should tell a story and contribute to the larger vision of the project.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
