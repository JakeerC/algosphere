import React from 'react';
import { UnionFindVisualState } from '../../types/visualizer';
import { Share2, ArrowRight } from 'lucide-react';

interface UnionFindCanvasProps {
  state: UnionFindVisualState;
}

export const UnionFindCanvas: React.FC<UnionFindCanvasProps> = ({ state }) => {
  const { elements, numSets, activeElements } = state;

  return (
    <div style={{
      width: '100%',
      minHeight: '380px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: 'var(--space-4)',
      gap: 'var(--space-4)'
    }}>
      {/* Top Disjoint Sets HUD */}
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
          <Share2 size={16} color="var(--primary-400)" />
          <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
            Disjoint Set Forest
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <span className="badge badge-primary">
            Active Sets: {numSets}
          </span>
          <span className="badge badge-neutral">
            Amortized: O(α(N))
          </span>
        </div>
      </div>

      {/* Forest Nodes Graph Visualization */}
      <div style={{
        flex: 1,
        minHeight: '160px',
        backgroundColor: 'var(--surface-canvas)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: 'var(--space-4)'
      }}>
        {elements.map(e => {
          const isRoot = e.parent === e.id;
          const isActive = activeElements?.includes(e.id);
          let borderColor = isRoot ? 'var(--primary-500)' : 'var(--border-strong)';
          let bgColor = 'var(--surface-card)';

          if (e.state === 'inspect') {
            borderColor = 'var(--state-inspect)';
            bgColor = 'var(--state-inspect-bg)';
          } else if (e.state === 'swap') {
            borderColor = 'var(--state-swap)';
            bgColor = 'var(--state-swap-bg)';
          } else if (e.state === 'sorted') {
            borderColor = 'var(--state-sorted)';
            bgColor = 'var(--state-sorted-bg)';
          } else if (e.state === 'pivot') {
            borderColor = 'var(--state-pivot)';
            bgColor = 'var(--state-pivot-bg)';
          }

          return (
            <div
              key={e.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: bgColor,
                border: `2px solid ${borderColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--weight-heavy)',
                color: 'var(--text-primary)',
                boxShadow: isActive ? 'var(--shadow-glow-primary)' : 'var(--shadow-xs)',
                transition: 'all var(--transition-fast)'
              }}>
                {e.id}
              </div>

              <div style={{
                fontSize: '10px',
                fontFamily: 'var(--font-mono)',
                color: isRoot ? 'var(--primary-400)' : 'var(--text-tertiary)',
                fontWeight: isRoot ? 'bold' : 'normal',
                textAlign: 'center'
              }}>
                {isRoot ? 'ROOT' : `↑ ${e.parent}`}
              </div>
            </div>
          );
        })}
      </div>

      {/* Parent and Rank Array Data Inspector */}
      <div style={{
        backgroundColor: 'var(--surface-subtle)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-3) var(--space-4)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)'
      }}>
        <div style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-tertiary)' }}>
          Disjoint-Set Array Structure (Index, Parent Pointer, Upper Bound Rank)
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${elements.length}, minmax(0, 1fr))`,
          gap: 'var(--space-1)',
          overflowX: 'auto'
        }}>
          {elements.map(e => {
            const isRoot = e.parent === e.id;
            return (
              <div
                key={e.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: 'var(--surface-card)',
                  border: `1px solid ${isRoot ? 'var(--primary-500)' : 'var(--border-subtle)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '6px 4px',
                  fontFamily: 'var(--font-mono)'
                }}
              >
                <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>[{e.id}]</span>
                <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold', color: 'var(--text-primary)' }}>
                  p: {e.parent}
                </span>
                <span style={{ fontSize: '10px', color: 'var(--text-secondary)' }}>
                  rk: {e.rank}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
