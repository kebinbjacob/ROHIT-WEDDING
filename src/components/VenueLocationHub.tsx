import React from 'react';
import { MapPin, Navigation, CalendarPlus, ExternalLink, Clock } from 'lucide-react';
import { weddingData } from '../config/weddingData';
import { openGoogleCalendar } from '../utils/calendarUtils';

export const VenueLocationHub: React.FC = () => {
  return (
    <div className="relative z-20 max-w-xl mx-auto my-8 px-4">
      <div className="text-center mb-6">
        <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[#0D6E63] tracking-wider uppercase">
          Venues & Directions
        </h3>
        <p className="font-cormorant text-base text-[#1F4E47] italic">
          Join us in person to shower your heartfelt blessings
        </p>
      </div>

      <div className="space-y-6">
        {weddingData.events.map((event) => (
          <div
            key={event.id}
            className="bg-[#F6FBF8] border border-[#A7F3D0] rounded-2xl p-5 shadow-[0_6px_20px_rgba(10,92,83,0.06)] hover:shadow-mint-card transition-all duration-300 relative overflow-hidden group"
          >
            {/* Top Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-cinzel text-xs font-bold text-[#0D6E63] bg-[#E6F7F0] px-3 py-1 rounded-full border border-[#A7F3D0] tracking-wider">
                {event.badge}
              </span>
              <span className="text-xs font-montserrat font-medium text-[#1F4E47]">
                {event.date}
              </span>
            </div>

            {/* Title & Timing */}
            <h4 className="font-playfair text-xl font-bold text-[#0B3B36]">
              {event.title}
            </h4>
            
            <div className="flex items-center gap-2 text-sm font-bold text-[#0D6E63] mt-1">
              <Clock className="w-4 h-4 text-[#0D9488]" />
              <span>{event.time}</span>
              {event.malayalamCalendar && (
                <span className="text-xs font-normal text-[#1F4E47]">
                  ({event.malayalamCalendar})
                </span>
              )}
            </div>

            {/* Venue & Landmark in Mint Box */}
            <div className="mt-3 p-3 rounded-xl bg-[#E6F7F0]/80 border border-[#A7F3D0] space-y-1">
              <div className="flex items-start gap-2 text-sm text-[#0B3B36]">
                <MapPin className="w-4 h-4 text-[#0D6E63] shrink-0 mt-0.5" />
                <div>
                  <strong className="font-playfair font-bold text-base block text-[#0B3B36]">
                    {event.venue}
                  </strong>
                  <span className="font-cormorant italic text-base text-[#1F4E47] block">
                    {event.landmark}, {event.city}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            {event.description && (
              <p className="font-cormorant text-sm sm:text-base text-[#1F4E47] italic mt-3 leading-relaxed">
                {event.description}
              </p>
            )}

            {/* Action buttons */}
            <div className="mt-4 pt-3 border-t border-[#A7F3D0]/60 flex flex-wrap gap-2.5">
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-[#0D6E63] via-[#0D9488] to-[#0A5C53] text-[#F0FDF4] font-cinzel text-xs font-bold rounded-xl shadow hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <Navigation className="w-3.5 h-3.5 text-[#A7F3D0]" />
                Get Directions
                <ExternalLink className="w-3 h-3 text-[#A7F3D0]" />
              </a>

              <button
                onClick={() => openGoogleCalendar(event)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#F6FBF8] hover:bg-[#E6F7F0] text-[#0D6E63] hover:text-[#0A5C53] font-cinzel text-xs font-bold rounded-xl border border-[#A7F3D0] transition-colors shadow-sm"
                title="Add event to Google Calendar"
              >
                <CalendarPlus className="w-3.5 h-3.5 text-[#0D9488]" />
                Google Calendar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
