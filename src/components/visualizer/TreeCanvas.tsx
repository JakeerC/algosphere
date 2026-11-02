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
}

export const TreeCanvas: React.FC<TreeCanvasProps> = ({ tree }) => {
  // Compute positions
  const layouts: Record<string, NodeLayout> = {};
  const width = 640;
  const height = 360;

  function calculatePositions(nodeId: string | undefined, x: number, y: number, offset: number) {
    if (!nodeId || !tree.nodes[nodeId]) return;
    const node = tree.nodes[nodeId];
    layouts[nodeId] = { id: nodeId, x, y, node };

    if (node.leftId) {
      calculatePositions(node.leftId, x - offset, y + 70, offset / 1.9);
    }
    if (node.rightId) {
      calculatePositions(node.rightId, x + offset, y + 70, offset / 1.9);
    }
  }

  if (tree.rootId) {
    calculatePositions(tree.rootId, width / 2, 50, 140);
  }

  const getNodeColor = (state: TreeNodeData['state']) => {
    switch (state) {
      case 'inspect':
        return 'var(--state-inspect)';
      case 'active':
        return 'var(--state-swap)';
      case 'sorted':
        return 'var(--state-sorted)';
      case 'visited':
        return 'var(--state-visited)';
      default:
        return 'var(--primary-500)';
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '380px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        style={{
          width: '100%',
          height: '100%',
          maxHeight: '380px'
        }}
      >
        {/* Draw Edges */}
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
                  stroke="var(--border-strong)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
              {rightTarget && (
                <line
                  x1={x}
                  y1={y}
                  x2={rightTarget.x}
                  y2={rightTarget.y}
                  stroke="var(--border-strong)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              )}
            </g>
          );
        })}

        {/* Draw Nodes */}
        {Object.values(layouts).map(layout => {
          const { node, x, y } = layout;
          const color = getNodeColor(node.state);
          const isInspecting = node.state === 'inspect' || node.state === 'active';

          return (
            <g key={`node-${node.id}`} style={{ cursor: 'pointer' }}>
              {/* Outer Glow on active/inspect */}
              {isInspecting && (
                <circle
                  cx={x}
                  cy={y}
                  r="26"
                  fill="none"
                  stroke={color}
                  strokeWidth="3"
                  opacity="0.4"
                />
              )}

              {/* Node Circle */}
              <circle
                cx={x}
                cy={y}
                r="20"
                fill="var(--surface-card)"
                stroke={color}
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
                fontWeight="600"
                fontFamily="var(--font-mono)"
              >
                {node.value}
              </text>

              {/* Balance Factor badge if present */}
              {node.balanceFactor !== undefined && (
                <g transform={`translate(${x + 14}, ${y - 14})`}>
                  <circle r="9" fill="var(--surface-subtle)" stroke="var(--border-default)" strokeWidth="1" />
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
