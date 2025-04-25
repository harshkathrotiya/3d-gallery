'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';

export default function GalleryPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Gallery />
      </main>
      <Footer />
    </>
  );
}
