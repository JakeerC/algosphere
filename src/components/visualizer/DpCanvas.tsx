import React from 'react';
import { DpVisualState } from '../../types/visualizer';

interface DpCanvasProps {
  state: DpVisualState;
}

export const DpCanvas: React.FC<DpCanvasProps> = ({ state }) => {
  // Find max value in table for heatmap normalization
  let maxTableVal = 1;
  state.table.forEach(row => {
    row.forEach(cell => {
      if (cell.value > maxTableVal) maxTableVal = cell.value;
    });
  });

  const getCellBg = (cellValue: number, cellState: string, isCurrent: boolean) => {
    if (isCurrent) return 'var(--primary-surface)';
    if (cellState === 'inspect') return 'var(--state-inspect-bg)';
    if (cellState === 'active') return 'var(--state-swap-bg)';
    if (cellState === 'pivot') return 'var(--state-pivot-bg)';

    if (cellValue === 0) return 'transparent';

    // Vibrant Heatmap scale: Hue shifts from 210° (blue) to 280° (purple) to 340° (rose)
    const ratio = cellValue / maxTableVal;
    const hue = Math.round(200 + ratio * 130);
    const lightness = 50;
    return `hsla(${hue}, 85%, ${lightness}%, 0.22)`;
  };

  const getCellBorder = (cellValue: number, cellState: string, isCurrent: boolean) => {
    if (isCurrent) return '2px solid var(--primary-500)';
    if (cellState === 'inspect') return '2px solid var(--state-inspect)';
    if (cellState === 'active') return '2px solid var(--state-swap)';
    if (cellState === 'pivot') return '2px solid var(--state-pivot)';
    if (cellState === 'sorted') return '2px solid var(--state-sorted)';

    if (cellValue > 0) {
      const ratio = cellValue / maxTableVal;
      const hue = Math.round(200 + ratio * 130);
      return `1px solid hsla(${hue}, 85%, 55%, 0.5)`;
    }

    return '1px solid var(--border-subtle)';
  };

  return (
    <div style={{
      width: '100%',
      height: '380px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-4)',
      overflowX: 'auto',
      position: 'relative'
    }}>
      <div style={{
        display: 'inline-block',
        backgroundColor: 'var(--surface-card)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-4)',
        boxShadow: 'var(--shadow-md)'
      }}>
        <table style={{ borderCollapse: 'separate', borderSpacing: '4px' }}>
          <thead>
            <tr>
              <th style={{
                padding: 'var(--space-2) var(--space-3)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
                fontFamily: 'var(--font-mono)'
              }}>
                Item \ Cap
              </th>
              {state.colLabels.map((col, idx) => (
                <th
                  key={idx}
                  style={{
                    padding: 'var(--space-2) var(--space-3)',
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-mono)',
                    color: state.currentCol === idx ? 'var(--primary-500)' : 'var(--text-secondary)',
                    fontWeight: state.currentCol === idx ? 'var(--weight-heavy)' : 'var(--weight-normal)'
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {state.table.map((row, rIdx) => (
              <tr key={rIdx}>
                <td style={{
                  padding: 'var(--space-2) var(--space-3)',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: state.currentRow === rIdx ? 'var(--primary-500)' : 'var(--text-secondary)',
                  fontWeight: state.currentRow === rIdx ? 'var(--weight-heavy)' : 'var(--weight-normal)',
                  whiteSpace: 'nowrap'
                }}>
                  {state.rowLabels[rIdx]}
                </td>
                {row.map((cell, cIdx) => {
                  const isCurrent = state.currentRow === rIdx && state.currentCol === cIdx;
                  return (
                    <td
                      key={cIdx}
                      style={{
                        width: '46px',
                        height: '42px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: getCellBg(cell.value, cell.state, isCurrent),
                        border: getCellBorder(cell.value, cell.state, isCurrent),
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: isCurrent || cell.value > 0 ? 'var(--weight-heavy)' : 'var(--weight-normal)',
                        color: isCurrent ? 'var(--primary-400)' : cell.value > 0 ? 'var(--text-primary)' : 'var(--text-tertiary)',
                        transition: 'all var(--transition-fast)'
                      }}
                    >
                      {cell.value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Heatmap Spectrum Legend at bottom */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'var(--space-3)',
          paddingTop: 'var(--space-2)',
          borderTop: 'var(--border-1) solid var(--border-subtle)',
          fontSize: '11px',
          color: 'var(--text-tertiary)'
        }}>
          <span>Heatmap Value: Low (0)</span>
          <div style={{
            width: '120px',
            height: '6px',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(to right, hsl(200, 85%, 50%), hsl(270, 85%, 55%), hsl(340, 90%, 60%))'
          }} />
          <span>Optimal Peak ({maxTableVal})</span>
        </div>
      </div>
    </div>
  );
};
