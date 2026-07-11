import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UserResponse, VibeId } from '../types';
import confetti from 'canvas-confetti';
import { toPng } from 'html-to-image';

interface FinalSurpriseProps {
  response: UserResponse;
  onSelectOpinion: (opinion: 'absolutely' | 'maybe' | 'let_see') => void;
  accentHex: string;
}

export default function FinalSurprise({ response, onSelectOpinion, accentHex }: FinalSurpriseProps) {
  const [stage, setStage] = useState<'reveal-text-1' | 'reveal-text-2' | 'opinion-choice' | 'loading-1' | 'loading-2' | 'loading-3' | 'invitation'>('reveal-text-1');
  const [copySuccess, setCopySuccess] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // 1. Text reveal staggered sequence
  useEffect(() => {
    if (response.finalOpinion) {
      // If opinion already selected, jump to loading or invitation directly
      setStage('invitation');
      return;
    }

    const t1 = setTimeout(() => {
      setStage('reveal-text-2');
    }, 1500);

    const t2 = setTimeout(() => {
      setStage('opinion-choice');
    }, 3200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [response.finalOpinion]);

  const sendEmailNotification = async (choice: 'absolutely' | 'maybe' | 'let_see') => {
    try {
      const isComfortLabel = comfortMap[response.comfort - 1] || { emoji: '🙂', label: 'Comfortable' };
      const isVibeLabel = response.vibe ? vibeDetails[response.vibe] : { label: 'Surprise Me', emoji: '✨' };
      const isColorLabel = colorLabels[response.color] || response.color;

      const messageContent = `
✨ Coimbatore Vibe Check Invitation Choice ✨
--------------------------------------------
• Final Opinion Choice: ${choice.toUpperCase()}
• Color Selected: ${isColorLabel}
• Favorite Drink: ${response.drink}
• Preferred Activity: ${isVibeLabel.emoji} ${isVibeLabel.label}
• Comfort Level: ${isComfortLabel.emoji} ${isComfortLabel.label}
• Secret shared: "${response.secret}"
• Date Picked: ${response.date || 'Flexible/To be decided'}
• Time of Day: ${response.timeOfDay ? response.timeOfDay.toUpperCase() : 'Flexible'}

"Maybe this is the beginning of a good conversation. ☕"
      `;

      // FormSubmit.co Ajax Dispatcher (No registration required, instantly dispatches to aktooall@gmail.com)
      fetch('https://formsubmit.co/ajax/aktooall@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: 'Coimbatore Vibe Matcher',
          _subject: `✨ Coimbatore Vibe Match: ${choice.toUpperCase()}! ✨`,
          message: messageContent,
        })
      }).catch(() => {});

      // Backup: Web3Forms Dispatcher
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: '62463e6e-6be1-49fa-9eb9-b467ec6da838',
          name: 'Coimbatore Vibe Matcher',
          email: 'aktooall@gmail.com',
          subject: `✨ Coimbatore Vibe Match: ${choice.toUpperCase()}! ✨`,
          message: messageContent,
        })
      }).catch(() => {});

      // Backup: Formspree Dispatcher
      fetch('https://formspree.io/f/xvgypdzz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: 'aktooall@gmail.com',
          subject: `✨ Coimbatore Vibe Match: ${choice.toUpperCase()}! ✨`,
          message: messageContent,
        })
      }).catch(() => {});
    } catch (err) {
      console.error('Failed to send email:', err);
    }
  };

  const handleOpinionClick = (choice: 'absolutely' | 'maybe' | 'let_see') => {
    onSelectOpinion(choice);

    // Dispatch background email instantly to aktooall@gmail.com
    sendEmailNotification(choice);

    // Sequence loading screens
    setStage('loading-1');

    setTimeout(() => {
      setStage('loading-2');
    }, 1800);

    setTimeout(() => {
      setStage('loading-3');
    }, 3600);

    setTimeout(() => {
      setStage('invitation');
      // Trigger confetti only if 'Absolutely' is chosen
      if (choice === 'absolutely') {
        triggerGoldConfetti();
      }
      // Automate direct WhatsApp routing
      handleWhatsAppSend(choice);
    }, 5000);
  };

  const triggerGoldConfetti = () => {
    // Custom premium confetti spread
    const duration = 2.5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = window.setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  // Helper labels & details
  const colorLabels: Record<string, string> = {
    purple: '🟣 Purple Theme',
    blue: '🔵 Blue Theme',
    cyan: '🩵 Cyan Theme',
    white: '⚪ White Theme',
    mint: '🟢 Mint Theme',
    sunset: '🌅 Sunset Theme',
    rose: '🌸 Rose Pink Theme',
    gold: '✨ Amber Gold Theme',
    indigo: '🌌 Cosmic Indigo Theme',
    forest: '🌲 Forest Green Theme',
    crimson: '🍷 Crimson Red Theme',
    lavender: '🪻 Lavender Theme',
    peach: '🍑 Sweet Peach Theme',
    coral: '🪸 Coral Orange Theme',
    platina: '💿 Platinum Silver Theme',
  };

  const vibeDetails: Record<VibeId, { label: string; emoji: string }> = {
    movie: { label: 'Movie', emoji: '🎬' },
    game: { label: 'Game Night', emoji: '🎲' },
    walk: { label: 'Evening Walk', emoji: '🚶' },
    icecream: { label: 'Ice Cream', emoji: '🍦' },
    surprise: { label: 'Surprise Me', emoji: '✨' },
  };

  const comfortMap = [
    { emoji: '😀', label: 'Excited' },
    { emoji: '😄', label: 'Happy' },
    { emoji: '🙂', label: 'Comfortable' },
    { emoji: '🤔', label: 'Curious' },
    { emoji: '🙈', label: 'Shy' },
  ];

  const comfortDetail = comfortMap[response.comfort - 1] || comfortMap[2];
  const vibeDetail = response.vibe ? vibeDetails[response.vibe] : { label: 'Surprise Me', emoji: '✨' };

  // Copy details as plain text
  const handleCopyChoices = () => {
    const textToCopy = `✨ My Vibe Check Invitation ✨
🎨 Accent Color: ${colorLabels[response.color] || 'Purple'}
☕ Favorite Drink: ${response.drink}
🎬 Preferred Activity: ${vibeDetail.emoji} ${vibeDetail.label}
😊 Comfort Level: ${comfortDetail.emoji} ${comfortDetail.label}
🤫 Tiny Secret: ${response.secret}
📅 Date: ${response.date || 'To be decided'}
🕒 Preferred Time: ${response.timeOfDay ? response.timeOfDay.toUpperCase() : 'Flexible'}

"Maybe this is the beginning of a good conversation. ☕"`;

    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2500);
    });
  };

  const handleWhatsAppSend = (choice?: 'absolutely' | 'maybe' | 'let_see') => {
    const isComfortLabel = comfortMap[response.comfort - 1] || { emoji: '🙂', label: 'Comfortable' };
    const isVibeLabel = response.vibe ? vibeDetails[response.vibe] : { label: 'Surprise Me', emoji: '✨' };
    const isColorLabel = colorLabels[response.color] || response.color;
    const isChoice = choice ? choice.toUpperCase() : (response.finalOpinion ? response.finalOpinion.toUpperCase() : 'MAYBE');

    const text = `✨ *Coimbatore Vibe Match Invitation* ✨
-------------------------------------
*Choice:* ${isChoice === 'ABSOLUTELY' ? 'Absolutely! ✨' : isChoice === 'MAYBE' ? 'Maybe 😊' : "Let's see 🤞"}
*Color:* ${isColorLabel}
*Drink:* ${response.drink || 'Not selected'}
*Activity:* ${isVibeLabel.emoji} ${isVibeLabel.label}
*Comfort Level:* ${isComfortLabel.emoji} ${isComfortLabel.label}
*Tiny Secret:* "${response.secret || 'No secret shared'}"
*Date Picked:* ${response.date || 'Flexible/TBD'}
*Time of Day:* ${response.timeOfDay ? response.timeOfDay.toUpperCase() : 'Flexible'}

_"Maybe this is the beginning of a good conversation. ☕"_`;

    const whatsappUrl = `https://api.whatsapp.com/send?phone=919790009147&text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  // High-fidelity card download using html-to-image with solid non-clipping configurations
  const handleDownloadImage = async () => {
    const node = cardRef.current;
    if (node) {
      try {
        const width = node.scrollWidth || node.offsetWidth || 384;
        const height = node.scrollHeight || node.offsetHeight || 520;

        const dataUrl = await toPng(node, {
          cacheBust: true,
          pixelRatio: 3,
          backgroundColor: '#050510',
          width: width,
          height: height,
          style: {
            transform: 'none',
            opacity: '1',
            margin: '0',
            padding: '24px',
            background: 'linear-gradient(to bottom, #0f0c20, #060210)',
            border: `1px solid ${accentHex}40`,
            borderRadius: '24px',
          }
        });
        const link = document.createElement('a');
        link.download = 'my_premium_invitation.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Download failed', err);
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto text-center py-4 px-2 select-none relative">
      <AnimatePresence mode="wait">
        
        {/* Stage 1: Reveal Text Line 1 */}
        {stage === 'reveal-text-1' && (
          <motion.div
            key="reveal-1"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8 }}
            className="py-16 text-center"
          >
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">
              One last question...
            </p>
          </motion.div>
        )}

        {/* Stage 2: Reveal Text Line 2 */}
        {stage === 'reveal-text-2' && (
          <motion.div
            key="reveal-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.8 }}
            className="py-16 text-center space-y-4"
          >
            <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">
              One last question...
            </p>
            <p className="text-white/80 text-xl font-light tracking-wide animate-pulse">
              Do you think this could be fun? 😊
            </p>
          </motion.div>
        )}

        {/* Stage 3: Opinion Choice Screen */}
        {stage === 'opinion-choice' && (
          <motion.div
            key="choice"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-8 py-10"
          >
            <div className="space-y-2">
              <p className="text-white/40 text-xs font-semibold uppercase tracking-widest">
                One last question...
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-white leading-tight">
                Do you think this could be fun? 😊
              </h2>
            </div>

            {/* Opinion Buttons */}
            <div className="flex flex-col gap-3 max-w-xs mx-auto pt-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpinionClick('absolutely')}
                className="py-4 px-6 rounded-2xl bg-white text-black font-semibold text-sm hover:bg-opacity-90 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.15)] cursor-pointer"
              >
                ❤️ Absolutely
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpinionClick('maybe')}
                className="py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-sm transition-all duration-300 cursor-pointer"
              >
                😊 Maybe
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleOpinionClick('let_see')}
                className="py-4 px-6 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-semibold text-sm transition-all duration-300 cursor-pointer"
              >
                🤞 Let's See
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Loading Step 1: Saving choices */}
        {stage === 'loading-1' && (
          <motion.div
            key="load1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-16 space-y-6"
          >
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div 
                style={{ borderColor: `${accentHex}40` }}
                className="absolute inset-0 rounded-full border-2 border-dashed animate-spin" 
              />
              <span className="text-2xl">📨</span>
            </div>
            <p className="text-white/80 text-lg font-light tracking-wide">
              Saving your choices...
            </p>
          </motion.div>
        )}

        {/* Loading Step 2: Brewing plan */}
        {stage === 'loading-2' && (
          <motion.div
            key="load2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-16 space-y-6"
          >
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div 
                style={{ borderColor: `${accentHex}40` }}
                className="absolute inset-0 rounded-full border-2 border-dashed animate-spin" 
              />
              <span className="text-2xl">☕</span>
            </div>
            <p className="text-white/80 text-lg font-light tracking-wide">
              Brewing a good plan...
            </p>
          </motion.div>
        )}

        {/* Loading Step 3: Done */}
        {stage === 'loading-3' && (
          <motion.div
            key="load3"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="py-16 space-y-6"
          >
            <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
              <div 
                style={{ borderColor: `${accentHex}40` }}
                className="absolute inset-0 rounded-full border-2 border-dashed animate-spin" 
              />
              <span className="text-2xl">💬</span>
            </div>
            <p className="text-white/80 text-lg font-light tracking-wide animate-pulse">
              Preparing WhatsApp & Email invitation...
            </p>
          </motion.div>
        )}

        {/* Stage 4: Premium Glass Invitation Card Display */}
        {stage === 'invitation' && (
          <motion.div
            key="invite"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
            className="space-y-8 py-4"
          >
            {/* Header Title */}
            <div className="space-y-1.5">
              <h2 className="text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
                Response Saved Successfully <span className="text-emerald-400">✓</span>
              </h2>
              <p className="text-xs text-white/40 italic">
                (Screenshot or download to share with me 😄)
              </p>
            </div>

            {/* Premium Glassmorphic Invitation Card Container */}
            <div 
              ref={cardRef}
              id="invitation-card-capture"
              style={{
                borderColor: `${accentHex}33`,
                boxShadow: `0 25px 60px rgba(0, 0, 0, 0.4), 0 0 40px ${accentHex}1A`,
              }}
              className="p-8 rounded-[36px] bg-white/[0.02] border backdrop-blur-3xl relative overflow-hidden text-left max-w-sm mx-auto"
            >
              {/* Outer soft auroral blurs specifically customized to match selected color inside the download container */}
              <div 
                style={{ backgroundColor: accentHex }}
                className="absolute top-0 right-0 w-32 h-32 blur-3xl rounded-full pointer-events-none opacity-20" 
              />
              <div 
                className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500/10 blur-3xl rounded-full pointer-events-none" 
              />

              {/* Title brand card */}
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-white/10">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                    Vibe Check Invite
                  </span>
                  <h3 className="text-md font-serif text-white/90 italic">
                    Let's Catch Up?
                  </h3>
                </div>
                <div className="text-3xl filter drop-shadow-md">☕</div>
              </div>

              {/* Invitation Row Choices */}
              <div className="space-y-4 text-sm relative z-10">
                {/* Accent Color Row */}
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-white/40 font-light text-xs">🎨 Fav Color</span>
                  <span className="text-white font-semibold flex items-center gap-1.5 text-xs">
                    {colorLabels[response.color] || 'Purple Theme'}
                  </span>
                </div>

                {/* Favorite Drink Row */}
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-white/40 font-light text-xs">☕ Favorite Drink</span>
                  <span className="text-white font-semibold text-xs">
                    {response.drink}
                  </span>
                </div>

                {/* Vibe Activity Row */}
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-white/40 font-light text-xs">🎬 Preferred Activity</span>
                  <span className="text-white font-semibold flex items-center gap-1.5 text-xs">
                    {vibeDetail.emoji} {vibeDetail.label}
                  </span>
                </div>

                {/* Comfort Level Row */}
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-white/40 font-light text-xs">😊 Comfort Level</span>
                  <span className="text-white font-semibold flex items-center gap-1.5 text-xs">
                    {comfortDetail.emoji} {comfortDetail.label}
                  </span>
                </div>

                {/* Secret Row */}
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-white/40 font-light text-xs">🤫 Tiny Secret</span>
                  <span className="text-white font-semibold text-xs text-right max-w-[180px] truncate" title={response.secret}>
                    {response.secret}
                  </span>
                </div>

                {/* Preferred Date Row */}
                <div className="flex justify-between items-center py-1 border-b border-white/5">
                  <span className="text-white/40 font-light text-xs">📅 Preferred Date</span>
                  <span className="text-white font-semibold text-xs">
                    {response.date || 'TBD'}
                  </span>
                </div>

                {/* Preferred Time Row */}
                <div className="flex justify-between items-center py-1">
                  <span className="text-white/40 font-light text-xs">🕒 Preferred Time</span>
                  <span className="text-white font-semibold text-xs capitalize">
                    {response.timeOfDay || 'Flexible'}
                  </span>
                </div>
              </div>

              {/* Bottom Card Greeting message */}
              <div className="mt-8 pt-4 border-t border-white/10 text-center">
                <p className="text-[11px] text-white/50 leading-relaxed font-light italic">
                  Maybe this is the beginning of a good conversation. ☕
                </p>
              </div>
            </div>

            {/* Action Buttons to save or copy */}
            <div className="flex flex-col gap-3 max-w-sm mx-auto pt-4 px-4">
              {/* Copy Invitation */}
              <button
                id="copy-invitation-btn"
                onClick={handleCopyChoices}
                style={{ borderColor: 'rgba(255,255,255,0.1)' }}
                className="w-full py-4 rounded-full border hover:border-white/20 text-white/75 hover:text-white hover:bg-white/5 font-semibold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>{copySuccess ? 'Copied Successfully! ✓' : 'Copy Invitation'}</span>
              </button>

              {/* Download Invitation as Image */}
              <button
                id="download-invitation-btn"
                onClick={handleDownloadImage}
                style={{ 
                  boxShadow: `0 0 25px ${accentHex}33`,
                }}
                className="w-full py-4 bg-white text-black hover:bg-opacity-90 hover:scale-[1.01] rounded-full font-semibold text-sm transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Download Invitation Image</span>
                <span>⬇️</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
