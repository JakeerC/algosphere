import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { QuizQuestion } from '../../types/algorithm';

interface QuizCardProps {
  question: QuizQuestion;
  onNext: () => void;
  questionNumber: number;
  totalQuestions: number;
}

export const QuizCard: React.FC<QuizCardProps> = ({
  question,
  onNext,
  questionNumber,
  totalQuestions
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelect = (idx: number) => {
    if (isSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (selectedOption === question.correctIndex) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    }
  };

  const handleNextClick = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    onNext();
  };

  const isCorrect = selectedOption === question.correctIndex;

  return (
    <div className="card" style={{ maxWidth: '720px', margin: '0 auto' }}>
      {/* Quiz Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-4)',
        borderBottom: 'var(--border-1) solid var(--border-subtle)',
        paddingBottom: 'var(--space-3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <span className="badge badge-primary">Question {questionNumber} of {totalQuestions}</span>
          <span className="badge badge-neutral" style={{ textTransform: 'capitalize' }}>{question.moduleId}</span>
        </div>
        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>
          Online Judge Mode
        </span>
      </div>

      {/* Question Title & Prompt */}
      <h3 style={{ fontSize: 'var(--text-xl)', marginBottom: 'var(--space-2)', color: 'var(--text-primary)' }}>
        {question.title}
      </h3>
      <p style={{ fontSize: 'var(--text-base)', color: 'var(--text-secondary)', marginBottom: 'var(--space-5)' }}>
        {question.prompt}
      </p>

      {/* Initial Array Visual context if present */}
      {question.initialArray && (
        <div style={{
          backgroundColor: 'var(--surface-subtle)',
          padding: 'var(--space-3)',
          borderRadius: 'var(--radius-md)',
          marginBottom: 'var(--space-5)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)'
        }}>
          <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)', fontFamily: 'var(--font-mono)' }}>Array:</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            {question.initialArray.map((v, i) => (
              <span key={i} style={{
                backgroundColor: 'var(--surface-card)',
                border: 'var(--border-1) solid var(--border-default)',
                borderRadius: 'var(--radius-sm)',
                padding: '2px 8px',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--weight-heavy)'
              }}>
                {v}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', marginBottom: 'var(--space-6)' }}>
        {question.options.map((opt, idx) => {
          let optionBorder = 'var(--border-default)';
          let optionBg = 'var(--surface-card)';
          let icon = null;

          if (isSubmitted) {
            if (idx === question.correctIndex) {
              optionBorder = 'var(--state-sorted)';
              optionBg = 'var(--state-sorted-bg)';
              icon = <CheckCircle2 size={18} color="var(--state-sorted)" />;
            } else if (idx === selectedOption) {
              optionBorder = 'var(--state-pivot)';
              optionBg = 'var(--state-pivot-bg)';
              icon = <XCircle size={18} color="var(--state-pivot)" />;
            }
          } else if (idx === selectedOption) {
            optionBorder = 'var(--primary-500)';
            optionBg = 'var(--primary-surface)';
          }

          return (
            <div
              key={idx}
              onClick={() => handleSelect(idx)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-3) var(--space-4)',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: optionBg,
                border: `2px solid ${optionBorder}`,
                cursor: isSubmitted ? 'default' : 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: 'var(--radius-full)',
                  border: 'var(--border-1) solid var(--border-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-tertiary)',
                  backgroundColor: 'var(--surface-subtle)'
                }}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
                  {opt}
                </span>
              </div>
              {icon}
            </div>
          );
        })}
      </div>

      {/* Explanation Box (Revealed on submission) */}
      {isSubmitted && (
        <div style={{
          backgroundColor: isCorrect ? 'var(--state-sorted-bg)' : 'var(--surface-subtle)',
          border: `1px solid ${isCorrect ? 'var(--state-sorted-border)' : 'var(--border-default)'}`,
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4)',
          marginBottom: 'var(--space-6)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--weight-heavy)',
            color: isCorrect ? 'var(--state-sorted)' : 'var(--text-tertiary)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 'var(--space-1)'
          }}>
            <HelpCircle size={14} />
            <span>{isCorrect ? 'Correct! Detailed Derivation:' : 'Incorrect. Solution Breakdown:'}</span>
          </div>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)', margin: 0, lineHeight: '1.6' }}>
            {question.explanation}
          </p>
        </div>
      )}

      {/* Bottom CTA Row */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-3)' }}>
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="btn btn-primary"
          >
            <span>Submit Verification</span>
            <CheckCircle2 size={16} />
          </button>
        ) : (
          <button
            onClick={handleNextClick}
            className="btn btn-primary"
          >
            <span>Next Question</span>
            <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
