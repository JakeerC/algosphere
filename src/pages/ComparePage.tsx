import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { 
  Play, 
  RotateCcw, 
  Trophy, 
  Zap, 
  Shuffle, 
  ArrowDownUp, 
  Layers, 
  Gauge 
} from 'lucide-react';
import { 
  generateBubbleSortSteps, 
  generateSelectionSortSteps, 
  generateInsertionSortSteps, 
  generateQuickSortSteps, 
  generateMergeSortSteps, 
  SortingVariant 
} from '../algorithms/sorting';
import { VisualStep } from '../types/algorithm';
import { ArrayBar } from '../types/visualizer';
import { SortingCanvas } from '../components/visualizer/SortingCanvas';
import { Badge } from '../components/common/Badge';

interface Competitor {
  id: string;
  name: SortingVariant;
  complexity: string;
  steps: VisualStep<ArrayBar[]>[];
  currentStepIndex: number;
  comparisonsCount: number;
  swapsCount: number;
  isFinished: boolean;
  finishRank?: number;
}

export const ComparePage: React.FC = () => {
  const [datasetType, setDatasetType] = useState<'random' | 'reversed' | 'nearly'>('random');
  const [arraySize, setArraySize] = useState<number>(20);
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState<number>(2);
  const raceTimerRef = useRef<number | null>(null);

  // Selected algorithms for the race
  const [selectedAlgos, setSelectedAlgos] = useState<SortingVariant[]>([
    'Quick Sort',
    'Merge Sort',
    'Bubble Sort'
  ]);

  // Generate dataset
  const baseArray = React.useMemo(() => {
    if (datasetType === 'reversed') {
      return Array.from({ length: arraySize }, (_, i) => Math.round((arraySize - i) * (90 / arraySize) + 10));
    } else if (datasetType === 'nearly') {
      const arr = Array.from({ length: arraySize }, (_, i) => Math.round((i + 1) * (90 / arraySize) + 5));
      // swap two adjacent
      if (arr.length > 5) {
        const temp = arr[2]; arr[2] = arr[3]; arr[3] = temp;
      }
      return arr;
    }
    // Random
    return Array.from({ length: arraySize }, () => Math.floor(Math.random() * 85) + 12);
  }, [datasetType, arraySize]);

  // Build competitor instances
  const [competitors, setCompetitors] = useState<Competitor[]>([]);

  // Initialize competitors whenever baseArray or selectedAlgos change
  useEffect(() => {
    const list: Competitor[] = selectedAlgos.map(algoName => {
      let steps: VisualStep<ArrayBar[]>[] = [];
      let comp = 'O(N log N)';

      if (algoName === 'Quick Sort') {
        steps = generateQuickSortSteps([...baseArray]);
        comp = 'O(N log N)';
      } else if (algoName === 'Merge Sort') {
        steps = generateMergeSortSteps([...baseArray]);
        comp = 'O(N log N)';
      } else if (algoName === 'Insertion Sort') {
        steps = generateInsertionSortSteps([...baseArray]);
        comp = 'O(N²)';
      } else if (algoName === 'Selection Sort') {
        steps = generateSelectionSortSteps([...baseArray]);
        comp = 'O(N²)';
      } else {
        steps = generateBubbleSortSteps([...baseArray]);
        comp = 'O(N²)';
      }

      return {
        id: algoName,
        name: algoName,
        complexity: comp,
        steps,
        currentStepIndex: 0,
        comparisonsCount: 0,
        swapsCount: 0,
        isFinished: false
      };
    });

    setCompetitors(list);
    setIsRunning(false);
  }, [baseArray, selectedAlgos]);

  // Race Loop ticker
  useEffect(() => {
    if (isRunning) {
      const delay = Math.max(30, 400 / speed);
      raceTimerRef.current = window.setInterval(() => {
        setCompetitors(prevList => {
          let allFinished = true;
          let currentRankCount = prevList.filter(c => c.isFinished).length;

          const updated = prevList.map(comp => {
            if (comp.isFinished) return comp;

            const nextIdx = comp.currentStepIndex + 1;
            if (nextIdx >= comp.steps.length) {
              currentRankCount++;
              return {
                ...comp,
                currentStepIndex: comp.steps.length - 1,
                isFinished: true,
                finishRank: currentRankCount
              };
            }

            allFinished = false;
            const currentStep = comp.steps[nextIdx];
            const isCompare = currentStep.actionType === 'compare';
            const isSwap = currentStep.actionType === 'swap' || currentStep.actionType === 'overwrite';

            return {
              ...comp,
              currentStepIndex: nextIdx,
              comparisonsCount: comp.comparisonsCount + (isCompare ? 1 : 0),
              swapsCount: comp.swapsCount + (isSwap ? 1 : 0)
            };
          });

          if (allFinished) {
            setIsRunning(false);
            confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
          }

          return updated;
        });
      }, delay);
    } else if (raceTimerRef.current) {
      clearInterval(raceTimerRef.current);
    }

    return () => {
      if (raceTimerRef.current) clearInterval(raceTimerRef.current);
    };
  }, [isRunning, speed]);

  const handleReset = () => {
    setIsRunning(false);
    setCompetitors(prev => prev.map(c => ({
      ...c,
      currentStepIndex: 0,
      comparisonsCount: 0,
      swapsCount: 0,
      isFinished: false,
      finishRank: undefined
    })));
  };

  const toggleAlgoSelection = (algo: SortingVariant) => {
    if (selectedAlgos.includes(algo)) {
      if (selectedAlgos.length > 2) {
        setSelectedAlgos(selectedAlgos.filter(a => a !== algo));
      }
    } else {
      if (selectedAlgos.length < 3) {
        setSelectedAlgos([...selectedAlgos, algo]);
      }
    }
  };

  const allSortingOptions: SortingVariant[] = [
    'Quick Sort',
    'Merge Sort',
    'Insertion Sort',
    'Selection Sort',
    'Bubble Sort'
  ];

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', paddingBottom: 'var(--space-10)' }}>
      {/* Race Header Banner */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-4)',
        paddingTop: 'var(--space-4)',
        borderBottom: 'var(--border-1) solid var(--border-subtle)',
        paddingBottom: 'var(--space-4)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
            <Badge variant="primary" icon={<Zap size={14} />}>Real-Time Benchmarking</Badge>
          </div>
          <h1 style={{ fontSize: 'var(--text-3xl)', margin: 0 }}>
            Side-by-Side Algorithm Race Arena
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginTop: 'var(--space-1)' }}>
            Watch multiple algorithms race simultaneously on identical data. Visually benchmark comparisons and memory operations.
          </p>
        </div>

        {/* Global Race Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <button
            onClick={handleReset}
            className="btn btn-secondary"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>

          <button
            onClick={() => setIsRunning(prev => !prev)}
            className="btn btn-primary"
            style={{ minWidth: '130px' }}
          >
            <Play size={16} fill="currentColor" />
            <span>{isRunning ? 'Pause Race' : 'Start Race'}</span>
          </button>
        </div>
      </div>

      {/* Configuration bar: Competitor selector, dataset type, array size */}
      <div className="card" style={{ padding: 'var(--space-4)' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-4)'
        }}>
          {/* Select Competitors */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 'var(--text-xs)', fontWeight: 'var(--weight-heavy)', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              Competitors (Select 2-3):
            </span>
            {allSortingOptions.map(algo => {
              const isSelected = selectedAlgos.includes(algo);
              return (
                <button
                  key={algo}
                  onClick={() => toggleAlgoSelection(algo)}
                  className={`btn btn-sm ${isSelected ? 'btn-primary' : 'btn-secondary'}`}
                  style={{ fontSize: 'var(--text-xs)' }}
                >
                  {algo}
                </button>
              );
            })}
          </div>

          {/* Dataset Configuration */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
            {/* Type */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)', backgroundColor: 'var(--surface-subtle)', padding: '2px', borderRadius: 'var(--radius-md)' }}>
              <button
                onClick={() => setDatasetType('random')}
                className={`btn btn-sm ${datasetType === 'random' ? 'btn-secondary' : 'btn-ghost'}`}
              >
                Random
              </button>
              <button
                onClick={() => setDatasetType('reversed')}
                className={`btn btn-sm ${datasetType === 'reversed' ? 'btn-secondary' : 'btn-ghost'}`}
              >
                Reversed (Worst-case)
              </button>
              <button
                onClick={() => setDatasetType('nearly')}
                className={`btn btn-sm ${datasetType === 'nearly' ? 'btn-secondary' : 'btn-ghost'}`}
              >
                Nearly Sorted
              </button>
            </div>

            {/* Size */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>Size:</span>
              {[15, 25, 40].map(s => (
                <button
                  key={s}
                  onClick={() => setArraySize(s)}
                  className={`btn btn-sm ${arraySize === s ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ padding: '2px 8px', fontSize: 'var(--text-xs)' }}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* Speed */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-1)' }}>
              <Gauge size={14} color="var(--text-tertiary)" />
              {[1, 2, 4].map(sp => (
                <button
                  key={sp}
                  onClick={() => setSpeed(sp)}
                  className={`btn btn-sm ${speed === sp ? 'btn-primary' : 'btn-ghost'}`}
                  style={{ padding: '2px 6px', fontSize: '11px' }}
                >
                  {sp}x
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Concurrent Competitor Tracks */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${competitors.length}, 1fr)`,
        gap: 'var(--space-4)'
      }} className="race-arena-grid">
        {competitors.map((comp, idx) => {
          const currentStep = comp.steps[comp.currentStepIndex] || comp.steps[0];
          const progress = Math.round((comp.currentStepIndex / Math.max(1, comp.steps.length - 1)) * 100);

          return (
            <div
              key={comp.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: 'var(--space-4)',
                borderColor: comp.isFinished ? 'var(--state-sorted)' : 'var(--border-subtle)',
                boxShadow: comp.finishRank === 1 ? 'var(--shadow-glow-success)' : 'var(--shadow-sm)'
              }}
            >
              {/* Header with Title and Rank Trophy */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-3)',
                borderBottom: 'var(--border-1) solid var(--border-subtle)',
                paddingBottom: 'var(--space-2)'
              }}>
                <div>
                  <h3 style={{ fontSize: 'var(--text-base)', margin: 0 }}>{comp.name}</h3>
                  <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)', color: 'var(--state-inspect)' }}>
                    {comp.complexity}
                  </span>
                </div>

                {comp.finishRank !== undefined ? (
                  <Badge variant={comp.finishRank === 1 ? 'success' : 'neutral'} icon={<Trophy size={14} />}>
                    #{comp.finishRank} {comp.finishRank === 1 ? 'WINNER' : 'Finished'}
                  </Badge>
                ) : (
                  <Badge variant="neutral">In Progress ({progress}%)</Badge>
                )}
              </div>

              {/* Visualization Canvas */}
              <div style={{ height: '240px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <SortingCanvas bars={currentStep.state} />
              </div>

              {/* Telemetry Metrics */}
              <div style={{
                marginTop: 'var(--space-4)',
                backgroundColor: 'var(--surface-subtle)',
                padding: 'var(--space-3)',
                borderRadius: 'var(--radius-md)',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-xs)',
                fontFamily: 'var(--font-mono)'
              }}>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>Comparisons: </span>
                  <strong style={{ color: 'var(--state-inspect)', fontSize: 'var(--text-sm)' }}>
                    {comp.comparisonsCount}
                  </strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-tertiary)' }}>Swaps / Writes: </span>
                  <strong style={{ color: 'var(--state-swap)', fontSize: 'var(--text-sm)' }}>
                    {comp.swapsCount}
                  </strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .race-arena-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
