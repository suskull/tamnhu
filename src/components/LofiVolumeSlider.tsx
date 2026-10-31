import React, { useRef, useState, useEffect } from 'react';

interface Props {
  volume: number;
  setVolume: (v: number) => void;
  style?: React.CSSProperties;
}

export const LofiVolumeSlider: React.FC<Props> = ({ volume, setVolume, style }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [clicking, setClicking] = useState(false);
  const [sliderCoordinates, setSliderCoordinates] = useState({ x: 0, w: 0 });

  function changeVolume(clientX: number) {
    if (sliderCoordinates.w === 0) return;
    const newVol = Math.min(
      Math.max(Math.round(((clientX - sliderCoordinates.x) / sliderCoordinates.w) * 100) / 100, 0),
      1
    );
    setVolume(newVol);
  }

  function handleMouseDown(e: React.MouseEvent) {
    setClicking(true);
    changeVolume(e.clientX);
  }

  function handleMouseMove(e: React.MouseEvent) {
    if (clicking) {
      changeVolume(e.clientX);
    }
  }

  function handleMouseUp() {
    setClicking(false);
  }

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setSliderCoordinates({ x: rect.x, w: rect.width });
    }
  }, [volume]);

  const thresholds = [0.02, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];

  return (
    <div style={{ userSelect: 'none', display: 'inline-block', ...style }}>
      <div
        ref={ref}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={(e) => {
          if (e.touches[0]) changeVolume(e.touches[0].clientX);
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          padding: '4px 0',
        }}
        title={`Âm lượng: ${Math.round(volume * 100)}%`}
      >
        {thresholds.map((th, idx) => {
          const isOn = volume > th;
          return (
            <div
              key={idx}
              className={volume > 0.02 ? 'green-box' : 'red-box'}
              style={{
                width: 6,
                height: 14,
                marginRight: 4,
                background: 'white',
                display: 'inline-block',
                pointerEvents: 'none',
                opacity: isOn ? 1 : 0.3,
                transition: 'opacity 0.1s ease',
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
