import { useState, useEffect, useMemo, FC } from 'react';
import confetti from 'canvas-confetti';
import { 
  ALL_BLIND75_PROBLEMS, 
  BLIND75_CATEGORIES, 
  calculateBlind75Stats 
} from '../data/blind75';
import { 
  Blind75Problem, 
  Blind75Category, 
  UserProgressMap, 
  Grind75ScheduleConfig 
} from '../types/blind75';
import { Blind75StatsHeader } from '../components/blind75/Blind75StatsHeader';
import { Grind75Scheduler } from '../components/blind75/Grind75Scheduler';
import { Blind75Card } from '../components/blind75/Blind75Card';
import { Calendar, Layers, CheckCircle2 } from 'lucide-react';

export const Blind75Page: FC = () => {
  // 1. Persistent User Progress State
  const [userProgress, setUserProgress] = useState<UserProgressMap>(() => {
    try {
      const saved = localStorage.getItem('algosphere-blind75-progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 2. Persistent Grind 75 Schedule Config
  const [scheduleConfig, setScheduleConfig] = useState<Grind75ScheduleConfig>(() => {
    try {
      const saved = localStorage.getItem('algosphere-grind75-config');
      return saved ? JSON.parse(saved) : { weeks: 12, hoursPerWeek: 4, groupBy: 'topic' };
    } catch {
      return { weeks: 12, hoursPerWeek: 4, groupBy: 'topic' };
    }
  });

  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Persist progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('algosphere-blind75-progress', JSON.stringify(userProgress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [userProgress]);

  // Persist schedule config
  useEffect(() => {
    try {
      localStorage.setItem('algosphere-grind75-config', JSON.stringify(scheduleConfig));
    } catch (e) {
      console.error('Failed to save config to localStorage', e);
    }
  }, [scheduleConfig]);

  // Handle Mark Solved
  const handleToggleComplete = (id: string) => {
    setUserProgress(prev => {
      const current = prev[id] || { completed: false, starred: false, notes: '' };
      const nextCompleted = !current.completed;
      
      // If newly completed, trigger confetti!
      if (nextCompleted) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 }
          });
        } catch {
          // Ignore confetti if not supported
        }
      }

      return {
        ...prev,
        [id]: {
          ...current,
          completed: nextCompleted,
          completedAt: nextCompleted ? new Date().toISOString() : undefined
        }
      };
    });
  };

  // Handle Star
  const handleToggleStar = (id: string) => {
    setUserProgress(prev => {
      const current = prev[id] || { completed: false, starred: false, notes: '' };
      return {
        ...prev,
        [id]: {
          ...current,
          starred: !current.starred
        }
      };
    });
  };

  // Select problem to open in a new tab and dedicated page
  const handleSelectProblem = (problem: Blind75Problem) => {
    window.open(`/mastery/${problem.id}`, '_blank');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedDifficulty('all');
    setSelectedStatus('all');
  };

  // Calculate live statistics
  const stats = useMemo(() => calculateBlind75Stats(userProgress), [userProgress]);

  // Filtered problems list
  const filteredProblems = useMemo(() => {
    return ALL_BLIND75_PROBLEMS.filter(p => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesQuery = 
          p.title.toLowerCase().includes(q) ||
          String(p.number).includes(q) ||
          p.pattern.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q);
        if (!matchesQuery) return false;
      }

      // 2. Category
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // 3. Difficulty
      if (selectedDifficulty !== 'all' && p.difficulty !== selectedDifficulty) {
        return false;
      }

      // 4. Status
      const state = userProgress[p.id];
      if (selectedStatus === 'completed' && !state?.completed) return false;
      if (selectedStatus === 'todo' && state?.completed) return false;
      if (selectedStatus === 'starred' && !state?.starred) return false;

      return true;
    });
  }, [searchQuery, selectedCategory, selectedDifficulty, selectedStatus, userProgress]);

  // Group by logic: 'topic' or 'week'
  const groups = useMemo(() => {
    if (scheduleConfig.groupBy === 'topic') {
      const topicGroups: { title: string; category?: Blind75Category; problems: Blind75Problem[] }[] = [];
      for (const cat of BLIND75_CATEGORIES) {
        const catProbs = filteredProblems.filter(p => p.category === cat);
        if (catProbs.length > 0) {
          topicGroups.push({
            title: cat,
            category: cat,
            problems: catProbs
          });
        }
      }
      return topicGroups;
    } else {
      // Group by Grind 75 Week (1 to 12)
      const weekGroups: { title: string; weekNum: number; problems: Blind75Problem[] }[] = [];
      const maxWeeks = scheduleConfig.weeks;

      for (let w = 1; w <= 12; w++) {
        // Map original 12 weeks to user config weeks
        const weekProbs = filteredProblems.filter(p => p.grindWeek === w);
        if (weekProbs.length > 0) {
          weekGroups.push({
            title: `Week ${w} Curriculum`,
            weekNum: w,
            problems: weekProbs
          });
        }
      }
      return weekGroups;
    }
  }, [scheduleConfig.groupBy, scheduleConfig.weeks, filteredProblems]);

  return (
    <div className="container" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)',
      paddingBottom: 'var(--space-12)'
    }}>
      {/* 1. Header & Quick Analytics Dashboard */}
      <Blind75StatsHeader
        stats={stats}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedDifficulty={selectedDifficulty}
        onSelectDifficulty={setSelectedDifficulty}
        selectedStatus={selectedStatus}
        onSelectStatus={setSelectedStatus}
        onResetFilters={handleResetFilters}
      />

      {/* 2. Grind 75 Adaptive Schedule Customizer */}
      <Grind75Scheduler
        config={scheduleConfig}
        onChangeConfig={setScheduleConfig}
        totalProblemsCount={ALL_BLIND75_PROBLEMS.length}
      />

      {/* 3. Filter Results Summary */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 'var(--space-2)'
      }}>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
          Showing <strong>{filteredProblems.length}</strong> of {ALL_BLIND75_PROBLEMS.length} Blind 75 questions
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
          {scheduleConfig.groupBy === 'topic' ? <Layers size={14} /> : <Calendar size={14} />}
          <span>Grouped by {scheduleConfig.groupBy === 'topic' ? 'Topics' : 'Grind 75 Schedule'}</span>
        </div>
      </div>

      {/* 4. Grouped Problem Sections */}
      {groups.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: 'var(--space-10) var(--space-4)',
          backgroundColor: 'var(--surface-subtle)',
          borderRadius: 'var(--radius-xl)',
          color: 'var(--text-secondary)'
        }}>
          <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>No questions matched your filters</h3>
          <p style={{ fontSize: 'var(--text-sm)', marginBottom: 'var(--space-4)' }}>Try broadening your search query or reset filters.</p>
          <button onClick={handleResetFilters} className="btn btn-sm btn-primary">
            Reset Filters
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
          {groups.map((group, gIdx) => {
            const completedInGroup = group.problems.filter(p => !!userProgress[p.id]?.completed).length;
            const isGroupDone = completedInGroup === group.problems.length && group.problems.length > 0;

            return (
              <div key={gIdx} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Group Header */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderBottom: '1px solid var(--border-subtle)',
                  paddingBottom: 'var(--space-2)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <h2 style={{ fontSize: 'var(--text-lg)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span>{group.title}</span>
                      {isGroupDone && (
                        <CheckCircle2 size={18} color="var(--success-500)" />
                      )}
                    </h2>
                    <span style={{
                      fontSize: '11px',
                      fontFamily: 'var(--font-mono)',
                      color: isGroupDone ? 'var(--success-500)' : 'var(--text-tertiary)',
                      backgroundColor: isGroupDone ? 'var(--success-surface)' : 'var(--surface-subtle)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)'
                    }}>
                      {completedInGroup} / {group.problems.length} solved
                    </span>
                  </div>
                </div>

                {/* Problems Card Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))',
                  gap: 'var(--space-4)'
                }}>
                  {group.problems.map(prob => (
                    <Blind75Card
                      key={prob.id}
                      problem={prob}
                      userState={userProgress[prob.id]}
                      onToggleComplete={handleToggleComplete}
                      onToggleStar={handleToggleStar}
                      onSelect={handleSelectProblem}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
