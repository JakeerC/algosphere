import { useState, FC, useEffect } from 'react';
import { 
  X, 
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
  HelpCircle,
  Eye,
  EyeOff,
  ArrowUpRight
} from 'lucide-react';
import { Blind75Problem, UserProblemState } from '../../types/blind75';
import { Blind75VisualizerEngine } from './Blind75VisualizerEngine';

interface Blind75DetailModalProps {
  problem: Blind75Problem | null;
  allProblems: Blind75Problem[];
  userState?: UserProblemState;
  onClose: () => void;
  onToggleComplete: (id: string) => void;
  onToggleStar: (id: string) => void;
  onSaveNotes: (id: string, notes: string) => void;
  onSelectProblem: (problem: Blind75Problem) => void;
}

type TabType = 'problem' | 'visualizer' | 'python' | 'pseudocode' | 'analysis' | 'notes';

export const Blind75DetailModal: FC<Blind75DetailModalProps> = ({
  problem,
  allProblems,
  userState,
  onClose,
  onToggleComplete,
  onToggleStar,
  onSaveNotes,
  onSelectProblem
}) => {
  // Always default to 'problem' (Question First without solution)
  const [activeTab, setActiveTab] = useState<TabType>('problem');
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedPseudo, setCopiedPseudo] = useState(false);
  const [notesText, setNotesText] = useState(userState?.notes || '');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    setActiveTab('problem');
    setShowHint(false);
    setNotesText(userState?.notes || '');
  }, [userState?.notes, problem?.id]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (problem) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [problem]);

  // Keyboard shortcut listener for Escape
  useEffect(() => {
    if (!problem) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [problem, onClose]);

  if (!problem) return null;

  const isCompleted = !!userState?.completed;
  const isStarred = !!userState?.starred;

  const currentIndex = allProblems.findIndex(p => p.id === problem.id);
  const prevProblem = currentIndex > 0 ? allProblems[currentIndex - 1] : null;
  const nextProblem = currentIndex < allProblems.length - 1 ? allProblems[currentIndex + 1] : null;

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

  const handleNotesChange = (text: string) => {
    setNotesText(text);
    onSaveNotes(problem.id, text);
  };

  const steps = problem.generateSteps();

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

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      backgroundColor: 'hsla(222, 47%, 4%, 0.82)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-3)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '1080px',
        maxHeight: '92vh',
        backgroundColor: 'var(--surface-raised)',
        border: 'var(--border-1) solid var(--border-default)',
        borderRadius: 'var(--radius-2xl)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'var(--shadow-xl)',
        overflow: 'hidden'
      }}>
        {/* 1. Modal Header */}
        <div style={{
          padding: 'var(--space-4) var(--space-6)',
          borderBottom: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--surface-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3)'
        }}>
          {/* Left Title Info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
            <button
              onClick={() => onToggleComplete(problem.id)}
              className="btn btn-sm btn-secondary"
              style={{
                borderRadius: 'var(--radius-full)',
                padding: '6px 12px',
                color: isCompleted ? 'var(--success-500)' : 'var(--text-secondary)'
              }}
              title={isCompleted ? 'Mark as Incomplete' : 'Mark as Solved'}
            >
              {isCompleted ? <CheckCircle2 size={16} /> : <Circle size={16} />}
              <span>{isCompleted ? 'Solved' : 'Mark Solved'}</span>
            </button>

            <button
              onClick={() => onToggleStar(problem.id)}
              style={{
                color: isStarred ? '#f59e0b' : 'var(--text-tertiary)',
                padding: '6px',
                display: 'inline-flex',
                alignItems: 'center',
                cursor: 'pointer'
              }}
              title={isStarred ? 'Unstar' : 'Star this question'}
            >
              <Star size={18} fill={isStarred ? '#f59e0b' : 'none'} />
            </button>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '11px',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  color: 'var(--text-tertiary)'
                }}>
                  LeetCode #{problem.number}
                </span>
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
                <span style={{
                  fontSize: '11px',
                  color: 'var(--primary-400)',
                  backgroundColor: 'var(--surface-subtle)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border-subtle)'
                }}>
                  {problem.category}
                </span>
                <span style={{
                  fontSize: '11px',
                  color: 'var(--text-tertiary)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  Grind Week {problem.grindWeek}
                </span>
              </div>

              <h2 style={{ fontSize: 'var(--text-xl)', margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>{problem.title}</span>
                <a
                  href={problem.leetcodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--text-tertiary)', display: 'inline-flex' }}
                  title="View on LeetCode"
                >
                  <ExternalLink size={15} />
                </a>
              </h2>
            </div>
          </div>

          {/* Right Controls: Open in Full Tab + Close Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href={`/mastery/${problem.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-secondary"
              style={{ borderRadius: 'var(--radius-full)', padding: '5px 12px', gap: '5px', fontSize: '11px' }}
              title="Open problem in dedicated page and new tab"
            >
              <span>Full Page</span>
              <ArrowUpRight size={13} />
            </a>

            <button
              onClick={onClose}
              style={{
                padding: '6px',
                borderRadius: 'var(--radius-full)',
                color: 'var(--text-secondary)',
                cursor: 'pointer'
              }}
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* 2. Navigation Tabs Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '6px var(--space-6)',
          backgroundColor: 'var(--surface-raised)',
          borderBottom: '1px solid var(--border-subtle)',
          overflowX: 'auto'
        }}>
          {[
            { id: 'problem' as TabType, label: 'Question (Problem)', icon: <HelpCircle size={14} /> },
            { id: 'visualizer' as TabType, label: 'Interactive Visualizer', icon: <Sparkles size={14} /> },
            { id: 'python' as TabType, label: 'Python 3 Solution', icon: <Code2 size={14} /> },
            { id: 'pseudocode' as TabType, label: 'Pseudocode Tracer', icon: <FileText size={14} /> },
            { id: 'analysis' as TabType, label: 'Deep Analysis & Invariants', icon: <Lightbulb size={14} /> },
            { id: 'notes' as TabType, label: `Personal Notes ${notesText ? '•' : ''}`, icon: <BookOpen size={14} /> }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  fontSize: 'var(--text-xs)',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--primary-400)' : 'var(--text-secondary)',
                  backgroundColor: isActive ? 'var(--primary-surface)' : 'transparent',
                  border: isActive ? '1px solid var(--primary-border)' : '1px solid transparent',
                  borderRadius: 'var(--radius-full)',
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

        {/* 3. Modal Body Content */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-4)'
        }}>
          {/* TAB 0: Question First (Problem Statement, Examples, Constraints) */}
          {activeTab === 'problem' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              {/* Problem Description Card */}
              <div style={{
                backgroundColor: 'var(--surface-subtle)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-xl)',
                padding: 'var(--space-5)'
              }}>
                <h3 style={{ fontSize: 'var(--text-base)', color: 'var(--text-primary)', marginBottom: 'var(--space-3)' }}>
                  Problem Statement
                </h3>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {problem.description}
                </div>
              </div>

              {/* Examples Grid */}
              <div>
                <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                  Examples
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
                  {problem.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: 'var(--surface-subtle)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--space-3)',
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

              {/* Constraints */}
              {problem.constraints && problem.constraints.length > 0 && (
                <div style={{
                  backgroundColor: 'var(--surface-subtle)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-4)'
                }}>
                  <h4 style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                    Constraints
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: 'var(--space-4)', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                    {problem.constraints.map((c, idx) => (
                      <li key={idx} style={{ fontFamily: 'var(--font-mono)' }}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Hint Spoiler Toggle */}
              <div style={{
                border: '1px dashed var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-3) var(--space-4)',
                backgroundColor: 'var(--surface-subtle)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    Need a clue without revealing the whole solution?
                  </span>
                  <button
                    onClick={() => setShowHint(prev => !prev)}
                    className="btn btn-sm btn-secondary"
                    style={{ borderRadius: 'var(--radius-full)', padding: '4px 10px', gap: '4px', fontSize: '11px' }}
                  >
                    {showHint ? <EyeOff size={12} /> : <Eye size={12} />}
                    <span>{showHint ? 'Hide Hint' : 'Reveal Hint'}</span>
                  </button>
                </div>
                {showHint && (
                  <p style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--primary-400)', lineHeight: 1.6, margin: 'var(--space-2) 0 0 0' }}>
                    💡 {problem.intuition}
                  </p>
                )}
              </div>

              {/* Solution Ready CTA */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--primary-surface)',
                border: '1px solid var(--primary-border)'
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--primary-400)' }}>
                    Ready to explore step-by-step visualizations and code?
                  </div>
                  <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                    Step through array pointers, sliding windows, and test Python solutions.
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    onClick={() => setActiveTab('visualizer')}
                    className="btn btn-sm btn-primary"
                    style={{ borderRadius: 'var(--radius-full)', gap: '6px' }}
                  >
                    <Sparkles size={14} />
                    <span>Launch Visualizer</span>
                  </button>
                  <a
                    href={`/mastery/${problem.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-secondary"
                    style={{ borderRadius: 'var(--radius-full)', gap: '6px' }}
                  >
                    <span>Full Page</span>
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'visualizer' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>
                {problem.summary}
              </div>
              <Blind75VisualizerEngine steps={steps} title={problem.title} />
            </div>
          )}

          {/* TAB 2: Python 3 Solution */}
          {activeTab === 'python' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {/* Complexities bar */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                  <span style={{
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--primary-400)',
                    backgroundColor: 'var(--surface-subtle)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    Time: {problem.timeComplexity.bigO}
                  </span>
                  <span style={{
                    fontSize: 'var(--text-xs)',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--success-500)',
                    backgroundColor: 'var(--surface-subtle)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--border-subtle)'
                  }}>
                    Space: {problem.spaceComplexity.bigO}
                  </span>
                </div>

                <button
                  onClick={handleCopyPython}
                  className="btn btn-sm btn-secondary"
                  style={{ borderRadius: 'var(--radius-full)', padding: '4px 12px' }}
                >
                  {copiedCode ? <Check size={13} color="var(--success-500)" /> : <Copy size={13} />}
                  <span>{copiedCode ? 'Copied Python Code' : 'Copy Solution'}</span>
                </button>
              </div>

              {/* Code Pre container */}
              <div style={{
                backgroundColor: 'var(--surface-canvas)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                overflowX: 'auto',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.2)'
              }}>
                <pre style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  <code>{problem.pythonSolution}</code>
                </pre>
              </div>

              {/* Explanation note */}
              <div style={{
                backgroundColor: 'var(--surface-subtle)',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-xs)',
                color: 'var(--text-secondary)',
                lineHeight: 1.6
              }}>
                <strong>Implementation Insight: </strong>
                {problem.intuition}
              </div>
            </div>
          )}

          {/* TAB 3: Pseudocode Tracer */}
          {activeTab === 'pseudocode' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  Language-agnostic algorithmic blueprint
                </span>
                <button
                  onClick={handleCopyPseudocode}
                  className="btn btn-sm btn-secondary"
                  style={{ borderRadius: 'var(--radius-full)', padding: '4px 12px' }}
                >
                  {copiedPseudo ? <Check size={13} color="var(--success-500)" /> : <Copy size={13} />}
                  <span>{copiedPseudo ? 'Copied' : 'Copy Pseudocode'}</span>
                </button>
              </div>

              <div style={{
                backgroundColor: 'var(--surface-canvas)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-3)',
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
                    <span style={{ color: 'var(--text-tertiary)', minWidth: '24px', userSelect: 'none' }}>
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

          {/* TAB 4: Deep Analysis & Invariants */}
          {activeTab === 'analysis' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              {/* Problem Description */}
              <div>
                <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                  Problem Description
                </h4>
                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                  {problem.description}
                </div>
              </div>

              {/* Examples */}
              <div>
                <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
                  Examples
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {problem.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: 'var(--surface-subtle)',
                        border: '1px solid var(--border-subtle)',
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--space-3)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--text-xs)',
                        lineHeight: 1.6
                      }}
                    >
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

              {/* Intuition & Strategic Breakthrough */}
              <div style={{
                backgroundColor: 'var(--primary-surface)',
                border: '1px solid var(--primary-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-2)' }}>
                  <Sparkles size={16} color="var(--primary-400)" />
                  <h4 style={{ fontSize: 'var(--text-sm)', color: 'var(--primary-400)', margin: 0 }}>
                    Intuition & Algorithmic Eureka
                  </h4>
                </div>
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', margin: 0, lineHeight: 1.7 }}>
                  {problem.intuition}
                </p>
              </div>

              {/* Complexity Analysis */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-3)' }}>
                {/* Time Complexity */}
                <div style={{
                  backgroundColor: 'var(--surface-subtle)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-1)' }}>
                    <Clock size={15} color="var(--primary-400)" />
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Time Complexity: {problem.timeComplexity.bigO}
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {problem.timeComplexity.explanation}
                  </p>
                </div>

                {/* Space Complexity */}
                <div style={{
                  backgroundColor: 'var(--surface-subtle)',
                  border: '1px solid var(--border-default)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-4)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: 'var(--space-1)' }}>
                    <Cpu size={15} color="var(--success-500)" />
                    <span style={{ fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--text-primary)' }}>
                      Space Complexity: {problem.spaceComplexity.bigO}
                    </span>
                  </div>
                  <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                    {problem.spaceComplexity.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Personal Notes */}
          {activeTab === 'notes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)' }}>
                  Personal interview reminders, tricky edge cases, and mnemonic notes (automatically saved to browser):
                </span>
                <span style={{ fontSize: '11px', color: 'var(--success-500)' }}>
                  Auto-saved
                </span>
              </div>

              <textarea
                value={notesText}
                onChange={e => handleNotesChange(e.target.value)}
                placeholder="Write your notes here... (e.g. Remember to watch out for negative numbers when calculating max product subarray, or dummy node initialization on linked list reversals)"
                rows={10}
                style={{
                  width: '100%',
                  padding: 'var(--space-4)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: 1.6,
                  borderRadius: 'var(--radius-lg)'
                }}
              />
            </div>
          )}
        </div>

        {/* 4. Modal Footer: Navigation between questions */}
        <div style={{
          padding: 'var(--space-3) var(--space-6)',
          borderTop: '1px solid var(--border-subtle)',
          backgroundColor: 'var(--surface-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {prevProblem ? (
            <button
              onClick={() => onSelectProblem(prevProblem)}
              className="btn btn-sm btn-secondary"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              <ChevronLeft size={15} />
              <span>Prev (#{prevProblem.number} {prevProblem.title})</span>
            </button>
          ) : <div />}

          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
            Problem {currentIndex + 1} of {allProblems.length}
          </span>

          {nextProblem ? (
            <button
              onClick={() => onSelectProblem(nextProblem)}
              className="btn btn-sm btn-secondary"
              style={{ borderRadius: 'var(--radius-full)' }}
            >
              <span>Next (#{nextProblem.number} {nextProblem.title})</span>
              <ChevronRight size={15} />
            </button>
          ) : <div />}
        </div>
      </div>
    </div>
  );
};
