import React from 'react';
import {
  Coffee,
  CloudRain,
  Moon,
  Zap,
  Maximize,
  Minimize,
  HelpCircle,
  BookOpen,
  Image as ImageIcon,
} from 'lucide-react';
import { AmbientScene, SleepTimerState } from '../types';

interface Props {
  currentScene: AmbientScene;
  listenerCount: number;
  sleepTimer: SleepTimerState;
  lowEnergyMode: boolean;
  isFullscreen: boolean;
  onOpenBooks: () => void;
  onOpenMixer: () => void;
  onOpenSleepTimer: () => void;
  onNextScene: () => void;
  onToggleLowEnergy: () => void;
  onToggleFullscreen: () => void;
  onOpenHelp: () => void;
}

export const TopBar: React.FC<Props> = ({
  currentScene,
  listenerCount,
  sleepTimer,
  lowEnergyMode,
  isFullscreen,
  onOpenBooks,
  onOpenMixer,
  onOpenSleepTimer,
  onNextScene,
  onToggleLowEnergy,
  onToggleFullscreen,
  onOpenHelp,
}) => {
  return (
    <header className="relative z-30 flex items-center justify-between px-6 py-4 w-full backdrop-blur-md bg-cafe-bg/40 border-b border-cafe-border">
      {/* Brand & Presence Indicator */}
      <div className="flex items-center gap-6">
        <button
          onClick={onOpenBooks}
          className="flex items-center gap-2.5 text-left group transition-transform active:scale-95"
          title="Chọn sách / podcast khác (Phím B)"
        >
          <div className="w-8 h-8 rounded-lg bg-cafe-accent/20 border border-cafe-accent/40 flex items-center justify-center text-cafe-accent group-hover:bg-cafe-accent group-hover:text-white transition-all">
            <Coffee className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-bold tracking-tight text-white font-sans text-sm md:text-base">
              <span>Readio</span>
              <span className="text-cafe-accent">.cafe</span>
              <span className="inline-block w-1.5 h-3.5 bg-cafe-accent animate-pulse" />
            </div>
            <div className="text-[11px] text-cafe-muted hidden sm:block">
              podcast & sách nói tĩnh lặng
            </div>
          </div>
        </button>

        {/* Live Presence counter (as seen in lofi.cafe) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cafe-muted">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="w-2 h-2 rounded-full bg-emerald-400 absolute" />
          <span className="pl-2">{listenerCount.toLocaleString()} người đang nghe</span>
        </div>
      </div>

      {/* Quick Action Pills */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Book Shelf */}
        <button
          onClick={onOpenBooks}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-cafe-text transition-all hover:border-cafe-accent/50"
          title="Tủ sách & Podcast (B)"
        >
          <BookOpen className="w-3.5 h-3.5 text-cafe-accent" />
          <span className="hidden sm:inline">Tủ sách</span>
        </button>

        {/* Ambient Sound Mixer */}
        <button
          onClick={onOpenMixer}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-cafe-text transition-all hover:border-sky-400/50"
          title="Trộn âm thanh nền (M)"
        >
          <CloudRain className="w-3.5 h-3.5 text-sky-400" />
          <span className="hidden sm:inline">Tiếng nền</span>
        </button>

        {/* Sleep Timer Indicator */}
        <button
          onClick={onOpenSleepTimer}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
            sleepTimer.enabled
              ? 'bg-amber-500/20 border-amber-500/50 text-amber-300 animate-pulse'
              : 'bg-white/5 hover:bg-white/10 border-white/10 text-cafe-muted hover:text-white'
          }`}
          title="Hẹn giờ tắt (Z)"
        >
          <Moon className="w-3.5 h-3.5" />
          <span>
            {sleepTimer.enabled
              ? `${Math.floor(sleepTimer.remainingSeconds / 60)}m`
              : 'Hẹn giờ'}
          </span>
        </button>

        {/* Change Scene / Background */}
        <button
          onClick={onNextScene}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-cafe-muted hover:text-white transition-all"
          title={`Đổi cảnh nền: ${currentScene.name} (Phím G)`}
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        {/* Low Energy Mode */}
        <button
          onClick={onToggleLowEnergy}
          className={`p-2 rounded-lg border transition-all ${
            lowEnergyMode
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
              : 'bg-white/5 hover:bg-white/10 border-white/10 text-cafe-muted hover:text-white'
          }`}
          title={lowEnergyMode ? 'Tắt chế độ tiết kiệm pin (L)' : 'Bật chế độ tiết kiệm pin (L)'}
        >
          <Zap className="w-4 h-4" />
        </button>

        {/* Fullscreen */}
        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-cafe-muted hover:text-white transition-all hidden sm:block"
          title="Toàn màn hình (F)"
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>

        {/* Help / Shortcuts */}
        <button
          onClick={onOpenHelp}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-cafe-muted hover:text-white transition-all"
          title="Phím tắt & Hướng dẫn (?)"
        >
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
