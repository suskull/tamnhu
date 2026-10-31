import React, { useState, useEffect } from 'react';

interface Props {
  onStart: () => void;
}

export const LofiPressToStart: React.FC<Props> = ({ onStart }) => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);

    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={onStart}
      className="pointer"
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 20,
        backgroundColor: 'rgba(0,0,0,0.45)',
        padding: '20px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '90%' }}>
        <span
          className="green-glow"
          style={{
            fontSize: 'clamp(24px, 5vw, 36px)',
            letterSpacing: '2px',
            display: 'inline-block',
          }}
        >
          [ {isTouch ? 'TAP TO START' : 'PRESS ANY KEY OR CLICK TO START'}
          {cursorVisible ? '_' : ' '} ]
        </span>
        <div
          style={{
            marginTop: '12px',
            fontSize: '18px',
            color: 'rgba(235,235,235,0.7)',
            textShadow: 'none',
          }}
        >
          readio.cafe • podcast & audiobooks in lo-fi atmosphere
        </div>
      </div>
    </div>
  );
};
