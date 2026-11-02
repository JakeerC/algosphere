import React, { useState, useEffect } from 'react';
import { Navbar, ThemeMode } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { CommandPalette } from './components/common/CommandPalette';
import { LectureModal } from './components/lecture/LectureModal';
import { HomePage } from './pages/HomePage';
import { VisualizerPage } from './pages/VisualizerPage';
import { ComparePage } from './pages/ComparePage';
import { QuizPage } from './pages/QuizPage';
import { TracksPage } from './pages/TracksPage';
import { ALGORITHM_MODULES } from './data/modules';
import { MODULE_LECTURES } from './data/lectures';
import { AlgorithmModule } from './types/algorithm';

export const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'home' | 'visualizer' | 'compare' | 'quiz' | 'tracks'>('home');
  const [selectedModule, setSelectedModule] = useState<AlgorithmModule>(ALGORITHM_MODULES[0]);
  const [lectureModule, setLectureModule] = useState<AlgorithmModule | null>(null);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [theme, setTheme] = useState<ThemeMode>('dark');

  // Sync theme with document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle Tab Switch
  const handleSelectTab = (tab: 'home' | 'visualizer' | 'compare' | 'quiz' | 'tracks') => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectModule = (mod: AlgorithmModule) => {
    setSelectedModule(mod);
    setCurrentTab('visualizer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLecture = (mod: AlgorithmModule) => {
    setLectureModule(mod);
  };

  const activeLectureSlides = lectureModule ? (MODULE_LECTURES[lectureModule.id] || MODULE_LECTURES['sorting']) : [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Top sticky Navbar with Color Theme Selector */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        theme={theme}
        onSelectTheme={t => setTheme(t)}
      />

      {/* Main Page Body */}
      <main style={{ flex: 1, paddingTop: 'var(--space-4)' }}>
        {currentTab === 'home' && (
          <HomePage
            onSelectModule={handleSelectModule}
            onOpenLecture={handleOpenLecture}
            onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
            onNavigateTab={handleSelectTab}
          />
        )}

        {currentTab === 'visualizer' && (
          <VisualizerPage
            module={selectedModule}
            onSelectModule={handleSelectModule}
            onOpenLecture={handleOpenLecture}
          />
        )}

        {currentTab === 'compare' && (
          <ComparePage />
        )}

        {currentTab === 'quiz' && (
          <QuizPage />
        )}

        {currentTab === 'tracks' && (
          <TracksPage
            onSelectModule={handleSelectModule}
            onNavigateTab={handleSelectTab}
          />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Command Palette Modal (Cmd+K) */}
      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectModule={handleSelectModule}
        onNavigateTab={handleSelectTab}
      />

      {/* e-Lecture Slide Deck Modal */}
      {lectureModule && (
        <LectureModal
          isOpen={!!lectureModule}
          onClose={() => setLectureModule(null)}
          slides={activeLectureSlides}
          moduleTitle={lectureModule.title}
          onLaunchSimulation={() => {
            setSelectedModule(lectureModule);
            setCurrentTab('visualizer');
          }}
        />
      )}
    </div>
  );
};
export default App;
