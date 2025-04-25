'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Features from '@/components/Features';
import HorizontalScrollSection from '@/components/HorizontalScrollSection';

export default function FeaturesPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <Features />
        <HorizontalScrollSection />
      </main>
      <Footer />
    </>
  );
}
