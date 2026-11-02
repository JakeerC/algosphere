import { AlgorithmModule } from '../types/algorithm';

export const ALGORITHM_MODULES: AlgorithmModule[] = [
  // 1. Sorting
  {
    id: 'sorting',
    title: 'Sorting Algorithms',
    shortDescription: 'Comparison and distribution sorting mechanisms ranging from elementary O(N²) to optimal O(N log N).',
    category: 'sorting',
    complexity: {
      timeBest: 'O(N)',
      timeAvg: 'O(N log N)',
      timeWorst: 'O(N²)',
      spaceWorst: 'O(N)',
      stable: true,
      inPlace: true
    },
    difficulty: 'Beginner',
    tags: ['Divide & Conquer', 'In-Place', 'Comparative', 'CS1010', 'CS2040'],
    courseCode: 'CS2040',
    variants: ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'],
    icon: 'ArrowUpDown'
  },
  // 2. BST & AVL
  {
    id: 'bst-avl',
    title: 'Binary Search Tree & AVL',
    shortDescription: 'Dynamic hierarchical key lookup with self-balancing tree rotations (LL, RR, LR, RL) maintaining O(log N) height.',
    category: 'trees',
    complexity: {
      timeBest: 'O(1)',
      timeAvg: 'O(log N)',
      timeWorst: 'O(log N)',
      spaceWorst: 'O(N)',
      stable: false,
      inPlace: true
    },
    difficulty: 'Intermediate',
    tags: ['Self-Balancing', 'Binary Tree', 'Rotations', 'CS2040'],
    courseCode: 'CS2040',
    variants: ['BST Search & Insert', 'AVL Self-Balancing', 'Tree Rotations'],
    icon: 'GitFork'
  },
  // 3. Graph Traversal
  {
    id: 'graph-traversal',
    title: 'Graph Traversal (BFS & DFS)',
    shortDescription: 'Systematic exploration of vertices and edges with Breadth-First (queue) and Depth-First (recursion/stack).',
    category: 'graphs',
    complexity: {
      timeBest: 'O(V + E)',
      timeAvg: 'O(V + E)',
      timeWorst: 'O(V + E)',
      spaceWorst: 'O(V)',
      stable: false,
      inPlace: false
    },
    difficulty: 'Intermediate',
    tags: ['Graph Theory', 'Queue', 'Recursion', 'Topological Sort', 'CS2040'],
    courseCode: 'CS2040',
    variants: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)'],
    icon: 'Network'
  },
  // 4. Shortest Paths
  {
    id: 'shortest-path',
    title: 'Single-Source Shortest Path',
    shortDescription: 'Dijkstra’s greedy priority-queue algorithm finding minimum edge weight paths from a root vertex.',
    category: 'graphs',
    complexity: {
      timeBest: 'O(V log V + E)',
      timeAvg: 'O((V + E) log V)',
      timeWorst: 'O((V + E) log V)',
      spaceWorst: 'O(V)',
      stable: false,
      inPlace: false
    },
    difficulty: 'Intermediate',
    tags: ['Dijkstra', 'Greedy', 'Priority Queue', 'CS2040', 'CS3230'],
    courseCode: 'CS2040',
    variants: ['Dijkstra Algorithm'],
    icon: 'Navigation'
  },
  // 5. Linear Data Structures
  {
    id: 'linear-structures',
    title: 'Linked List, Stack & Queue',
    shortDescription: 'Fundamental pointer-based memory nodes and Abstract Data Types with LIFO and FIFO invariants.',
    category: 'linear',
    complexity: {
      timeBest: 'O(1)',
      timeAvg: 'O(1)',
      timeWorst: 'O(N)',
      spaceWorst: 'O(N)',
      stable: true,
      inPlace: true
    },
    difficulty: 'Beginner',
    tags: ['Pointers', 'LIFO', 'FIFO', 'Memory Layout', 'CS1010'],
    courseCode: 'CS1010',
    variants: ['Singly Linked List', 'Stack (LIFO)', 'Queue (FIFO)'],
    icon: 'Layers'
  },
  // 6. Dynamic Programming
  {
    id: 'dynamic-programming',
    title: 'Dynamic Programming',
    shortDescription: 'Overlapping subproblems and optimal substructure solved via memoization table and bottom-up formulation.',
    category: 'dp',
    complexity: {
      timeBest: 'O(N × W)',
      timeAvg: 'O(N × W)',
      timeWorst: 'O(N × W)',
      spaceWorst: 'O(N × W)',
      stable: true,
      inPlace: false
    },
    difficulty: 'Advanced',
    tags: ['Memoization', '0/1 Knapsack', 'Fibonacci Tree', 'CS3230'],
    courseCode: 'CS3230',
    variants: ['0/1 Knapsack Problem', 'Fibonacci Memoization'],
    icon: 'Grid3X3'
  },
  // 7. Binary Heap
  {
    id: 'binary-heap',
    title: 'Binary Heap & Priority Queue',
    shortDescription: 'Complete binary tree mapped onto flat contiguous array satisfying max/min heap-order property.',
    category: 'trees',
    complexity: {
      timeBest: 'O(1)',
      timeAvg: 'O(log N)',
      timeWorst: 'O(log N)',
      spaceWorst: 'O(N)',
      stable: false,
      inPlace: true
    },
    difficulty: 'Intermediate',
    tags: ['Priority Queue', 'Heapify', 'Complete Tree', 'CS2040'],
    courseCode: 'CS2040',
    variants: ['Max Heapify', 'Extract Max', 'Insert'],
    icon: 'Boxes'
  },
  // 8. Hash Table
  {
    id: 'hash-table',
    title: 'Hash Table & Collision Resolution',
    shortDescription: 'Direct O(1) expected lookups using modulo hashing with open addressing linear probing.',
    category: 'hashing',
    complexity: {
      timeBest: 'O(1)',
      timeAvg: 'O(1)',
      timeWorst: 'O(N)',
      spaceWorst: 'O(N)',
      stable: false,
      inPlace: true
    },
    difficulty: 'Beginner',
    tags: ['Collision Resolution', 'Linear Probing', 'Load Factor', 'CS2040'],
    courseCode: 'CS2040',
    variants: ['Linear Probing', 'Chaining'],
    icon: 'Hash'
  },
  // 9. Minimum Spanning Tree
  {
    id: 'mst',
    title: 'Minimum Spanning Tree (MST)',
    shortDescription: 'Connecting all vertices with minimal total edge weight without introducing cycles using Kruskal and Prim.',
    category: 'graphs',
    complexity: {
      timeBest: 'O(E log V)',
      timeAvg: 'O(E log V)',
      timeWorst: 'O(E log V)',
      spaceWorst: 'O(V + E)',
      stable: false,
      inPlace: false
    },
    difficulty: 'Intermediate',
    tags: ['Greedy', 'Kruskal', 'Prim', 'Disjoint Set', 'CS2040'],
    courseCode: 'CS2040',
    variants: ['Prim Algorithm', 'Kruskal Algorithm'],
    icon: 'Workflow'
  },
  // 10. Disjoint Set Union
  {
    id: 'union-find',
    title: 'Union-Find Disjoint Set (UFDS)',
    shortDescription: 'Near-constant O(α(N)) amortized partition management using union by rank and path compression.',
    category: 'trees',
    complexity: {
      timeBest: 'O(1)',
      timeAvg: 'O(α(N))',
      timeWorst: 'O(α(N))',
      spaceWorst: 'O(N)',
      stable: false,
      inPlace: true
    },
    difficulty: 'Intermediate',
    tags: ['Inverse Ackermann', 'Path Compression', 'Rank Union', 'CS2040'],
    courseCode: 'CS2040',
    variants: ['Find with Compression', 'Union by Rank'],
    icon: 'Share2'
  }
];

export interface LearningTrack {
  id: string;
  title: string;
  badge: string;
  description: string;
  moduleIds: string[];
  estimatedHours: string;
}

export const LEARNING_TRACKS: LearningTrack[] = [
  {
    id: 'cs2040-nus',
    title: 'NUS CS2040 Core Syllabus',
    badge: 'University Track',
    description: 'The standard data structures and algorithmic foundation taught at National University of Singapore.',
    moduleIds: ['sorting', 'linear-structures', 'bst-avl', 'binary-heap', 'hash-table', 'graph-traversal', 'shortest-path', 'mst'],
    estimatedHours: '32 Hours'
  },
  {
    id: 'interview-essentials',
    title: 'FAANG Technical Interview Sprint',
    badge: 'Career Accelerator',
    description: 'High-frequency algorithmic paradigms tested across top tier engineering interview loops.',
    moduleIds: ['sorting', 'bst-avl', 'graph-traversal', 'shortest-path', 'dynamic-programming'],
    estimatedHours: '20 Hours'
  },
  {
    id: 'beginner-foundations',
    title: 'Algorithms 101: Absolute Basics',
    badge: 'Zero to Hero',
    description: 'Master step-by-step logic, pointers, Big-O notation, and elementary comparative sorting.',
    moduleIds: ['linear-structures', 'sorting', 'bst-avl'],
    estimatedHours: '10 Hours'
  }
];
