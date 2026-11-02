import React from 'react';
import { LinearVisualState, LinearElement } from '../../types/visualizer';
import { ArrowRight, ArrowDown } from 'lucide-react';

interface LinearCanvasProps {
  state: LinearVisualState;
  variant?: string;
}

export const LinearCanvas: React.FC<LinearCanvasProps> = ({ state, variant = 'Singly Linked List' }) => {
  const isStack = variant.toLowerCase().includes('stack');

  if (isStack) {
    // Vertical Stack layout
    return (
      <div style={{
        width: '100%',
        height: '380px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-6)'
      }}>
        {/* The Stack Well */}
        <div style={{
          width: '180px',
          height: '280px',
          borderLeft: '3px solid var(--border-strong)',
          borderRight: '3px solid var(--border-strong)',
          borderBottom: '4px solid var(--border-strong)',
          borderRadius: '0 0 var(--radius-md) var(--radius-md)',
          backgroundColor: 'var(--surface-subtle)',
          display: 'flex',
          flexDirection: 'column-reverse',
          padding: 'var(--space-2)',
          gap: 'var(--space-2)',
          position: 'relative'
        }}>
          {state.items.length === 0 ? (
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-tertiary)',
              fontSize: 'var(--text-xs)'
            }}>
              Stack is Empty
            </div>
          ) : (
            state.items.map((item, idx) => {
              const isTop = idx === (state.topIndex ?? state.items.length - 1);
              return (
                <div
                  key={item.id}
                  style={{
                    height: '40px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isTop ? 'var(--primary-surface)' : 'var(--surface-card)',
                    border: `1px solid ${isTop ? 'var(--primary-500)' : 'var(--border-default)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 var(--space-3)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--weight-heavy)',
                    boxShadow: isTop ? 'var(--shadow-glow-primary)' : 'none',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <span style={{ color: 'var(--text-primary)' }}>{item.value}</span>
                  {isTop && (
                    <span className="badge badge-primary" style={{ fontSize: '10px' }}>
                      TOP
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Pointer indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
            <strong>LIFO Principle:</strong> Last-In, First-Out.
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            Capacity: 6 slots
          </div>
          <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            Top Index: <code>{state.topIndex ?? 0}</code>
          </div>
        </div>
      </div>
    );
  }

  // Linked list layout
  return (
    <div style={{
      width: '100%',
      height: '380px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-4)',
      overflowX: 'auto'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        {state.items.map((item, idx) => {
          const isHead = item.id === state.headId;
          const isInspect = item.state === 'inspect' || item.state === 'active';

          return (
            <React.Fragment key={item.id}>
              {/* Linked Node */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}>
                {isHead && (
                  <div style={{
                    position: 'absolute',
                    top: '-26px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                  }}>
                    <span className="badge badge-primary" style={{ fontSize: '10px' }}>HEAD</span>
                    <ArrowDown size={12} color="var(--primary-500)" />
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  border: `2px solid ${isInspect ? 'var(--state-inspect)' : 'var(--border-strong)'}`,
                  borderRadius: 'var(--radius-lg)',
                  backgroundColor: 'var(--surface-card)',
                  overflow: 'hidden',
                  boxShadow: isInspect ? 'var(--shadow-glow-primary)' : 'var(--shadow-sm)',
                  transition: 'all var(--transition-fast)'
                }}>
                  {/* Data cell */}
                  <div style={{
                    padding: 'var(--space-3) var(--space-4)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 'var(--weight-heavy)',
                    fontSize: 'var(--text-base)',
                    color: 'var(--text-primary)',
                    minWidth: '48px',
                    textAlign: 'center'
                  }}>
                    {item.value}
                  </div>
                  {/* Pointer cell */}
                  <div style={{
                    backgroundColor: 'var(--surface-subtle)',
                    borderLeft: '1px solid var(--border-default)',
                    padding: 'var(--space-3) var(--space-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-tertiary)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    •
                  </div>
                </div>

                <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                  addr: #{item.id}
                </span>
              </div>

              {/* Arrow to next node or null */}
              {idx < state.items.length - 1 ? (
                <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary-400)' }}>
                  <ArrowRight size={22} />
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  color: 'var(--text-tertiary)'
                }}>
                  <ArrowRight size={20} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-heavy)' }}>
                    NULL
                  </span>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
