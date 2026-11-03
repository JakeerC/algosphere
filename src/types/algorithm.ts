export type AlgorithmCategory = 
  | 'sorting' 
  | 'trees' 
  | 'graphs' 
  | 'linear' 
  | 'dp' 
  | 'hashing'
  | 'geometry';

export type ComplexityTier = 'O(1)' | 'O(log N)' | 'O(N)' | 'O(N log N)' | 'O(N^2)' | 'O(2^N)';

export interface AlgorithmComplexity {
  timeBest: string;
  timeAvg: string;
  timeWorst: string;
  spaceWorst: string;
  stable?: boolean;
  inPlace?: boolean;
}

export interface AlgorithmModule {
  id: string;
  title: string;
  shortDescription: string;
  category: AlgorithmCategory;
  complexity: AlgorithmComplexity;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  courseCode?: string; // e.g. CS1010, CS2040, CS3230
  variants: string[];
  icon: string;
}

export interface VisualStep<TState = any> {
  stepIndex: number;
  totalSteps: number;
  line: number; // 1-based line of pseudocode
  description: string; // High-level natural explanation
  actionType: 'compare' | 'swap' | 'overwrite' | 'pivot' | 'visit' | 'complete' | 'traverse' | 'insert' | 'rotate' | 'inspect';
  variables: Record<string, string | number | boolean | null | undefined | (string | number)[]>;
  state: TState;
}

export interface PseudocodeLine {
  num: number;
  code: string;
  indent: number;
}

export interface LectureSlide {
  title: string;
  subtitle?: string;
  content: string[];
  callout?: {
    type: 'tip' | 'warning' | 'important';
    text: string;
  };
  keyInvariants?: string[];
  codeSnippet?: string;
}

export interface QuizQuestion {
  id: string;
  moduleId: string;
  title: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  codeContext?: string;
  initialArray?: number[];
}
