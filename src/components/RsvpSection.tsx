import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, MessageCircle, Heart, User, Users, Sparkles, Check, Send } from 'lucide-react';
import { weddingData } from '../config/weddingData';

export const RsvpSection: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState('2');
  const [selectedEvents, setSelectedEvents] = useState<string[]>(['thalikettu', 'reception']);
  const [wishes, setWishes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [syncStatus, setSyncStatus] = useState<string>('');

  const handleEventToggle = (eventId: string) => {
    setSelectedEvents(prev =>
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  };

  const syncToGoogleForm = () => {
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

      const attendanceVal = weddingData.googleForms.attendanceOptions[attending] || 
        (attending === 'yes' ? 'Yes, joyfully attending' : 'Regretfully declining with best wishes');

      appendField(weddingData.googleForms.entryIds.name, fullName.trim());
      appendField(weddingData.googleForms.entryIds.attendance, attendanceVal);

      if (attending === 'yes') {
        appendField(weddingData.googleForms.entryIds.guests, guestCount);
        
        // Multi-checkbox options for Google Forms
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
      setSyncStatus('Recorded directly in family guest list');
    } catch (err) {
      console.log('Background form sync handled gracefully', err);
    }
  };

  const handleSubmitRSVP = (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim()) {
      alert('Please enter your full name');
      return;
    }

    setIsSubmitting(true);

    // Sync to Google Form
    syncToGoogleForm();

    triggerCelebration();

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleSendViaWhatsApp = () => {
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
      `_Submitted via Rohith & Haritha's Digital Wedding Invitation_`
    ].filter(Boolean).join('\n');

    const encoded = encodeURIComponent(message);
    const waUrl = `https://wa.me/${weddingData.contacts.whatsappNumber}?text=${encoded}`;
    window.open(waUrl, '_blank');
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 90,
        origin: { y: 0.65 },
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
            
            <div className="space-y-1">
              <h4 className="font-playfair text-2xl font-bold text-[#0D6E63]">
                RSVP Confirmed!
              </h4>
              <p className="font-montserrat text-sm font-semibold text-[#0B3B36]">
                Thank you, {fullName}
              </p>
            </div>

            <p className="font-cormorant text-lg text-[#1F4E47] italic max-w-md mx-auto">
              Your RSVP response and warm wishes have been saved directly to our guest list. We eagerly look forward to celebrating together with you!
            </p>

            {syncStatus && (
              <span className="inline-block text-xs font-montserrat text-[#0D6E63] bg-[#E6F7F0] px-3.5 py-1 rounded-full border border-[#A7F3D0] font-medium">
                ✓ {syncStatus}
              </span>
            )}

            {/* Optional WhatsApp Confirmation Share */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleSendViaWhatsApp}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#128C7E] font-cinzel text-xs font-bold rounded-xl border border-[#25D366]/40 shadow-sm transition-all hover:scale-105 active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-[#25D366]" />
                Send Copy on WhatsApp
              </button>

              <button
                onClick={() => setSubmitted(false)}
                className="text-xs font-cinzel text-[#0D6E63] hover:text-[#0A5C53] font-bold underline underline-offset-4 py-2"
              >
                Submit another response
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitRSVP} className="space-y-4 text-left">
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

            {/* Action Buttons: SUBMIT RSVP (Primary) + Optional WhatsApp button */}
            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-[#0D6E63] via-[#0D9488] to-[#0A5C53] text-[#F0FDF4] font-cinzel text-sm tracking-[0.2em] font-bold rounded-xl shadow-lg hover:shadow-xl hover:from-[#0D9488] hover:to-[#0D6E63] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-[#A7F3D0]/60 cursor-pointer disabled:opacity-75"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                    RECORDING RSVP...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 text-[#A7F3D0]" />
                    SUBMIT RSVP
                    <Sparkles className="w-4 h-4 text-[#A7F3D0]" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (!fullName.trim()) {
                    alert('Please enter your full name first');
                    return;
                  }
                  syncToGoogleForm();
                  handleSendViaWhatsApp();
                  triggerCelebration();
                  setSubmitted(true);
                }}
                className="w-full py-2.5 px-4 bg-[#E6F7F0] hover:bg-[#D1FAE5] text-[#0D6E63] font-cinzel text-xs font-bold rounded-xl border border-[#A7F3D0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#0D9488]" />
                Or Submit & Send via WhatsApp
                <Send className="w-3.5 h-3.5 text-[#0D9488]" />
              </button>

              <p className="text-[11px] font-montserrat text-center text-[#1F4E47] italic">
                Directly connects to our Google Form guest sheet & confirms your seat instantly.
              </p>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
