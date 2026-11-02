import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, Clock } from 'lucide-react';
import { LEARNING_TRACKS, ALGORITHM_MODULES } from '../data/modules';
import { AlgorithmModule } from '../types/algorithm';
import { Badge } from '../components/common/Badge';

export const TracksPage: React.FC = () => {
  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-10)' }}>
      {/* Page Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        paddingTop: 'var(--space-4)',
        borderBottom: 'var(--border-1) solid var(--border-subtle)',
        paddingBottom: 'var(--space-4)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
            <Badge variant="primary" icon={<GraduationCap size={14} />}>Curated Syllabi</Badge>
          </div>
          <h1 style={{ fontSize: 'var(--text-3xl)', margin: 0 }}>
            Structured Learning Pathways
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
            Guided algorithmic roadmaps designed for classroom study and technical coding interview mastery.
          </p>
        </div>
      </div>

      {/* Tracks List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
        {LEARNING_TRACKS.map(track => {
          const trackModules = track.moduleIds
            .map(id => ALGORITHM_MODULES.find(m => m.id === id))
            .filter((m): m is AlgorithmModule => !!m);

          const firstModule = trackModules[0];

          return (
            <div key={track.id} className="card" style={{ padding: 'var(--space-6)' }}>
              {/* Track Title and Meta info */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-4)',
                borderBottom: 'var(--border-1) solid var(--border-subtle)',
                paddingBottom: 'var(--space-4)'
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
                    <Badge variant="primary">{track.badge}</Badge>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-tertiary)',
                      fontFamily: 'var(--font-mono)'
                    }}>
                      <Clock size={12} />
                      {track.estimatedHours}
                    </span>
                  </div>
                  <h2 style={{ fontSize: 'var(--text-2xl)', margin: 0 }}>
                    {track.title}
                  </h2>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
                    {track.description}
                  </p>
                </div>

                {firstModule && (
                  <Link
                    to={`/visualizer/${firstModule.id}`}
                    className="btn btn-primary btn-sm"
                  >
                    <span>Start Module 1 ({firstModule.title})</span>
                    <ArrowRight size={14} />
                  </Link>
                )}
              </div>

              {/* Modules Roadmap Grid inside the track */}
              <div>
                <h4 style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--weight-heavy)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-tertiary)',
                  marginBottom: 'var(--space-3)'
                }}>
                  Syllabus Progression ({trackModules.length} Modules):
                </h4>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                  gap: 'var(--space-3)'
                }}>
                  {trackModules.map((mod, stepNum) => (
                    <Link
                      key={mod.id}
                      to={`/visualizer/${mod.id}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 'var(--space-3) var(--space-4)',
                        backgroundColor: 'var(--surface-subtle)',
                        border: 'var(--border-1) solid var(--border-default)',
                        borderRadius: 'var(--radius-lg)',
                        cursor: 'pointer',
                        transition: 'all var(--transition-fast)',
                        textDecoration: 'none'
                      }}
                      className="card-interactive"
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                        <span style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: 'var(--surface-card)',
                          border: 'var(--border-1) solid var(--border-strong)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--primary-400)',
                          fontWeight: 'var(--weight-heavy)'
                        }}>
                          {stepNum + 1}
                        </span>
                        <div>
                          <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-heavy)', color: 'var(--text-primary)' }}>
                            {mod.title}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
                            {mod.complexity.timeAvg}
                          </div>
                        </div>
                      </div>

                      <ArrowRight size={14} color="var(--text-tertiary)" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
