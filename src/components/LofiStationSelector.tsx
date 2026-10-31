import React, { useState, useEffect } from 'react';
import { Audiobook } from '../types';
import { LofiIcon } from './LofiIcon';

interface Props {
  books: Audiobook[];
  currentBook: Audiobook;
  isPlaying: boolean;
  isOpen: boolean;
  onToggleOpen: () => void;
  onSelectBook: (book: Audiobook) => void;
}

export const LofiStationSelector: React.FC<Props> = ({
  books,
  currentBook,
  isPlaying,
  isOpen,
  onToggleOpen,
  onSelectBook,
}) => {
  // Animated beats icon: cycles 1 -> 2 -> 3 -> 4 every 250ms when playing
  const [beatsIndex, setBeatsIndex] = useState(1);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setBeatsIndex((prev) => (prev === 4 ? 1 : prev + 1));
    }, 250);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const beatsIconName = isPlaying ? `beats${beatsIndex}` : 'beatsMute';

  return (
    <div id="stations-selector">
      {/* Fullscreen Grid Selector (exact lofi.cafe #stations-list) */}
      {isOpen && (
        <div id="stations-list" onClick={onToggleOpen}>
          <div>
            {books.map((book) => {
              const isActive = book.id === currentBook.id;

              return (
                <div
                  key={book.id}
                  className="station-wrapper pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectBook(book);
                    onToggleOpen();
                  }}
                >
                  <div
                    className={`station-thumbnail ${isActive ? 'green-box' : ''}`}
                    style={{
                      backgroundImage: `url(${book.coverArt})`,
                      border: isActive ? '2px solid white' : '1px solid rgba(255,255,255,0.2)',
                    }}
                  />
                  <span className={isActive ? 'green-glow' : ''}>
                    {book.title} - {book.author}
                  </span>
                  <span style={{ fontSize: '15px', color: 'rgba(235,235,235,0.6)', textShadow: 'none' }}>
                    {book.category} • {book.chapters.length} chương
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Persistent Bottom Station / Book Button (exact lofi.cafe #stations-button) */}
      <div
        id="stations-button"
        className="pointer"
        onClick={onToggleOpen}
        title="Bấm để đổi sách / podcast"
      >
        <LofiIcon name={beatsIconName} style={{ marginRight: '10px' }} />
        <span>
          <span className="red" style={{ display: 'inline', marginRight: '6px' }}>
            click to change &gt;
          </span>
          {currentBook.title} - {currentBook.author}
        </span>
      </div>
    </div>
  );
};
