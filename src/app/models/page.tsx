'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ModelViewer from '@/components/ModelViewer';

export default function ModelsPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section id="model-viewer">
          <ModelViewer />
        </section>
      </main>
      <Footer />
    </>
  );
}
