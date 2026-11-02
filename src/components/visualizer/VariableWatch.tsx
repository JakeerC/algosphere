import React from 'react';
import { Eye } from 'lucide-react';

interface VariableWatchProps {
  variables: Record<string, string | number | boolean | null | undefined | (string | number)[]>;
}

export const VariableWatch: React.FC<VariableWatchProps> = ({ variables }) => {
  const entries = Object.entries(variables);

  return (
    <div style={{
      backgroundColor: 'var(--surface-subtle)',
      borderTop: 'var(--border-1) solid var(--border-subtle)',
      padding: 'var(--space-2) var(--space-3)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        marginBottom: 'var(--space-2)',
        fontSize: 'var(--text-xs)',
        color: 'var(--text-tertiary)',
        fontWeight: 'var(--weight-heavy)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
      }}>
        <Eye size={12} />
        <span>Variable Watch</span>
      </div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 'var(--space-2)'
      }}>
        {entries.length === 0 ? (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>No active variables</span>
        ) : (
          entries.map(([key, val]) => (
            <div
              key={key}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: 'var(--surface-card)',
                border: 'var(--border-1) solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                padding: '2px 6px',
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <span style={{ color: 'var(--text-tertiary)', marginRight: '6px' }}>{key}:</span>
              <span style={{ 
                color: typeof val === 'number' ? 'var(--state-inspect)' : 'var(--primary-400)',
                fontWeight: 'var(--weight-heavy)'
              }}>
                {Array.isArray(val) ? `[${val.join(', ')}]` : String(val ?? '')}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
