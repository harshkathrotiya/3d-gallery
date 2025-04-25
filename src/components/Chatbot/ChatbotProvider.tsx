'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the 3D chatbot component to avoid SSR issues with Three.js
const Chatbot3D = dynamic(() => import('./Chatbot3D'), {
  ssr: false,
  loading: () => null
});

export default function ChatbotProvider() {
  const [mounted, setMounted] = useState(false);

  // Only render on client-side to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <Chatbot3D />;
}
