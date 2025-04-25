'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';

// Tutorial steps
const tutorialSteps = [
  {
    id: 1,
    title: 'Welcome to 3D Gallery',
    description: 'Learn how to interact with our 3D models and navigate through the gallery.',
    action: 'Click Next to continue',
    modelType: 'sphere',
  },
  {
    id: 2,
    title: 'Rotating Models',
    description: 'Click and drag on any 3D model to rotate it and view it from different angles.',
    action: 'Try rotating the cube',
    modelType: 'cube',
  },
  {
    id: 3,
    title: 'Zooming In and Out',
    description: 'Use your mouse wheel or pinch gesture to zoom in and out of the 3D scene.',
    action: 'Try zooming in and out',
    modelType: 'torus',
  },
  {
    id: 4,
    title: 'Interacting with Models',
    description: 'Click on models to trigger animations and special effects.',
    action: 'Click on the model to see it animate',
    modelType: 'octahedron',
  },
  {
    id: 5,
    title: 'Navigating the Gallery',
    description: 'Use the navigation controls to move between different models in the gallery.',
    action: 'Try using the navigation arrows',
    modelType: 'dodecahedron',
  },
];

// Interactive 3D model for the tutorial
function TutorialModel({ modelType, isActive }: { modelType: string; isActive: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  // Handle interactions
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);
  const handleClick = () => setClicked(!clicked);
  
  // Animation
  useEffect(() => {
    if (!meshRef.current) return;
    
    let animationId: number;
    
    const animate = () => {
      if (meshRef.current) {
        // Rotate based on interaction state
        if (clicked) {
          meshRef.current.rotation.x += 0.03;
          meshRef.current.rotation.y += 0.03;
        } else {
          meshRef.current.rotation.y += 0.01;
        }
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [clicked]);
  
  // Scale animation on hover and active state
  useEffect(() => {
    if (!meshRef.current) return;
    
    if (hovered) {
      meshRef.current.scale.set(1.2, 1.2, 1.2);
    } else if (isActive) {
      meshRef.current.scale.set(1.1, 1.1, 1.1);
    } else {
      meshRef.current.scale.set(1, 1, 1);
    }
  }, [hovered, isActive]);
  
  // Render different geometries based on type
  let geometry;
  switch (modelType) {
    case 'cube':
      geometry = <boxGeometry args={[1.2, 1.2, 1.2]} />;
      break;
    case 'torus':
      geometry = <torusGeometry args={[0.7, 0.3, 16, 100]} />;
      break;
    case 'octahedron':
      geometry = <octahedronGeometry args={[1, 0]} />;
      break;
    case 'dodecahedron':
      geometry = <dodecahedronGeometry args={[1]} />;
      break;
    case 'sphere':
    default:
      geometry = <sphereGeometry args={[1, 32, 32]} />;
  }
  
  // Color based on interaction state
  const color = hovered ? '#3b82f6' : clicked ? '#22c55e' : '#8b5cf6';
  
  return (
    <mesh
      ref={meshRef}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {geometry}
      <meshPhysicalMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
        clearcoat={0.5}
        reflectivity={1}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Tutorial scene component
function TutorialScene({ currentStep }: { currentStep: number }) {
  const currentModelType = tutorialSteps[currentStep - 1].modelType;
  
  return (
    <>
      {/* Camera setup */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-3, 2, -2]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[3, -2, 2]} intensity={0.5} color="#8b5cf6" />
      
      {/* Tutorial model */}
      <TutorialModel modelType={currentModelType} isActive={true} />
      
      {/* Instruction text */}
      <Text
        position={[0, -2, 0]}
        fontSize={0.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {tutorialSteps[currentStep - 1].action}
      </Text>
      
      {/* Controls */}
      <OrbitControls
        enableZoom={currentStep >= 3}
        enableRotate={currentStep >= 2}
        enablePan={false}
      />
    </>
  );
}

// Progress indicator component
function ProgressIndicator({ currentStep, totalSteps, onStepClick }: { 
  currentStep: number; 
  totalSteps: number; 
  onStepClick: (step: number) => void;
}) {
  return (
    <div className="flex justify-center space-x-2 mt-6">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <button
          key={index}
          className={`w-3 h-3 rounded-full transition-all ${
            index + 1 === currentStep
              ? 'bg-blue-500 scale-125'
              : index + 1 < currentStep
              ? 'bg-blue-300'
              : 'bg-gray-400'
          }`}
          onClick={() => onStepClick(index + 1)}
          aria-label={`Go to step ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default function InteractiveTutorial() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  
  // Handle navigation
  const goToNextStep = () => {
    if (currentStep < tutorialSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
    }
  };
  
  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-black to-gray-900 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Interactive Tutorial</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn how to use our 3D Gallery with this step-by-step interactive guide.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
            {/* Tutorial content */}
            <div className="flex flex-col md:flex-row">
              {/* 3D Viewer */}
              <div className="md:w-1/2 h-[400px]">
                <Canvas dpr={[1, 2]}>
                  <color attach="background" args={['#1a1a1a']} />
                  <fog attach="fog" args={['#1a1a1a', 5, 15]} />
                  <TutorialScene currentStep={currentStep} />
                </Canvas>
              </div>
              
              {/* Instructions */}
              <div className="md:w-1/2 p-8 flex flex-col justify-between">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {completed ? 'Tutorial Completed!' : tutorialSteps[currentStep - 1].title}
                    </h3>
                    <p className="text-gray-300 mb-6">
                      {completed
                        ? 'Congratulations! You have completed the tutorial and are now ready to explore the full 3D Gallery experience.'
                        : tutorialSteps[currentStep - 1].description}
                    </p>
                  </motion.div>
                </AnimatePresence>
                
                {/* Progress indicator */}
                {!completed && (
                  <ProgressIndicator
                    currentStep={currentStep}
                    totalSteps={tutorialSteps.length}
                    onStepClick={setCurrentStep}
                  />
                )}
                
                {/* Navigation buttons */}
                <div className="flex justify-between mt-8">
                  <button
                    className={`px-6 py-2 rounded-lg transition ${
                      currentStep > 1
                        ? 'bg-gray-700 text-white hover:bg-gray-600'
                        : 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                    onClick={goToPrevStep}
                    disabled={currentStep <= 1}
                  >
                    Previous
                  </button>
                  
                  {completed ? (
                    <button
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition"
                      onClick={() => setCurrentStep(1)}
                    >
                      Restart Tutorial
                    </button>
                  ) : (
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                      onClick={goToNextStep}
                    >
                      {currentStep === tutorialSteps.length ? 'Complete' : 'Next'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
