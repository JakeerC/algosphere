import React, { useState, useEffect } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  AlertCircle, 
  Lightbulb, 
  AlertTriangle 
} from 'lucide-react';
import { LectureSlide } from '../../types/algorithm';

interface LectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  slides: LectureSlide[];
  moduleTitle: string;
  onLaunchSimulation?: () => void;
}

export const LectureModal: React.FC<LectureModalProps> = ({
  isOpen,
  onClose,
  slides,
  moduleTitle,
  onLaunchSimulation
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentSlideIndex(0);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlideIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, slides.length, onClose]);

  if (!isOpen || slides.length === 0) return null;

  const slide = slides[currentSlideIndex];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 990,
      backgroundColor: 'hsla(222, 47%, 4%, 0.75)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-4)'
    }} onClick={onClose}>
      <div 
        style={{
          width: '100%',
          maxWidth: '780px',
          maxHeight: '90vh',
          backgroundColor: 'var(--surface-raised)',
          border: 'var(--border-1) solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-xl)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-4) var(--space-6)',
          borderBottom: 'var(--border-1) solid var(--border-subtle)',
          backgroundColor: 'var(--surface-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-500)'
            }}>
              <BookOpen size={18} />
            </div>
            <div>
              <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                e-Lecture Deck • {moduleTitle}
              </div>
              <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)', margin: 0 }}>
                {slide.title}
              </h3>
            </div>
          </div>

          <button onClick={onClose} className="btn-icon" aria-label="Close lecture">
            <X size={18} />
          </button>
        </div>

        {/* Slide Body */}
        <div style={{
          padding: 'var(--space-6)',
          overflowY: 'auto',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-5)'
        }}>
          {slide.subtitle && (
            <h4 style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--primary-400)',
              fontWeight: 'var(--weight-heavy)',
              margin: 0
            }}>
              {slide.subtitle}
            </h4>
          )}

          {/* Bulleted Paragraphs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {slide.content.map((p, i) => (
              <p key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
                {p}
              </p>
            ))}
          </div>

          {/* Callout alert */}
          {slide.callout && (
            <div style={{
              display: 'flex',
              gap: 'var(--space-3)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: slide.callout.type === 'tip' ? 'var(--state-sorted-bg)' :
                               slide.callout.type === 'warning' ? 'var(--state-pivot-bg)' : 'var(--state-inspect-bg)',
              border: `1px solid ${slide.callout.type === 'tip' ? 'var(--state-sorted-border)' :
                                    slide.callout.type === 'warning' ? 'var(--state-pivot-border)' : 'var(--state-inspect-border)'}`
            }}>
              <div style={{ flexShrink: 0, marginTop: '2px' }}>
                {slide.callout.type === 'tip' && <Lightbulb size={18} color="var(--state-sorted)" />}
                {slide.callout.type === 'warning' && <AlertTriangle size={18} color="var(--state-pivot)" />}
                {slide.callout.type === 'important' && <AlertCircle size={18} color="var(--state-inspect)" />}
              </div>
              <div style={{
                fontSize: 'var(--text-sm)',
                lineHeight: '1.6',
                color: 'var(--text-primary)'
              }}>
                {slide.callout.text}
              </div>
            </div>
          )}

          {/* Key Invariants */}
          {slide.keyInvariants && slide.keyInvariants.length > 0 && (
            <div>
              <div style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--weight-heavy)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-tertiary)',
                marginBottom: 'var(--space-2)'
              }}>
                Key Algorithmic Invariants
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {slide.keyInvariants.map((inv, idx) => (
                  <span key={idx} className="badge badge-neutral" style={{ padding: '6px 10px', fontSize: 'var(--text-xs)' }}>
                    ✓ {inv}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Optional Code Snippet */}
          {slide.codeSnippet && (
            <div className="code-panel">
              <div className="code-header">
                <span>Implementation Reference</span>
              </div>
              <pre style={{ padding: 'var(--space-3) var(--space-4)', margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>
                <code>{slide.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--space-4) var(--space-6)',
          borderTop: 'var(--border-1) solid var(--border-subtle)',
          backgroundColor: 'var(--surface-subtle)'
        }}>
          {/* Progress dots / numbers */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
              Slide {currentSlideIndex + 1} of {slides.length}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <button
              onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
              disabled={currentSlideIndex === 0}
              className="btn btn-secondary btn-sm"
            >
              <ChevronLeft size={16} />
              <span>Previous</span>
            </button>

            {currentSlideIndex < slides.length - 1 ? (
              <button
                onClick={() => setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
                className="btn btn-primary btn-sm"
              >
                <span>Next Slide</span>
                <ChevronRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  if (onLaunchSimulation) onLaunchSimulation();
                }}
                className="btn btn-primary btn-sm"
              >
                <Sparkles size={14} />
                <span>Launch Interactive Visualizer</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
