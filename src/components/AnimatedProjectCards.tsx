'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Project {
  id: number;
  title: string;
  description: string;
  emoji: string;
  image: string;
  hueA: number;
  hueB: number;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Mountain Exploration",
    description: "Discover breathtaking mountain landscapes and scenic views.",
    emoji: "🏔️",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    hueA: 210,
    hueB: 230
  },
  {
    id: 2,
    title: "Ocean Adventures",
    description: "Dive into the deep blue sea and explore marine life.",
    emoji: "🌊",
    image: "https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=1200&q=80",
    hueA: 190,
    hueB: 210
  },
  {
    id: 3,
    title: "Forest Journeys",
    description: "Wander through lush forests and ancient woodlands.",
    emoji: "🌲",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    hueA: 120,
    hueB: 150
  },
  {
    id: 4,
    title: "Desert Expeditions",
    description: "Experience the vast beauty of desert landscapes.",
    emoji: "🏜️",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80",
    hueA: 30,
    hueB: 60
  }
];

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  
  const background = `linear-gradient(306deg, hsl(${project.hueA}, 80%, 50%), hsl(${project.hueB}, 80%, 50%))`;
  
  // Alternate the direction of cards
  const direction = index % 2 === 0 ? 1 : -1;
  
  // Card variants for animation
  const cardVariants = {
    offscreen: {
      y: 300,
      x: 100 * direction,
      opacity: 0,
      scale: 0.8,
    },
    onscreen: {
      y: 0,
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: -5 * direction,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: index * 0.1,
      },
    }
  };

  return (
    <motion.div
      ref={ref}
      className="relative mx-auto mb-16 md:mb-24 w-full max-w-3xl px-4"
      initial="offscreen"
      animate={isInView ? "onscreen" : "offscreen"}
      variants={cardVariants}
    >
      <div 
        className="absolute inset-0 rounded-3xl"
        style={{ 
          background,
          clipPath: "path('M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z')",
          transform: `rotate(${direction * 2}deg)`,
          top: "-5%",
          left: "-5%",
          right: "-5%",
          bottom: "-5%",
          zIndex: -1
        }}
      />
      
      <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-xl flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 relative">
          <div className="absolute top-4 left-4 text-6xl z-10">
            {project.emoji}
          </div>
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-3 text-gray-800 dark:text-white">
            {project.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            {project.description}
          </p>
          <button 
            className="px-6 py-2 rounded-full text-white font-medium w-fit"
            style={{ background }}
          >
            Explore Project
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function AnimatedProjectCards() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: false, amount: 0.3 });
  
  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-20 md:py-32 bg-gradient-to-b from-gray-900 to-black min-h-screen">
      <motion.div 
        ref={headerRef}
        className="text-center mb-16 md:mb-24 px-4"
        initial="hidden"
        animate={isHeaderInView ? "visible" : "hidden"}
        variants={headerVariants}
      >
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Featured <span className="text-blue-500">Projects</span>
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Scroll down to explore our featured projects and immersive experiences.
          Each card reveals a unique adventure waiting for you.
        </p>
      </motion.div>
      
      <div className="container mx-auto">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      
      <motion.div 
        className="text-center mt-16 md:mt-24 px-4"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.8 }}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to <span className="text-purple-500">Join Us?</span>
        </h3>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Start your journey today and explore our immersive experiences.
        </p>
        <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full text-white font-bold text-lg">
          Get Started
        </button>
      </motion.div>
    </div>
  );
}
