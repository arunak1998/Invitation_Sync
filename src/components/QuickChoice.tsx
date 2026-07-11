import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface QuickChoiceProps {
  selectedDrink: string;
  onSelect: (drink: string) => void;
  onContinue: () => void;
  onCoffeeTapTenTimes: () => void;
  accentHex: string;
}

export default function QuickChoice({
  selectedDrink,
  onSelect,
  onContinue,
  onCoffeeTapTenTimes,
  accentHex,
}: QuickChoiceProps) {
  const [typedDrink, setTypedDrink] = useState('');
  const coffeeTaps = useRef(0);

  // Initialize input field if a custom typed drink is currently stored
  useEffect(() => {
    if (selectedDrink && selectedDrink !== 'Coffee' && selectedDrink !== 'Tea') {
      setTypedDrink(selectedDrink);
    } else {
      setTypedDrink('');
    }
  }, [selectedDrink]);

  const handleCardSelect = (drink: string) => {
    onSelect(drink);
    setTypedDrink(''); // Clear typing since they selected a card

    if (drink === 'Coffee') {
      coffeeTaps.current += 1;
      if (coffeeTaps.current === 10) {
        onCoffeeTapTenTimes();
        coffeeTaps.current = 0; // reset
      }
    } else {
      coffeeTaps.current = 0;
    }
  };

  const handleInputChange = (val: string) => {
    setTypedDrink(val);
    if (val.trim()) {
      onSelect(val);
    } else {
      onSelect(''); // nothing selected
    }
  };

  const isCoffee = selectedDrink === 'Coffee';
  const isTea = selectedDrink === 'Tea';
  const isCustom = selectedDrink && !isCoffee && !isTea;

  return (
    <div className="w-full max-w-md mx-auto text-center space-y-8 py-4 px-2">
      <div className="space-y-2">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
        >
          Choose one 😊
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/50 italic font-light"
        >
          What's your preferred brew?
        </motion.p>
      </div>

      {/* Two beautiful animated cards */}
      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto py-2">
        {/* Coffee Card */}
        <motion.div
          id="choice-coffee-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCardSelect('Coffee')}
          style={{
            borderColor: isCoffee ? accentHex : 'rgba(255,255,255,0.1)',
            boxShadow: isCoffee ? `0 0 20px ${accentHex}20` : 'none',
          }}
          className={`relative p-6 rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer border transition-all duration-300 ${
            isCoffee ? 'bg-white/[0.08]' : 'bg-white/[0.03] hover:bg-white/10'
          }`}
        >
          <div className="text-5xl filter drop-shadow-md select-none">☕</div>
          <span className={`text-md font-medium ${isCoffee ? 'text-white font-semibold' : 'text-white/60'}`}>
            Coffee
          </span>
          {isCoffee && (
            <motion.div
              layoutId="drinkCheck"
              className="absolute -top-1.5 -right-1.5 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-white shadow-md"
              style={{ backgroundColor: accentHex }}
            >
              Selected
            </motion.div>
          )}
        </motion.div>

        {/* Tea Card */}
        <motion.div
          id="choice-tea-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCardSelect('Tea')}
          style={{
            borderColor: isTea ? accentHex : 'rgba(255,255,255,0.1)',
            boxShadow: isTea ? `0 0 20px ${accentHex}20` : 'none',
          }}
          className={`relative p-6 rounded-3xl flex flex-col items-center justify-center gap-3 cursor-pointer border transition-all duration-300 ${
            isTea ? 'bg-white/[0.08]' : 'bg-white/[0.03] hover:bg-white/10'
          }`}
        >
          <div className="text-5xl filter drop-shadow-md select-none">🍵</div>
          <span className={`text-md font-medium ${isTea ? 'text-white font-semibold' : 'text-white/60'}`}>
            Tea
          </span>
          {isTea && (
            <motion.div
              layoutId="drinkCheck"
              className="absolute -top-1.5 -right-1.5 text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-white shadow-md"
              style={{ backgroundColor: accentHex }}
            >
              Selected
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Or maybe neither block */}
      <div className="space-y-3 pt-2">
        <span className="text-xs text-white/30 italic uppercase tracking-wider block">
          Or maybe neither?
        </span>
        <div className="relative max-w-xs mx-auto">
          <input
            type="text"
            id="drink-custom-input"
            value={typedDrink}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Tell me your favourite drink..."
            style={{
              borderColor: isCustom ? accentHex : 'rgba(255,255,255,0.1)',
              boxShadow: isCustom ? `0 0 15px ${accentHex}15` : 'none',
            }}
            className="w-full px-5 py-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.08] text-white text-sm border focus:outline-none placeholder-white/30 text-center transition-all duration-300"
          />
        </div>
      </div>

      {/* Continue */}
      <div className="pt-4 flex justify-center">
        <button
          id="continue-drink-btn"
          disabled={!selectedDrink.trim()}
          onClick={onContinue}
          style={{ 
            boxShadow: selectedDrink.trim() ? `0 0 30px ${accentHex}33` : 'none',
          }}
          className={`px-12 py-4 rounded-full font-semibold text-sm transition-all duration-300 ${
            selectedDrink.trim()
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
