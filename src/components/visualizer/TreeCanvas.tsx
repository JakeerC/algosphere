import React from 'react';
import { TreeVisualState, TreeNodeData } from '../../types/visualizer';

interface TreeCanvasProps {
  tree: TreeVisualState;
}

interface NodeLayout {
  id: string;
  x: number;
  y: number;
  node: TreeNodeData;
  branchSide?: 'left' | 'right' | 'root';
}

export const TreeCanvas: React.FC<TreeCanvasProps> = ({ tree }) => {
  const layouts: Record<string, NodeLayout> = {};
  const width = 640;
  const height = 360;

  function calculatePositions(
    nodeId: string | undefined, 
    x: number, 
    y: number, 
    offset: number,
    branchSide: 'left' | 'right' | 'root' = 'root'
  ) {
    if (!nodeId || !tree.nodes[nodeId]) return;
    const node = tree.nodes[nodeId];
    layouts[nodeId] = { id: nodeId, x, y, node, branchSide };

    if (node.leftId) {
      calculatePositions(node.leftId, x - offset, y + 70, offset / 1.9, 'left');
    }
    if (node.rightId) {
      calculatePositions(node.rightId, x + offset, y + 70, offset / 1.9, 'right');
    }
  }

  if (tree.rootId) {
    calculatePositions(tree.rootId, width / 2, 50, 140, 'root');
  }

  const getNodeBorderColor = (layout: NodeLayout) => {
    const { node, branchSide } = layout;
    if (node.state === 'inspect') return 'var(--state-inspect)';
    if (node.state === 'active') return 'var(--state-swap)';
    if (node.state === 'sorted') return 'var(--state-sorted)';
    if (node.state === 'visited') return 'var(--state-visited)';

    // Subtree color assignment
    if (branchSide === 'left') return 'var(--cyan-500)';
    if (branchSide === 'right') return 'var(--purple-400)';
    return 'var(--primary-500)';
  };

  const getNodeFillColor = (layout: NodeLayout) => {
    const { node, branchSide } = layout;
    if (node.state === 'inspect') return 'var(--state-inspect-bg)';
    if (node.state === 'active') return 'var(--state-swap-bg)';
    if (node.state === 'sorted') return 'var(--state-sorted-bg)';
    if (node.state === 'visited') return 'var(--state-visited-bg)';

    if (branchSide === 'left') return 'hsla(190, 95%, 48%, 0.12)';
    if (branchSide === 'right') return 'hsla(271, 91%, 65%, 0.12)';
    return 'var(--surface-card)';
  };

  return (
    <div style={{
      width: '100%',
      height: '380px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Visual Subtree Color Indicator */}
      <div style={{
        position: 'absolute',
        top: 'var(--space-3)',
        left: 'var(--space-4)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        fontSize: '11px',
        color: 'var(--text-tertiary)',
        backgroundColor: 'var(--surface-subtle)',
        padding: '3px 10px',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border-subtle)',
        zIndex: 5
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--cyan-500)' }} />
          Left Subtree (&lt; Parent)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--purple-400)' }} />
          Right Subtree (&gt; Parent)
        </span>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '380px'
        }}
      >
        {/* Draw Branch Connecting Edges */}
        {Object.values(layouts).map(layout => {
          const { node, x, y } = layout;
          const leftTarget = node.leftId ? layouts[node.leftId] : null;
          const rightTarget = node.rightId ? layouts[node.rightId] : null;

          return (
            <g key={`edges-${node.id}`}>
              {leftTarget && (
                <line
                  x1={x}
                  y1={y}
                  x2={leftTarget.x}
                  y2={leftTarget.y}
                  stroke="var(--cyan-600)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.75"
                />
              )}
              {rightTarget && (
                <line
                  x1={x}
                  y1={y}
                  x2={rightTarget.x}
                  y2={rightTarget.y}
                  stroke="var(--purple-600)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  opacity="0.75"
                />
              )}
            </g>
          );
        })}

        {/* Draw Nodes */}
        {Object.values(layouts).map(layout => {
          const { node, x, y } = layout;
          const borderColor = getNodeBorderColor(layout);
          const fillColor = getNodeFillColor(layout);
          const isInspecting = node.state === 'inspect' || node.state === 'active';

          return (
            <g key={`node-${node.id}`} style={{ cursor: 'pointer' }}>
              {/* Outer Glow on active/inspect */}
              {isInspecting && (
                <circle
                  cx={x}
                  cy={y}
                  r="27"
                  fill="none"
                  stroke={borderColor}
                  strokeWidth="3.5"
                  opacity="0.5"
                />
              )}

              {/* Node Circle */}
              <circle
                cx={x}
                cy={y}
                r="20"
                fill={fillColor}
                stroke={borderColor}
                strokeWidth={isInspecting ? 3 : 2}
                style={{ transition: 'all var(--transition-normal)' }}
              />

              {/* Node Value */}
              <text
                x={x}
                y={y + 5}
                textAnchor="middle"
                fill="var(--text-primary)"
                fontSize="13"
                fontWeight="700"
                fontFamily="var(--font-mono)"
              >
                {node.value}
              </text>

              {/* Balance Factor badge if present */}
              {node.balanceFactor !== undefined && (
                <g transform={`translate(${x + 14}, ${y - 14})`}>
                  <circle
                    r="9"
                    fill={node.balanceFactor > 1 || node.balanceFactor < -1 ? 'var(--state-pivot-bg)' : 'var(--surface-subtle)'}
                    stroke={node.balanceFactor > 1 || node.balanceFactor < -1 ? 'var(--state-pivot)' : 'var(--border-default)'}
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill={node.balanceFactor > 1 || node.balanceFactor < -1 ? 'var(--state-pivot)' : 'var(--text-tertiary)'}
                    fontSize="9"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                  >
                    {node.balanceFactor > 0 ? `+${node.balanceFactor}` : node.balanceFactor}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
