import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Page Not Found | 3D Gallery',
  description: 'Sorry, the page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <>
      <Header />
      <section className="py-20 bg-gradient-to-b from-black to-gray-900 text-white min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6">404</h1>
          <h2 className="text-3xl font-bold mb-8">Page Not Found</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/" 
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors text-lg font-medium"
            >
              Return Home
            </Link>
            <Link 
              href="/gallery" 
              className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors text-lg font-medium"
            >
              Explore Gallery
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
