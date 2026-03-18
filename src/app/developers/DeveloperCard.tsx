"use client";

import React, { useState } from "react";
import { Linkedin } from "lucide-react";

export default function DeveloperCard({ developer, index }: { developer: any, index: number }) {
  const [imgError, setImgError] = useState(false);

  // Use the local image if no error, otherwise fallback to UI Avatars
  const currentImageSrc = imgError 
    ? `https://ui-avatars.com/api/?name=${developer.fallbackSeed}&background=85325c&color=f0eada&size=256`
    : developer.imageSrc;

  return (
    <div 
      className="group flex flex-col h-full relative bg-white/60 backdrop-blur-xl border border-[#e8d5c4] rounded-[24px] p-6 hover:-translate-y-2 transition-all duration-300"
      style={{
        boxShadow: "0 10px 30px -10px rgba(133, 50, 92, 0.1)",
        animation: `fadeUp 0.6s ease ${index * 0.15}s both`,
      }}
    >
      {/* Decorative gradient blob behind image */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#85325c] rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
      
      <div className="relative shrink-0 w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-[4px] border-white shadow-lg bg-[#f0eada] flex items-center justify-center">
        <img 
          src={currentImageSrc} 
          alt={developer.name}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      </div>

      <div className="text-center flex flex-col flex-1">
        <h3 
          className="text-xl font-bold text-[#3d1a2e] mb-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {developer.name}
        </h3>
        
        <div className="inline-block px-3 py-1 bg-[#85325c]/10 text-[#85325c] rounded-full text-xs font-semibold mb-3 mx-auto max-w-fit">
          {developer.role}
        </div>
        
        <p className="text-sm text-[#7a5a6a] mb-6 font-medium">
          {developer.college}
        </p>

        <a 
          href={developer.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto w-full inline-flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium text-white transition-all hover:shadow-md"
          style={{ background: "#85325c" }}
          title={developer.name + " LinkedIn"}
        >
          <Linkedin size={16} />
          Connect
        </a>
      </div>
      
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
