import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatbotProvider from "@/components/Chatbot/ChatbotProvider";
import JsonLd from "@/components/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3D Gallery | Immersive Interactive 3D Showcase Platform",
  description: "Create and explore stunning 3D galleries with our immersive platform. Perfect for artists, photographers, museums, and businesses to showcase work in interactive 3D environments.",
  keywords: "3D gallery, interactive 3D, virtual exhibition, Three.js, WebGL, 3D showcase, digital art, virtual museum, 3D models, immersive experience",
  metadataBase: new URL('https://3d-gallery-mauve.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "3D Gallery | Immersive Interactive 3D Showcase Platform",
    description: "Create and explore stunning 3D galleries with our immersive platform. Perfect for artists, photographers, museums, and businesses.",
    url: 'https://3d-gallery-mauve.vercel.app',
    siteName: '3D Gallery',
    images: [
      {
        url: '/api/og?title=Immersive%203D%20Showcase%20Platform',
        width: 1200,
        height: 630,
        alt: '3D Gallery Platform Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "3D Gallery | Immersive 3D Showcase Platform",
    description: "Create and explore stunning 3D galleries with our immersive platform for artists, photographers, museums, and businesses.",
    images: ['/api/og?title=3D%20Gallery%20Platform'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Replace with actual verification code when available
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <JsonLd />
        {children}
        <ChatbotProvider />
      </body>
    </html>
  );
}
