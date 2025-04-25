import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ChatbotProvider from "@/components/Chatbot/ChatbotProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3D Gallery | Interactive Image Showcase",
  description: "Experience our immersive 3D gallery with interactive image showcases powered by Three.js and Next.js",
  keywords: "3D gallery, interactive, images, Three.js, React Three Fiber, Next.js, 3D carousel",
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
        {children}
        <ChatbotProvider />
      </body>
    </html>
  );
}
