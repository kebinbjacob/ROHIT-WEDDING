import React from 'react';

interface DividerFlourishProps {
  className?: string;
  variant?: 'simple' | 'lotus' | 'full';
}

export const DividerFlourish: React.FC<DividerFlourishProps> = ({
  className = "my-6",
}) => {
  return (
    <div className={`flex items-center justify-center space-x-3 text-[#0D6E63] select-none ${className}`}>
      {/* Left scroll flourish */}
      <svg
        viewBox="0 0 100 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 md:w-28 h-5 text-[#0D9488]"
      >
        <path
          d="M0 12 C30 12, 45 4, 70 4 C85 4, 95 10, 98 12 C95 14, 85 20, 70 20 C45 20, 30 12, 0 12"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="82" cy="12" r="2" fill="#0D6E63" />
        <path d="M72 8 Q76 12 72 16" stroke="#D4AF37" strokeWidth="1" fill="none" />
      </svg>

      {/* Central motif - Vibrant Teal & Gold Flower */}
      <div className="relative flex items-center justify-center">
        <svg
          viewBox="0 0 36 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-6 text-[#0D6E63]"
        >
          {/* Central floral bud */}
          <path
            d="M18 4 C14 8, 14 16, 18 20 C22 16, 22 8, 18 4 Z"
            fill="#0D6E63"
            stroke="#D4AF37"
            strokeWidth="0.8"
          />
          {/* Side Petals */}
          <path
            d="M14 12 C9 9, 6 12, 9 17 C12 18, 14 15, 14 12 Z"
            fill="#0D9488"
            stroke="#D4AF37"
            strokeWidth="0.6"
          />
          <path
            d="M22 12 C27 9, 30 12, 27 17 C24 18, 22 15, 22 12 Z"
            fill="#0D9488"
            stroke="#D4AF37"
            strokeWidth="0.6"
          />
          {/* Center gold dot */}
          <circle cx="18" cy="12" r="1.5" fill="#F5E6C8" />
        </svg>
      </div>

      {/* Right scroll flourish */}
      <svg
        viewBox="0 0 100 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-16 md:w-28 h-5 text-[#0D9488] scale-x-[-1]"
      >
        <path
          d="M0 12 C30 12, 45 4, 70 4 C85 4, 95 10, 98 12 C95 14, 85 20, 70 20 C45 20, 30 12, 0 12"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <circle cx="82" cy="12" r="2" fill="#0D6E63" />
        <path d="M72 8 Q76 12 72 16" stroke="#D4AF37" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
};
