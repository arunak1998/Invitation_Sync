/**
 * Canvas Image Exporter Utility
 * Generates a high-resolution premium summary card for offline downloading.
 * Recreates the gorgeous Apple-inspired dark glassmorphism layout in canvas coordinates.
 */

export function downloadResponseImage(
  activityTitle: string,
  timeTitle: string,
  comfortEmoji: string,
  comfortLabel: string
) {
  // Setup canvas for high density display (retina scaling)
  const width = 1080;
  const height = 1350;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Draw elegant deep space backdrop (zinc-950 to dark purple-blue gradient)
  const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, width * 0.8);
  bgGrad.addColorStop(0, '#1e1b4b'); // Deep purple-indigo
  bgGrad.addColorStop(0.5, '#0c0a0f'); // Dark plum
  bgGrad.addColorStop(1, '#020205'); // Absolute deep black
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, width, height);

  // 2. Draw Apple-like blurred glowing blobs in the background
  ctx.save();
  ctx.globalCompositeOperation = 'screen';
  
  // Blob A: Soft Cyan Glow
  const cyanGlow = ctx.createRadialGradient(250, 300, 50, 250, 300, 350);
  cyanGlow.addColorStop(0, 'rgba(6, 182, 212, 0.25)');
  cyanGlow.addColorStop(1, 'rgba(6, 182, 212, 0)');
  ctx.fillStyle = cyanGlow;
  ctx.beginPath();
  ctx.arc(250, 300, 350, 0, Math.PI * 2);
  ctx.fill();

  // Blob B: Deep Purple Glow
  const purpleGlow = ctx.createRadialGradient(850, 1050, 50, 850, 1050, 450);
  purpleGlow.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
  purpleGlow.addColorStop(1, 'rgba(168, 85, 247, 0)');
  ctx.fillStyle = purpleGlow;
  ctx.beginPath();
  ctx.arc(850, 1050, 450, 0, Math.PI * 2);
  ctx.fill();

  // Blob C: Soft Blue Glow
  const blueGlow = ctx.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, 250);
  blueGlow.addColorStop(0, 'rgba(59, 130, 246, 0.15)');
  blueGlow.addColorStop(1, 'rgba(59, 130, 246, 0)');
  ctx.fillStyle = blueGlow;
  ctx.beginPath();
  ctx.arc(width / 2, height / 2, 250, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 3. Draw Frosted Glass Main Card
  const cardX = 140;
  const cardY = 180;
  const cardW = 800;
  const cardH = 960;
  const r = 48; // Rounded corners

  ctx.save();
  // Card Shadow
  ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
  ctx.shadowBlur = 60;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 24;

  // Draw Card Path
  ctx.beginPath();
  ctx.moveTo(cardX + r, cardY);
  ctx.lineTo(cardX + cardW - r, cardY);
  ctx.quadraticCurveTo(cardX + cardW, cardY, cardX + cardW, cardY + r);
  ctx.lineTo(cardX + cardW, cardY + cardH - r);
  ctx.quadraticCurveTo(cardX + cardW, cardY + cardH, cardX + cardW - r, cardY + cardH);
  ctx.lineTo(cardX + r, cardY + cardH);
  ctx.quadraticCurveTo(cardX, cardY + cardH, cardX, cardY + cardH - r);
  ctx.lineTo(cardX, cardY + r);
  ctx.quadraticCurveTo(cardX, cardY, cardX + r, cardY);
  ctx.closePath();

  // Card background fill (semi-transparent white acrylic effect)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
  ctx.fill();

  // Card subtle stroke border
  ctx.shadowColor = 'transparent'; // Reset shadow for stroke
  ctx.shadowBlur = 0;
  ctx.lineWidth = 1.5;
  const borderGrad = ctx.createLinearGradient(cardX, cardY, cardX + cardW, cardY + cardH);
  borderGrad.addColorStop(0, 'rgba(255, 255, 255, 0.16)');
  borderGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.04)');
  borderGrad.addColorStop(1, 'rgba(255, 255, 255, 0.08)');
  ctx.strokeStyle = borderGrad;
  ctx.stroke();
  ctx.restore();

  // 4. Draw Header Sparkles & Title
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // Draw Cute Coffee Icon at top
  ctx.font = '72px sans-serif';
  ctx.fillText('☕', width / 2, cardY + 110);

  // Card Header
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px "Inter", system-ui, sans-serif';
  ctx.fillText('OUR VIBE CHECK', width / 2, cardY + 220);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
  ctx.font = '300 24px "Inter", system-ui, sans-serif';
  ctx.fillText('COIMBATORE • 2026', width / 2, cardY + 270);

  // Decorative divider line
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cardX + 80, cardY + 320);
  ctx.lineTo(cardX + cardW - 80, cardY + 320);
  ctx.stroke();

  // 5. Draw Response Details Blocks
  const detailYStart = cardY + 390;
  const rowSpacing = 130;

  const drawRow = (label: string, value: string, index: number) => {
    const rowY = detailYStart + (index * rowSpacing);

    // Label
    ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = '500 24px "Inter", system-ui, sans-serif';
    ctx.fillText(label.toUpperCase(), cardX + 100, rowY);

    // Value
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'semibold 32px "Inter", system-ui, sans-serif';
    ctx.fillText(value, cardX + cardW - 100, rowY);

    // Underline helper
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.beginPath();
    ctx.moveTo(cardX + 100, rowY + 50);
    ctx.lineTo(cardX + cardW - 100, rowY + 50);
    ctx.stroke();
  };

  drawRow('ACTIVITY', activityTitle, 0);
  drawRow('PREFERENCE', timeTitle, 1);
  drawRow('VIBE LEVEL', `${comfortEmoji} ${comfortLabel}`, 2);
  drawRow('STATUS', 'Looking forward to meeting 😊', 3);

  // 6. Draw supportive card message
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.font = 'italic 24px "Inter", system-ui, sans-serif';
  ctx.fillText('“No expectations. No pressure. Just honesty.”', width / 2, cardY + 880);

  // 7. Outside watermarks
  ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.font = '22px "Inter", system-ui, sans-serif';
  ctx.fillText('Tap screenshot to save or share with him ✨', width / 2, height - 120);

  // Trigger standard browser download
  const dataUrl = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.download = `vibe_check_response_${Date.now()}.png`;
  link.href = dataUrl;
  link.click();
}
