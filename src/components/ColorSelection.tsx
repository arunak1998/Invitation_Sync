import { motion } from 'motion/react';
import { AccentColor, ColorOption } from '../types';

interface ColorSelectionProps {
  selectedColor: AccentColor;
  onSelect: (color: AccentColor) => void;
  onContinue: () => void;
  accentHex: string;
}

export const colorOptions: ColorOption[] = [
  { id: 'purple', label: 'Purple', emoji: '🟣', color: 'bg-purple-600', accentHex: '#A78BFA', gradientFrom: '#3B0764', fontClass: 'font-inter', fontName: 'Inter Sans' },
  { id: 'blue', label: 'Blue', emoji: '🔵', color: 'bg-blue-600', accentHex: '#3B82F6', gradientFrom: '#1E3A8A', fontClass: 'font-outfit', fontName: 'Outfit Rounded' },
  { id: 'cyan', label: 'Cyan', emoji: '🩵', color: 'bg-cyan-400', accentHex: '#22D3EE', gradientFrom: '#083344', fontClass: 'font-mono-jb', fontName: 'JetBrains Mono' },
  { id: 'white', label: 'White', emoji: '⚪', color: 'bg-white', accentHex: '#FFFFFF', gradientFrom: '#1F2937', fontClass: 'font-playfair', fontName: 'Playfair Serif' },
  { id: 'mint', label: 'Mint', emoji: '🟢', color: 'bg-emerald-400', accentHex: '#34D399', gradientFrom: '#064E3B', fontClass: 'font-grotesk', fontName: 'Space Grotesk' },
  { id: 'sunset', label: 'Sunset', emoji: '🌅', color: 'bg-gradient-to-tr from-pink-500 to-orange-400', accentHex: '#F97316', gradientFrom: '#7C2D12', fontClass: 'font-garamond', fontName: 'Royal Garamond' },
  { id: 'rose', label: 'Rose Pink', emoji: '🌸', color: 'bg-pink-400', accentHex: '#F472B6', gradientFrom: '#500724', fontClass: 'font-playfair', fontName: 'Rose Serif' },
  { id: 'gold', label: 'Amber Gold', emoji: '✨', color: 'bg-amber-400', accentHex: '#F59E0B', gradientFrom: '#451A03', fontClass: 'font-garamond', fontName: 'Gold Garamond' },
  { id: 'indigo', label: 'Cosmic Indigo', emoji: '🌌', color: 'bg-indigo-600', accentHex: '#6366F1', gradientFrom: '#1E1B4B', fontClass: 'font-grotesk', fontName: 'Space Cosmic' },
  { id: 'forest', label: 'Forest Green', emoji: '🌲', color: 'bg-green-600', accentHex: '#10B981', gradientFrom: '#022C22', fontClass: 'font-inter', fontName: 'Forest Sans' },
  { id: 'crimson', label: 'Crimson Red', emoji: '🍷', color: 'bg-red-600', accentHex: '#EF4444', gradientFrom: '#450A0A', fontClass: 'font-playfair', fontName: 'Crimson Serif' },
  { id: 'lavender', label: 'Lavender', emoji: '🪻', color: 'bg-fuchsia-500', accentHex: '#D8B4FE', gradientFrom: '#2E1065', fontClass: 'font-outfit', fontName: 'Lavender Round' },
  { id: 'peach', label: 'Sweet Peach', emoji: '🍑', color: 'bg-orange-300', accentHex: '#FDBA74', gradientFrom: '#431407', fontClass: 'font-garamond', fontName: 'Peach Garamond' },
  { id: 'coral', label: 'Coral Orange', emoji: '🪸', color: 'bg-coral-500 bg-orange-500', accentHex: '#FF7F50', gradientFrom: '#5C1D02', fontClass: 'font-grotesk', fontName: 'Coral Grotesk' },
  { id: 'platina', label: 'Platinum Silver', emoji: '💿', color: 'bg-slate-300', accentHex: '#E2E8F0', gradientFrom: '#1E293B', fontClass: 'font-mono-jb', fontName: 'Platina Mono' },
];

export default function ColorSelection({ selectedColor, onSelect, onContinue, accentHex }: ColorSelectionProps) {
  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-8 py-4 px-2">
      <div className="space-y-2">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
        >
          Let's make this your page ✨
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/50 italic font-light"
        >
          Pick a color you like. The entire website theme and font will adapt.
        </motion.p>
      </div>

      {/* Beautiful animated color circles grid */}
      <div className="grid grid-cols-3 sm:grid-cols-5 gap-6 max-w-xl mx-auto py-6">
        {colorOptions.map((opt) => {
          const isSelected = selectedColor === opt.id;
          return (
            <motion.div
              key={opt.id}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onSelect(opt.id)}
              className="flex flex-col items-center gap-2 cursor-pointer relative"
            >
              {/* Pulsing ring background if selected */}
              <div className="relative flex items-center justify-center">
                {isSelected && (
                  <motion.div
                    layoutId="selectedColorRing"
                    className="absolute -inset-2.5 rounded-full border-2"
                    style={{ borderColor: opt.accentHex, boxShadow: `0 0 15px ${opt.accentHex}40` }}
                    transition={{ type: 'spring', stiffness: 250, damping: 25 }}
                  />
                )}
                <div 
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg transition-transform ${opt.color} ${
                    opt.id === 'white' ? 'border border-white/20 text-black' : 'text-white'
                  }`}
                >
                  <span className="select-none filter drop-shadow-sm">{opt.emoji}</span>
                </div>
              </div>

              <span className={`text-[11px] mt-1.5 transition-colors whitespace-nowrap ${isSelected ? 'font-semibold text-white' : 'text-white/40'}`}>
                {opt.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      {/* Smoothly appearing continue button */}
      <div className="pt-4 flex justify-center">
        <button
          id="continue-color-btn"
          onClick={onContinue}
          style={{ 
            boxShadow: `0 0 30px ${accentHex}33`,
            borderColor: `${accentHex}33`,
          }}
          className="px-12 py-4 bg-white text-black hover:bg-opacity-90 hover:scale-105 rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer"
        >
          Continue →
        </button>
      </div>
    </div>
  );
}
