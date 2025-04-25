'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useAnimations, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Sample animation data
const animationModels = [
  {
    id: 1,
    name: 'Walking Character',
    description: 'A humanoid character with a walking animation cycle',
    modelPath: '/models/character.glb', // This is a placeholder path
    animationClips: ['walk', 'run', 'idle'],
    defaultAnimation: 'walk',
    cameraPosition: [0, 1, 3],
  },
  {
    id: 2,
    name: 'Mechanical Gear System',
    description: 'A complex mechanical system with synchronized moving parts',
    modelPath: '/models/mechanical.glb', // This is a placeholder path
    animationClips: ['rotate', 'accelerate', 'decelerate'],
    defaultAnimation: 'rotate',
    cameraPosition: [2, 1, 3],
  },
  {
    id: 3,
    name: 'Ocean Wave Simulation',
    description: 'Procedural animation of ocean waves with dynamic foam',
    modelPath: '/models/ocean.glb', // This is a placeholder path
    animationClips: ['calm', 'stormy', 'tsunami'],
    defaultAnimation: 'calm',
    cameraPosition: [0, 2, 5],
  },
];

// Placeholder model component since we don't have actual models
function PlaceholderModel({
  modelType,
  animationName,
  playbackSpeed,
  isPlaying
}: {
  modelType: string;
  animationName: string;
  playbackSpeed: number;
  isPlaying: boolean;
}) {
  const group = useRef<THREE.Group>(null!);
  const [hovered, setHovered] = useState(false);

  // Animation logic
  useEffect(() => {
    if (!group.current) return;

    let animationId: number;
    const animate = () => {
      if (isPlaying && group.current) {
        // Different animation based on model type and animation name
        if (modelType === 'character') {
          // Character rotation is always happening
          group.current.rotation.y += 0.01 * playbackSpeed;

          // Different animations based on selected animation
          if (animationName === 'walk') {
            // Walking animation - moderate movement
            group.current.children.forEach((child, index) => {
              if (child instanceof THREE.Mesh) {
                if (index === 1 || index === 3) { // Arms
                  (child as THREE.Mesh).rotation.x = Math.sin(Date.now() * 0.005 * playbackSpeed) * 0.5;
                }
                if (index === 2 || index === 4) { // Legs
                  (child as THREE.Mesh).rotation.x = Math.sin(Date.now() * 0.005 * playbackSpeed + (index === 4 ? Math.PI : 0)) * 0.5;
                }
              }
            });
          } else if (animationName === 'run') {
            // Running animation - faster and more exaggerated movement
            group.current.children.forEach((child, index) => {
              if (child instanceof THREE.Mesh) {
                if (index === 1 || index === 3) { // Arms
                  (child as THREE.Mesh).rotation.x = Math.sin(Date.now() * 0.01 * playbackSpeed) * 0.8;
                }
                if (index === 2 || index === 4) { // Legs
                  (child as THREE.Mesh).rotation.x = Math.sin(Date.now() * 0.01 * playbackSpeed + (index === 4 ? Math.PI : 0)) * 0.8;
                }
                // Add some vertical bounce for running
                if (index === 0) { // Body
                  (child as THREE.Mesh).position.y = Math.abs(Math.sin(Date.now() * 0.01 * playbackSpeed)) * 0.1;
                }
              }
            });
          } else if (animationName === 'idle') {
            // Idle animation - subtle breathing movement
            group.current.children.forEach((child, index) => {
              if (child instanceof THREE.Mesh) {
                if (index === 0) { // Body
                  (child as THREE.Mesh).position.y = Math.sin(Date.now() * 0.002 * playbackSpeed) * 0.05;
                }
                if (index === 1 || index === 3) { // Arms
                  (child as THREE.Mesh).rotation.x = Math.sin(Date.now() * 0.001 * playbackSpeed) * 0.1;
                }
                // Legs stay still in idle
              }
            });
          }
        } else if (modelType === 'mechanical') {
          // Different mechanical animations
          if (animationName === 'rotate') {
            // Standard rotation
            group.current.children.forEach((child, index) => {
              if (child instanceof THREE.Mesh) {
                child.rotation.z += 0.02 * playbackSpeed * (index % 2 === 0 ? 1 : -1);
              }
            });
          } else if (animationName === 'accelerate') {
            // Accelerating rotation with increasing speed
            const time = Date.now() * 0.001;
            const acceleration = Math.min(1 + time % 5 * 0.2, 2);

            group.current.children.forEach((child, index) => {
              if (child instanceof THREE.Mesh) {
                child.rotation.z += 0.02 * playbackSpeed * acceleration * (index % 2 === 0 ? 1 : -1);
              }
            });
          } else if (animationName === 'decelerate') {
            // Decelerating rotation with decreasing speed
            const time = Date.now() * 0.001;
            const deceleration = Math.max(0.2, 1 - (time % 5) * 0.15);

            group.current.children.forEach((child, index) => {
              if (child instanceof THREE.Mesh) {
                child.rotation.z += 0.02 * playbackSpeed * deceleration * (index % 2 === 0 ? 1 : -1);
              }
            });
          }
        } else if (modelType === 'ocean') {
          // Ocean animations
          if (animationName === 'calm') {
            // Calm waves - gentle and slow
            group.current.children.forEach((child) => {
              if (child instanceof THREE.Mesh && child.geometry instanceof THREE.PlaneGeometry) {
                const positions = child.geometry.attributes.position;
                const time = Date.now() * 0.0005 * playbackSpeed;

                for (let i = 0; i < positions.count; i++) {
                  const x = positions.getX(i);
                  const y = positions.getY(i);
                  const waveX1 = 0.05 * Math.sin(x * 1 + time);
                  const waveX2 = 0.03 * Math.sin(x * 2 + time * 1.5);
                  const waveY1 = 0.05 * Math.sin(y * 1 + time);
                  const waveY2 = 0.03 * Math.sin(y * 2 + time * 1.5);
                  const wave = waveX1 + waveX2 + waveY1 + waveY2;

                  positions.setZ(i, wave);
                }
                positions.needsUpdate = true;
              }
            });
          } else if (animationName === 'stormy') {
            // Stormy waves - higher amplitude and faster
            group.current.children.forEach((child) => {
              if (child instanceof THREE.Mesh && child.geometry instanceof THREE.PlaneGeometry) {
                const positions = child.geometry.attributes.position;
                const time = Date.now() * 0.001 * playbackSpeed;

                for (let i = 0; i < positions.count; i++) {
                  const x = positions.getX(i);
                  const y = positions.getY(i);
                  const waveX1 = 0.2 * Math.sin(x * 2 + time);
                  const waveX2 = 0.1 * Math.sin(x * 3 + time * 2);
                  const waveY1 = 0.2 * Math.sin(y * 2 + time);
                  const waveY2 = 0.1 * Math.sin(y * 3 + time * 2);
                  const wave = waveX1 + waveX2 + waveY1 + waveY2;

                  positions.setZ(i, wave);
                }
                positions.needsUpdate = true;
              }
            });
          } else if (animationName === 'tsunami') {
            // Tsunami waves - extreme amplitude and chaotic
            group.current.children.forEach((child) => {
              if (child instanceof THREE.Mesh && child.geometry instanceof THREE.PlaneGeometry) {
                const positions = child.geometry.attributes.position;
                const time = Date.now() * 0.002 * playbackSpeed;

                for (let i = 0; i < positions.count; i++) {
                  const x = positions.getX(i);
                  const y = positions.getY(i);
                  const waveX1 = 0.3 * Math.sin(x * 3 + time);
                  const waveX2 = 0.2 * Math.sin(x * 5 + time * 3);
                  const waveY1 = 0.3 * Math.sin(y * 3 + time);
                  const waveY2 = 0.2 * Math.sin(y * 5 + time * 3);
                  const chaos = 0.1 * Math.sin(x * y * 0.1 + time * 5);
                  const wave = waveX1 + waveX2 + waveY1 + waveY2 + chaos;

                  positions.setZ(i, wave);
                }
                positions.needsUpdate = true;
              }
            });
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, modelType, playbackSpeed, animationName]);

  // Create different placeholder models based on type
  let modelContent;

  if (modelType === 'character') {
    modelContent = (
      <>
        {/* Simple humanoid figure */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.5, 1, 0.3]} />
          <meshStandardMaterial color={hovered ? '#3b82f6' : '#60a5fa'} />
        </mesh>
        {/* Left arm */}
        <mesh position={[-0.4, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshStandardMaterial color={hovered ? '#3b82f6' : '#60a5fa'} />
        </mesh>
        {/* Right arm */}
        <mesh position={[0.4, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshStandardMaterial color={hovered ? '#3b82f6' : '#60a5fa'} />
        </mesh>
        {/* Left leg */}
        <mesh position={[-0.2, -1, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.2, 1, 0.2]} />
          <meshStandardMaterial color={hovered ? '#3b82f6' : '#60a5fa'} />
        </mesh>
        {/* Right leg */}
        <mesh position={[0.2, -1, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.2, 1, 0.2]} />
          <meshStandardMaterial color={hovered ? '#3b82f6' : '#60a5fa'} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color={hovered ? '#3b82f6' : '#60a5fa'} />
        </mesh>
      </>
    );
  } else if (modelType === 'mechanical') {
    modelContent = (
      <>
        {/* Central gear */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[1, 1, 0.2, 32, 1, false]} />
          <meshStandardMaterial color={hovered ? '#ef4444' : '#f87171'} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Gear teeth */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          const x = Math.cos(angle) * 1.2;
          const y = Math.sin(angle) * 1.2;
          return (
            <mesh key={i} position={[x, y, 0]} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.4, 0.2, 0.3]} />
              <meshStandardMaterial color={hovered ? '#ef4444' : '#f87171'} metalness={0.8} roughness={0.2} />
            </mesh>
          );
        })}
        {/* Smaller gears */}
        <mesh position={[2, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.2, 32, 1, false]} />
          <meshStandardMaterial color={hovered ? '#ef4444' : '#f87171'} metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-2, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.2, 32, 1, false]} />
          <meshStandardMaterial color={hovered ? '#ef4444' : '#f87171'} metalness={0.8} roughness={0.2} />
        </mesh>
      </>
    );
  } else if (modelType === 'ocean') {
    modelContent = (
      <>
        {/* Ocean plane */}
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[10, 10, 32, 32]} />
          <meshStandardMaterial
            color={hovered ? '#0ea5e9' : '#38bdf8'}
            wireframe={false}
            transparent={true}
            opacity={0.8}
          />
        </mesh>
        {/* Ocean floor */}
        <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[12, 12]} />
          <meshStandardMaterial color="#0c4a6e" />
        </mesh>
      </>
    );
  }

  return (
    <group
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {modelContent}
    </group>
  );
}

// Animation scene component
function AnimationScene({
  modelType,
  animationName,
  playbackSpeed,
  isPlaying,
  cameraPosition
}: {
  modelType: string;
  animationName: string;
  playbackSpeed: number;
  isPlaying: boolean;
  cameraPosition: [number, number, number];
}) {
  return (
    <>
      {/* Camera setup */}
      <PerspectiveCamera makeDefault position={cameraPosition} fov={50} />

      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />
      <pointLight position={[-5, 3, 0]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[5, -3, 0]} intensity={0.5} color="#22c55e" />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Placeholder model with animation */}
      <PlaceholderModel
        modelType={modelType}
        animationName={animationName}
        playbackSpeed={playbackSpeed}
        isPlaying={isPlaying}
      />

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={2}
        maxDistance={10}
      />
    </>
  );
}

// Timeline component
function Timeline({
  currentTime,
  duration,
  isPlaying,
  onTimeChange,
  onPlayPause,
  animationName
}: {
  currentTime: number;
  duration: number;
  isPlaying: boolean;
  onTimeChange: (time: number) => void;
  onPlayPause: () => void;
  animationName: string;
}) {
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Calculate progress percentage
  const progressPercent = (currentTime / duration) * 100;

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <div className="flex items-center mb-2">
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 mr-4 flex-shrink-0"
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </button>

        <div className="flex-1 mx-2">
          <div className="relative">
            <div className="w-full h-2 bg-gray-700 rounded-lg overflow-hidden">
              <div
                className="h-full bg-blue-600 transition-all duration-300 ease-linear"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => onTimeChange(Number(e.target.value))}
              className="absolute inset-0 w-full h-2 opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-gray-400">
            <span>0:00</span>
            <span className="text-blue-400">{animationName}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="text-white text-sm ml-2 flex-shrink-0 w-20 text-right">
          {formatTime(currentTime)} / {formatTime(duration)}
        </div>
      </div>
    </div>
  );
}

export default function AnimationShowcase() {
  const [selectedModelId, setSelectedModelId] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(60); // Default 60 seconds
  const [selectedAnimation, setSelectedAnimation] = useState('');

  const selectedModel = animationModels.find(m => m.id === selectedModelId) || animationModels[0];

  // Set default animation when model changes
  useEffect(() => {
    setSelectedAnimation(selectedModel.defaultAnimation);
  }, [selectedModel]);

  // Function to handle animation selection
  const handleAnimationChange = (animationName: string) => {
    setSelectedAnimation(animationName);
    // Reset animation time when changing animations
    setCurrentTime(0);
  };

  // Update current time when playing
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= duration) {
          return 0;
        }
        return prev + 0.1 * playbackSpeed;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, duration, playbackSpeed]);

  // Handle play/pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handle time change
  const handleTimeChange = (time: number) => {
    setCurrentTime(time);
  };

  // Get model type for placeholder
  const getModelType = () => {
    if (selectedModel.id === 1) return 'character';
    if (selectedModel.id === 2) return 'mechanical';
    if (selectedModel.id === 3) return 'ocean';
    return 'character';
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">3D Animation Showcase</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore animated 3D models with our interactive viewer. Control playback, adjust speed, and view animations from different angles.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 3D Viewer */}
          <div className="lg:w-2/3 bg-gray-800 rounded-xl overflow-hidden shadow-2xl h-[500px]">
            <Canvas dpr={[1, 2]} shadows>
              <color attach="background" args={['#1a1a1a']} />
              <fog attach="fog" args={['#1a1a1a', 5, 15]} />
              <AnimationScene
                modelType={getModelType()}
                animationName={selectedAnimation}
                playbackSpeed={playbackSpeed}
                isPlaying={isPlaying}
                cameraPosition={selectedModel.cameraPosition as [number, number, number]}
              />
            </Canvas>
          </div>

          {/* Controls Panel */}
          <div className="lg:w-1/3">
            <motion.div
              className="bg-gray-800 rounded-xl p-6 shadow-xl"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-white">Animation Controls</h3>
              </div>

              {/* Model Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Select Model</label>
                <div className="grid grid-cols-1 gap-2">
                  {animationModels.map((model) => (
                    <button
                      key={model.id}
                      className={`p-3 rounded-lg text-left transition ${
                        model.id === selectedModelId
                          ? 'bg-blue-600 text-white relative'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => setSelectedModelId(model.id)}
                    >
                      <div className="font-medium">{model.name}</div>
                      <div className="text-xs mt-1 opacity-80">{model.description}</div>
                      {model.id === selectedModelId && (
                        <div className="absolute top-0 left-0 w-1 h-full bg-white rounded-l-lg"></div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Available animations: {selectedModel.animationClips.join(', ')}
                </p>
              </div>

              {/* Animation Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Animation</label>
                <div className="grid grid-cols-3 gap-2">
                  {selectedModel.animationClips.map((clip) => (
                    <button
                      key={clip}
                      className={`p-2 rounded-lg text-center transition ${
                        clip === selectedAnimation
                          ? 'bg-blue-600 text-white relative'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => handleAnimationChange(clip)}
                    >
                      {clip}
                      {clip === selectedAnimation && (
                        <span className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                          <span className="flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                          </span>
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Current animation: <span className="text-blue-400 font-medium">{selectedAnimation}</span>
                </p>
              </div>

              {/* Playback Speed */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Playback Speed</label>
                <div className="flex items-center">
                  <button
                    className="bg-gray-700 hover:bg-gray-600 text-white rounded p-1"
                    onClick={() => setPlaybackSpeed(Math.max(0.25, playbackSpeed - 0.25))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>

                  <div className="flex-1 mx-3">
                    <input
                      type="range"
                      min={0.25}
                      max={2}
                      step={0.25}
                      value={playbackSpeed}
                      onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>

                  <button
                    className="bg-gray-700 hover:bg-gray-600 text-white rounded p-1"
                    onClick={() => setPlaybackSpeed(Math.min(2, playbackSpeed + 0.25))}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>

                  <span className="ml-3 text-white text-sm min-w-[40px]">{playbackSpeed}x</span>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-300 mb-2">Timeline</label>
                <Timeline
                  currentTime={currentTime}
                  duration={duration}
                  isPlaying={isPlaying}
                  onTimeChange={handleTimeChange}
                  onPlayPause={handlePlayPause}
                  animationName={selectedAnimation}
                />
              </div>

              {/* Camera Controls Info */}
              <div className="bg-gray-700/50 rounded-lg p-4 text-sm text-gray-300">
                <h4 className="font-medium text-white mb-2">Camera Controls</h4>
                <ul className="space-y-1">
                  <li>• Left-click + drag: Rotate camera</li>
                  <li>• Right-click + drag: Pan camera</li>
                  <li>• Scroll: Zoom in/out</li>
                  <li>• Double-click: Reset camera</li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
