import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useEffect, useState } from 'react';

interface SkillBarProps {
  name: string;
  percentage: number;
  index: number;
  category?: string;
  icon?: string;
}

function SkillBar({ name, percentage, index, category = "Technical", icon = "⚡" }: SkillBarProps) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const x = useSpring(rotateX, springConfig);
  const y = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const getGradient = (index: number) => {
    const gradients = [
      'from-purple-500 via-pink-500 to-red-500',
      'from-blue-500 via-cyan-500 to-teal-500',
      'from-green-400 via-emerald-500 to-cyan-500',
      'from-yellow-400 via-orange-500 to-red-500',
      'from-indigo-500 via-purple-500 to-pink-500',
      'from-rose-400 via-fuchsia-500 to-indigo-500',
      'from-amber-400 via-orange-500 to-pink-500',
      'from-lime-400 via-green-500 to-emerald-600'
    ];
    return gradients[index % gradients.length];
  };

  const getIconGradient = (index: number) => {
    const iconGradients = [
      'text-purple-400',
      'text-cyan-400', 
      'text-emerald-400',
      'text-orange-400',
      'text-pink-400',
      'text-fuchsia-400',
      'text-amber-400',
      'text-lime-400'
    ];
    return iconGradients[index % iconGradients.length];
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        y: 100,
        scale: 0.8,
        rotateX: -15
      }}
      animate={inView ? { 
        opacity: 1, 
        y: 0,
        scale: 1,
        rotateX: 0
      } : { 
        opacity: 0, 
        y: 100,
        scale: 0.8,
        rotateX: -15
      }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 20
      }}
      style={{
        rotateX: x,
        rotateY: y,
        transformStyle: "preserve-3d"
      }}
      whileHover={{
        scale: 1.05,
        z: 50,
        transition: { duration: 0.3 }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
      }}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/90 via-gray-800/80 to-gray-900/90 backdrop-blur-xl border border-gray-700/50 shadow-2xl">
        {/* Animated background mesh */}
        <div className="absolute inset-0 opacity-30">
          <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} mix-blend-multiply`}></div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          ></motion.div>
        </div>

        {/* Glow effect */}
        <motion.div
          className={`absolute -inset-0.5 bg-gradient-to-r ${getGradient(index)} rounded-2xl blur-sm`}
          animate={{
            opacity: isHovered ? 0.6 : 0.2,
          }}
          transition={{ duration: 0.3 }}
        ></motion.div>

        {/* Content */}
        <div className="relative z-10 p-6 h-full">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <motion.div
                className={`text-2xl ${getIconGradient(index)} filter drop-shadow-lg`}
                whileHover={{ 
                  scale: 1.3, 
                  rotate: [0, -10, 10, 0],
                  filter: "drop-shadow(0 0 8px currentColor)"
                }}
                transition={{ duration: 0.5 }}
              >
                {icon}
              </motion.div>
              <div>
                <motion.h3 
                  className="text-xl font-bold text-white group-hover:text-gray-100 transition-colors duration-300"
                  style={{ transform: "translateZ(20px)" }}
                >
                  {name}
                </motion.h3>
                <motion.span 
                  className="text-xs text-gray-400 uppercase tracking-wider font-medium"
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {category}
                </motion.span>
              </div>
            </div>
            
            <motion.div 
              className="text-right"
              style={{ transform: "translateZ(15px)" }}
            >
              <motion.span 
                className={`text-2xl font-bold ${getIconGradient(index)} filter drop-shadow-sm`}
                initial={{ opacity: 0, scale: 0 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
                whileHover={{
                  scale: 1.2,
                  filter: "drop-shadow(0 0 8px currentColor)"
                }}
              >
                {percentage}%
              </motion.span>
            </motion.div>
          </div>
          
          {/* Progress container */}
          <div className="relative">
            <div className="w-full bg-gray-700/30 rounded-full h-3 overflow-hidden backdrop-blur-sm border border-gray-600/30">
              <motion.div
                className={`h-3 rounded-full bg-gradient-to-r ${getGradient(index)} relative overflow-hidden`}
                initial={{ width: 0, opacity: 0 }}
                animate={inView ? { 
                  width: `${percentage}%`, 
                  opacity: 1 
                } : { 
                  width: 0, 
                  opacity: 0 
                }}
                transition={{ 
                  duration: 1.5, 
                  delay: index * 0.1 + 0.5,
                  ease: "easeOut" 
                }}
                whileHover={{
                  boxShadow: `0 0 20px ${index % 2 === 0 ? '#8b5cf6' : '#06b6d4'}`,
                }}
              >
                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear",
                    delay: index * 0.2
                  }}
                ></motion.div>
              </motion.div>
            </div>
            
            {/* Floating particles */}
            {isHovered && (
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className={`absolute w-1 h-1 ${getIconGradient(index)} rounded-full`}
                    initial={{ 
                      x: Math.random() * 100 + '%',
                      y: '50%',
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{
                      y: [50, 20, 5],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Expertise level indicator */}
          <motion.div 
            className="mt-4 flex items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < Math.floor(percentage / 20) 
                      ? `bg-gradient-to-r ${getGradient(index)}` 
                      : 'bg-gray-600/50'
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.8 + i * 0.1,
                    type: "spring"
                  }}
                  whileHover={{ scale: 1.5 }}
                />
              ))}
            </div>
            <motion.span 
              className="text-xs text-gray-400 font-medium"
              whileHover={{ color: '#9ca3af' }}
            >
              {percentage >= 90 ? 'Expert' : percentage >= 70 ? 'Advanced' : percentage >= 50 ? 'Intermediate' : 'Beginner'}
            </motion.span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ModernSkillsSection() {
  const [sectionRef, sectionInView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const skills = [
     { "name": "Python", "percentage": 80, "category": "Programming Language", "icon": "🐍" },
  { "name": "OdooERP", "percentage": 90, "category": "ERP Framework", "icon": "🏢" },
  { "name": "Rest Apis", "percentage": 90, "category": "API", "icon": "🔌" },
  { "name": "Object Oriented Programming", "percentage": 85, "category": "Paradigm", "icon": "🧩" },
  { "name": "Data Structures", "percentage": 80, "category": "Engineering", "icon": "🌳" },
  { "name": "PostgreSQL", "percentage": 75, "category": "Database", "icon": "🗃️" },
  { "name": "QWeb", "percentage": 90, "category": "Templating Engine", "icon": "📄" },
  { "name": "XML/HTML/CSS", "percentage": 80, "category": "Web Technologies", "icon": "🌐" }
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="skills"
      className="relative py-20 px-4 sm:px-8 max-w-7xl mx-auto overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full border border-purple-500/30 mb-6"
        >
          <span className="text-2xl">⚡</span>
          <span className="text-sm text-gray-300 font-medium">TECHNICAL EXPERTISE</span>
        </motion.div>
        
        <motion.h2
          className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-br from-white via-gray-200 to-gray-400 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={sectionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Skills & Expertise
        </motion.h2>
        
        <motion.p
          className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Crafting digital experiences with cutting-edge technologies and proven methodologies. 
          Each skill represents countless hours of dedication and real-world application.
        </motion.p>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 lg:gap-8 relative z-10">
        {skills.map((skill, index) => (
          <SkillBar 
            key={skill.name} 
            name={skill.name} 
            percentage={skill.percentage} 
            index={index}
            category={skill.category}
            icon={skill.icon}
          />
        ))}
      </div>

      {/* Stats Footer */}
      <motion.div
        className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        {[
          { label: 'Technologies', value: '8+' }, 
          { label: 'Years Experience', value: '1' },
          { label: 'Projects Completed', value: '5+' },
          { label: 'Average Proficiency', value: '85%' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="p-4 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50"
            whileHover={{ scale: 1.05, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-2xl font-bold text-white mb-1"
              initial={{ scale: 0 }}
              animate={sectionInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1, type: "spring" }}
            >
              {stat.value}
            </motion.div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
