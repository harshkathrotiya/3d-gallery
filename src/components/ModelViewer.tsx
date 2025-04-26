'use client';

import { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows, useHelper } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Sample models for the viewer
const availableModels = [
  {
    id: 1,
    name: 'Geometric Sphere',
    description: 'A complex geometric sphere with dynamic material properties',
    geometry: 'sphere',
    defaultColor: '#3b82f6',
  },
  {
    id: 2,
    name: 'Torus Knot',
    description: 'An intricate torus knot with customizable parameters',
    geometry: 'torusKnot',
    defaultColor: '#06b6d4',
  },
  {
    id: 3,
    name: 'Icosahedron',
    description: 'A regular icosahedron with 20 triangular faces',
    geometry: 'icosahedron',
    defaultColor: '#22c55e',
  },
  {
    id: 4,
    name: 'Dodecahedron',
    description: 'A regular dodecahedron with 12 pentagonal faces',
    geometry: 'dodecahedron',
    defaultColor: '#eab308',
  },
];

// Model component that renders different geometries
import React from 'react';

const Model = React.forwardRef(({
  geometry,
  color,
  roughness,
  metalness,
  wireframe
}: {
  geometry: string;
  color: string;
  roughness: number;
  metalness: number;
  wireframe: boolean;
}, ref: React.ForwardedRef<THREE.Mesh>) => {
  const localMeshRef = useRef<THREE.Mesh>(null!);
  const meshRef = (ref as React.RefObject<THREE.Mesh>) || localMeshRef;

  // Render different geometries based on type
  let geometryComponent;
  switch (geometry) {
    case 'torusKnot':
      geometryComponent = <torusKnotGeometry args={[1, 0.3, 128, 32]} />;
      break;
    case 'icosahedron':
      geometryComponent = <icosahedronGeometry args={[1, 1]} />;
      break;
    case 'dodecahedron':
      geometryComponent = <dodecahedronGeometry args={[1]} />;
      break;
    case 'sphere':
    default:
      geometryComponent = <sphereGeometry args={[1, 64, 64]} />;
  }

  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      {geometryComponent}
      <meshPhysicalMaterial
        color={color}
        roughness={roughness}
        metalness={metalness}
        wireframe={wireframe}
        clearcoat={0.5}
        reflectivity={1}
      />
    </mesh>
  );
});

// Scene component with lighting and environment
function ModelViewerScene({
  modelGeometry,
  modelColor,
  roughness,
  metalness,
  wireframe,
  lightIntensity,
  lightColor,
  showGrid,
  environmentPreset,
  ambientIntensity,
  enableBloom,
  enableRotation
}: {
  modelGeometry: string;
  modelColor: string;
  roughness: number;
  metalness: number;
  wireframe: boolean;
  lightIntensity: number;
  lightColor: string;
  showGrid: boolean;
  environmentPreset: string;
  ambientIntensity: number;
  enableBloom: boolean;
  enableRotation: boolean;
}) {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);

  // Optional helper for the directional light
  useHelper(showGrid ? directionalLightRef : null, THREE.DirectionalLightHelper, 1, 'red');

  // Auto-rotation effect
  useEffect(() => {
    if (!enableRotation || !meshRef.current) return;

    const interval = setInterval(() => {
      if (meshRef.current) {
        meshRef.current.rotation.y += 0.01;
      }
    }, 16);

    return () => clearInterval(interval);
  }, [enableRotation]);

  // Use the meshRef directly with the Model component

  return (
    <>
      {/* Camera setup */}
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />

      {/* Lighting */}
      <ambientLight intensity={ambientIntensity} />
      <directionalLight
        ref={directionalLightRef}
        position={[5, 5, 5]}
        intensity={lightIntensity}
        color={lightColor}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Add a secondary light for more dimension */}
      <pointLight
        position={[-5, -3, -5]}
        intensity={lightIntensity * 0.5}
        color="#ffffff"
      />

      {/* Environment for reflections */}
      <Environment preset={environmentPreset} />

      {/* Bloom effect */}
      {enableBloom && (
        <mesh position={[0, 0, -5]}>
          <sphereGeometry args={[0.5, 16, 16]} />
          <meshBasicMaterial color={modelColor} toneMapped={false} />
        </mesh>
      )}

      {/* Model */}
      <Model
        ref={meshRef}
        geometry={modelGeometry}
        color={modelColor}
        roughness={roughness}
        metalness={metalness}
        wireframe={wireframe}
      />

      {/* Ground with shadows */}
      {showGrid && (
        <>
          <gridHelper args={[10, 10]} />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.5}
            scale={10}
            blur={1}
            far={5}
            resolution={256}
          />
        </>
      )}

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

// Color picker component
function ColorPicker({ color, onChange }: { color: string; onChange: (color: string) => void }) {
  const colors = ['#3b82f6', '#06b6d4', '#22c55e', '#eab308', '#ec4899', '#8b5cf6', '#ef4444', '#f97316'];

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {colors.map((c) => (
        <button
          key={c}
          className={`w-8 h-8 rounded-full ${c === color ? 'ring-2 ring-white ring-offset-2 ring-offset-gray-800' : ''}`}
          style={{ backgroundColor: c }}
          onClick={() => onChange(c)}
          aria-label={`Select color ${c}`}
        />
      ))}
    </div>
  );
}

// Slider control component
function SliderControl({
  label,
  value,
  min,
  max,
  step,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="mt-4">
      <div className="flex justify-between">
        <label className="text-sm text-gray-300">{label}</label>
        <span className="text-sm text-gray-400">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer mt-1"
      />
    </div>
  );
}

// Toggle control component
function ToggleControl({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between mt-4">
      <label className="text-sm text-gray-300">{label}</label>
      <button
        className={`relative inline-flex h-6 w-11 items-center rounded-full ${checked ? 'bg-blue-600' : 'bg-gray-700'}`}
        onClick={() => onChange(!checked)}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${checked ? 'translate-x-6' : 'translate-x-1'}`}
        />
      </button>
    </div>
  );
}

export default function ModelViewer() {
  // Model state
  const [selectedModelId, setSelectedModelId] = useState(1);
  const selectedModel = availableModels.find(m => m.id === selectedModelId) || availableModels[0];

  // Material properties
  const [modelColor, setModelColor] = useState(selectedModel.defaultColor);
  const [roughness, setRoughness] = useState(0.2);
  const [metalness, setMetalness] = useState(0.8);
  const [wireframe, setWireframe] = useState(false);

  // Lighting properties
  const [lightIntensity, setLightIntensity] = useState(1.0);
  const [lightColor, setLightColor] = useState('#ffffff');
  const [ambientIntensity, setAmbientIntensity] = useState(0.4);

  // Environment properties
  const [environmentPreset, setEnvironmentPreset] = useState('city');
  const environmentPresets = ['sunset', 'dawn', 'night', 'warehouse', 'forest', 'apartment', 'studio', 'city', 'park', 'lobby'];

  // Display options
  const [showGrid, setShowGrid] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [enableBloom, setEnableBloom] = useState(false);
  const [enableRotation, setEnableRotation] = useState(true);
  const [activeTab, setActiveTab] = useState('model');

  // Screenshot functionality
  const [screenshotUrl, setScreenshotUrl] = useState<string | null>(null);

  // Update color when model changes
  useEffect(() => {
    setModelColor(selectedModel.defaultColor);
  }, [selectedModel]);

  // Function to take a screenshot
  const takeScreenshot = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      setScreenshotUrl(url);
    }
  };

  // Function to download screenshot
  const downloadScreenshot = () => {
    if (screenshotUrl) {
      const link = document.createElement('a');
      link.href = screenshotUrl;
      link.download = `${selectedModel.name.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.click();
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-gradient-to-b from-gray-900 to-black py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Interactive 3D Model Viewer</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore and customize 3D models with our interactive viewer. Adjust materials, lighting, and view settings.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* 3D Viewer */}
          <div className="lg:w-2/3 bg-gray-800 rounded-xl overflow-hidden shadow-2xl h-[500px]">
            <Canvas dpr={[1, 2]} shadows>
              <color attach="background" args={['#1a1a1a']} />
              <fog attach="fog" args={['#1a1a1a', 5, 15]} />
              <ModelViewerScene
                modelGeometry={selectedModel.geometry}
                modelColor={modelColor}
                roughness={roughness}
                metalness={metalness}
                wireframe={wireframe}
                lightIntensity={lightIntensity}
                lightColor={lightColor}
                showGrid={showGrid}
                environmentPreset={environmentPreset}
                ambientIntensity={ambientIntensity}
                enableBloom={enableBloom}
                enableRotation={enableRotation}
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
                <h3 className="text-xl font-bold text-white">Model Controls</h3>
                <div className="flex items-center">
                  {screenshotUrl && (
                    <button
                      className="mr-2 text-blue-400 hover:text-blue-300 transition-colors"
                      onClick={downloadScreenshot}
                      title="Download Screenshot"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                  <button
                    className="mr-2 text-blue-400 hover:text-blue-300 transition-colors"
                    onClick={takeScreenshot}
                    title="Take Screenshot"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    className="text-gray-400 hover:text-white"
                    onClick={() => setShowControls(!showControls)}
                  >
                    {showControls ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              {showControls && (
                <>
                  {/* Control Tabs */}
                  <div className="flex border-b border-gray-700 mb-4">
                    <button
                      className={`px-4 py-2 font-medium text-sm ${
                        activeTab === 'model'
                          ? 'text-blue-400 border-b-2 border-blue-400'
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('model')}
                    >
                      Model
                    </button>
                    <button
                      className={`px-4 py-2 font-medium text-sm ${
                        activeTab === 'material'
                          ? 'text-blue-400 border-b-2 border-blue-400'
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('material')}
                    >
                      Material
                    </button>
                    <button
                      className={`px-4 py-2 font-medium text-sm ${
                        activeTab === 'lighting'
                          ? 'text-blue-400 border-b-2 border-blue-400'
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('lighting')}
                    >
                      Lighting
                    </button>
                    <button
                      className={`px-4 py-2 font-medium text-sm ${
                        activeTab === 'effects'
                          ? 'text-blue-400 border-b-2 border-blue-400'
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                      onClick={() => setActiveTab('effects')}
                    >
                      Effects
                    </button>
                  </div>

                  {/* Model Tab */}
                  {activeTab === 'model' && (
                    <>
                      {/* Model Selection */}
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-300 mb-2">Select Model</label>
                        <div className="grid grid-cols-2 gap-2">
                          {availableModels.map((model) => (
                            <button
                              key={model.id}
                              className={`p-3 rounded-lg text-left transition ${
                                model.id === selectedModelId
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              }`}
                              onClick={() => setSelectedModelId(model.id)}
                            >
                              <div className="font-medium">{model.name}</div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Model Description */}
                      <div className="mb-6 text-sm text-gray-400">
                        {selectedModel.description}
                      </div>

                      {/* Model Animation */}
                      <div className="mb-6">
                        <ToggleControl
                          label="Auto-Rotation"
                          checked={enableRotation}
                          onChange={setEnableRotation}
                        />
                      </div>
                    </>
                  )}

                  {/* Material Tab */}
                  {activeTab === 'material' && (
                    <div className="mb-6">
                      <h4 className="text-md font-medium text-white mb-2">Material Properties</h4>

                      <label className="block text-sm text-gray-300 mb-1">Color</label>
                      <ColorPicker color={modelColor} onChange={setModelColor} />

                      <SliderControl
                        label="Roughness"
                        value={roughness}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={setRoughness}
                      />

                      <SliderControl
                        label="Metalness"
                        value={metalness}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={setMetalness}
                      />

                      <ToggleControl
                        label="Wireframe"
                        checked={wireframe}
                        onChange={setWireframe}
                      />
                    </div>
                  )}

                  {/* Lighting Tab */}
                  {activeTab === 'lighting' && (
                    <div className="mb-6">
                      <h4 className="text-md font-medium text-white mb-2">Lighting Setup</h4>

                      <SliderControl
                        label="Directional Light Intensity"
                        value={lightIntensity}
                        min={0}
                        max={2}
                        step={0.1}
                        onChange={setLightIntensity}
                      />

                      <SliderControl
                        label="Ambient Light Intensity"
                        value={ambientIntensity}
                        min={0}
                        max={1}
                        step={0.1}
                        onChange={setAmbientIntensity}
                      />

                      <div className="mt-4">
                        <label className="block text-sm text-gray-300 mb-1">Light Color</label>
                        <ColorPicker color={lightColor} onChange={setLightColor} />
                      </div>

                      <div className="mt-4">
                        <label className="block text-sm text-gray-300 mb-2">Environment</label>
                        <div className="grid grid-cols-2 gap-2">
                          {environmentPresets.map((preset) => (
                            <button
                              key={preset}
                              className={`p-2 rounded-lg text-center text-sm transition ${
                                preset === environmentPreset
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              }`}
                              onClick={() => setEnvironmentPreset(preset)}
                            >
                              {preset.charAt(0).toUpperCase() + preset.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Effects Tab */}
                  {activeTab === 'effects' && (
                    <div>
                      <h4 className="text-md font-medium text-white mb-2">Visual Effects</h4>

                      <ToggleControl
                        label="Show Grid & Shadows"
                        checked={showGrid}
                        onChange={setShowGrid}
                      />

                      <ToggleControl
                        label="Bloom Effect"
                        checked={enableBloom}
                        onChange={setEnableBloom}
                      />

                      {/* Screenshot Preview */}
                      {screenshotUrl && (
                        <div className="mt-6">
                          <h4 className="text-md font-medium text-white mb-2">Screenshot</h4>
                          <div className="relative border border-gray-700 rounded-lg overflow-hidden">
                            <img
                              src={screenshotUrl}
                              alt="Model Screenshot"
                              className="w-full h-auto"
                            />
                            <button
                              className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                              onClick={downloadScreenshot}
                              title="Download Screenshot"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
