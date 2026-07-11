import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ambientSynth } from '../utils/audio';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  // Read initial toggle status from sessionStorage
  useEffect(() => {
    const savedMusicChoice = sessionStorage.getItem('lofi_music_choice');
    if (savedMusicChoice === 'enabled') {
      // Auto-start can trigger block in browsers due to gesture mandates,
      // so we wait for a click or user gesture to play correctly, or handle safely.
      // But we can check if it's already active.
      setIsPlaying(ambientSynth.getActiveState());
    }
  }, []);

  const handleToggle = () => {
    const nextState = ambientSynth.toggle();
    setIsPlaying(nextState);
    if (nextState) {
      sessionStorage.setItem('lofi_music_choice', 'enabled');
    } else {
      sessionStorage.setItem('lofi_music_choice', 'disabled');
    }
  };

  // Safe release on unmount
  useEffect(() => {
    return () => {
      // We keep it playing across pages unless they refresh,
      // but let's make sure it's controlled cleanly.
    };
  }, []);

  return (
    <button
      id="music-toggle-btn"
      onClick={handleToggle}
      className={`fixed top-5 right-5 z-50 p-3 rounded-full border backdrop-blur-md cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg select-none ${
        isPlaying
          ? 'bg-purple-950/25 border-purple-500/50 shadow-purple-500/25 text-purple-400 scale-105'
          : 'bg-zinc-900/35 border-white/10 text-zinc-400 hover:text-white hover:border-white/25 hover:scale-105'
      }`}
      title={isPlaying ? 'Mute cozy ambience' : 'Play cozy lo-fi ambience'}
    >
      {/* Visual active audio equalizer wavebars */}
      {isPlaying && (
        <div className="flex gap-0.5 h-3 items-end pr-0.5" id="audio-equalizer">
          <motion.div 
            animate={{ height: [4, 12, 4] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            className="w-[2px] bg-purple-400 rounded-full" 
          />
          <motion.div 
            animate={{ height: [8, 4, 12, 8] }}
            transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut", delay: 0.15 }}
            className="w-[2px] bg-purple-400 rounded-full" 
          />
          <motion.div 
            animate={{ height: [6, 12, 6] }}
            transition={{ repeat: Infinity, duration: 0.7, ease: "easeInOut", delay: 0.3 }}
            className="w-[2px] bg-purple-400 rounded-full" 
          />
        </div>
      )}

      {/* Floating Sparkle indicator for offline play */}
      <span className="text-md relative">
        🎵
        {!isPlaying && (
          <span className="absolute -top-1 -right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500" />
          </span>
        )}
      </span>

      {/* Slide-out helper hover label */}
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out text-[11px] font-medium tracking-tight whitespace-nowrap">
        {isPlaying ? 'Lofi Ambient Playing' : 'Play Ambience'}
      </span>
    </button>
  );
}
