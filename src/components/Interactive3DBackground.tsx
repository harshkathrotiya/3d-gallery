'use client';

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Text } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Enhanced floating 3D object with more dynamic animations
function FloatingObject({ position, size, color, speed, mouseRef, scrollY = 0 }: {
  position: [number, number, number];
  size: number;
  color: string;
  speed: number;
  mouseRef: React.RefObject<{x: number, y: number}>;
  scrollY?: number;
}) {
  const mesh = useRef<THREE.Mesh>(null!);
  const glow = useRef<THREE.Mesh>(null!);
  const initialPosition = useRef(position);
  const [hovered, setHovered] = useState(false);

  // Animation parameters
  const rotationSpeed = useRef({
    x: THREE.MathUtils.randFloat(0.1, 0.3) * (Math.random() > 0.5 ? 1 : -1),
    y: THREE.MathUtils.randFloat(0.1, 0.3) * (Math.random() > 0.5 ? 1 : -1),
    z: THREE.MathUtils.randFloat(0.05, 0.15) * (Math.random() > 0.5 ? 1 : -1)
  });

  // Handle hover state
  const onPointerOver = useCallback(() => setHovered(true), []);
  const onPointerOut = useCallback(() => setHovered(false), []);

  // Apply effects when hover state changes
  useEffect(() => {
    if (!mesh.current || !glow.current) return;

    // Use GSAP for smooth animations
    gsap.to(mesh.current.scale, {
      x: hovered ? 1.2 : 1,
      y: hovered ? 1.2 : 1,
      z: hovered ? 1.2 : 1,
      duration: 0.4,
      ease: 'power2.out'
    });

    gsap.to(glow.current.material, {
      opacity: hovered ? 0.3 : 0.15,
      emissiveIntensity: hovered ? 1 : 0.5,
      duration: 0.4,
      ease: 'power2.out'
    });
  }, [hovered]);

  useFrame((state, delta) => {
    if (!mesh.current || !glow.current) return;

    // Enhanced floating animation with multiple sine waves
    const time = state.clock.elapsedTime;
    mesh.current.position.y = initialPosition.current[1] +
      Math.sin(time * speed) * 0.1 +
      Math.sin(time * speed * 1.5) * 0.05;

    // Parallax effect based on scroll position
    const scrollEffect = scrollY * 0.1;
    mesh.current.position.z = initialPosition.current[2] - scrollEffect;
    glow.current.position.z = initialPosition.current[2] - scrollEffect;

    // React to mouse movement with enhanced responsiveness
    if (mouseRef.current) {
      const mouseInfluence = hovered ? 0.15 : 0.05;
      mesh.current.position.x = initialPosition.current[0] + (mouseRef.current.x * mouseInfluence);
      glow.current.position.x = mesh.current.position.x;
      glow.current.position.y = mesh.current.position.y;
    }

    // Dynamic rotation with varying speeds
    mesh.current.rotation.x += delta * rotationSpeed.current.x;
    mesh.current.rotation.y += delta * rotationSpeed.current.y;
    mesh.current.rotation.z += delta * rotationSpeed.current.z;

    // Pulse the glow effect
    const pulseScale = 1.3 + Math.sin(time * 2) * 0.05;
    glow.current.scale.set(pulseScale, pulseScale, pulseScale);
  });

  return (
    <group>
      {/* Enhanced glowing halo with pulsing effect */}
      <mesh ref={glow} position={position} scale={1.3}>
        <sphereGeometry args={[size * 1.2, 24, 24]} />
        <meshStandardMaterial
          color={color}
          transparent={true}
          opacity={0.15}
          emissive={color}
          emissiveIntensity={0.5}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Main object with interactive hover */}
      <mesh
        ref={mesh}
        position={position}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        <octahedronGeometry args={[size, 2]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.2}
          metalness={0.9}
          emissive={color}
          emissiveIntensity={0.3}
          clearcoat={0.5}
          clearcoatRoughness={0.3}
          reflectivity={1}
        />
      </mesh>
    </group>
  );
}

// Enhanced project card with 3D effects and horizontal scrolling support
function ProjectCard({
  position,
  color,
  title,
  description,
  imageUrl: customImageUrl,
  index,
  currentIndex,
  mouseRef,
  scrollProgress = 0,
  onClick
}: {
  position: [number, number, number];
  color: string;
  title: string;
  description?: string;
  imageUrl?: string;
  index: number;
  currentIndex: number;
  mouseRef: React.RefObject<{x: number, y: number}>;
  scrollProgress?: number;
  onClick?: () => void;
}) {
  const group = useRef<THREE.Group>(null!);
  const mesh = useRef<THREE.Mesh>(null!);
  const frame = useRef<THREE.Mesh>(null!);
  const initialPosition = useRef(position);
  const [hovered, setHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  // Calculate if this card is active
  const isActive = index === currentIndex;

  // Handle hover state
  const onPointerOver = useCallback(() => setHovered(true), []);
  const onPointerOut = useCallback(() => setHovered(false), []);
  const onPointerClick = useCallback(() => onClick && onClick(), [onClick]);

  // Use lower resolution images initially, then load higher quality ones
  const imageUrl = useMemo(() => {
    if (customImageUrl) return customImageUrl;

    // Default images if none provided
    const lowResUrls = [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=60',
      'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=400&q=60',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=400&q=60',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=400&q=60'
    ];

    return lowResUrls[index % lowResUrls.length];
  }, [customImageUrl, index]);

  // High resolution images for active state
  const highResImageUrl = useMemo(() => {
    if (customImageUrl) {
      // If custom URL provided, create high-res version by removing size constraints
      return customImageUrl.replace(/w=\d+&q=\d+/, 'w=1200&q=80');
    }

    const highResUrls = [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1200&q=80'
    ];

    return highResUrls[index % highResUrls.length];
  }, [customImageUrl, index]);

  // Apply effects when active state or hover state changes
  useEffect(() => {
    if (!mesh.current || !frame.current || !group.current) return;

    // Use GSAP for smooth animations
    gsap.to(group.current.position, {
      y: isActive ? 0.2 : 0,
      duration: 0.5,
      ease: 'power2.out'
    });

    gsap.to(mesh.current.scale, {
      x: isActive ? 1.1 : hovered ? 1.05 : 1,
      y: isActive ? 1.1 : hovered ? 1.05 : 1,
      z: isActive ? 1.1 : hovered ? 1.05 : 1,
      duration: 0.4,
      ease: 'back.out(1.5)'
    });

    gsap.to(frame.current.material, {
      emissiveIntensity: isActive ? 0.8 : hovered ? 0.5 : 0.2,
      opacity: isActive ? 0.8 : hovered ? 0.6 : 0.3,
      duration: 0.4,
      ease: 'power2.out'
    });
  }, [isActive, hovered]);

  // Preload the image as a texture with optimizations
  useEffect(() => {
    if (!imageUrl) return;

    // Create a single shared loader for all textures
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';

    // Load low-res version first
    textureLoader.load(
      imageUrl,
      (loadedTexture) => {
        // Apply optimizations
        loadedTexture.generateMipmaps = false; // Disable mipmaps for faster loading
        loadedTexture.minFilter = THREE.LinearFilter;
        loadedTexture.magFilter = THREE.LinearFilter;
        loadedTexture.needsUpdate = true;
        setTexture(loadedTexture);
        setImageLoaded(true);

        // Then load high-res version if this is the active card
        if (isActive) {
          textureLoader.load(
            highResImageUrl,
            (highResTexture) => {
              highResTexture.generateMipmaps = false;
              highResTexture.minFilter = THREE.LinearFilter;
              highResTexture.magFilter = THREE.LinearFilter;
              highResTexture.anisotropy = 4; // Lower anisotropy for better performance
              highResTexture.needsUpdate = true;

              // Replace the texture with high-res version
              setTexture(highResTexture);

              // Dispose of the low-res texture to free memory
              loadedTexture.dispose();
            }
          );
        }
      },
      undefined,
      (error) => {
        console.error('Error loading texture:', error, imageUrl);
        setImageError(true);
      }
    );

    return () => {
      if (texture) {
        texture.dispose();
      }
    };
  }, [imageUrl, isActive, highResImageUrl, texture]);

  // Load high-res version when card becomes active
  useEffect(() => {
    if (isActive && imageLoaded && texture) {
      const textureLoader = new THREE.TextureLoader();
      textureLoader.crossOrigin = 'anonymous';

      textureLoader.load(
        highResImageUrl,
        (highResTexture) => {
          highResTexture.generateMipmaps = false;
          highResTexture.minFilter = THREE.LinearFilter;
          highResTexture.magFilter = THREE.LinearFilter;
          highResTexture.anisotropy = 4;
          highResTexture.needsUpdate = true;

          // Replace with high-res texture
          const oldTexture = texture;
          setTexture(highResTexture);

          // Dispose of the old texture
          oldTexture.dispose();
        }
      );
    }
  }, [isActive, imageLoaded, highResImageUrl, texture]);

  // Convert hex color to THREE.Color
  const threeColor = useMemo(() => new THREE.Color(color), [color]);

  // Calculate position based on scroll progress for horizontal scrolling
  useFrame((state, delta) => {
    if (!group.current || !mesh.current) return;

    // Calculate horizontal position based on scroll
    // This creates a horizontal scrolling effect
    const targetX = initialPosition.current[0] - scrollProgress * 5;
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, targetX, delta * 3);

    // Gentle floating animation
    const floatY = Math.sin(state.clock.elapsedTime * 0.5 + index) * 0.05;
    group.current.position.y = (isActive ? 0.2 : 0) + floatY;

    // React to mouse movement if mouseRef is provided
    if (mouseRef.current) {
      const mouseInfluence = isActive ? 0.1 : hovered ? 0.05 : 0.02;
      group.current.position.z = initialPosition.current[2] + (mouseRef.current.y * mouseInfluence);
    }

    // Rotation effects
    if (!isActive) {
      // Gentle rotation for non-active cards
      mesh.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3 + index) * 0.1;
    } else {
      // Smoothly rotate active card to face camera
      mesh.current.rotation.y = THREE.MathUtils.lerp(
        mesh.current.rotation.y,
        0,
        delta * 3
      );
    }

    // Parallax effect - cards further from center move faster
    const distanceFromCenter = Math.abs(index - currentIndex);
    const parallaxFactor = 1 + distanceFromCenter * 0.2;
    group.current.position.z = initialPosition.current[2] * parallaxFactor;
  });

  return (
    <group ref={group} position={position}>
      {/* Enhanced glowing frame with better visual effects */}
      <mesh
        ref={frame}
        position={[0, 0, -0.05]}
        scale={isActive ? 1.3 : hovered ? 1.2 : 1.1}
      >
        <boxGeometry args={[1.8, 1.3, 0.1]} />
        <meshStandardMaterial
          color={threeColor}
          emissive={threeColor}
          emissiveIntensity={isActive ? 0.8 : hovered ? 0.5 : 0.2}
          transparent={true}
          opacity={isActive ? 0.8 : hovered ? 0.6 : 0.3}
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>

      {/* Main card with image texture and interactive behavior */}
      <mesh
        ref={mesh}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
        onClick={onPointerClick}
      >
        <planeGeometry args={[1.6, 1.1]} />
        <meshPhysicalMaterial
          color="white"
          map={texture || undefined}
          transparent={false}
          opacity={1.0}
          side={THREE.DoubleSide}
          roughness={0.2}
          clearcoat={0.5}
          reflectivity={0.5}
        />
      </mesh>

      {/* Project title with enhanced styling */}
      <mesh position={[0, -0.7, 0.1]} scale={isActive ? 1.1 : 1}>
        <planeGeometry args={[1.5, 0.25]} />
        <meshBasicMaterial color={threeColor} transparent opacity={0.9} />
        <Text
          position={[0, 0, 0.01]}
          fontSize={0.1}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          outlineWidth={0.005}
          outlineColor="#000000"
        >
          {title || `Project ${index + 1}`}
        </Text>
      </mesh>

      {/* Loading indicator */}
      {!imageLoaded && (
        <mesh position={[0, 0, 0.15]}>
          <Text
            fontSize={0.15}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.01}
            outlineColor="#000000"
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          >
            {imageError ? "Image failed to load" : "Loading..."}
          </Text>
        </mesh>
      )}

      {/* View button for active state with enhanced styling */}
      {isActive && imageLoaded && (
        <group position={[0, 0.65, 0.1]}>
          <mesh position={[0, 0, 0]} scale={hovered ? 1.1 : 1}>
            <planeGeometry args={[0.6, 0.2]} />
            <meshBasicMaterial color={threeColor} transparent opacity={0.9} />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.09}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          >
            VIEW
          </Text>
        </group>
      )}
    </group>
  );
}

// Enhanced particles background with depth and motion effects
function ParticleField({ mouseRef, scrollProgress = 0 }: {
  mouseRef: React.RefObject<{x: number, y: number}>,
  scrollProgress?: number
}) {
  const points = useRef<THREE.Points>(null!);
  const particleCount = 1500; // Increased particle count for more density
  const particleGroupCount = 3; // Create multiple particle groups for depth effect

  // Create particles with different sizes and colors
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 20;     // Wider X spread for horizontal scrolling
      positions[i3 + 1] = (Math.random() - 0.5) * 10; // Y spread
      positions[i3 + 2] = (Math.random() - 0.5) * 15; // Z depth
    }
    return positions;
  }, [particleCount]);

  // Create different sizes for particles with more variation
  const particleSizes = useMemo(() => {
    const sizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      // More variation in sizes for depth perception
      sizes[i] = Math.random() * 0.015 + 0.003;
    }
    return sizes;
  }, [particleCount]);

  // Create colors for particles
  const particleColors = useMemo(() => {
    const colors = new Float32Array(particleCount * 3);
    const color1 = new THREE.Color('#334155'); // Base color
    const color2 = new THREE.Color('#1e40af'); // Accent color 1
    const color3 = new THREE.Color('#3b82f6'); // Accent color 2

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      let color;

      // Randomly select colors with weighted distribution
      const rand = Math.random();
      if (rand < 0.7) {
        color = color1;
      } else if (rand < 0.9) {
        color = color2;
      } else {
        color = color3;
      }

      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    return colors;
  }, [particleCount]);

  useFrame((state, delta) => {
    if (!points.current) return;

    // Enhanced rotation with time-based variation
    const time = state.clock.elapsedTime;
    points.current.rotation.y = Math.sin(time * 0.05) * 0.2 + delta * 0.01;
    points.current.rotation.x = Math.cos(time * 0.05) * 0.1;

    // Parallax effect based on scroll position
    points.current.position.x = -scrollProgress * 0.5;

    // Enhanced mouse interaction with depth effect
    if (mouseRef.current) {
      points.current.rotation.y += mouseRef.current.x * delta * 0.02;
      points.current.rotation.x += mouseRef.current.y * delta * 0.01;

      // Subtle position shift based on mouse
      points.current.position.z = mouseRef.current.y * 0.2;
    }
  });

  // Create buffer geometry with colors
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(particlesPosition, 3));
    geo.setAttribute('size', new THREE.Float32BufferAttribute(particleSizes, 1));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(particleColors, 3));
    return geo;
  }, [particlesPosition, particleSizes, particleColors]);

  // Create multiple particle groups for layered depth effect
  return (
    <group>
      {Array.from({ length: particleGroupCount }).map((_, groupIndex) => (
        <points key={groupIndex} ref={groupIndex === 0 ? points : undefined}
                position={[0, 0, -5 + groupIndex * 5]}
                rotation={[0, groupIndex * Math.PI / 6, 0]}
                geometry={geometry}>
          <pointsMaterial
            size={0.5}
            sizeAttenuation
            transparent
            opacity={0.15 - groupIndex * 0.03} // Different opacity per layer
            vertexColors
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      ))}
    </group>
  );
}

// Mouse tracker to handle mouse movement
function MouseTracker({ mouseRef }: { mouseRef: React.RefObject<{x: number, y: number}> }) {
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (mouseRef.current) {
        // Convert mouse position to normalized device coordinates (-1 to +1)
        mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseRef, viewport]);

  return null;
}

// Scene component that manages the 3D environment and scrolling
function Scene({
  projects,
  currentIndex,
  onChangeIndex,
  scrollProgress
}: {
  projects: { title: string; description?: string; imageUrl?: string; color?: string }[];
  currentIndex: number;
  onChangeIndex: (index: number) => void;
  scrollProgress: number;
}) {
  const mouseRef = useRef({ x: 0, y: 0 });

  return (
    <>
      {/* Enhanced lighting for better visual quality */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={1} color="#5f5fff" />
      <pointLight position={[5, -5, -5]} intensity={0.5} color="#ff5f5f" />

      {/* Dynamic camera that responds to scroll */}
      <PerspectiveCamera
        makeDefault
        position={[0, 0, 5 + Math.sin(scrollProgress * 0.1) * 0.5]}
        fov={50 - Math.sin(scrollProgress * 0.05) * 2}
        near={0.1}
        far={100}
      />

      {/* Decorative floating objects with enhanced animations */}
      <FloatingObject position={[-3, 1.5, -3]} size={0.25} color="#ff5f5f" speed={1.2} mouseRef={mouseRef} scrollY={scrollProgress} />
      <FloatingObject position={[3, -1.5, -2]} size={0.35} color="#5f5fff" speed={0.8} mouseRef={mouseRef} scrollY={scrollProgress} />
      <FloatingObject position={[-2.5, -2, -4]} size={0.2} color="#5fff5f" speed={1.5} mouseRef={mouseRef} scrollY={scrollProgress} />
      <FloatingObject position={[2.5, 2, -3.5]} size={0.3} color="#ffff5f" speed={1} mouseRef={mouseRef} scrollY={scrollProgress} />
      <FloatingObject position={[0, 3, -5]} size={0.4} color="#f59e0b" speed={0.7} mouseRef={mouseRef} scrollY={scrollProgress} />

      {/* Project cards with horizontal layout */}
      {projects.map((project, index) => {
        // Calculate horizontal position with spacing
        const spacing = 2.5; // Space between cards
        const x = index * spacing - (projects.length * spacing / 2) + spacing / 2;

        return (
          <ProjectCard
            key={index}
            position={[x, 0, -3]} // All cards on same z-plane initially
            color={project.color || '#3b82f6'}
            title={project.title || `Project ${index + 1}`}
            description={project.description}
            imageUrl={project.imageUrl}
            index={index}
            currentIndex={currentIndex}
            mouseRef={mouseRef}
            scrollProgress={scrollProgress}
            onClick={() => onChangeIndex(index)}
          />
        );
      })}

      {/* Enhanced particle field with scroll effects */}
      <ParticleField mouseRef={mouseRef} scrollProgress={scrollProgress} />

      {/* Mouse tracker */}
      <MouseTracker mouseRef={mouseRef} />

      {/* Environment map for reflections */}
      <Environment preset="night" />
    </>
  );
}

// Scroll handler component to manage scroll state
function ScrollHandler({
  children,
  onScroll
}: {
  children: React.ReactNode;
  onScroll: (progress: number) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      // Calculate scroll progress (0 to 1)
      const scrollMax = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
      const scrollProgress = scrollRef.current.scrollLeft / scrollMax;
      onScroll(scrollProgress);
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, [onScroll]);

  return (
    <div
      ref={scrollRef}
      className="absolute inset-0 overflow-x-auto overflow-y-hidden scrollbar-hide"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Create a wide scrollable area */}
      <div className="w-[300vw] h-full">{children}</div>
    </div>
  );
}

// Main component with horizontal scrolling
export default function Interactive3DBackground({
  images,
  currentIndex,
  onChangeIndex
}: {
  images: { src: string; alt: string; color?: string }[];
  currentIndex: number;
  onChangeIndex: (index: number) => void;
}) {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Convert images to project format
  const projects = useMemo(() => {
    return images.map((image, index) => ({
      title: image.alt,
      imageUrl: image.src,
      color: image.color,
      description: `Project ${index + 1} description`
    }));
  }, [images]);

  // Preload all textures when component mounts
  useEffect(() => {
    // Create a shared texture loader
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'anonymous';

    // Preload all images
    images.forEach(image => {
      if (image.src) {
        const img = new Image();
        img.src = image.src;
      }
    });
  }, [images]);

  // Performance optimization for Canvas
  const dpr = typeof window !== 'undefined' ?
    [Math.min(window.devicePixelRatio, 2), Math.min(window.devicePixelRatio, 2)] as [number, number] :
    [1, 2] as [number, number];

  // Handle scroll updates
  const handleScroll = useCallback((progress: number) => {
    setScrollProgress(progress);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Scrollable container */}
      <ScrollHandler onScroll={handleScroll}>
        {/* This div is just for scroll area */}
        <div className="w-full h-full" />
      </ScrollHandler>

      {/* Canvas with 3D scene */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas dpr={dpr} camera={{ position: [0, 0, 5], fov: 50 }} performance={{ min: 0.5 }}>
          <color attach="background" args={['#030712']} />
          <fog attach="fog" args={['#030712', 5, 15]} />

          <Scene
            projects={projects}
            currentIndex={currentIndex}
            onChangeIndex={onChangeIndex}
            scrollProgress={scrollProgress}
          />

          {/* Controls - disabled rotation for horizontal scrolling experience */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={false}
            makeDefault
          />
        </Canvas>
      </div>

      {/* Navigation controls with enhanced styling */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-6 z-10">
        <button
          onClick={() => onChangeIndex((currentIndex - 1 + images.length) % images.length)}
          className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full hover:bg-white/20 transition-all hover:scale-105 shadow-lg"
        >
          Previous
        </button>
        <button
          onClick={() => onChangeIndex((currentIndex + 1) % images.length)}
          className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-full hover:bg-white/20 transition-all hover:scale-105 shadow-lg"
        >
          Next
        </button>
      </div>

      {/* Project indicators with enhanced styling */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => onChangeIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentIndex ? 'bg-white scale-150 shadow-glow' : 'bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>

      {/* Add custom CSS for glow effect */}
      <style jsx global>{`
        .shadow-glow {
          box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.7);
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
