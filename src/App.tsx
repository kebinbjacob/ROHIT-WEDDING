import React, { useState } from 'react';
import { PetalCanvas } from './components/PetalCanvas';
import { MusicPlayer } from './components/MusicPlayer';
import { WaxSealEnvelope } from './components/WaxSealEnvelope';
import { CameoHeader } from './components/CameoHeader';
import { CoupleSection } from './components/CoupleSection';
import { CountdownTicker } from './components/CountdownTicker';
import { CardCenterpiece } from './components/CardCenterpiece';
import { VenueLocationHub } from './components/VenueLocationHub';
import { RsvpSection } from './components/RsvpSection';
import { FooterSection } from './components/FooterSection';
import { CornerFiligree } from './components/CornerFiligree';

export const App: React.FC = () => {
  const [envelopeOpened, setEnvelopeOpened] = useState(false);

  const handleOpenEnvelope = () => {
    setEnvelopeOpened(true);
  };

  const handleReplayEnvelope = () => {
    setEnvelopeOpened(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#EEF6F2] relative text-[#0B3B36] overflow-x-hidden selection:bg-[#A7F3D0]/60 selection:text-[#0B3B36]">
      {/* 1. Ambient Falling Mint Leaves, Emerald Petals & Gold Dust Canvas */}
      <PetalCanvas />

      {/* 2. Floating Sticky Audio Player with Animated Waveform */}
      <MusicPlayer />

      {/* 3. Interactive Opening Envelope / Wax Seal Modal Curtain */}
      <WaxSealEnvelope
        isOpen={envelopeOpened}
        onOpen={handleOpenEnvelope}
      />

      {/* 4. Luxury Letterpress Pastel Mint & Vibrant Teal Card Wrapper */}
      <main className="relative z-20 py-8 px-3 sm:px-6 md:py-14 flex justify-center">
        <div className="relative w-full max-w-2xl bg-[#F6FBF8] rounded-3xl border border-[#C2DFD4] shadow-[0_20px_50px_-10px_rgba(10,92,83,0.12),0_10px_20px_-5px_rgba(10,92,83,0.06)] overflow-hidden">
          
          {/* Authentic Mint Paper Grain Texture Overlay */}
          <div className="absolute inset-0 mint-grain opacity-85 pointer-events-none" />

          {/* Double Teal & Mint Inset Border */}
          <div className="absolute inset-2.5 sm:inset-3.5 border border-[#A7F3D0] rounded-2xl pointer-events-none" />
          <div className="absolute inset-4 sm:inset-5 border border-dashed border-[#0D6E63]/25 rounded-xl pointer-events-none" />

          {/* Four Corner Vintage Botanical Filigrees in Vibrant Teal */}
          <CornerFiligree position="top-left" />
          <CornerFiligree position="top-right" />
          <CornerFiligree position="bottom-left" />
          <CornerFiligree position="bottom-right" />

          {/* Content Stack */}
          <div className="relative z-10 px-2 sm:px-6 py-6 sm:py-10">
            {/* Header: Cameo Medallion & Invocation */}
            <CameoHeader />

            {/* Couple Calligraphy & 3D Tilt Section */}
            <CoupleSection />

            {/* Live Countdown to Muhurtham */}
            <CountdownTicker />

            {/* Centerpiece: Physical Card 3-Column Highlight Grid & Thalikettu Details */}
            <CardCenterpiece />

            {/* Venues, Maps & Navigation Hub */}
            <VenueLocationHub />

            {/* Dual RSVP Section (WhatsApp + Google Form) */}
            <RsvpSection />

            {/* Footer with Social Sharing, Original Card Preview & Compliments */}
            <FooterSection onReplayEnvelope={handleReplayEnvelope} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
