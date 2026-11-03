import { useState, useEffect, FC } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Circle, 
  Star, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Code2, 
  FileText, 
  Lightbulb, 
  BookOpen, 
  Clock, 
  Cpu, 
  Flame,
  ArrowUpRight
} from 'lucide-react';
import { 
  ALL_BLIND75_PROBLEMS, 
  getBlind75ProblemById 
} from '../data/blind75';
import { UserProgressMap, UserProblemState } from '../types/blind75';
import { Blind75VisualizerEngine } from '../components/blind75/Blind75VisualizerEngine';
import { Badge } from '../components/common/Badge';

type TabType = 'visualizer' | 'python' | 'pseudocode' | 'analysis' | 'notes';

export const Blind75ProblemPage: FC = () => {
  const { problemId } = useParams<{ problemId: string }>();
  const navigate = useNavigate();

  const problem = problemId ? getBlind75ProblemById(problemId) : undefined;

  // Active Tab
  const [activeTab, setActiveTab] = useState<TabType>('visualizer');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPseudo, setCopiedPseudo] = useState(false);

  // User Progress from localStorage
  const [userProgress, setUserProgress] = useState<UserProgressMap>(() => {
    try {
      const saved = localStorage.getItem('algosphere-blind75-progress');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [notesText, setNotesText] = useState('');

  // Sync notes when problem loads
  useEffect(() => {
    if (problem) {
      setNotesText(userProgress[problem.id]?.notes || '');
      // Update page title
      document.title = `#${problem.number} ${problem.title} | Blind 75 Visualizer - AlgoSphere`;
    }
    return () => {
      document.title = 'AlgoSphere - Interactive Algorithm Visualizer';
    };
  }, [problem?.id, userProgress]);

  // Persist progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('algosphere-blind75-progress', JSON.stringify(userProgress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [userProgress]);

  if (!problem) {
    return (
      <div className="container" style={{ padding: 'var(--space-10) var(--space-4)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-3)' }}>Problem Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
          Could not find Blind 75 question "{problemId}".
        </p>
        <Link to="/blind75" className="btn btn-primary">
          <ArrowLeft size={16} />
          <span>Return to Blind 75 Catalog</span>
        </Link>
      </div>
    );
  }

  const userState: UserProblemState = userProgress[problem.id] || {
    completed: false,
    starred: false,
    notes: ''
  };

  const isCompleted = userState.completed;
  const isStarred = userState.starred;

  const currentIndex = ALL_BLIND75_PROBLEMS.findIndex(p => p.id === problem.id);
  const prevProblem = currentIndex > 0 ? ALL_BLIND75_PROBLEMS[currentIndex - 1] : null;
  const nextProblem = currentIndex < ALL_BLIND75_PROBLEMS.length - 1 ? ALL_BLIND75_PROBLEMS[currentIndex + 1] : null;

  const handleToggleComplete = () => {
    const nextCompleted = !isCompleted;
    if (nextCompleted) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch {
        // ignore
      }
    }
    setUserProgress(prev => ({
      ...prev,
      [problem.id]: {
        ...userState,
        completed: nextCompleted,
        completedAt: nextCompleted ? new Date().toISOString() : undefined
      }
    }));
  };

  const handleToggleStar = () => {
    setUserProgress(prev => ({
      ...prev,
      [problem.id]: {
        ...userState,
        starred: !isStarred
      }
    }));
  };

  const handleNotesChange = (text: string) => {
    setNotesText(text);
    setUserProgress(prev => ({
      ...prev,
      [problem.id]: {
        ...userState,
        notes: text
      }
    }));
  };

  const handleCopyPython = () => {
    navigator.clipboard.writeText(problem.pythonSolution);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyPseudocode = () => {
    navigator.clipboard.writeText(problem.pseudocode.join('\n'));
    setCopiedPseudo(true);
    setTimeout(() => setCopiedPseudo(false), 2000);
  };

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

  const diffTheme = getDifficultyColor();
  const steps = problem.generateSteps();

  return (
    <div className="container" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-5)',
      paddingBottom: 'var(--space-12)'
    }}>
      {/* 1. Breadcrumbs & Top Quick Navigation Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-3)',
        paddingTop: 'var(--space-3)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 'var(--space-3)'
      }}>
        {/* Left: Back Link & Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <Link
            to="/blind75"
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: 'var(--radius-full)', padding: '6px 14px', gap: '6px' }}
          >
            <ArrowLeft size={15} />
            <span>All Blind 75 Questions</span>
          </Link>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)'
          }}>
            <Link to="/" style={{ color: 'var(--text-secondary)' }}>Home</Link>
            <span>/</span>
            <Link to="/blind75" style={{ color: 'var(--text-secondary)' }}>Blind 75</Link>
            <span>/</span>
            <span style={{ color: 'var(--primary-400)', fontWeight: 700 }}>
              #{problem.number} {problem.title}
            </span>
          </div>
        </div>

        {/* Right: Solved, Star, LeetCode button, Next/Prev */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {/* Mark Solved button */}
          <button
            onClick={handleToggleComplete}
            className="btn btn-sm btn-secondary"
            style={{
              borderRadius: 'var(--radius-full)',
              padding: '6px 14px',
              color: isCompleted ? 'var(--success-500)' : 'var(--text-secondary)',
              gap: '6px'
            }}
          >
            {isCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} />}
            <span>{isCompleted ? 'Solved' : 'Mark Solved'}</span>
          </button>

          {/* Star Bookmark */}
          <button
            onClick={handleToggleStar}
            className="btn btn-sm btn-secondary"
            style={{
              borderRadius: 'var(--radius-full)',
              padding: '6px 12px',
              color: isStarred ? '#f59e0b' : 'var(--text-secondary)',
              gap: '6px'
            }}
            title={isStarred ? 'Unstar' : 'Bookmark question'}
          >
            <Star size={16} fill={isStarred ? '#f59e0b' : 'none'} />
            <span>{isStarred ? 'Starred' : 'Star'}</span>
          </button>

          {/* Official LeetCode Link */}
          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-secondary"
            style={{ borderRadius: 'var(--radius-full)', padding: '6px 14px', gap: '6px' }}
            title="Open on LeetCode in new tab"
          >
            <span>LeetCode #{problem.number}</span>
            <ExternalLink size={13} />
          </a>

          {/* Prev/Next Problem Shortcuts */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: 'var(--space-2)' }}>
            {prevProblem && (
              <Link
                to={`/blind75/${prevProblem.id}`}
                className="btn btn-sm btn-secondary"
                style={{ borderRadius: 'var(--radius-full)', padding: '6px 10px' }}
                title={`Previous: #${prevProblem.number} ${prevProblem.title}`}
              >
                <ChevronLeft size={16} />
              </Link>
            )}

            {nextProblem && (
              <Link
                to={`/blind75/${nextProblem.id}`}
                className="btn btn-sm btn-secondary"
                style={{ borderRadius: 'var(--radius-full)', padding: '6px 10px' }}
                title={`Next: #${nextProblem.number} ${nextProblem.title}`}
              >
                <ChevronRight size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. Problem Title & Metadata Banner */}
      <div style={{
        backgroundColor: 'var(--surface-raised)',
        border: 'var(--border-1) solid var(--border-default)',
        borderRadius: 'var(--radius-2xl)',
        padding: 'var(--space-5) var(--space-6)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div>
          {/* Metadata Badges Row */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              color: '#fff',
              backgroundColor: 'var(--danger-500)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)'
            }}>
              <Flame size={12} />
              Blind 75 #{problem.number}
            </span>

            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              color: diffTheme.color,
              backgroundColor: diffTheme.bg,
              padding: '2px 9px',
              borderRadius: 'var(--radius-full)'
            }}>
              {problem.difficulty}
            </span>

            <span style={{
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--primary-400)',
              backgroundColor: 'var(--primary-surface)',
              padding: '2px 9px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid var(--primary-border)'
            }}>
              {problem.category}
            </span>

            <span style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
              padding: '2px 9px',
              borderRadius: 'var(--radius-full)'
            }}>
              Pattern: {problem.pattern}
            </span>

            <span style={{
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-tertiary)',
              backgroundColor: 'var(--surface-subtle)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <Clock size={11} />
              Grind Week {problem.grindWeek} • {problem.estimatedMinutes} mins
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
            margin: '0 0 var(--space-1) 0',
            lineHeight: 1.2
          }}>
            {problem.title}
          </h1>

          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--text-secondary)',
            margin: 0,
            maxWidth: '85ch',
            lineHeight: 1.6
          }}>
            {problem.summary}
          </p>
        </div>

        {/* Complexity Badges */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          backgroundColor: 'var(--surface-subtle)',
          padding: 'var(--space-3) var(--space-4)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border-subtle)',
          minWidth: '220px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>Time Complexity:</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--primary-400)' }}>
              {problem.timeComplexity.bigO}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 'var(--text-xs)' }}>
            <span style={{ color: 'var(--text-tertiary)' }}>Space Complexity:</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--success-500)' }}>
              {problem.spaceComplexity.bigO}
            </span>
          </div>
        </div>
      </div>

      {/* 3. Workspace Navigation Tabs */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        backgroundColor: 'var(--surface-subtle)',
        padding: '6px',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-subtle)',
        overflowX: 'auto'
      }}>
        {[
          { id: 'visualizer' as TabType, label: 'Interactive Canvas Visualizer', icon: <Sparkles size={15} /> },
          { id: 'python' as TabType, label: 'Python 3 Solution', icon: <Code2 size={15} /> },
          { id: 'pseudocode' as TabType, label: 'Pseudocode Tracer', icon: <FileText size={15} /> },
          { id: 'analysis' as TabType, label: 'Deep Analysis & Big-O Proofs', icon: <Lightbulb size={15} /> },
          { id: 'notes' as TabType, label: `Personal Notes ${notesText ? '•' : ''}`, icon: <BookOpen size={15} /> }
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                fontSize: 'var(--text-xs)',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--primary-400)' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--surface-raised)' : 'transparent',
                border: isActive ? '1px solid var(--border-default)' : '1px solid transparent',
                borderRadius: 'var(--radius-full)',
                boxShadow: isActive ? 'var(--shadow-xs)' : 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all var(--transition-fast)'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Tab Content Body */}
      <div style={{ minHeight: '480px' }}>
        {/* TAB 1: Visualizer Canvas */}
        {activeTab === 'visualizer' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <Blind75VisualizerEngine steps={steps} title={problem.title} />
          </div>
        )}

        {/* TAB 2: Python 3 Solution */}
        {activeTab === 'python' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            backgroundColor: 'var(--surface-raised)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              <div>
                <h3 style={{ fontSize: 'var(--text-base)', margin: '0 0 2px 0' }}>Optimal Python 3 Implementation</h3>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  Clean, production-grade, fully commented with type annotations
                </div>
              </div>

              <button
                onClick={handleCopyPython}
                className="btn btn-sm btn-secondary"
                style={{ borderRadius: 'var(--radius-full)', padding: '6px 14px', gap: '6px' }}
              >
                {copiedCode ? <Check size={14} color="var(--success-500)" /> : <Copy size={14} />}
                <span>{copiedCode ? 'Copied Python Code!' : 'Copy Code'}</span>
              </button>
            </div>

            {/* Code Pre Box */}
            <div style={{
              backgroundColor: 'var(--surface-canvas)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
              overflowX: 'auto',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
            }}>
              <pre style={{
                margin: 0,
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-primary)',
                lineHeight: 1.6
              }}>
                <code>{problem.pythonSolution}</code>
              </pre>
            </div>

            {/* Implementation Strategy Note */}
            <div style={{
              backgroundColor: 'var(--surface-subtle)',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
              fontSize: 'var(--text-sm)',
              color: 'var(--text-secondary)',
              lineHeight: 1.7
            }}>
              <strong style={{ color: 'var(--text-primary)' }}>Implementation Strategy: </strong>
              {problem.intuition}
            </div>
          </div>
        )}

        {/* TAB 3: Pseudocode Tracer */}
        {activeTab === 'pseudocode' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            backgroundColor: 'var(--surface-raised)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: 'var(--text-base)', margin: '0 0 2px 0' }}>Pseudocode Algorithm Blueprint</h3>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  Language-agnostic structured logic for whiteboarding and interview explanations
                </div>
              </div>

              <button
                onClick={handleCopyPseudocode}
                className="btn btn-sm btn-secondary"
                style={{ borderRadius: 'var(--radius-full)', padding: '6px 14px', gap: '6px' }}
              >
                {copiedPseudo ? <Check size={14} color="var(--success-500)" /> : <Copy size={14} />}
                <span>{copiedPseudo ? 'Copied Pseudocode!' : 'Copy Pseudocode'}</span>
              </button>
            </div>

            <div style={{
              backgroundColor: 'var(--surface-canvas)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}>
              {problem.pseudocode.map((line, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 'var(--space-3)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                    lineHeight: 1.6
                  }}
                >
                  <span style={{ color: 'var(--text-tertiary)', minWidth: '28px', userSelect: 'none' }}>
                    {idx + 1}
                  </span>
                  <span style={{ color: 'var(--text-primary)', whiteSpace: 'pre' }}>
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: Deep Analysis & Mathematical Proofs */}
        {activeTab === 'analysis' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
            backgroundColor: 'var(--surface-raised)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6)'
          }}>
            {/* Full Problem Description */}
            <div>
              <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>Problem Statement</h3>
              <div style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75,
                whiteSpace: 'pre-line'
              }}>
                {problem.description}
              </div>
            </div>

            {/* Test Examples */}
            <div>
              <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)' }}>Input & Output Examples</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-3)' }}>
                {problem.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: 'var(--surface-subtle)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-lg)',
                      padding: 'var(--space-3) var(--space-4)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'var(--text-xs)',
                      lineHeight: 1.6
                    }}
                  >
                    <div style={{ color: 'var(--text-tertiary)', marginBottom: '4px', fontWeight: 'bold' }}>
                      Example {idx + 1}
                    </div>
                    <div><strong style={{ color: 'var(--primary-400)' }}>Input:</strong> {ex.input}</div>
                    <div><strong style={{ color: 'var(--success-500)' }}>Output:</strong> {ex.output}</div>
                    {ex.explanation && (
                      <div style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
                        <em>Explanation:</em> {ex.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Intuition & Algorithmic Eureka */}
            <div style={{
              backgroundColor: 'var(--primary-surface)',
              border: '1px solid var(--primary-border)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-5)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
                <Sparkles size={18} color="var(--primary-400)" />
                <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--primary-400)', margin: 0 }}>
                  Algorithmic Intuition & Core Invariant
                </h3>
              </div>
              <p style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-primary)',
                margin: 0,
                lineHeight: 1.75
              }}>
                {problem.intuition}
              </p>
            </div>

            {/* Constraints */}
            <div>
              <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-2)' }}>Constraints & Edge Cases</h3>
              <ul style={{
                paddingLeft: 'var(--space-4)',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                lineHeight: 1.75
              }}>
                {problem.constraints.map((c, i) => (
                  <li key={i}>
                    <code>{c}</code>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mathematical Complexity Proofs */}
            <div>
              <h3 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)' }}>Complexity Breakdown</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-4)' }}>
                {/* Time */}
                <div style={{
                  backgroundColor: 'var(--surface-subtle)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-4) var(--space-5)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
                    <Clock size={16} color="var(--primary-400)" />
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                      Time Complexity: {problem.timeComplexity.bigO}
                    </strong>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                    {problem.timeComplexity.explanation}
                  </p>
                </div>

                {/* Space */}
                <div style={{
                  backgroundColor: 'var(--surface-subtle)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'var(--space-4) var(--space-5)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: 'var(--space-2)' }}>
                    <Cpu size={16} color="var(--success-500)" />
                    <strong style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                      Space Complexity: {problem.spaceComplexity.bigO}
                    </strong>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                    {problem.spaceComplexity.explanation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: Personal Notes */}
        {activeTab === 'notes' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            backgroundColor: 'var(--surface-raised)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-5)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: 'var(--text-base)', margin: '0 0 2px 0' }}>Personal Interview Prep Notes</h3>
                <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  Save your own observations, tricky corner cases, and interview reminders (persisted locally)
                </div>
              </div>
              <span style={{ fontSize: '11px', color: 'var(--success-500)', fontWeight: 600 }}>
                ✓ Automatically saved
              </span>
            </div>

            <textarea
              value={notesText}
              onChange={e => handleNotesChange(e.target.value)}
              placeholder="Write your notes here... (e.g. Always check whether array can be empty, watch out for integer overflow, remember prefix-sum trick)"
              rows={12}
              style={{
                width: '100%',
                padding: 'var(--space-4)',
                fontSize: 'var(--text-sm)',
                lineHeight: 1.7,
                borderRadius: 'var(--radius-lg)'
              }}
            />
          </div>
        )}
      </div>

      {/* 5. Bottom Navigation Bar between questions */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-4) var(--space-5)',
        backgroundColor: 'var(--surface-raised)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-xl)',
        marginTop: 'var(--space-4)'
      }}>
        {prevProblem ? (
          <Link
            to={`/blind75/${prevProblem.id}`}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: 'var(--radius-full)', padding: '8px 16px', gap: '6px' }}
          >
            <ChevronLeft size={16} />
            <span>Prev: #{prevProblem.number} {prevProblem.title}</span>
          </Link>
        ) : <div />}

        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
          Problem {currentIndex + 1} of {ALL_BLIND75_PROBLEMS.length}
        </div>

        {nextProblem ? (
          <Link
            to={`/blind75/${nextProblem.id}`}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: 'var(--radius-full)', padding: '8px 16px', gap: '6px' }}
          >
            <span>Next: #{nextProblem.number} {nextProblem.title}</span>
            <ChevronRight size={16} />
          </Link>
        ) : <div />}
      </div>
    </div>
  );
};
