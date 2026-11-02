import React from 'react';
import { DpVisualState } from '../../types/visualizer';

interface DpCanvasProps {
  state: DpVisualState;
}

export const DpCanvas: React.FC<DpCanvasProps> = ({ state }) => {
  const getCellBg = (cellState: string, isCurrent: boolean) => {
    if (isCurrent) return 'var(--primary-surface)';
    switch (cellState) {
      case 'inspect':
        return 'var(--state-inspect-bg)';
      case 'active':
        return 'var(--state-swap-bg)';
      case 'pivot':
        return 'var(--state-pivot-bg)';
      case 'sorted':
        return 'hsla(158, 64%, 48%, 0.1)';
      default:
        return 'transparent';
    }
  };

  const getCellBorder = (cellState: string, isCurrent: boolean) => {
    if (isCurrent) return '2px solid var(--primary-500)';
    switch (cellState) {
      case 'inspect':
        return '2px solid var(--state-inspect)';
      case 'active':
        return '2px solid var(--state-swap)';
      case 'pivot':
        return '2px solid var(--state-pivot)';
      default:
        return '1px solid var(--border-subtle)';
    }
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
      overflowX: 'auto'
    }}>
      <div style={{
        display: 'inline-block',
        backgroundColor: 'var(--surface-card)',
        border: 'var(--border-1) solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-4)',
        boxShadow: 'var(--shadow-sm)'
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
                        width: '44px',
                        height: '40px',
                        textAlign: 'center',
                        verticalAlign: 'middle',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor: getCellBg(cell.state, isCurrent),
                        border: getCellBorder(cell.state, isCurrent),
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: isCurrent ? 'var(--weight-heavy)' : 'var(--weight-normal)',
                        color: isCurrent ? 'var(--primary-400)' : 'var(--text-primary)',
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
      </div>
    </div>
  );
};
