import React from 'react';
import { GraphVisualState, GraphVertex, GraphEdge } from '../../types/visualizer';

interface GraphCanvasProps {
  graph: GraphVisualState;
}

export const GraphCanvas: React.FC<GraphCanvasProps> = ({ graph }) => {
  const getVertexBorderColor = (vertex: GraphVertex) => {
    switch (vertex.state) {
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

  const getVertexFillColor = (vertex: GraphVertex) => {
    switch (vertex.state) {
      case 'inspect':
        return 'var(--state-inspect-bg)';
      case 'active':
        return 'var(--state-swap-bg)';
      case 'sorted':
        return 'var(--state-sorted-bg)';
      case 'visited':
        return 'var(--state-visited-bg)';
      default:
        return 'var(--surface-card)';
    }
  };

  const getEdgeStroke = (edge: GraphEdge) => {
    switch (edge.state) {
      case 'inspect':
        return 'var(--state-inspect)';
      case 'visited':
        return 'var(--cyan-500)';
      default:
        return 'var(--border-strong)';
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '380px',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Top Legend Bar */}
      <div style={{
        position: 'absolute',
        top: 'var(--space-3)',
        right: 'var(--space-4)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        fontSize: '11px',
        color: 'var(--text-tertiary)',
        backgroundColor: 'var(--surface-subtle)',
        padding: '3px 10px',
        borderRadius: 'var(--radius-full)',
        border: '1px solid var(--border-subtle)',
        zIndex: 10
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--state-visited)' }} />
          Visited (Cyan)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--state-sorted)' }} />
          Finalized / Locked (Emerald)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--state-swap)' }} />
          Active Relaxing (Purple)
        </span>
      </div>

      {/* Queue HUD overlay if present */}
      {graph.queueOrStack && graph.queueOrStack.length > 0 && (
        <div style={{
          position: 'absolute',
          top: 'var(--space-3)',
          left: 'var(--space-3)',
          zIndex: 10,
          backgroundColor: 'var(--surface-subtle)',
          border: 'var(--border-1) solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-2) var(--space-3)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          fontSize: 'var(--text-xs)',
          fontFamily: 'var(--font-mono)'
        }}>
          <span style={{ color: 'var(--text-tertiary)', fontWeight: 'var(--weight-heavy)' }}>FIFO Queue:</span>
          <div style={{ display: 'flex', gap: '4px' }}>
            {graph.queueOrStack.map((id, i) => (
              <span
                key={i}
                style={{
                  backgroundColor: i === 0 ? 'var(--primary-surface)' : 'var(--surface-card)',
                  color: i === 0 ? 'var(--primary-400)' : 'var(--text-primary)',
                  border: 'var(--border-1) solid var(--border-subtle)',
                  borderRadius: 'var(--radius-xs)',
                  padding: '1px 5px',
                  fontWeight: 'var(--weight-heavy)'
                }}
              >
                {id}
              </span>
            ))}
          </div>
        </div>
      )}

      <svg
        viewBox="0 0 680 320"
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {/* Draw Edges */}
        {graph.edges.map(edge => {
          const u = graph.vertices.find(v => v.id === edge.source);
          const v = graph.vertices.find(vert => vert.id === edge.target);
          if (!u || !v) return null;

          const strokeColor = getEdgeStroke(edge);
          const isHighlighted = edge.state !== 'default';
          const midX = (u.x + v.x) / 2;
          const midY = (u.y + v.y) / 2;

          return (
            <g key={edge.id}>
              {isHighlighted && (
                <line
                  x1={u.x}
                  y1={u.y}
                  x2={v.x}
                  y2={v.y}
                  stroke={strokeColor}
                  strokeWidth="6"
                  opacity="0.3"
                  strokeLinecap="round"
                />
              )}

              <line
                x1={u.x}
                y1={u.y}
                x2={v.x}
                y2={v.y}
                stroke={strokeColor}
                strokeWidth={isHighlighted ? 3 : 2}
                strokeLinecap="round"
                style={{ transition: 'stroke var(--transition-fast)' }}
              />

              {/* Edge Weight Pill if present */}
              {edge.weight !== undefined && (
                <g transform={`translate(${midX}, ${midY})`}>
                  <rect
                    x="-12"
                    y="-9"
                    width="24"
                    height="18"
                    rx="4"
                    fill="var(--surface-card)"
                    stroke="var(--border-default)"
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill={edge.weight <= 3 ? 'var(--cyan-400)' : 'var(--amber-400)'}
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                  >
                    {edge.weight}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Draw Vertices */}
        {graph.vertices.map(vertex => {
          const borderColor = getVertexBorderColor(vertex);
          const fillColor = getVertexFillColor(vertex);
          const isSelected = vertex.state === 'inspect' || vertex.state === 'active';

          return (
            <g key={vertex.id} style={{ cursor: 'pointer' }}>
              {isSelected && (
                <circle
                  cx={vertex.x}
                  cy={vertex.y}
                  r="28"
                  fill="none"
                  stroke={borderColor}
                  strokeWidth="3.5"
                  opacity="0.5"
                />
              )}

              <circle
                cx={vertex.x}
                cy={vertex.y}
                r="20"
                fill={fillColor}
                stroke={borderColor}
                strokeWidth={isSelected ? 3 : 2}
              />

              <text
                x={vertex.x}
                y={vertex.y + 5}
                textAnchor="middle"
                fill="var(--text-primary)"
                fontSize="13"
                fontWeight="700"
                fontFamily="var(--font-mono)"
              >
                {vertex.label}
              </text>

              {/* Distance badge if Dijkstra is running */}
              {vertex.distance !== undefined && (
                <g transform={`translate(${vertex.x}, ${vertex.y - 25})`}>
                  <rect
                    x="-18"
                    y="-8"
                    width="36"
                    height="16"
                    rx="4"
                    fill="var(--surface-subtle)"
                    stroke="var(--border-default)"
                    strokeWidth="1"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill={vertex.distance === Infinity ? 'var(--text-tertiary)' : 'var(--cyan-400)'}
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                  >
                    {vertex.distance === Infinity ? '∞' : vertex.distance}
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
