import React, { useEffect, useState } from 'react';
import { Clock, Sparkles } from 'lucide-react';
import { weddingData } from '../config/weddingData';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const CountdownTicker: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const target = new Date(weddingData.ceremony.targetDateISO).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="w-full max-w-xl mx-auto my-8 px-4">
      {/* Decorative banner */}
      <div className="text-center mb-4">
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#F6FBF8] border border-[#A7F3D0] shadow-sm text-xs font-cinzel text-[#0D6E63] tracking-widest font-bold uppercase">
          <Clock className="w-3.5 h-3.5 text-[#0D9488]" />
          Countdown to Sacred Muhurtham
          <Sparkles className="w-3.5 h-3.5 text-[#0D9488]" />
        </div>
        <p className="text-xs font-montserrat text-[#1F4E47] mt-1 font-medium">
          {weddingData.ceremony.displayDate} • {weddingData.ceremony.muhurtham}
        </p>
      </div>

      {/* 4 Counter Pills in Pastel Mint and Vibrant Teal */}
      <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center">
        {items.map((item, idx) => (
          <div
            key={idx}
            className="relative bg-gradient-to-b from-[#F6FBF8] to-[#E6F7F0] border border-[#A7F3D0] rounded-xl p-2.5 sm:p-4 shadow-[0_4px_12px_rgba(10,92,83,0.08)] hover:shadow-mint-card transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {/* Subtle inner border */}
            <div className="absolute inset-1 border border-dashed border-[#A7F3D0]/60 rounded-lg pointer-events-none" />

            <div className="relative">
              <span className="font-playfair text-2xl sm:text-4xl font-bold text-[#0D6E63] letterpress block">
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="font-cinzel text-[10px] sm:text-xs text-[#1F4E47] tracking-widest uppercase font-bold mt-1 block">
                {item.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
