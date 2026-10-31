import React from 'react';
import { X, Play, Clock, CheckCircle2 } from 'lucide-react';
import { Chapter } from '../types';

interface Props {
  isOpen: boolean;
  chapters: Chapter[];
  currentChapterId: string;
  currentTime: number;
  onSelectChapter: (chapter: Chapter) => void;
  onClose: () => void;
}

function formatMinutes(seconds: number): string {
  const m = Math.floor(seconds / 60);
  return `${m} phút`;
}

export const ChapterDrawer: React.FC<Props> = ({
  isOpen,
  chapters,
  currentChapterId,
  currentTime,
  onSelectChapter,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg max-h-[85vh] flex flex-col rounded-2xl bg-cafe-card border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-cafe-surface/50">
          <div>
            <h2 className="font-serif text-lg font-bold text-white">
              Danh sách chương
            </h2>
            <p className="text-xs text-cafe-muted">
              {chapters.length} chương • Chọn chương để chuyển đoạn tức thì
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-cafe-muted hover:text-white transition-all"
            title="Đóng (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chapters list */}
        <div className="overflow-y-auto p-4 space-y-2.5">
          {chapters.map((chapter) => {
            const isCurrent = chapter.id === currentChapterId;
            const isCompleted = currentTime >= chapter.startTime + chapter.duration;

            return (
              <button
                key={chapter.id}
                onClick={() => {
                  onSelectChapter(chapter);
                  onClose();
                }}
                className={`w-full flex items-start gap-3.5 p-3.5 rounded-xl text-left border transition-all ${
                  isCurrent
                    ? 'bg-cafe-accent/15 border-cafe-accent/50 text-white shadow-md'
                    : 'bg-white/5 hover:bg-white/10 border-white/5 text-cafe-text hover:border-white/20'
                }`}
              >
                <div className="mt-0.5 flex-shrink-0">
                  {isCurrent ? (
                    <div className="w-7 h-7 rounded-lg bg-cafe-accent text-white flex items-center justify-center animate-pulse">
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>
                  ) : isCompleted ? (
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-lg bg-white/10 text-cafe-muted flex items-center justify-center font-mono text-xs">
                      {chapter.number}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className={`font-serif text-sm font-semibold truncate ${
                      isCurrent ? 'text-amber-200' : 'text-white'
                    }`}>
                      Chương {chapter.number}: {chapter.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] font-mono text-cafe-muted flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      <span>{formatMinutes(chapter.duration)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-cafe-muted line-clamp-2 mt-1 font-sans">
                    {chapter.summary}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
