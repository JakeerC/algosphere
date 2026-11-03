import React from 'react';
import { HashTableVisualState } from '../../types/visualizer';
import { ArrowRight, Hash, AlertCircle } from 'lucide-react';

interface HashTableCanvasProps {
  state: HashTableVisualState;
}

export const HashTableCanvas: React.FC<HashTableCanvasProps> = ({ state }) => {
  const { buckets, tableSize, probingIndex, lastComputedHash, currentKey, mode } = state;

  return (
    <div style={{
      width: '100%',
      minHeight: '380px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 'var(--space-4)',
      gap: 'var(--space-4)'
    }}>
      {/* Formula & Hash Computation HUD */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-3)',
        backgroundColor: 'var(--surface-subtle)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-3) var(--space-4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Hash size={16} color="var(--primary-400)" />
          <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            Modulo Hash: <strong>h(k) = k mod {tableSize}</strong>
          </span>
        </div>

        {currentKey !== undefined && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)'
          }}>
            <span style={{ color: 'var(--text-tertiary)' }}>Current Key:</span>
            <span className="badge badge-primary">{currentKey}</span>
            {lastComputedHash !== undefined && (
              <>
                <ArrowRight size={12} color="var(--text-tertiary)" />
                <span style={{ color: 'var(--text-tertiary)' }}>Primary Slot:</span>
                <span className="badge badge-neutral">[{lastComputedHash}]</span>
              </>
            )}
          </div>
        )}

        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
          Collision Mode: <strong>{mode === 'probing' ? 'Open Addressing (Linear Probing)' : 'Separate Chaining (Linked Lists)'}</strong>
        </div>
      </div>

      {/* Hash Buckets Container */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${tableSize}, minmax(0, 1fr))`,
        gap: 'var(--space-2)',
        width: '100%',
        overflowX: 'auto',
        padding: 'var(--space-2) 0'
      }}>
        {buckets.map(b => {
          const isProbed = probingIndex === b.index;
          let border = '1px solid var(--border-default)';
          let bg = 'var(--surface-card)';
          let shadow = 'none';

          if (isProbed) {
            border = '2px solid var(--state-inspect)';
            bg = 'var(--state-inspect-bg)';
            shadow = 'var(--shadow-glow-amber)';
          } else if (b.state === 'pivot') {
            border = '2px solid var(--state-pivot)';
            bg = 'var(--state-pivot-bg)';
          } else if (b.state === 'sorted') {
            border = '2px solid var(--state-sorted)';
            bg = 'var(--state-sorted-bg)';
          }

          return (
            <div
              key={b.index}
              style={{
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: bg,
                border,
                padding: 'var(--space-2)',
                minHeight: '180px',
                boxShadow: shadow,
                transition: 'all var(--transition-fast)',
                position: 'relative'
              }}
            >
              {/* Bucket Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-subtle)',
                paddingBottom: '4px',
                marginBottom: 'var(--space-2)',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                color: isProbed ? 'var(--state-inspect)' : 'var(--text-tertiary)'
              }}>
                <span>Slot [{b.index}]</span>
                {isProbed && <span style={{ fontSize: '9px', fontWeight: 'bold' }}>PROBE</span>}
              </div>

              {/* Bucket Contents */}
              {b.items.length === 0 ? (
                <div style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--text-tertiary)',
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  border: '1px dashed var(--border-subtle)',
                  borderRadius: 'var(--radius-md)'
                }}>
                  EMPTY
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-1)',
                  flex: 1
                }}>
                  {b.items.map((item, itemIdx) => (
                    <React.Fragment key={itemIdx}>
                      <div style={{
                        padding: '6px 8px',
                        backgroundColor: 'var(--surface-raised)',
                        border: '1px solid var(--primary-500)',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--weight-heavy)',
                        color: 'var(--text-primary)',
                        textAlign: 'center',
                        boxShadow: 'var(--shadow-xs)'
                      }}>
                        {item.key}
                      </div>
                      {mode === 'chaining' && itemIdx < b.items.length - 1 && (
                        <div style={{ textAlign: 'center', color: 'var(--primary-400)', fontSize: '10px' }}>
                          ↓
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                  {mode === 'chaining' && (
                    <span style={{ fontSize: '9px', color: 'var(--text-tertiary)', textAlign: 'center', fontFamily: 'var(--font-mono)' }}>
                      chain: {b.items.length}
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
