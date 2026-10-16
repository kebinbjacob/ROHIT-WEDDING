import React from 'react';

interface CornerFiligreeProps {
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
  size?: number;
}

export const CornerFiligree: React.FC<CornerFiligreeProps> = ({
  position,
  className = "w-16 h-16 md:w-24 md:h-24",
}) => {
  const getTransform = () => {
    switch (position) {
      case 'top-left':
        return '';
      case 'top-right':
        return 'scale-x-[-1]';
      case 'bottom-left':
        return 'scale-y-[-1]';
      case 'bottom-right':
        return 'scale-[-1]';
    }
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-2 left-2 md:top-4 md:left-4';
      case 'top-right':
        return 'top-2 right-2 md:top-4 md:right-4';
      case 'bottom-left':
        return 'bottom-2 left-2 md:bottom-4 md:left-4';
      case 'bottom-right':
        return 'bottom-2 right-2 md:bottom-4 md:right-4';
    }
  };

  return (
    <div
      className={`absolute ${getPositionClasses()} ${className} pointer-events-none select-none ${getTransform()} transition-opacity duration-700 opacity-80 hover:opacity-100`}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full text-[#0D6E63]"
      >
        {/* Outer Corner Frame */}
        <path d="M4 35 L4 4 L35 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M8 28 L8 8 L28 8" stroke="#D4AF37" strokeWidth="0.8" strokeLinecap="round" strokeDasharray="2 2" />

        {/* Botanical Scroll & Acanthus Leaf */}
        <path
          d="M6 6 C18 18, 30 14, 42 6 C42 18, 32 30, 20 32 C12 33, 7 28, 6 22"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M10 10 C20 22, 28 32, 26 48 C20 44, 16 38, 14 30"
          stroke="#0A5C53"
          strokeWidth="1"
          strokeLinecap="round"
        />
        
        {/* Delicate Tendril Curls */}
        <path
          d="M22 14 C30 18, 45 22, 54 15 C58 12, 58 6, 52 6 C48 6, 46 10, 48 13"
          stroke="#0D9488"
          strokeWidth="1"
          strokeLinecap="round"
        />
        <path
          d="M14 22 C18 30, 22 45, 15 54 C12 58, 6 58, 6 52 C6 48, 10 46, 13 48"
          stroke="#0D9488"
          strokeWidth="1"
          strokeLinecap="round"
        />

        {/* Small corner bead / bud */}
        <circle cx="5" cy="5" r="2" fill="#0D6E63" stroke="#D4AF37" strokeWidth="0.8" />
        <circle cx="20" cy="8" r="1.2" fill="#D4AF37" />
        <circle cx="8" cy="20" r="1.2" fill="#D4AF37" />
      </svg>
    </div>
  );
};
