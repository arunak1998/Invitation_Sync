import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface TinySecretProps {
  secret: string;
  onSelect: (val: string) => void;
  onContinue: () => void;
  accentHex: string;
}

export default function TinySecret({ secret, onSelect, onContinue, accentHex }: TinySecretProps) {
  const [inputText, setInputText] = useState('');

  // Sync state if already set
  useEffect(() => {
    if (secret && secret !== "Maybe I'll tell you later 😄") {
      setInputText(secret);
    } else {
      setInputText('');
    }
  }, [secret]);

  const handleTextChange = (val: string) => {
    setInputText(val);
    onSelect(val);
  };

  const handlePlayfulSkip = () => {
    onSelect("Maybe I'll tell you later 😄");
    onContinue();
  };

  const handleContinuePress = () => {
    if (!inputText.trim()) {
      onSelect("Maybe I'll tell you later 😄");
    }
    onContinue();
  };

  const hasTyped = inputText.trim().length > 0;

  return (
    <div className="w-full max-w-md mx-auto text-center space-y-8 py-4 px-2">
      <div className="space-y-2">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 animate-scaleIn"
        >
          Can you tell me one tiny secret? 🤫
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-white/50 italic font-light"
        >
          Don't worry... it stays with me 😊
        </motion.p>
      </div>

      <div className="space-y-4">
        {/* Large rounded text box */}
        <div className="relative max-w-sm mx-auto">
          <textarea
            id="secret-textarea"
            value={inputText}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Type anything...&#10;(or leave me curious 😄)"
            rows={4}
            style={{
              borderColor: hasTyped ? accentHex : 'rgba(255,255,255,0.1)',
              boxShadow: hasTyped ? `0 0 15px ${accentHex}15` : 'none',
            }}
            className="w-full px-5 py-4 rounded-3xl bg-white/[0.03] hover:bg-white/[0.05] focus:bg-white/[0.08] text-white text-sm border focus:outline-none placeholder-white/30 transition-all duration-300 resize-none text-center"
          />
        </div>

        {/* Playful option instead of typical Skip button */}
        {!hasTyped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center"
          >
            <button
              id="keep-guessing-btn"
              onClick={handlePlayfulSkip}
              className="px-6 py-2.5 rounded-full border border-dashed border-white/10 hover:border-white/20 text-white/40 hover:text-white/60 hover:bg-white/[0.02] text-xs font-medium transition-all duration-300 cursor-pointer"
            >
              I'll keep you guessing 😉
            </button>
          </motion.div>
        )}
      </div>

      {/* Main Continue button */}
      <div className="pt-4 flex justify-center">
        <button
          id="continue-secret-btn"
          onClick={handleContinuePress}
          style={{ 
            boxShadow: `0 0 30px ${accentHex}33`,
          }}
          className="px-12 py-4 bg-white text-black rounded-full font-semibold text-sm hover:bg-opacity-90 hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
        >
          {hasTyped ? 'Continue →' : 'Continue Curious 😄'}
        </button>
      </div>
    </div>
  );
}
