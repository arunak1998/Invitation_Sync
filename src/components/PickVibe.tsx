import { motion } from 'motion/react';
import { VibeId, VibeOption } from '../types';

interface PickVibeProps {
  selectedVibe: VibeId | null;
  onSelect: (vibe: VibeId) => void;
  onContinue: () => void;
  accentHex: string;
}

export const vibeOptions: VibeOption[] = [
  { id: 'movie', emoji: '🎬', title: 'Movie', description: 'Cozy theater or streaming night' },
  { id: 'game', emoji: '🎲', title: 'Game Night', description: 'Friendly board games or trivia' },
  { id: 'walk', emoji: '🚶', title: 'Evening Walk', description: 'Fresh air & long casual talks' },
  { id: 'icecream', emoji: '🍦', title: 'Ice Cream', description: 'Sweet treats & simple laughter' },
  { id: 'surprise', emoji: '✨', title: 'Surprise Me', description: 'Let fate decide our mini adventure' },
];

export default function PickVibe({ selectedVibe, onSelect, onContinue, accentHex }: PickVibeProps) {
  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-8 py-4 px-2">
      <div className="space-y-2">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
        >
          What's more like you?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/50 italic font-light"
        >
          Pick the tone that fits your day.
        </motion.p>
      </div>

      {/* Grid of beautifully frosted activity cards with centering */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-4xl mx-auto py-2">
        {vibeOptions.map((act) => {
          const isSelected = selectedVibe === act.id;
          return (
            <motion.div
              key={act.id}
              id={`vibe-card-${act.id}`}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect(act.id)}
              style={{
                borderColor: isSelected ? accentHex : 'rgba(255,255,255,0.1)',
                boxShadow: isSelected ? `0 10px 25px ${accentHex}20` : 'none',
              }}
              className={`relative p-5 rounded-[24px] flex flex-col items-center justify-between text-center gap-3 cursor-pointer transition-all duration-300 min-h-[160px] border ${
                isSelected
                  ? 'bg-white/[0.08]'
                  : 'bg-white/[0.03] hover:bg-white/10'
              }`}
            >
              <div className="text-4xl filter drop-shadow-md select-none mt-2">
                {act.emoji}
              </div>

              <div className="space-y-1">
                <div className={`text-sm font-semibold transition-colors ${isSelected ? 'text-white' : 'text-white/60'}`}>
                  {act.title}
                </div>
                <div className="text-[10px] text-white/40 leading-tight">
                  {act.description}
                </div>
              </div>

              {isSelected && (
                <div 
                  className="absolute -top-1.5 -right-1.5 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-white shadow-md"
                  style={{ backgroundColor: accentHex }}
                >
                  Selected
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Continue */}
      <div className="w-full flex flex-col items-center gap-4 pt-4">
        <button
          id="continue-vibe-btn"
          disabled={!selectedVibe}
          onClick={onContinue}
          style={{ 
            boxShadow: selectedVibe ? `0 0 30px ${accentHex}33` : 'none',
          }}
          className={`px-12 py-4 rounded-full font-semibold text-sm transition-all duration-300 ${
            selectedVibe
              ? 'bg-white text-black hover:bg-opacity-90 hover:scale-105 cursor-pointer'
              : 'bg-white/10 text-white/30 cursor-not-allowed opacity-50'
          }`}
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
