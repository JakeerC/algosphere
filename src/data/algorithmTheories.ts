export interface AlgorithmTheory {
  id: string;
  name: string;
  category: 'trees' | 'graphs' | 'linear' | 'sorting' | 'advanced';
  categoryLabel: string;
  summary: string;
  timeComplexity: {
    search?: string;
    insert?: string;
    delete?: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  coreInvariant: string;
  keyOperations: string[];
  applications: string[];
  edgeCases: string[];
  visualizerLink?: string;
}

export const ALGORITHM_THEORIES: Record<string, AlgorithmTheory> = {
  'algo-binary-tree': {
    id: 'algo-binary-tree',
    name: 'Binary Search Tree (BST)',
    category: 'trees',
    categoryLabel: 'Trees & Hierarchies',
    summary: 'A hierarchical node-based data structure where each node has at most two children, maintaining sorted order for logarithmic search and insertion.',
    timeComplexity: {
      search: 'O(log N)',
      insert: 'O(log N)',
      delete: 'O(log N)',
      average: 'O(log N)',
      worst: 'O(N) (skewed tree)',
    },
    spaceComplexity: 'O(N) memory, O(H) recursion stack where H is tree height',
    coreInvariant: 'For any node X, all keys in leftSubtree(X) < X.key < all keys in rightSubtree(X).',
    keyOperations: [
      'In-Order Traversal yields strictly monotonically increasing sorted sequence',
      'Successor / Predecessor lookup by finding min(rightSubtree) or max(leftSubtree)',
      'Deletion handles three cases: leaf node, single child splice, or two children (replace with successor)',
    ],
    applications: [
      'Associative sets and map containers (std::set, TreeSet)',
      'Database indexing structures and in-memory symbol tables',
      'Auto-complete hierarchical prefixes and range query engines',
    ],
    edgeCases: [
      'Inserting strictly ascending keys degenerates tree into an O(N) linked list (mitigated by AVL / Red-Black self-balancing)',
      'Duplicate key handling strategies (counter field vs left/right branch rule)',
    ],
    visualizerLink: '/visualizer/bst-avl',
  },

  'algo-linked-list': {
    id: 'algo-linked-list',
    name: 'Singly Linked List',
    category: 'linear',
    categoryLabel: 'Linear Data Structures',
    summary: 'A linear collection of data nodes where each node contains a value and a forward pointer to the subsequent node in memory.',
    timeComplexity: {
      search: 'O(N)',
      insert: 'O(1) at head, O(N) at tail without tail pointer',
      delete: 'O(1) given predecessor, O(N) by value',
      average: 'O(N)',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(N) with O(1) auxiliary pointer overhead per node',
    coreInvariant: 'Each node points strictly to either the next node or null (tail sentinel) without accidental cycles.',
    keyOperations: [
      'Constant-time O(1) prepend at head with zero array reallocations',
      'Pointer swinging for deletion: prev.next = current.next',
      'Two-pointer fast/slow traversal for cycle detection and middle element discovery',
    ],
    applications: [
      'Chained separate chaining collision resolution in hash tables',
      'Undo/redo stacks and dynamic queue implementations',
      'Low-level OS memory allocation free-lists',
    ],
    edgeCases: [
      'Null pointer dereference on empty list head or single-element list tail',
      'Memory leaks in non-garbage-collected languages if orphan nodes are not freed',
    ],
    visualizerLink: '/visualizer/linear-structures',
  },

  'algo-doubly-linked-list': {
    id: 'algo-doubly-linked-list',
    name: 'Doubly Linked List',
    category: 'linear',
    categoryLabel: 'Linear Data Structures',
    summary: 'A bidirectional sequence of nodes where each node retains both a next and a prev pointer, allowing seamless two-way navigation.',
    timeComplexity: {
      search: 'O(N)',
      insert: 'O(1) given target node reference',
      delete: 'O(1) given target node reference',
      average: 'O(N)',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(N) with two pointer references per element',
    coreInvariant: 'For any valid interior node X: X.next.prev === X and X.prev.next === X.',
    keyOperations: [
      'Constant time O(1) removal of an arbitrary node without scanning for predecessor',
      'Bidirectional iterative traversals from either head or tail sentinel',
      'Splice and re-link sub-lists in O(1) time',
    ],
    applications: [
      'LRU Cache implementation (paired with hash map for O(1) access and eviction)',
      'Browser forward / back history navigation stacks',
      'Music player playlists and text editor buffer cursors',
    ],
    edgeCases: [
      'Edge boundary handling at head.prev and tail.next (simplified using sentinel dummy nodes)',
      'Dangling pointers if only one direction is updated during insertion',
    ],
    visualizerLink: '/visualizer/linear-structures',
  },

  'algo-array-buffer': {
    id: 'algo-array-buffer',
    name: 'Indexed Array Buffer',
    category: 'sorting',
    categoryLabel: 'Linear & Sequential Memory',
    summary: 'A contiguous block of physical memory offering constant-time direct indexing via pointer arithmetic: address = base + index * element_size.',
    timeComplexity: {
      search: 'O(1) by index, O(N) by value (O(log N) if sorted)',
      insert: 'O(N) due to right-shift, O(1) amortized append',
      delete: 'O(N) due to left-shift',
      average: 'O(1) read, O(N) write',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(N) strictly packed contiguous memory',
    coreInvariant: 'Elements are stored in adjacent memory addresses with zero pointer indirection overhead.',
    keyOperations: [
      'Direct memory offset indexing in O(1) CPU cycles',
      'Dynamic geometric resizing (e.g. 2x factor) yielding O(1) amortized insertions',
      'Cache-line friendly sequential memory iteration maximizing L1/L2 hardware prefetching',
    ],
    applications: [
      'Default foundational primitive for vectors, matrices, ring buffers, and hash tables',
      'Image pixel buffers, audio PCM sample streams, and high-frequency trading queues',
    ],
    edgeCases: [
      'Buffer index out-of-bounds resulting in segmentation fault or memory corruption',
      'Frequent resizing memory reallocation spikes if capacity is not pre-reserved',
    ],
    visualizerLink: '/visualizer/sorting',
  },

  'algo-stack-lifo': {
    id: 'algo-stack-lifo',
    name: 'LIFO Stack Container',
    category: 'linear',
    categoryLabel: 'Linear Data Structures',
    summary: 'A Last-In, First-Out sequential container restricting insertion and deletion exclusively to a single end termed top.',
    timeComplexity: {
      search: 'O(N)',
      insert: 'O(1) push',
      delete: 'O(1) pop',
      average: 'O(1) for push/pop/peek',
      worst: 'O(1)',
    },
    spaceComplexity: 'O(N) proportional to current element count',
    coreInvariant: 'The most recently inserted element is always the very next element returned upon pop.',
    keyOperations: [
      'push(item): places element on top of stack in O(1)',
      'pop(): removes and returns top element in O(1)',
      'peek(): inspects top element without modification in O(1)',
    ],
    applications: [
      'Function call execution frames and recursion runtime stack in virtual machines',
      'Syntax parsing, bracket matching, and reverse Polish notation calculators',
      'Monotonic stack techniques for Next Greater Element algorithms',
    ],
    edgeCases: [
      'Stack overflow when recursive depth exceeds OS call stack limits',
      'Stack underflow when popping from an empty stack without verification',
    ],
    visualizerLink: '/visualizer/linear-structures',
  },

  'algo-queue-fifo': {
    id: 'algo-queue-fifo',
    name: 'FIFO Queue Pipeline',
    category: 'linear',
    categoryLabel: 'Linear Data Structures',
    summary: 'A First-In, First-Out sequential pipeline where items are enqueued at the back (rear) and dequeued from the front (head).',
    timeComplexity: {
      search: 'O(N)',
      insert: 'O(1) enqueue',
      delete: 'O(1) dequeue',
      average: 'O(1) enqueue & dequeue',
      worst: 'O(1)',
    },
    spaceComplexity: 'O(N) storage with circular buffer or linked nodes',
    coreInvariant: 'Order of departure strictly matches order of arrival.',
    keyOperations: [
      'enqueue(item): appends element to back of line in O(1)',
      'dequeue(): extracts earliest arrived element from front in O(1)',
      'Circular ring buffer modulo indexing: tail = (tail + 1) % capacity',
    ],
    applications: [
      'Breadth-First Search (BFS) graph and tree level-order frontier exploration',
      'Asynchronous task queues (RabbitMQ, Kafka, OS process scheduling)',
      'Print spoolers and network packet routing buffers',
    ],
    edgeCases: [
      'Circular buffer queue full condition: (tail + 1) % capacity === head',
      'Queue starvation if high-priority items bypass FIFO order',
    ],
    visualizerLink: '/visualizer/linear-structures',
  },

  'algo-hash-table': {
    id: 'algo-hash-table',
    name: 'Hash Table & Buckets',
    category: 'advanced',
    categoryLabel: 'Hashing & Caching',
    summary: 'An associative key-value map computing integer bucket indexes via hash functions for near-instantaneous constant-time lookups.',
    timeComplexity: {
      search: 'O(1) average, O(N) worst case on total collision',
      insert: 'O(1) average, O(N) on table rehash',
      delete: 'O(1) average',
      average: 'O(1)',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(N + M) where M is bucket count proportional to load factor alpha',
    coreInvariant: 'Identical keys produce identical hash codes: K1 == K2 implies hash(K1) == hash(K2).',
    keyOperations: [
      'Hash code calculation followed by modulo indexing: index = (hash(key) & 0x7FFFFFFF) % buckets.length',
      'Collision resolution via Separate Chaining (linked lists / red-black trees) or Open Addressing (Linear / Quadratic probing)',
      'Dynamic rehashing when load factor alpha = N / M exceeds threshold (typically 0.75)',
    ],
    applications: [
      'Database indexes, in-memory caches (Redis), compiler symbol tables',
      'Frequency counting, set membership checks, and deduplication pipelines',
    ],
    edgeCases: [
      'Hash collision clustering (primary clustering in linear probing)',
      'Malicious hash collision DoS attacks (mitigated via SipHash or cryptographic hashing)',
    ],
    visualizerLink: '/visualizer/hash-table',
  },

  'algo-graph-network': {
    id: 'algo-graph-network',
    name: 'Graph Network Topology',
    category: 'graphs',
    categoryLabel: 'Graph Algorithms',
    summary: 'A relational network consisting of vertices (nodes) interconnected by directed or undirected edges, modeling complex networks and dependencies.',
    timeComplexity: {
      search: 'O(V + E) for BFS / DFS traversal',
      insert: 'O(1) add vertex/edge in adjacency list',
      delete: 'O(V + E) remove vertex with edge cleanup',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V + E) for Adjacency List, O(V^2) for Adjacency Matrix',
    coreInvariant: 'Connectivity paths obey edge directionality and non-negative or arbitrary weights depending on problem domain.',
    keyOperations: [
      'Breadth-First Search (BFS) finding unweighted shortest paths via FIFO queue',
      'Depth-First Search (DFS) exploring connected components and cycle detection via recursion/stack',
      'Bipartite graph validation, bridge detection (Tarjan), and articulation points',
    ],
    applications: [
      'Social networks (friends of friends), web link crawlers (PageRank)',
      'Circuit routing, dependency resolution (package managers), and neural net graphs',
    ],
    edgeCases: [
      'Disconnected graphs with isolated components requiring outer loop over all vertices',
      'Cycles leading to infinite traversal loops without a visited set',
    ],
    visualizerLink: '/visualizer/graph-traversal',
  },

  'algo-dag-topological': {
    id: 'algo-dag-topological',
    name: 'Directed Acyclic Graph (DAG)',
    category: 'graphs',
    categoryLabel: 'Graph Algorithms',
    summary: 'A directed graph with zero closed loop cycles, admitting a linear topological ordering of vertices where all edges point forward.',
    timeComplexity: {
      search: 'O(V + E) Topological Sort (Kahn or DFS post-order)',
      insert: 'O(1) edge addition with O(V + E) cycle check',
      delete: 'O(1) edge removal',
      average: 'O(V + E)',
      worst: 'O(V + E)',
    },
    spaceComplexity: 'O(V + E) graph plus O(V) in-degree tracking array',
    coreInvariant: 'For every directed edge u -> v, vertex u appears before vertex v in the topological sequence.',
    keyOperations: [
      'Kahn\'s Algorithm: enqueue vertices with in-degree == 0, decrement neighbors upon processing',
      'DFS Post-Order Reversal: push completed nodes onto stack during backtrack',
      'Longest path and shortest path in DAG via dynamic programming in O(V + E)',
    ],
    applications: [
      'Build systems (Make, CMake, Webpack, Bazel) resolving task compilation order',
      'Course prerequisite graphs in university curricula (NUS CS2040)',
      'Data engineering workflows (Apache Airflow DAGs)',
    ],
    edgeCases: [
      'Graph containing a directed cycle makes topological ordering mathematically impossible',
      'Multiple valid topological orderings exist for disconnected or parallel independent tasks',
    ],
    visualizerLink: '/visualizer/graph-traversal',
  },

  'algo-heap-tree': {
    id: 'algo-heap-tree',
    name: 'Min/Max Priority Heap',
    category: 'trees',
    categoryLabel: 'Trees & Hierarchies',
    summary: 'A complete binary tree packed contiguously in an array satisfying the heap property, giving constant-time access to the extremum element.',
    timeComplexity: {
      search: 'O(1) peek min/max, O(N) arbitrary search',
      insert: 'O(log N) bubble-up',
      delete: 'O(log N) extract min/max with bubble-down',
      average: 'O(log N)',
      worst: 'O(log N)',
    },
    spaceComplexity: 'O(N) contiguous array with zero pointer overhead',
    coreInvariant: 'For a min-heap: parent(i).val <= child(i).val for all nodes. Root is strictly the minimum element.',
    keyOperations: [
      'Array child indexing: left = 2*i + 1, right = 2*i + 2, parent = floor((i - 1) / 2)',
      'siftUp(index): bubble recently appended item up towards root while smaller than parent',
      'siftDown(index): swap root with smaller child iteratively to restore invariant',
      'Linear time buildHeap(array) in O(N) by sifting down from bottom-up',
    ],
    applications: [
      'Priority queues in operating system CPU thread scheduling',
      'Dijkstra\'s shortest path and Prim\'s minimum spanning tree greedy algorithms',
      'Top-K elements and median maintenance in streaming data',
    ],
    edgeCases: [
      'Extracting from empty heap throws underflow exception',
      'Equal priority elements: standard binary heap is not stable without secondary timestamp keys',
    ],
    visualizerLink: '/visualizer/binary-heap',
  },

  'algo-recursion-spiral': {
    id: 'algo-recursion-spiral',
    name: 'Recursive Call Stack',
    category: 'advanced',
    categoryLabel: 'Dynamic Programming & Recursion',
    summary: 'A computational pattern where a function solves a problem by invoking smaller instances of itself until reaching terminating base cases.',
    timeComplexity: {
      search: 'Depends on recurrence relation: T(N) = a*T(N/b) + f(N) (Master Theorem)',
      insert: 'N/A',
      delete: 'N/A',
      average: 'O(2^N) naive Fibonacci -> O(N) memoized',
      worst: 'O(N!) permutations',
    },
    spaceComplexity: 'O(D) call stack frames where D is max recursion tree depth',
    coreInvariant: 'Every recursive branch must strictly converge towards an achievable base case condition without infinite recursion.',
    keyOperations: [
      'Base case evaluation: guard clause halting further branching',
      'State transition: divide problem into subproblems and recombine results',
      'Backtracking: revert state mutations when unwinding call stack',
    ],
    applications: [
      'Tree and graph depth-first explorations (AST compilers, DOM traversal)',
      'Divide-and-Conquer algorithms (Merge Sort, Quick Sort, Fast Fourier Transform)',
      'Dynamic Programming with top-down memoization',
    ],
    edgeCases: [
      'Missing base case results in StackOverflowError',
      'Redundant overlapping subproblems cause exponential O(2^N) time explosion unless memoized',
    ],
    visualizerLink: '/visualizer/dynamic-programming',
  },

  'algo-binary-search': {
    id: 'algo-binary-search',
    name: 'Binary Search Split',
    category: 'sorting',
    categoryLabel: 'Searching & Partitioning',
    summary: 'An optimal logarithmic search algorithm on sorted collections that discards half of the candidate search space on each comparison.',
    timeComplexity: {
      search: 'O(1) best, O(log N) worst',
      insert: 'N/A',
      delete: 'N/A',
      average: 'O(log N)',
      worst: 'O(log N)',
    },
    spaceComplexity: 'O(1) iterative, O(log N) recursive',
    coreInvariant: 'If target exists in array, it is guaranteed to lie within the inclusive bounds [low, high].',
    keyOperations: [
      'Safe midpoint calculation: mid = low + (high - low) / 2 avoiding integer overflow',
      'Three-way comparison: arr[mid] === target (found), < target (low = mid + 1), > target (high = mid - 1)',
      'Lower-bound / Upper-bound variants finding first occurrence or insertion point',
    ],
    applications: [
      'In-memory binary search (std::lower_bound, bisect)',
      'B-Tree and SSTable block binary search in database storage engines',
      'Binary search on answer space (e.g. capacity to ship packages, minimize max distance)',
    ],
    edgeCases: [
      'Integer overflow bug when calculating (low + high) / 2 in 32-bit signed integers',
      'Off-by-one errors in while condition: low <= high vs low < high',
    ],
    visualizerLink: '/visualizer/sorting',
  },

  'algo-two-pointers': {
    id: 'algo-two-pointers',
    name: 'Two Pointers Convergence',
    category: 'sorting',
    categoryLabel: 'Searching & Partitioning',
    summary: 'An algorithmic technique employing two cursor indices that traverse a collection synchronously or toward each other in linear time.',
    timeComplexity: {
      search: 'O(N)',
      insert: 'N/A',
      delete: 'N/A',
      average: 'O(N)',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(1) strictly constant auxiliary memory',
    coreInvariant: 'Monotonicity: moving a pointer strictly improves or maintains optimality toward the target condition.',
    keyOperations: [
      'Opposite directions: left starting at 0, right starting at N-1 (e.g., Two-Sum sorted, Container With Most Water)',
      'Same direction fast-slow: slow pointer tracks write head, fast pointer scans (e.g., Remove Duplicates, Cycle Detection)',
      'Convergence termination when left >= right',
    ],
    applications: [
      'Partitioning phase of QuickSort',
      'Merged array reconciliation in Merge Sort',
      'Palindrome verification and string in-place reversals',
    ],
    edgeCases: [
      'Over-stepping bounds when incrementing left or decrementing right without cross check',
      'Equal values causing infinite loops unless strict progression is guaranteed',
    ],
    visualizerLink: '/mastery',
  },

  'algo-big-o-complexity': {
    id: 'algo-big-o-complexity',
    name: 'Big-O Complexity Curves',
    category: 'advanced',
    categoryLabel: 'Complexity & Foundations',
    summary: 'The formal mathematical notation characterizing asymptotic upper bounds on runtime and memory consumption as input size N grows toward infinity.',
    timeComplexity: {
      search: 'O(1) < O(log N) < O(N) < O(N log N) < O(N^2) < O(2^N) < O(N!)',
      insert: 'N/A',
      delete: 'N/A',
      average: 'Asymptotic Class',
      worst: 'Strict Upper Bound',
    },
    spaceComplexity: 'Measures auxiliary working memory excluding input data size',
    coreInvariant: 'f(N) = O(g(N)) iff there exist constants c > 0 and N0 > 0 such that |f(N)| <= c * |g(N)| for all N >= N0.',
    keyOperations: [
      'Drop lower-order terms: O(N^2 + 50N + 1000) becomes O(N^2)',
      'Drop constant factors: O(3N log N) becomes O(N log N)',
      'Differentiate Best-case (Omega), Worst-case (Big-O), and Average-case (Theta)',
    ],
    applications: [
      'System scalability capacity planning and architectural bottleneck avoidance',
      'Algorithmic benchmarking and competitive programming verification',
    ],
    edgeCases: [
      'Hidden constant factors: an O(N) algorithm with huge constants can be slower than O(N log N) on practical small N',
      'Cache locality effects: contiguous O(N) array iteration often outperforms O(N) linked list by 10x due to CPU caching',
    ],
    visualizerLink: '/compare',
  },

  'algo-matrix-grid': {
    id: 'algo-matrix-grid',
    name: '2D Matrix & Traversal',
    category: 'linear',
    categoryLabel: 'Linear Data Structures',
    summary: 'A two-dimensional tabular grid structure indexed by row and column coordinates [r][c], mapped linearly in row-major or column-major memory order.',
    timeComplexity: {
      search: 'O(R * C) full scan, O(R + C) on sorted rows and columns',
      insert: 'O(1) cell assignment',
      delete: 'N/A',
      average: 'O(1) cell access',
      worst: 'O(R * C)',
    },
    spaceComplexity: 'O(R * C) total cells in memory',
    coreInvariant: 'Flat memory index mapping for row-major order: index = r * totalColumns + c.',
    keyOperations: [
      '4-directional cardinal exploration: directions = [[-1,0],[1,0],[0,-1],[0,1]]',
      'Spiral matrix traversal via 4 shifting boundary walls (top, bottom, left, right)',
      'Dynamic Programming 2D table recurrence transitions (e.g. LCS, Edit Distance)',
    ],
    applications: [
      'Computer graphics framebuffers, raster images, and raymarching grids',
      'Game boards (Chess, Go, Minesweeper, Pathfinding NavMeshes)',
      'Dynamic programming grid optimizations',
    ],
    edgeCases: [
      'Out of bounds boundary check: 0 <= r < rows && 0 <= c < cols before cell access',
      'Cache thrashing when iterating column-by-column across huge row-major matrices',
    ],
    visualizerLink: '/visualizer/dynamic-programming',
  },

  'algo-trie-tree': {
    id: 'algo-trie-tree',
    name: 'Prefix Trie Tree',
    category: 'trees',
    categoryLabel: 'Trees & Hierarchies',
    summary: 'An ordered tree data structure used to store strings where keys are represented as paths through shared prefix edges rather than stored at individual nodes.',
    timeComplexity: {
      search: 'O(L) where L is query string length (independent of dictionary size N)',
      insert: 'O(L)',
      delete: 'O(L)',
      average: 'O(L)',
      worst: 'O(L)',
    },
    spaceComplexity: 'O(ALPHABET_SIZE * L * N) nodes (compressed in Radix / Patricia Tries)',
    coreInvariant: 'All descendants of a node share a common string prefix defined by the path from the root.',
    keyOperations: [
      'Insert word: traverse matching child edges; instantiate missing nodes; mark terminal isEndOfWord = true',
      'Search prefix: traverse path; return true if path exists regardless of word termination',
      'Autocomplete suggestions: locate prefix node then collect all reachable terminal paths via DFS',
    ],
    applications: [
      'Search engine search-as-you-type autocomplete and spellcheckers',
      'IP routing longest prefix matching (Routing Information Base)',
      'Genome sequence DNA fragment k-mer matching (A, C, G, T)',
    ],
    edgeCases: [
      'High memory footprint with standard 26/256 child pointer arrays (mitigated by hash maps or Radix compression)',
      'Empty string root handling and deletion of prefixes that are substrings of longer words',
    ],
    visualizerLink: '/mastery',
  },

  'algo-sliding-window': {
    id: 'algo-sliding-window',
    name: 'Sliding Window Frame',
    category: 'sorting',
    categoryLabel: 'Searching & Partitioning',
    summary: 'A sub-array or sub-string evaluation pattern maintaining a continuous frame [L, R] that slides over data in linear O(N) time instead of O(N^2).',
    timeComplexity: {
      search: 'O(N)',
      insert: 'N/A',
      delete: 'N/A',
      average: 'O(N)',
      worst: 'O(N)',
    },
    spaceComplexity: 'O(K) where K is distinct character or element window frequency map',
    coreInvariant: 'Window invariant: state inside [L, R] satisfies the target constraint (e.g. sum <= S, or at most K distinct elements).',
    keyOperations: [
      'Expand: increment R to include new elements into the window state',
      'Contract: increment L to shed invalid elements until the window invariant is restored',
      'Update optimal metric (min/max window length or max sum) at valid states',
    ],
    applications: [
      'Maximum sum subarray of fixed size K',
      'Longest substring without repeating characters',
      'TCP flow control sliding window network protocols',
    ],
    edgeCases: [
      'Fixed window size vs variable dynamically resizing window conditions',
      'Empty string or input array length strictly smaller than window requirement',
    ],
    visualizerLink: '/mastery',
  },

  'algo-quicksort-partition': {
    id: 'algo-quicksort-partition',
    name: 'Quicksort Partition',
    category: 'sorting',
    categoryLabel: 'Sorting & Algorithms',
    summary: 'A Divide-and-Conquer sorting algorithm that selects a pivot element and partitions the array into smaller and greater halves recursively.',
    timeComplexity: {
      search: 'N/A',
      insert: 'N/A',
      delete: 'N/A',
      average: 'O(N log N)',
      worst: 'O(N^2) on worst-case pivot picks',
    },
    spaceComplexity: 'O(log N) recursive call stack (in-place data array)',
    coreInvariant: 'After partitioning around pivot P at index k: all elements in [0..k-1] <= P, and all elements in [k+1..N-1] >= P.',
    keyOperations: [
      'Lomuto Partition: single pointer scanning with write index',
      'Hoare Partition: two pointers moving inward toward each other with fewer swaps',
      'Three-Way Partitioning (Dutch National Flag) handling extensive duplicate keys in O(N)',
    ],
    applications: [
      'Standard library sorting algorithms (C qsort, C++ std::sort with Introsort hybrid)',
      'Quickselect algorithm finding the k-th smallest element in O(N) average time',
    ],
    edgeCases: [
      'Pre-sorted inputs causing O(N^2) degradation with naive first/last pivot pick (solved via Median-of-Three or Randomized pivot)',
      'Worst case recursion depth leading to call stack exhaustion (mitigated by tail-call recursion on smaller partition first)',
    ],
    visualizerLink: '/visualizer/sorting',
  },

  'algo-red-black-tree': {
    id: 'algo-red-black-tree',
    name: 'Red-Black Balanced Tree',
    category: 'trees',
    categoryLabel: 'Trees & Hierarchies',
    summary: 'A self-balancing binary search tree augmenting each node with a red or black color bit, guaranteeing height bounded strictly to 2 * log(N+1).',
    timeComplexity: {
      search: 'O(log N)',
      insert: 'O(log N) with at most 2 tree rotations',
      delete: 'O(log N) with at most 3 tree rotations',
      average: 'O(log N)',
      worst: 'O(log N)',
    },
    spaceComplexity: 'O(N) with 1 extra bit per node for color flag',
    coreInvariant: '1. Root is black. 2. No two adjacent red nodes (no red child of red parent). 3. Every root-to-leaf path contains exact same count of black nodes.',
    keyOperations: [
      'Left and Right Tree Rotations restructuring parent-child pointers',
      'Color recoloring flip when uncle node is red',
      'Rotation + Recoloring when uncle node is black',
    ],
    applications: [
      'C++ STL std::map and std::set underlying implementation',
      'Java Collections TreeMap and TreeSet, and Java 8+ HashMap collision bins',
      'Linux kernel completely fair scheduler (CFS) virtual runtime tracking',
    ],
    edgeCases: [
      'Deletion rebalancing with "double-black" phantom node concept',
      'Rotations must carefully update parent pointers in both directions',
    ],
    visualizerLink: '/visualizer/bst-avl',
  },

  'algo-b-tree-node': {
    id: 'algo-b-tree-node',
    name: 'B-Tree Multi-Key Node',
    category: 'trees',
    categoryLabel: 'Trees & Hierarchies',
    summary: 'A self-balancing M-way search tree optimized for systems reading and writing large blocks of memory, minimizing expensive disk I/O seeks.',
    timeComplexity: {
      search: 'O(log N) disk reads',
      insert: 'O(log N)',
      delete: 'O(log N)',
      average: 'O(log N)',
      worst: 'O(log N)',
    },
    spaceComplexity: 'O(N) with nodes matched to disk page/block sizes (e.g. 4KB / 8KB)',
    coreInvariant: 'All leaf nodes reside at the exact same depth. Every internal node except root has between ceil(M/2) and M children.',
    keyOperations: [
      'In-node binary search across sorted keys array',
      'Node splitting: when a node exceeds M-1 keys, the median key ascends to parent',
      'Node borrowing and merging during underflow deletions',
    ],
    applications: [
      'Relational and document database indexes (PostgreSQL, MySQL InnoDB, SQLite B+Trees)',
      'Modern filesystem directory structures (NTFS, ext4, Btrfs, APFS)',
    ],
    edgeCases: [
      'Cascade splitting all the way to root increases tree height by 1',
      'Locking concurrency in multi-threaded database transactions',
    ],
    visualizerLink: '/visualizer/bst-avl',
  },

  'algo-bloom-filter': {
    id: 'algo-bloom-filter',
    name: 'Bloom Filter Hash Bitset',
    category: 'advanced',
    categoryLabel: 'Hashing & Caching',
    summary: 'A space-efficient probabilistic data structure that tests set membership with zero false negatives and a tunable small false positive rate.',
    timeComplexity: {
      search: 'O(k) where k is number of independent hash functions',
      insert: 'O(k)',
      delete: 'Not supported in standard Bloom filters',
      average: 'O(k)',
      worst: 'O(k)',
    },
    spaceComplexity: 'O(m) bits, vastly smaller than storing raw keys',
    coreInvariant: 'False Negatives are impossible: if item was added, query will NEVER return false.',
    keyOperations: [
      'Insert: compute k independent hashes h1(x)...hk(x); set corresponding bit indices in bit array to 1',
      'Query: compute k hashes; if ANY bit is 0, element is definitely NOT in set; if ALL bits are 1, element is PROBABLY in set',
    ],
    applications: [
      'Database disk read guards (Cassandra, RocksDB, Bigtable avoiding disk reads for non-existent keys)',
      'Malicious URL web filtering in browsers (Google Chrome safe browsing)',
      'Cryptocurrency Bitcoin SPV node wallet transaction verification',
    ],
    edgeCases: [
      'Standard bloom filter does not support deletions (addressed by Counting Bloom Filters)',
      'Saturation: as bitset fills with 1s, false positive rate approaches 100%',
    ],
    visualizerLink: '/visualizer/hash-table',
  },

  'algo-lru-cache': {
    id: 'algo-lru-cache',
    name: 'LRU Cache Memory Buffer',
    category: 'advanced',
    categoryLabel: 'Hashing & Caching',
    summary: 'A fixed-capacity caching structure evicting the Least Recently Used item first, executing get and put operations in constant O(1) time.',
    timeComplexity: {
      search: 'O(1) get',
      insert: 'O(1) put',
      delete: 'O(1) evict',
      average: 'O(1)',
      worst: 'O(1)',
    },
    spaceComplexity: 'O(C) where C is maximum cache capacity',
    coreInvariant: 'The head of the doubly linked list holds the most recently accessed item; the tail holds the least recently accessed eviction candidate.',
    keyOperations: [
      'get(key): lookup node in hash map; move node to head of doubly linked list; return value in O(1)',
      'put(key, val): if key exists, update and move to head; if new key and size == capacity, remove tail node and map key; insert new node at head in O(1)',
    ],
    applications: [
      'Web browser asset cache, CDN edge caching (Cloudflare, Akamai)',
      'Database buffer pool manager caching disk pages into RAM',
      'CPU L1/L2 cache line replacement policies',
    ],
    edgeCases: [
      'Concurrent access requiring thread-safe synchronizations or lock striping',
      'Cache stampede / thundering herd problem when key expires under high load',
    ],
    visualizerLink: '/visualizer/hash-table',
  },

  'algo-union-find-dsu': {
    id: 'algo-union-find-dsu',
    name: 'Disjoint Set Union (DSU)',
    category: 'graphs',
    categoryLabel: 'Graph Algorithms',
    summary: 'A data structure maintaining a partition of elements into disjoint non-overlapping sets, answering connectivity queries in near-constant time.',
    timeComplexity: {
      search: 'O(alpha(N)) find root (alpha is Inverse Ackermann function <= 4)',
      insert: 'O(1) make set',
      delete: 'N/A',
      average: 'O(alpha(N)) ~= O(1)',
      worst: 'O(alpha(N))',
    },
    spaceComplexity: 'O(N) parent and rank arrays',
    coreInvariant: 'Elements in the same connected component share the exact same canonical root representative.',
    keyOperations: [
      'find(i) with Path Compression: parent[i] = find(parent[i]) flattening tree hierarchy directly to root',
      'union(i, j) with Union by Rank: attach shallower tree root under deeper tree root to minimize height growth',
      'connected(i, j): test if find(i) === find(j)',
    ],
    applications: [
      'Kruskal\'s Minimum Spanning Tree algorithm cycle detection',
      'Dynamic connected components in network graphs',
      'Image processing connected component labeling (flood fill segmentation)',
    ],
    edgeCases: [
      'Omitting path compression degrades DSU to an O(N) linked list structure',
      'Detecting graph cycles in directed graphs (DSU works natively on undirected graphs only)',
    ],
    visualizerLink: '/visualizer/union-find',
  },

  'algo-segment-tree': {
    id: 'algo-segment-tree',
    name: 'Interval Segment Tree',
    category: 'trees',
    categoryLabel: 'Trees & Hierarchies',
    summary: 'A full binary tree designed for answering range queries (sum, min, max, gcd) and point/range updates in logarithmic O(log N) time.',
    timeComplexity: {
      search: 'O(log N) range query',
      insert: 'O(log N) point update',
      delete: 'N/A',
      average: 'O(log N)',
      worst: 'O(log N)',
    },
    spaceComplexity: 'O(4N) array storage representing tree levels',
    coreInvariant: 'Each tree node represents an interval [L, R]; its children represent [L, mid] and [mid+1, R].',
    keyOperations: [
      'Build tree in O(N) time bottom-up merging child interval aggregates',
      'Range Query [queryL, queryR]: traverse overlapping subtrees and aggregate matching segments',
      'Lazy Propagation: postpone range updates to child nodes until child is explicitly queried in O(log N)',
    ],
    applications: [
      'Dynamic range minimum/maximum queries (RMQ) and range sum intervals',
      'Computational geometry segment intersection and skyline problems',
      'Stock market time-series streaming analytics',
    ],
    edgeCases: [
      'Array allocation sizing requires 4 * N elements to prevent index overflow on non-power-of-two N',
      'Correct lazy propagation clearing before inspecting child interval values',
    ],
    visualizerLink: '/visualizer/bst-avl',
  },

  'algo-huffman-encoding': {
    id: 'algo-huffman-encoding',
    name: 'Huffman Coding Tree',
    category: 'trees',
    categoryLabel: 'Trees & Hierarchies',
    summary: 'A greedy lossless compression algorithm assigning variable-length binary prefix codes to characters based on their statistical frequency of occurrence.',
    timeComplexity: {
      search: 'O(L) decode bitstream where L is bits length',
      insert: 'N/A',
      delete: 'N/A',
      average: 'O(N log N) build tree via min-priority heap',
      worst: 'O(N log N)',
    },
    spaceComplexity: 'O(N) tree nodes where N is distinct alphabet characters',
    coreInvariant: 'Prefix property: no encoded binary character code is a prefix of any other character code, ensuring unambiguous decoding.',
    keyOperations: [
      'Count frequency of all characters in corpus',
      'Push leaf nodes to min-heap; repeatedly extract two lowest frequency nodes, fuse into parent node, push back to heap',
      'Traverse tree assigning 0 to left branches and 1 to right branches to build dictionary',
    ],
    applications: [
      'Lossless compression backbones in GZIP, PKZIP, Deflate, JPEG, and MP3 audio',
      'Text transmission bandwidth optimization across constrained networks',
    ],
    edgeCases: [
      'Transmitting or serializing the decompression codebook tree alongside compressed bitstream',
      'Single distinct character corner case requires dedicated single-bit handling',
    ],
    visualizerLink: '/visualizer/binary-heap',
  },

  'algo-shortest-path-dijkstra': {
    id: 'algo-shortest-path-dijkstra',
    name: 'Dijkstra Shortest Path',
    category: 'graphs',
    categoryLabel: 'Graph Algorithms',
    summary: 'A greedy graph algorithm finding single-source shortest path distances to all vertices in a weighted graph with non-negative edge weights.',
    timeComplexity: {
      search: 'O((V + E) log V) with Min-Heap, O(V^2) with array',
      insert: 'N/A',
      delete: 'N/A',
      average: 'O((V + E) log V)',
      worst: 'O((V + E) log V)',
    },
    spaceComplexity: 'O(V) distance array, predecessor tracking, and priority queue',
    coreInvariant: 'Greedy property: once a vertex is extracted from the min-heap, its calculated shortest distance from source is final and optimal.',
    keyOperations: [
      'Initialize dist[source] = 0, all other dist[v] = infinity',
      'Extract vertex u with minimum distance from priority queue',
      'Relaxation: for each neighbor v, if dist[u] + weight(u, v) < dist[v], update dist[v] and push to queue',
    ],
    applications: [
      'GPS navigation and map routing engines (Google Maps, Apple Maps, OpenStreetMap)',
      'Network routing protocols (OSPF - Open Shortest Path First, IS-IS)',
      'Game AI pathfinding and robotics navigation',
    ],
    edgeCases: [
      'Negative edge weights cause infinite loops or incorrect results (requires Bellman-Ford algorithm instead)',
      'Stale heap elements: updating priority queue requires either indexed priority queue or discarding stale distance entries',
    ],
    visualizerLink: '/visualizer/shortest-path',
  },

  'algo-min-spanning-tree': {
    id: 'algo-min-spanning-tree',
    name: 'Minimum Spanning Tree (MST)',
    category: 'graphs',
    categoryLabel: 'Graph Algorithms',
    summary: 'A subgraph connecting all vertices in an undirected weighted graph with minimum total edge weight without forming any closed cycles.',
    timeComplexity: {
      search: 'O(E log E) Kruskal\'s with DSU, O((V + E) log V) Prim\'s with Min-Heap',
      insert: 'N/A',
      delete: 'N/A',
      average: 'O(E log V)',
      worst: 'O(E log V)',
    },
    spaceComplexity: 'O(V + E) edge list and disjoint-set arrays',
    coreInvariant: 'Cut Property: for any cut in graph, the lightest edge crossing the cut must belong to the Minimum Spanning Tree.',
    keyOperations: [
      'Kruskal: sort all edges by weight ascending; add edge to MST if endpoints are in different DSU components',
      'Prim: start at root; greedily add cheapest edge connecting an unvisited vertex to visited tree component',
    ],
    applications: [
      'Civil infrastructure network design (telecommunication cables, water pipelines, electrical power grids)',
      'Hierarchical clustering and image segmentation in machine learning',
    ],
    edgeCases: [
      'Disconnected graph cannot form an MST (forms a Minimum Spanning Forest instead)',
      'Multiple valid MSTs with identical total weight when duplicate edge weights exist',
    ],
    visualizerLink: '/visualizer/mst',
  },

  'algo-consistent-hash-ring': {
    id: 'algo-consistent-hash-ring',
    name: 'Consistent Hashing Ring',
    category: 'advanced',
    categoryLabel: 'Hashing & Caching',
    summary: 'A distributed hashing topology mapping both nodes and keys to a 360-degree circular keyspace, minimizing key reshuffling when servers join or leave.',
    timeComplexity: {
      search: 'O(log S) binary search on sorted token ring where S is total server tokens',
      insert: 'O(log S)',
      delete: 'O(log S)',
      average: 'O(log S)',
      worst: 'O(log S)',
    },
    spaceComplexity: 'O(S) memory where S = nodes * virtual_tokens_per_node',
    coreInvariant: 'Only K / N keys need remapping on average when a node joins or departs, where K is total keys and N is server count.',
    keyOperations: [
      'Map physical servers to multiple virtual nodes on ring: hash(server_ip + "#" + vnode_id)',
      'Map key to ring: hash(key); find first server token in clockwise direction using binary search (std::upper_bound)',
    ],
    applications: [
      'Distributed NoSQL storage systems (Amazon DynamoDB, Apache Cassandra, Riak)',
      'Distributed web caching and load balancers (Memcached, HAProxy, NGINX consistent hash)',
    ],
    edgeCases: [
      'Non-uniform load distribution without virtual nodes (hot spots where one server receives excess keys)',
      'Replication factor R must assign copies to distinct physical machines, not adjacent virtual nodes on same machine',
    ],
    visualizerLink: '/visualizer/hash-table',
  },

  'algo-fenwick-bit-tree': {
    id: 'algo-fenwick-bit-tree',
    name: 'Fenwick Tree (Binary Indexed Tree)',
    category: 'trees',
    categoryLabel: 'Trees & Hierarchies',
    summary: 'An elegant array-backed tree structure computing prefix sums and updating elements dynamically in logarithmic O(log N) time with zero pointer overhead.',
    timeComplexity: {
      search: 'O(log N) prefix sum',
      insert: 'O(log N) point update',
      delete: 'N/A',
      average: 'O(log N)',
      worst: 'O(log N)',
    },
    spaceComplexity: 'O(N) identical memory size to original array',
    coreInvariant: 'Tree index i stores the aggregate sum of range (i - LSB(i), i] where LSB(i) is lowest set bit: i & (-i).',
    keyOperations: [
      'Isolation of Lowest Set Bit: lsb = index & (-index) using two\'s complement arithmetic',
      'query(index): sum += tree[index]; index -= index & (-index) until index == 0',
      'update(index, delta): tree[index] += delta; index += index & (-index) until index > N',
    ],
    applications: [
      'Dynamic frequency tables in arithmetic compression',
      'Inversion counting in permutations and competitive programming prefix ranges',
      'Cumulative rank queries in online leaderboards',
    ],
    edgeCases: [
      '1-indexed convention is strictly required: bitwise index 0 causes infinite loop on 0 & (-0) == 0',
      'Range updates require either difference arrays or dual Fenwick tree configurations',
    ],
    visualizerLink: '/visualizer/bst-avl',
  },

  'algo-backtracking-nqueens': {
    id: 'algo-backtracking-nqueens',
    name: 'Backtracking Search Tree',
    category: 'advanced',
    categoryLabel: 'Dynamic Programming & Recursion',
    summary: 'A refined brute-force search algorithm that builds candidate solutions incrementally and abandons (prunes) branches immediately upon constraint violation.',
    timeComplexity: {
      search: 'O(N!) for N-Queens search space',
      insert: 'N/A',
      delete: 'N/A',
      average: 'Drastically smaller than O(N^N) due to aggressive branch pruning',
      worst: 'O(N!)',
    },
    spaceComplexity: 'O(N) recursion depth and column / diagonal lookup bitsets',
    coreInvariant: 'At every step, partial candidate solution strictly obeys all problem constraints before exploring deeper child states.',
    keyOperations: [
      'Constraint check: verify column, major diagonal (r - c), and minor diagonal (r + c) availability in O(1)',
      'Place queen and recurse: solve(row + 1)',
      'Backtrack undo step: unmark column and diagonal flags upon return',
    ],
    applications: [
      'Sudoku solvers, crossword puzzle generators, and combinatorial optimization',
      'Circuit layout placement, automated theorem proving, and boolean SAT solvers',
      'Traveling Salesperson branch-and-bound pruning',
    ],
    edgeCases: [
      'N=2 and N=3 have zero valid solutions for the N-Queens problem',
      'Failure to undo all state mutations during backtrack corrupts parallel sibling branches',
    ],
    visualizerLink: '/visualizer/dynamic-programming',
  },
};

export function getAlgorithmTheory(id: string): AlgorithmTheory | undefined {
  return ALGORITHM_THEORIES[id];
}
