export interface Chapter {
  id: string;
  number: number;
  title: string;
  duration: number; // in seconds
  startTime: number; // in seconds
  summary: string;
}

export interface Quote {
  id: string;
  time: number; // in seconds when this quote is highlighted
  text: string;
  authorNote?: string;
}

export interface Audiobook {
  id: string;
  title: string;
  author: string;
  narrator: string;
  category: 'Văn học kinh điển' | 'Chữa lành & Triết học' | 'Khoa học & Vũ trụ' | 'Trinh thám & Bí ẩn';
  coverArt: string;
  description: string;
  totalDuration: number; // in seconds
  audioUrl?: string; // fallback or stream
  voiceTone: 'warm' | 'calm' | 'deep' | 'gentle';
  chapters: Chapter[];
  quotes: Quote[];
}

export interface AmbientScene {
  id: string;
  name: string;
  location: string;
  imageUrl: string;
  defaultAmbient: {
    rain: number;
    fire: number;
    cafe: number;
    vinyl: number;
  };
  accentColor: string;
}

export interface AmbientMixerState {
  rain: number; // 0 to 1
  fire: number; // 0 to 1
  cafe: number; // 0 to 1
  night: number; // 0 to 1
  vinyl: number; // 0 to 1
}

export interface SleepTimerState {
  enabled: boolean;
  totalMinutes: number;
  remainingSeconds: number;
  mode: 'minutes' | 'chapter_end';
  isFadingOut: boolean;
}
