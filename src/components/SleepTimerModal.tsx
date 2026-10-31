import React from 'react';
import { X, Moon, Clock, Sparkles } from 'lucide-react';
import { SleepTimerState } from '../types';

interface Props {
  isOpen: boolean;
  sleepTimer: SleepTimerState;
  onSetTimer: (minutes: number, mode?: 'minutes' | 'chapter_end') => void;
  onCancelTimer: () => void;
  onClose: () => void;
}

export const SleepTimerModal: React.FC<Props> = ({
  isOpen,
  sleepTimer,
  onSetTimer,
  onCancelTimer,
  onClose,
}) => {
  if (!isOpen) return null;

  const presets = [15, 30, 45, 60];

  const formatRemaining = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m} phút ${s < 10 ? '0' : ''}${s} giây`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm rounded-2xl bg-cafe-card border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-cafe-surface/50">
          <div className="flex items-center gap-2">
            <Moon className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="font-serif text-lg font-bold text-white">
                Hẹn giờ tắt
              </h2>
              <p className="text-xs text-cafe-muted">
                Nghe sách và thong thả đi vào giấc ngủ
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-cafe-muted hover:text-white transition-all"
            title="Đóng (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Active Timer Status */}
          {sleepTimer.enabled ? (
            <div className="p-4 rounded-xl bg-amber-500/15 border border-amber-500/30 text-center space-y-2">
              <span className="text-xs text-amber-300 font-medium">
                Đang hẹn giờ đếm ngược
              </span>
              <div className="text-2xl font-mono font-bold text-amber-200">
                {formatRemaining(sleepTimer.remainingSeconds)}
              </div>
              {sleepTimer.isFadingOut && (
                <div className="text-xs text-amber-400 animate-pulse font-medium">
                  🌙 Đang giảm dần âm lượng êm ái...
                </div>
              )}
              <button
                onClick={onCancelTimer}
                className="mt-2 text-xs text-red-400 hover:text-red-300 underline font-medium"
              >
                Hủy hẹn giờ
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2.5">
              {presets.map((min) => (
                <button
                  key={min}
                  onClick={() => {
                    onSetTimer(min, 'minutes');
                    onClose();
                  }}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 text-white text-sm font-mono font-semibold transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>{min} phút</span>
                </button>
              ))}

              <button
                onClick={() => {
                  onSetTimer(0, 'chapter_end');
                  onClose();
                }}
                className="col-span-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-400/50 text-white text-xs font-serif font-medium transition-all"
              >
                📖 Tắt khi kết thúc chương này
              </button>
            </div>
          )}

          {/* Audio Fade-out feature explanation (Signature UX from ui-ux-pro-max) */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-white/5 border border-white/5 text-xs text-cafe-muted">
            <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Trong <strong className="text-white">30 giây cuối cùng</strong>, âm thanh sẽ tự động hạ dần về 0 để bạn không bị thức giấc bởi sự im lặng đột ngột.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
