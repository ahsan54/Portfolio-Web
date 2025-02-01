import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { AnimatedSection } from './components/AnimatedSection';
import { SkillBar } from './components/SkillBar';
import { ProjectCard } from './components/ProjectCard';
import { Navbar } from './components/Navbar';
import topImage from './img/Top.webp';
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
function App() {
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2)), url(${topImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(1px)',  // Reduced blur intensity
    y: backgroundY,
  }}
/>


      
      <motion.div
        className="relative z-10 min-h-screen flex items-center justify-center"
        style={{ opacity }}
      >
        <div className="text-center p-8">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <h1 className="text-7xl font-bold text-white mb-4 tracking-tight">
              Ahsan Ismail
            </h1>
            <h2 className="text-3xl text-blue-300">
              Python Developer | OdooERP | Problem Solver
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white text-lg"
          >
            Scroll to explore my journey
          </motion.div>
        </div>
      </motion.div>

      <div className="relative z-10 bg-gradient-to-b from-transparent via-gray-900 to-gray-900">
        {/* Professional Experience Section */}
        <section id="experience" className="pt-32 pb-24 px-4 md:px-8 max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-16 text-center">Professional Experience</h2>
          <motion.div 
            className="mt-16 bg-white/10 p-8 rounded-lg backdrop-blur-sm"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Odoo Developer</h3>
            <p className="text-blue-300 mb-4">August 2024 – Present</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2">
              <li>Developing, customizing, and enhancing Odoo modules</li>
              <li>Integrated Controller Apis into Odoo for seamless workflows</li>
              <li>Migrated modules to newer versions while optimizing performance</li>
              <li>Developed advanced QWeb PDF and Excel reports</li>
              <li>Collaborated with team leads to deliver high-quality solutions</li>
            </ul>
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-16 text-center">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            {skills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                percentage={skill.percentage}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-16 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                {...project}
                index={index}
              />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold text-white mb-16 text-center">Get In Touch</h2>
          <motion.div 
            className="flex flex-wrap justify-center gap-8 mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
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
                className="flex items-center text-white hover:text-blue-300 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-6 h-6 mr-2" />
                {text}
              </motion.a>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
}

export default App;
