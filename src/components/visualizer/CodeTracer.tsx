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
    <div className="code-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Panel header */}
      <div className="code-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Code2 size={14} color="var(--primary-500)" />
          <span style={{ fontWeight: 'var(--weight-heavy)', color: 'var(--text-primary)' }}>{title}</span>
        </div>
        <span className="badge badge-neutral" style={{ fontSize: '10px' }}>
          Line {activeLine}
        </span>
      </div>

      {/* Code container */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        paddingTop: 'var(--space-2)',
        paddingBottom: 'var(--space-2)'
      }}>
        {lines.map(line => {
          const isActive = line.num === activeLine;
          return (
            <div
              key={line.num}
              ref={isActive ? activeLineRef : null}
              className={`code-line ${isActive ? 'code-line-active' : ''}`}
              style={{
                paddingLeft: `calc(var(--space-3) + ${line.indent * 14}px)`
              }}
            >
              <span className="code-line-num">{line.num}</span>
              <span style={{
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
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
