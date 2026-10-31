import React from 'react';
import { X, Keyboard, Sparkles } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutItem {
  keyLabel: string;
  action: string;
}

export const ShortcutsModal: React.FC<Props> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts: ShortcutItem[] = [
    { keyLabel: 'Space', action: 'Phát / Tạm dừng sách nói' },
    { keyLabel: '← / →', action: 'Tua lùi 15s / Tua tới 30s' },
    { keyLabel: '↑ / ↓', action: 'Tăng / Giảm âm lượng' },
    { keyLabel: '[ / ]', action: 'Thay đổi tốc độ đọc (0.8x - 2.0x)' },
    { keyLabel: 'B', action: 'Mở tủ sách & podcast (Bookshelf)' },
    { keyLabel: 'C', action: 'Xem danh sách chương (Chapters)' },
    { keyLabel: 'M', action: 'Mở bộ trộn tiếng nền (Mixer: mưa, lửa, cà phê...)' },
    { keyLabel: 'T', action: 'Bật/Tắt trích đoạn & phụ đề (Transcript)' },
    { keyLabel: 'Z', action: 'Cài đặt hẹn giờ tắt ru ngủ (Sleep Timer)' },
    { keyLabel: 'G', action: 'Đổi cảnh nền không gian quán cà phê' },
    { keyLabel: 'L', action: 'Bật/Tắt chế độ tiết kiệm pin (Low Energy)' },
    { keyLabel: 'F', action: 'Bật/Tắt chế độ toàn màn hình' },
    { keyLabel: 'Esc', action: 'Đóng tất cả các bảng điều khiển' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-cafe-card border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-cafe-surface/50">
          <div className="flex items-center gap-2">
            <Keyboard className="w-5 h-5 text-cafe-accent" />
            <div>
              <h2 className="font-serif text-lg font-bold text-white">
                Bảng phím tắt tiện lợi
              </h2>
              <p className="text-xs text-cafe-muted">
                Điều khiển trải nghiệm nghe hoàn toàn bằng bàn phím
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

        {/* Shortcuts List */}
        <div className="p-6 max-h-[60vh] overflow-y-auto space-y-2.5">
          {shortcuts.map((sc, i) => (
            <div
              key={i}
              className="flex items-center justify-between py-1.5 px-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 text-xs"
            >
              <span className="text-cafe-text">{sc.action}</span>
              <kbd className="px-2 py-1 rounded bg-cafe-surface border border-white/20 font-mono font-bold text-amber-300 text-[11px] shadow-sm">
                {sc.keyLabel}
              </kbd>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-2 px-6 py-3.5 border-t border-white/10 bg-cafe-surface/30 text-xs text-cafe-muted">
          <Sparkles className="w-4 h-4 text-cafe-accent flex-shrink-0" />
          <span>Lấy cảm hứng từ triết lý tối giản và mượt mà của lofi.cafe</span>
        </div>
      </div>
    </div>
  );
};
