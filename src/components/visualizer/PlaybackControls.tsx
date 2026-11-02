import React from 'react';
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  RotateCcw, 
  Gauge 
} from 'lucide-react';

interface PlaybackControlsProps {
  currentStep: number;
  totalSteps: number;
  isPlaying: boolean;
  speed: number;
  onPlayPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onSeek: (stepIndex: number) => void;
  onSpeedChange: (speed: number) => void;
}

export const PlaybackControls: React.FC<PlaybackControlsProps> = ({
  currentStep,
  totalSteps,
  isPlaying,
  speed,
  onPlayPause,
  onStepForward,
  onStepBackward,
  onReset,
  onSeek,
  onSpeedChange
}) => {
  const progressPercent = totalSteps > 1 ? (currentStep / (totalSteps - 1)) * 100 : 0;

  return (
    <div style={{
      backgroundColor: 'var(--surface-subtle)',
      borderTop: '1px solid var(--border-subtle)',
      padding: 'var(--space-3) var(--space-4)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-2)',
      borderRadius: '0 0 var(--radius-xl) var(--radius-xl)'
    }}>
      {/* Scrubbable Timeline Slider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <span style={{ 
          fontSize: 'var(--text-xs)', 
          fontFamily: 'var(--font-mono)', 
          color: 'var(--text-tertiary)',
          minWidth: '55px'
        }}>
          {currentStep} / {Math.max(0, totalSteps - 1)}
        </span>

        <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
          <input
            type="range"
            min={0}
            max={Math.max(0, totalSteps - 1)}
            value={currentStep}
            onChange={e => onSeek(Number(e.target.value))}
            style={{
              width: '100%',
              height: '8px',
              borderRadius: 'var(--radius-full)',
              background: `linear-gradient(to right, var(--primary-500) 0%, var(--primary-500) ${progressPercent}%, var(--border-default) ${progressPercent}%, var(--border-default) 100%)`,
              outline: 'none',
              cursor: 'pointer',
              accentColor: 'var(--primary-500)'
            }}
          />
        </div>

        <span style={{ 
          fontSize: 'var(--text-xs)', 
          fontFamily: 'var(--font-mono)', 
          color: 'var(--text-secondary)',
          minWidth: '45px',
          textAlign: 'right'
        }}>
          {Math.round(progressPercent)}%
        </span>
      </div>

      {/* Control Buttons Row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 'var(--space-2)'
      }}>
        {/* Playback action buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          <button
            onClick={onReset}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: 'var(--radius-full)', padding: '5px 14px' }}
            title="Reset to step 0 (R)"
          >
            <RotateCcw size={13} />
            <span>Reset</span>
          </button>

          <button
            onClick={onStepBackward}
            disabled={currentStep <= 0}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: 'var(--radius-full)', padding: '5px 14px' }}
            title="Step backward (←)"
          >
            <SkipBack size={13} />
            <span>Prev</span>
          </button>

          <button
            onClick={onPlayPause}
            className="btn btn-primary btn-sm"
            style={{ 
              borderRadius: 'var(--radius-full)', 
              minWidth: '96px',
              padding: '6px 16px',
              boxShadow: 'var(--shadow-sm)'
            }}
            title="Play / Pause (Space)"
          >
            {isPlaying ? (
              <>
                <Pause size={14} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={14} fill="currentColor" />
                <span>Play</span>
              </>
            )}
          </button>

          <button
            onClick={onStepForward}
            disabled={currentStep >= totalSteps - 1}
            className="btn btn-secondary btn-sm"
            style={{ borderRadius: 'var(--radius-full)', padding: '5px 14px' }}
            title="Step forward (→)"
          >
            <span>Next</span>
            <SkipForward size={13} />
          </button>
        </div>

        {/* Speed Selector Pills */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-1)',
          backgroundColor: 'var(--surface-card)',
          padding: '3px 6px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid var(--border-subtle)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', color: 'var(--text-tertiary)', fontSize: '11px', paddingLeft: '4px', paddingRight: '4px' }}>
            <Gauge size={12} />
            <span>Speed:</span>
          </div>

          {[0.5, 1, 2, 4].map(s => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              style={{
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                fontSize: '11px',
                fontFamily: 'var(--font-mono)',
                backgroundColor: speed === s ? 'var(--primary-500)' : 'transparent',
                color: speed === s ? '#ffffff' : 'var(--text-secondary)',
                border: 'none',
                fontWeight: speed === s ? 'var(--weight-heavy)' : 'var(--weight-normal)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
