import { useEffect } from 'react';

export interface ShortcutHandlers {
  onTogglePlay: () => void;
  onSeekBackward: () => void;
  onSeekForward: () => void;
  onVolumeUp: () => void;
  onVolumeDown: () => void;
  onCycleSpeed: () => void;
  onToggleBooks: () => void;
  onToggleChapters: () => void;
  onToggleMixer: () => void;
  onToggleTranscript: () => void;
  onToggleSleepTimer: () => void;
  onNextScene: () => void;
  onToggleLowEnergy: () => void;
  onToggleFullscreen: () => void;
  onToggleHelp: () => void;
  onCloseModals: () => void;
}

export function useKeyboardShortcuts(handlers: ShortcutHandlers, enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger shortcuts if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key) {
        case ' ':
          e.preventDefault();
          handlers.onTogglePlay();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handlers.onSeekBackward();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handlers.onSeekForward();
          break;
        case 'ArrowUp':
          e.preventDefault();
          handlers.onVolumeUp();
          break;
        case 'ArrowDown':
          e.preventDefault();
          handlers.onVolumeDown();
          break;
        case '[':
        case ']':
          e.preventDefault();
          handlers.onCycleSpeed();
          break;
        case 'b':
        case 'B':
          handlers.onToggleBooks();
          break;
        case 'c':
        case 'C':
          handlers.onToggleChapters();
          break;
        case 'm':
        case 'M':
          handlers.onToggleMixer();
          break;
        case 't':
        case 'T':
          handlers.onToggleTranscript();
          break;
        case 'z':
        case 'Z':
          handlers.onToggleSleepTimer();
          break;
        case 'g':
        case 'G':
          handlers.onNextScene();
          break;
        case 'l':
        case 'L':
          handlers.onToggleLowEnergy();
          break;
        case 'f':
        case 'F':
          handlers.onToggleFullscreen();
          break;
        case '?':
        case '/':
          handlers.onToggleHelp();
          break;
        case 'Escape':
          handlers.onCloseModals();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers, enabled]);
}
