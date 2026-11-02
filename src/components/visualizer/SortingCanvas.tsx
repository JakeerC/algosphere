import React from 'react';
import { ArrayBar } from '../../types/visualizer';

interface SortingCanvasProps {
  bars: ArrayBar[];
  maxValue?: number;
}

export const SortingCanvas: React.FC<SortingCanvasProps> = ({
  bars,
  maxValue = 100
}) => {
  const getBarColor = (state: ArrayBar['state']) => {
    switch (state) {
      case 'inspect':
        return 'var(--state-inspect)';
      case 'swap':
        return 'var(--state-swap)';
      case 'pivot':
        return 'var(--state-pivot)';
      case 'sorted':
        return 'var(--state-sorted)';
      default:
        return 'var(--primary-500)';
    }
  };

  const effectiveMax = Math.max(...bars.map(b => b.value), maxValue);

  return (
    <div style={{
      width: '100%',
      height: '380px',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      gap: bars.length > 25 ? '2px' : 'var(--space-2)',
      padding: 'var(--space-6) var(--space-4) var(--space-8) var(--space-4)',
      position: 'relative'
    }}>
      {/* Background horizontal gridlines for readability */}
      <div style={{
        position: 'absolute',
        inset: 'var(--space-4)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        pointerEvents: 'none',
        opacity: 0.15
      }}>
        <div style={{ borderTop: '1px dashed var(--text-tertiary)' }} />
        <div style={{ borderTop: '1px dashed var(--text-tertiary)' }} />
        <div style={{ borderTop: '1px dashed var(--text-tertiary)' }} />
        <div style={{ borderTop: '1px dashed var(--text-tertiary)' }} />
      </div>

      {bars.map((bar, idx) => {
        const heightPercent = Math.max(8, (bar.value / effectiveMax) * 85);
        const color = getBarColor(bar.state);

        return (
          <div
            key={bar.id}
            style={{
              flex: 1,
              maxWidth: '48px',
              minWidth: '12px',
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
            {bars.length <= 20 && (
              <span style={{
                position: 'absolute',
                top: '-24px',
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)',
                fontWeight: bar.state !== 'default' ? 'var(--weight-heavy)' : 'var(--weight-normal)',
                color: bar.state !== 'default' ? color : 'var(--text-secondary)'
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
                boxShadow: bar.state !== 'default' ? `0 0 12px ${color}` : 'none',
                opacity: bar.state === 'default' ? 0.85 : 1.0,
                transition: 'all var(--transition-fast)'
              }}
            />

            {/* Array index label below bar */}
            {bars.length <= 20 && (
              <span style={{
                position: 'absolute',
                bottom: '-24px',
                fontSize: '11px',
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
  );
};
