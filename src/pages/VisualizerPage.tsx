import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  BookOpen, 
  Sparkles, 
  SlidersHorizontal, 
  Shuffle, 
  ArrowDownUp, 
  Terminal, 
  Activity, 
  CheckCircle2, 
  Layers, 
  PlusCircle, 
  Eye 
} from 'lucide-react';
import { AlgorithmModule, VisualStep } from '../types/algorithm';
import { PlaybackControls } from '../components/visualizer/PlaybackControls';
import { CodeTracer } from '../components/visualizer/CodeTracer';
import { VariableWatch } from '../components/visualizer/VariableWatch';
import { StepNarrator } from '../components/visualizer/StepNarrator';
import { SortingCanvas } from '../components/visualizer/SortingCanvas';
import { TreeCanvas } from '../components/visualizer/TreeCanvas';
import { GraphCanvas } from '../components/visualizer/GraphCanvas';
import { LinearCanvas } from '../components/visualizer/LinearCanvas';
import { DpCanvas } from '../components/visualizer/DpCanvas';
import { 
  generateBubbleSortSteps, 
  generateSelectionSortSteps, 
  generateInsertionSortSteps, 
  generateQuickSortSteps, 
  generateMergeSortSteps, 
  SORTING_PSEUDOCODE, 
  SortingVariant 
} from '../algorithms/sorting';
import { 
  generateInitialTree, 
  generateBstInsertSteps, 
  generateAvlDemoSteps, 
  TREE_PSEUDOCODE 
} from '../algorithms/trees';
import { 
  generateBfsSteps, 
  generateDijkstraSteps, 
  GRAPH_PSEUDOCODE 
} from '../algorithms/graphs';
import { 
  getInitialLinkedList, 
  generateLinkedListInsertHeadSteps, 
  generateStackPushSteps, 
  LINEAR_PSEUDOCODE 
} from '../algorithms/linear';
import { 
  generateKnapsackSteps, 
  DP_PSEUDOCODE 
} from '../algorithms/dp';
import { Badge } from '../components/common/Badge';

interface VisualizerPageProps {
  module: AlgorithmModule;
  onSelectModule: (module: AlgorithmModule) => void;
  onOpenLecture: (module: AlgorithmModule) => void;
}

export const VisualizerPage: React.FC<VisualizerPageProps> = ({
  module,
  onOpenLecture
}) => {
  // Current algorithm variant
  const [activeVariant, setActiveVariant] = useState<string>(module.variants[0] || 'Bubble Sort');
  
  // Custom dataset
  const [dataArray, setDataArray] = useState<number[]>([42, 17, 89, 5, 23, 67, 31, 12, 94, 50]);
  const [customInputText, setCustomInputText] = useState('42, 17, 89, 5, 23, 67, 31, 12, 94, 50');
  const [showCustomModal, setShowCustomModal] = useState(false);

  // Playback state
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const playTimerRef = useRef<number | null>(null);

  // Generate steps based on module and activeVariant
  const steps: VisualStep[] = React.useMemo(() => {
    if (module.id === 'sorting') {
      switch (activeVariant) {
        case 'Selection Sort':
          return generateSelectionSortSteps(dataArray);
        case 'Insertion Sort':
          return generateInsertionSortSteps(dataArray);
        case 'Quick Sort':
          return generateQuickSortSteps(dataArray);
        case 'Merge Sort':
          return generateMergeSortSteps(dataArray);
        case 'Bubble Sort':
        default:
          return generateBubbleSortSteps(dataArray);
      }
    } else if (module.id === 'bst-avl') {
      if (activeVariant.includes('AVL')) {
        return generateAvlDemoSteps();
      } else {
        const tree = generateInitialTree();
        return generateBstInsertSteps(tree, 42);
      }
    } else if (module.id === 'graph-traversal' || module.id === 'shortest-path' || module.id === 'mst') {
      if (activeVariant.includes('Dijkstra') || module.id === 'shortest-path') {
        return generateDijkstraSteps('0');
      } else {
        return generateBfsSteps('0');
      }
    } else if (module.id === 'linear-structures') {
      if (activeVariant.includes('Stack')) {
        return generateStackPushSteps([15, 30, 45], 90);
      } else {
        const list = getInitialLinkedList();
        return generateLinkedListInsertHeadSteps(list, 55);
      }
    } else if (module.id === 'dynamic-programming') {
      return generateKnapsackSteps();
    }

    // Default fallback to sorting
    return generateBubbleSortSteps(dataArray);
  }, [module.id, activeVariant, dataArray]);

  // Pseudocode lines
  const pseudocodeLines = React.useMemo(() => {
    if (module.id === 'sorting') {
      return SORTING_PSEUDOCODE[activeVariant as SortingVariant] || SORTING_PSEUDOCODE['Bubble Sort'];
    } else if (module.id === 'bst-avl') {
      return activeVariant.includes('AVL') ? TREE_PSEUDOCODE['AVL Insert'] : TREE_PSEUDOCODE['BST Insert'];
    } else if (module.id === 'graph-traversal' || module.id === 'shortest-path') {
      return activeVariant.includes('Dijkstra') ? GRAPH_PSEUDOCODE['Dijkstra'] : GRAPH_PSEUDOCODE['BFS'];
    } else if (module.id === 'linear-structures') {
      return activeVariant.includes('Stack') ? LINEAR_PSEUDOCODE['Stack (LIFO)'] : LINEAR_PSEUDOCODE['Singly Linked List'];
    } else if (module.id === 'dynamic-programming') {
      return DP_PSEUDOCODE['0/1 Knapsack'];
    }
    return SORTING_PSEUDOCODE['Bubble Sort'];
  }, [module.id, activeVariant]);

  // Reset step index when algorithm or variant changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [module.id, activeVariant, dataArray]);

  // Playback timer ticker
  useEffect(() => {
    if (isPlaying) {
      const delay = Math.max(120, 1000 / speed);
      playTimerRef.current = window.setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, delay);
    } else if (playTimerRef.current) {
      clearInterval(playTimerRef.current);
    }

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, speed, steps.length]);

  // Global Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsPlaying(prev => !prev);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        setIsPlaying(false);
        setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setIsPlaying(false);
        setCurrentStepIndex(prev => Math.max(0, prev - 1));
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        setIsPlaying(false);
        setCurrentStepIndex(0);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [steps.length]);

  const currentStep = steps[currentStepIndex] || steps[0];

  // Preset handlers
  const handleRandomize = () => {
    const randoms = Array.from({ length: 12 }, () => Math.floor(Math.random() * 88) + 10);
    setDataArray(randoms);
    setCustomInputText(randoms.join(', '));
  };

  const handleNearlySorted = () => {
    const nearly = [5, 12, 19, 24, 30, 27, 42, 51, 65, 80];
    setDataArray(nearly);
    setCustomInputText(nearly.join(', '));
  };

  const handleReverseSorted = () => {
    const rev = [90, 81, 72, 63, 54, 45, 36, 27, 18, 9];
    setDataArray(rev);
    setCustomInputText(rev.join(', '));
  };

  const handleApplyCustom = () => {
    const parsed = customInputText
      .split(',')
      .map(s => parseInt(s.trim(), 10))
      .filter(n => !isNaN(n) && n > 0 && n <= 100);

    if (parsed.length >= 3) {
      setDataArray(parsed);
      setShowCustomModal(false);
    }
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', paddingBottom: 'var(--space-10)' }}>
      {/* Workspace Header Bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-3)',
        paddingTop: 'var(--space-3)',
        borderBottom: 'var(--border-1) solid var(--border-subtle)',
        paddingBottom: 'var(--space-3)'
      }}>
        {/* Module Title & Variants dropdown/buttons */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'var(--space-3)' }}>
          <div>
            <h1 style={{ fontSize: 'var(--text-xl)', margin: 0, display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span>{module.title}</span>
              {module.courseCode && (
                <span className="badge badge-neutral" style={{ fontSize: '11px' }}>{module.courseCode}</span>
              )}
            </h1>
          </div>

          {/* Variant picker pills */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-1)',
            backgroundColor: 'var(--surface-subtle)',
            padding: '3px',
            borderRadius: 'var(--radius-md)',
            border: 'var(--border-1) solid var(--border-subtle)'
          }}>
            {module.variants.map(v => (
              <button
                key={v}
                onClick={() => setActiveVariant(v)}
                className={`btn btn-sm ${activeVariant === v ? 'btn-primary' : 'btn-ghost'}`}
                style={{
                  padding: '4px 10px',
                  fontSize: 'var(--text-xs)',
                  height: '28px'
                }}
              >
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Right Action buttons: Dataset Presets & e-Lecture button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {module.id === 'sorting' && (
            <>
              <button
                onClick={handleRandomize}
                className="btn btn-secondary btn-sm"
                title="Generate random array"
              >
                <Shuffle size={14} />
                <span>Random</span>
              </button>

              <button
                onClick={handleNearlySorted}
                className="btn btn-secondary btn-sm"
                title="Nearly sorted array"
              >
                <span>Nearly Sorted</span>
              </button>

              <button
                onClick={handleReverseSorted}
                className="btn btn-secondary btn-sm"
                title="Reverse sorted array"
              >
                <span>Reverse</span>
              </button>

              <button
                onClick={() => setShowCustomModal(true)}
                className="btn btn-secondary btn-sm"
                title="Enter custom array"
              >
                <PlusCircle size={14} />
                <span>Custom Input</span>
              </button>
            </>
          )}

          <button
            onClick={() => onOpenLecture(module)}
            className="btn btn-primary btn-sm"
          >
            <BookOpen size={14} />
            <span>e-Lecture Slides</span>
          </button>
        </div>
      </div>

      {/* Main Split-Screen Workspace (Canvas + Code Tracer) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.65fr) minmax(320px, 1fr)',
        gap: 'var(--space-4)',
        alignItems: 'stretch'
      }} className="visualizer-grid">
        
        {/* Left Column: Visualizer Stage + Playback Controls */}
        <div className="visualizer-stage" style={{ minHeight: '520px' }}>
          {/* Step Natural Language Narration */}
          <StepNarrator
            description={currentStep.description}
            actionType={currentStep.actionType}
            stepIndex={currentStep.stepIndex}
          />

          {/* Canvas Viewport */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}>
            {module.id === 'sorting' && (
              <SortingCanvas bars={currentStep.state} />
            )}
            {module.id === 'bst-avl' && (
              <TreeCanvas tree={currentStep.state} />
            )}
            {(module.id === 'graph-traversal' || module.id === 'shortest-path' || module.id === 'mst') && (
              <GraphCanvas graph={currentStep.state} />
            )}
            {module.id === 'linear-structures' && (
              <LinearCanvas state={currentStep.state} variant={activeVariant} />
            )}
            {module.id === 'dynamic-programming' && (
              <DpCanvas state={currentStep.state} />
            )}
          </div>

          {/* Scrubbable Playback Controls Bar */}
          <PlaybackControls
            currentStep={currentStepIndex}
            totalSteps={steps.length}
            isPlaying={isPlaying}
            speed={speed}
            onPlayPause={() => setIsPlaying(prev => !prev)}
            onStepForward={() => {
              setIsPlaying(false);
              setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1));
            }}
            onStepBackward={() => {
              setIsPlaying(false);
              setCurrentStepIndex(prev => Math.max(0, prev - 1));
            }}
            onReset={() => {
              setIsPlaying(false);
              setCurrentStepIndex(0);
            }}
            onSeek={idx => {
              setIsPlaying(false);
              setCurrentStepIndex(idx);
            }}
            onSpeedChange={s => setSpeed(s)}
          />
        </div>

        {/* Right Column: Code Tracer & Live Variable Inspector */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          minHeight: '520px'
        }}>
          {/* Synchronized Pseudocode Tracer */}
          <div style={{ flex: 1, minHeight: '340px' }}>
            <CodeTracer
              lines={pseudocodeLines}
              activeLine={currentStep.line}
              title={`${activeVariant} Pseudocode`}
            />
          </div>

          {/* Live Variable Watch Window */}
          <VariableWatch variables={currentStep.variables} />

          {/* Complexity HUD Summary */}
          <div className="card" style={{ padding: 'var(--space-3) var(--space-4)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 'var(--space-2)',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-heavy)',
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase'
            }}>
              <span>Big-O Complexity Metrics</span>
              <span className="badge badge-neutral" style={{ fontSize: '10px' }}>Theoretical</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', fontSize: 'var(--text-xs)', fontFamily: 'var(--font-mono)' }}>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>Best: </span>
                <span style={{ color: 'var(--state-sorted)', fontWeight: 'var(--weight-heavy)' }}>{module.complexity.timeBest}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>Average: </span>
                <span style={{ color: 'var(--state-inspect)', fontWeight: 'var(--weight-heavy)' }}>{module.complexity.timeAvg}</span>
              </div>
              <div>
                <span style={{ color: 'var(--text-tertiary)' }}>Worst: </span>
                <span style={{ color: 'var(--state-pivot)', fontWeight: 'var(--weight-heavy)' }}>{module.complexity.timeWorst}</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: 'var(--space-4)',
              marginTop: 'var(--space-2)',
              paddingTop: 'var(--space-2)',
              borderTop: 'var(--border-1) solid var(--border-subtle)',
              fontSize: '11px',
              color: 'var(--text-tertiary)'
            }}>
              <span>Aux Space: <strong style={{ color: 'var(--text-secondary)' }}>{module.complexity.spaceWorst}</strong></span>
              {module.complexity.stable !== undefined && (
                <span>Stable: <strong style={{ color: module.complexity.stable ? 'var(--state-sorted)' : 'var(--text-tertiary)' }}>
                  {module.complexity.stable ? 'Yes' : 'No'}
                </strong></span>
              )}
              {module.complexity.inPlace !== undefined && (
                <span>In-Place: <strong style={{ color: module.complexity.inPlace ? 'var(--state-sorted)' : 'var(--text-tertiary)' }}>
                  {module.complexity.inPlace ? 'Yes' : 'No'}
                </strong></span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Input Modal */}
      {showCustomModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 995,
          backgroundColor: 'hsla(222, 47%, 4%, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--space-4)'
        }} onClick={() => setShowCustomModal(false)}>
          <div
            style={{
              width: '100%',
              maxWidth: '480px',
              backgroundColor: 'var(--surface-raised)',
              border: 'var(--border-1) solid var(--border-default)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-5)',
              boxShadow: 'var(--shadow-xl)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <h3 style={{ fontSize: 'var(--text-lg)', marginBottom: 'var(--space-2)' }}>
              Custom Input Array
            </h3>
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)', marginBottom: 'var(--space-4)' }}>
              Enter comma-separated integers (values between 5 and 100):
            </p>

            <textarea
              rows={3}
              value={customInputText}
              onChange={e => setCustomInputText(e.target.value)}
              style={{
                width: '100%',
                marginBottom: 'var(--space-4)',
                fontFamily: 'var(--font-mono)'
              }}
              placeholder="e.g. 50, 12, 85, 33, 9, 74"
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 'var(--space-2)' }}>
              <button
                onClick={() => setShowCustomModal(false)}
                className="btn btn-secondary btn-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyCustom}
                className="btn btn-primary btn-sm"
              >
                Apply Custom Dataset
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 960px) {
          .visualizer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
