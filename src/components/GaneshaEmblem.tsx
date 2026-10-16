import React from 'react';

interface GaneshaEmblemProps {
  className?: string;
  size?: number;
}

export const GaneshaEmblem: React.FC<GaneshaEmblemProps> = ({
  className = "w-20 h-20 md:w-24 md:h-24",
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className} select-none`}>
      {/* Soft pastel mint and champagne gold ambient glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#14B8A6]/25 via-[#A7F3D0]/30 to-[#D4AF37]/20 rounded-full blur-lg pointer-events-none animate-pulse-subtle" />
      
      {/* Newly uploaded Lord Ganesha line art custom-edited into Vibrant Teal & Gold theme */}
      <img
        src="/ganesha-themed.png"
        alt="Lord Sri Ganesha"
        className="relative z-10 w-full h-full object-contain drop-shadow-[0_4px_10px_rgba(10,92,83,0.3)] transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
};
