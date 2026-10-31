import React from 'react';
import { X, CloudRain, Flame, Coffee, Moon, Disc, Volume2, RotateCcw } from 'lucide-react';
import { AmbientMixerState } from '../types';

interface Props {
  isOpen: boolean;
  ambientState: AmbientMixerState;
  onVolumeChange: (type: keyof AmbientMixerState, volume: number) => void;
  onReset: () => void;
  onClose: () => void;
}

interface SoundControlItem {
  key: keyof AmbientMixerState;
  label: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}

export const AmbientMixerModal: React.FC<Props> = ({
  isOpen,
  ambientState,
  onVolumeChange,
  onReset,
  onClose,
}) => {
  if (!isOpen) return null;

  const sounds: SoundControlItem[] = [
    {
      key: 'rain',
      label: 'Mưa đêm trên mái ngói',
      desc: 'Tiếng mưa rơi đều, êm đềm rửa trôi muộn phiền',
      icon: <CloudRain className="w-5 h-5" />,
      color: 'text-sky-400',
    },
    {
      key: 'fire',
      label: 'Lửa reo lò sưởi',
      desc: 'Tiếng gỗ cháy lách tách ấm áp giữa đêm lạnh',
      icon: <Flame className="w-5 h-5" />,
      color: 'text-orange-400',
    },
    {
      key: 'cafe',
      label: 'Quán cà phê khuya',
      desc: 'Tiếng rì rầm nhẹ nhàng, tiếng thìa chạm tách sứ',
      icon: <Coffee className="w-5 h-5" />,
      color: 'text-amber-400',
    },
    {
      key: 'night',
      label: 'Đêm hè thanh vắng',
      desc: 'Tiếng dế ngân nga, làn gió thoảng qua cành lá',
      icon: <Moon className="w-5 h-5" />,
      color: 'text-indigo-400',
    },
    {
      key: 'vinyl',
      label: 'Đĩa than Lo-Fi',
      desc: 'Tiếng xào xạc băng từ và kim đĩa than cổ điển',
      icon: <Disc className="w-5 h-5" />,
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-cafe-card border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-cafe-surface/50">
          <div className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-cafe-accent" />
            <div>
              <h2 className="font-serif text-lg font-bold text-white">
                Bộ trộn âm thanh nền
              </h2>
              <p className="text-xs text-cafe-muted">
                Tùy chỉnh không gian nghe theo ý thích của bạn
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

        {/* Sliders list */}
        <div className="p-6 space-y-5">
          {sounds.map((sound) => {
            const currentVol = ambientState[sound.key];
            const percent = Math.round(currentVol * 100);

            return (
              <div key={sound.key} className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className={sound.color}>{sound.icon}</span>
                    <div>
                      <span className="font-medium text-white font-serif text-sm">
                        {sound.label}
                      </span>
                      <p className="text-[11px] text-cafe-muted hidden sm:block">
                        {sound.desc}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-cafe-muted font-bold text-xs">
                    {percent}%
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.02"
                  value={currentVol}
                  onChange={(e) =>
                    onVolumeChange(sound.key, parseFloat(e.target.value))
                  }
                  className="w-full"
                />
              </div>
            );
          })}
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-white/10 bg-cafe-surface/30">
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-cafe-muted hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Mặc định cảnh nền</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-cafe-accent hover:bg-cafe-accentHover text-white text-xs font-medium transition-all shadow-md"
          >
            Hoàn tất
          </button>
        </div>
      </div>
    </div>
  );
};
