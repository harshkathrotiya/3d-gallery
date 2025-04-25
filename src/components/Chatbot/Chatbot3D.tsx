'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import ChatbotUI from './ChatbotUI';

// Animated floating sphere
function FloatingSphere({
  position,
  color,
  size = 0.5,
  speed = 1
}: {
  position: [number, number, number];
  color: string;
  size?: number;
  speed?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [scale, setScale] = useState(1);

  // Handle hover effect
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto';
  }, [hovered]);

  // Continuous animation with useFrame
  useFrame((state) => {
    if (!mesh.current) return;

    // Gentle floating motion
    mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.1;

    // Slow rotation
    mesh.current.rotation.x = state.clock.elapsedTime * 0.2;
    mesh.current.rotation.z = state.clock.elapsedTime * 0.1;

    // Smooth scale transition
    if (hovered && scale < 1.2) {
      setScale(prev => Math.min(prev + 0.02, 1.2));
    } else if (!hovered && scale > 1) {
      setScale(prev => Math.max(prev - 0.02, 1));
    }

    mesh.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh
      ref={mesh}
      position={position}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

// Animated particles
function Particles({
  count = 50,
  color = '#3b82f6'
}: {
  count?: number;
  color?: string;
}) {
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const [positions] = useState(() => {
    const positions = [];
    for (let i = 0; i < count; i++) {
      positions.push({
        position: [
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3,
          (Math.random() - 0.5) * 3
        ],
        speed: Math.random() * 0.2 + 0.05,
        offset: Math.random() * Math.PI * 2
      });
    }
    return positions;
  });

  useFrame((state) => {
    if (!mesh.current) return;

    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const { position, speed, offset } = positions[i];

      // Update matrix for each instance
      const matrix = new THREE.Matrix4();

      // Calculate new position with gentle floating motion
      const x = position[0];
      const y = position[1] + Math.sin(time * speed + offset) * 0.2;
      const z = position[2] + Math.cos(time * speed + offset) * 0.2;

      // Set position and scale
      matrix.setPosition(x, y, z);
      matrix.scale(new THREE.Vector3(0.05, 0.05, 0.05));

      // Update the instance
      mesh.current.setMatrixAt(i, matrix);
    }

    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.5}
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}

// Main 3D scene
function ChatbotScene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

      {/* Ambient light */}
      <ambientLight intensity={0.2} />

      {/* Main directional light */}
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#ffffff" />

      {/* Accent lights */}
      <pointLight position={[-3, 2, -2]} intensity={0.5} color="#3b82f6" />
      <pointLight position={[3, -2, 2]} intensity={0.5} color="#8b5cf6" />

      {/* Main floating sphere */}
      <FloatingSphere position={[0, 0, 0]} color="#3b82f6" size={0.8} speed={0.5} />

      {/* Smaller orbiting spheres */}
      <FloatingSphere position={[1.2, 0.5, -0.5]} color="#8b5cf6" size={0.3} speed={0.8} />
      <FloatingSphere position={[-1.2, -0.5, 0.5]} color="#06b6d4" size={0.2} speed={1.2} />
      <FloatingSphere position={[0.8, -0.8, -0.3]} color="#ec4899" size={0.15} speed={1.5} />

      {/* Background particles */}
      <Particles count={30} color="#3b82f6" />
    </>
  );
}

export default function Chatbot3D() {
  return (
    <>
      {/* 3D Canvas for the chatbot button */}
      <div className="fixed bottom-4 right-4 w-16 h-16 z-50">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 50 }}>
          <color attach="background" args={['#00000000']} />
          <ChatbotScene />
        </Canvas>
      </div>

      {/* Regular chatbot UI */}
      <ChatbotUI />
    </>
  );
}
