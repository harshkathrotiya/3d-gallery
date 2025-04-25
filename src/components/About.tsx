'use client';

export default function About() {
  return (
    <section id="about" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-6">About Our 3D Gallery</h2>
            <p className="text-gray-300 mb-4">
              Welcome to the future of digital galleries. Our 3D Gallery combines cutting-edge technology with stunning visuals to create an immersive experience unlike any other.
            </p>
            <p className="text-gray-300 mb-4">
              Using the latest in 3D rendering and interactive design, we've created a platform that allows you to showcase your images in a dynamic, engaging environment that captivates viewers and brings your content to life.
            </p>
            <p className="text-gray-300 mb-6">
              Whether you're an artist looking to display your work, a photographer seeking a new way to present your portfolio, or a business wanting to showcase products in an innovative way, our 3D Gallery provides the perfect solution.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition-colors">
              Learn More
            </button>
          </div>
          <div className="lg:w-1/2 bg-gradient-to-br from-blue-500 to-purple-600 p-1 rounded-xl">
            <div className="bg-gray-900 p-6 rounded-lg h-full">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-2xl font-bold text-center text-blue-400 mb-2">100+</h3>
                  <p className="text-center text-gray-300">3D Templates</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <h3 className="text-2xl font-bold text-center text-green-400 mb-2">50K+</h3>
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
  );
}
