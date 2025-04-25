'use client';

import AnimatedProjectCards from './AnimatedProjectCards';

export default function HorizontalScrollSection() {
  return (
    <section id="featured-projects" className="relative bg-gradient-to-b from-gray-900 to-black">
      <AnimatedProjectCards />
    </section>
  );
}
