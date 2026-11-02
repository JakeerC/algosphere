import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar, ThemeMode } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { HomePage } from './pages/HomePage';
import { VisualizerPage } from './pages/VisualizerPage';
import { ComparePage } from './pages/ComparePage';
import { QuizPage } from './pages/QuizPage';
import { TracksPage } from './pages/TracksPage';
import { LecturePage } from './pages/LecturePage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top automatically on route change
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('algosphere-theme') as ThemeMode;
    const validThemes: ThemeMode[] = [
      'dark', 'cyberpunk', 'emerald', 'sunset', 'light',
      'catppuccin-mocha', 'catppuccin-macchiato', 'catppuccin-frappe', 'catppuccin-latte'
    ];
    // Default to 'catppuccin-mocha'
    if (saved && validThemes.includes(saved) && saved !== 'dark' && saved !== 'catppuccin-macchiato') {
      return saved;
    }
    return 'catppuccin-mocha';
  });

  // Sync theme with document root & localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('algosphere-theme', theme);
  }, [theme]);

  // Global Cmd+K / Ctrl+K keyboard shortcut to toggle Search Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />

      {/* Top sticky Navbar with Real Route Links & Color Theme Selector */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        theme={theme}
        onSelectTheme={t => setTheme(t)}
      />

      {/* Main Page Body via Real React Router Routes */}
      <main style={{ flex: 1, paddingTop: 'var(--space-4)' }}>
        <Routes>
          <Route 
            path="/" 
            element={<HomePage onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />} 
          />
          <Route 
            path="/visualizer" 
            element={<VisualizerPage />} 
          />
          <Route 
            path="/visualizer/:moduleId" 
            element={<VisualizerPage />} 
          />
          <Route 
            path="/compare" 
            element={<ComparePage />} 
          />
          <Route 
            path="/quiz" 
            element={<QuizPage />} 
          />
          <Route 
            path="/tracks" 
            element={<TracksPage />} 
          />
          <Route 
            path="/lecture/:moduleId" 
            element={<LecturePage />} 
          />
          <Route 
            path="*" 
            element={<NotFoundPage />} 
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Command Palette Modal (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
      />
    </div>
  );
};

export default App;
