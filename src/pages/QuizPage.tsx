import React, { useState } from 'react';
import { Trophy, Flame, RotateCcw, CheckCircle2, ArrowRight, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizzes';
import { QuizCard } from '../components/quiz/QuizCard';
import { Badge } from '../components/common/Badge';
import { ScribbleSparkle, ScribbleUnderline } from '../components/common/ScribbleAccents';

export const QuizPage: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleNext = () => {
    if (currentIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScore(0);
    setIsCompleted(false);
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
          questionNumber={currentIdx + 1}
          totalQuestions={QUIZ_QUESTIONS.length}
        />
      ) : (
        <div className="card" style={{ maxWidth: '640px', margin: '0 auto', textAlign: 'center', padding: 'var(--space-8)', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-xl)' }}>
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

          <h2 style={{ fontSize: 'var(--text-2xl)', marginBottom: 'var(--space-2)' }}>
            Quiz Challenge Completed!
          </h2>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)', lineHeight: 1.6 }}>
            You demonstrated a solid understanding of core algorithmic invariant principles, Big-O derivations, and data structure mechanics.
          </p>

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
