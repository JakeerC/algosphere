import { QuizQuestion } from '../types/algorithm';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q-sort-1',
    moduleId: 'sorting',
    title: 'Bubble Sort Pass State',
    prompt: 'Given the initial array [45, 12, 85, 32, 8], what is the state of the array after the FIRST full pass of Bubble Sort?',
    options: [
      '[12, 45, 32, 8, 85]',
      '[8, 12, 32, 45, 85]',
      '[12, 32, 8, 45, 85]',
      '[85, 45, 32, 12, 8]'
    ],
    correctIndex: 0,
    explanation: 'In the first pass of Bubble Sort, adjacent elements are compared and swapped: (45,12)->[12,45], (45,85)->no swap, (85,32)->[32,85], (85,8)->[8,85]. The largest element (85) bubbles up to the very last index, resulting in [12, 45, 32, 8, 85].',
    initialArray: [45, 12, 85, 32, 8]
  },
  {
    id: 'q-sort-2',
    moduleId: 'sorting',
    title: 'Quick Sort Worst-Case Trigger',
    prompt: 'Under which scenario does standard Quick Sort using the first element as pivot exhibit worst-case O(N²) time complexity?',
    options: [
      'When the input array is already strictly sorted in ascending or descending order.',
      'When the input array contains uniform random values.',
      'When the input size N is a power of 2.',
      'When all array elements are distinct.'
    ],
    correctIndex: 0,
    explanation: 'If the array is already sorted and the first element is selected as pivot, each partition splits the array into sizes 0 and N - 1. This produces N recursion levels, each doing O(N) work, degenerating into O(N²).',
  },
  {
    id: 'q-bst-1',
    moduleId: 'bst-avl',
    title: 'AVL Tree Balance Factor',
    prompt: 'In an AVL tree, what is the valid range for the Balance Factor (BF = height(left) - height(right)) of any node?',
    options: [
      '{-1, 0, +1}',
      '{0, +1, +2}',
      '{-2, -1, 0, +1, +2}',
      'Any non-negative integer'
    ],
    correctIndex: 0,
    explanation: 'By definition, an AVL tree requires the balance factor of every node to be strictly within {-1, 0, +1}. A balance factor of ±2 immediately triggers a rotation to restore balance.',
  },
  {
    id: 'q-bst-2',
    moduleId: 'bst-avl',
    title: 'BST In-Order Traversal Invariant',
    prompt: 'What characteristic is guaranteed when performing an In-Order traversal (Left -> Node -> Right) on any valid Binary Search Tree?',
    options: [
      'The keys are visited in strictly ascending sorted order.',
      'The keys are visited in descending order.',
      'The leaf nodes are visited first.',
      'The tree height is printed.'
    ],
    correctIndex: 0,
    explanation: 'Because the BST property guarantees Left < Node < Right, visiting Left first, then Node, then Right recursively enumerates all keys in monotonically increasing sorted order.',
  },
  {
    id: 'q-graph-1',
    moduleId: 'graph-traversal',
    title: 'Breadth-First Search Data Structure',
    prompt: 'Which fundamental Abstract Data Type is utilized by Breadth-First Search (BFS) to explore vertices level by level?',
    options: [
      'FIFO Queue',
      'LIFO Stack',
      'Priority Queue',
      'Binary Search Tree'
    ],
    correctIndex: 0,
    explanation: 'BFS uses a First-In-First-Out (FIFO) queue to ensure that vertices discovered first (closer to the source) are expanded before vertices discovered later.',
  },
  {
    id: 'q-shortest-1',
    moduleId: 'shortest-path',
    title: 'Dijkstra Precondition',
    prompt: 'Why does Dijkstra’s algorithm fail when applied to graphs with negative-weight edges?',
    options: [
      'The greedy assumption fails: once a vertex is marked finalized, a future path through a negative edge could yield a shorter total distance.',
      'Priority queues cannot store negative numbers.',
      'Negative edges cause memory buffer overflows.',
      'Dijkstra only works on directed acyclic graphs.'
    ],
    correctIndex: 0,
    explanation: 'Dijkstra assumes that once a vertex is extracted from the priority queue, its shortest distance cannot be decreased further. A negative edge later in the graph invalidates this greedy invariant. Bellman-Ford should be used instead.',
  },
  {
    id: 'q-linear-1',
    moduleId: 'linear-structures',
    title: 'Stack vs Queue Access Principle',
    prompt: 'A printer job scheduler receives documents from multiple users and must print them in the exact order they arrived. Which data structure is ideal?',
    options: [
      'Queue (FIFO: First-In-First-Out)',
      'Stack (LIFO: Last-In-First-Out)',
      'Binary Search Tree',
      'Disjoint Set'
    ],
    correctIndex: 0,
    explanation: 'A print spooler requires fairness: the first document submitted must be the first document printed. This is the exact definition of a FIFO Queue.',
  },
  {
    id: 'q-dp-1',
    moduleId: 'dynamic-programming',
    title: '0/1 Knapsack Decision Property',
    prompt: 'In the 0/1 Knapsack problem, why is it named "0/1"?',
    options: [
      'Each item can either be taken completely (1) or left behind (0); fractional items are prohibited.',
      'All item values must be binary 0 or 1.',
      'The time complexity is bounded by 0 and 1 seconds.',
      'The algorithm only works for 2 items.'
    ],
    correctIndex: 0,
    explanation: 'In 0/1 Knapsack, you cannot take a fraction of an item (unlike Fractional Knapsack which can be solved greedily). For every item i, the decision is binary: either include it (1) or omit it (0).',
  },
  {
    id: 'q-heap-1',
    moduleId: 'binary-heap',
    title: 'Heap Construction Complexity',
    prompt: 'What is the asymptotic time complexity of building a valid Max Binary Heap from an arbitrary unsorted array of N elements using bottom-up sift-down?',
    options: [
      'O(N) linear time',
      'O(N log N) time',
      'O(N²) quadratic time',
      'O(log N) time'
    ],
    correctIndex: 0,
    explanation: 'Although individual sift-downs take O(log N) in the worst case, most nodes reside near the bottom with small heights (h=0,1,2...). The mathematical summation of (height / 2^height) converges to a constant, bounding total build work strictly to O(N).',
  },
  {
    id: 'q-hash-1',
    moduleId: 'hash-table',
    title: 'Hash Collision Primary Clustering',
    prompt: 'Which collision resolution strategy is particularly susceptible to the "Primary Clustering" phenomenon where long contiguous runs of occupied slots slow down subsequent lookups?',
    options: [
      'Linear Probing (Open Addressing)',
      'Separate Chaining with Linked Lists',
      'Double Hashing',
      'Quadratic Probing'
    ],
    correctIndex: 0,
    explanation: 'In Linear Probing, occupied slots tend to form contiguous clusters. Any hash key landing anywhere in the cluster must probe across the entire run and lengthen it, increasing expected search time toward O(N).',
  },
  {
    id: 'q-mst-1',
    moduleId: 'mst',
    title: 'Kruskal Cycle Detection Mechanism',
    prompt: 'How does Kruskal’s algorithm efficiently determine whether adding edge (u, v) introduces an illegal cycle into the forming Minimum Spanning Tree?',
    options: [
      'By checking find(u) == find(v) using a Disjoint Set Union (UFDS) structure.',
      'By running a complete DFS from scratch for each tested edge.',
      'By verifying that the edge weight is positive.',
      'By counting the total degrees of vertices u and v.'
    ],
    correctIndex: 0,
    explanation: 'If find(u) == find(v), vertices u and v already belong to the same connected component, meaning adding edge (u, v) creates a cycle. Otherwise, union(u, v) is called to safely connect the two trees in near-constant O(α(V)) time.',
  },
  {
    id: 'q-ufds-1',
    moduleId: 'union-find',
    title: 'Path Compression Heuristic',
    prompt: 'What is the primary benefit of the Path Compression heuristic during a find(x) operation in Disjoint Set Union?',
    options: [
      'It reparents every visited node on the search path directly to the root, drastically flattening tree height for future queries.',
      'It balances the tree by rotating subtrees like an AVL tree.',
      'It sorts all elements in numerical order.',
      'It deletes unused nodes from memory.'
    ],
    correctIndex: 0,
    explanation: 'Path Compression flattens the tree structure so subsequent lookups on any node along the path reach the root in O(1) direct hops, delivering near-constant amortized O(α(N)) performance.',
  },
  {
    id: 'q-sort-stability',
    moduleId: 'sorting',
    title: 'Sorting Stability Definition',
    prompt: 'Which property describes an algorithm where two items with identical keys preserve their relative input order in the final sorted array?',
    options: [
      'Stability',
      'In-Place',
      'Adaptive',
      'Monotonicity'
    ],
    correctIndex: 0,
    explanation: 'Stability guarantees that records with identical primary keys retain their original sequence. For example, Merge Sort is stable, while Quick Sort and Heap Sort are inherently unstable in their classic implementations.',
  }
];
