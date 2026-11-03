import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles, ArrowRight, X, Flame } from 'lucide-react';
import { ALGORITHM_MODULES } from '../../data/modules';
import { ALL_BLIND75_PROBLEMS } from '../../data/blind75';
import { AlgorithmModule } from '../../types/algorithm';
import { Blind75Problem } from '../../types/blind75';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule?: (module: AlgorithmModule) => void;
  onNavigateTab?: (tab: string) => void;
}

type PaletteItem = 
  | { type: 'module'; data: AlgorithmModule }
  | { type: 'blind75'; data: Blind75Problem };

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectModule,
  onNavigateTab
}) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      const timer = setTimeout(() => inputRef.current?.focus(), 40);
      setQuery('');
      setSelectedIndex(0);
      document.body.style.overflow = 'hidden';
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  // Keyboard shortcut listener for Escape to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Filter modules
  const matchingModules: PaletteItem[] = ALGORITHM_MODULES.filter(m => {
    if (!q) return true;
    return (
      m.title.toLowerCase().includes(q) ||
      m.shortDescription.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      m.variants.some(v => v.toLowerCase().includes(q)) ||
      m.tags.some(t => t.toLowerCase().includes(q)) ||
      (m.courseCode && m.courseCode.toLowerCase().includes(q))
    );
  }).map(m => ({ type: 'module', data: m }));

  // Filter Blind 75 questions
  const matchingBlind75: PaletteItem[] = ALL_BLIND75_PROBLEMS.filter(p => {
    if (!q) return false; // Show modules by default on empty, or search both on query
    return (
      p.title.toLowerCase().includes(q) ||
      String(p.number) === q ||
      `#${p.number}` === q ||
      p.pattern.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  }).map(p => ({ type: 'blind75', data: p }));

  const combinedResults: PaletteItem[] = [...matchingBlind75, ...matchingModules];

  const handleLaunchItem = (item: PaletteItem) => {
    if (item.type === 'module') {
      if (onSelectModule) onSelectModule(item.data);
      if (onNavigateTab) onNavigateTab('visualizer');
      navigate(`/visualizer/${item.data.id}`);
    } else {
      navigate(`/blind75/${item.data.id}`);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, combinedResults.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + combinedResults.length) % Math.max(1, combinedResults.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (combinedResults[selectedIndex]) {
        handleLaunchItem(combinedResults[selectedIndex]);
      }
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999,
      backgroundColor: 'hsla(222, 47%, 4%, 0.75)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'center',
      paddingTop: '12vh',
      paddingLeft: 'var(--space-4)',
      paddingRight: 'var(--space-4)'
    }} onClick={onClose}>
      <div
        className="card"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        style={{
          width: '100%',
          maxWidth: '640px',
          backgroundColor: 'var(--surface-raised)',
          border: 'var(--border-1) solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-xl)',
          animation: 'fadeSlideDown 150ms ease-out'
        }}
      >
        {/* Search Input Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          padding: 'var(--space-4)',
          borderBottom: 'var(--border-1) solid var(--border-subtle)',
          backgroundColor: 'var(--surface-subtle)'
        }}>
          <Search size={18} color="var(--text-tertiary)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            placeholder="Type an algorithm name, Blind 75 question, or # (e.g. Two Sum, #1, BST, AVL)..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: 0,
              fontSize: 'var(--text-base)',
              color: 'var(--text-primary)'
            }}
          />
          <button onClick={onClose} className="btn-icon" style={{ width: '28px', height: '28px' }}>
            <X size={16} />
          </button>
        </div>

        {/* Results List */}
        <div style={{
          maxHeight: '380px',
          overflowY: 'auto',
          padding: 'var(--space-2)'
        }}>
          {combinedResults.length === 0 ? (
            <div style={{
              padding: 'var(--space-8)',
              textAlign: 'center',
              color: 'var(--text-tertiary)',
              fontSize: 'var(--text-sm)'
            }}>
              No matching algorithms or Blind 75 questions found for "{query}".
            </div>
          ) : (
            combinedResults.map((item, idx) => {
              const isSelected = idx === selectedIndex;

              if (item.type === 'blind75') {
                const prob = item.data;
                return (
                  <div
                    key={`b75-${prob.id}`}
                    onClick={() => handleLaunchItem(item)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--space-3) var(--space-4)',
                      borderRadius: 'var(--radius-lg)',
                      cursor: 'pointer',
                      backgroundColor: isSelected ? 'var(--surface-hover)' : 'transparent',
                      borderLeft: isSelected ? '3px solid var(--danger-500)' : '3px solid transparent',
                      transition: 'background-color var(--transition-fast)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--danger-surface)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--danger-500)'
                      }}>
                        <Flame size={16} />
                      </div>
                      <div>
                        <div style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--weight-heavy)',
                          color: 'var(--text-primary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--space-2)'
                        }}>
                          <span>#{prob.number} {prob.title}</span>
                          <span style={{
                            fontSize: '10px',
                            fontWeight: 700,
                            padding: '1px 6px',
                            borderRadius: 'var(--radius-full)',
                            backgroundColor: 'var(--danger-surface)',
                            color: 'var(--danger-500)',
                            fontFamily: 'var(--font-mono)'
                          }}>
                            Blind 75
                          </span>
                        </div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                          {prob.category} • {prob.pattern} • Week {prob.grindWeek}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <span className="badge badge-primary" style={{ fontSize: '11px' }}>
                        {prob.difficulty}
                      </span>
                      <ArrowRight size={14} color="var(--text-tertiary)" />
                    </div>
                  </div>
                );
              }

              // Module
              const module = item.data;
              return (
                <div
                  key={`mod-${module.id}`}
                  onClick={() => handleLaunchItem(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-3) var(--space-4)',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    backgroundColor: isSelected ? 'var(--surface-hover)' : 'transparent',
                    borderLeft: isSelected ? '3px solid var(--primary-500)' : '3px solid transparent',
                    transition: 'background-color var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: isSelected ? 'var(--primary-surface)' : 'var(--surface-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isSelected ? 'var(--primary-500)' : 'var(--text-tertiary)'
                    }}>
                      <Sparkles size={16} />
                    </div>
                    <div>
                      <div style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--weight-heavy)',
                        color: 'var(--text-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)'
                      }}>
                        <span>{module.title}</span>
                        {module.courseCode && (
                          <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
                            {module.courseCode}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: '2px' }}>
                        {module.variants.join(' • ')}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                    <span className="badge badge-primary" style={{ fontSize: '11px' }}>
                      {module.complexity.timeAvg}
                    </span>
                    <ArrowRight size={14} color="var(--text-tertiary)" />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick Footer inside Palette */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-2) var(--space-4)',
          backgroundColor: 'var(--surface-subtle)',
          borderTop: 'var(--border-1) solid var(--border-subtle)',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-tertiary)'
        }}>
          <div>Use <kbd>↑</kbd> <kbd>↓</kbd> to navigate, <kbd>Enter</kbd> to launch</div>
          <div><kbd>Esc</kbd> to exit</div>
        </div>
      </div>
    </div>
  );
};
