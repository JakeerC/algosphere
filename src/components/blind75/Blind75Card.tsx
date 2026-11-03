import { FC } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Star, 
  ExternalLink, 
  Sparkles, 
  Clock, 
  ArrowRight
} from 'lucide-react';
import { Blind75Problem, UserProblemState } from '../../types/blind75';
import { Badge } from '../common/Badge';

interface Blind75CardProps {
  problem: Blind75Problem;
  userState?: UserProblemState;
  onToggleComplete: (id: string) => void;
  onToggleStar: (id: string) => void;
  onSelect: (problem: Blind75Problem) => void;
}

export const Blind75Card: FC<Blind75CardProps> = ({
  problem,
  userState,
  onToggleComplete,
  onToggleStar,
  onSelect
}) => {
  const isCompleted = !!userState?.completed;
  const isStarred = !!userState?.starred;

  const getDifficultyColor = () => {
    switch (problem.difficulty) {
      case 'Easy':
        return { color: 'var(--success-500)', bg: 'var(--success-surface)' };
      case 'Medium':
        return { color: 'var(--cat-sorting)', bg: 'var(--cat-sorting-surface)' };
      case 'Hard':
        return { color: 'var(--danger-500)', bg: 'var(--danger-surface)' };
    }
  };

  const getCategoryColor = () => {
    switch (problem.category) {
      case 'Array':
        return 'var(--primary-500)';
      case 'Dynamic Programming':
        return 'var(--cat-dp)';
      case 'Graph':
        return 'var(--cat-graphs)';
      case 'Interval':
        return 'var(--cat-sorting)';
      case 'Linked List':
        return 'var(--cat-linear)';
      case 'Tree':
      case 'Heap':
        return 'var(--cat-trees)';
      default:
        return 'var(--primary-500)';
    }
  };

  const diffTheme = getDifficultyColor();
  const catColor = getCategoryColor();

  return (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: isCompleted ? 'var(--surface-subtle)' : 'var(--surface-card)',
        border: isCompleted ? '1px solid var(--border-subtle)' : '1px solid var(--border-default)',
        transition: 'all var(--transition-fast)',
        position: 'relative',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      <div>
        {/* Top Header: Checkbox + Star + LC# + External Link */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Complete Checkbox */}
            <button
              onClick={e => {
                e.stopPropagation();
                onToggleComplete(problem.id);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: isCompleted ? 'var(--success-500)' : 'var(--text-tertiary)',
                padding: '2px',
                cursor: 'pointer'
              }}
              title={isCompleted ? 'Mark as Incomplete' : 'Mark as Solved'}
            >
              {isCompleted ? <CheckCircle2 size={18} fill="var(--success-surface)" /> : <Circle size={18} />}
            </button>

            {/* Star Favorite */}
            <button
              onClick={e => {
                e.stopPropagation();
                onToggleStar(problem.id);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                color: isStarred ? '#f59e0b' : 'var(--text-tertiary)',
                padding: '2px',
                cursor: 'pointer'
              }}
              title={isStarred ? 'Unstar' : 'Star problem'}
            >
              <Star size={17} fill={isStarred ? '#f59e0b' : 'none'} />
            </button>

            <span style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-tertiary)',
              fontWeight: 700
            }}>
              #{problem.number}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {/* Grind 75 Week pill */}
            <span style={{
              fontSize: '10px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-tertiary)',
              backgroundColor: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
              padding: '2px 7px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Clock size={10} />
              W{problem.grindWeek} • {problem.estimatedMinutes}m
            </span>

            {/* LeetCode External Link */}
            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{ color: 'var(--text-tertiary)', display: 'inline-flex', padding: '2px' }}
              title="Open on LeetCode"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onSelect(problem)}
          style={{
            fontSize: 'var(--text-base)',
            margin: '0 0 var(--space-2) 0',
            cursor: 'pointer',
            lineHeight: 1.35,
            color: isCompleted ? 'var(--text-secondary)' : 'var(--text-primary)',
            textDecoration: isCompleted ? 'line-through' : 'none'
          }}
        >
          {problem.title}
        </h3>

        {/* Summary */}
        <p style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--text-tertiary)',
          lineHeight: 1.5,
          margin: '0 0 var(--space-3) 0',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {problem.summary}
        </p>

        {/* Tags Row: Category, Pattern, Difficulty */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-4)' }}>
          {/* Category */}
          <span style={{
            fontSize: '11px',
            fontWeight: 600,
            color: catColor,
            backgroundColor: 'var(--surface-subtle)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)'
          }}>
            {problem.category}
          </span>

          {/* Difficulty */}
          <span style={{
            fontSize: '11px',
            fontWeight: 700,
            color: diffTheme.color,
            backgroundColor: diffTheme.bg,
            padding: '2px 8px',
            borderRadius: 'var(--radius-full)'
          }}>
            {problem.difficulty}
          </span>

          {/* Pattern */}
          <span style={{
            fontSize: '10px',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-secondary)',
            backgroundColor: 'var(--surface-subtle)',
            padding: '2px 7px',
            borderRadius: 'var(--radius-full)'
          }}>
            {problem.pattern}
          </span>
        </div>
      </div>

      {/* Action Button: Solve & Visualize */}
      <button
        onClick={() => onSelect(problem)}
        className="btn btn-sm btn-secondary"
        style={{
          width: '100%',
          justifyContent: 'space-between',
          borderRadius: 'var(--radius-full)',
          padding: '6px 14px',
          fontSize: 'var(--text-xs)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={13} color="var(--primary-400)" />
          <span>Interactive Solution</span>
        </div>
        <ArrowRight size={13} />
      </button>
    </div>
  );
};
