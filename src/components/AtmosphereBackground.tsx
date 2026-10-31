import React from 'react';
import { AmbientScene } from '../types';

interface Props {
  currentScene: AmbientScene;
  lowEnergyMode: boolean;
  crtFilterEnabled: boolean;
}

export const AtmosphereBackground: React.FC<Props> = ({
  currentScene,
  lowEnergyMode,
  crtFilterEnabled,
}) => {
  return (
    <>
      {/* Background Image with smooth fade & Ken Burns effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          key={currentScene.id}
          className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${
            lowEnergyMode ? '' : 'scale-105 animate-pulse-subtle'
          }`}
          style={{
            backgroundImage: `url(${currentScene.imageUrl})`,
            filter: lowEnergyMode ? 'brightness(0.35)' : 'brightness(0.42) saturate(1.15)',
          }}
        />

        {/* Ambient Dark Gradation & Noise Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-cafe-bg via-cafe-bg/60 to-cafe-bg/30" />
      </div>

      {/* CRT Scanline overlay (lofi.cafe hallmark) */}
      {crtFilterEnabled && !lowEnergyMode && <div id="crt-lines" />}

      {/* Vignette dark edges */}
      <div id="vignette" />
    </>
  );
};
