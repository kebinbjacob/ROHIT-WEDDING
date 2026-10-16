import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, MessageCircle, Heart, User, Users, Sparkles } from 'lucide-react';
import { weddingData } from '../config/weddingData';

export const RsvpSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState('2');
  const [selectedEvents, setSelectedEvents] = useState<string[]>(['thalikettu', 'reception']);
  const [wishes, setWishes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>('');

  const handleEventToggle = (eventId: string) => {
    setSelectedEvents(prev =>
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  };

  const handleWhatsAppRSVP = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      alert('Please enter your full name');
      return;
    }

    const eventNames = selectedEvents
      .map(id => (id === 'thalikettu' ? 'Marriage Ceremony (Thalikettu - Shoranur)' : 'Reception (Vailathur)'))
      .join(', ');

    const attendanceText = attending === 'yes' ? 'Joyfully Attending 🌿' : 'Regretfully Cannot Attend 🙏';

    const message = [
      `*Wedding RSVP - Rohith & Haritha*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `*Guest Name:* ${fullName}`,
      `*Status:* ${attendanceText}`,
      attending === 'yes' ? `*Number of Guests:* ${guestCount}` : null,
      attending === 'yes' ? `*Attending Events:* ${eventNames || 'Both Events'}` : null,
      wishes.trim() ? `*Heartfelt Wishes:* "${wishes}"` : null,
      `━━━━━━━━━━━━━━━━━━━━`,
      `_Sent from Rohith & Haritha's Digital Wedding Invitation_`
    ].filter(Boolean).join('\n');

    trySyncGoogleForm();

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${weddingData.contacts.whatsappNumber}?text=${encoded}`;
    window.open(waUrl, '_blank');

    setSubmitted(true);
    triggerCelebration();
  };

  const trySyncGoogleForm = () => {
    try {
      const form = document.createElement('form');
      form.action = weddingData.googleForms.formActionUrl;
      form.method = 'POST';
      form.target = 'hidden_gform';

      const appendField = (name: string, value: string) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = name;
        input.value = value;
        form.appendChild(input);
      };

      const attendanceVal = weddingData.googleForms.attendanceOptions[attending] || (attending === 'yes' ? 'Yes, joyfully attending' : 'Regretfully declining with best wishes');

      appendField(weddingData.googleForms.entryIds.name, fullName);
      appendField(weddingData.googleForms.entryIds.attendance, attendanceVal);

      if (attending === 'yes') {
        appendField(weddingData.googleForms.entryIds.guests, guestCount);
        
        // Append each selected event for Google Forms multi-checkbox
        selectedEvents.forEach(eventId => {
          const eventLabel = weddingData.googleForms.eventOptions[eventId as 'thalikettu' | 'reception'] || 
            (eventId === 'thalikettu' ? 'Marriage Solemnization (Thalikettu)' : 'Wedding Reception');
          appendField(weddingData.googleForms.entryIds.events, eventLabel);
        });
      }

      if (wishes.trim()) {
        appendField(weddingData.googleForms.entryIds.wishes, wishes.trim());
      }

      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      setSyncStatus('Saved securely to family guest list');
    } catch (err) {
      console.log('Background form sync handled gracefully', err);
    }
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 90,
        origin: { y: 0.7 },
        colors: ['#0D9488', '#14B8A6', '#A7F3D0', '#D4AF37', '#FFFFFF'],
      });
    } catch {
      // fallback
    }
  };

  return (
    <div id="rsvp-section" className="relative z-20 max-w-xl mx-auto my-10 px-4">
      <div className="bg-[#F6FBF8] border-2 border-[#A7F3D0] rounded-2xl p-6 sm:p-8 shadow-mint-card relative overflow-hidden">
        
        {/* Decorative corner borders */}
        <div className="absolute inset-1.5 border border-[#C2DFD4] rounded-xl pointer-events-none" />

        <div className="text-center mb-6 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#E6F7F0] border border-[#A7F3D0] text-xs font-cinzel text-[#0D6E63] font-bold uppercase tracking-wider mb-2">
            <Heart className="w-3 h-3 fill-[#0D9488] text-[#0D9488]" />
            RSVP & Blessings
          </div>
          <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#0B3B36] letterpress">
            Confirm Your Presence
          </h3>
          <p className="font-cormorant text-base text-[#1F4E47] italic">
            Kindly respond by 5 November 2026 to help us welcome you warmly
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-[#E6F7F0] border-2 border-[#0D6E63] rounded-full mx-auto flex items-center justify-center text-[#0D6E63] shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-playfair text-2xl font-bold text-[#0D6E63]">
              Thank You, {fullName}!
            </h4>
            <p className="font-cormorant text-lg text-[#1F4E47] italic max-w-md mx-auto">
              Your RSVP response and warm wishes have been joyfully noted. We eagerly look forward to celebrating together with you!
            </p>
            {syncStatus && (
              <span className="inline-block text-xs font-montserrat text-[#0D6E63] bg-[#E6F7F0] px-3 py-1 rounded-full border border-[#A7F3D0]">
                ✓ {syncStatus}
              </span>
            )}
            <div className="pt-4">
              <button
                onClick={() => setSubmitted(false)}
                className="font-cinzel text-xs text-[#0D6E63] underline underline-offset-4 hover:text-[#0A5C53] font-bold"
              >
                Submit another response
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleWhatsAppRSVP} className="space-y-4 text-left">
            {/* Full Name */}
            <div>
              <label className="block font-cinzel text-xs font-bold text-[#0B3B36] tracking-wider uppercase mb-1">
                Your Full Name *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh Kumar & Family"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  className="w-full bg-[#FFFFFF] border border-[#A7F3D0] rounded-xl px-4 py-2.5 text-sm font-montserrat text-[#0B3B36] placeholder-[#5A877E]/60 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 transition-all shadow-inner"
                />
                <User className="absolute right-3 top-3 w-4 h-4 text-[#0D9488]" />
              </div>
            </div>

            {/* Attendance Choice */}
            <div>
              <label className="block font-cinzel text-xs font-bold text-[#0B3B36] tracking-wider uppercase mb-1.5">
                Will you be attending? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setAttending('yes')}
                  className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-cinzel font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    attending === 'yes'
                      ? 'bg-[#0D6E63] text-[#F0FDF4] border-[#0D6E63] shadow-md'
                      : 'bg-[#FFFFFF] text-[#1F4E47] border-[#A7F3D0] hover:bg-[#E6F7F0]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#A7F3D0]" />
                  Joyfully Attend
                </button>
                <button
                  type="button"
                  onClick={() => setAttending('no')}
                  className={`py-2.5 px-3 rounded-xl border text-xs sm:text-sm font-cinzel font-bold tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    attending === 'no'
                      ? 'bg-[#0D6E63] text-[#F0FDF4] border-[#0D6E63] shadow-md'
                      : 'bg-[#FFFFFF] text-[#1F4E47] border-[#A7F3D0] hover:bg-[#E6F7F0]'
                  }`}
                >
                  Regretfully Cannot
                </button>
              </div>
            </div>

            {attending === 'yes' && (
              <>
                {/* Guest Count */}
                <div>
                  <label className="block font-cinzel text-xs font-bold text-[#0B3B36] tracking-wider uppercase mb-1">
                    Number of Attendees (Adults + Kids)
                  </label>
                  <div className="relative">
                    <select
                      value={guestCount}
                      onChange={e => setGuestCount(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#A7F3D0] rounded-xl px-4 py-2.5 text-sm font-montserrat text-[#0B3B36] focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 transition-all appearance-none cursor-pointer"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3">3 Persons</option>
                      <option value="4">4 Persons</option>
                      <option value="5+">5+ Family Members</option>
                    </select>
                    <Users className="absolute right-3 top-3 w-4 h-4 text-[#0D9488] pointer-events-none" />
                  </div>
                </div>

                {/* Event Checkboxes */}
                <div>
                  <label className="block font-cinzel text-xs font-bold text-[#0B3B36] tracking-wider uppercase mb-1.5">
                    Which events will you join?
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2.5 bg-[#FFFFFF] p-2.5 rounded-xl border border-[#A7F3D0] cursor-pointer hover:bg-[#E6F7F0]/60 transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes('thalikettu')}
                        onChange={() => handleEventToggle('thalikettu')}
                        className="w-4 h-4 accent-[#0D9488] rounded cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm font-playfair font-bold text-[#0B3B36]">
                        Marriage Solemnization (Thalikettu) - Shoranur (9:00 AM)
                      </span>
                    </label>

                    <label className="flex items-center gap-2.5 bg-[#FFFFFF] p-2.5 rounded-xl border border-[#A7F3D0] cursor-pointer hover:bg-[#E6F7F0]/60 transition-colors">
                      <input
                        type="checkbox"
                        checked={selectedEvents.includes('reception')}
                        onChange={() => handleEventToggle('reception')}
                        className="w-4 h-4 accent-[#0D9488] rounded cursor-pointer"
                      />
                      <span className="text-xs sm:text-sm font-playfair font-bold text-[#0B3B36]">
                        Wedding Reception - Master Auditorium, Vailathur (4:30 PM - 8:00 PM)
                      </span>
                    </label>
                  </div>
                </div>
              </>
            )}

            {/* Personal Wish / Blessing */}
            <div>
              <label className="block font-cinzel text-xs font-bold text-[#0B3B36] tracking-wider uppercase mb-1">
                Your Warm Blessing or Message for the Couple
              </label>
              <textarea
                rows={2}
                placeholder="Share your prayers, love, or heartfelt wishes for Rohith & Haritha..."
                value={wishes}
                onChange={e => setWishes(e.target.value)}
                className="w-full bg-[#FFFFFF] border border-[#A7F3D0] rounded-xl px-4 py-2 text-sm font-montserrat text-[#0B3B36] placeholder-[#5A877E]/60 focus:outline-none focus:ring-2 focus:ring-[#0D9488]/40 transition-all resize-none shadow-inner"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-[#0D6E63] via-[#0D9488] to-[#0A5C53] text-[#F0FDF4] font-cinzel text-xs sm:text-sm tracking-[0.2em] font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-[#0D9488] hover:to-[#0D6E63] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-[#A7F3D0]/60"
              >
                <MessageCircle className="w-4 h-4 text-[#A7F3D0]" />
                SEND RSVP VIA WHATSAPP
                <Send className="w-3.5 h-3.5 text-[#A7F3D0]" />
              </button>

              <p className="text-[11px] font-montserrat text-center text-[#1F4E47] italic">
                Directly sends to Groom's family WhatsApp ({weddingData.contacts.whatsappNumber}) & records your confirmation.
              </p>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
