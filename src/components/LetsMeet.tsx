import { motion } from 'motion/react';

interface LetsMeetProps {
  onContinue: () => void;
  accentHex: string;
}

const positiveReasons = [
  "Life is too short for missed vibes! ⚡",
  "Coimbatore filter coffee hits different! ☕",
  "Zero-pressure vibe check ✨",
  "Think of the exciting stories! 😄",
  "You've got absolutely nothing to lose! 🚀",
  "Who knows, we might click instantly! 🌟",
  "A perfect chance for a friendly catchup! 🗺️"
];

// Pre-calculated offset trajectories to make them look organic, independent, and avoid overlapping too much
const trajectories = [
  { x: [0, 45, -35, 30, -20, 0], y: [0, -30, 40, -20, 35, 0], delay: 0 },
  { x: [0, -40, 35, -45, 25, 0], y: [0, 35, -25, 45, -30, 0], delay: 0.5 },
  { x: [0, 30, -45, 40, -35, 0], y: [0, 40, -35, -30, 45, 0], delay: 1.0 },
  { x: [0, -35, 40, -30, 45, 0], y: [0, -45, 30, 40, -35, 0], delay: 1.5 },
  { x: [0, 45, -30, -45, 35, 0], y: [0, 30, 45, -35, -25, 0], delay: 2.0 },
  { x: [0, -45, 35, 40, -30, 0], y: [0, -35, -45, 35, 40, 0], delay: 2.5 },
  { x: [0, 35, -40, 30, -45, 0], y: [0, 45, -30, -40, 35, 0], delay: 3.0 },
];

export default function LetsMeet({ onContinue, accentHex }: LetsMeetProps) {
  return (
    <div className="w-full max-w-2xl mx-auto text-center space-y-8 py-6 px-4 relative">
      
      {/* Interactive zig-zagging positive stickers floating in the page bounds */}
      <div className="absolute inset-0 pointer-events-none overflow-visible select-none z-10 hidden md:block">
        {positiveReasons.map((reason, idx) => {
          const traj = trajectories[idx % trajectories.length];
          // Distribute initial absolute coordinate regions around the central container safely
          const positions = [
            { top: '5%', left: '-10%' },
            { top: '15%', right: '-12%' },
            { top: '48%', left: '-15%' },
            { top: '55%', right: '-14%' },
            { top: '80%', left: '-8%' },
            { top: '85%', right: '-10%' },
            { top: '-12%', left: '25%' },
          ];
          const pos = positions[idx];

          return (
            <motion.div
              key={idx}
              style={{
                position: 'absolute',
                top: pos.top,
                left: pos.left,
                right: pos.right,
                borderColor: `${accentHex}30`,
                boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 15px ${accentHex}15`,
              }}
              className="px-4 py-2.5 bg-black/40 backdrop-blur-md border rounded-2xl text-xs font-medium text-white/90 pointer-events-auto cursor-default select-none transition-colors duration-300 hover:bg-black/65"
              animate={{
                x: traj.x,
                y: traj.y,
                rotate: [0, 3, -3, 2, -2, 0],
              }}
              whileHover={{ scale: 1.1, rotate: 0 }}
              transition={{
                duration: 12 + (idx * 1.5),
                repeat: Infinity,
                ease: "easeInOut",
                delay: traj.delay,
              }}
            >
              {reason}
            </motion.div>
          );
        })}
      </div>

      {/* For smaller screens, we list the positive vibes neatly or float them closer */}
      <div className="block md:hidden w-full overflow-hidden py-2 space-y-2 select-none">
        <p className="text-[11px] uppercase tracking-wider text-white/30 font-medium">✨ Why this is exciting ✨</p>
        <div className="flex flex-wrap justify-center gap-2 max-w-sm mx-auto">
          {positiveReasons.slice(0, 5).map((reason, idx) => (
            <span 
              key={idx} 
              style={{ borderColor: `${accentHex}20` }}
              className="text-[11px] px-2.5 py-1 bg-white/5 border rounded-full text-white/70"
            >
              {reason}
            </span>
          ))}
        </div>
      </div>

      {/* Immersive minimalist conversational layout */}
      <div className="space-y-6">
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/60 text-lg md:text-xl font-light tracking-wide"
        >
          Since we're both in <span style={{ color: accentHex }} className="font-semibold">Coimbatore</span> and close...
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
        >
          How about we meet sometime? 😊
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-sm text-white/40 font-light space-y-2 pt-4 border-t border-white/5 max-w-xs mx-auto"
        >
          <p className="font-medium" style={{ color: accentHex }}>Not a date.</p>
          <p>Just a chance to see if the vibe matches.</p>
        </motion.div>
      </div>

      {/* Yes, Maybe Interactive Choice buttons (No Button Removed Completely!) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="flex flex-col gap-4 max-w-sm mx-auto pt-6 justify-center items-center"
      >
        {/* Yes Button */}
        <motion.button
          id="meet-yes-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onContinue}
          style={{ 
            boxShadow: `0 0 25px ${accentHex}40`,
            borderColor: accentHex,
          }}
          className="w-full max-w-xs py-4 bg-white text-black rounded-full font-semibold text-sm transition-all duration-300 cursor-pointer shadow-lg"
        >
          Yes, definitely! ✨
        </motion.button>

        {/* Maybe Button */}
        <motion.button
          id="meet-maybe-btn"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={onContinue}
          className="w-full max-w-xs py-3.5 bg-white/10 hover:bg-white/15 border border-white/10 text-white rounded-full font-medium text-sm transition-all duration-300 cursor-pointer"
        >
          Maybe/Let's see 😊
        </motion.button>
      </motion.div>
    </div>
  );
}
