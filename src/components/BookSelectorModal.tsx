import React, { useState } from 'react';
import { X, BookOpen, Clock, User, Mic, Play } from 'lucide-react';
import { Audiobook } from '../types';

interface Props {
  isOpen: boolean;
  books: Audiobook[];
  currentBookId: string;
  onSelectBook: (book: Audiobook) => void;
  onClose: () => void;
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  return `${m} phút`;
}

export const BookSelectorModal: React.FC<Props> = ({
  isOpen,
  books,
  currentBookId,
  onSelectBook,
  onClose,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');

  if (!isOpen) return null;

  const categories = ['Tất cả', ...Array.from(new Set(books.map((b) => b.category)))];

  const filteredBooks =
    selectedCategory === 'Tất cả'
      ? books
      : books.filter((b) => b.category === selectedCategory);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-cafe-card border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-cafe-surface/50">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-cafe-accent" />
            <div>
              <h2 className="font-serif text-lg sm:text-xl font-bold text-white">
                Tủ Sách & Podcast Tuyển Chọn
              </h2>
              <p className="text-xs text-cafe-muted">
                Tuyển tập những tác phẩm kinh điển và podcast nuôi dưỡng tâm hồn
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 text-cafe-muted hover:text-white transition-all"
            title="Đóng (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-white/5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cafe-accent text-white shadow-md'
                  : 'bg-white/5 hover:bg-white/10 text-cafe-muted hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Book Grid */}
        <div className="overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBooks.map((book) => {
            const isCurrent = book.id === currentBookId;

            return (
              <div
                key={book.id}
                onClick={() => {
                  onSelectBook(book);
                  onClose();
                }}
                className={`group flex gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                  isCurrent
                    ? 'bg-cafe-accent/15 border-cafe-accent/60 shadow-lg'
                    : 'bg-white/5 hover:bg-white/10 border-white/10 hover:border-cafe-accent/40'
                }`}
              >
                {/* Book Cover */}
                <div className="relative w-24 h-32 flex-shrink-0 rounded-lg overflow-hidden shadow-md">
                  <img
                    src={book.coverArt}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {isCurrent && (
                    <div className="absolute inset-0 bg-cafe-accent/30 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-full bg-cafe-accent text-white flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-current" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-amber-300">
                      {book.category}
                    </span>
                    <h3 className="font-serif font-bold text-base text-white mt-1.5 group-hover:text-cafe-accent transition-colors truncate">
                      {book.title}
                    </h3>
                    <p className="text-xs text-cafe-muted flex items-center gap-1 mt-0.5">
                      <User className="w-3 h-3" />
                      <span>{book.author}</span>
                    </p>
                    <p className="text-xs text-cafe-muted flex items-center gap-1 mt-0.5">
                      <Mic className="w-3 h-3 text-cafe-accent" />
                      <span className="truncate">{book.narrator}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[11px] font-mono text-cafe-muted pt-2 border-t border-white/5">
                    <span>{book.chapters.length} chương</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{formatDuration(book.totalDuration)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
