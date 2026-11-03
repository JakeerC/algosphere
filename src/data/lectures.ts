import { LectureSlide } from '../types/algorithm';

export const MODULE_LECTURES: Record<string, LectureSlide[]> = {
  'sorting': [
    {
      title: '1. Why Sorting Matters',
      subtitle: 'The Gateway to Efficient Computation',
      content: [
        'Sorting is the foundational building block in Computer Science. Once an array is sorted, searching decreases from O(N) linear scan to O(log N) binary search.',
        'Comparison-based sorts operate solely by evaluating whether element A ≤ element B. Information-theoretic lower bound proves that NO comparison-based sort can exceed O(N log N) in the worst case.',
        'Distribution-based sorts (like Counting Sort or Radix Sort) bypass this bound to achieve O(N) by exploiting key properties rather than pairwise comparisons.'
      ],
      callout: {
        type: 'important',
        text: 'Crucial distinction: An algorithm is "Stable" if duplicate keys retain their relative order before and after sorting. Merge Sort is stable; Quick Sort is generally not.'
      },
      keyInvariants: [
        'Comparison Lower Bound: Ω(N log N)',
        'In-Place: Auxiliary memory remains O(1) or O(log N)',
        'Stability preserves ordering of multi-field records'
      ]
    },
    {
      title: '2. Elementary Sorts: Bubble, Selection & Insertion',
      subtitle: 'Understanding Quadratic O(N²) Mechanics',
      content: [
        'Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The largest unsorted element "bubbles" to its final position in each pass.',
        'Selection Sort finds the minimum element from the unsorted subarray and places it at the beginning. It minimizes the total number of swaps (at most N swaps).',
        'Insertion Sort constructs the sorted array one item at a time. It is exceptionally fast for nearly-sorted data, achieving O(N) best case.'
      ],
      callout: {
        type: 'tip',
        text: 'Pro Tip: Insertion Sort is used as the base case inside production hybrids like Java\'s TimSort and C++ std::sort when subarrays fall below 16-32 elements.'
      },
      keyInvariants: [
        'Bubble Sort: After pass k, the last k elements are guaranteed in their final sorted positions.',
        'Selection Sort: After pass k, the first k elements are the k smallest in sorted order.',
        'Insertion Sort: After step k, array[0...k] is sorted among themselves.'
      ],
      codeSnippet: `// Insertion Sort Invariant
for (int i = 1; i < n; i++) {
    int key = arr[i];
    int j = i - 1;
    while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j]; // Shift right
        j--;
    }
    arr[j + 1] = key;
}`
    },
    {
      title: '3. Divide and Conquer: Merge Sort & Quick Sort',
      subtitle: 'Reaching the Optimal O(N log N) Frontier',
      content: [
        'Merge Sort divides the array into two halves, recursively sorts each half, and merges the two sorted subarrays in O(N) time. Recurrence: T(N) = 2T(N/2) + O(N) = O(N log N) across all cases.',
        'Quick Sort selects a pivot element and partitions the array such that all items smaller than pivot are on the left, and items greater are on the right. Pivot is placed in its permanent position.',
        'Average case for Quick Sort is O(N log N) with small constant factors, making it practically faster in CPU cache than Merge Sort despite its O(N²) worst case.'
      ],
      callout: {
        type: 'warning',
        text: 'Pivot selection is paramount: Picking the first element on a sorted array degrades Quick Sort to O(N²). Modern implementations utilize Median-of-Three or Randomized Pivoting.'
      },
      keyInvariants: [
        'Merge Sort: Always O(N log N) time; requires O(N) auxiliary space.',
        'Quick Sort: Average O(N log N) time; in-place O(log N) stack recursion.',
        'Partitioning invariant: A[left...pivot-1] ≤ pivot ≤ A[pivot+1...right]'
      ]
    }
  ],

  'bst-avl': [
    {
      title: '1. The Binary Search Tree Property',
      subtitle: 'Hierarchical Key-Value Lookup',
      content: [
        'A Binary Search Tree (BST) is a node-based binary tree data structure where each node has at most two children.',
        'BST Invariant: For any node X, all keys in X\'s left subtree are strictly LESS than X.key, and all keys in X\'s right subtree are strictly GREATER than X.key.',
        'When a BST is balanced, search, insertion, and deletion take O(log N). However, inserting keys in sorted order degenerates the tree into a linked list with O(N) worst-case height!'
      ],
      callout: {
        type: 'important',
        text: 'The danger of raw BST: Inserting 1, 2, 3, 4, 5 creates a right-skewed stick of height 5, completely forfeiting the logarithmic advantage.'
      },
      keyInvariants: [
        'BST Property: Left < Root < Right',
        'In-Order Traversal yields strictly sorted keys',
        'Unbalanced Height: O(N) worst case'
      ]
    },
    {
      title: '2. AVL Trees & Self-Balancing Rotations',
      subtitle: 'Guaranteed O(log N) via Strict Balance Factor',
      content: [
        'Named after Adelson-Velsky and Landis (1962), an AVL tree enforces a strict height invariant: for every node, the height difference between left and right subtrees (Balance Factor) must be in {-1, 0, +1}.',
        'Balance Factor: BF(node) = height(node.left) - height(node.right).',
        'When an insertion or deletion causes BF to become +2 or -2, the violation is immediately resolved via tree rotations in O(1) time.'
      ],
      callout: {
        type: 'tip',
        text: 'Four rotation cases: Left-Left (Right Rotation), Right-Right (Left Rotation), Left-Right (Double Rotation: Left then Right), Right-Left (Double Rotation: Right then Left).'
      },
      keyInvariants: [
        'AVL Balance Factor: |height(left) - height(right)| ≤ 1',
        'Maximum AVL Height is strictly bounded: h < 1.44 log₂(N + 2)',
        'Rotations preserve the BST Invariant while decreasing tree depth.'
      ],
      codeSnippet: `// Left Rotation around node X
Node* rotateLeft(Node* X) {
    Node* Y = X->right;
    X->right = Y->left;
    Y->left = X;
    updateHeight(X);
    updateHeight(Y);
    return Y; // New root
}`
    }
  ],

  'graph-traversal': [
    {
      title: '1. Graph Traversals: BFS vs DFS',
      subtitle: 'Systematic Topological Exploration',
      content: [
        'Graphs represent arbitrary relationships between vertices (nodes) and edges (connections). Traversing requires marking visited vertices to prevent infinite cycles.',
        'Breadth-First Search (BFS) explores vertices in waves of increasing distance from the starting source. It uses a First-In-First-Out (FIFO) Queue.',
        'Depth-First Search (DFS) dives deeply along each branch until a dead end is reached, then backtracks. It uses a Last-In-First-Out (LIFO) Stack or call stack recursion.'
      ],
      callout: {
        type: 'important',
        text: 'Fundamental Theorem: In unweighted graphs, BFS is guaranteed to discover the shortest path (minimum edge count) from the start vertex to all other reachable vertices.'
      },
      keyInvariants: [
        'Time Complexity: O(V + E) using Adjacency List',
        'BFS uses Queue -> discovers shortest unweighted distance',
        'DFS uses Stack / Recursion -> cycle detection, topological sort, bipartite check'
      ]
    }
  ],

  'shortest-path': [
    {
      title: '1. Dijkstra’s Shortest Path Algorithm',
      subtitle: 'Greedy Relaxation with Priority Queue',
      content: [
        'Dijkstra’s algorithm finds the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edge weights.',
        'It maintains a distance estimate d[u] for each vertex, initialized to ∞ (with d[source] = 0).',
        'At each step, it greedily selects the unvisited vertex u with the smallest d[u], marks it as finalized, and "relaxes" all outgoing edges (u, v): if d[u] + weight(u, v) < d[v], then d[v] is updated.'
      ],
      callout: {
        type: 'warning',
        text: 'Negative weight edges break Dijkstra! If a graph contains negative weights, you MUST use the Bellman-Ford algorithm (O(V × E)).'
      },
      keyInvariants: [
        'Greedy Choice: Once a vertex u is extracted from the Priority Queue, its shortest distance d[u] is finalized.',
        'Edge Relaxation: if (d[u] + w < d[v]) d[v] = d[u] + w',
        'Complexity: O((V + E) log V) with Binary Min-Heap'
      ]
    }
  ],

  'linear-structures': [
    {
      title: '1. Linear Data Structures & Memory Layout',
      subtitle: 'Contiguous vs Pointer-Chained Representations',
      content: [
        'Arrays provide O(1) random access via index calculation `base_address + index × element_size`, but resizing requires allocating a new memory block and copying all N items.',
        'Linked Lists store items in disjoint memory blocks connected via explicit pointers (`next`, `prev`). Insertions and deletions at known pointers take O(1), but searching requires O(N) sequential traversal.',
        'Stack enforces Last-In-First-Out (LIFO). Ideal for function call stacks, undo/redo buffers, and bracket syntax parsing.',
        'Queue enforces First-In-First-Out (FIFO). Essential for breadth-first search, print spoolers, and message queues.'
      ],
      callout: {
        type: 'tip',
        text: 'Modern hardware note: Because arrays are stored contiguously, CPU hardware prefetchers can cache entire cache lines (64 bytes), making sequential array traversal up to 10x faster than pointer hopping in linked lists.'
      },
      keyInvariants: [
        'Stack: Push to Top O(1), Pop from Top O(1)',
        'Queue: Enqueue at Tail O(1), Dequeue at Head O(1)',
        'Linked List: No fixed capacity constraint, extra pointer memory overhead'
      ]
    }
  ],

  'dynamic-programming': [
    {
      title: '1. Foundations of Dynamic Programming',
      subtitle: 'Optimal Substructure & Overlapping Subproblems',
      content: [
        'Dynamic Programming (DP) is a technique that breaks a complex optimization problem into overlapping subproblems, solves each subproblem once, and stores their results in a table.',
        'Two golden prerequisites for DP: 1) Optimal Substructure (an optimal solution to the problem contains optimal solutions to subproblems), and 2) Overlapping Subproblems (the same subproblems are computed repeatedly in a naive recursive tree).',
        'Two approaches: Top-Down with Memoization (caching recursive calls) vs Bottom-Up Tabulation (iterative table building from base cases).'
      ],
      callout: {
        type: 'important',
        text: 'Classic 0/1 Knapsack recurrence: dp[i][w] = max(dp[i-1][w], val[i] + dp[i-1][w - weight[i]]) if w >= weight[i] else dp[i-1][w].'
      },
      keyInvariants: [
        'State Definition: Clearly identify what each dp[i][j] cell represents.',
        'Base Cases: Initial conditions that anchor the recurrence.',
        'Transition Function: The recurrence relationship connecting states.'
      ]
    }
  ],

  'binary-heap': [
    {
      title: '1. The Complete Binary Heap',
      subtitle: 'Tree Abstraction Mapped onto Contiguous Memory',
      content: [
        'A Binary Heap is a complete binary tree where every level except possibly the last is completely filled, and all leaf nodes are as far left as possible.',
        'Because of this structural completeness, a Binary Heap can be represented in a compact 1D array without storing any explicit left/right child pointers!',
        'For node at index i: Left child is at 2*i + 1, Right child is at 2*i + 2, and Parent is at floor((i - 1) / 2).'
      ],
      callout: {
        type: 'important',
        text: 'Max-Heap Property: For every node i other than the root, A[parent(i)] >= A[i]. The maximum element is always at the root index 0.'
      },
      keyInvariants: [
        'Compact Array Representation: No pointer memory overhead',
        'Height is strictly bounded by floor(log2(N))',
        'Heapify runs in O(log N) time'
      ],
      codeSnippet: `// Array Indexing Formulas
int left(int i)   { return 2 * i + 1; }
int right(int i)  { return 2 * i + 2; }
int parent(int i) { return (i - 1) / 2; }`
    },
    {
      title: '2. Priority Queue Operations & Heapify',
      subtitle: 'Extract Max, Insert, and Sift Operations',
      content: [
        'Extract Max: Swap root A[0] with the last leaf A[heapSize - 1], decrement heapSize by 1, and sift down the new root using maxHeapify in O(log N).',
        'Insert: Place the new key at the next available leaf slot A[heapSize], increment heapSize, and sift up by swapping with its parent while the heap property is violated.',
        'Build Heap: Applying sift-down from floor(N/2)-1 down to 0 constructs a valid heap in linear O(N) time (sum of heights bounded by N).'
      ],
      callout: {
        type: 'tip',
        text: 'Building a heap from an unordered array using bottom-up sift-down takes only O(N) time, not O(N log N)!'
      },
      keyInvariants: [
        'Find Max: O(1)',
        'Extract Max: O(log N)',
        'Insert: O(log N)',
        'Build Max Heap: O(N)'
      ]
    }
  ],

  'hash-table': [
    {
      title: '1. Hash Tables & Direct Addressing',
      subtitle: 'Achieving Expected O(1) Dictionary Lookup',
      content: [
        'A Hash Table maps arbitrary keys to bucket indices in an array of size M using a mathematical hash function h(key).',
        'Direct addressing allows O(1) constant-time insertions, deletions, and lookups when the hash function distributes keys uniformly.',
        'Load Factor alpha = N / M represents the average number of items per bucket slot. Maintaining alpha <= 0.75 via dynamic resizing is crucial for O(1) performance.'
      ],
      callout: {
        type: 'important',
        text: 'The Pigeonhole Principle guarantees that collisions (distinct keys k1 != k2 with h(k1) == h(k2)) are inevitable whenever N > M.'
      },
      keyInvariants: [
        'Deterministic: Given identical keys, hash function must always produce identical indices.',
        'Uniform Distribution: Minimizes clustering and bucket variance.',
        'Load factor alpha = N / M controls time-space trade-off.'
      ]
    },
    {
      title: '2. Collision Resolution Paradigms',
      subtitle: 'Separate Chaining vs Open Addressing',
      content: [
        'Separate Chaining: Each bucket holds an independent linked list. When collisions occur, the new element is inserted into the chain. Gracefully handles load factors alpha > 1.',
        'Open Addressing (Linear Probing): All elements reside directly in the table. On collision at index i, probe subsequent slots (i + 1) mod M until an empty bucket is encountered.',
        'Clustering Effect: Linear probing suffers from primary clustering where long occupied runs form, degrading probe efficiency toward O(N) in worst cases.'
      ],
      callout: {
        type: 'tip',
        text: 'Java HashMap uses Separate Chaining, automatically converting linked lists into Red-Black Trees when bucket depth exceeds 8 elements (O(log N) worst-case defense).'
      },
      keyInvariants: [
        'Separate Chaining: Expected search time O(1 + alpha)',
        'Linear Probing: Probe formula index = (h(key) + i) mod M',
        'Dynamic Resizing: Rehash all keys to double capacity when alpha exceeds threshold'
      ]
    }
  ],

  'mst': [
    {
      title: '1. Minimum Spanning Trees (MST)',
      subtitle: 'Connecting Graphs with Minimal Total Cost',
      content: [
        'Given a connected, undirected, weighted graph G = (V, E), a Minimum Spanning Tree is an acyclic subgraph spanning all vertices V with exactly |V| - 1 edges having the minimal possible sum of weights.',
        'Cut Property: For any partition of vertices into subsets S and V - S, the minimum-weight crossing edge across the cut belongs to the Minimum Spanning Tree.',
        'Cycle Property: For any cycle in the graph, the edge with strictly maximal weight does not belong to any MST.'
      ],
      callout: {
        type: 'important',
        text: 'Spanning tree invariant: A spanning tree on V vertices always contains exactly |V| - 1 edges and is connected with zero cycles.'
      },
      keyInvariants: [
        'Vertices in MST: exactly |V|',
        'Edges in MST: exactly |V| - 1',
        'Cut Property establishes greedy optimality'
      ]
    },
    {
      title: '2. Kruskal vs Prim: Two Greedy Philosophies',
      subtitle: 'Edge-Centric vs Vertex-Centric Exploration',
      content: [
        'Kruskal Algorithm: Sort all edges in non-decreasing weight order. Iterate through edges, adding edge (u, v) if endpoints belong to different disjoint sets using UFDS. Time: O(E log V).',
        'Prim Algorithm: Grow a single connected tree from an arbitrary root vertex. In each step, greedily choose the minimum weight edge crossing the cut between the tree and the remaining vertices. Time: O((V + E) log V) with Priority Queue.',
        'Kruskal is naturally suited for sparse graphs (E ~ V); Prim is optimal for dense graphs (E ~ V^2).'
      ],
      callout: {
        type: 'tip',
        text: 'Kruskal and Prim both yield an identical minimum total weight, even if multiple distinct valid MSTs exist due to duplicate edge weights.'
      },
      keyInvariants: [
        'Kruskal: Edge-centric with Union-Find Disjoint Set',
        'Prim: Vertex-centric with Priority Queue',
        'Both run in O(E log V) optimal comparison time'
      ]
    }
  ],

  'union-find': [
    {
      title: '1. Disjoint Set Union (UFDS)',
      subtitle: 'Partitioning Sets with Near-Constant Amortized Cost',
      content: [
        'The Union-Find Disjoint Set maintains a collection of disjoint dynamic subsets S = {S1, S2, ..., Sk}.',
        'Two core operations: 1) find(i): returns the representative root leader of the set containing element i, and 2) union(i, j): merges the set containing i with the set containing j.',
        'Represented as an inverted forest where each node points to its parent, with the set leader pointing to itself (parent[root] == root).'
      ],
      callout: {
        type: 'important',
        text: 'Naive tree representation can degenerate into a linear chain of depth O(N). Two simple heuristics collapse this to amortized O(alpha(N))!'
      },
      keyInvariants: [
        'Disjoint: No element can belong to multiple sets simultaneously',
        'Canonical Leader: Every set is uniquely identified by its root node'
      ]
    },
    {
      title: '2. Two Golden Heuristics',
      subtitle: 'Union by Rank & Path Compression',
      content: [
        'Union by Rank: Always attach the root of the shallower tree beneath the root of the deeper tree (rank approximates tree height). Only increment rank when both trees have equal depth.',
        'Path Compression: During find(i), flatten the tree by pointing every traversed node directly to the root leader.',
        'Combined Efficiency: Together, these two heuristics achieve an amortized time complexity of O(alpha(N)) per operation, where alpha is the Inverse Ackermann function—for all practical N (<= 10^80), alpha(N) <= 4!'
      ],
      callout: {
        type: 'tip',
        text: 'O(alpha(N)) is so exceptionally close to O(1) that Union-Find operations are treated as constant time in competitive programming and system designs.'
      },
      keyInvariants: [
        'Union by Rank prevents tree height from exceeding floor(log2 N)',
        'Path Compression flattens the search path on every find() call',
        'Amortized runtime: O(alpha(N)) <= 4 operations for all practical universe sizes'
      ],
      codeSnippet: `// Classic UFDS Find with Path Compression
int find(int i) {
    if (parent[i] == i) return i;
    return parent[i] = find(parent[i]); // Flatten!
}`
    }
  ]
};
