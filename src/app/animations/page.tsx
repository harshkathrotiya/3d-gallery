'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AnimationShowcase from '@/components/AnimationShowcase';

export default function AnimationsPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <AnimationShowcase />
      </main>
      <Footer />
    </>
  );
}
