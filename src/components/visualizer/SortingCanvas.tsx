import React, { useState } from 'react';
import { ArrayBar } from '../../types/visualizer';
import { Palette } from 'lucide-react';

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
    if (bar.state === 'inspect') {
      return 'var(--state-inspect)';
    }
    if (bar.state === 'swap') {
      return 'var(--state-swap)';
    }
    if (bar.state === 'pivot') {
      return 'var(--state-pivot)';
    }
    if (bar.state === 'sorted') {
      return 'var(--state-sorted)';
    }

    // In default state, apply chosen color mode (solid colors, no gradients)
    if (colorMode === 'rainbow') {
      // Continuous spectrum from hue 195° through 275° to 335°
      const ratio = bar.value / effectiveMax;
      const hue = Math.round(195 + ratio * 140);
      return `hsl(${hue}, 80%, 56%)`;
    }

    if (colorMode === 'neon') {
      const ratio = bar.value / effectiveMax;
      const hue = Math.round(145 + ratio * 175);
      return `hsl(${hue}, 92%, 52%)`;
    }

    return 'var(--primary-500)';
  };

  const getBarGlow = (bar: ArrayBar) => {
    if (bar.state === 'inspect') return '0 6px 18px hsla(38, 92%, 50%, 0.4)';
    if (bar.state === 'swap') return '0 6px 20px hsla(271, 91%, 65%, 0.45)';
    if (bar.state === 'pivot') return '0 6px 20px hsla(346, 87%, 57%, 0.45)';
    if (bar.state === 'sorted') return '0 6px 16px hsla(160, 84%, 39%, 0.35)';
    return '0 2px 6px hsla(0, 0%, 0%, 0.12)';
  };

  return (
    <div style={{
      width: '100%',
      height: '380px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      padding: 'var(--space-3) var(--space-4)'
    }}>
      {/* Top Bar: Color Mode Selector & Live Legend */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-2)',
        marginBottom: 'var(--space-2)',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Palette size={13} color="var(--text-tertiary)" />
          <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Palette:
          </span>
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--surface-card)',
            padding: '2px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)'
          }}>
            <button
              onClick={() => setColorMode('rainbow')}
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '3px 10px',
                fontSize: '11px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: colorMode === 'rainbow' ? 'var(--primary-500)' : 'transparent',
                color: colorMode === 'rainbow' ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: colorMode === 'rainbow' ? 'var(--weight-heavy)' : 'var(--weight-normal)',
                transition: 'all var(--transition-fast)'
              }}
            >
              🌈 Rainbow
            </button>
            <button
              onClick={() => setColorMode('neon')}
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '3px 10px',
                fontSize: '11px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: colorMode === 'neon' ? 'var(--primary-500)' : 'transparent',
                color: colorMode === 'neon' ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: colorMode === 'neon' ? 'var(--weight-heavy)' : 'var(--weight-normal)',
                transition: 'all var(--transition-fast)'
              }}
            >
              ⚡ Neon
            </button>
            <button
              onClick={() => setColorMode('semantic')}
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '3px 10px',
                fontSize: '11px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: colorMode === 'semantic' ? 'var(--primary-500)' : 'transparent',
                color: colorMode === 'semantic' ? '#ffffff' : 'var(--text-secondary)',
                fontWeight: colorMode === 'semantic' ? 'var(--weight-heavy)' : 'var(--weight-normal)',
                transition: 'all var(--transition-fast)'
              }}
            >
              🎯 State
            </button>
          </div>
        </div>

        {/* Live State Legend */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-3)',
          fontSize: '11px',
          color: 'var(--text-tertiary)',
          backgroundColor: 'var(--surface-subtle)',
          padding: '3px 10px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)'
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--state-inspect)' }} />
            Inspect
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--state-swap)' }} />
            Swap
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--state-pivot)' }} />
            Pivot
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--state-sorted)' }} />
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
        gap: bars.length > 25 ? '3px' : 'var(--space-2)',
        position: 'relative',
        paddingBottom: '26px'
      }}>
        {/* Ambient Gridlines */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          pointerEvents: 'none',
          opacity: 0.1
        }}>
          <div style={{ borderTop: '1px dashed var(--text-tertiary)' }} />
          <div style={{ borderTop: '1px dashed var(--text-tertiary)' }} />
          <div style={{ borderTop: '1px dashed var(--text-tertiary)' }} />
        </div>

        {bars.map((bar, idx) => {
          const heightPercent = Math.max(12, (bar.value / effectiveMax) * 85);
          const color = getBarColor(bar);
          const glow = getBarGlow(bar);
          const isSpecial = bar.state !== 'default';

          return (
            <div
              key={bar.id}
              style={{
                flex: 1,
                maxWidth: '44px',
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
                  top: '-24px',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: isSpecial ? 'var(--weight-heavy)' : 'var(--weight-normal)',
                  color: isSpecial ? 'var(--text-primary)' : 'var(--text-secondary)',
                  backgroundColor: isSpecial ? 'var(--surface-card)' : 'transparent',
                  padding: isSpecial ? '1px 5px' : '0',
                  borderRadius: 'var(--radius-full)',
                  boxShadow: isSpecial ? 'var(--shadow-sm)' : 'none',
                  border: isSpecial ? '1px solid var(--border-default)' : 'none'
                }}>
                  {bar.value}
                </span>
              )}

              {/* The Soft Capsule Bar Element */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: color,
                  borderRadius: '12px 12px 4px 4px',
                  boxShadow: glow,
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
