import React from 'react';
import { GaneshaEmblem } from './GaneshaEmblem';
import { weddingData } from '../config/weddingData';
import { Phone } from 'lucide-react';

export const CameoHeader: React.FC = () => {
  return (
    <div className="text-center relative z-20 space-y-4 pt-4 pb-2">
      {/* Cameo Oval Medallion with Vibrant Teal & Gold Beaded Border */}
      <div className="flex justify-center">
        <div className="relative p-2.5 rounded-full bg-gradient-to-b from-[#14B8A6] via-[#0D6E63] to-[#0A5C53] shadow-[0_4px_18px_rgba(10,92,83,0.25)]">
          {/* Inner Beaded Rim in Mint-Cream */}
          <div className="p-2 rounded-full border border-dashed border-[#A7F3D0]/80 bg-[#F6FBF8] flex items-center justify-center">
            <GaneshaEmblem className="w-20 h-20 sm:w-24 sm:h-24" />
          </div>
        </div>
      </div>

      {/* Auspicious Invocation in Vibrant Teal */}
      <div className="space-y-1">
        <p className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#0D6E63] font-bold uppercase letterpress">
          {weddingData.tradition.invocation}
        </p>
      </div>

      {/* Host Family Announcement (Groom's Parents) */}
      <div className="max-w-xl mx-auto space-y-1.5 px-4">
        <h2 className="font-playfair text-xl sm:text-2xl font-bold text-[#0B3B36] tracking-wide letterpress">
          {weddingData.couple.groom.parents}
        </h2>
        <p className="font-cormorant text-base sm:text-lg text-[#1F4E47] italic font-medium leading-relaxed">
          {weddingData.couple.groom.residence}
        </p>

        {/* Contact Numbers with clickable telephone links */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-1 text-xs sm:text-sm font-montserrat text-[#0D6E63]">
          <span className="font-semibold text-[#1F4E47]">Mob:</span>
          {weddingData.couple.groom.phones.map((phone, idx) => (
            <a
              key={idx}
              href={`tel:${phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1 hover:text-[#0A5C53] hover:underline underline-offset-2 transition-colors font-medium bg-[#E6F7F0] px-2.5 py-0.5 rounded-full border border-[#A7F3D0]"
            >
              <Phone className="w-3 h-3 text-[#0D9488]" />
              {phone}
            </a>
          ))}
        </div>
      </div>

      {/* Auspicious Invitation Text */}
      <div className="max-w-xl mx-auto px-6 pt-3">
        <p className="font-cormorant text-lg sm:text-xl text-[#0B3B36] italic leading-relaxed font-medium">
          {weddingData.tradition.greeting}
        </p>
      </div>
    </div>
  );
};
