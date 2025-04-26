'use client';

import { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

// 3D Models for the carousel
const carouselModels = [
  {
    id: 1,
    name: 'Interactive Sphere',
    description: 'A dynamic sphere with interactive particles and glow effects',
    color: '#3b82f6', // Blue
    modelType: 'sphere',
  },
  {
    id: 2,
    name: 'Geometric Cube',
    description: 'An animated cube with morphing geometry and light effects',
    color: '#06b6d4', // Cyan
    modelType: 'cube',
  },
  {
    id: 3,
    name: 'Abstract Torus',
    description: 'A flowing torus with dynamic material properties',
    color: '#22c55e', // Green
    modelType: 'torus',
  },
  {
    id: 4,
    name: 'Crystal Formation',
    description: 'A crystalline structure with reflective surfaces',
    color: '#eab308', // Yellow
    modelType: 'crystal',
  },
];

// Dynamic 3D Model component that renders different geometries based on type
function DynamicModel({
  modelType,
  color,
  position = [0, 0, 0],
  scale = 1,
  isActive = false,
  onInteraction
}: {
  modelType: string;
  color: string;
  position?: [number, number, number];
  scale?: number;
  isActive?: boolean;
  onInteraction?: () => void;
}) {
  const modelRef = useRef<THREE.Mesh>(null!);
  const glowRef = useRef<THREE.Mesh>(null!);
  const particlesRef = useRef<THREE.Points>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  // Convert hex color is handled directly in the material

  // Handle interactions
  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);
  const handleClick = () => {
    setClicked(!clicked);
    if (onInteraction) onInteraction();
  };

  // Animation effects when state changes
  useEffect(() => {
    if (!modelRef.current || !glowRef.current) return;

    // Use GSAP for smooth animations
    gsap.to(modelRef.current.scale, {
      x: hovered ? 1.1 : isActive ? 1.2 : 1,
      y: hovered ? 1.1 : isActive ? 1.2 : 1,
      z: hovered ? 1.1 : isActive ? 1.2 : 1,
      duration: 0.5,
      ease: 'power2.out'
    });

    gsap.to(glowRef.current.material, {
      opacity: hovered ? 0.7 : isActive ? 0.5 : 0.3,
      emissiveIntensity: hovered ? 1.5 : isActive ? 1.0 : 0.5,
      duration: 0.5,
      ease: 'power2.out'
    });

    // Rotation animation
    if (clicked || isActive) {
      gsap.to(modelRef.current.rotation, {
        y: modelRef.current.rotation.y + Math.PI * 2,
        duration: 2,
        ease: 'power1.inOut'
      });
    }
  }, [hovered, clicked, isActive]);

  // Create particles for the model
  const particleCount = 200;
  const particlePositions = new Float32Array(particleCount * 3);
  const particleSizes = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    const radius = 1.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;

    particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    particlePositions[i * 3 + 2] = radius * Math.cos(phi);

    particleSizes[i] = Math.random() * 0.05 + 0.01;
  }

  // Render different geometries based on modelType
  let geometry;
  switch (modelType) {
    case 'cube':
      geometry = <boxGeometry args={[1, 1, 1]} />;
      break;
    case 'torus':
      geometry = <torusGeometry args={[0.7, 0.3, 16, 100]} />;
      break;
    case 'crystal':
      geometry = <octahedronGeometry args={[1, 0]} />;
      break;
    case 'sphere':
    default:
      geometry = <sphereGeometry args={[1, 32, 32]} />;
  }

  return (
    <group position={position} scale={scale}>
      {/* Glow effect */}
      <mesh ref={glowRef} scale={1.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent={true}
          opacity={0.3}
        />
      </mesh>

      {/* Main model */}
      <mesh
        ref={modelRef}
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

      {/* Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={particlePositions}
            itemSize={3}
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-size"
            count={particleCount}
            array={particleSizes}
            itemSize={1}
            args={[particleSizes, 1]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={color}
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

// Scene component that contains all 3D elements
function CarouselScene({ currentIndex, onChangeIndex }: { currentIndex: number; onChangeIndex: (index: number) => void }) {
  const mousePosition = useRef({ x: 0, y: 0 });

  // Update mouse position for interactive effects
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse position to -1 to 1
      mousePosition.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Camera setup */}
      <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={50} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, 3, 0]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[5, -3, 0]} intensity={0.5} color="#22c55e" />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Models */}
      {carouselModels.map((model, index) => {
        // Calculate position based on index and current selection
        const angle = ((index - currentIndex) / carouselModels.length) * Math.PI * 2;
        const radius = 4;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius - radius;

        return (
          <DynamicModel
            key={model.id}
            modelType={model.modelType}
            color={model.color}
            position={[x, 0, z]}
            scale={1}
            isActive={index === currentIndex}
            onInteraction={() => onChangeIndex(index)}
          />
        );
      })}

      {/* Model info for current selection */}
      <group position={[0, -2, 0]}>
        <Text
          position={[0, 0, 0]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          {carouselModels[currentIndex].name}
        </Text>
        <Text
          position={[0, -0.5, 0]}
          fontSize={0.15}
          color="#cccccc"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#000000"
          maxWidth={4}
        >
          {carouselModels[currentIndex].description}
        </Text>
      </group>

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.5}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
    </>
  );
}

export default function EnhancedCarousel() {
  const [currentModelIndex, setCurrentModelIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Handle navigation
  const goToNextModel = () => {
    setCurrentModelIndex((prev) => (prev + 1) % carouselModels.length);
  };

  const goToPrevModel = () => {
    setCurrentModelIndex((prev) => (prev - 1 + carouselModels.length) % carouselModels.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="text-center">
            <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-white text-lg">Loading 3D Experience...</p>
          </div>
        </div>
      )}

      {/* Title overlay */}
      <div className="absolute top-0 left-0 right-0 z-20 pt-24 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
          <span className="bg-black/30 backdrop-blur-sm px-6 py-2 rounded-lg">
            Interactive 3D Gallery
          </span>
        </h1>
        <p className="text-xl text-white mt-4 max-w-2xl mx-auto bg-black/30 backdrop-blur-sm px-4 py-2 rounded-lg">
          Explore our collection of interactive 3D models and experiences
        </p>
      </div>

      {/* 3D Canvas */}
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 50 }}>
        <color attach="background" args={['#030712']} />
        <fog attach="fog" args={['#030712', 5, 15]} />
        <CarouselScene
          currentIndex={currentModelIndex}
          onChangeIndex={setCurrentModelIndex}
        />
      </Canvas>

      {/* Navigation controls */}
      <div className="absolute bottom-1/2 left-0 right-0 z-20 flex justify-between px-4 md:px-10">
        <motion.button
          className="bg-black/50 backdrop-blur-sm text-white rounded-full p-3 md:p-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goToPrevModel}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>
        <motion.button
          className="bg-black/50 backdrop-blur-sm text-white rounded-full p-3 md:p-4"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={goToNextModel}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {carouselModels.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentModelIndex
                ? 'bg-white scale-125 shadow-glow'
                : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => setCurrentModelIndex(index)}
            aria-label={`Go to model ${index + 1}`}
          />
        ))}
      </div>

      {/* Explore button */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
        <motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Explore Gallery
        </motion.button>
      </div>

      {/* Custom branding */}
      <div className="absolute bottom-4 right-4 text-white/70 text-xs z-30 flex items-center">
        <span className="mr-1">Powered by</span>
        <span className="font-bold">3D Gallery</span>
      </div>
    </div>
  );
}
