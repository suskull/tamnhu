import React from 'react';
import { Chapter } from '../types';

interface Props {
  isOpen: boolean;
  chapters: Chapter[];
  currentChapterIndex: number;
  onSelectChapter: (idx: number) => void;
  onClose: () => void;
}

export const LofiChapterModal: React.FC<Props> = ({
  isOpen,
  chapters,
  currentChapterIndex,
  onSelectChapter,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.85)',
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'rgba(0,0,0,0.95)',
          border: '1px solid white',
          boxShadow: 'var(--green-glow)',
          maxWidth: '520px',
          width: '100%',
          padding: '24px',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <span style={{ fontSize: '26px' }} className="green-glow">
            CHAPTERS LIST ({chapters.length})
          </span>
          <button onClick={onClose} className="red" style={{ fontSize: '24px' }}>
            [X]
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {chapters.map((ch, idx) => {
            const isCurrent = idx === currentChapterIndex;
            const minutes = Math.floor(ch.duration / 60);

            return (
              <div
                key={ch.id}
                onClick={() => {
                  onSelectChapter(idx);
                  onClose();
                }}
                className={`pointer ${isCurrent ? 'green-box-small' : ''}`}
                style={{
                  padding: '10px 14px',
                  border: isCurrent ? '1px solid white' : '1px solid rgba(255,255,255,0.15)',
                  backgroundColor: isCurrent ? 'rgba(0,255,0,0.08)' : 'rgba(255,255,255,0.02)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <span style={{ fontSize: '22px', display: 'block' }} className={isCurrent ? 'green-glow' : ''}>
                    {isCurrent ? '> ' : ''}Chương {ch.number}: {ch.title}
                  </span>
                  <span style={{ fontSize: '15px', color: 'rgba(235,235,235,0.5)', textShadow: 'none' }}>
                    {ch.summary}
                  </span>
                </div>
                <span style={{ fontSize: '18px', color: 'rgba(235,235,235,0.6)', marginLeft: '12px' }}>
                  {minutes}m
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
