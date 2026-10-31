import React from 'react';
import { AmbientMixerState } from '../types';
import { LofiVolumeSlider } from './LofiVolumeSlider';

interface Props {
  isOpen: boolean;
  ambientState: AmbientMixerState;
  onVolumeChange: (type: keyof AmbientMixerState, vol: number) => void;
  onClose: () => void;
}

export const LofiMixerPanel: React.FC<Props> = ({
  isOpen,
  ambientState,
  onVolumeChange,
  onClose,
}) => {
  if (!isOpen) return null;

  const channels: { key: keyof AmbientMixerState; label: string }[] = [
    { key: 'rain', label: 'MƯA ĐÊM' },
    { key: 'fire', label: 'LÒ SƯỞI' },
    { key: 'cafe', label: 'QUÁN CÀ PHÊ' },
    { key: 'night', label: 'ĐÊM HÈ' },
    { key: 'vinyl', label: 'ĐĨA THAN' },
  ];

  return (
    <>
      {/* Click outside backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 38 }}
      />

      <div className="lofi-floating-panel" style={{ minWidth: '240px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '20px' }} className="green-glow">
            AMBIENT SOUND LAYERS
          </span>
          <button onClick={onClose} className="red" style={{ fontSize: '20px' }}>
            [X]
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '10px' }}>
          {channels.map((ch) => (
            <div
              key={ch.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '18px', color: 'rgba(235,235,235,0.85)' }}>
                {ch.label}
              </span>
              <LofiVolumeSlider
                volume={ambientState[ch.key]}
                setVolume={(v) => onVolumeChange(ch.key, v)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
