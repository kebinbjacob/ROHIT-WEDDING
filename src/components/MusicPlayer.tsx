import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { templeAudio } from '../utils/audioEngine';
import { weddingData } from '../config/weddingData';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [showSlider, setShowSlider] = useState(false);
  const [waveHeights, setWaveHeights] = useState([35, 60, 90, 45]);

  useEffect(() => {
    const unsub = templeAudio.onStateChange((playing) => {
      setIsPlaying(playing);
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    let frameId: number;

    const updateWaveform = () => {
      const analyser = templeAudio.getAnalyser();
      if (isPlaying && analyser) {
        const dataArray = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(dataArray);

        const b1 = Math.max(20, (dataArray[2] / 255) * 100);
        const b2 = Math.max(25, (dataArray[6] / 255) * 100);
        const b3 = Math.max(20, (dataArray[12] / 255) * 100);
        const b4 = Math.max(25, (dataArray[18] / 255) * 100);
        setWaveHeights([b1, b2, b3, b4]);
      } else if (!isPlaying) {
        setWaveHeights([20, 20, 20, 20]);
      }
      frameId = requestAnimationFrame(updateWaveform);
    };

    frameId = requestAnimationFrame(updateWaveform);
    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  const togglePlay = () => {
    templeAudio.toggle();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    templeAudio.setVolume(val);
  };

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center select-none">
      {/* Expanded Volume Slider Drawer */}
      <div
        className={`flex items-center bg-[#F6FBF8]/95 backdrop-blur-md border border-[#A7F3D0] rounded-full py-1.5 px-3 mr-2 shadow-lg transition-all duration-300 ${
          showSlider ? 'opacity-100 translate-x-0 w-36 pointer-events-auto' : 'opacity-0 translate-x-4 w-0 pointer-events-none overflow-hidden p-0 m-0 border-0'
        }`}
      >
        <button
          onClick={() => {
            const newVol = volume > 0 ? 0 : 0.6;
            setVolume(newVol);
            templeAudio.setVolume(newVol);
          }}
          className="text-[#0D6E63] mr-2 hover:scale-110 transition-transform"
          aria-label="Mute or Unmute"
        >
          {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 h-1.5 bg-[#D1FAE5] rounded-lg appearance-none cursor-pointer accent-[#0D9488]"
        />
      </div>

      {/* Main Pill Button */}
      <div className="flex items-center bg-[#F6FBF8]/90 hover:bg-[#F6FBF8] backdrop-blur-md border border-[#A7F3D0] rounded-full shadow-[0_4px_16px_rgba(10,92,83,0.15)] p-1.5 pr-3.5 transition-all duration-300 hover:shadow-mint-card group">
        
        {/* Play/Pause Circle Button in Vibrant Teal */}
        <button
          onClick={togglePlay}
          className="w-9 h-9 rounded-full bg-gradient-to-br from-[#0D9488] to-[#0A5C53] text-[#F0FDF4] flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-transform mr-2"
          aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
          title={isPlaying ? "Pause music" : "Play auspicious flute & tanpura"}
        >
          {isPlaying ? (
            <Pause className="w-4 h-4 fill-current text-[#F0FDF4]" />
          ) : (
            <Play className="w-4 h-4 fill-current text-[#F0FDF4] ml-0.5" />
          )}
        </button>

        {/* Info & Animated Waveform */}
        <div
          onClick={() => setShowSlider(!showSlider)}
          className="cursor-pointer flex flex-col justify-center"
        >
          <div className="flex items-center gap-1.5">
            <span className="font-cinzel text-[11px] font-bold text-[#0D6E63] tracking-wider uppercase">
              {isPlaying ? 'Music Playing' : 'Shehnai / Flute'}
            </span>

            {/* 4-bar SVG waveform visualizer in Teal & Mint */}
            <div className="flex items-end gap-[2px] h-3 w-5 ml-1">
              {waveHeights.map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${Math.min(100, Math.max(15, h))}%` }}
                  className={`w-[2.5px] rounded-full transition-all duration-100 ${
                    isPlaying ? 'bg-[#0D9488]' : 'bg-[#A7F3D0]'
                  }`}
                />
              ))}
            </div>
          </div>
          <span className="text-[9px] font-montserrat text-[#1F4E47]/80 truncate max-w-[120px]">
            {weddingData.audio.trackTitle}
          </span>
        </div>
      </div>
    </div>
  );
};
