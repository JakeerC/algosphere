import React from 'react';
import { Heart } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      marginTop: 'auto',
      backgroundColor: 'var(--surface-subtle)',
      borderTop: 'var(--border-1) solid var(--border-subtle)',
      paddingTop: 'var(--space-8)',
      paddingBottom: 'var(--space-8)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--space-6)',
          marginBottom: 'var(--space-8)'
        }}>
          {/* Brand info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
              <Logo height={28} />
             
            </div>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
              A high-performance, aesthetically crafted interactive algorithm visualization platform. Reimagining VisuAlgo with modern developer ergonomics.
            </p>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', lineHeight: '1.6' }}>
              Conceived in honor of <strong>Dr. Steven Halim</strong> and the National University of Singapore (NUS) CS2040 teaching initiative.
            </div>
          </div>

          {/* Core Categories */}
          <div>
            <h4 style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
              Algorithms
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-sm)' }}>
              <li><span style={{ color: 'var(--text-secondary)' }}>Divide & Conquer (Quick/Merge Sort)</span></li>
              <li><span style={{ color: 'var(--text-secondary)' }}>Self-Balancing Trees (AVL Rotations)</span></li>
              <li><span style={{ color: 'var(--text-secondary)' }}>Graph Traversals (BFS & DFS)</span></li>
              <li><span style={{ color: 'var(--text-secondary)' }}>Shortest Paths (Dijkstra)</span></li>
              <li><span style={{ color: 'var(--text-secondary)' }}>Dynamic Programming (0/1 Knapsack)</span></li>
            </ul>
          </div>

          {/* Interactive Ergonomics & Shortcuts */}
          <div>
            <h4 style={{ fontSize: 'var(--text-sm)', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-tertiary)', marginBottom: 'var(--space-3)' }}>
              Keyboard Shortcuts
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Global Command Palette</span>
                <kbd style={{ backgroundColor: 'var(--surface-card)', padding: '2px 6px', borderRadius: 'var(--radius-xs)', border: 'var(--border-1) solid var(--border-default)' }}>⌘K</kbd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Step Forward / Backward</span>
                <kbd style={{ backgroundColor: 'var(--surface-card)', padding: '2px 6px', borderRadius: 'var(--radius-xs)', border: 'var(--border-1) solid var(--border-default)' }}>← / →</kbd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Play / Pause Animation</span>
                <kbd style={{ backgroundColor: 'var(--surface-card)', padding: '2px 6px', borderRadius: 'var(--radius-xs)', border: 'var(--border-1) solid var(--border-default)' }}>Space</kbd>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Reset to Step 0</span>
                <kbd style={{ backgroundColor: 'var(--surface-card)', padding: '2px 6px', borderRadius: 'var(--radius-xs)', border: 'var(--border-1) solid var(--border-default)' }}>R</kbd>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: 'var(--space-4)',
          borderTop: 'var(--border-1) solid var(--border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          fontSize: 'var(--text-xs)',
          color: 'var(--text-tertiary)'
        }}>
          <div>
            © {new Date().getFullYear()} AlgoSphere. Engineered with strict design token hierarchy.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
            <span>Crafted with</span>
            <Heart size={13} color="hsl(350, 89%, 60%)" fill="hsl(350, 89%, 60%)" />
            <span>for computer science students worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
