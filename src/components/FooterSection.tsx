import React, { useState } from 'react';
import { Copy, Check, MessageCircle, RotateCcw, Image } from 'lucide-react';
import { weddingData } from '../config/weddingData';
import { DividerFlourish } from './DividerFlourish';

interface FooterSectionProps {
  onReplayEnvelope: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onReplayEnvelope }) => {
  const [copied, setCopied] = useState(false);
  const [showOriginalModal, setShowOriginalModal] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = `🌿 *Wedding Invitation: Rohith & Haritha* 🌿\n\nWe cordially invite you and your family for the auspicious wedding ceremony on Sunday, 15 November 2026.\n\nView interactive digital invitation & map directions here:\n${window.location.href}`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <footer className="relative z-20 max-w-xl mx-auto my-12 px-4 text-center select-none">
      
      {/* Quick Action Share Pill Buttons in Mint & Teal */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F6FBF8] hover:bg-[#E6F7F0] text-[#0D6E63] font-cinzel text-xs font-bold rounded-full border border-[#A7F3D0] shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5 text-[#0D9488]" />}
          {copied ? 'Link Copied!' : 'Copy Invitation Link'}
        </button>

        <button
          onClick={handleShareWhatsApp}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#E6F7F0] hover:bg-[#D1FAE5] text-[#0D6E63] font-cinzel text-xs font-bold rounded-full border border-[#A7F3D0] shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <MessageCircle className="w-3.5 h-3.5 text-[#0D9488]" />
          Share on WhatsApp
        </button>

        <button
          onClick={() => setShowOriginalModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F6FBF8] hover:bg-[#E6F7F0] text-[#1F4E47] font-cinzel text-xs font-bold rounded-full border border-[#A7F3D0] shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <Image className="w-3.5 h-3.5 text-[#0D9488]" />
          View Original Card
        </button>

        <button
          onClick={onReplayEnvelope}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F6FBF8] hover:bg-[#E6F7F0] text-[#1F4E47] font-cinzel text-xs font-bold rounded-full border border-[#A7F3D0] shadow-sm transition-all hover:scale-105 active:scale-95"
        >
          <RotateCcw className="w-3.5 h-3.5 text-[#0D9488]" />
          Replay Envelope
        </button>
      </div>

      <DividerFlourish className="my-6" />

      {/* Warm Blessing Quote */}
      <div className="max-w-md mx-auto space-y-2 mb-6">
        <p className="font-cormorant text-lg sm:text-xl text-[#0B3B36] italic leading-relaxed font-medium">
          {weddingData.tradition.blessingQuote}
        </p>
        <span className="font-cinzel text-xs tracking-widest text-[#0D6E63] font-bold block">
          {weddingData.couple.monogram}
        </span>
      </div>

      {/* Footer credits & compliment */}
      <div className="pt-4 border-t border-[#A7F3D0]/60 text-xs font-montserrat text-[#1F4E47] space-y-1">
        <p className="font-bold text-[#0D6E63]">
          {weddingData.tradition.compliments}
        </p>
        <p className="text-[11px] text-[#366961]">
          Sunday, 15 November 2026 • Vailathur & Shoranur, Kerala
        </p>
      </div>

      {/* Modal to View Original Printed Card */}
      {showOriginalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="relative max-w-md w-full bg-[#F6FBF8] border-2 border-[#A7F3D0] rounded-2xl p-4 shadow-2xl text-center">
            <button
              onClick={() => setShowOriginalModal(false)}
              className="absolute top-3 right-3 text-[#0D6E63] text-2xl font-bold p-1 z-10"
            >
              ✕
            </button>
            <h4 className="font-playfair text-lg font-bold text-[#0B3B36] mb-3">
              Original Printed Invitation Card
            </h4>
            <div className="max-h-[75vh] overflow-y-auto rounded-lg border border-[#A7F3D0] shadow-inner">
              <img
                src={weddingData.couple.originalCardUrl || "/invitation_original.png"}
                alt="Original Printed Wedding Invitation"
                className="w-full h-auto object-contain"
              />
            </div>
            <p className="text-xs font-montserrat text-[#1F4E47] mt-3">
              Re-imagined with a luxury Vibrant Teal-Green & Pastel Mint theme.
            </p>
          </div>
        </div>
      )}

    </footer>
  );
};
