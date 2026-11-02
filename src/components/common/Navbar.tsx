import React from 'react';
import { 
  Sparkles, 
  Search, 
  Moon, 
  Sun, 
  Layers, 
  Trophy, 
  Activity, 
  GraduationCap 
} from 'lucide-react';

interface NavbarProps {
  currentTab: 'home' | 'visualizer' | 'compare' | 'quiz' | 'tracks';
  onSelectTab: (tab: 'home' | 'visualizer' | 'compare' | 'quiz' | 'tracks') => void;
  onOpenCommandPalette: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenCommandPalette,
  theme,
  onToggleTheme
}) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      backgroundColor: 'var(--surface-subtle)',
      borderBottom: 'var(--border-1) solid var(--border-subtle)',
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '64px',
        gap: 'var(--space-4)'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => onSelectTab('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary-500) 0%, hsl(271, 91%, 65%) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Sparkles size={20} />
          </div>
          <div>
            <div style={{ 
              fontWeight: 'var(--weight-heavy)', 
              fontSize: 'var(--text-lg)', 
              letterSpacing: '-0.02em',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)'
            }}>
              <span>AlgoSphere</span>
              <span className="badge badge-primary" style={{ fontSize: '10px', padding: '1px 6px' }}>v2.0</span>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', marginTop: '-2px' }}>
              Reimagining VisuAlgo
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: 'var(--space-1)',
          backgroundColor: 'var(--surface-card)',
          padding: '4px',
          borderRadius: 'var(--radius-lg)',
          border: 'var(--border-1) solid var(--border-subtle)'
        }} className="desktop-nav">
          <button
            onClick={() => onSelectTab('home')}
            className={`btn btn-sm ${currentTab === 'home' ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ 
              backgroundColor: currentTab === 'home' ? 'var(--surface-raised)' : 'transparent',
              color: currentTab === 'home' ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}
          >
            <Layers size={15} />
            <span>Modules</span>
          </button>

          <button
            onClick={() => onSelectTab('visualizer')}
            className={`btn btn-sm ${currentTab === 'visualizer' ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ 
              backgroundColor: currentTab === 'visualizer' ? 'var(--surface-raised)' : 'transparent',
              color: currentTab === 'visualizer' ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}
          >
            <Activity size={15} />
            <span>Interactive Visualizer</span>
          </button>

          <button
            onClick={() => onSelectTab('compare')}
            className={`btn btn-sm ${currentTab === 'compare' ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ 
              backgroundColor: currentTab === 'compare' ? 'var(--surface-raised)' : 'transparent',
              color: currentTab === 'compare' ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}
          >
            <Sparkles size={15} />
            <span>Race Arena</span>
          </button>

          <button
            onClick={() => onSelectTab('quiz')}
            className={`btn btn-sm ${currentTab === 'quiz' ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ 
              backgroundColor: currentTab === 'quiz' ? 'var(--surface-raised)' : 'transparent',
              color: currentTab === 'quiz' ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}
          >
            <Trophy size={15} />
            <span>Quiz & Training</span>
          </button>

          <button
            onClick={() => onSelectTab('tracks')}
            className={`btn btn-sm ${currentTab === 'tracks' ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ 
              backgroundColor: currentTab === 'tracks' ? 'var(--surface-raised)' : 'transparent',
              color: currentTab === 'tracks' ? 'var(--text-primary)' : 'var(--text-secondary)'
            }}
          >
            <GraduationCap size={15} />
            <span>Tracks</span>
          </button>
        </nav>

        {/* Right Actions: Command Search + Theme Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <button
            onClick={onOpenCommandPalette}
            className="btn btn-secondary btn-sm"
            style={{
              gap: 'var(--space-3)',
              color: 'var(--text-secondary)',
              padding: '6px 12px'
            }}
            title="Search algorithms (Cmd+K)"
          >
            <Search size={15} />
            <span style={{ display: 'none' }} className="search-text">Search algorithms...</span>
            <kbd style={{
              backgroundColor: 'var(--surface-subtle)',
              border: 'var(--border-1) solid var(--border-default)',
              borderRadius: 'var(--radius-sm)',
              padding: '2px 5px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-tertiary)'
            }}>⌘K</kbd>
          </button>

          <button
            onClick={onToggleTheme}
            className="btn-icon"
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 820px) {
          .desktop-nav {
            display: flex !important;
          }
          .search-text {
            display: inline !important;
          }
        }
      `}</style>
    </header>
  );
};
