import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  Sparkles, 
  AlertCircle, 
  Lightbulb, 
  AlertTriangle,
  Activity
} from 'lucide-react';
import { ALGORITHM_MODULES } from '../data/modules';
import { MODULE_LECTURES } from '../data/lectures';
import { Badge } from '../components/common/Badge';

export const LecturePage: React.FC = () => {
  const { moduleId } = useParams<{ moduleId: string }>();
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const module = ALGORITHM_MODULES.find(m => m.id === moduleId) || ALGORITHM_MODULES[0];
  const slides = MODULE_LECTURES[module.id] || MODULE_LECTURES['sorting'];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentSlideIndex(prev => Math.max(0, prev - 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slides.length]);

  const slide = slides[currentSlideIndex] || slides[0];

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-10)' }}>
      {/* Breadcrumb & Navigation Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-3)',
        paddingTop: 'var(--space-3)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 'var(--space-3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <button
            onClick={() => navigate(-1)}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: 'var(--radius-full)', padding: '6px 16px' }}
            title="Go back"
          >
            <ArrowLeft size={15} />
            <span>Back</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <Link to={`/visualizer/${module.id}`} style={{ color: 'var(--text-secondary)' }}>{module.title}</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary-400)', fontWeight: 'var(--weight-heavy)' }}>e-Lecture</span>
          </div>
        </div>

        <Link
          to={`/visualizer/${module.id}`}
          className="btn btn-primary btn-sm"
          style={{ borderRadius: 'var(--radius-full)', padding: '6px 18px' }}
        >
          <Activity size={15} />
          <span>Launch Interactive Visualizer</span>
        </Link>
      </div>

      {/* Main Slide Card Container */}
      <div className="card" style={{ maxWidth: '840px', margin: '0 auto', width: '100%', padding: 'var(--space-6)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)' }}>
        {/* Header with Title and Slide Progress */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: 'var(--space-3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--primary-surface)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-500)'
            }}>
              <BookOpen size={18} />
            </div>
            <div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pedagogical Slide Deck • {module.title}
              </div>
              <h2 style={{ fontSize: 'var(--text-xl)', margin: 0 }}>
                {slide.title}
              </h2>
            </div>
          </div>

          <Badge variant="primary">
            Slide {currentSlideIndex + 1} of {slides.length}
          </Badge>
        </div>

        {/* Slide Content Body */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)', marginBottom: 'var(--space-6)' }}>
          {slide.subtitle && (
            <h3 style={{ fontSize: 'var(--text-lg)', color: 'var(--primary-400)', fontWeight: 'var(--weight-heavy)', margin: 0 }}>
              {slide.subtitle}
            </h3>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            {slide.content.map((p, i) => (
              <p key={i} style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0 }}>
                {p}
              </p>
            ))}
          </div>

          {/* Callout Alert */}
          {slide.callout && (
            <div style={{
              display: 'flex',
              gap: 'var(--space-3)',
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              backgroundColor: slide.callout.type === 'tip' ? 'var(--state-sorted-bg)' :
                               slide.callout.type === 'warning' ? 'var(--state-pivot-bg)' : 'var(--state-inspect-bg)',
              border: `1px solid ${slide.callout.type === 'tip' ? 'var(--state-sorted-border)' :
                                    slide.callout.type === 'warning' ? 'var(--state-pivot-border)' : 'var(--state-inspect-border)'}`
            }}>
              <div style={{ flexShrink: 0, marginTop: '2px' }}>
                {slide.callout.type === 'tip' && <Lightbulb size={20} color="var(--state-sorted)" />}
                {slide.callout.type === 'warning' && <AlertTriangle size={20} color="var(--state-pivot)" />}
                {slide.callout.type === 'important' && <AlertCircle size={20} color="var(--state-inspect)" />}
              </div>
              <div style={{ fontSize: 'var(--text-sm)', lineHeight: '1.6', color: 'var(--text-primary)' }}>
                {slide.callout.text}
              </div>
            </div>
          )}

          {/* Invariants */}
          {slide.keyInvariants && slide.keyInvariants.length > 0 && (
            <div>
              <div style={{
                fontSize: '11px',
                fontWeight: 'var(--weight-heavy)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--text-tertiary)',
                marginBottom: 'var(--space-2)'
              }}>
                Key Algorithmic Invariants:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                {slide.keyInvariants.map((inv, idx) => (
                  <span key={idx} className="badge badge-neutral" style={{ padding: '4px 12px', borderRadius: 'var(--radius-full)', fontSize: '11px' }}>
                    ✓ {inv}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Code snippet */}
          {slide.codeSnippet && (
            <div className="code-panel" style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
              <div className="code-header">
                <span>Algorithmic Reference Implementation</span>
              </div>
              <pre style={{ padding: 'var(--space-3) var(--space-4)', margin: 0, color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>
                <code>{slide.codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        {/* Footer Navigation Controls */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 'var(--space-4)'
        }}>
          <button
            onClick={() => setCurrentSlideIndex(prev => Math.max(0, prev - 1))}
            disabled={currentSlideIndex === 0}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: 'var(--radius-full)', padding: '6px 16px' }}
          >
            <ChevronLeft size={16} />
            <span>Previous Slide</span>
          </button>

          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            Use ← and → arrow keys to navigate
          </span>

          {currentSlideIndex < slides.length - 1 ? (
            <button
              onClick={() => setCurrentSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: 'var(--radius-full)', padding: '6px 16px' }}
            >
              <span>Next Slide</span>
              <ChevronRight size={16} />
            </button>
          ) : (
            <Link
              to={`/visualizer/${module.id}`}
              className="btn btn-primary btn-sm"
              style={{ borderRadius: 'var(--radius-full)', padding: '6px 18px' }}
            >
              <Sparkles size={14} />
              <span>Launch Visualizer</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
