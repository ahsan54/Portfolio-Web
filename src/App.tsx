import React, { useState, useEffect } from 'react';
import './CVPopup.css';
import ModernSkillsSection from './components/SkillBar';
import { VisitorAnalytics } from './components/VisitorAnalytics';
import { visitorTracker } from './utils/visitorTracking';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Code2, GitBranch, GitMerge, Database, FileJson, Settings, Download, X, BarChart3, Upload } from 'lucide-react';
import { AnimatedSection } from './components/AnimatedSection';
import { SkillBar } from './components/SkillBar';
import { ProjectCard } from './components/ProjectCard';
import { Navbar } from './components/Navbar';
import topImage from './img/Top_image.webp';
import topLightImage from './img/light_top.jpg';
import topPolygonImage from './img/polygon_top.webp';
// Import all project images
import car_dealer from './img/car_dealer.jpg';
import cozmetica_img from './img/cozmetica.jpg';
import jnj_polymer from './img/jnj_polymer.png';
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
import hotelImage from './img/hotel_background.jpg';

const projects = [
  {
    title: 'Cozmetica',
    description: 'Developed full-scale HRMS solution with employee self-service dashboards, seamlessly integrating all HR portal modules, plus custom job portal, tax certification, and income tax slab modules.',
    githubUrl: 'https://github.com/M-Ahsan-Ismail/Cozmetica.git',
    image: cozmetica_img,
  },
  {
    title: 'HRL Group',
    description: 'Developed the Dealer Management and sales warranty portal, attendance portal, leave request portal, grievance portal and employee expense portal.',
    githubUrl: 'https://github.com/M-Ahsan-Ismail/HRL-Group.git',
    image: car_dealer,
  },
  {
    title: 'JNJ Polymer',
    description: 'Developed procurement, cost sheet builder, gate pass, late payment surcharge, dual approvals for sale, purchase, inventory, manufacturing, accounting and backdate_entries, expense module.',
    githubUrl: 'https://github.com/M-Ahsan-Ismail/J-J-Development.git',
    image: jnj_polymer,
  },
  {
    title: 'Tijaarat Developers',
    description: 'Assisted in HRMS and portal customization, along with purchase, inventory, accounting, requisition, and sales modules. Migrated HR functionalities to Odoo 17. Developed maintenance cost tracking, quality checks in inventory, fund requisition management, purchase requisition comparison, dynamic purchase reports, and global discount handling in purchase orders.',
    githubUrl: 'https://github.com/M-Ahsan-Ismail/Tijaarat-Developers.git',
    image: tijImage,
  },
  {
    title: 'BSS Development',
    description: 'Developed and migrated multiple Odoo 16 modules, including dynamic cheque numbering, custom approval workflows, salary register reports, enhanced employee portals, dynamic payment vouchers, invoice customization, default journal configurations, HR document generation, and automated withholding tax calculations.',
    githubUrl: 'https://github.com/M-Ahsan-Ismail/BSS_Internal_Devlopment.git',
    image: bssImage,
  },
  {
    title: 'Hotel Reservation Module',
    description: 'Hotel reservation booking module for managing bookings, check-ins/check-outs, and admin approval workflows with dynamic pricing, guest stay histories, and role-based access controls. Monitor operations via dashboards for room availability, booking trends, and guest insights.',
    githubUrl: 'https://github.com/M-Ahsan-Ismail/Hotel-Reservation-Management.git',
    image: hotelImage,
  },
  {
    title: 'Payment Voucher Module',
    description: 'Designed PV module to streamline payment processing with automated journal entries, featuring dynamically generated debit/credit lines linked to relevant journals. Integrated ir.sequence for different voucher and cheque numbers.',
    githubUrl: 'https://github.com/M-Ahsan-Ismail/PaymentVoucher.git',
    image: voucherImage,
  },
  {
    title: 'Employee Loan Module',
    description: 'Developed an Odoo module for managing employee loans, automating loan application, approval, and installment tracking. It integrates accounting by updating journal entries, including profit JV, upon installment payments. The module also configures loan types, prevents duplicate loan applications.',
    githubUrl: 'https://github.com/M-Ahsan-Ismail/Employee-Loan-Management.git',
    image: coinsImage,
  },
  {
    title: 'Fleet Fuel Tank Module',
    description: 'Internship module tracking fuel consumption with advanced validation.',
    githubUrl: 'https://github.com/M-Ahsan-Ismail/Fleet-Fuel-Tank-.git',
    image: fleetImage,
  },
  {
    title: 'Hospital Management Module',
    description: 'Internship module managing patients, doctors, and appointments in Odoo.',
    githubUrl: 'https://github.com/M-Ahsan-Ismail/Hospital-Management-Odoo.git',
    image: hospitalImage,
  },
  {
    title: 'Diabetes Prediction System',
    description: 'Machine learning-based system for predicting diabetes risk using patient data. It aims to predict the likelihood of an individual having diabetes using a logistic regression model.',
    githubUrl: 'https://github.com/M-Ahsan-Ismail/DiabetesPrediction.git',
    image: fypImage,
  },
  {
    title: 'Movement Detector',
    description: 'Project detects head movements using a webcam and sends a WhatsApp message via Twilio Web API to a desired number when head movement is detected.',
    githubUrl: 'https://github.com/M-Ahsan-Ismail/Head_Movement_Detector.git',
    image: headImage,
  },
  {
    title: 'Tailor Measurements Saver',
    description: 'Digital solution for storing and managing tailor measurements efficiently. Built using Python and Flask, this app allows you to perform CRUD on measurements effortlessly.',
    githubUrl: 'https://github.com/M-Ahsan-Ismail/Tailor-Measurements-Saver-App.git',
    image: tailorImage,
  },
  {
    title: 'Patient Appointment Booking',
    description: 'Project developed to streamline the process of booking, checking available slots for a specific doctor, and managing clinic appointments.',
    githubUrl: 'https://github.com/M-Ahsan-Ismail/Clinic_ManageMent_Demo.git',
    image: appointmentImage,
  },
];

const experienceData = [
  {
    id: 1,
    role: 'Odoo Developer',
    period: 'August 2024 – Present',
    company: 'Business Solutions & Services',
    achievements: [
      { icon: Code2, text: 'Developing, customizing, and enhancing Odoo modules.' },
      { icon: GitBranch, text: 'Working on portals using controller APIs for seamless workflows.' },
      { icon: GitMerge, text: 'Migrated modules to newer versions while optimizing performance.' },
      { icon: Database, text: 'Developed advanced QWeb PDF and Excel reports.' },
      { icon: FileJson, text: 'Collaborated with team leads to deliver high-quality solutions.' },
    ],
    techStack: ['Odoo', 'Python', 'PostgreSQL', 'XML'],
  },
];

function App() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  // State for CV popup
  const [showCVPopup, setShowCVPopup] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [showVisitorAnalytics, setShowVisitorAnalytics] = useState(false);
  const [fileName, setFileName] = useState('');

  // useEffect to show popup after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCVPopup(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Track page views
  useEffect(() => {
    visitorTracker.trackPageView(window.location.pathname);
    
    // Track route changes for SPA
    const handleRouteChange = () => {
      visitorTracker.trackPageView(window.location.pathname);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);
  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
      ];
      
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload a PDF, XLSX, or TXT file');
        return;
      }

      setFileName(file.name);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        localStorage.setItem('uploadedCV', e.target.result);
        localStorage.setItem('cvFileName', file.name);
        localStorage.setItem('cvFileType', file.type);
      };
      
      // Read file as data URL for PDF and XLSX, text for TXT
      if (file.type === 'text/plain') {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    }
  };

  // Download CV function
  const downloadCV = () => {
    const cvData = localStorage.getItem('uploadedCV');
    const fileName = localStorage.getItem('cvFileName') || 'Ahsan_CV.pdf';
    const fileType = localStorage.getItem('cvFileType') || 'application/pdf';

    if (cvData) {
      // Create download link for uploaded CV
      const link = document.createElement('a');
      link.href = cvData;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Fallback - create a sample CV
      const sampleCV = `
        AHSAN ISMAIL
        Python Developer | OdooERP | Problem Solver
        
        Contact:
        Phone: 03180690159
        Email: ahsan.ismail0159@gmail.com
        GitHub: https://github.com/M-Ahsan-Ismail
        LinkedIn: https://www.linkedin.com/in/ahsan-ismail-4b4763281/
        
        Experience:
        Odoo Developer (August 2024 – Present)
        - Assisted in developing, customizing, and enhancing Odoo modules
        - Integrated APIs into Odoo for seamless workflows
        - Migrated modules to newer versions while optimizing performance
        
        Skills:
        - Python (75%)
        - Object-Oriented Programming (85%)
        - Data Structures (80%)
        - Odoo OpenERP (75%)
        - XML (90%)
        - HTML/CSS (90%)
        - PostgreSQL (80%)
      `;
      
      const blob = new Blob([sampleCV], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Ahsan_CV.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }
    
    setShowCVPopup(false);
  };

  const toggleSettingsMenu = () => {
    setShowSettingsMenu(!showSettingsMenu);
  };
  return (
    <div className="relative">
      <Navbar />

      <motion.div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${topImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: backgroundY,
        }}
      />

      <motion.div
        className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
        style={{ opacity }}
      >
        <motion.div className="text-center" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="mb-8 space-y-4" variants={itemVariants}>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-7xl font-bold text-bright-off-white mb-4 tracking-tight"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20, duration: 1 }}
            >
              <motion.span
                className="inline-block"
                style={{ color: '#F5F5F5' }} // Bright off-white color
                animate={{ y: [0, -20, 0] }} // Keep the bounce animation
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              >
                Ahsan
              </motion.span>{' '}
              <motion.span
                className="inline-block"
                style={{ color: '#F5F5F5' }} // Bright off-white color
                animate={{ y: [0, -20, 0] }} // Keep the bounce animation
                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', delay: 0.2 }}
              >
                Ismail
              </motion.span>
            </motion.h1>
            <motion.h2
              className="text-xl sm:text-2xl md:text-3xl text-bright-off-white"
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
            whileInView={{ scale: [0.9, 1.1, 1], opacity: [0, 1] }}
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
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <div className="bg-gray-900/90 p-6 sm:p-8 rounded-lg backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 animate-gradient-x" />
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
                            whileHover={{ x: 10, transition: { type: 'spring', stiffness: 300 } }}
                          >
                            <div className="mt-1">
                              <motion.div
                                className="p-2 bg-blue-500/20 rounded-lg"
                                whileHover={{
                                  scale: 1.2,
                                  rotate: 360,
                                  backgroundColor: 'rgba(59, 130, 246, 0.4)',
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
                            backgroundColor: 'rgba(59, 130, 246, 0.3)',
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

        <ModernSkillsSection />

        <motion.section
          id="projects"
          className="py-16 sm:py-24 px-4 sm:px-8 max-w-6xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 sm:mb-16 text-center"
            whileInView={{ scale: [0.9, 1.1, 1], opacity: [0, 1] }}
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
              <ProjectCard key={project.title} {...project} index={index} />
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
            whileInView={{ scale: [0.9, 1.1, 1], opacity: [0, 1] }}
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
              { icon: Phone, href: 'tel:03180690159', text: '03180690159' },
              { icon: Mail, href: 'mailto:ahsan.ismail0159@gmail.com', text: 'ahsan.ismail0159@gmail.com' },
              { icon: Github, href: 'https://github.com/M-Ahsan-Ismail', text: 'GitHub' },
              { icon: Linkedin, href: 'https://www.linkedin.com/in/ahsan-ismail-4b4763281/', text: 'LinkedIn' },
            ].map(({ icon: Icon, href, text }) => (
              <motion.a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-white hover:text-blue-300 transition-all duration-300 text-sm sm:text-base"
                whileHover={{
                  scale: 1.1,
                  textShadow: '0 0 15px rgb(147, 197, 253)',
                  color: '#60A5FA',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], transition: { duration: 0.5 } }}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                </motion.div>
                {text}
              </motion.a>
            ))}
          </motion.div>
        </motion.section>
      </div>

      {/* Settings Button */}
      <motion.button
        className="fixed top-4 right-4 z-50 bg-blue-500/20 p-2 rounded-full text-white hover:bg-blue-500/40 relative"
        onClick={toggleSettingsMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      {/* Settings Menu */}
      <AnimatePresence>
        {showSettingsMenu && (
          <motion.div
            className="fixed top-16 right-4 z-50 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-xl shadow-2xl overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-2">
              <button
                onClick={() => {
                  setShowCVPopup(true);
                  setShowSettingsMenu(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-white hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <Download className="w-5 h-5 text-yellow-400" />
                <div>
                  <div className="font-medium">CV Options</div>
                  <div className="text-xs text-gray-400">Download or upload CV</div>
                </div>
              </button>
              
              <button
                onClick={() => {
                  setShowVisitorAnalytics(true);
                  setShowSettingsMenu(false);
                }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left text-white hover:bg-gray-800/50 rounded-lg transition-colors"
              >
                <BarChart3 className="w-5 h-5 text-blue-400" />
                <div>
                  <div className="font-medium">Visitors</div>
                  <div className="text-xs text-gray-400">View analytics dashboard</div>
                </div>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* CV Popup */}
      <AnimatePresence>
        {showCVPopup && (
          <motion.div
            className="fixed top-4 right-4 z-50 cv-popup"
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
          >
            <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-amber-500 p-4 rounded-xl shadow-2xl max-w-sm animate-bounce-in">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center">
                  <Download className="w-5 h-5 text-white mr-2" />
                  <h3 className="font-bold text-white text-sm">Download My CV</h3>
                </div>
                <button
                  onClick={() => setShowCVPopup(false)}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-white text-xs mb-3 opacity-90">
                Get my latest resume with all project details and experience!
              </p>
              <div className="flex gap-2">
                <button
                  onClick={downloadCV}
                  className="flex-1 bg-white text-yellow-600 px-3 py-2 rounded-lg text-xs font-semibold hover:bg-gray-100 transition-colors"
                >
                  Download Now
                </button>
                <label className="bg-yellow-600 text-white px-3 py-2 rounded-lg text-xs font-semibold hover:bg-yellow-700 transition-colors flex items-center cursor-pointer">
                  <Settings className="w-3 h-3 mr-1" />
                  <span>Upload CV</span>
                  <input
                    type="file"
                    accept=".pdf,.xlsx,.txt"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Visitor Analytics */}
      <VisitorAnalytics 
        isOpen={showVisitorAnalytics} 
        onClose={() => setShowVisitorAnalytics(false)} 
      />
    </div>
  );
}

export default App;
