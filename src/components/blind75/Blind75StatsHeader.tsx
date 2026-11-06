import { FC } from 'react';
import { 
  Search, 
  Flame, 
  Trophy, 
  CheckCircle2, 
  Star, 
  Filter, 
  RotateCcw 
} from 'lucide-react';
import { Blind75Category, Blind75Difficulty } from '../../types/blind75';
import { Blind75Stats, BLIND75_CATEGORIES } from '../../data/blind75';
import { ScribbleSparkle, ScribbleUnderline } from '../common/ScribbleAccents';

interface Blind75StatsHeaderProps {
  stats: Blind75Stats;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory: string; // 'all' | Blind75Category
  onSelectCategory: (cat: string) => void;
  selectedDifficulty: string; // 'all' | Blind75Difficulty
  onSelectDifficulty: (diff: string) => void;
  selectedStatus: string; // 'all' | 'todo' | 'completed' | 'starred'
  onSelectStatus: (status: string) => void;
  onResetFilters: () => void;
}

export const Blind75StatsHeader: FC<Blind75StatsHeaderProps> = ({
  stats,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  selectedDifficulty,
  onSelectDifficulty,
  selectedStatus,
  onSelectStatus,
  onResetFilters
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
      {/* 1. Hero Headline & Progress Dashboard */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        paddingTop: 'var(--space-2)'
      }}>
        {/* Title & Description */}
        <div style={{ position: 'relative', maxWidth: '640px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              color: '#fff',
              backgroundColor: 'var(--danger-500)',
              padding: '3px 10px',
              borderRadius: 'var(--radius-full)',
              boxShadow: '0 2px 8px rgba(239, 68, 68, 0.3)'
            }}>
              <Flame size={13} />
              Blind 75 & Grind 75
            </span>
            <ScribbleSparkle size={16} color="var(--primary-400)" />
          </div>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
            margin: 0,
            lineHeight: 1.2,
            position: 'relative',
            display: 'inline-block'
          }}>
            Technical Interview Mastery
            <ScribbleUnderline color="var(--primary-400)" width={190} height={10} style={{ position: 'absolute', bottom: -6, right: 0 }} />
          </h1>

          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)', lineHeight: 1.6 }}>
            Every canonical Blind 75 & Grind 75 problem deep-analyzed with step-by-step interactive canvas visualizers, idiomatic Python 3 solutions, line-by-line pseudocode tracers, and time/space Big-O proofs.
          </p>
        </div>

        {/* Global Progress Card */}
        <div style={{
          backgroundColor: 'var(--surface-raised)',
          border: 'var(--border-1) solid var(--border-default)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-4) var(--space-5)',
          minWidth: '280px',
          boxShadow: 'var(--shadow-sm)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Trophy size={16} color="var(--primary-400)" />
              <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-primary)' }}>
                Mastery Progress
              </span>
            </div>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              color: 'var(--primary-400)'
            }}>
              {stats.completed} / {stats.total} ({stats.percentage}%)
            </span>
          </div>

          {/* Progress Bar */}
          <div style={{
            height: '8px',
            backgroundColor: 'var(--surface-subtle)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
            border: '1px solid var(--border-subtle)'
          }}>
            <div style={{
              height: '100%',
              width: `${stats.percentage}%`,
              backgroundColor: 'var(--primary-500)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 300ms ease'
            }} />
          </div>

          {/* Difficulty Breakdown Badges */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            {/* Easy */}
            <span style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--success-500)',
              backgroundColor: 'var(--success-surface)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)'
            }}>
              Easy: {stats.easyCompleted}/{stats.easyTotal}
            </span>

            {/* Medium */}
            <span style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--cat-sorting)',
              backgroundColor: 'var(--cat-sorting-surface)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)'
            }}>
              Med: {stats.mediumCompleted}/{stats.mediumTotal}
            </span>

            {/* Hard */}
            <span style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--danger-500)',
              backgroundColor: 'var(--danger-surface)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)'
            }}>
              Hard: {stats.hardCompleted}/{stats.hardTotal}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Search & Filter Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-3)',
        backgroundColor: 'var(--surface-subtle)',
        padding: 'var(--space-3) var(--space-4)',
        borderRadius: 'var(--radius-xl)',
        border: 'var(--border-1) solid var(--border-subtle)'
      }}>
        {/* Search Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          backgroundColor: 'var(--surface-canvas)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-full)',
          padding: '6px 14px',
          minWidth: '240px',
          flex: 1,
          maxWidth: '420px'
        }}>
          <Search size={15} color="var(--text-tertiary)" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="Search questions by title, #, pattern, or keyword..."
            style={{
              border: 'none',
              backgroundColor: 'transparent',
              padding: 0,
              fontSize: 'var(--text-xs)',
              width: '100%',
              boxShadow: 'none'
            }}
          />
        </div>

        {/* Filter Pills: Status & Difficulty */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {/* Status Filter */}
          <div style={{ display: 'flex', gap: '2px', backgroundColor: 'var(--surface-card)', padding: '2px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
            {[
              { id: 'all', label: 'All' },
              { id: 'todo', label: 'To Do' },
              { id: 'completed', label: 'Solved' },
              { id: 'starred', label: '★ Starred' }
            ].map(st => (
              <button
                key={st.id}
                onClick={() => onSelectStatus(st.id)}
                style={{
                  fontSize: '11px',
                  fontWeight: selectedStatus === st.id ? 700 : 500,
                  color: selectedStatus === st.id ? 'var(--primary-400)' : 'var(--text-secondary)',
                  backgroundColor: selectedStatus === st.id ? 'var(--primary-surface)' : 'transparent',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {st.label}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div style={{ display: 'flex', gap: '2px', backgroundColor: 'var(--surface-card)', padding: '2px', borderRadius: 'var(--radius-full)', border: '1px solid var(--border-subtle)' }}>
            {[
              { id: 'all', label: 'All Diff' },
              { id: 'Easy', label: 'Easy' },
              { id: 'Medium', label: 'Medium' },
              { id: 'Hard', label: 'Hard' }
            ].map(df => (
              <button
                key={df.id}
                onClick={() => onSelectDifficulty(df.id)}
                style={{
                  fontSize: '11px',
                  fontWeight: selectedDifficulty === df.id ? 700 : 500,
                  color: selectedDifficulty === df.id ? 'var(--primary-400)' : 'var(--text-secondary)',
                  backgroundColor: selectedDifficulty === df.id ? 'var(--primary-surface)' : 'transparent',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {df.label}
              </button>
            ))}
          </div>

          {/* Reset Filters button */}
          {(searchQuery || selectedCategory !== 'all' || selectedDifficulty !== 'all' || selectedStatus !== 'all') && (
            <button
              onClick={onResetFilters}
              className="btn btn-sm btn-secondary"
              style={{ borderRadius: 'var(--radius-full)', padding: '4px 10px', fontSize: '11px' }}
              title="Reset all filters"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* 3. Categories Quick-Pills Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        overflowX: 'auto',
        paddingBottom: '4px'
      }}>
        <button
          onClick={() => onSelectCategory('all')}
          style={{
            fontSize: '12px',
            fontWeight: selectedCategory === 'all' ? 700 : 500,
            color: selectedCategory === 'all' ? '#fff' : 'var(--text-secondary)',
            backgroundColor: selectedCategory === 'all' ? 'var(--primary-500)' : 'var(--surface-raised)',
            border: selectedCategory === 'all' ? '1px solid var(--primary-500)' : '1px solid var(--border-default)',
            padding: '5px 14px',
            borderRadius: 'var(--radius-full)',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all var(--transition-fast)'
          }}
        >
          All Topics (75)
        </button>

        {BLIND75_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            style={{
              fontSize: '12px',
              fontWeight: selectedCategory === cat ? 700 : 500,
              color: selectedCategory === cat ? 'var(--primary-400)' : 'var(--text-secondary)',
              backgroundColor: selectedCategory === cat ? 'var(--primary-surface)' : 'var(--surface-raised)',
              border: selectedCategory === cat ? '1px solid var(--primary-500)' : '1px solid var(--border-default)',
              padding: '5px 14px',
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all var(--transition-fast)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};
