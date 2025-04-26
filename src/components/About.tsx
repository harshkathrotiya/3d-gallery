'use client';

export default function About() {
  return (
    <div>
      {/* Main About Section */}
      <section id="about" className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-bold mb-6">About Our 3D Gallery</h2>
              <p className="text-gray-300 mb-4">
                Welcome to the future of digital galleries. Our 3D Gallery combines cutting-edge WebGL technology with stunning visuals to create an immersive experience unlike any other. Founded in 2021 by a team of passionate 3D artists and web developers, we've been pushing the boundaries of what's possible in browser-based 3D experiences.
              </p>
              <p className="text-gray-300 mb-4">
                Using Three.js and the latest in 3D rendering techniques, we've created a platform that allows you to showcase your images and 3D models in a dynamic, engaging environment that captivates viewers and brings your content to life. Our proprietary lighting and material systems ensure your work is displayed with the highest fidelity possible.
              </p>
              <p className="text-gray-300 mb-6">
                Whether you're an artist looking to display your work, a photographer seeking a new way to present your portfolio, or a business wanting to showcase products in an innovative way, our 3D Gallery provides the perfect solution. With clients ranging from independent creators to major museums and galleries worldwide, we're proud to be at the forefront of digital exhibition technology.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors">
                Learn More
              </button>
            </div>
            <div className="lg:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-xl">
              <div className="bg-gray-900 p-6 rounded-lg h-full">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-2xl font-bold text-center text-blue-400 mb-2">150+</h3>
                    <p className="text-center text-gray-300">3D Templates</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-2xl font-bold text-center text-green-400 mb-2">75K+</h3>
                    <p className="text-center text-gray-300">Happy Users</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-2xl font-bold text-center text-purple-400 mb-2">99%</h3>
                    <p className="text-center text-gray-300">Satisfaction</p>
                  </div>
                  <div className="bg-gray-800 p-4 rounded-lg">
                    <h3 className="text-2xl font-bold text-center text-red-400 mb-2">24/7</h3>
                    <p className="text-center text-gray-300">Support</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-300 text-lg">
              We believe that digital art deserves to be experienced, not just viewed. Our mission is to create the most immersive and accessible platform for 3D content, empowering creators and engaging audiences in new and exciting ways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Innovation</h3>
              <p className="text-gray-300 text-center">
                We're constantly pushing the boundaries of what's possible with web-based 3D technology, developing new features and optimizations to deliver the best experience possible.
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Accessibility</h3>
              <p className="text-gray-300 text-center">
                We believe that everyone should be able to experience 3D content, regardless of their technical expertise or device. Our platform is designed to be intuitive and responsive.
              </p>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Community</h3>
              <p className="text-gray-300 text-center">
                We foster a vibrant community of creators and enthusiasts, providing tools and resources to help them connect, collaborate, and grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-black text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Meet Our Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-blue-400 to-purple-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Alex Chen</h3>
                <p className="text-blue-400 mb-4">Founder & Lead Developer</p>
                <p className="text-gray-300">
                  With over 10 years of experience in WebGL and 3D graphics, Alex leads our development team with a passion for creating immersive digital experiences.
                </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-green-400 to-blue-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Maya Rodriguez</h3>
                <p className="text-green-400 mb-4">Creative Director</p>
                <p className="text-gray-300">
                  Maya brings her background in fine arts and digital design to ensure that our platform not only functions beautifully but looks stunning as well.
                </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-purple-400 to-pink-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">David Kim</h3>
                <p className="text-purple-400 mb-4">3D Artist & Technical Lead</p>
                <p className="text-gray-300">
                  David specializes in optimizing 3D models for web performance while maintaining visual fidelity, ensuring our galleries load quickly and look amazing.
                </p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-red-400 to-yellow-500"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">Sarah Johnson</h3>
                <p className="text-red-400 mb-4">User Experience Designer</p>
                <p className="text-gray-300">
                  Sarah focuses on making our complex 3D interfaces intuitive and accessible to users of all technical backgrounds and abilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Users Say</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 p-8 rounded-xl relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="pt-6">
                <p className="text-gray-300 italic mb-6">
                  "As a digital artist, I've tried many platforms to showcase my work, but nothing compares to the immersive experience of this 3D gallery. My clients are consistently impressed by the presentation quality."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Emily Zhang</h4>
                    <p className="text-blue-400 text-sm">Digital Artist</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="pt-6">
                <p className="text-gray-300 italic mb-6">
                  "We integrated the 3D Gallery into our online museum experience during the pandemic, and visitor engagement increased by 300%. The technology is flawless and the support team is incredibly responsive."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Michael Torres</h4>
                    <p className="text-purple-400 text-sm">Museum Director</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 p-8 rounded-xl relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div className="pt-6">
                <p className="text-gray-300 italic mb-6">
                  "The 3D product visualization has transformed our e-commerce experience. Our customers can now interact with products in a way that's almost like being in a physical store, and our conversion rates have improved significantly."
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Jessica Patel</h4>
                    <p className="text-green-400 text-sm">E-commerce Manager</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
