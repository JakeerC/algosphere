import React from 'react';
import { HeapVisualState } from '../../types/visualizer';
import { TreeCanvas } from './TreeCanvas';

interface HeapCanvasProps {
  state: HeapVisualState;
}

export const HeapCanvas: React.FC<HeapCanvasProps> = ({ state }) => {
  const { array, tree, heapSize } = state;

  return (
    <div style={{
      width: '100%',
      minHeight: '380px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      padding: 'var(--space-2)'
    }}>
      {/* Top Tree Representation */}
      <div style={{ flex: 1, minHeight: '230px', position: 'relative' }}>
        <TreeCanvas tree={tree} />
      </div>

      {/* Dual Memory Representation: Array Buffer */}
      <div style={{
        backgroundColor: 'var(--surface-subtle)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-3) var(--space-4)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        marginTop: 'var(--space-2)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-tertiary)'
        }}>
          <span>Contiguous 1D Array Mapping (Active Heap Size: {heapSize})</span>
          <span>Left: <code>2i+1</code> | Right: <code>2i+2</code> | Parent: <code>⌊(i-1)/2⌋</code></span>
        </div>

        <div style={{
          display: 'flex',
          gap: 'var(--space-2)',
          overflowX: 'auto',
          paddingBottom: '4px'
        }}>
          {array.map((bar, idx) => {
            const inActiveHeap = idx < heapSize;
            let bgColor = 'var(--surface-card)';
            let borderColor = 'var(--border-default)';
            let textColor = inActiveHeap ? 'var(--text-primary)' : 'var(--text-tertiary)';

            if (bar.state === 'inspect') {
              bgColor = 'var(--state-inspect-bg)';
              borderColor = 'var(--state-inspect)';
            } else if (bar.state === 'swap') {
              bgColor = 'var(--state-swap-bg)';
              borderColor = 'var(--state-swap)';
            } else if (bar.state === 'pivot') {
              bgColor = 'var(--state-pivot-bg)';
              borderColor = 'var(--state-pivot)';
            } else if (bar.state === 'sorted') {
              bgColor = 'var(--state-sorted-bg)';
              borderColor = 'var(--state-sorted)';
            }

            return (
              <div
                key={bar.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '42px',
                  opacity: inActiveHeap ? 1 : 0.45
                }}
              >
                <div style={{
                  width: '100%',
                  padding: '6px 8px',
                  backgroundColor: bgColor,
                  border: `2px solid ${borderColor}`,
                  borderRadius: 'var(--radius-md)',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--weight-heavy)',
                  color: textColor,
                  transition: 'all var(--transition-fast)',
                  boxShadow: bar.state !== 'default' ? 'var(--shadow-sm)' : 'none'
                }}>
                  {bar.value}
                </div>
                <span style={{
                  fontSize: '10px',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-tertiary)',
                  marginTop: '4px'
                }}>
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
