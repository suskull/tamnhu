import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AUDIOBOOK_CATALOG } from './data/catalog';
import { Audiobook } from './types';
import { LofiIcon } from './components/LofiIcon';
import { LofiVolumeSlider } from './components/LofiVolumeSlider';
import { LofiGifBackground, LOFI_GIFS } from './components/LofiGifBackground';
import { LofiStationSelector } from './components/LofiStationSelector';
import { LofiPressToStart } from './components/LofiPressToStart';
import { AboutPanel } from './components/AboutPanel';
import { PomodoroTimer } from './components/PomodoroTimer';
import { LofiMixerPanel } from './components/LofiMixerPanel';
import { LofiChapterModal } from './components/LofiChapterModal';
import { audioEngine } from './utils/audioEngine';
import { playCrtStaticSound, playSoftClick } from './utils/soundEffects';

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

export function App() {
  // App Lifecycle
  const [started, setStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showStatic, setShowStatic] = useState(false);
  const [gifIndex, setGifIndex] = useState(0);

  // Audio & Books State
  const [currentBook, setCurrentBook] = useState<Audiobook>(AUDIOBOOK_CATALOG[0]);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const [volume, setVolume] = useState(0.8);
  const [showSubtitles, setShowSubtitles] = useState(true);

  // Ambient Mixer
  const [ambientState, setAmbientState] = useState({
    rain: 0.35,
    fire: 0.15,
    cafe: 0.2,
    night: 0.1,
    vinyl: 0.3,
  });

  // UI Panels
  const [stationSelectorOpen, setStationSelectorOpen] = useState(false);
  const [chapterModalOpen, setChapterModalOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [pomodoroOpen, setPomodoroOpen] = useState(false);
  const [mixerOpen, setMixerOpen] = useState(false);
  const [lowEnergyMode, setLowEnergyMode] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [listenerCount, setListenerCount] = useState(1482);

  const currentChapter = currentBook.chapters[currentChapterIndex] || currentBook.chapters[0];
  const timerRef = useRef<number | null>(null);

  // Active Quote / Subtitle matching current time
  const activeQuote = currentBook.quotes
    .slice()
    .reverse()
    .find((q) => currentTime >= q.time)?.text || currentChapter.summary;

  // Trigger CRT static burst (lofi.cafe hallmark)
  const triggerStaticEffect = useCallback(() => {
    setShowStatic(true);
    playCrtStaticSound();
    setTimeout(() => {
      setShowStatic(false);
    }, 280);
  }, []);

  const changeGif = useCallback(() => {
    setGifIndex((prev) => (prev + 1) % LOFI_GIFS.length);
  }, []);

  // Narration text reader
  const playNarrationForChapter = useCallback((book: Audiobook, chIdx: number, rate: number) => {
    const ch = book.chapters[chIdx];
    if (!ch) return;
    const narration = `${book.title}. Tác giả ${book.author}. Chương ${ch.number}: ${ch.title}. ${ch.summary}`;
    audioEngine.speakChapter(narration, rate, () => {
      // If chapter ends, advance to next chapter if available
      if (chIdx < book.chapters.length - 1) {
        setCurrentChapterIndex(chIdx + 1);
        setCurrentTime(book.chapters[chIdx + 1].startTime);
      }
    });
  }, []);

  // Handle Initial Start
  const handleStart = () => {
    setStarted(true);
    audioEngine.init();
    triggerStaticEffect();
    setIsPlaying(true);
    playNarrationForChapter(currentBook, currentChapterIndex, speed);
  };

  // Sync Ambient Audio
  useEffect(() => {
    if (!started) return;
    audioEngine.setAmbientVolume('rain', ambientState.rain);
    audioEngine.setAmbientVolume('fire', ambientState.fire);
    audioEngine.setAmbientVolume('cafe', ambientState.cafe);
    audioEngine.setAmbientVolume('night', ambientState.night);
    audioEngine.setAmbientVolume('vinyl', ambientState.vinyl);
  }, [ambientState, started]);

  // Audio Playback simulation & Narration control
  useEffect(() => {
    if (isPlaying) {
      audioEngine.resumeNarration();
      timerRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1 * speed;
          if (next >= currentBook.totalDuration) {
            setIsPlaying(false);
            audioEngine.stopNarration();
            return currentBook.totalDuration;
          }
          return next;
        });
      }, 1000);
    } else {
      audioEngine.pauseNarration();
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, currentBook.totalDuration]);

  // Sync Chapter index based on currentTime
  useEffect(() => {
    const matchedIdx = currentBook.chapters.findIndex(
      (c) => currentTime >= c.startTime && currentTime < c.startTime + c.duration
    );
    if (matchedIdx !== -1 && matchedIdx !== currentChapterIndex) {
      setCurrentChapterIndex(matchedIdx);
      if (isPlaying) {
        playNarrationForChapter(currentBook, matchedIdx, speed);
      }
    }
  }, [currentTime, currentBook, currentChapterIndex, isPlaying, playNarrationForChapter, speed]);

  // Listener presence fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setListenerCount((c) => c + Math.floor(Math.random() * 5) - 2);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  // Navigation handlers
  const handleSeekPos = (clientX: number, target: HTMLDivElement) => {
    const rect = target.getBoundingClientRect();
    const pos = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const targetSec = (pos / rect.width) * currentBook.totalDuration;
    setCurrentTime(targetSec);
    playSoftClick();
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    handleSeekPos(e.clientX, e.currentTarget);
  };

  const handleTouchSeek = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches[0]) {
      handleSeekPos(e.touches[0].clientX, e.currentTarget);
    }
  };

  const handleRewind15 = () => {
    setCurrentTime((t) => Math.max(0, t - 15));
    playSoftClick();
  };

  const handleForward30 = () => {
    setCurrentTime((t) => Math.min(currentBook.totalDuration, t + 30));
    playSoftClick();
  };

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      const prevIdx = currentChapterIndex - 1;
      const prevCh = currentBook.chapters[prevIdx];
      setCurrentTime(prevCh.startTime);
      setCurrentChapterIndex(prevIdx);
      if (isPlaying) playNarrationForChapter(currentBook, prevIdx, speed);
    } else {
      setCurrentTime(0);
      if (isPlaying) playNarrationForChapter(currentBook, 0, speed);
    }
    playSoftClick();
  };

  const handleNext = () => {
    if (currentChapterIndex < currentBook.chapters.length - 1) {
      const nextIdx = currentChapterIndex + 1;
      const nextCh = currentBook.chapters[nextIdx];
      setCurrentTime(nextCh.startTime);
      setCurrentChapterIndex(nextIdx);
      if (isPlaying) playNarrationForChapter(currentBook, nextIdx, speed);
    }
    playSoftClick();
  };

  const handleShuffle = () => {
    triggerStaticEffect();
    changeGif();
    const randomBookIdx = Math.floor(Math.random() * AUDIOBOOK_CATALOG.length);
    const selected = AUDIOBOOK_CATALOG[randomBookIdx];
    setCurrentBook(selected);
    setCurrentChapterIndex(0);
    setCurrentTime(0);
    setIsPlaying(true);
    playNarrationForChapter(selected, 0, speed);
  };

  const handleCycleSpeed = () => {
    const speeds = [0.8, 1.0, 1.25, 1.5, 2.0];
    const next = speeds[(speeds.indexOf(speed) + 1) % speeds.length];
    setSpeed(next);
    playSoftClick();
    if (isPlaying) {
      playNarrationForChapter(currentBook, currentChapterIndex, next);
    }
  };

  const handleVolumeChange = (v: number) => {
    setVolume(v);
    audioEngine.setMasterVolume(v);
  };

  const handleSelectBook = (book: Audiobook) => {
    triggerStaticEffect();
    changeGif();
    setCurrentBook(book);
    setCurrentChapterIndex(0);
    setCurrentTime(0);
    setIsPlaying(true);
    setStationSelectorOpen(false);
    playNarrationForChapter(book, 0, speed);
  };

  const handleSelectChapter = (idx: number) => {
    playSoftClick();
    const ch = currentBook.chapters[idx];
    setCurrentTime(ch.startTime);
    setCurrentChapterIndex(idx);
    setChapterModalOpen(false);
    if (isPlaying) playNarrationForChapter(currentBook, idx, speed);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen().catch(() => {});
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  // Keyboard Shortcuts (lofi.cafe complete keys)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (!started) {
        handleStart();
        return;
      }

      switch (e.key) {
        case ' ':
          e.preventDefault();
          setIsPlaying((p) => !p);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleRewind15();
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleForward30();
          break;
        case 'ArrowUp':
          e.preventDefault();
          handleVolumeChange(Math.min(1, volume + 0.1));
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleVolumeChange(Math.max(0, volume - 0.1));
          break;
        case '[':
        case ']':
          e.preventDefault();
          handleCycleSpeed();
          break;
        case 'g':
        case 'G':
          triggerStaticEffect();
          changeGif();
          break;
        case 'l':
        case 'L':
          setLowEnergyMode((m) => !m);
          break;
        case 'f':
        case 'F':
          toggleFullscreen();
          break;
        case 'c':
        case 'C':
          setChapterModalOpen((o) => !o);
          setAboutOpen(false);
          setPomodoroOpen(false);
          setMixerOpen(false);
          break;
        case 'm':
        case 'M':
          setMixerOpen((o) => !o);
          setAboutOpen(false);
          setPomodoroOpen(false);
          setChapterModalOpen(false);
          break;
        case 't':
        case 'T':
          setShowSubtitles((s) => !s);
          break;
        case 'Escape':
          setStationSelectorOpen(false);
          setChapterModalOpen(false);
          setAboutOpen(false);
          setPomodoroOpen(false);
          setMixerOpen(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [started, volume, speed, handleCycleSpeed]);

  const progressPercentage = currentBook.totalDuration > 0
    ? (currentTime / currentBook.totalDuration) * 100
    : 0;

  return (
    <div
      id="container"
      className={lowEnergyMode ? 'low-energy' : ''}
      onClick={() => {
        if (!started) handleStart();
      }}
    >
      {/* 1. Lofi Gif Background Loop */}
      <LofiGifBackground gifIndex={gifIndex} showStatic={showStatic} />

      {/* 2. Overlays: CRT Scanlines, Vignette, Darken (lofi.cafe core) */}
      <div id="crt-lines" />
      <div id="vignette" />
      <div id="darken" />

      {/* 3. Top UI */}
      <div id="top-ui">
        {/* Visitors Counter (Left) */}
        <div id="visitors-counter">
          <span className="blinking green-glow" style={{ marginRight: '6px' }}>*</span>
          <span className="visitors-full">{listenerCount.toLocaleString()} people listening now</span>
          <span className="visitors-compact">{(listenerCount / 1000).toFixed(1)}k listening</span>
        </div>

        {/* Room Actions (Right) */}
        <div className="vertical">
          <div id="horizontal">
            <button
              title="Fullscreen (F)"
              onClick={toggleFullscreen}
              style={{ marginRight: '16px', display: 'inline-flex', alignItems: 'center' }}
            >
              <LofiIcon name={isFullscreen ? 'fullscreenExit' : 'fullscreenEnter'} />
            </button>

            <button
              title="Pomodoro Timer"
              onClick={() => {
                setPomodoroOpen((p) => !p);
                setAboutOpen(false);
                setMixerOpen(false);
                setChapterModalOpen(false);
              }}
              style={{ marginRight: '16px', display: 'inline-flex', alignItems: 'center' }}
            >
              <LofiIcon name="timer" />
            </button>

            <button
              title="Ambient Sound Mixer (M)"
              onClick={() => {
                setMixerOpen((p) => !p);
                setAboutOpen(false);
                setPomodoroOpen(false);
                setChapterModalOpen(false);
              }}
              style={{ marginRight: '16px', display: 'inline-flex', alignItems: 'center' }}
            >
              <LofiIcon name="mixer" />
            </button>

            <button
              title="About & Shortcuts (ESC)"
              onClick={() => {
                setAboutOpen((p) => !p);
                setPomodoroOpen(false);
                setMixerOpen(false);
                setChapterModalOpen(false);
              }}
              style={{ display: 'inline-flex', alignItems: 'center' }}
            >
              <LofiIcon name="heart" />
            </button>
          </div>

          <PomodoroTimer
            isOpen={pomodoroOpen}
            onClose={() => setPomodoroOpen(false)}
          />

          <LofiMixerPanel
            isOpen={mixerOpen}
            ambientState={ambientState}
            onVolumeChange={(type, val) =>
              setAmbientState((prev) => ({ ...prev, [type]: val }))
            }
            onClose={() => setMixerOpen(false)}
          />

          <AboutPanel
            isOpen={aboutOpen}
            lowEnergyMode={lowEnergyMode}
            onToggleLowEnergy={() => setLowEnergyMode(!lowEnergyMode)}
            onClose={() => setAboutOpen(false)}
          />
        </div>
      </div>

      {/* 4. Center: Press to start (Initial Screen) */}
      {!started && <LofiPressToStart onStart={handleStart} />}

      {/* 5. Bottom UI: Controls, Seekbar, Station Selector (lofi.cafe style) */}
      {started && (
        <div id="bottom-ui">
          {/* Live Subtitle / Quote bar */}
          {showSubtitles && (
            <div id="live-subtitle" title="Trích đoạn / Phụ đề đồng bộ (Phím T để bật/tắt)">
              <span>"</span>
              <span>{activeQuote}</span>
              <span>"</span>
            </div>
          )}

          {/* Seekbar */}
          <div className="lofi-progressbar">
            <span>{formatTime(currentTime)}</span>
            <div
              className="lofi-progress-track"
              onClick={handleSeek}
              onTouchMove={handleTouchSeek}
              title="Click to seek"
            >
              <div
                className="lofi-progress-fill"
                style={{ width: `${Math.min(100, progressPercentage)}%` }}
              />
            </div>
            <span>{formatTime(currentBook.totalDuration)}</span>
          </div>

          {/* Buttons Row */}
          <div id="buttons-ui">
            <div className="buttons-group">
              {/* Play / Pause */}
              {isPlaying ? (
                <button onClick={() => setIsPlaying(false)} title="Pause (Space)">
                  <LofiIcon name="pause" />
                </button>
              ) : (
                <button onClick={() => setIsPlaying(true)} title="Play (Space)">
                  <LofiIcon name="play" />
                </button>
              )}

              {/* Shuffle */}
              <button onClick={handleShuffle} title="Shuffle (G)">
                <LofiIcon name="shuffle" />
              </button>

              {/* Previous Chapter */}
              <button onClick={handlePrev} title="Chương trước">
                <LofiIcon name="previous" />
              </button>

              {/* Next Chapter */}
              <button onClick={handleNext} title="Chương sau">
                <LofiIcon name="forward" />
              </button>

              {/* Rewind 15s */}
              <button onClick={handleRewind15} title="Tua lùi 15s (←)">
                <LofiIcon name="rewind15" />
              </button>

              {/* Forward 30s */}
              <button onClick={handleForward30} title="Tua tới 30s (→)">
                <LofiIcon name="forward30" />
              </button>

              {/* Speed Cycle */}
              <button
                onClick={handleCycleSpeed}
                title="Tốc độ đọc ([ hoặc ])"
                style={{ fontSize: '20px' }}
              >
                <span>{speed}x</span>
              </button>

              {/* Chapter list toggle */}
              <button
                onClick={() => setChapterModalOpen(true)}
                title="Danh sách chương (C)"
                style={{ fontSize: '20px' }}
              >
                <span>ch.{currentChapterIndex + 1}/{currentBook.chapters.length}</span>
              </button>

              {/* Subtitles toggle */}
              <button
                onClick={() => setShowSubtitles(!showSubtitles)}
                title="Bật/Tắt phụ đề (T)"
                style={{ fontSize: '20px' }}
                className={showSubtitles ? 'green-glow' : ''}
              >
                <span>[CC]</span>
              </button>

              {/* 10-Block Volume Slider */}
              <LofiVolumeSlider
                volume={volume}
                setVolume={handleVolumeChange}
                style={{ marginLeft: '6px' }}
              />
            </div>
          </div>

          {/* Station / Book Selector button */}
          <LofiStationSelector
            books={AUDIOBOOK_CATALOG}
            currentBook={currentBook}
            isPlaying={isPlaying}
            isOpen={stationSelectorOpen}
            onToggleOpen={() => setStationSelectorOpen((p) => !p)}
            onSelectBook={handleSelectBook}
          />
        </div>
      )}

      {/* 6. Chapter Modal */}
      <LofiChapterModal
        isOpen={chapterModalOpen}
        chapters={currentBook.chapters}
        currentChapterIndex={currentChapterIndex}
        onSelectChapter={handleSelectChapter}
        onClose={() => setChapterModalOpen(false)}
      />
    </div>
  );
}

export default App;
