export type AccentColor = 'purple' | 'blue' | 'cyan' | 'white' | 'mint' | 'sunset' | 'rose' | 'gold' | 'indigo' | 'forest' | 'crimson' | 'lavender' | 'peach' | 'coral' | 'platina';

export interface ColorOption {
  id: AccentColor;
  label: string;
  emoji: string;
  color: string; // Tailwind bg color or raw hex
  accentHex: string; // The primary color hex for styling glows
  gradientFrom: string; // Start of background flow gradient
  fontClass: string; // Tailwind utility or custom class name
  fontName: string; // Readable font name
}

export type VibeId = 'movie' | 'game' | 'walk' | 'icecream' | 'surprise';

export interface VibeOption {
  id: VibeId;
  emoji: string;
  title: string;
  description: string;
}

export type ComfortLevel = 1 | 2 | 3 | 4 | 5;

export interface ComfortOption {
  level: ComfortLevel;
  emoji: string;
  label: string;
  supportiveText: string;
}

export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'flexible';

export interface UserResponse {
  color: AccentColor;
  drink: string; // 'Coffee' | 'Tea' | custom string
  vibe: VibeId | null;
  comfort: ComfortLevel;
  secret: string; // secret text or 'Maybe I\'ll tell you later 😄'
  date: string | null; // e.g. '12 July'
  timeOfDay: TimeOfDay | null;
  finalOpinion: 'absolutely' | 'maybe' | 'let_see' | null;
}
