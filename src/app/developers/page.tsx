import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DeveloperCard from "./DeveloperCard";

export const metadata = {
  title: "Developers | ArogyaMitra AI",
  description: "Meet the developers behind ArogyaMitra AI",
};

const developers = [
  {
    name: "Ambesh Singh",
    role: "CSE (Cyber Security) 2nd Year",
    college: "SRM Ktr",
    linkedin: "https://www.linkedin.com/in/ambesh-singh-955267386/",
    imageSrc: "/ambesh.jpg",
    fallbackSeed: "Ambesh+Singh",
  },
  {
    name: "Ayati Gupta",
    role: "CSE (Cyber Security) 2nd Year",
    college: "SRM Ktr",
    linkedin: "https://in.linkedin.com/in/ayatigupta",
    imageSrc: "/ayati.jpg",
    fallbackSeed: "Ayati+Gupta",
  },
  {
    name: "Vatsal",
    role: "CSE (Data Science) 1st Year",
    college: "ABES Engineering College",
    linkedin: "https://www.linkedin.com/in/vatsal-dubey-0b44b53b8/",
    imageSrc: "/vatsal.jpg",
    fallbackSeed: "Vatsal",
  },
  {
    name: "Suryansh Singh",
    role: "CSE 2nd Year",
    college: "Bhagwan Parshuram Institute of Technology",
    linkedin: "https://www.linkedin.com/in/suryansh-singh-35987a328",
    imageSrc: "/suryansh.jpg",
    fallbackSeed: "Suryansh+Singh",
  },
];

export default function DevelopersPage() {
  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "#f0eada",
        fontFamily: "var(--font-montserrat)",
      }}
    >
      {/* Background Ornaments */}
      <div 
        className="absolute top-0 left-0 w-full h-96 opacity-20 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, #85325c 0%, transparent 100%)",
          filter: "blur(100px)",
        }}
      />
      
      {/* Navbar Minimal */}
      <nav className="relative z-10 flex items-center p-6 lg:px-12">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-[#85325c] hover:text-[#6e2249] transition-colors font-medium"
        >
          <ArrowLeft size={18} />
          <span>Back to Home</span>
        </Link>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 pb-24 pt-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h1 
            className="text-4xl md:text-5xl font-bold mb-4 text-[#3d1a2e]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Meet the Builders
          </h1>
          <p className="text-lg text-[#7a5a6a]">
            The dedicated team of developers working together to bring accessible AI healthcare to rural India.
          </p>
        </div>

        {/* Grid of Developers */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {developers.map((dev, i) => (
            <DeveloperCard key={i} developer={dev} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
}
