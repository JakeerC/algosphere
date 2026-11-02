import React, { useState, useEffect, useRef } from 'react';
import { Search, Sparkles, ArrowRight, X } from 'lucide-react';
import { ALGORITHM_MODULES } from '../../data/modules';
import { AlgorithmModule } from '../../types/algorithm';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModule: (module: AlgorithmModule) => void;
  onNavigateTab: (tab: 'home' | 'visualizer' | 'compare' | 'quiz' | 'tracks') => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectModule,
  onNavigateTab
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by parent
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredModules = ALGORITHM_MODULES.filter(m => {
    const q = query.toLowerCase().trim();
    if (!q) return true;
    return (
      m.title.toLowerCase().includes(q) ||
      m.shortDescription.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      m.variants.some(v => v.toLowerCase().includes(q)) ||
      m.tags.some(t => t.toLowerCase().includes(q)) ||
      (m.courseCode && m.courseCode.toLowerCase().includes(q))
    );
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, filteredModules.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredModules.length) % Math.max(1, filteredModules.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredModules[selectedIndex]) {
        onSelectModule(filteredModules[selectedIndex]);
        onNavigateTab('visualizer');
        onClose();
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
        style={{
          width: '100%',
          maxWidth: '620px',
          backgroundColor: 'var(--surface-raised)',
          border: 'var(--border-1) solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
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
            placeholder="Type an algorithm name, tag, or course (e.g. Bubble, AVL, CS2040)..."
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
          maxHeight: '360px',
          overflowY: 'auto',
          padding: 'var(--space-2)'
        }}>
          {filteredModules.length === 0 ? (
            <div style={{
              padding: 'var(--space-8)',
              textAlign: 'center',
              color: 'var(--text-tertiary)',
              fontSize: 'var(--text-sm)'
            }}>
              No matching algorithms found for "{query}".
            </div>
          ) : (
            filteredModules.map((module, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={module.id}
                  onClick={() => {
                    onSelectModule(module);
                    onNavigateTab('visualizer');
                    onClose();
                  }}
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
