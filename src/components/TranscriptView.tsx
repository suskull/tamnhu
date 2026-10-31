import React from 'react';
import { X, Quote as QuoteIcon, Bookmark } from 'lucide-react';
import { Quote, Chapter } from '../types';

interface Props {
  isOpen: boolean;
  quotes: Quote[];
  currentChapter: Chapter;
  currentTime: number;
  onClose: () => void;
}

export const TranscriptView: React.FC<Props> = ({
  isOpen,
  quotes,
  currentChapter,
  currentTime,
  onClose,
}) => {
  if (!isOpen) return null;

  // Find active quote
  const activeQuote = quotes
    .slice()
    .reverse()
    .find((q) => currentTime >= q.time) || quotes[0];

  return (
    <div className="fixed inset-x-4 bottom-28 sm:bottom-32 sm:right-6 sm:left-auto sm:w-96 z-40 bg-cafe-card/90 backdrop-blur-xl border border-white/15 rounded-2xl shadow-2xl p-5 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex items-center gap-2 text-cafe-accent">
          <QuoteIcon className="w-4 h-4" />
          <span className="text-xs font-serif font-bold uppercase tracking-wider text-white">
            Trích đoạn & Chiêm nghiệm
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-cafe-muted hover:text-white transition-colors"
          title="Đóng (Esc hoặc T)"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {activeQuote ? (
        <div className="space-y-3">
          <div className="relative pl-3.5 border-l-2 border-cafe-accent">
            <p className="font-serif italic text-sm sm:text-base text-amber-100/95 leading-relaxed">
              "{activeQuote.text}"
            </p>
            {activeQuote.authorNote && (
              <p className="text-[11px] text-cafe-muted font-sans mt-1.5 flex items-center gap-1">
                <Bookmark className="w-3 h-3 text-cafe-accent" />
                <span>{activeQuote.authorNote}</span>
              </p>
            )}
          </div>

          <div className="pt-2 text-[11px] text-cafe-muted border-t border-white/5 flex items-center justify-between">
            <span>Chương {currentChapter.number}</span>
            <span className="text-cafe-accent font-medium">Đang đồng bộ với giọng đọc</span>
          </div>
        </div>
      ) : (
        <p className="text-xs text-cafe-muted italic">
          Không có trích đoạn nào ở thời điểm này.
        </p>
      )}
    </div>
  );
};
