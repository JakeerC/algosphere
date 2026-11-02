import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  BookOpen, 
  Activity, 
  Zap, 
  Layers, 
  ArrowUpDown, 
  GitFork, 
  Network, 
  Navigation, 
  Grid3X3, 
  Boxes, 
  Hash, 
  Workflow, 
  Share2 
} from 'lucide-react';
import { ALGORITHM_MODULES, LEARNING_TRACKS } from '../data/modules';
import { AlgorithmModule, AlgorithmCategory } from '../types/algorithm';
import { Badge } from '../components/common/Badge';

interface HomePageProps {
  onOpenCommandPalette: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenCommandPalette
}) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState('');

  const categories = [
    { id: 'all', label: 'All Modules', color: 'var(--primary-500)' },
    { id: 'sorting', label: 'Sorting', color: 'var(--cat-sorting)' },
    { id: 'trees', label: 'Trees & Heaps', color: 'var(--cat-trees)' },
    { id: 'graphs', label: 'Graphs & Paths', color: 'var(--cat-graphs)' },
    { id: 'linear', label: 'Linear ADTs', color: 'var(--cat-linear)' },
    { id: 'dp', label: 'Dynamic Programming', color: 'var(--cat-dp)' },
    { id: 'hashing', label: 'Hashing & Sets', color: 'var(--cat-hashing)' }
  ];

  const getCategoryTheme = (cat: AlgorithmCategory) => {
    switch (cat) {
      case 'sorting':
        return { color: 'var(--cat-sorting)', bg: 'var(--cat-sorting-surface)', border: 'var(--cat-sorting-border)' };
      case 'trees':
        return { color: 'var(--cat-trees)', bg: 'var(--cat-trees-surface)', border: 'var(--cat-trees-border)' };
      case 'graphs':
        return { color: 'var(--cat-graphs)', bg: 'var(--cat-graphs-surface)', border: 'var(--cat-graphs-border)' };
      case 'linear':
        return { color: 'var(--cat-linear)', bg: 'var(--cat-linear-surface)', border: 'var(--cat-linear-border)' };
      case 'dp':
        return { color: 'var(--cat-dp)', bg: 'var(--cat-dp-surface)', border: 'var(--cat-dp-border)' };
      case 'hashing':
        return { color: 'var(--cat-hashing)', bg: 'var(--cat-hashing-surface)', border: 'var(--cat-hashing-border)' };
      default:
        return { color: 'var(--primary-500)', bg: 'var(--primary-surface)', border: 'var(--primary-border)' };
    }
  };

  const filteredModules = ALGORITHM_MODULES.filter(m => {
    const matchesCategory = selectedCategory === 'all' || m.category === selectedCategory;
    const matchesSearch = !searchFilter || 
      m.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.variants.some(v => v.toLowerCase().includes(searchFilter.toLowerCase())) ||
      m.tags.some(t => t.toLowerCase().includes(searchFilter.toLowerCase())) ||
      (m.courseCode && m.courseCode.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getModuleIcon = (iconName: string) => {
    switch (iconName) {
      case 'ArrowUpDown': return <ArrowUpDown size={20} />;
      case 'GitFork': return <GitFork size={20} />;
      case 'Network': return <Network size={20} />;
      case 'Navigation': return <Navigation size={20} />;
      case 'Layers': return <Layers size={20} />;
      case 'Grid3X3': return <Grid3X3 size={20} />;
      case 'Boxes': return <Boxes size={20} />;
      case 'Hash': return <Hash size={20} />;
      case 'Workflow': return <Workflow size={20} />;
      case 'Share2': return <Share2 size={20} />;
      default: return <Sparkles size={20} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-9)' }}>
      {/* Hero Section */}
      <section style={{
        paddingTop: 'var(--space-8)',
        paddingBottom: 'var(--space-4)',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="container-narrow" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ marginBottom: 'var(--space-3)' }}>
            <Badge variant="primary" icon={<Sparkles size={14} />}>
              Next-Generation Algorithm Studio
            </Badge>
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 'var(--weight-bold)',
            lineHeight: 'var(--leading-tight)',
            marginBottom: 'var(--space-3)',
            background: 'linear-gradient(135deg, var(--text-primary) 20%, var(--primary-400) 60%, var(--state-swap) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Visualize, understand & master computer science algorithms.
          </h1>

          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-6)',
            textAlign: 'center'
          }}>
            Reimagining NUS VisuAlgo with fluid interactive workspaces, synchronized line-by-line pseudocode tracers, side-by-side algorithm races, and procedural quizzes.
          </p>

          {/* Quick Search Banner / Button */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-3)'
          }}>
            <button
              onClick={onOpenCommandPalette}
              className="btn btn-primary btn-lg"
              style={{ gap: 'var(--space-3)' }}
            >
              <Search size={18} />
              <span>Explore Algorithms</span>
              <kbd style={{
                backgroundColor: 'hsla(0, 0%, 100%, 0.2)',
                padding: '2px 6px',
                borderRadius: 'var(--radius-xs)',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)'
              }}>⌘K</kbd>
            </button>

            <Link
              to="/compare"
              className="btn btn-secondary btn-lg"
              style={{ gap: 'var(--space-2)' }}
            >
              <Zap size={18} color="var(--state-swap)" />
              <span>Race Arena</span>
            </Link>
          </div>
        </div>
      </section>

      {/* University & Interview Tracks Highlight */}
      <section className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-4)'
        }}>
          <div>
            <h2 style={{ fontSize: 'var(--text-xl)' }}>Curated Learning Pathways</h2>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
              Structured tracks aligned with world-class university curricula and technical interview loops.
            </p>
          </div>
          <Link
            to="/tracks"
            className="btn btn-ghost btn-sm"
            style={{ color: 'var(--primary-400)' }}
          >
            <span>View All Tracks</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-4)'
        }}>
          {LEARNING_TRACKS.map((track, idx) => {
            const trackColors = [
              { border: 'var(--cat-sorting)', badge: 'primary' as const },
              { border: 'var(--cat-dp)', badge: 'purple' as const },
              { border: 'var(--cat-trees)', badge: 'success' as const }
            ];
            const theme = trackColors[idx % trackColors.length];

            return (
              <Link
                key={track.id}
                to="/tracks"
                className="card card-interactive"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 'var(--space-3)',
                  borderTop: `3px solid ${theme.border}`,
                  textDecoration: 'none'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                    <Badge variant={theme.badge}>{track.badge}</Badge>
                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                      {track.estimatedHours}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-1)', color: 'var(--text-primary)' }}>
                    {track.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                    {track.description}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 'var(--space-3)',
                  borderTop: 'var(--border-1) solid var(--border-subtle)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-tertiary)'
                }}>
                  <span>{track.moduleIds.length} Core Modules Included</span>
                  <span style={{ color: 'var(--primary-400)', fontWeight: 'var(--weight-heavy)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Start Track <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Main Algorithm Catalog Grid */}
      <section className="container">
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-6)'
        }}>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-3)'
          }}>
            <div>
              <h2 style={{ fontSize: 'var(--text-2xl)' }}>Algorithmic Modules</h2>
              <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)' }}>
                Comprehensive interactive visualizations across {ALGORITHM_MODULES.length} algorithmic families.
              </p>
            </div>

            {/* In-page filter search */}
            <div style={{ minWidth: '240px' }}>
              <input
                type="text"
                placeholder="Filter algorithms or tags..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                style={{ width: '100%' }}
              />
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-2)',
            borderBottom: 'var(--border-1) solid var(--border-subtle)',
            paddingBottom: 'var(--space-3)'
          }}>
            {categories.map(cat => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                  style={{
                    borderLeft: !isSelected && cat.id !== 'all' ? `3px solid ${cat.color}` : undefined
                  }}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Modules Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 'var(--space-5)',
          marginBottom: 'var(--space-10)'
        }}>
          {filteredModules.map(module => {
            const theme = getCategoryTheme(module.category);

            return (
              <div
                key={module.id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 'var(--space-4)',
                  borderTop: `3px solid ${theme.color}`
                }}
              >
                <div>
                  {/* Header row: Icon, Title, Course badge */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
                    <div style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: theme.bg,
                      border: `1px solid ${theme.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.color,
                      flexShrink: 0
                    }}>
                      {getModuleIcon(module.icon)}
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--space-1)', flexWrap: 'wrap' }}>
                      {module.courseCode && (
                        <span className="badge badge-neutral">{module.courseCode}</span>
                      )}
                      <span className="badge badge-primary">{module.difficulty}</span>
                    </div>
                  </div>

                  <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
                    {module.title}
                  </h3>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-3)' }}>
                    {module.shortDescription}
                  </p>

                  {/* Variants pills */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                    marginBottom: 'var(--space-4)'
                  }}>
                    {module.variants.slice(0, 3).map((v, i) => (
                      <span
                        key={i}
                        style={{
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          backgroundColor: 'var(--surface-subtle)',
                          border: 'var(--border-1) solid var(--border-subtle)',
                          borderRadius: 'var(--radius-sm)',
                          padding: '2px 6px',
                          color: 'var(--text-secondary)'
                        }}
                      >
                        {v}
                      </span>
                    ))}
                    {module.variants.length > 3 && (
                      <span style={{ fontSize: '11px', color: 'var(--text-tertiary)', padding: '2px' }}>
                        +{module.variants.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Big-O Complexity HUD */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: 'var(--space-2)',
                    backgroundColor: 'var(--surface-subtle)',
                    padding: 'var(--space-2) var(--space-3)',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-mono)'
                  }}>
                    <div>
                      <span style={{ color: 'var(--text-tertiary)' }}>Time (Avg): </span>
                      <strong style={{ color: 'var(--state-inspect)' }}>{module.complexity.timeAvg}</strong>
                    </div>
                    <div>
                      <span style={{ color: 'var(--text-tertiary)' }}>Space: </span>
                      <strong style={{ color: 'var(--text-primary)' }}>{module.complexity.spaceWorst}</strong>
                    </div>
                  </div>
                </div>

                {/* Bottom Action buttons with real router links */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  paddingTop: 'var(--space-3)',
                  borderTop: 'var(--border-1) solid var(--border-subtle)'
                }}>
                  <Link
                    to={`/visualizer/${module.id}`}
                    className="btn btn-primary btn-sm"
                    style={{ flex: 1 }}
                  >
                    <Activity size={14} />
                    <span>Visualize</span>
                  </Link>

                  <Link
                    to={`/lecture/${module.id}`}
                    className="btn btn-secondary btn-sm"
                    title="Open e-Lecture slides"
                  >
                    <BookOpen size={14} />
                    <span>Lecture</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
