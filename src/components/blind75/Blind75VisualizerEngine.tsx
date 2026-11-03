import { useState, useEffect, useRef, FC } from 'react';
import { 
  Blind75Step, 
  Blind75VisualData 
} from '../../types/blind75';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  Gauge,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface Blind75VisualizerEngineProps {
  steps: Blind75Step[];
  title?: string;
}

export const Blind75VisualizerEngine: FC<Blind75VisualizerEngineProps> = ({
  steps,
  title
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<number>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset to first step if steps change
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [steps]);

  // Autoplay loop
  useEffect(() => {
    if (isPlaying) {
      const intervalMs = Math.max(250, Math.round(1000 / speed));
      timerRef.current = setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, intervalMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, steps.length]);

  const step = steps[currentStepIndex] || steps[0];
  if (!step) {
    return (
      <div style={{ padding: 'var(--space-6)', textAlign: 'center', color: 'var(--text-tertiary)' }}>
        No visual steps available for this problem yet.
      </div>
    );
  }

  const { visualData, description, action, variables, line } = step;

  const handleStepForward = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handleStepBackward = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const getActionBadgeColor = () => {
    switch (action) {
      case 'match':
        return 'var(--success-500)';
      case 'update':
        return 'var(--primary-500)';
      case 'swap':
        return 'var(--cat-dp)';
      case 'return':
        return 'var(--cat-sorting)';
      case 'advance':
        return 'var(--cat-graphs)';
      default:
        return 'var(--text-secondary)';
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
      backgroundColor: 'var(--surface-raised)',
      border: 'var(--border-1) solid var(--border-default)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-4)',
      boxShadow: 'var(--shadow-sm)'
    }}>
      {/* 1. Header / Step Narrator */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-2)',
        backgroundColor: 'var(--surface-subtle)',
        border: 'var(--border-1) solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-3) var(--space-4)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flex: 1, minWidth: '240px' }}>
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '11px',
            fontFamily: 'var(--font-mono)',
            fontWeight: 'bold',
            color: '#fff',
            backgroundColor: getActionBadgeColor(),
            padding: '3px 8px',
            borderRadius: 'var(--radius-full)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
            {action}
          </span>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', fontWeight: 500, lineHeight: 1.4 }}>
            {description}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            backgroundColor: 'var(--surface-canvas)',
            padding: '3px 8px',
            borderRadius: 'var(--radius-full)',
            border: 'var(--border-1) solid var(--border-subtle)'
          }}>
            Step {currentStepIndex + 1} / {steps.length}
          </span>
          {line > 0 && (
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--text-xs)',
              color: 'var(--primary-400)',
              backgroundColor: 'var(--primary-surface)',
              padding: '3px 8px',
              borderRadius: 'var(--radius-full)'
            }}>
              Line {line}
            </span>
          )}
        </div>
      </div>

      {/* 2. Main Visual Canvas */}
      <div style={{
        minHeight: '260px',
        backgroundColor: 'var(--surface-canvas)',
        border: 'var(--border-1) solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflowX: 'auto'
      }}>
        {visualData.badgeNote && (
          <div style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            backgroundColor: 'var(--primary-surface)',
            border: 'var(--border-1) solid var(--primary-border)',
            color: 'var(--primary-400)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Sparkles size={12} />
            <span>{visualData.badgeNote}</span>
          </div>
        )}

        {/* Render Canvas Based on Kind */}
        <CanvasRenderer data={visualData} />
      </div>

      {/* 3. Live Scope Variable Watch */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--space-2)',
        backgroundColor: 'var(--surface-subtle)',
        padding: 'var(--space-2) var(--space-3)',
        borderRadius: 'var(--radius-md)',
        border: 'var(--border-1) solid var(--border-subtle)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-tertiary)',
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginRight: 'var(--space-2)'
        }}>
          <Eye size={13} />
          <span>Scope Watch:</span>
        </div>

        {Object.entries(variables).length === 0 ? (
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>No active variables</span>
        ) : (
          Object.entries(variables).map(([k, v]) => (
            <div
              key={k}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                backgroundColor: 'var(--surface-card)',
                border: 'var(--border-1) solid var(--border-default)',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <span style={{ color: 'var(--text-secondary)' }}>{k}:</span>
              <span style={{ color: 'var(--primary-400)', fontWeight: 600 }}>
                {v === null ? 'null' : String(v)}
              </span>
            </div>
          ))
        )}
      </div>

      {/* 4. Playback Controls Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-3)',
        paddingTop: 'var(--space-2)'
      }}>
        {/* Play/Pause & Steppers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <button
            onClick={() => setIsPlaying(prev => !prev)}
            className="btn btn-sm btn-primary"
            style={{ borderRadius: 'var(--radius-full)', padding: '6px 14px' }}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
            <span>{isPlaying ? 'Pause' : 'Play'}</span>
          </button>

          <button
            onClick={handleStepBackward}
            disabled={currentStepIndex === 0}
            className="btn btn-sm btn-secondary"
            style={{ borderRadius: 'var(--radius-full)', padding: '6px 10px', opacity: currentStepIndex === 0 ? 0.5 : 1 }}
            title="Step Backward"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={handleStepForward}
            disabled={currentStepIndex >= steps.length - 1}
            className="btn btn-sm btn-secondary"
            style={{ borderRadius: 'var(--radius-full)', padding: '6px 10px', opacity: currentStepIndex >= steps.length - 1 ? 0.5 : 1 }}
            title="Step Forward"
          >
            <ChevronRight size={16} />
          </button>

          <button
            onClick={handleReset}
            className="btn btn-sm btn-secondary"
            style={{ borderRadius: 'var(--radius-full)', padding: '6px 10px' }}
            title="Reset to beginning"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        {/* Timeline Range Scrub */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flex: 1, minWidth: '180px', maxWidth: '380px' }}>
          <input
            type="range"
            min={0}
            max={Math.max(0, steps.length - 1)}
            value={currentStepIndex}
            onChange={e => {
              setIsPlaying(false);
              setCurrentStepIndex(Number(e.target.value));
            }}
            style={{ width: '100%', accentColor: 'var(--primary-500)', cursor: 'pointer' }}
          />
        </div>

        {/* Speed Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <Gauge size={14} color="var(--text-tertiary)" />
          <div style={{ display: 'flex', gap: '2px', backgroundColor: 'var(--surface-subtle)', padding: '2px', borderRadius: 'var(--radius-full)' }}>
            {[0.5, 1, 2].map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: speed === s ? 700 : 500,
                  color: speed === s ? 'var(--primary-400)' : 'var(--text-tertiary)',
                  backgroundColor: speed === s ? 'var(--surface-card)' : 'transparent',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Sub-component: Dispatches rendering to proper canvas based on visual kind
const CanvasRenderer: FC<{ data: Blind75VisualData }> = ({ data }) => {
  const { kind } = data;

  switch (kind) {
    case 'array-pointers':
    case 'sliding-window':
      return <ArrayPointersCanvas data={data} />;
    case 'hash-map':
      return <HashMapCanvas data={data} />;
    case 'linked-list':
      return <LinkedListCanvas data={data} />;
    case 'intervals':
      return <IntervalsCanvas data={data} />;
    case 'matrix':
      return <MatrixCanvas data={data} />;
    case 'binary-bits':
      return <BinaryBitsCanvas data={data} />;
    case 'stack':
      return <StackCanvas data={data} />;
    case 'dp-table':
      return <DpTableCanvas data={data} />;
    default:
      return <ArrayPointersCanvas data={data} />;
  }
};

// 1. Array & Sliding Window Canvas
const ArrayPointersCanvas: FC<{ data: Blind75VisualData }> = ({ data }) => {
  const array = data.array || data.chars || [];
  const activeSet = new Set(data.activeIndices || []);
  const secondarySet = new Set(data.secondaryIndices || []);
  const pointers = data.pointers || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', width: '100%' }}>
      {/* Target indicator if available */}
      {data.targetValue !== undefined && (
        <div style={{
          fontSize: 'var(--text-xs)',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-secondary)',
          backgroundColor: 'var(--surface-subtle)',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)'
        }}>
          Target Value: <span style={{ color: 'var(--primary-400)', fontWeight: 700 }}>{String(data.targetValue)}</span>
        </div>
      )}

      {/* Array Elements */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '8px', flexWrap: 'wrap' }}>
        {array.map((val, idx) => {
          const isActive = activeSet.has(idx);
          const isSecondary = secondarySet.has(idx);
          const inWindow = data.windowStart !== undefined && data.windowEnd !== undefined &&
            idx >= data.windowStart && idx <= data.windowEnd;

          const pointerList = pointers.filter(p => p.index === idx);

          return (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              {/* Pointer Badges Top */}
              <div style={{ minHeight: '22px', display: 'flex', gap: '4px' }}>
                {pointerList.map((p, pIdx) => (
                  <span
                    key={pIdx}
                    style={{
                      fontSize: '10px',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 700,
                      color: '#fff',
                      backgroundColor: p.color || 'var(--primary-500)',
                      padding: '1px 6px',
                      borderRadius: 'var(--radius-full)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                    }}
                  >
                    {p.name}
                  </span>
                ))}
              </div>

              {/* Element Card */}
              <div style={{
                minWidth: '44px',
                minHeight: '44px',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isActive
                  ? 'var(--primary-surface)'
                  : inWindow
                  ? 'var(--cat-graphs-surface)'
                  : isSecondary
                  ? 'var(--cat-dp-surface)'
                  : 'var(--surface-raised)',
                border: isActive
                  ? '2px solid var(--primary-500)'
                  : inWindow
                  ? '2px solid var(--cat-graphs)'
                  : '1px solid var(--border-default)',
                borderRadius: 'var(--radius-md)',
                color: isActive ? 'var(--primary-400)' : 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                fontWeight: 700,
                boxShadow: isActive ? '0 0 12px var(--primary-surface)' : 'var(--shadow-xs)',
                transition: 'all 200ms ease'
              }}>
                {String(val)}
              </div>

              {/* Index Number */}
              <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                {idx}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 2. Hash Map Canvas
const HashMapCanvas: FC<{ data: Blind75VisualData }> = ({ data }) => {
  const map = data.hashMap || {};
  const entries = Object.entries(map);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', width: '100%' }}>
      {data.array && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
          {data.array.map((val, idx) => (
            <div
              key={idx}
              style={{
                padding: '4px 8px',
                borderRadius: 'var(--radius-sm)',
                border: data.activeIndices?.includes(idx) ? '2px solid var(--primary-500)' : '1px solid var(--border-subtle)',
                backgroundColor: data.activeIndices?.includes(idx) ? 'var(--primary-surface)' : 'var(--surface-subtle)',
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              nums[{idx}] = {val}
            </div>
          ))}
        </div>
      )}

      {/* Hash Map Table */}
      <div style={{
        backgroundColor: 'var(--surface-subtle)',
        border: 'var(--border-1) solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-3)',
        minWidth: '280px',
        maxWidth: '460px',
        width: '100%'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '11px',
          fontWeight: 'bold',
          color: 'var(--text-tertiary)',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '6px',
          marginBottom: '8px',
          textTransform: 'uppercase'
        }}>
          <span>Key (Value Seen)</span>
          <span>Stored Payload</span>
        </div>

        {entries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '12px', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
            Empty Hash Map {'{}'}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {entries.map(([k, v]) => {
              const isMatch = data.activeKey === k;
              return (
                <div
                  key={k}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isMatch ? 'var(--primary-surface)' : 'var(--surface-canvas)',
                    border: isMatch ? '1px solid var(--primary-500)' : '1px solid var(--border-subtle)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)'
                  }}
                >
                  <span style={{ fontWeight: 700, color: isMatch ? 'var(--primary-400)' : 'var(--text-primary)' }}>
                    {k}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {String(v)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {data.lookupResult && (
        <div style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--success-500)',
          fontWeight: 600,
          backgroundColor: 'var(--success-surface)',
          padding: '4px 12px',
          borderRadius: 'var(--radius-full)'
        }}>
          {data.lookupResult}
        </div>
      )}
    </div>
  );
};

// 3. Linked List Canvas
const LinkedListCanvas: FC<{ data: Blind75VisualData }> = ({ data }) => {
  const nodes = data.nodes || [];

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', width: '100%' }}>
      {nodes.map((node, idx) => {
        const isCurr = data.currNodeId === node.id;
        const isPrev = data.prevNodeId === node.id;

        return (
          <div key={node.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              {/* Pointer indicator */}
              <div style={{ minHeight: '18px' }}>
                {isCurr && (
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#fff', backgroundColor: 'var(--primary-500)', padding: '1px 6px', borderRadius: 'var(--radius-full)' }}>
                    curr
                  </span>
                )}
                {isPrev && (
                  <span style={{ fontSize: '10px', fontWeight: 'bold', color: '#fff', backgroundColor: 'var(--cat-dp)', padding: '1px 6px', borderRadius: 'var(--radius-full)' }}>
                    prev
                  </span>
                )}
              </div>

              {/* Node Circle */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isCurr ? 'var(--primary-surface)' : node.isVisited ? 'var(--cat-sorting-surface)' : 'var(--surface-raised)',
                border: isCurr ? '2px solid var(--primary-500)' : '1px solid var(--border-default)',
                color: isCurr ? 'var(--primary-400)' : 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                fontWeight: 700,
                boxShadow: 'var(--shadow-sm)'
              }}>
                {String(node.val)}
              </div>
            </div>

            {/* Arrow Connector */}
            {idx < nodes.length - 1 && (
              <ArrowRight size={18} color="var(--text-tertiary)" style={{ marginTop: '18px' }} />
            )}
          </div>
        );
      })}
    </div>
  );
};

// 4. Intervals Canvas
const IntervalsCanvas: FC<{ data: Blind75VisualData }> = ({ data }) => {
  const intervals = data.intervalsList || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', width: '100%', maxWidth: '520px' }}>
      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontWeight: 'bold', textTransform: 'uppercase' }}>
        Active Timeline Intervals:
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {intervals.map((iv, idx) => {
          const isMerged = iv.state === 'merged';
          const isConflict = iv.state === 'conflict';
          const isActive = iv.state === 'active';

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 16px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: isMerged
                  ? 'var(--cat-graphs-surface)'
                  : isConflict
                  ? 'var(--danger-surface)'
                  : isActive
                  ? 'var(--primary-surface)'
                  : 'var(--surface-subtle)',
                border: isMerged
                  ? '1px solid var(--cat-graphs)'
                  : isConflict
                  ? '1px solid var(--danger-500)'
                  : isActive
                  ? '1px solid var(--primary-500)'
                  : '1px solid var(--border-default)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                fontWeight: 600
              }}
            >
              <span>Interval #{idx + 1}: [{iv.start}, {iv.end}]</span>
              <span style={{
                fontSize: '10px',
                color: isMerged ? 'var(--cat-graphs)' : isConflict ? 'var(--danger-500)' : 'var(--text-secondary)'
              }}>
                {isMerged ? 'MERGED' : isConflict ? 'CONFLICT' : 'DISJOINT'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 5. 2D Matrix Canvas
const MatrixCanvas: FC<{ data: Blind75VisualData }> = ({ data }) => {
  const grid = data.grid || [];
  const activeCell = data.activeCell;
  const highlights = data.highlightCells || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
      {grid.map((row, r) => (
        <div key={r} style={{ display: 'flex', gap: '4px' }}>
          {row.map((cell, c) => {
            const isActive = activeCell?.r === r && activeCell?.c === c;
            const isHighlight = highlights.some(h => h.r === r && h.c === c);

            return (
              <div
                key={c}
                style={{
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isActive
                    ? 'var(--primary-surface)'
                    : isHighlight
                    ? 'var(--cat-sorting-surface)'
                    : 'var(--surface-raised)',
                  border: isActive
                    ? '2px solid var(--primary-500)'
                    : isHighlight
                    ? '1.5px solid var(--cat-sorting)'
                    : '1px solid var(--border-default)',
                  color: isActive ? 'var(--primary-400)' : 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700
                }}
              >
                {String(cell)}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// 6. Binary Bits Canvas
const BinaryBitsCanvas: FC<{ data: Blind75VisualData }> = ({ data }) => {
  const bits = data.bits || '00000000';
  const bitArr = bits.split('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
        32-bit Binary Register {data.decimalValue !== undefined && `(Decimal: ${data.decimalValue})`}
      </div>

      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', maxWidth: '480px', justifyContent: 'center' }}>
        {bitArr.map((b, idx) => {
          const isOne = b === '1';
          return (
            <div
              key={idx}
              style={{
                width: '28px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: isOne ? 'var(--primary-surface)' : 'var(--surface-raised)',
                border: isOne ? '1px solid var(--primary-500)' : '1px solid var(--border-subtle)',
                color: isOne ? 'var(--primary-400)' : 'var(--text-tertiary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                fontWeight: isOne ? 700 : 400
              }}
            >
              {b}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// 7. Stack Canvas
const StackCanvas: FC<{ data: Blind75VisualData }> = ({ data }) => {
  const items = data.stackItems || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
      <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
        LIFO Stack Container
      </div>

      <div style={{
        minWidth: '120px',
        minHeight: '140px',
        borderLeft: '2px solid var(--border-default)',
        borderRight: '2px solid var(--border-default)',
        borderBottom: '2px solid var(--border-default)',
        borderRadius: '0 0 var(--radius-md) var(--radius-md)',
        display: 'flex',
        flexDirection: 'column-reverse',
        padding: '6px',
        gap: '4px',
        backgroundColor: 'var(--surface-subtle)'
      }}>
        {items.length === 0 ? (
          <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textAlign: 'center', padding: '16px 0' }}>
            Stack Empty
          </div>
        ) : (
          items.map((it, idx) => (
            <div
              key={idx}
              style={{
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: idx === items.length - 1 ? 'var(--primary-surface)' : 'var(--surface-raised)',
                border: idx === items.length - 1 ? '1px solid var(--primary-500)' : '1px solid var(--border-default)',
                color: idx === items.length - 1 ? 'var(--primary-400)' : 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                textAlign: 'center'
              }}
            >
              {it} {idx === items.length - 1 && '← TOP'}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// 8. DP Table Canvas
const DpTableCanvas: FC<{ data: Blind75VisualData }> = ({ data }) => {
  const dp1D = data.dp1D;
  const dpTable = data.dpTable;

  if (dp1D) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-3)' }}>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
          1D DP State Array
        </div>

        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {dp1D.map((val, idx) => {
            const isActive = data.activeDpCell?.index === idx;
            return (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{
                  minWidth: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'var(--primary-surface)' : 'var(--surface-raised)',
                  border: isActive ? '2px solid var(--primary-500)' : '1px solid var(--border-default)',
                  color: isActive ? 'var(--primary-400)' : 'var(--text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700
                }}>
                  {String(val)}
                </div>
                <span style={{ fontSize: '10px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                  [{idx}]
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  if (dpTable) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
          2D DP Memoization Grid
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {dpTable.map((row, r) => (
            <div key={r} style={{ display: 'flex', gap: '4px' }}>
              {row.map((cell, c) => {
                const isActive = data.activeDpCell?.r === r && data.activeDpCell?.c === c;
                return (
                  <div
                    key={c}
                    style={{
                      width: '36px',
                      height: '36px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: isActive ? 'var(--primary-surface)' : 'var(--surface-raised)',
                      border: isActive ? '2px solid var(--primary-500)' : '1px solid var(--border-default)',
                      color: isActive ? 'var(--primary-400)' : 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 700
                    }}
                  >
                    {String(cell)}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};
