export type Blind75Category = 
  | 'Array' 
  | 'Binary' 
  | 'Dynamic Programming' 
  | 'Graph' 
  | 'Interval' 
  | 'Linked List' 
  | 'Matrix' 
  | 'String' 
  | 'Tree' 
  | 'Heap';

export type Blind75Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Blind75VisualKind = 
  | 'array-pointers' 
  | 'sliding-window' 
  | 'hash-map' 
  | 'linked-list' 
  | 'intervals' 
  | 'matrix' 
  | 'binary-bits' 
  | 'stack' 
  | 'tree' 
  | 'dp-table' 
  | 'heap-stream';

export interface VisualPointer {
  name: string;
  index: number;
  color?: string;
}

export interface Blind75VisualData {
  kind: Blind75VisualKind;
  // Array / Pointer representation
  array?: (number | string)[];
  activeIndices?: number[];
  secondaryIndices?: number[];
  sortedIndices?: number[];
  pointers?: VisualPointer[];
  targetValue?: number | string;
  
  // Sliding Window / String
  chars?: string[];
  windowStart?: number;
  windowEnd?: number;
  windowValid?: boolean;
  
  // Hash map / Key-Value
  hashMap?: Record<string, string | number>;
  activeKey?: string;
  lookupResult?: string;
  
  // Linked List
  nodes?: { id: string; val: number | string; next?: string | null; isVisited?: boolean; isCycle?: boolean }[];
  headId?: string;
  currNodeId?: string;
  prevNodeId?: string;
  
  // Intervals
  intervalsList?: { start: number; end: number; state?: 'default' | 'active' | 'merged' | 'conflict' }[];
  currentInterval?: { start: number; end: number };
  
  // Matrix (2D grid)
  grid?: (number | string)[][];
  activeCell?: { r: number; c: number };
  visitedCells?: { r: number; c: number }[];
  highlightCells?: { r: number; c: number }[];
  
  // Bitwise
  bits?: string; // 32-bit binary string
  activeBitIndex?: number;
  mask?: string;
  decimalValue?: number;
  
  // Stack / Queue
  stackItems?: (string | number)[];
  topIndex?: number;
  
  // DP
  dpTable?: (number | string)[][];
  dp1D?: (number | string)[];
  dpRowLabels?: string[];
  dpColLabels?: string[];
  activeDpCell?: { r?: number; c?: number; index?: number };
  
  // Custom message/tagline
  badgeNote?: string;
}

export interface Blind75Step {
  stepIndex: number;
  totalSteps: number;
  line: number; // 1-based index in pseudocode
  description: string;
  action: 'inspect' | 'compare' | 'swap' | 'advance' | 'match' | 'update' | 'return';
  variables: Record<string, string | number | boolean | null | undefined>;
  visualData: Blind75VisualData;
}

export interface ProblemExample {
  input: string;
  output: string;
  explanation?: string;
}

export interface ComplexityInfo {
  bigO: string;
  explanation: string;
}

export interface Blind75Problem {
  id: string; // slug e.g. 'two-sum'
  number: number; // LeetCode #
  title: string;
  category: Blind75Category;
  difficulty: Blind75Difficulty;
  pattern: string; // e.g. 'Hash Map Lookup', 'Sliding Window', 'Two Pointers'
  grindWeek: number; // 1 to 12
  estimatedMinutes: number; // e.g. 15, 20, 30, 45
  leetcodeUrl: string;
  summary: string;
  description: string;
  examples: ProblemExample[];
  constraints: string[];
  intuition: string;
  pythonSolution: string;
  pseudocode: string[];
  timeComplexity: ComplexityInfo;
  spaceComplexity: ComplexityInfo;
  generateSteps: (customInput?: any) => Blind75Step[];
  defaultInputLabel?: string;
  defaultInputValue?: string;
}

export interface UserProblemState {
  completed: boolean;
  starred: boolean;
  notes: string;
  completedAt?: string;
}

export type UserProgressMap = Record<string, UserProblemState>;

export interface Grind75ScheduleConfig {
  weeks: number; // 4 to 16 (default 12)
  hoursPerWeek: number; // 2 to 20 (default 4)
  groupBy: 'topic' | 'week';
}
