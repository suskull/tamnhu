import React, { useState, useRef } from 'react';
import { Chapter } from '../types';

interface Props {
  currentTime: number;
  duration: number;
  chapters: Chapter[];
  onSeek: (time: number) => void;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return '00:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  const h = Math.floor(m / 60);
  if (h > 0) {
    const remM = m % 60;
    return `${h}:${remM < 10 ? '0' : ''}${remM}:${s < 10 ? '0' : ''}${s}`;
  }
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

export const ProgressBar: React.FC<Props> = ({
  currentTime,
  duration,
  chapters,
  onSeek,
}) => {
  const [hoverTime, setHoverTime] = useState<number | null>(null);
  const [hoverChapter, setHoverChapter] = useState<string | null>(null);
  const [hoverX, setHoverX] = useState<number>(0);
  const barRef = useRef<HTMLDivElement>(null);

  const percentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current || duration <= 0) return;
    const rect = barRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const targetSec = (pos / rect.width) * duration;
    setHoverTime(targetSec);
    setHoverX(pos);

    // Find which chapter corresponds to targetSec
    const matched = chapters.find(
      (c) => targetSec >= c.startTime && targetSec < c.startTime + c.duration
    );
    setHoverChapter(matched ? `Chương ${matched.number}: ${matched.title}` : null);
  };

  const handleMouseLeave = () => {
    setHoverTime(null);
    setHoverChapter(null);
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!barRef.current || duration <= 0) return;
    const rect = barRef.current.getBoundingClientRect();
    const pos = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const targetSec = (pos / rect.width) * duration;
    onSeek(targetSec);
  };

  return (
    <div className="w-full space-y-1.5 select-none">
      {/* Progress Track */}
      <div
        ref={barRef}
        onClick={handleClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full h-2.5 bg-white/10 hover:h-3.5 rounded-full cursor-pointer transition-all flex items-center group"
      >
        {/* Chapter tick markers */}
        {chapters.map((chapter) => {
          if (chapter.startTime === 0 || duration <= 0) return null;
          const tickPercent = (chapter.startTime / duration) * 100;
          return (
            <div
              key={chapter.id}
              className="absolute top-0 bottom-0 w-[2px] bg-white/30 z-10 pointer-events-none"
              style={{ left: `${tickPercent}%` }}
              title={`Chương ${chapter.number}: ${chapter.title}`}
            />
          );
        })}

        {/* Hover preview fill */}
        {hoverTime !== null && (
          <div
            className="absolute top-0 bottom-0 left-0 bg-white/20 rounded-full pointer-events-none"
            style={{ width: `${(hoverTime / duration) * 100}%` }}
          />
        )}

        {/* Active progress fill */}
        <div
          className="relative top-0 bottom-0 left-0 bg-gradient-to-r from-cafe-accent to-amber-400 h-full rounded-full transition-all"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        >
          {/* Draggable thumb dot */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-1/2" />
        </div>

        {/* Hover Tooltip */}
        {hoverTime !== null && (
          <div
            className="absolute -top-11 -translate-x-1/2 px-2.5 py-1 rounded bg-cafe-card border border-white/20 text-white text-[11px] font-mono pointer-events-none shadow-xl z-30 whitespace-nowrap"
            style={{ left: `${hoverX}px` }}
          >
            <span>{formatTime(hoverTime)}</span>
            {hoverChapter && (
              <span className="text-cafe-muted ml-1.5 text-[10px]">
                • {hoverChapter}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Timestamp labels */}
      <div className="flex items-center justify-between text-xs font-mono text-cafe-muted">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};
