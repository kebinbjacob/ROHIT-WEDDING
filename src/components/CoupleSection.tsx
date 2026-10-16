import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { weddingData } from '../config/weddingData';
import { Heart, Sparkles, Flower2 } from 'lucide-react';

export const CoupleSection: React.FC = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [blessingCount, setBlessingCount] = useState(108);
  const [showHeartFloats, setShowHeartFloats] = useState<number[]>([]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleShowerBlessing = () => {
    setBlessingCount(prev => prev + 1);
    const id = Date.now();
    setShowHeartFloats(prev => [...prev, id]);
    setTimeout(() => {
      setShowHeartFloats(prev => prev.filter(item => item !== id));
    }, 1200);

    // Fire romantic floral confetti (rose red & jasmine white & gold)
    try {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.5 },
        colors: ['#E11D48', '#0D9488', '#F0FDF4', '#D4AF37', '#BE123C'],
      });
    } catch {
      // fallback
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className="relative z-20 max-w-xl mx-auto my-6 px-4 text-center select-none"
    >
      {/* Decorative Mint & Vibrant Teal Card */}
      <div className="relative py-8 px-4 sm:px-6 rounded-3xl bg-gradient-to-b from-[#F6FBF8] via-[#FFFFFF] to-[#F6FBF8] border-2 border-[#A7F3D0] shadow-[0_12px_40px_rgba(10,92,83,0.1)] overflow-hidden group">
        
        {/* Soft background mint & gold radial shine */}
        <div className="absolute inset-0 bg-radial from-[#A7F3D0]/30 via-transparent to-transparent pointer-events-none" />
        <div className="absolute inset-2 border border-[#C2DFD4]/70 rounded-2xl pointer-events-none" />

        {/* 1. Couple Portrait Cutout inside an Arched Royal Frame */}
        <div className="relative mx-auto w-64 sm:w-72 md:w-80 mb-6 mt-2 flex flex-col items-center">
          
          {/* Glowing Aura Ring */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#0D9488]/20 via-[#A7F3D0]/40 to-[#D4AF37]/25 rounded-full blur-2xl transform scale-110 pointer-events-none animate-pulse-subtle" />
          
          {/* Arched Window Backplate with Delicate Gold Inset */}
          <div className="relative w-full rounded-t-[140px] rounded-b-3xl border-2 border-[#A7F3D0] bg-gradient-to-b from-[#E6F7F0]/60 via-[#F6FBF8] to-[#E6F7F0]/40 p-2 shadow-inner overflow-hidden">
            
            {/* Shimmer Light Bar Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />

            {/* The Transparent Couple Portrait */}
            <div className="relative overflow-hidden rounded-t-[130px] rounded-b-2xl pt-2">
              <img
                src={weddingData.couple.portraitUrl}
                alt="Rohith & Haritha"
                className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(10,92,83,0.22)] transform group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                onClick={handleShowerBlessing}
                title="Tap to shower flowers & blessings!"
              />
            </div>

            {/* Floating flower petals inside portrait frame */}
            <div className="absolute bottom-2 left-3 text-[#0D9488]/60 animate-bounce">
              <Flower2 className="w-4 h-4" />
            </div>
            <div className="absolute bottom-2 right-3 text-[#0D9488]/60 animate-bounce delay-150">
              <Flower2 className="w-4 h-4" />
            </div>
          </div>

          {/* Interactive Floating Flower / Blessing Shower Button */}
          <div className="mt-3 relative">
            <button
              onClick={handleShowerBlessing}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#0D6E63] via-[#0D9488] to-[#0A5C53] text-[#F0FDF4] text-xs font-cinzel font-bold shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 border border-[#A7F3D0]/60"
            >
              <Heart className="w-3.5 h-3.5 fill-[#F0FDF4] text-[#F0FDF4] animate-pulse" />
              <span>Shower Blessings</span>
              <span className="bg-[#0A5C53] text-[#A7F3D0] text-[10px] px-2 py-0.5 rounded-full font-montserrat">
                {blessingCount}
              </span>
            </button>

            {/* Floating "+1 Blessing" burst elements */}
            {showHeartFloats.map(id => (
              <span
                key={id}
                className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-xs font-bold text-[#0D6E63] animate-float-slow pointer-events-none bg-white/90 px-2 py-0.5 rounded-full shadow border border-[#A7F3D0]"
              >
                🌸 +1 Blessing!
              </span>
            ))}
          </div>

          <p className="text-[10px] font-montserrat text-[#1F4E47] italic mt-1.5 opacity-80">
            Tap portrait or button above to shower fresh flowers
          </p>
        </div>

        {/* 2. Groom's Name in Calligraphy */}
        <div className="space-y-1">
          <span className="font-montserrat text-xs tracking-[0.25em] text-[#0D9488] uppercase font-bold block">
            Groom
          </span>
          <h1 className="font-alex text-5xl sm:text-6xl md:text-7xl text-[#0D6E63] font-bold tracking-wide drop-shadow-sm transition-transform duration-300 hover:scale-105">
            {weddingData.couple.groom.name}
          </h1>
        </div>

        {/* Elegant "with" connector */}
        <div className="my-3 flex items-center justify-center gap-3">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#0D9488]" />
          <div className="flex items-center gap-1.5 px-3.5 py-0.5 rounded-full bg-[#E6F7F0] border border-[#A7F3D0] text-[#0D6E63] shadow-sm">
            <Heart className="w-3 h-3 fill-[#0D9488] text-[#0D9488] animate-pulse" />
            <span className="font-cormorant italic text-base sm:text-lg font-bold text-[#0B3B36]">
              with
            </span>
            <Sparkles className="w-3 h-3 text-[#14B8A6]" />
          </div>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#0D9488]" />
        </div>

        {/* 3. Bride's Name in Calligraphy */}
        <div className="space-y-1">
          <h1 className="font-alex text-5xl sm:text-6xl md:text-7xl text-[#0D6E63] font-bold tracking-wide drop-shadow-sm transition-transform duration-300 hover:scale-105">
            {weddingData.couple.bride.name}
          </h1>
          <span className="font-montserrat text-xs tracking-[0.25em] text-[#0D9488] uppercase font-bold block">
            Bride
          </span>
        </div>

        {/* 4. Bride's Family Details */}
        <div className="mt-5 pt-4 border-t border-[#A7F3D0]/60 space-y-1">
          <p className="font-playfair text-base sm:text-lg text-[#0B3B36] font-bold">
            {weddingData.couple.bride.parentsTitle} {weddingData.couple.bride.parents}
          </p>
          <p className="font-cormorant text-base sm:text-lg text-[#1F4E47] italic font-medium leading-relaxed">
            {weddingData.couple.bride.residence}
          </p>
        </div>

        {/* Wedding Tag */}
        <div className="mt-4 inline-block">
          <span className="font-cinzel text-xs tracking-widest text-[#0D6E63] bg-[#E6F7F0] px-4 py-1 rounded-full border border-[#A7F3D0] font-bold shadow-sm">
            {weddingData.couple.hashtag}
          </span>
        </div>

      </div>
    </div>
  );
};
