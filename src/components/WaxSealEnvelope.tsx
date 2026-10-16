import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Music, ArrowRight } from 'lucide-react';
import { weddingData } from '../config/weddingData';
import { templeAudio } from '../utils/audioEngine';

interface WaxSealEnvelopeProps {
  onOpen: () => void;
  isOpen: boolean;
}

export const WaxSealEnvelope: React.FC<WaxSealEnvelopeProps> = ({ onOpen, isOpen }) => {
  const [animating, setAnimating] = useState(false);

  const handleOpen = () => {
    if (animating || isOpen) return;
    setAnimating(true);

    try {
      templeAudio.start();
    } catch (e) {
      console.log('Audio autoplay prevented, user can toggle later', e);
    }

    try {
      confetti({
        particleCount: 60,
        spread: 85,
        origin: { y: 0.6 },
        colors: ['#0D9488', '#14B8A6', '#A7F3D0', '#D4AF37', '#F0FDF4'],
      });
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      onOpen();
      setAnimating(false);
    }, 1300);
  };

  if (isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#062420]/80 backdrop-blur-md transition-opacity duration-1000 ${
        animating ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background radial mint & teal glow */}
      <div className="absolute inset-0 bg-radial from-[#14B8A6]/20 via-transparent to-black/70 pointer-events-none" />

      {/* Main Envelope Container with 3D perspective */}
      <div className="relative w-[92vw] max-w-md mx-auto perspective-1000 select-none">
        {/* Envelope Body */}
        <div className="relative bg-[#F4FAF6] border-2 border-[#A7F3D0] rounded-2xl shadow-2xl p-6 md:p-8 text-center overflow-hidden preserve-3d">
          
          {/* Subtle noise grain and mint lines */}
          <div className="absolute inset-0 mint-grain opacity-70 pointer-events-none" />
          <div className="absolute inset-1.5 border border-[#14B8A6]/40 rounded-xl pointer-events-none" />
          <div className="absolute inset-3 border border-dashed border-[#0D6E63]/25 rounded-lg pointer-events-none" />

          {/* Top Decorative Header */}
          <div className="relative z-10 space-y-2 mb-6">
            <p className="font-cinzel text-xs md:text-sm tracking-[0.25em] text-[#0D6E63] uppercase font-bold">
              {weddingData.tradition.invocation}
            </p>
            <h1 className="font-script text-4xl md:text-5xl text-[#0B3B36] drop-shadow-sm">
              Royal Wedding Invitation
            </h1>
            <p className="font-playfair text-sm text-[#1F4E47] italic">
              Auspicious Solemnization & Reception
            </p>
          </div>

          {/* Envelope Graphic with Interactive Vibrant Teal Wax Seal */}
          <div className="relative my-8 flex flex-col items-center justify-center">
            {/* Envelope Pocket SVG */}
            <div className="relative w-64 h-40 bg-[#E8F6EF] border border-[#A7F3D0] rounded-lg shadow-inner flex items-center justify-center">
              
              {/* Envelope Triangular Flap Fold */}
              <div
                className={`absolute top-0 left-0 right-0 h-24 bg-[#D1EFE2] border-b border-[#14B8A6]/60 origin-top transition-transform duration-700 ease-in-out ${
                  animating ? '-rotate-180 opacity-40' : 'rotate-0'
                }`}
                style={{
                  clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)',
                  boxShadow: '0 4px 10px rgba(10, 92, 83, 0.15)',
                }}
              />

              {/* Emerging Card edge with Ganesha & Couple Silhouette */}
              <div
                className={`absolute w-52 h-32 bg-[#FFFFFF] border border-[#A7F3D0] rounded shadow-md flex items-center justify-around px-2 transition-all duration-1000 ${
                  animating ? '-translate-y-24 scale-105' : 'translate-y-2'
                }`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 mb-0.5 opacity-90">
                    <img src="/ganesha-themed.png" alt="Ganesha" className="w-full h-full object-contain" />
                  </div>
                  <span className="font-cinzel text-[11px] tracking-widest text-[#0D6E63] font-bold">
                    {weddingData.couple.monogram}
                  </span>
                  <span className="font-playfair text-[9px] text-[#1F4E47]">
                    15 Nov 2026
                  </span>
                </div>
                <div className="w-16 h-24 overflow-hidden rounded-t-lg">
                  <img
                    src={weddingData.couple.portraitUrl}
                    alt="Couple"
                    className="w-full h-full object-contain drop-shadow"
                  />
                </div>
              </div>

              {/* Vibrant Teal-Green Wax Seal Button centered on the flap apex */}
              <button
                onClick={handleOpen}
                aria-label="Open wedding invitation"
                className={`absolute z-20 top-16 transform -translate-y-1/2 group cursor-pointer transition-all duration-500 hover:scale-110 active:scale-95 ${
                  animating ? 'scale-125 opacity-0' : 'scale-100'
                }`}
              >
                {/* 3D Wax Seal Circle in Vibrant Teal-Green */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#14B8A6] via-[#0D6E63] to-[#064E3B] p-1 shadow-[0_6px_16px_rgba(13,110,99,0.55),inset_0_2px_4px_rgba(255,255,255,0.4)] flex items-center justify-center border border-[#A7F3D0]/80">
                  
                  {/* Inner Ring with Beaded Dots & Gold initials */}
                  <div className="w-full h-full rounded-full border border-dashed border-[#F5E6C8]/70 flex flex-col items-center justify-center bg-[#0A5C53]/85 text-[#F0FDF4]">
                    <span className="font-cinzel text-xs font-bold tracking-widest text-[#FFEDB3] drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]">
                      R & H
                    </span>
                    <Sparkles className="w-3 h-3 text-[#FFD700] animate-pulse-subtle mt-0.5" />
                  </div>
                </div>

                {/* Subtle wax dripping detail */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-2 bg-[#064E3B] rounded-b-full shadow-sm" />
              </button>
            </div>

            {/* Instruction tooltip */}
            <p className="mt-6 text-xs text-[#0D6E63] font-montserrat tracking-wider flex items-center gap-1.5 animate-pulse font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
              Touch the Wax Seal or Click Below to Open
            </p>
          </div>

          {/* Couple Names Preview */}
          <div className="relative z-10 pt-2 pb-4">
            <h2 className="font-playfair text-2xl font-bold text-[#0B3B36]">
              Rohith <span className="font-script text-3xl text-[#0D6E63] px-1">&</span> Haritha
            </h2>
            <p className="text-xs font-montserrat text-[#1F4E47] tracking-wider uppercase mt-1">
              Mayilvahanam Hall • Master Auditorium
            </p>
          </div>

          {/* Action Buttons */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-3 mt-2">
            <button
              onClick={handleOpen}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#0D6E63] via-[#0D9488] to-[#0A5C53] text-[#F0FDF4] font-cinzel text-xs tracking-[0.2em] font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-[#0D9488] hover:to-[#0D6E63] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-[#A7F3D0]/60"
            >
              <Music className="w-3.5 h-3.5 text-[#A7F3D0]" />
              OPEN INVITATION
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleOpen}
              className="text-xs font-montserrat text-[#0D6E63] hover:text-[#0A5C53] underline underline-offset-4 tracking-wider transition-colors py-1"
            >
              Skip Intro & View Details
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
