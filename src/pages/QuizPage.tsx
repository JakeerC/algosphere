import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Trophy, Flame, RotateCcw, CheckCircle2, XCircle, ArrowRight, Sparkles, Award } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { QuizCard } from '../components/quiz/QuizCard';
import { Badge } from '../components/common/Badge';
import { ScribbleSparkle, ScribbleUnderline } from '../components/common/ScribbleAccents';

export const QuizPage: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (isCorrect: boolean) => {
    setUserAnswers(prev => ({ ...prev, [currentIdx]: isCorrect }));
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsCompleted(true);
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.5 } });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setUserAnswers({});
    setIsCompleted(false);
  };

  const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);

  const getPerformanceBadge = () => {
    if (percentage >= 90) return { label: 'Algorithmic Grandmaster', variant: 'success' as const };
    if (percentage >= 70) return { label: 'Proficient DSA Solver', variant: 'primary' as const };
    if (percentage >= 50) return { label: 'Intermediate Practitioner', variant: 'warning' as const };
    return { label: 'Foundations Builder', variant: 'neutral' as const };
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-10)' }}>
      {/* Quiz Header */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        paddingTop: 'var(--space-3)',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: 'var(--space-4)'
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <Badge variant="primary" icon={<Trophy size={14} />}>Automated Online Judge</Badge>
            <ScribbleSparkle size={16} color="var(--primary-400)" />
          </div>
          <h1 style={{ fontSize: 'var(--text-3xl)', margin: 0, position: 'relative', display: 'inline-block' }}>
            DSA Knowledge & Execution Quiz
            <ScribbleUnderline color="var(--primary-400)" width={190} height={10} style={{ position: 'absolute', bottom: -6, right: 0 }} />
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
            Test your comprehension of algorithmic invariants, partition boundaries, tree balance, and asymptotic runtimes.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          {/* Live Score Counter */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            backgroundColor: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            padding: '6px 14px',
            borderRadius: 'var(--radius-full)',
            boxShadow: 'var(--shadow-sm)',
            fontSize: 'var(--text-xs)',
            fontFamily: 'var(--font-mono)'
          }}>
            <span style={{ color: 'var(--text-tertiary)' }}>Score:</span>
            <span style={{ color: 'var(--state-sorted)', fontWeight: 'bold' }}>{score}</span>
            <span style={{ color: 'var(--text-tertiary)' }}>/ {QUIZ_QUESTIONS.length}</span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            backgroundColor: 'var(--surface-card)',
            border: '1px solid var(--border-default)',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            boxShadow: 'var(--shadow-sm)'
          }}>
            <Flame size={16} color="hsl(38, 92%, 50%)" />
            <span style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-heavy)', color: 'var(--text-primary)' }}>
              Question {currentIdx + 1} / {QUIZ_QUESTIONS.length}
            </span>
          </div>

          <button
            onClick={handleRestart}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: 'var(--radius-full)', padding: '6px 16px' }}
          >
            <RotateCcw size={14} />
            <span>Restart</span>
          </button>
        </div>
      </div>

      {/* Quiz Card or Completion Screen */}
      {!isCompleted ? (
        <QuizCard
          question={QUIZ_QUESTIONS[currentIdx]}
          onNext={handleNext}
          onAnswer={handleAnswer}
          questionNumber={currentIdx + 1}
          totalQuestions={QUIZ_QUESTIONS.length}
        />
      ) : (
        <div className="card" style={{ maxWidth: '760px', margin: '0 auto', padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--state-sorted-bg)',
              border: '2px solid var(--state-sorted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--state-sorted)',
              margin: '0 auto var(--space-4) auto',
              boxShadow: '0 8px 24px -4px hsla(160, 84%, 39%, 0.35)'
            }}>
              <CheckCircle2 size={40} />
            </div>

            <div style={{ marginBottom: 'var(--space-2)' }}>
              <Badge variant={getPerformanceBadge().variant} icon={<Award size={14} />}>
                {getPerformanceBadge().label}
              </Badge>
            </div>

            <h2 style={{ fontSize: 'var(--text-3xl)', marginBottom: 'var(--space-2)' }}>
              Quiz Challenge Completed!
            </h2>
            <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.6 }}>
              You completed all {QUIZ_QUESTIONS.length} procedural algorithm questions with an accuracy of <strong>{percentage}%</strong>.
            </p>
          </div>

          {/* Performance Stats Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
            <div style={{ backgroundColor: 'var(--surface-subtle)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Final Score</div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: 'var(--primary-400)', marginTop: '4px' }}>
                {score} / {QUIZ_QUESTIONS.length}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--surface-subtle)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Accuracy</div>
              <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 'bold', color: percentage >= 70 ? 'var(--state-sorted)' : 'var(--state-inspect)', marginTop: '4px' }}>
                {percentage}%
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--surface-subtle)', padding: 'var(--space-4)', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid var(--border-subtle)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Mastery Tier</div>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'bold', color: 'var(--text-primary)', marginTop: '8px' }}>
                {getPerformanceBadge().label}
              </div>
            </div>
          </div>

          {/* Question Breakdown List */}
          <div>
            <h4 style={{ fontSize: 'var(--text-base)', marginBottom: 'var(--space-3)', color: 'var(--text-primary)' }}>
              Question Performance Breakdown:
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {QUIZ_QUESTIONS.map((q, idx) => {
                const isCorrect = userAnswers[idx] === true;
                return (
                  <div
                    key={q.id}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-3)',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--surface-subtle)',
                      border: `1px solid ${isCorrect ? 'var(--state-sorted)' : 'var(--border-default)'}`
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
                      {isCorrect ? (
                        <CheckCircle2 size={18} color="var(--state-sorted)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      ) : (
                        <XCircle size={18} color="var(--state-pivot)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      )}
                      <div>
                        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--weight-heavy)', color: 'var(--text-primary)' }}>
                          Q{idx + 1}: {q.title}
                        </div>
                        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          {q.explanation}
                        </div>
                      </div>
                    </div>
                    <span className={`badge ${isCorrect ? 'badge-success' : 'badge-danger'}`} style={{ fontSize: '10px' }}>
                      {isCorrect ? 'Correct' : 'Missed'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-3)' }}>
            <button
              onClick={handleRestart}
              className="btn btn-primary"
              style={{ borderRadius: 'var(--radius-full)', padding: '10px 24px' }}
            >
              <RotateCcw size={16} />
              <span>Take Quiz Again</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

