'use client';

export default function Features() {
  const coreFeatures = [
    {
      title: "Interactive 3D Experience",
      description: "Immerse yourself in a fully interactive 3D environment that responds to your movements and interactions in real-time using WebGL technology.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
        </svg>
      )
    },
    {
      title: "High-Quality Imagery",
      description: "Showcase your photos and artwork in stunning detail with our high-resolution display technology supporting up to 8K textures with advanced compression.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Smooth Animations",
      description: "Experience fluid transitions and animations at 60+ FPS that bring your content to life using our optimized rendering pipeline and GSAP integration.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: "Responsive Design",
      description: "Enjoy a seamless experience across all devices with adaptive performance scaling that automatically optimizes for your hardware capabilities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const advancedFeatures = [
    {
      title: "Custom Lighting Systems",
      description: "Create the perfect ambiance with our advanced lighting system featuring dynamic shadows, global illumination, and customizable light sources.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "Material Customization",
      description: "Apply realistic materials with physically-based rendering (PBR) that accurately simulates how light interacts with different surfaces.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    },
    {
      title: "Virtual Tours",
      description: "Guide viewers through your gallery with customizable paths, points of interest, and interactive hotspots that provide additional information.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
        </svg>
      )
    },
    {
      title: "Analytics Dashboard",
      description: "Track visitor engagement with detailed analytics on viewing time, interaction points, and popular exhibits to optimize your gallery experience.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ];

  const technicalSpecs = [
    { spec: "WebGL 2.0 & Three.js", value: "Latest rendering technology" },
    { spec: "Texture Resolution", value: "Up to 8K (8192×8192)" },
    { spec: "Frame Rate", value: "60+ FPS on modern devices" },
    { spec: "Model Format Support", value: "glTF, GLB, OBJ, FBX, USDZ" },
    { spec: "Image Formats", value: "JPG, PNG, WebP, AVIF" },
    { spec: "Lighting", value: "Dynamic PBR with real-time shadows" },
    { spec: "Physics", value: "Optional collision detection" },
    { spec: "Audio", value: "Spatial 3D audio support" }
  ];

  return (
    <div>
      {/* Core Features Section */}
      <section id="features" className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Amazing Features</h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Our 3D Gallery platform combines cutting-edge technology with intuitive design to create the most immersive digital exhibition experience available today.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {coreFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-center mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Features Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Advanced Capabilities</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {advancedFeatures.slice(0, 2).map((feature, index) => (
                  <div key={index} className="bg-gray-800/70 p-6 rounded-xl">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-center">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-900/40 to-cyan-900/40 p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {advancedFeatures.slice(2, 4).map((feature, index) => (
                  <div key={index} className="bg-gray-800/70 p-6 rounded-xl">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-center mb-2">{feature.title}</h3>
                    <p className="text-gray-300 text-center">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Technical Specifications</h2>

          <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {technicalSpecs.map((item, index) => (
                <div key={index} className="border-b border-gray-700 pb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-blue-400">{item.spec}</h3>
                    <span className="text-gray-300">{item.value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your 3D Gallery?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of artists, photographers, museums, and businesses who are transforming how they showcase their work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-8 rounded-full transition-colors">
              Get Started
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-bold py-3 px-8 rounded-full transition-colors">
              View Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
