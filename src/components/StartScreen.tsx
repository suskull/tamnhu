import React from 'react';
import { Coffee, Headphones } from 'lucide-react';

interface Props {
  onStart: () => void;
}

export const StartScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div
      onClick={onStart}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center p-6 bg-cafe-bg/60 backdrop-blur-sm cursor-pointer select-none transition-opacity duration-700"
    >
      <div className="max-w-md text-center space-y-6 animate-fade-in">
        {/* Animated Icon */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-cafe-card border border-white/10 shadow-2xl">
          <Coffee className="w-10 h-10 text-cafe-accent" />
          <Headphones className="w-5 h-5 text-amber-300 absolute -top-2 -right-2 p-1 bg-cafe-surface rounded-full border border-white/20 animate-bounce" />
        </div>

        {/* Title */}
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white tracking-wide">
            Readio<span className="text-cafe-accent">.cafe</span>
          </h1>
          <p className="text-xs sm:text-sm text-cafe-muted mt-2 font-sans max-w-sm mx-auto leading-relaxed">
            Không gian nghe sách nói & podcast lofi ấm cúng, tĩnh lặng và nâng niu từng phút giây suy ngẫm.
          </p>
        </div>

        {/* Blink Prompt (Signature from lofi.cafe) */}
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-xs sm:text-sm font-mono text-amber-200 shadow-lg hover:scale-105 active:scale-95 transition-all">
            <span className="inline-block w-2 h-2 rounded-full bg-cafe-accent animate-ping" />
            <span>Chạm màn hình hoặc bấm phím bất kỳ để bắt đầu</span>
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex items-center justify-center gap-3 pt-6 text-[11px] font-mono text-cafe-muted">
          <span>🌧 Mưa rào đêm</span>
          <span>•</span>
          <span>🔥 Lửa lò sưởi</span>
          <span>•</span>
          <span>📖 Sách nói kinh điển</span>
        </div>
      </div>
    </div>
  );
};
