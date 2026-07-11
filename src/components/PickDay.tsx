import { motion, AnimatePresence } from 'motion/react';
import { TimeOfDay } from '../types';

interface PickDayProps {
  selectedDate: string | null;
  selectedTimeOfDay: TimeOfDay | null;
  onSelectDate: (date: string) => void;
  onSelectTimeOfDay: (time: TimeOfDay) => void;
  onContinue: () => void;
  accentHex: string;
}

export const datesList = [
  { day: 'Sun', date: '12', label: '12 July' },
  { day: 'Mon', date: '13', label: '13 July' },
  { day: 'Tue', date: '14', label: '14 July' },
  { day: 'Wed', date: '15', label: '15 July' },
  { day: 'Thu', date: '16', label: '16 July' },
  { day: 'Fri', date: '17', label: '17 July' },
  { day: 'Sat', date: '18', label: '18 July' },
  { day: 'Sun', date: '19', label: '19 July' },
];

export const timesOfDay = [
  { id: 'morning' as TimeOfDay, emoji: '🌅', label: 'Morning' },
  { id: 'afternoon' as TimeOfDay, emoji: '☀️', label: 'Afternoon' },
  { id: 'evening' as TimeOfDay, emoji: '🌇', label: 'Evening' },
  { id: 'flexible' as TimeOfDay, emoji: '✨', label: 'Flexible' },
];

export default function PickDay({
  selectedDate,
  selectedTimeOfDay,
  onSelectDate,
  onSelectTimeOfDay,
  onContinue,
  accentHex,
}: PickDayProps) {
  return (
    <div className="w-full max-w-xl mx-auto text-center space-y-8 py-4 px-2">
      {/* 1. Header Block */}
      <div className="space-y-2">
        <motion.h2
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
        >
          If we meet...
        </motion.h2>
        <p className="text-sm text-white/50 max-w-sm mx-auto italic font-light">
          Which day works for you?
        </p>
      </div>

      {/* 2. Beautiful Date Grid Picker (Only 12 July to 19 July) */}
      <div className="grid grid-cols-4 gap-3 max-w-md mx-auto py-2">
        {datesList.map((d) => {
          const isSelected = selectedDate === d.label;
          return (
            <motion.div
              key={d.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelectDate(d.label)}
              style={{
                borderColor: isSelected ? accentHex : 'rgba(255,255,255,0.06)',
                boxShadow: isSelected ? `0 4px 15px ${accentHex}20` : 'none',
              }}
              className={`py-3 px-1 rounded-2xl cursor-pointer border flex flex-col items-center justify-center transition-all duration-300 relative select-none ${
                isSelected
                  ? 'bg-white/[0.08]'
                  : 'bg-white/[0.03] hover:bg-white/10'
              }`}
            >
              <span className="text-[10px] text-white/40 uppercase tracking-widest font-semibold">
                {d.day}
              </span>
              <span className={`text-xl font-bold mt-1 ${isSelected ? 'text-white' : 'text-white/85'}`}>
                {d.date}
              </span>
              <span className="text-[10px] text-white/30 font-light mt-0.5">
                Jul
              </span>

              {isSelected && (
                <motion.div
                  layoutId="datePulse"
                  className="absolute inset-0 rounded-2xl ring-2"
                  style={{ ringColor: accentHex }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* 3. Smooth animated time-of-day options that fade in after date selection */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="space-y-4 pt-4"
          >
            <p className="text-xs text-white/40 uppercase tracking-widest font-semibold">
              Preferred Time of Day
            </p>
            
            <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
              {timesOfDay.map((t) => {
                const isSelected = selectedTimeOfDay === t.id;
                return (
                  <motion.div
                    key={t.id}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => onSelectTimeOfDay(t.id)}
                    style={{
                      borderColor: isSelected ? accentHex : 'rgba(255,255,255,0.1)',
                      boxShadow: isSelected ? `0 0 15px ${accentHex}15` : 'none',
                    }}
                    className={`py-3.5 px-4 rounded-2xl cursor-pointer border text-center transition-all duration-300 relative flex items-center justify-center gap-2 select-none ${
                      isSelected
                        ? 'bg-white/[0.08]'
                        : 'bg-white/[0.03] hover:bg-white/10'
                    }`}
                  >
                    <span className="text-lg filter drop-shadow-sm select-none">{t.emoji}</span>
                    <span className={`text-xs font-semibold ${isSelected ? 'text-white' : 'text-white/60'}`}>
                      {t.label}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Playful Line and Continue Button */}
      <div className="w-full flex flex-col items-center gap-4 pt-6">
        <AnimatePresence>
          {selectedDate && selectedTimeOfDay && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <p className="text-xs text-white/40 uppercase tracking-widest">
                Almost there... ☕
              </p>
              <p className="text-sm font-light text-white/70 mt-1 italic">
                Looks like we're almost done...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          id="continue-date-btn"
          disabled={!selectedDate || !selectedTimeOfDay}
          onClick={onContinue}
          style={{ 
            boxShadow: (selectedDate && selectedTimeOfDay) ? `0 0 30px ${accentHex}33` : 'none',
          }}
          className={`px-12 py-4 rounded-full font-semibold text-sm transition-all duration-300 ${
            (selectedDate && selectedTimeOfDay)
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
