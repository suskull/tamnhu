import React from 'react';

interface Props {
  isOpen: boolean;
  lowEnergyMode: boolean;
  onToggleLowEnergy: () => void;
  onClose: () => void;
}

export const AboutPanel: React.FC<Props> = ({
  isOpen,
  lowEnergyMode,
  onToggleLowEnergy,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Click outside backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 38 }}
      />

      <div className="lofi-floating-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '28px' }}>
            readio<span className="red">.cafe</span>
          </span>
          <button onClick={onClose} className="red" style={{ fontSize: '22px', padding: '0 6px' }}>
            [X]
          </button>
        </div>

        <div style={{ fontSize: '16px', color: 'rgba(235,235,235,0.7)', marginBottom: '14px', textShadow: 'none' }}>
          lofi podcast & audiobooks player
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '12px' }}>
          <div>
            <span className="red">← / →</span> tua 15s / 30s
          </div>
          <div>
            <span className="red">SPACE</span> phát / tạm dừng
          </div>
          <div>
            <span className="red">[ / ]</span> đổi tốc độ đọc
          </div>
          <div>
            <span className="red">G</span> đổi ảnh động GIF
          </div>
          <div>
            <span className="red">C</span> danh sách chương
          </div>
          <div>
            <span className="red">M</span> bộ trộn tiếng mưa/cà phê
          </div>
          <div>
            <span className="red">L</span> tiết kiệm pin
          </div>
          <div>
            <span className="red">ESC</span> đóng cửa sổ
          </div>
        </div>

        <button
          onClick={onToggleLowEnergy}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '10px',
            fontSize: '18px',
            cursor: 'pointer',
          }}
        >
          <span>Low power mode:</span>
          <span className={lowEnergyMode ? 'red' : 'green-glow'}>
            [{lowEnergyMode ? 'ON' : 'OFF'}]
          </span>
        </button>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '8px', fontSize: '15px', color: 'rgba(235,235,235,0.5)', textShadow: 'none' }}>
          Tự động đọc giọng kể tiếng Việt & nhạc nền lo-fi
        </div>
      </div>
    </>
  );
};
