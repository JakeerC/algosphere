import React, { useState } from 'react';
import { ArrayBar } from '../../types/visualizer';
import { Sparkles, Palette } from 'lucide-react';

interface SortingCanvasProps {
  bars: ArrayBar[];
  maxValue?: number;
}

export const SortingCanvas: React.FC<SortingCanvasProps> = ({
  bars,
  maxValue = 100
}) => {
  const [colorMode, setColorMode] = useState<'rainbow' | 'semantic' | 'neon'>('rainbow');
  const effectiveMax = Math.max(...bars.map(b => b.value), maxValue);

  const getBarColor = (bar: ArrayBar) => {
    // If state is not default, semantic color takes priority
    if (bar.state === 'inspect') return 'var(--state-inspect)';
    if (bar.state === 'swap') return 'var(--state-swap)';
    if (bar.state === 'pivot') return 'var(--state-pivot)';
    if (bar.state === 'sorted') return 'var(--state-sorted)';

    // In default state, apply chosen color mode
    if (colorMode === 'rainbow') {
      // Continuous spectrum from hue 200° (cyan/blue) through 280° (purple) to 340° (rose)
      const ratio = bar.value / effectiveMax;
      const hue = Math.round(195 + ratio * 145);
      return `hsl(${hue}, 88%, 56%)`;
    }

    if (colorMode === 'neon') {
      const ratio = bar.value / effectiveMax;
      const hue = Math.round(140 + ratio * 180); // Emerald to Violet neon
      return `hsl(${hue}, 95%, 52%)`;
    }

    return 'var(--primary-500)';
  };

  return (
    <div style={{
      width: '100%',
      height: '380px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      padding: 'var(--space-3) var(--space-4) var(--space-3) var(--space-4)'
    }}>
      {/* Top Bar: Color Mode Selector */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-2)',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Palette size={14} color="var(--text-tertiary)" />
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Color Spectrum:
          </span>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => setColorMode('rainbow')}
              className={`btn btn-sm ${colorMode === 'rainbow' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '2px 8px', fontSize: '11px', height: '22px' }}
            >
              🌈 Rainbow Spectrum
            </button>
            <button
              onClick={() => setColorMode('neon')}
              className={`btn btn-sm ${colorMode === 'neon' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '2px 8px', fontSize: '11px', height: '22px' }}
            >
              ⚡ Neon Chroma
            </button>
            <button
              onClick={() => setColorMode('semantic')}
              className={`btn btn-sm ${colorMode === 'semantic' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '2px 8px', fontSize: '11px', height: '22px' }}
            >
              🎯 State Focused
            </button>
          </div>
        </div>

        {/* Live Legend */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', fontSize: '11px', color: 'var(--text-tertiary)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: 'var(--state-inspect)' }} />
            Inspect
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: 'var(--state-swap)' }} />
            Swap
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: 'var(--state-pivot)' }} />
            Pivot
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: 'var(--state-sorted)' }} />
            Sorted
          </span>
        </div>
      </div>

      {/* Array Bars Viewport */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: bars.length > 25 ? '2px' : 'var(--space-2)',
        position: 'relative',
        paddingBottom: '24px'
      }}>
        {/* Background horizontal gridlines */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pointerEvents: 'none',
          opacity: 0.12
        }}>
          <div style={{ borderTop: '1px dashed var(--text-tertiary)' }} />
          <div style={{ borderTop: '1px dashed var(--text-tertiary)' }} />
          <div style={{ borderTop: '1px dashed var(--text-tertiary)' }} />
        </div>

        {bars.map((bar, idx) => {
          const heightPercent = Math.max(10, (bar.value / effectiveMax) * 85);
          const color = getBarColor(bar);
          const isSpecial = bar.state !== 'default';

          return (
            <div
              key={bar.id}
              style={{
                flex: 1,
                maxWidth: '48px',
                minWidth: '10px',
                height: `${heightPercent}%`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                position: 'relative',
                transition: 'height var(--transition-normal)'
              }}
            >
              {/* Numerical value above the bar */}
              {bars.length <= 22 && (
                <span style={{
                  position: 'absolute',
                  top: '-22px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: isSpecial ? 'var(--weight-heavy)' : 'var(--weight-normal)',
                  color: isSpecial ? color : 'var(--text-secondary)'
                }}>
                  {bar.value}
                </span>
              )}

              {/* The Bar Element */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: color,
                  borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0',
                  boxShadow: isSpecial ? `0 0 16px ${color}` : `0 2px 4px hsla(0, 0%, 0%, 0.15)`,
                  opacity: 0.95,
                  transition: 'all var(--transition-fast)'
                }}
              />

              {/* Array index label below bar */}
              {bars.length <= 22 && (
                <span style={{
                  position: 'absolute',
                  bottom: '-22px',
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-tertiary)'
                }}>
                  {idx}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
