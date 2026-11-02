import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  Layers, 
  Trophy, 
  Activity, 
  GraduationCap, 
  Palette, 
  Check 
} from 'lucide-react';
import { Logo } from './Logo';

export type ThemeMode = 'dark' | 'cyberpunk' | 'emerald' | 'sunset' | 'light';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  theme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  theme,
  onSelectTheme
}) => {
  const location = useLocation();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const themeOptions: { id: ThemeMode; label: string; dotColor: string }[] = [
    { id: 'dark', label: 'Midnight Indigo', dotColor: 'hsl(221, 83%, 53%)' },
    { id: 'cyberpunk', label: 'Cyberpunk Neon', dotColor: 'hsl(315, 95%, 60%)' },
    { id: 'emerald', label: 'Emerald Matrix', dotColor: 'hsl(158, 64%, 48%)' },
    { id: 'sunset', label: 'Sunset Solar', dotColor: 'hsl(24, 95%, 53%)' },
    { id: 'light', label: 'Daylight Clean', dotColor: 'hsl(215, 20%, 75%)' }
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(e.target as Node)) {
        setIsThemeMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isHome = location.pathname === '/';
  const isVisualizer = location.pathname.startsWith('/visualizer');
  const isCompare = location.pathname.startsWith('/compare');
  const isQuiz = location.pathname.startsWith('/quiz');
  const isTracks = location.pathname.startsWith('/tracks');

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
        <Link 
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            cursor: 'pointer',
            userSelect: 'none',
            textDecoration: 'none'
          }}
        >
          <div style={{
            width: '34px',
            height: '34px',
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--state-swap) 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: 'var(--shadow-sm)',
            flexShrink: 0
          }}>
            <Sparkles size={18} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              color: 'var(--text-primary)'
            }}>
              <Logo width={128} height={16} color="currentColor" />
              <span className="badge badge-primary" style={{ fontSize: '10px', padding: '1px 6px' }}>v2.0</span>
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', letterSpacing: '0.02em' }}>
              Reimagining VisuAlgo
            </div>
          </div>
        </Link>

        {/* Navigation Tabs with Real Routes */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: 'var(--space-1)',
          backgroundColor: 'var(--surface-card)',
          padding: '4px',
          borderRadius: 'var(--radius-lg)',
          border: 'var(--border-1) solid var(--border-subtle)'
        }} className="desktop-nav">
          <Link
            to="/"
            className={`btn btn-sm ${isHome ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ 
              backgroundColor: isHome ? 'var(--surface-raised)' : 'transparent',
              color: isHome ? 'var(--text-primary)' : 'var(--text-secondary)',
              textDecoration: 'none'
            }}
          >
            <Layers size={15} />
            <span>Modules</span>
          </Link>

          <Link
            to="/visualizer/sorting"
            className={`btn btn-sm ${isVisualizer ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ 
              backgroundColor: isVisualizer ? 'var(--surface-raised)' : 'transparent',
              color: isVisualizer ? 'var(--text-primary)' : 'var(--text-secondary)',
              textDecoration: 'none'
            }}
          >
            <Activity size={15} />
            <span>Interactive Visualizer</span>
          </Link>

          <Link
            to="/compare"
            className={`btn btn-sm ${isCompare ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ 
              backgroundColor: isCompare ? 'var(--surface-raised)' : 'transparent',
              color: isCompare ? 'var(--text-primary)' : 'var(--text-secondary)',
              textDecoration: 'none'
            }}
          >
            <Sparkles size={15} />
            <span>Race Arena</span>
          </Link>

          <Link
            to="/quiz"
            className={`btn btn-sm ${isQuiz ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ 
              backgroundColor: isQuiz ? 'var(--surface-raised)' : 'transparent',
              color: isQuiz ? 'var(--text-primary)' : 'var(--text-secondary)',
              textDecoration: 'none'
            }}
          >
            <Trophy size={15} />
            <span>Quiz & Training</span>
          </Link>

          <Link
            to="/tracks"
            className={`btn btn-sm ${isTracks ? 'btn-secondary' : 'btn-ghost'}`}
            style={{ 
              backgroundColor: isTracks ? 'var(--surface-raised)' : 'transparent',
              color: isTracks ? 'var(--text-primary)' : 'var(--text-secondary)',
              textDecoration: 'none'
            }}
          >
            <GraduationCap size={15} />
            <span>Tracks</span>
          </Link>
        </nav>

        {/* Right Actions: Search + Color Theme Menu */}
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

          {/* Color Themes Menu */}
          <div style={{ position: 'relative' }} ref={themeMenuRef}>
            <button
              onClick={() => setIsThemeMenuOpen(prev => !prev)}
              className="btn btn-secondary btn-sm"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                padding: '6px 10px'
              }}
              title="Select color theme"
            >
              <Palette size={16} color="var(--primary-500)" />
              <span
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--primary-500)',
                  boxShadow: '0 0 6px var(--primary-500)'
                }}
              />
            </button>

            {isThemeMenuOpen && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                right: 0,
                width: '190px',
                backgroundColor: 'var(--surface-raised)',
                border: 'var(--border-1) solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-xl)',
                padding: 'var(--space-2)',
                zIndex: 110,
                display: 'flex',
                flexDirection: 'column',
                gap: '2px'
              }}>
                <div style={{
                  padding: '4px 8px',
                  fontSize: '11px',
                  fontWeight: 'var(--weight-heavy)',
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  Color Theme
                </div>
                {themeOptions.map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      onSelectTheme(opt.id);
                      setIsThemeMenuOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '6px 10px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: theme === opt.id ? 'var(--primary-surface)' : 'transparent',
                      color: theme === opt.id ? 'var(--primary-400)' : 'var(--text-primary)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: theme === opt.id ? 'var(--weight-heavy)' : 'var(--weight-normal)',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        width: '10px',
                        height: '10px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: opt.dotColor
                      }} />
                      <span>{opt.label}</span>
                    </div>
                    {theme === opt.id && <Check size={14} color="var(--primary-500)" />}
                  </button>
                ))}
              </div>
            )}
          </div>
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
