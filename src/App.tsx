/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AccentColor, UserResponse, VibeId, TimeOfDay } from './types';

// Importing custom components
import ProgressBar from './components/ProgressBar';
import ColorSelection from './components/ColorSelection';
import QuickChoice from './components/QuickChoice';
import PickVibe from './components/PickVibe';
import LetsMeet from './components/LetsMeet';
import ComfortMeter from './components/ComfortMeter';
import TinySecret from './components/TinySecret';
import PickDay from './components/PickDay';
import FinalSurprise from './components/FinalSurprise';
import MusicToggle from './components/MusicToggle';
import EasterEggController from './components/EasterEggController';

interface ToastMessage {
  id: number;
  text: string;
  subtext?: string;
}

export default function App() {
  // Navigation: Steps 1 through 8
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // Response state
  const [response, setResponse] = useState<UserResponse>({
    color: 'purple',
    drink: '',
    vibe: null,
    comfort: 3, // Default: Comfortable 🙂
    secret: '',
    date: null,
    timeOfDay: null,
    finalOpinion: null,
  });

  // Easter Eggs & Toast notification state
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const [toastCounter, setToastCounter] = useState(0);
  const [titleTaps, setTitleTaps] = useState(0);

  const showToast = (text: string, subtext?: string) => {
    setToast({
      id: toastCounter,
      text,
      subtext,
    });
    setToastCounter((prev) => prev + 1);
  };

  const handleTitleClick = () => {
    setTitleTaps((prev) => {
      const next = prev + 1;
      if (next === 5) {
        showToast("Okay... you're exploring everything now 😄", "Curious mind spotted!");
        return 0;
      }
      return next;
    });
  };

  // Accent Hex & background glow mappings for all fifteen premium colors with dynamic font classes
  const themeMap: Record<AccentColor, { accent: string; glow1: string; glow2: string; glow3: string; fontClass: string }> = {
    purple: { accent: '#A78BFA', glow1: '#3B0764', glow2: '#1E3A8A', glow3: '#581C87', fontClass: 'font-inter' },
    blue: { accent: '#60A5FA', glow1: '#1E3A8A', glow2: '#0F172A', glow3: '#1D4ED8', fontClass: 'font-outfit' },
    cyan: { accent: '#67E8F9', glow1: '#083344', glow2: '#0F172A', glow3: '#0891B2', fontClass: 'font-mono-jb' },
    white: { accent: '#FFFFFF', glow1: '#1F2937', glow2: '#111827', glow3: '#4B5563', fontClass: 'font-playfair' },
    mint: { accent: '#34D399', glow1: '#064E3B', glow2: '#0F172A', glow3: '#047857', fontClass: 'font-grotesk' },
    sunset: { accent: '#FDBA74', glow1: '#7C2D12', glow2: '#581C87', glow3: '#C2410C', fontClass: 'font-garamond' },
    rose: { accent: '#F472B6', glow1: '#500724', glow2: '#111827', glow3: '#831843', fontClass: 'font-playfair' },
    gold: { accent: '#F59E0B', glow1: '#451A03', glow2: '#0F172A', glow3: '#78350F', fontClass: 'font-garamond' },
    indigo: { accent: '#6366F1', glow1: '#1E1B4B', glow2: '#0F172A', glow3: '#312E81', fontClass: 'font-grotesk' },
    forest: { accent: '#10B981', glow1: '#022C22', glow2: '#0F172A', glow3: '#064E3B', fontClass: 'font-inter' },
    crimson: { accent: '#EF4444', glow1: '#450A0A', glow2: '#0F172A', glow3: '#7F1D1D', fontClass: 'font-playfair' },
    lavender: { accent: '#D8B4FE', glow1: '#2E1065', glow2: '#0F172A', glow3: '#4C1D95', fontClass: 'font-outfit' },
    peach: { accent: '#FDBA74', glow1: '#431407', glow2: '#0F172A', glow3: '#9A3412', fontClass: 'font-garamond' },
    coral: { accent: '#FF7F50', glow1: '#5C1D02', glow2: '#0F172A', glow3: '#B45309', fontClass: 'font-grotesk' },
    platina: { accent: '#E2E8F0', glow1: '#1E293B', glow2: '#0F172A', glow3: '#334155', fontClass: 'font-mono-jb' },
  };

  const currentTheme = themeMap[response.color] || themeMap.purple;

  return (
    <div className={`relative min-h-screen w-full bg-[#020205] text-white overflow-x-hidden flex flex-col justify-between transition-all duration-1000 ${currentTheme.fontClass}`}>
      
      {/* 1. Dynamic Atmospheric Immersive Media Background mesh layout */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 transition-all duration-1000">
        {/* Dynamic Top Left Glow */}
        <div 
          style={{ backgroundColor: currentTheme.glow1 }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-25 transition-all duration-1000" 
        />
        
        {/* Dynamic Bottom Right Glow */}
        <div 
          style={{ backgroundColor: currentTheme.glow2 }}
          className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 transition-all duration-1000" 
        />
        
        {/* Dynamic Center Right/Top Right Glow */}
        <div 
          style={{ backgroundColor: currentTheme.glow3 }}
          className="absolute top-[20%] right-[15%] w-[300px] h-[300px] rounded-full blur-[100px] opacity-15 transition-all duration-1000" 
        />
      </div>

      {/* 2. Floating Interactive Easter Eggs & Drift Particles */}
      <EasterEggController 
        toast={toast} 
        onClearToast={() => setToast(null)} 
      />

      {/* 3. Global Floating Music Controls (Ambient Soundscape) */}
      <MusicToggle />

      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6 relative z-10 flex-1 flex flex-col justify-between">
        
        {/* Header with App Title and Glassmorphic Progress indicator */}
        <header className="w-full py-4 space-y-4">
          <div className="text-center pt-2">
            <h1 
              onClick={handleTitleClick}
              className="text-xs uppercase tracking-[0.25em] text-white/40 font-semibold select-none hover:text-white/60 cursor-pointer transition-colors"
            >
              Vibe Check Invitation ☕
            </h1>
          </div>

          {/* Render progress bar */}
          <AnimatePresence>
            {currentStep <= 8 && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <ProgressBar
                  currentStep={currentStep}
                  accentHex={currentTheme.accent}
                  onLongPress={() => showToast('Explorer Mode Unlocked 🤫', 'Developer log status: ONLINE')}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </header>

        {/* Content Body with Fluid Multi-step Navigation Transitions */}
        <main className="flex-1 flex items-center justify-center py-6">
          <div className="w-full relative">
            <AnimatePresence mode="wait">
              
              {/* Screen 1: Pick Your Color */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <ColorSelection
                    selectedColor={response.color}
                    onSelect={(color) => setResponse((prev) => ({ ...prev, color }))}
                    onContinue={() => setCurrentStep(2)}
                    accentHex={currentTheme.accent}
                  />
                </motion.div>
              )}

              {/* Screen 2: Quick Choice Drink */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <QuickChoice
                    selectedDrink={response.drink}
                    onSelect={(drink) => setResponse((prev) => ({ ...prev, drink }))}
                    onContinue={() => setCurrentStep(3)}
                    onCoffeeTapTenTimes={() => showToast('Someone REALLY likes coffee ☕', 'Keep brewing beautiful ideas!')}
                    accentHex={currentTheme.accent}
                  />
                </motion.div>
              )}

              {/* Screen 3: Let's Meet (Coimbatore Invitation) */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                >
                  <LetsMeet
                    onContinue={() => setCurrentStep(4)}
                    accentHex={currentTheme.accent}
                  />
                </motion.div>
              )}

              {/* Screen 4: Pick Your Vibe */}
              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <PickVibe
                    selectedVibe={response.vibe}
                    onSelect={(vibe) => setResponse((prev) => ({ ...prev, vibe }))}
                    onContinue={() => setCurrentStep(5)}
                    accentHex={currentTheme.accent}
                  />
                </motion.div>
              )}

              {/* Screen 5: How Do You Feel */}
              {currentStep === 5 && (
                <motion.div
                  key="step5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <ComfortMeter
                    selectedComfort={response.comfort}
                    onSelect={(level) => setResponse((prev) => ({ ...prev, comfort: level }))}
                    onContinue={() => setCurrentStep(6)}
                    accentHex={currentTheme.accent}
                  />
                </motion.div>
              )}

              {/* Screen 6: Tiny Secret */}
              {currentStep === 6 && (
                <motion.div
                  key="step6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <TinySecret
                    secret={response.secret}
                    onSelect={(secret) => setResponse((prev) => ({ ...prev, secret }))}
                    onContinue={() => setCurrentStep(7)}
                    accentHex={currentTheme.accent}
                  />
                </motion.div>
              )}

              {/* Screen 7: Pick a Day */}
              {currentStep === 7 && (
                <motion.div
                  key="step7"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                >
                  <PickDay
                    selectedDate={response.date}
                    selectedTimeOfDay={response.timeOfDay}
                    onSelectDate={(date) => setResponse((prev) => ({ ...prev, date }))}
                    onSelectTimeOfDay={(timeOfDay) => setResponse((prev) => ({ ...prev, timeOfDay }))}
                    onContinue={() => setCurrentStep(8)}
                    accentHex={currentTheme.accent}
                  />
                </motion.div>
              )}

              {/* Screen 8: Final Surprise & Invitation */}
              {currentStep === 8 && (
                <motion.div
                  key="step8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <FinalSurprise
                    response={response}
                    onSelectOpinion={(finalOpinion) => setResponse((prev) => ({ ...prev, finalOpinion }))}
                    accentHex={currentTheme.accent}
                  />
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </main>

        {/* Humble Footer containing responsive licensing and details */}
        <footer className="w-full text-center py-4 text-[10px] text-white/20 font-light select-none relative z-10">
          <p>Hand-crafted with care & respect</p>
          <p className="mt-0.5">Coimbatore • {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}
