'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import InteractiveTutorial from '@/components/InteractiveTutorial';

export default function TutorialPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <InteractiveTutorial />
      </main>
      <Footer />
    </>
  );
}
