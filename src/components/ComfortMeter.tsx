import { motion, AnimatePresence } from 'motion/react';
import { ComfortLevel, ComfortOption } from '../types';

interface ComfortMeterProps {
  selectedComfort: ComfortLevel;
  onSelect: (level: ComfortLevel) => void;
  onContinue: () => void;
  accentHex: string;
}

export const comfortOptions: ComfortOption[] = [
  {
    level: 1,
    emoji: '😀',
    label: 'Excited',
    supportiveText: 'Sounds fun already 😄',
  },
  {
    level: 2,
    emoji: '😄',
    label: 'Happy',
    supportiveText: "I'd love to chat and catch up! ✨",
  },
  {
    level: 3,
    emoji: '🙂',
    label: 'Comfortable',
    supportiveText: "Sounds like a nice idea! Let's do it.",
  },
  {
    level: 4,
    emoji: '🤔',
    label: 'Curious',
    supportiveText: 'A bit curious, but why not explore? 🤔',
  },
  {
    level: 5,
    emoji: '🙈',
    label: 'Shy',
    supportiveText: 'Totally okay. No pressure at all.',
  },
];

export default function ComfortMeter({
  selectedComfort,
  onSelect,
  onContinue,
  accentHex,
}: ComfortMeterProps) {
  const currentOption = comfortOptions.find((opt) => opt.level === selectedComfort) || comfortOptions[2];

  return (
    <div className="w-full max-w-xl mx-auto text-center space-y-8 py-4 px-2">
      <div className="space-y-2">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
        >
          How are you feeling?
        </motion.h2>
        <p className="text-sm text-white/50 max-w-sm mx-auto italic font-light">
          How are you feeling about this idea?
        </p>
      </div>

      {/* Tactile Emoji Horizontal Selector */}
      <div className="max-w-md mx-auto bg-white/[0.03] border border-white/10 p-6 rounded-[32px] backdrop-blur-3xl relative">
        <div className="flex justify-between items-center px-2 relative">
          
          {/* Subtle joining path */}
          <div className="absolute top-[28px] left-8 right-8 h-[2px] bg-white/10 rounded-full z-0" />
          
          {comfortOptions.map((opt) => {
            const isSelected = selectedComfort === opt.level;
            return (
              <button
                key={opt.level}
                onClick={() => onSelect(opt.level)}
                className="flex flex-col items-center gap-2 cursor-pointer z-10 focus:outline-none"
              >
                {/* Elastic glowing ring around selected emoji */}
                <motion.div
                  animate={{
                    scale: isSelected ? 1.25 : 1.0,
                    y: isSelected ? -4 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  style={{
                    borderColor: isSelected ? accentHex : 'rgba(255,255,255,0.1)',
                    boxShadow: isSelected ? `0 0 20px ${accentHex}40` : 'none',
                    backgroundColor: isSelected ? `${accentHex}1A` : 'rgba(255,255,255,0.05)',
                  }}
                  className="w-14 h-14 rounded-full flex items-center justify-center text-3xl transition-all duration-300 border hover:scale-105"
                >
                  <span className={`${isSelected ? 'animate-bounce' : ''}`}>{opt.emoji}</span>
                </motion.div>

                {/* Micro Label beneath */}
                <span 
                  style={{ color: isSelected ? accentHex : 'rgba(255,255,255,0.4)' }}
                  className="text-[10px] mt-2 transition-colors duration-300 font-medium"
                >
                  {opt.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Supportive Text Box with sliding fade effect */}
        <div className="mt-8 min-h-[90px] flex items-center justify-center bg-black/20 rounded-2xl p-4 border border-white/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedComfort}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <p className="text-white/70 text-sm leading-relaxed font-light">
                {currentOption.supportiveText}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Continue */}
      <div className="pt-4 flex justify-center">
        <button
          id="continue-comfort-btn"
          onClick={onContinue}
          style={{ 
            boxShadow: `0 0 30px ${accentHex}33`,
          }}
          className="px-12 py-4 bg-white text-black rounded-full font-semibold text-sm hover:bg-opacity-90 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
