import { useState, useRef } from 'react';

interface ProgressBarProps {
  currentStep: number; // 1 to 8
  onLongPress: () => void;
  accentHex: string;
}

export default function ProgressBar({ currentStep, onLongPress, accentHex }: ProgressBarProps) {
  const [isPressing, setIsPressing] = useState(false);
  const pressTimeoutRef = useRef<number | null>(null);

  const steps = [
    { num: 1, label: 'Color' },
    { num: 2, label: 'Drink' },
    { num: 3, label: 'Vibe' },
    { num: 4, label: 'Meet' },
    { num: 5, label: 'Feeling' },
    { num: 6, label: 'Secret' },
    { num: 7, label: 'Day' },
    { num: 8, label: 'Surprise' },
  ];

  // Long press detector for developer/explorer mode easter egg
  const handlePressStart = () => {
    setIsPressing(true);
    pressTimeoutRef.current = window.setTimeout(() => {
      onLongPress();
      setIsPressing(false);
    }, 1500); // 1.5 seconds hold
  };

  const handlePressEnd = () => {
    setIsPressing(false);
    if (pressTimeoutRef.current) {
      window.clearTimeout(pressTimeoutRef.current);
      pressTimeoutRef.current = null;
    }
  };

  return (
    <div 
      id="progress-bar-container"
      onPointerDown={handlePressStart}
      onPointerUp={handlePressEnd}
      onPointerLeave={handlePressEnd}
      onTouchStart={handlePressStart}
      onTouchEnd={handlePressEnd}
      className={`w-full max-w-md mx-auto px-1 py-3 transition-all duration-300 select-none cursor-help ${
        isPressing ? 'opacity-80 scale-[0.99]' : ''
      }`}
    >
      <div className="flex items-center gap-1.5 w-full">
        {steps.map((step) => {
          const isActive = step.num <= currentStep;
          return (
            <div
              key={step.num}
              id={`progress-node-${step.num}`}
              style={{
                backgroundColor: isActive ? accentHex : 'rgba(255,255,255,0.1)',
                boxShadow: isActive ? `0 0 10px ${accentHex}CC` : 'none',
              }}
              className="h-[3px] flex-1 rounded-full transition-all duration-500"
              title={step.label}
            />
          );
        })}
      </div>
    </div>
  );
}
