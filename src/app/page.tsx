import Header from '@/components/Header';
import Footer from '@/components/Footer';
import EnhancedCarousel from '@/components/EnhancedCarousel';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Header />

      {/* Enhanced Hero Section with 3D Carousel */}
      <section id="hero" className="w-full h-screen overflow-hidden">
        <EnhancedCarousel />
      </section>

      {/* Quick Navigation Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Explore Our 3D Gallery
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 3D Models Card */}
            <Link href="/models" className="group">
              <div className="bg-gray-800 rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
                <div className="h-48 bg-blue-900 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">3D Models</h3>
                  <p className="text-gray-300">Explore and customize interactive 3D models with our advanced viewer.</p>
                </div>
              </div>
            </Link>

            {/* Animations Card */}
            <Link href="/animations" className="group">
              <div className="bg-gray-800 rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
                <div className="h-48 bg-purple-900 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-purple-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Animations</h3>
                  <p className="text-gray-300">Watch and control animated 3D models with our interactive showcase.</p>
                </div>
              </div>
            </Link>

            {/* Gallery Card */}
            <Link href="/gallery" className="group">
              <div className="bg-gray-800 rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
                <div className="h-48 bg-green-900 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Gallery</h3>
                  <p className="text-gray-300">Browse our collection of stunning 3D artwork and visualizations.</p>
                </div>
              </div>
            </Link>

            {/* Tutorial Card */}
            <Link href="/tutorial" className="group">
              <div className="bg-gray-800 rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl">
                <div className="h-48 bg-red-900 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">Tutorial</h3>
                  <p className="text-gray-300">Learn how to interact with 3D models through our step-by-step guide.</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Additional Links */}
          <div className="flex flex-wrap justify-center mt-12 gap-4">
            <Link href="/features" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
              Explore Features
            </Link>
            <Link href="/inspiration" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors">
              Get Inspired
            </Link>
            <Link href="/about" className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors">
              About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
}
