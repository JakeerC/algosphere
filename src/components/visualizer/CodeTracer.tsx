import React, { useEffect, useRef } from 'react';
import { PseudocodeLine } from '../../types/algorithm';
import { Code2 } from 'lucide-react';

interface CodeTracerProps {
  lines: PseudocodeLine[];
  activeLine: number;
  title?: string;
}

export const CodeTracer: React.FC<CodeTracerProps> = ({
  lines,
  activeLine,
  title = 'Pseudocode Tracer'
}) => {
  const activeLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeLineRef.current) {
      activeLineRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [activeLine]);

  return (
    <div className="code-panel" style={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden'
    }}>
      {/* Panel header */}
      <div className="code-header" style={{
        padding: 'var(--space-3) var(--space-4)',
        backgroundColor: 'var(--surface-subtle)',
        borderBottom: '1px solid var(--border-subtle)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Code2 size={15} color="var(--primary-500)" />
          <span style={{ fontWeight: 'var(--weight-heavy)', color: 'var(--text-primary)', fontSize: 'var(--text-sm)' }}>
            {title}
          </span>
        </div>
        <span className="badge badge-primary" style={{ fontSize: '10px' }}>
          Line {activeLine}
        </span>
      </div>

      {/* Code container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: 'var(--space-2)'
      }}>
        {lines.map(line => {
          const isActive = line.num === activeLine;
          return (
            <div
              key={line.num}
              ref={isActive ? activeLineRef : null}
              className={`code-line ${isActive ? 'code-line-active' : ''}`}
              style={{
                borderRadius: 'var(--radius-md)',
                margin: '2px 0',
                paddingLeft: `calc(var(--space-3) + ${line.indent * 14}px)`,
                transition: 'all var(--transition-fast)'
              }}
            >
              <span className="code-line-num">{line.num}</span>
              <span style={{
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: isActive ? 'var(--weight-heavy)' : 'normal',
                whiteSpace: 'pre'
              }}>
                {line.code}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
