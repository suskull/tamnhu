import React, { useState, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const PomodoroTimer: React.FC<Props> = ({ isOpen, onClose }) => {
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');

  useEffect(() => {
    let interval: number | undefined;
    if (isRunning && secondsLeft > 0) {
      interval = window.setInterval(() => {
        setSecondsLeft((s) => s - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      if (mode === 'focus') {
        setMode('break');
        setSecondsLeft(5 * 60);
      } else {
        setMode('focus');
        setSecondsLeft(25 * 60);
      }
      setIsRunning(false);
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, mode]);

  if (!isOpen) return null;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeDisplay = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <>
      {/* Click outside backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 38 }}
      />

      <div className="lofi-floating-panel" style={{ minWidth: '220px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
          <span style={{ fontSize: '18px', color: 'rgba(235,235,235,0.6)', textShadow: 'none' }}>
            {mode === 'focus' ? 'FOCUS TIME' : 'SHORT BREAK'}
          </span>
          <button onClick={onClose} className="red" style={{ fontSize: '20px' }}>
            [X]
          </button>
        </div>

        <div style={{ fontSize: '48px', lineHeight: 1, marginBottom: '12px', letterSpacing: '2px' }} className="green-glow">
          {timeDisplay}
        </div>

        <div style={{ display: 'flex', gap: '12px', fontSize: '19px' }}>
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={isRunning ? 'red' : 'green-glow'}
            style={{ cursor: 'pointer' }}
          >
            [{isRunning ? 'PAUSE' : 'START'}]
          </button>

          <button
            onClick={() => {
              setIsRunning(false);
              setSecondsLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
            }}
            style={{ cursor: 'pointer', color: 'rgba(235,235,235,0.7)' }}
          >
            [RESET]
          </button>
        </div>
      </div>
    </>
  );
};
