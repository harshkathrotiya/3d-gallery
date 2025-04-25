'use client';

import { useState } from 'react';
import Interactive3DBackground from './Interactive3DBackground';

// Sample project data
const projectsData = [
  {
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    alt: 'Mountain Retreat',
    color: '#3b82f6', // blue
  },
  {
    src: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=1200&q=80',
    alt: 'Urban Explorer',
    color: '#ef4444', // red
  },
  {
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
    alt: 'Coastal Journey',
    color: '#10b981', // green
  },
  {
    src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80',
    alt: 'Night Vision',
    color: '#8b5cf6', // purple
  }
];

export default function FeaturedProjects() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gray-900">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Interactive3DBackground 
          images={projectsData}
          currentIndex={currentIndex}
          onChangeIndex={setCurrentIndex}
        />
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 min-w-screen h-screen flex flex-col justify-center px-8 md:px-20 pointer-events-none">
        <div className="mb-20 md:mb-32">
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Featured <span className="text-blue-500">Projects</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-xl">
            Scroll horizontally to explore our featured projects and immersive experiences.
          </p>
        </div>
        
        {/* Project Info */}
        <div className="mt-auto pointer-events-auto">
          <div className="bg-black/30 backdrop-blur-md p-6 rounded-lg max-w-md">
            <h3 className="text-2xl font-bold text-white mb-2">
              {projectsData[currentIndex].alt}
            </h3>
            <p className="text-gray-300">
              Explore this amazing project with interactive 3D elements and immersive design.
              Swipe or use the navigation controls to browse through our featured work.
            </p>
            <div className="mt-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-all">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="text-white text-sm flex flex-col items-center">
          <span>Scroll to Explore</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
