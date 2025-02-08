import React from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Code2, GitBranch, GitMerge, Database, FileJson } from 'lucide-react';
import { AnimatedSection } from './components/AnimatedSection';
import { SkillBar } from './components/SkillBar';
import { ProjectCard } from './components/ProjectCard';
import { Navbar } from './components/Navbar';
import topImage from './img/Top.webp';
import topLightImage from './img/light_top.jpg';
import topPolygonImage from './img/polygon_top.jpg';
// Import all project images
import tijImage from './img/tij.jpg';
import bssImage from './img/bss.jpg';
import voucherImage from './img/voucher.jpg';
import coinsImage from './img/greenLeaf_coins.png';
import fleetImage from './img/fleet.jpg';
import hospitalImage from './img/hospital.jpg';
import fypImage from './img/fyp.jpg';
import headImage from './img/head.jpg';
import tailorImage from './img/tailor.png';
import appointmentImage from './img/appointment.png';

const projects = [
  {
    title: 'Tijaarat Developers',
    description: 'Assisted in HRMS and portal customization, along with purchase, inventory, accounting, requisition, and sales modules. Migrated HR functionalities to Odoo 17. Developed maintenance cost tracking, quality checks in inventory, fund requisition management, purchase requisition comparison, dynamic purchase reports, and global discount handling in purchase orders.',
    githubUrl: 'https://github.com/ahsan54/Tijaarat-Developers.git',
    image: tijImage,
  },
  {
    title: 'BSS Development',
    description: 'Developed and migrated multiple Odoo 16 modules, including dynamic cheque numbering, custom approval workflows, salary register reports, enhanced employee portals, dynamic payment vouchers, invoice customization, default journal configurations, HR document generation, and automated withholding tax calculations.',
    githubUrl: 'https://github.com/ahsan54/BSS_Custom_Development.git',
    image: bssImage,
  },
  {
    title: 'Payment Voucher Module',
    description: 'Designed PV module to streamline payment processing with automated journal entries, featuring dynamically generated debit/credit lines linked to relevant journals. Integrated ir.sequence for different voucher and cheque numbers.',
    githubUrl: 'https://github.com/ahsan54/PaymentVoucher.git',
    image: voucherImage,
  },
  {
    title: 'Employee Loan Module',
    description: 'Developed an Odoo module for managing employee loans, automating loan application, approval, and installment tracking. It integrates accounting by updating journal entries, including profit JV, upon installment payments. The module also configures loan types, prevents duplicate loan applications.',
    githubUrl: 'https://github.com/ahsan54/Employee-Loan-Management.git',
    image: coinsImage,
  },
  {
    title: 'Fleet Fuel Tank Module',
    description: 'Internship module tracking fuel consumption with advanced validation.',
    githubUrl: 'https://github.com/ahsan54/Fleet-Fuel-Tank-.git',
    image: fleetImage,
  },
  {
    title: 'Hospital Management Module',
    description: 'Internship module managing patients, doctors, and appointments in Odoo.',
    githubUrl: 'https://github.com/ahsan54/Hospital-Management-Odoo.git',
    image: hospitalImage,
  },
  {
    title: 'Diabetes Prediction System',
    description: 'Machine learning-based system for predicting diabetes risk using patient data. It aims to predict the likelihood of an individual having diabetes using a logistic regression model.',
    githubUrl: 'https://ahsan54.github.io/Diabetes_FrontEnd/',
    image: fypImage,
  },
  {
    title: 'Movement Detector',
    description: 'Project detects head movements using a webcam and sends a WhatsApp message via Twilio Web API to a desired number when head movement is detected.',
    githubUrl: 'https://github.com/ahsan54/Head_Movement_Detector.git',
    image: headImage,
  },
  {
    title: 'Tailor Measurements Saver',
    description: 'Digital solution for storing and managing tailor measurements efficiently. Built using Python and Flask, this app allows you to perform CRUD on measurements effortlessly.',
    githubUrl: 'https://github.com/ahsan54/Tailor-Measurements-Saver-App.git',
    image: tailorImage,
  },
  {
    title: 'Patient Appointment Booking',
    description: 'Project developed to streamline the process of booking, checking available slots for a specific doctor, and managing clinic appointments.',
    githubUrl: 'https://github.com/ahsan54/Clinic_ManageMent_Demo.git',
    image: appointmentImage,
  },
];

const experienceData = [
  {
    id: 1,
    role: "Odoo Developer",
    period: "August 2024 – Present",
    company: "Business Solutions & Services",
    achievements: [
  {
    icon: Code2,
    text: "Developing, customizing, and enhancing Odoo modules.",
  },
  {
    icon: GitBranch,
    text: "Working on portals using controller APIs for seamless workflows.",
  },
  {
    icon: GitMerge,
    text: "Migrated modules to newer versions while optimizing performance.",
  },
  {
    icon: Database,
    text: "Developed advanced QWeb PDF and Excel reports.",
  },
  {
    icon: FileJson,
    text: "Collaborated with team leads to deliver high-quality solutions.",
  },
],

    techStack: ["Odoo", "Python", "PostgreSQL", "XML"],
  }
];

function App() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const skills = [
    { name: 'Python', percentage: 80 },
    { name: 'Object Oriented Programming', percentage: 90 },
    { name: 'Data Structures', percentage: 80 },
    { name: 'PostgreSQL', percentage: 80 },
    { name: 'OdooERP', percentage: 80 },
    { name: 'QWeb', percentage: 80 },
    { name: 'XML', percentage: 90 },
    { name: 'HTML/CSS', percentage: 90 },
  ];

  return (
    <div className="relative">
      <Navbar />
      
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${topLightImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: backgroundY,
        }}
      />
      
      <motion.div
        className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{ opacity }}
      >
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="mb-8 space-y-4"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 1
              }}
            >
              <motion.span
                className="inline-block"
                animate={{
                  y: [0, -20, 0],
                  color: ['#fff', '#60A5FA', '#fff'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                Ahsan
              </motion.span>{" "}
              <motion.span
                className="inline-block"
                animate={{
                  y: [0, -20, 0],
                  color: ['#fff', '#60A5FA', '#fff'],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 0.2,
                }}
              >
                Ismail
              </motion.span>
            </motion.h1>
            <motion.h2 
              className="text-xl sm:text-2xl md:text-3xl gradient-text"
              variants={itemVariants}
            >
              Python Developer | OdooERP | Problem Solver
            </motion.h2>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="relative z-10 bg-gradient-to-b from-transparent via-gray-900 to-gray-900">
        <motion.section 
          id="experience"
          className="pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-16 text-center"
            whileInView={{
              scale: [0.9, 1.1, 1],
              opacity: [0, 1],
            }}
            transition={{ duration: 0.8 }}
          >
            Professional Experience
          </motion.h2>
        
          {experienceData.map((experience) => (
            <motion.div 
              key={experience.id}
              className="mt-8 sm:mt-16 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-1 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-gray-900/90 p-6 sm:p-8 rounded-lg backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-gradient-x"></div>
                  
                  <div className="relative z-10">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                      <div>
                        <motion.h3 
                          className="text-2xl sm:text-3xl font-bold text-white mb-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          {experience.role}
                        </motion.h3>
                        <motion.p 
                          className="text-blue-400 text-lg"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          {experience.company}
                        </motion.p>
                      </div>
                      <motion.div 
                        className="mt-2 sm:mt-0 px-4 py-2 bg-blue-500/20 rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 }}
                      >
                        <p className="text-blue-300 font-medium">{experience.period}</p>
                      </motion.div>
                    </div>

                    <motion.div 
                      className="space-y-4"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                    >
                      {experience.achievements.map((achievement, index) => {
                        const Icon = achievement.icon;
                        return (
                          <motion.div
                            key={index}
                            className="flex items-start space-x-3"
                            variants={itemVariants}
                            whileHover={{ x: 10, transition: { type: "spring", stiffness: 300 } }}
                          >
                            <div className="mt-1">
                              <motion.div
                                className="p-2 bg-blue-500/20 rounded-lg"
                                whileHover={{ 
                                  scale: 1.2,
                                  rotate: 360,
                                  backgroundColor: "rgba(59, 130, 246, 0.4)"
                                }}
                                transition={{ duration: 0.3 }}
                              >
                                <Icon className="w-5 h-5 text-blue-400" />
                              </motion.div>
                            </div>
                            <p className="text-gray-300 flex-1">{achievement.text}</p>
                          </motion.div>
                        );
                      })}
                    </motion.div>

                    <motion.div 
                      className="mt-6 flex flex-wrap gap-2"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {experience.techStack.map((tech, index) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-full text-sm"
                          whileHover={{ 
                            scale: 1.1,
                            backgroundColor: "rgba(59, 130, 246, 0.3)",
                          }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.section>

        <motion.section 
          id="skills"
          className="py-16 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-16 text-center"
            whileInView={{
              scale: [0.9, 1.1, 1],
              opacity: [0, 1],
            }}
            transition={{ duration: 0.8 }}
          >
            Skills & Expertise
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 mt-8 sm:mt-16">
            {skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                percentage={skill.percentage}
                index={index}
              />
            ))}
          </div>
        </motion.section>

        <motion.section 
          id="projects"
          className="py-16 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-16 text-center"
            whileInView={{
              scale: [0.9, 1.1, 1],
              opacity: [0, 1],
            }}
            transition={{ duration: 0.8 }}
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mt-8 sm:mt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                index={index}
              />
            ))}
          </motion.div>
        </motion.section>

        <motion.section 
          id="contact"
          className="py-16 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-16 text-center"
            whileInView={{
              scale: [0.9, 1.1, 1],
              opacity: [0, 1],
            }}
            transition={{ duration: 0.8 }}
          >
            Get In Touch
          </motion.h2>
          <motion.div 
            className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-8 sm:mt-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
          >
            {[
              { icon: Phone, href: "tel:03180690159", text: "03180690159" },
              { icon: Mail, href: "mailto:ahsan.ismail0159@gmail.com", text: "ahsan.ismail0159@gmail.com" },
              { icon: Github, href: "https://github.com/ahsan54", text: "GitHub" },
              { icon: Linkedin, href: "https://www.linkedin.com/in/ahsan-ismail-4b4763281/", text: "LinkedIn" },
            ].map(({ icon: Icon, href, text }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-blue-300 transition-all duration-300 text-sm sm:text-base"
                whileHover={{ 
                  scale: 1.1,
                  textShadow: "0 0 15px rgb(147, 197, 253)",
                  color: "#60A5FA",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                </motion.div>
                {text}
              </motion.a>
            ))}
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}

export default App;
