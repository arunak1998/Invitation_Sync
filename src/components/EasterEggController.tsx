import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingMessage {
  id: number;
  text: string;
  x: number; // percentage left
  y: number; // percentage top
  scale: number;
  duration: number;
  delay: number;
}

interface ToastMessage {
  id: number;
  text: string;
  subtext?: string;
}

interface EasterEggControllerProps {
  toast: ToastMessage | null;
  onClearToast: () => void;
}

export default function EasterEggController({ toast, onClearToast }: EasterEggControllerProps) {
  const [particles, setParticles] = useState<FloatingMessage[]>([]);

  // Seed floating background message particles on mount
  useEffect(() => {
    const rawFloatingWords = [
      '✨ Good vibes only',
      '☕',
      '🌸 Relax...',
      '😊 Take your time...',
      '✨',
      '☕',
      '🌸',
    ];

    const seeded: FloatingMessage[] = rawFloatingWords.map((word, idx) => ({
      id: idx,
      text: word,
      x: 10 + Math.random() * 80, // spread across 10% to 90%
      y: 15 + Math.random() * 70, // spread across 15% to 85%
      scale: 0.8 + Math.random() * 0.4,
      duration: 18 + Math.random() * 14, // slow drifting duration
      delay: idx * -2, // stagger initial start
    }));

    setParticles(seeded);
  }, []);

  // Auto-dismiss toast messages after 3.5 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClearToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, onClearToast]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      
      {/* 1. Slowly Floating Ambient Background Particles */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            opacity: 0.12, 
            x: `${p.x}vw`, 
            y: `${p.y + 15}vh`,
            scale: p.scale 
          }}
          animate={{
            y: [`${p.y + 15}vh`, `${p.y - 15}vh`, `${p.y + 15}vh`],
            rotate: [0, 15, -15, 0],
            opacity: [0.12, 0.25, 0.12],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
          className="absolute font-sans font-medium text-xs text-white/40 tracking-wider select-none"
        >
          {p.text}
        </motion.div>
      ))}

      {/* 2. Glassmorphic Apple-style Toast Notifications for Unlocked Easter Eggs */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm pointer-events-auto">
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={onClearToast}
              className="p-4 rounded-2xl bg-zinc-900/85 border border-purple-500/30 backdrop-blur-xl shadow-[0_15px_40px_rgba(168,85,247,0.15)] flex gap-3 items-center cursor-pointer relative overflow-hidden group"
            >
              {/* Toast top border light highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent" />
              
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-lg shadow-inner shrink-0">
                ✨
              </div>

              <div className="text-left space-y-0.5">
                <p className="text-white text-sm font-semibold tracking-tight leading-snug">
                  {toast.text}
                </p>
                {toast.subtext && (
                  <p className="text-zinc-400 text-xs font-light">
                    {toast.subtext}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
