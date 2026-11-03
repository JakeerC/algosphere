export type ElementState = 
  | 'default' 
  | 'inspect' 
  | 'swap' 
  | 'pivot' 
  | 'sorted' 
  | 'visited' 
  | 'active'
  | 'highlight';

export interface ArrayBar {
  id: number;
  value: number;
  state: ElementState;
}

export interface TreeNodeData {
  id: string;
  value: number;
  leftId?: string;
  rightId?: string;
  height: number;
  balanceFactor?: number;
  state: ElementState;
}

export interface TreeVisualState {
  nodes: Record<string, TreeNodeData>;
  rootId?: string;
  inspectingNodeId?: string;
  activePath?: string[];
}

export interface GraphVertex {
  id: string;
  label: string;
  x: number;
  y: number;
  state: ElementState;
  distance?: number;
  visited?: boolean;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  weight?: number;
  state: ElementState;
}

export interface GraphVisualState {
  vertices: GraphVertex[];
  edges: GraphEdge[];
  queueOrStack?: string[];
  currentNodeId?: string;
}

export interface LinearElement {
  id: string;
  value: number | string;
  state: ElementState;
  nextId?: string;
  prevId?: string;
}

export interface LinearVisualState {
  items: LinearElement[];
  headId?: string;
  tailId?: string;
  topIndex?: number;
  frontIndex?: number;
  rearIndex?: number;
}

export interface DpCell {
  row: number;
  col: number;
  value: number;
  state: ElementState;
  fromRow?: number;
  fromCol?: number;
}

export interface DpVisualState {
  table: DpCell[][];
  rowLabels: string[];
  colLabels: string[];
  currentRow: number;
  currentCol: number;
  selectedItems?: number[];
  computedValue?: number;
}

export interface HeapVisualState {
  array: ArrayBar[];
  tree: TreeVisualState;
  heapSize: number;
  activeIndices?: number[];
  highlightAction?: string;
}

export interface HashBucketItem {
  key: number;
  label?: string;
  state: ElementState;
}

export interface HashBucket {
  index: number;
  items: HashBucketItem[];
  state: ElementState;
}

export interface HashTableVisualState {
  buckets: HashBucket[];
  tableSize: number;
  probingIndex?: number;
  lastComputedHash?: number;
  currentKey?: number;
  mode: 'probing' | 'chaining';
  statusMessage?: string;
}

export interface UfdsElement {
  id: number;
  parent: number;
  rank: number;
  state: ElementState;
}

export interface UnionFindVisualState {
  elements: UfdsElement[];
  numSets: number;
  activeElements?: number[];
  explanation?: string;
}
