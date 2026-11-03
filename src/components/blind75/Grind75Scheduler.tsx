import { FC } from 'react';
import { Calendar, Clock, Layers, Sparkles } from 'lucide-react';
import { Grind75ScheduleConfig } from '../../types/blind75';

interface Grind75SchedulerProps {
  config: Grind75ScheduleConfig;
  onChangeConfig: (newConfig: Grind75ScheduleConfig) => void;
  totalProblemsCount: number;
}

export const Grind75Scheduler: FC<Grind75SchedulerProps> = ({
  config,
  onChangeConfig,
  totalProblemsCount
}) => {
  const totalHours = config.weeks * config.hoursPerWeek;
  const questionsPerWeek = Math.ceil(totalProblemsCount / config.weeks);

  return (
    <div
      className="card"
      style={{
        padding: 'var(--space-4) var(--space-5)',
        borderRadius: 'var(--radius-xl)',
        backgroundColor: 'var(--surface-raised)',
        border: 'var(--border-1) solid var(--border-default)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        boxShadow: 'var(--shadow-sm)'
      }}
    >
      {/* Top Banner: Grind 75 Schedule Engine Info */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-3)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 'var(--space-3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-full)',
            backgroundColor: 'var(--primary-surface)',
            border: '1px solid var(--primary-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--primary-400)'
          }}>
            <Calendar size={16} />
          </div>
          <div>
            <div style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: 'var(--text-primary)' }}>
              Grind 75 Dynamic Schedule
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
              Tailor your preparation timeframe based on hours per week & total weeks
            </div>
          </div>
        </div>

        {/* Schedule Metric Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)',
            backgroundColor: 'var(--surface-subtle)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)'
          }}>
            <Clock size={12} color="var(--primary-400)" />
            <span>{totalHours} Total Hours</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)',
            backgroundColor: 'var(--surface-subtle)',
            padding: '4px 10px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-secondary)'
          }}>
            <Sparkles size={12} color="var(--cat-sorting)" />
            <span>~{questionsPerWeek} Questions / Week</span>
          </div>
        </div>
      </div>

      {/* Controls Row: Weeks Slider, Hours Selector, Group By Toggle */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)'
      }}>
        {/* 1. Weeks Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Preparation Weeks: <strong style={{ color: 'var(--text-primary)' }}>{config.weeks} Weeks</strong>
          </span>
          <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--surface-subtle)', padding: '3px', borderRadius: 'var(--radius-full)' }}>
            {[4, 8, 12, 16, 24].map(w => (
              <button
                key={w}
                onClick={() => onChangeConfig({ ...config, weeks: w })}
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: config.weeks === w ? 700 : 500,
                  color: config.weeks === w ? 'var(--primary-400)' : 'var(--text-secondary)',
                  backgroundColor: config.weeks === w ? 'var(--surface-card)' : 'transparent',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: config.weeks === w ? '1px solid var(--border-default)' : 'none',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {w}w
              </button>
            ))}
          </div>
        </div>

        {/* 2. Hours Per Week Selector */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Hours Per Week: <strong style={{ color: 'var(--text-primary)' }}>{config.hoursPerWeek} Hours</strong>
          </span>
          <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--surface-subtle)', padding: '3px', borderRadius: 'var(--radius-full)' }}>
            {[2, 4, 8, 12, 16, 20].map(h => (
              <button
                key={h}
                onClick={() => onChangeConfig({ ...config, hoursPerWeek: h })}
                style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: config.hoursPerWeek === h ? 700 : 500,
                  color: config.hoursPerWeek === h ? 'var(--primary-400)' : 'var(--text-secondary)',
                  backgroundColor: config.hoursPerWeek === h ? 'var(--surface-card)' : 'transparent',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  border: config.hoursPerWeek === h ? '1px solid var(--border-default)' : 'none',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {h}h/wk
              </button>
            ))}
          </div>
        </div>

        {/* 3. Group By Toggle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Group Questions By:
          </span>
          <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--surface-subtle)', padding: '3px', borderRadius: 'var(--radius-full)' }}>
            <button
              onClick={() => onChangeConfig({ ...config, groupBy: 'topic' })}
              style={{
                fontSize: '11px',
                fontWeight: config.groupBy === 'topic' ? 700 : 500,
                color: config.groupBy === 'topic' ? 'var(--primary-400)' : 'var(--text-secondary)',
                backgroundColor: config.groupBy === 'topic' ? 'var(--surface-card)' : 'transparent',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                border: config.groupBy === 'topic' ? '1px solid var(--border-default)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer'
              }}
            >
              <Layers size={13} />
              <span>By Topic</span>
            </button>

            <button
              onClick={() => onChangeConfig({ ...config, groupBy: 'week' })}
              style={{
                fontSize: '11px',
                fontWeight: config.groupBy === 'week' ? 700 : 500,
                color: config.groupBy === 'week' ? 'var(--primary-400)' : 'var(--text-secondary)',
                backgroundColor: config.groupBy === 'week' ? 'var(--surface-card)' : 'transparent',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                border: config.groupBy === 'week' ? '1px solid var(--border-default)' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                cursor: 'pointer'
              }}
            >
              <Calendar size={13} />
              <span>By Week (Grind 75)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
