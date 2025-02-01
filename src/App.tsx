import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { AnimatedSection } from './components/AnimatedSection';
import { SkillBar } from './components/SkillBar';
import { ProjectCard } from './components/ProjectCard';
import { Navbar } from './components/Navbar';

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

  const projects = [
    {
      title: 'Tijaarat Developers',
      description: 'Real estate management system with advanced property listings, client management, and automated documentation.',
      githubUrl: 'https://github.com/ahsan54/Tijaarat-Developers.git',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'BSS Development',
      description: 'Developed and migrated multiple Odoo 16 modules for HRMS and accounting.',
      githubUrl: 'https://github.com/ahsan54/BSS_Custom_Development.git',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Payment Voucher',
      description: 'Internship project for streamlining payment processing with automated journal entries.',
      githubUrl: 'https://github.com/ahsan54/PaymentVoucher.git',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Employee Loan Management',
      description: 'Odoo module for managing employee loans, approvals, and installment tracking.',
      githubUrl: 'https://github.com/ahsan54/Employee-Loan-Management.git',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Fleet Fuel Tank',
      description: 'Internship project tracking fuel consumption with advanced validation.',
      githubUrl: 'https://github.com/ahsan54/Fleet-Fuel-Tank-.git',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Hospital Management Odoo',
      description: 'Internship project managing patients, doctors, and appointments in Odoo.',
      githubUrl: 'https://github.com/ahsan54/Hospital-Management-Odoo.git',
      image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Diabetes Prediction System',
      description: 'FYP project using machine learning to predict diabetes risk.',
      githubUrl: 'https://ahsan54.github.io/Diabetes_FrontEnd/',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Movement Detector',
      description: 'Personal project detecting head movements and sending WhatsApp alerts.',
      githubUrl: 'https://github.com/ahsan54/Head_Movement_Detector.git',
      image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Tailor Measurements Saver',
      description: 'Personal project for storing and managing tailor measurements.',
      githubUrl: 'https://github.com/ahsan54/Tailor-Measurements-Saver-App.git',
      image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Patient Appointment Booking',
      description: 'Personal project for managing clinic appointments and doctor availability.',
      githubUrl: 'https://github.com/ahsan54/Clinic_ManageMent_Demo.git',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="relative">
      <Navbar />
      
      {/* Hero Section with Parallax */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: url('./img/Top.webp');
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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
              <li>Integrated APIs into Odoo for seamless workflows</li>
              <li>Migrated modules to newer versions while optimizing performance</li>
              <li>Created advanced QWeb PDF and Excel reports</li>
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
