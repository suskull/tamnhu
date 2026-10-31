import React from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  List,
  Quote as QuoteIcon,
  BookOpen,
} from 'lucide-react';
import { Audiobook, Chapter } from '../types';
import { ProgressBar } from './ProgressBar';

interface Props {
  book: Audiobook;
  currentChapter: Chapter;
  isPlaying: boolean;
  currentTime: number;
  speed: number;
  volume: number;
  isMuted: boolean;
  isTranscriptOpen: boolean;
  isChaptersOpen: boolean;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onSeekBackward: () => void;
  onSeekForward: () => void;
  onPrevChapter: () => void;
  onNextChapter: () => void;
  onCycleSpeed: () => void;
  onVolumeChange: (vol: number) => void;
  onToggleMute: () => void;
  onToggleChapters: () => void;
  onToggleTranscript: () => void;
  onOpenBooks: () => void;
}

export const PlayerControls: React.FC<Props> = ({
  book,
  currentChapter,
  isPlaying,
  currentTime,
  speed,
  volume,
  isMuted,
  isTranscriptOpen,
  isChaptersOpen,
  onTogglePlay,
  onSeek,
  onSeekBackward,
  onSeekForward,
  onPrevChapter,
  onNextChapter,
  onCycleSpeed,
  onVolumeChange,
  onToggleMute,
  onToggleChapters,
  onToggleTranscript,
  onOpenBooks,
}) => {
  return (
    <div className="relative z-20 w-full max-w-2xl mx-auto px-6 py-6 rounded-2xl bg-cafe-card/75 backdrop-blur-xl border border-white/10 shadow-2xl transition-all">
      {/* Book & Chapter Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-cafe-accent/20 border border-cafe-accent/30 text-cafe-accent">
              {book.category}
            </span>
            <span className="text-xs text-cafe-muted">
              • Giọng đọc: {book.narrator}
            </span>
          </div>

          <h1 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-wide truncate">
            {book.title}
          </h1>
          <p className="text-xs sm:text-sm text-cafe-muted truncate mt-0.5">
            {book.author} —{' '}
            <span className="text-amber-200/90 font-medium">
              Chương {currentChapter.number}: {currentChapter.title}
            </span>
          </p>
        </div>

        {/* Change Book Shelf Button */}
        <button
          onClick={onOpenBooks}
          className="flex-shrink-0 p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cafe-text transition-all hover:border-cafe-accent/50"
          title="Chọn sách khác (B)"
        >
          <BookOpen className="w-5 h-5 text-cafe-accent" />
        </button>
      </div>

      {/* Seekbar with Chapter Ticks */}
      <div className="mb-6">
        <ProgressBar
          currentTime={currentTime}
          duration={book.totalDuration}
          chapters={book.chapters}
          onSeek={onSeek}
        />
      </div>

      {/* Main Playback Control Bar */}
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Left Actions: Speed & Chapters */}
        <div className="flex items-center gap-2">
          {/* Playback Speed Pill */}
          <button
            onClick={onCycleSpeed}
            className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono font-medium text-cafe-text transition-all hover:border-white/30"
            title="Đổi tốc độ đọc ([ hoặc ])"
          >
            {speed}x
          </button>

          {/* Chapters Drawer Toggle */}
          <button
            onClick={onToggleChapters}
            className={`p-2 rounded-lg border text-xs transition-all ${
              isChaptersOpen
                ? 'bg-cafe-accent/20 border-cafe-accent text-cafe-accent'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-cafe-muted hover:text-white'
            }`}
            title="Danh sách chương (C)"
          >
            <List className="w-4 h-4" />
          </button>

          {/* Transcript / Quote Toggle */}
          <button
            onClick={onToggleTranscript}
            className={`p-2 rounded-lg border text-xs transition-all ${
              isTranscriptOpen
                ? 'bg-cafe-accent/20 border-cafe-accent text-cafe-accent'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-cafe-muted hover:text-white'
            }`}
            title="Trích đoạn & Lời đọc (T)"
          >
            <QuoteIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Skip & Play/Pause (Crucial UX for Podcasts/Audiobooks) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Previous Chapter */}
          <button
            onClick={onPrevChapter}
            className="p-2 text-cafe-muted hover:text-white transition-all active:scale-95"
            title="Chương trước"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          {/* Skip Backward 15s */}
          <button
            onClick={onSeekBackward}
            className="relative p-2.5 rounded-full hover:bg-white/10 text-cafe-text transition-all active:scale-90"
            title="Tua lùi 15 giây (Mũi tên Trái)"
          >
            <RotateCcw className="w-5 h-5 text-cafe-muted" />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold font-mono pt-1 text-white">
              15
            </span>
          </button>

          {/* Big Play / Pause Button with Amber Glow */}
          <button
            onClick={onTogglePlay}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-cafe-accent to-amber-500 hover:from-amber-500 hover:to-orange-400 text-white flex items-center justify-center shadow-lg shadow-orange-500/30 transition-all transform hover:scale-105 active:scale-95"
            title="Phát / Tạm dừng (Phím Space)"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 fill-current" />
            ) : (
              <Play className="w-6 h-6 fill-current translate-x-0.5" />
            )}
          </button>

          {/* Skip Forward 30s */}
          <button
            onClick={onSeekForward}
            className="relative p-2.5 rounded-full hover:bg-white/10 text-cafe-text transition-all active:scale-90"
            title="Tua tới 30 giây (Mũi tên Phải)"
          >
            <RotateCw className="w-5 h-5 text-cafe-muted" />
            <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold font-mono pt-1 text-white">
              30
            </span>
          </button>

          {/* Next Chapter */}
          <button
            onClick={onNextChapter}
            className="p-2 text-cafe-muted hover:text-white transition-all active:scale-95"
            title="Chương tiếp theo"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Right Actions: Volume Slider */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleMute}
            className="p-2 text-cafe-muted hover:text-white transition-all"
            title={isMuted ? 'Bật âm lượng (M)' : 'Tắt tiếng'}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4 text-red-400" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={isMuted ? 0 : volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-16 sm:w-20 hidden sm:block"
            title="Âm lượng (Mũi tên Lên / Xuống)"
          />
        </div>
      </div>
    </div>
  );
};
