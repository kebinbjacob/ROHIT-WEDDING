import React, { useState } from 'react';
import { Calendar, MapPin, Clock, ExternalLink, Navigation, CalendarPlus } from 'lucide-react';
import { weddingData } from '../config/weddingData';
import { DividerFlourish } from './DividerFlourish';
import { openGoogleCalendar } from '../utils/calendarUtils';

export const CardCenterpiece: React.FC = () => {
  const [showQRModal, setShowQRModal] = useState(false);

  const thalikettuEvent = weddingData.events.find(e => e.id === 'thalikettu')!;
  const receptionEvent = weddingData.events.find(e => e.id === 'reception')!;

  return (
    <div className="relative z-20 max-w-xl mx-auto my-6 px-4">
      {/* Outer Card Container in Pastel Mint & Vibrant Teal */}
      <div className="bg-[#F6FBF8] border-2 border-[#A7F3D0] rounded-2xl p-4 sm:p-6 shadow-[0_8px_30px_rgba(10,92,83,0.08)] relative overflow-hidden">
        
        {/* Subtle double border */}
        <div className="absolute inset-1.5 border border-[#C2DFD4] rounded-xl pointer-events-none" />

        {/* 1. Iconic 3-Column Highlights Grid from the Physical Card */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 py-4 px-2 border-b-2 border-[#0D6E63]/25 items-center text-center">
          
          {/* Column 1: Date */}
          <div className="flex flex-col items-center justify-center border-r border-[#C2DFD4] pr-1 sm:pr-3">
            <div className="w-8 h-8 rounded-full bg-[#E6F7F0] border border-[#A7F3D0] flex items-center justify-center mb-1 text-[#0D6E63]">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="font-playfair text-sm sm:text-base font-semibold text-[#0B3B36]">
              2026 Nov.
            </span>
            <span className="font-playfair text-3xl sm:text-4xl font-bold text-[#0D6E63] leading-tight letterpress">
              15
            </span>
            <span className="font-cormorant text-base sm:text-lg font-bold text-[#0B3B36] italic">
              Sunday
            </span>
          </div>

          {/* Column 2: Venue (Master Auditorium) */}
          <div className="flex flex-col items-center justify-center px-1 sm:px-2">
            <div className="w-8 h-8 rounded-full bg-[#E6F7F0] border border-[#A7F3D0] flex items-center justify-center mb-1 text-[#0D6E63]">
              <MapPin className="w-4 h-4" />
            </div>
            <h3 className="font-playfair text-sm sm:text-base font-bold text-[#0B3B36] leading-snug">
              Master Auditorium
            </h3>
            <p className="font-cormorant text-xs sm:text-sm text-[#1F4E47] italic font-medium">
              Areekkad Road
            </p>
            <p className="font-cormorant text-xs sm:text-sm text-[#1F4E47] italic font-medium">
              Ittilakkal, Vailathur
            </p>
            <a
              href={receptionEvent.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-[10px] font-montserrat font-bold text-[#0D6E63] hover:text-[#0A5C53] bg-[#E6F7F0] px-2 py-0.5 rounded border border-[#A7F3D0] transition-colors"
            >
              <Navigation className="w-2.5 h-2.5" />
              Directions
            </a>
          </div>

          {/* Column 3: Timing */}
          <div className="flex flex-col items-center justify-center border-l border-[#C2DFD4] pl-1 sm:pr-2">
            <div className="w-8 h-8 rounded-full bg-[#E6F7F0] border border-[#A7F3D0] flex items-center justify-center mb-1 text-[#0D6E63]">
              <Clock className="w-4 h-4" />
            </div>
            <span className="font-playfair text-sm sm:text-base font-bold text-[#0B3B36]">
              4:30 Pm
            </span>
            <span className="font-cormorant text-lg sm:text-xl font-bold text-[#0D6E63] italic">
              &
            </span>
            <span className="font-playfair text-sm sm:text-base font-bold text-[#0B3B36]">
              8:00 Pm
            </span>
            <button
              onClick={() => openGoogleCalendar(receptionEvent)}
              className="mt-2 inline-flex items-center gap-1 text-[10px] font-montserrat font-bold text-[#0D6E63] hover:text-[#0A5C53] bg-[#E6F7F0] px-2 py-0.5 rounded border border-[#A7F3D0] transition-colors"
              title="Add to Google Calendar"
            >
              <CalendarPlus className="w-2.5 h-2.5" />
              Add to Google Calendar
            </button>
          </div>

        </div>

        {/* 2. Marriage Solemnization (Thalikettu) Section */}
        <div className="pt-6 pb-2 text-center space-y-2">
          <div className="inline-block border-b border-[#0D6E63]/30 pb-1">
            <h4 className="font-playfair text-base sm:text-lg font-bold text-[#0B3B36] italic">
              Marriage will be solemnized on (Thalikettu)
            </h4>
          </div>

          <div className="space-y-1">
            <p className="font-cormorant text-base sm:text-lg text-[#0B3B36] font-bold">
              Sunday, 15 November 2026 <span className="text-[#0D6E63]">({weddingData.ceremony.malayalamDate})</span>
            </p>
            <p className="font-cormorant text-base sm:text-lg text-[#1F4E47] italic font-medium">
              at <strong className="text-[#0B3B36] font-bold not-italic font-playfair">{thalikettuEvent.venue}</strong>, {thalikettuEvent.landmark}
            </p>
            <div className="pt-1">
              <span className="font-playfair text-base sm:text-lg font-bold text-[#0D6E63] bg-[#E6F7F0] px-4 py-1 rounded-full border border-[#A7F3D0] inline-block">
                Between : {thalikettuEvent.time}
              </span>
            </div>
          </div>

          {/* Quick Buttons for Thalikettu */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <a
              href={thalikettuEvent.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F6FBF8] hover:bg-[#E6F7F0] text-[#0D6E63] font-cinzel text-[11px] font-bold rounded-full border border-[#A7F3D0] transition-colors shadow-sm"
            >
              <Navigation className="w-3 h-3 text-[#0D9488]" />
              Shoranur Hall Map
              <ExternalLink className="w-2.5 h-2.5" />
            </a>

            <button
              onClick={() => openGoogleCalendar(thalikettuEvent)}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F6FBF8] hover:bg-[#E6F7F0] text-[#0D6E63] font-cinzel text-[11px] font-bold rounded-full border border-[#A7F3D0] transition-colors shadow-sm"
              title="Add Thalikettu to Google Calendar"
            >
              <CalendarPlus className="w-3 h-3 text-[#0D9488]" />
              Add to Google Calendar
            </button>
          </div>
        </div>

        {/* 3. Center Flourish from the Card */}
        <DividerFlourish className="my-4" />

        {/* 4. Best Compliments */}
        <div className="text-center pb-2">
          <p className="font-cormorant text-base sm:text-lg text-[#0B3B36] italic font-bold">
            {weddingData.tradition.compliments}
          </p>
        </div>

        {/* 5. QR Code "Scan For Location" matching physical card in Teal & Mint */}
        <div className="pt-2 pb-1 flex flex-col items-center justify-center">
          <button
            onClick={() => setShowQRModal(true)}
            className="group flex flex-col items-center justify-center cursor-pointer p-2 rounded-xl hover:bg-[#E6F7F0]/70 transition-colors"
            title="Click to expand location QR code"
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white p-2 rounded-lg border-2 border-[#A7F3D0] shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Corners in deep teal and mint */}
                <rect x="5" y="5" width="28" height="28" rx="3" fill="#0A5C53" />
                <rect x="9" y="9" width="20" height="20" rx="2" fill="#F6FBF8" />
                <rect x="13" y="13" width="12" height="12" rx="1" fill="#0D9488" />

                <rect x="67" y="5" width="28" height="28" rx="3" fill="#0A5C53" />
                <rect x="71" y="9" width="20" height="20" rx="2" fill="#F6FBF8" />
                <rect x="75" y="13" width="12" height="12" rx="1" fill="#0D9488" />

                <rect x="5" y="67" width="28" height="28" rx="3" fill="#0A5C53" />
                <rect x="9" y="71" width="20" height="20" rx="2" fill="#F6FBF8" />
                <rect x="13" y="75" width="12" height="12" rx="1" fill="#0D9488" />

                {/* Data modules */}
                <rect x="38" y="10" width="8" height="8" fill="#0A5C53" />
                <rect x="50" y="10" width="10" height="8" fill="#0D9488" />
                <rect x="42" y="24" width="18" height="8" fill="#0A5C53" />

                <rect x="10" y="38" width="16" height="8" fill="#0A5C53" />
                <rect x="30" y="38" width="8" height="16" fill="#0D9488" />
                <rect x="42" y="38" width="16" height="16" fill="#0A5C53" />
                <rect x="62" y="38" width="12" height="8" fill="#0A5C53" />
                <rect x="78" y="38" width="14" height="16" fill="#0D9488" />

                <rect x="10" y="52" width="14" height="10" fill="#0D9488" />
                <rect x="62" y="52" width="10" height="10" fill="#0A5C53" />

                <rect x="38" y="62" width="12" height="14" fill="#0A5C53" />
                <rect x="54" y="62" width="8" height="8" fill="#0D9488" />
                <rect x="66" y="68" width="10" height="12" fill="#0A5C53" />
                <rect x="80" y="62" width="12" height="8" fill="#0D9488" />

                <rect x="38" y="80" width="8" height="12" fill="#0D9488" />
                <rect x="50" y="76" width="12" height="16" fill="#0A5C53" />
                <rect x="68" y="84" width="24" height="8" fill="#0A5C53" />
              </svg>
            </div>
            <span className="font-cinzel text-[11px] font-bold text-[#0D6E63] tracking-widest uppercase mt-1.5 group-hover:underline">
              Scan / Tap For Location
            </span>
          </button>
        </div>

      </div>

      {/* QR Code Modal for Mobile / Big Display */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4">
          <div className="bg-[#F6FBF8] border-2 border-[#A7F3D0] rounded-2xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl relative">
            <button
              onClick={() => setShowQRModal(false)}
              className="absolute top-3 right-3 text-[#0D6E63] text-xl font-bold p-1"
            >
              ✕
            </button>
            <h4 className="font-playfair text-xl font-bold text-[#0B3B36]">
              Scan For Wedding Locations
            </h4>
            <div className="w-56 h-56 mx-auto bg-white p-4 rounded-xl border border-[#A7F3D0] shadow-inner flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <rect x="5" y="5" width="28" height="28" rx="3" fill="#0A5C53" />
                <rect x="9" y="9" width="20" height="20" rx="2" fill="#F6FBF8" />
                <rect x="13" y="13" width="12" height="12" rx="1" fill="#0D9488" />

                <rect x="67" y="5" width="28" height="28" rx="3" fill="#0A5C53" />
                <rect x="71" y="9" width="20" height="20" rx="2" fill="#F6FBF8" />
                <rect x="75" y="13" width="12" height="12" rx="1" fill="#0D9488" />

                <rect x="5" y="67" width="28" height="28" rx="3" fill="#0A5C53" />
                <rect x="9" y="71" width="20" height="20" rx="2" fill="#F6FBF8" />
                <rect x="13" y="75" width="12" height="12" rx="1" fill="#0D9488" />

                <rect x="38" y="10" width="8" height="8" fill="#0A5C53" />
                <rect x="50" y="10" width="10" height="8" fill="#0D9488" />
                <rect x="42" y="24" width="18" height="8" fill="#0A5C53" />

                <rect x="10" y="38" width="16" height="8" fill="#0A5C53" />
                <rect x="30" y="38" width="8" height="16" fill="#0D9488" />
                <rect x="42" y="38" width="16" height="16" fill="#0A5C53" />
                <rect x="62" y="38" width="12" height="8" fill="#0A5C53" />
                <rect x="78" y="38" width="14" height="16" fill="#0D9488" />

                <rect x="10" y="52" width="14" height="10" fill="#0D9488" />
                <rect x="62" y="52" width="10" height="10" fill="#0A5C53" />

                <rect x="38" y="62" width="12" height="14" fill="#0A5C53" />
                <rect x="54" y="62" width="8" height="8" fill="#0D9488" />
                <rect x="66" y="68" width="10" height="12" fill="#0A5C53" />
                <rect x="80" y="62" width="12" height="8" fill="#0D9488" />

                <rect x="38" y="80" width="8" height="12" fill="#0D9488" />
                <rect x="50" y="76" width="12" height="16" fill="#0A5C53" />
                <rect x="68" y="84" width="24" height="8" fill="#0A5C53" />
              </svg>
            </div>
            <div className="space-y-2 pt-2">
              <a
                href={thalikettuEvent.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block py-2 px-4 rounded-lg bg-[#0D6E63] text-white font-cinzel text-xs font-bold shadow hover:bg-[#0D9488] transition-colors"
              >
                Open Mayilvahanam Hall in Maps
              </a>
              <a
                href={receptionEvent.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block py-2 px-4 rounded-lg bg-[#F6FBF8] border border-[#A7F3D0] text-[#0D6E63] font-cinzel text-xs font-bold hover:bg-[#E6F7F0] transition-colors"
              >
                Open Master Auditorium in Maps
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
