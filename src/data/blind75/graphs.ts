import { Blind75Problem, Blind75Step } from '../../types/blind75';

export const GRAPH_PROBLEMS: Blind75Problem[] = [
  // 27. Clone Graph (#133)
  {
    id: 'clone-graph',
    number: 133,
    title: 'Clone Graph',
    category: 'Graph',
    difficulty: 'Medium',
    pattern: 'DFS / BFS with Hash Map Clone Memo',
    grindWeek: 3,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/clone-graph/',
    summary: 'Given a reference to a node in a connected undirected graph, return a deep copy (clone) of the graph.',
    description: `Given a reference of a node in a connected undirected graph. Return a deep copy (clone) of the graph. Each node in the graph contains a value (\`int\`) and a list (\`List[Node]\`) of its neighbors.`,
    examples: [
      { input: 'adjList = [[2,4],[1,3],[2,4],[1,3]]', output: '[[2,4],[1,3],[2,4],[1,3]]' }
    ],
    constraints: [
      'The number of nodes in the graph is in the range [0, 100].',
      '1 <= Node.val <= 100',
      'Node.val is unique for each node.'
    ],
    intuition: `Maintain a hash map mapping \`original_node -> cloned_node\`.
Use DFS traversal: if a node has already been cloned, return its clone directly from the map. Otherwise, create a new \`Node(val)\`, store it in the map, and recursively clone each of its neighbors, appending them to the clone's neighbor list.`,
    pythonSolution: `class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def cloneGraph(node: 'Node') -> 'Node':
    """
    DFS graph cloning using a hash map to map old nodes to new nodes.
    Time: O(V + E), Space: O(V).
    """
    if not node:
        return None
    old_to_new = {}

    def dfs(curr: 'Node') -> 'Node':
        if curr in old_to_new:
            return old_to_new[curr]
        copy = Node(curr.val)
        old_to_new[curr] = copy
        for nei in curr.neighbors:
            copy.neighbors.append(dfs(nei))
        return copy

    return dfs(node)`,
    pseudocode: [
      'old_to_new = hash map (old_node -> cloned_node)',
      'function dfs(curr):',
      '    if curr in old_to_new: return old_to_new[curr]',
      '    copy = new Node(curr.val)',
      '    old_to_new[curr] = copy',
      '    for each neighbor in curr.neighbors:',
      '        copy.neighbors.append(dfs(neighbor))',
      '    return copy',
      'return dfs(node)'
    ],
    timeComplexity: {
      bigO: 'O(V + E)',
      explanation: 'Visits every vertex and traverses every edge once.'
    },
    spaceComplexity: {
      bigO: 'O(V)',
      explanation: 'Hash map stores all V nodes plus recursion stack depth.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 4,
        line: 1,
        description: 'Initialize old_to_new map = {}. Start DFS at Node 1.',
        action: 'inspect',
        variables: { current_node: 1 },
        visualData: {
          kind: 'linked-list',
          nodes: [
            { id: '1', val: 1, next: '2' },
            { id: '2', val: 2, next: '3' },
            { id: '3', val: 3, next: '4' },
            { id: '4', val: 4, next: null }
          ],
          currNodeId: '1'
        }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 4,
        line: 4,
        description: 'Clone Node 1 -> Node 1\'. Add to old_to_new map. Visit neighbor Node 2.',
        action: 'update',
        variables: { cloned: "1'", in_map: "1 -> 1'" },
        visualData: {
          kind: 'linked-list',
          nodes: [
            { id: '1', val: 1, next: '2', isVisited: true },
            { id: '2', val: 2, next: '3' },
            { id: '3', val: 3, next: '4' },
            { id: '4', val: 4, next: null }
          ],
          currNodeId: '2'
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 4,
        line: 6,
        description: 'Clone all connected components recursively and connect cloned edges.',
        action: 'advance',
        variables: { cloned_count: 4 },
        visualData: {
          kind: 'linked-list',
          nodes: [
            { id: '1', val: "1'", next: '2', isVisited: true },
            { id: '2', val: "2'", next: '3', isVisited: true },
            { id: '3', val: "3'", next: '4', isVisited: true },
            { id: '4', val: "4'", next: null, isVisited: true }
          ],
          badgeNote: 'All 4 nodes deep-copied'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 28. Course Schedule (#207)
  {
    id: 'course-schedule',
    number: 207,
    title: 'Course Schedule',
    category: 'Graph',
    difficulty: 'Medium',
    pattern: "Topological Sort / Kahn's Algorithm / Cycle Detection",
    grindWeek: 3,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',
    summary: 'Determine if you can finish all courses given prerequisite pairings.',
    description: `There are a total of \`numCourses\` courses you have to take, labeled from \`0\` to \`numCourses - 1\`. You are given an array \`prerequisites\` where \`prerequisites[i] = [a_i, b_i]\` indicates that you must take course \`b_i\` first if you want to take course \`a_i\`.

Return \`true\` if you can finish all courses. Otherwise, return \`false\`.`,
    examples: [
      { input: 'numCourses = 2, prerequisites = [[1,0]]', output: 'true', explanation: 'Take course 0 first, then course 1.' },
      { input: 'numCourses = 2, prerequisites = [[1,0],[0,1]]', output: 'false', explanation: 'Course 1 requires 0 and course 0 requires 1 (circular dependency).' }
    ],
    constraints: [
      '1 <= numCourses <= 2000',
      '0 <= prerequisites.length <= 5000'
    ],
    intuition: `This is cycle detection in a directed graph.
Kahn's Algorithm (BFS Topological Sort):
1. Compute in-degree (number of prerequisite dependencies) for each course.
2. Initialize a queue with all courses having in-degree 0 (no prerequisites).
3. Dequeue each course, decrement in-degrees of its dependent courses. If any dependent reaches in-degree 0, push it to the queue.
4. If the total dequeued courses equals \`numCourses\`, no cycles exist; return \`True\`.`,
    pythonSolution: `from collections import deque

def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    """
    Kahn's algorithm (topological sort via BFS in-degrees).
    Time: O(V + E), Space: O(V + E).
    """
    adj = [[] for _ in range(numCourses)]
    in_degree = [0] * numCourses
    
    for crs, pre in prerequisites:
        adj[pre].append(crs)
        in_degree[crs] += 1
        
    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])
    finished = 0
    
    while queue:
        node = queue.popleft()
        finished += 1
        for nei in adj[node]:
            in_degree[nei] -= 1
            if in_degree[nei] == 0:
                queue.append(nei)
                
    return finished == numCourses`,
    pseudocode: [
      'build adjacency list adj and in_degree array',
      'queue = all courses with in_degree == 0',
      'finished = 0',
      'while queue is not empty:',
      '    node = queue.popleft()',
      '    finished++',
      '    for each dependent in adj[node]:',
      '        in_degree[dependent]--',
      '        if in_degree[dependent] == 0: queue.append(dependent)',
      'return finished == numCourses'
    ],
    timeComplexity: {
      bigO: 'O(V + E)',
      explanation: 'Where V is numCourses and E is number of prerequisite prerequisites.'
    },
    spaceComplexity: {
      bigO: 'O(V + E)',
      explanation: 'Adjacency list and in-degree array.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Prerequisites: [[1, 0]] (Course 1 requires Course 0). In-degrees: Course 0: 0, Course 1: 1.',
        action: 'inspect',
        variables: { in_degree_0: 0, in_degree_1: 1 },
        visualData: {
          kind: 'array-pointers',
          array: [0, 1],
          pointers: [{ name: 'in:0 (ready)', index: 0, color: 'var(--success-500)' }]
        }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 5,
        description: 'Take Course 0! Decrement in-degree of Course 1 -> becomes 0. Enqueue Course 1.',
        action: 'update',
        variables: { taken: 0, in_degree_1: 0 },
        visualData: {
          kind: 'array-pointers',
          array: [0, 0],
          pointers: [{ name: 'in:0 (ready)', index: 1, color: 'var(--success-500)' }]
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 9,
        description: 'Take Course 1. Finished courses = 2 / 2! All courses completed successfully.',
        action: 'return',
        variables: { finished: 2, numCourses: 2, can_finish: true },
        visualData: {
          kind: 'array-pointers',
          array: [0, 0],
          badgeNote: 'All courses cleared! No cycle.'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 29. Pacific Atlantic Water Flow (#417)
  {
    id: 'pacific-atlantic-water-flow',
    number: 417,
    title: 'Pacific Atlantic Water Flow',
    category: 'Graph',
    difficulty: 'Medium',
    pattern: 'Multi-Source Reverse BFS / DFS',
    grindWeek: 12,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',
    summary: 'Find grid coordinates where rainwater can flow to both Pacific and Atlantic oceans.',
    description: `There is an \`m x n\` rectangular island that borders both the Pacific Ocean and Atlantic Ocean. The Pacific touches the island's top and left edges, and the Atlantic touches the bottom and right edges.

Return a list of grid coordinates where rainwater can flow to both oceans.`,
    examples: [
      { input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]' }
    ],
    constraints: [
      'm == heights.length',
      'n == heights[r].length',
      '1 <= m, n <= 200',
      '0 <= heights[r][c] <= 10^5'
    ],
    intuition: `Instead of checking every cell by searching downwards to ocean borders, flip the problem! Start at the ocean borders and search backwards *uphill* (\`neighbor_height >= current_height\`).
1. Run DFS from all Pacific border cells (top row, left col).
2. Run DFS from all Atlantic border cells (bottom row, right col).
3. The cells visited by BOTH traversals can reach both oceans!`,
    pythonSolution: `def pacificAtlantic(heights: list[list[int]]) -> list[list[int]]:
    """
    Reverse DFS starting from Pacific and Atlantic shorelines uphill.
    Time: O(M * N), Space: O(M * N).
    """
    if not heights:
        return []
    ROWS, COLS = len(heights), len(heights[0])
    pac, atl = set(), set()

    def dfs(r, c, visit, prev_height):
        if ((r, c) in visit or r < 0 or c < 0 or
            r >= ROWS or c >= COLS or heights[r][c] < prev_height):
            return
        visit.add((r, c))
        for dr, dc in [(1,0), (-1,0), (0,1), (0,-1)]:
            dfs(r + dr, c + dc, visit, heights[r][c])

    for c in range(COLS):
        dfs(0, c, pac, heights[0][c])
        dfs(ROWS - 1, c, atl, heights[ROWS - 1][c])
    for r in range(ROWS):
        dfs(r, 0, pac, heights[r][0])
        dfs(r, COLS - 1, atl, heights[r][COLS - 1])

    return list(pac & atl)`,
    pseudocode: [
      'pac = empty set, atl = empty set',
      'function dfs(r, c, visit, prev_height):',
      '    if out of bounds or visited or heights[r][c] < prev_height: return',
      '    visit.add((r, c))',
      '    for each (dr, dc) in neighbors: dfs(r+dr, c+dc, visit, heights[r][c])',
      'run dfs from Pacific borders into pac',
      'run dfs from Atlantic borders into atl',
      'return intersection of pac and atl'
    ],
    timeComplexity: {
      bigO: 'O(M * N)',
      explanation: 'Every cell visited at most twice (once for Pacific, once for Atlantic).'
    },
    spaceComplexity: {
      bigO: 'O(M * N)',
      explanation: 'Hash sets storing visited coordinate tuples.'
    },
    generateSteps: () => {
      const grid = [
        [1, 2, 2, 3, 5],
        [3, 2, 3, 4, 4],
        [2, 4, 5, 3, 1]
      ];
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Initialize Pacific border (top/left) and Atlantic border (bottom/right).',
        action: 'inspect',
        variables: { rows: 3, cols: 5 },
        visualData: { kind: 'matrix', grid, activeCell: { r: 0, c: 0 } }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 7,
        description: 'Flow backwards uphill: cell [2, 2] (elevation 5) reaches both oceans through high ridges.',
        action: 'match',
        variables: { cell: '[2, 2]', elevation: 5 },
        visualData: {
          kind: 'matrix',
          grid,
          activeCell: { r: 2, c: 2 },
          highlightCells: [{ r: 0, c: 4 }, { r: 1, c: 3 }, { r: 2, c: 2 }]
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 30. Number of Islands (#200)
  {
    id: 'number-of-islands',
    number: 200,
    title: 'Number of Islands',
    category: 'Graph',
    difficulty: 'Medium',
    pattern: 'Grid DFS / Flood Fill',
    grindWeek: 4,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
    summary: 'Count the number of connected components of land (1s) surrounded by water (0s).',
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of \`'1'\`s (land) and \`'0'\`s (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.`,
    examples: [
      {
        input: 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]',
        output: '1'
      },
      {
        input: 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]',
        output: '3'
      }
    ],
    constraints: [
      'm == grid.length',
      'n == grid[i].length',
      '1 <= m, n <= 300',
      'grid[i][j] is \'0\' or \'1\'.'
    ],
    intuition: `Traverse every cell in the grid. Whenever you hit a land cell (\`'1'\`):
1. Increment island count by 1.
2. Launch a DFS / BFS from this cell to "sink" the entire island (turn all connected \`'1'\`s into \`'0'\`s or mark as visited).
By the time the entire grid is scanned, all islands have been uniquely counted!`,
    pythonSolution: `def numIslands(grid: list[list[str]]) -> int:
    """
    Flood fill DFS to sink connected land cells.
    Time: O(M * N), Space: O(M * N) call stack.
    """
    if not grid:
        return 0
    ROWS, COLS = len(grid), len(grid[0])
    islands = 0

    def dfs(r, c):
        if r < 0 or c < 0 or r >= ROWS or c >= COLS or grid[r][c] != '1':
            return
        grid[r][c] = '0'  # Mark visited by sinking
        dfs(r + 1, c)
        dfs(r - 1, c)
        dfs(r, c + 1)
        dfs(r, c - 1)

    for r in range(ROWS):
        for c in range(COLS):
            if grid[r][c] == '1':
                islands += 1
                dfs(r, c)

    return islands`,
    pseudocode: [
      'islands = 0',
      'for r from 0 to ROWS-1:',
      '    for c from 0 to COLS-1:',
      '        if grid[r][c] == "1":',
      '            islands++',
      '            sinkIslandDFS(r, c) # converts all connected 1s to 0s',
      'return islands'
    ],
    timeComplexity: {
      bigO: 'O(M * N)',
      explanation: 'Every cell in the grid is visited at most twice.'
    },
    spaceComplexity: {
      bigO: 'O(M * N)',
      explanation: 'In worst case (all land), DFS recursion stack depth is M * N.'
    },
    generateSteps: () => {
      const grid = [
        ['1', '1', '0', '0'],
        ['1', '0', '0', '1'],
        ['0', '0', '1', '1']
      ];
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Scan grid for first land cell "1".',
        action: 'inspect',
        variables: { islands: 0 },
        visualData: { kind: 'matrix', grid, activeCell: { r: 0, c: 0 } }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 4,
        description: 'Found land at [0, 0]! Islands = 1. Flood fill sinks [0, 0], [0, 1], and [1, 0].',
        action: 'match',
        variables: { islands: 1, sunk_cells: 3 },
        visualData: {
          kind: 'matrix',
          grid: [
            ['✓', '✓', '0', '0'],
            ['✓', '0', '0', '1'],
            ['0', '0', '1', '1']
          ],
          highlightCells: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 0 }]
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 4,
        description: 'Encounter second island at [1, 3] and [2, 3], [2, 2]. Total Islands = 2.',
        action: 'return',
        variables: { total_islands: 2 },
        visualData: {
          kind: 'matrix',
          grid: [
            ['✓', '✓', '0', '0'],
            ['✓', '0', '0', '✓'],
            ['0', '0', '✓', '✓']
          ],
          badgeNote: 'Total Islands: 2'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 31. Longest Consecutive Sequence (#128)
  {
    id: 'longest-consecutive-sequence',
    number: 128,
    title: 'Longest Consecutive Sequence',
    category: 'Graph',
    difficulty: 'Medium',
    pattern: 'Hash Set Sequence Roots',
    grindWeek: 12,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/',
    summary: 'Find the length of the longest consecutive elements sequence in O(n) time.',
    description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in \`O(n)\` time.`,
    examples: [
      { input: 'nums = [100, 4, 200, 1, 3, 2]', output: '4', explanation: 'The longest consecutive elements sequence is [1, 2, 3, 4]. Its length is 4.' },
      { input: 'nums = [0,3,7,2,5,8,4,6,0,1]', output: '9' }
    ],
    constraints: [
      '0 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    intuition: `Put all numbers into a hash set for O(1) membership lookups.
To achieve O(N) time without sorting, only count lengths starting from the *beginning* of a sequence:
A number \`num\` is a sequence start IF AND ONLY IF \`num - 1\` is NOT in the set!
From each sequence root, increment \`current_num + 1\` repeatedly while it exists in the set, then record the max length.`,
    pythonSolution: `def longestConsecutive(nums: list[int]) -> int:
    """
    Hash set checking only sequence roots (where num - 1 not in set).
    Time: O(N), Space: O(N).
    """
    num_set = set(nums)
    longest = 0

    for num in num_set:
        # Only start counting if num is the beginning of a sequence
        if (num - 1) not in num_set:
            length = 1
            while (num + length) in num_set:
                length += 1
            longest = max(longest, length)

    return longest`,
    pseudocode: [
      'num_set = set(nums)',
      'longest = 0',
      'for each num in num_set:',
      '    if (num - 1) not in num_set: # num is root of sequence',
      '        length = 1',
      '        while (num + length) in num_set:',
      '            length++',
      '        longest = max(longest, length)',
      'return longest'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Every element is visited at most twice: once in the outer loop, and at most once during a sequence streak expansion.'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'Hash set stores all N distinct integers.'
    },
    generateSteps: () => {
      const nums = [100, 4, 200, 1, 3, 2];
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Initialize set: {1, 2, 3, 4, 100, 200}.',
        action: 'inspect',
        variables: { set_size: 6, longest: 0 },
        visualData: { kind: 'array-pointers', array: nums }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 4,
        description: 'Examine 1: (1 - 1 = 0) is NOT in set -> 1 is a sequence ROOT! Expand: 1 -> 2 -> 3 -> 4. Streak = 4.',
        action: 'match',
        variables: { root: 1, streak: 4, longest: 4 },
        visualData: {
          kind: 'array-pointers',
          array: [1, 2, 3, 4, 100, 200],
          activeIndices: [0, 1, 2, 3],
          badgeNote: 'Streak: [1, 2, 3, 4] (Length 4)'
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 7,
        description: 'Examine 100 (len 1) and 200 (len 1). Max length remains 4.',
        action: 'return',
        variables: { max_streak: 4 },
        visualData: {
          kind: 'array-pointers',
          array: [1, 2, 3, 4, 100, 200],
          badgeNote: 'Longest Consecutive: 4'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 32. Alien Dictionary (#269)
  {
    id: 'alien-dictionary',
    number: 269,
    title: 'Alien Dictionary',
    category: 'Graph',
    difficulty: 'Hard',
    pattern: 'Topological Sort / Directed Graph Cycle Detection',
    grindWeek: 10,
    estimatedMinutes: 35,
    leetcodeUrl: 'https://leetcode.com/problems/alien-dictionary/',
    summary: 'Derive the alphabetical order of characters in an alien language from a sorted list of words.',
    description: `There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.

You are given a list of strings \`words\` from the alien language's dictionary, where the strings are sorted lexicographically by the rules of this new language.

Return a string of the unique letters in the new alien language sorted in lexicographically increasing order by the new language's rules. If no order can exist, return \`""\`.`,
    examples: [
      { input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"' },
      { input: 'words = ["z","x"]', output: '"zx"' },
      { input: 'words = ["z","x","z"]', output: '""', explanation: 'The order is invalid since z appears both before and after x.' }
    ],
    constraints: [
      '1 <= words.length <= 100',
      '1 <= words[i].length <= 100',
      'words[i] consists of only lowercase English letters.'
    ],
    intuition: `Construct a directed graph of character orderings:
1. Compare adjacent words \`w1\` and \`w2\`. Find the first character where they differ: \`c1 != c2\`. This proves edge \`c1 -> c2\` (c1 must appear before c2).
2. Edge case: If \`w1\` is longer than \`w2\` and starts with \`w2\` (e.g. ["abc", "ab"]), the sorted order is invalid; return \`""\`.
3. Perform Topological Sort (Post-order DFS with cycle detection or Kahn's algorithm). If a cycle is detected, return \`""\`.`,
    pythonSolution: `def alienOrder(words: list[str]) -> str:
    """
    Topological sort on character ordering graph.
    Time: O(total characters), Space: O(V + E) = O(26).
    """
    adj = {c: set() for w in words for c in w}
    
    for i in range(len(words) - 1):
        w1, w2 = words[i], words[i + 1]
        min_len = min(len(w1), len(w2))
        if len(w1) > len(w2) and w1[:min_len] == w2[:min_len]:
            return ""  # Invalid prefix order
        for j in range(min_len):
            if w1[j] != w2[j]:
                adj[w1[j]].add(w2[j])
                break

    visit = {} # False: visited in current DFS (cycle), True: fully visited
    res = []

    def dfs(c):
        if c in visit:
            return visit[c]
        visit[c] = False
        for nei in adj[c]:
            if not dfs(nei):
                return False
        visit[c] = True
        res.append(c)
        return True

    for c in adj:
        if not dfs(c):
            return ""
    return "".join(res[::-1])`,
    pseudocode: [
      'build directed edges from adjacent words where w1[j] != w2[j]',
      'check prefix invalidity: if len(w1) > len(w2) and w1.startswith(w2): return ""',
      'perform topological sort using DFS or BFS',
      'if cycle detected: return ""',
      'return reversed post-order DFS string'
    ],
    timeComplexity: {
      bigO: 'O(C)',
      explanation: 'Where C is the total number of characters across all words in the input dictionary.'
    },
    spaceComplexity: {
      bigO: 'O(1) / O(U)',
      explanation: 'At most 26 unique lowercase English alphabet letters in graph.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input words: ["wrt", "wrf", "er", "ett", "rftt"]. Extract edges.',
        action: 'inspect',
        variables: { words: '["wrt", "wrf", ...]' },
        visualData: {
          kind: 'array-pointers',
          array: ['t -> f', 'w -> e', 'r -> t', 'e -> r']
        }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 8,
        description: 'Directed dependency graph: w -> e -> r -> t -> f. No cycles detected.',
        action: 'match',
        variables: { ordering: 'w -> e -> r -> t -> f' },
        visualData: {
          kind: 'array-pointers',
          array: ['w', 'e', 'r', 't', 'f'],
          pointers: [{ name: 'head', index: 0, color: 'var(--success-500)' }]
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 15,
        description: 'Topological order derived: "wertf"!',
        action: 'return',
        variables: { result: 'wertf' },
        visualData: {
          kind: 'array-pointers',
          array: ['w', 'e', 'r', 't', 'f'],
          badgeNote: 'Valid Alien Alphabet: "wertf"'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 33. Graph Valid Tree (#261)
  {
    id: 'graph-valid-tree',
    number: 261,
    title: 'Graph Valid Tree',
    category: 'Graph',
    difficulty: 'Medium',
    pattern: 'Union-Find / Cycle Check & Connectedness',
    grindWeek: 10,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/graph-valid-tree/',
    summary: 'Check whether an undirected graph forms a single valid tree.',
    description: `Given \`n\` nodes labeled from \`0\` to \`n - 1\` and a list of undirected edges, write a function to check whether these edges make up a valid tree.`,
    examples: [
      { input: 'n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]', output: 'true' },
      { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]', output: 'false', explanation: 'Edges [1,2], [2,3], [1,3] form a cycle.' }
    ],
    constraints: [
      '1 <= n <= 2000',
      '0 <= edges.length <= 5000'
    ],
    intuition: `A graph is a valid tree IF AND ONLY IF:
1. It has exactly \`n - 1\` edges (\`len(edges) == n - 1\`). If it has fewer, it is disconnected; if more, it contains a cycle.
2. It has no cycles and is fully connected.
Using Union-Find (Disjoint Set Union): for each edge \`[u, v]\`, check if \`find(u) == find(v)\`. If they already share a root, adding this edge creates a cycle -> return \`False\`. If all \`n - 1\` edges are united without cycle, it is a valid tree!`,
    pythonSolution: `def validTree(n: int, edges: list[list[int]]) -> bool:
    """
    Union-Find checking: len(edges) == n - 1 and no cycle.
    Time: O(N * α(N)), Space: O(N).
    """
    if len(edges) != n - 1:
        return False
        
    parent = list(range(n))
    
    def find(i):
        if parent[i] != i:
            parent[i] = find(parent[i])
        return parent[i]
        
    for u, v in edges:
        root_u, root_v = find(u), find(v)
        if root_u == root_v:
            return False  # Cycle detected
        parent[root_u] = root_v
        
    return True`,
    pseudocode: [
      'if len(edges) != n - 1: return False',
      'parent = [0, 1, ..., n-1]',
      'for each edge [u, v] in edges:',
      '    if find(u) == find(v): return False # Cycle found!',
      '    union(u, v)',
      'return True'
    ],
    timeComplexity: {
      bigO: 'O(N * α(N))',
      explanation: 'Inverse Ackermann runtime per Union-Find operation, effectively linear.'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'Parent array of size N.'
    },
    generateSteps: () => {
      const edges = [[0, 1], [0, 2], [0, 3], [1, 4]];
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Verify edge count: 4 edges for 5 nodes (4 == 5 - 1). Tree condition #1 passed.',
        action: 'inspect',
        variables: { n: 5, edges_count: 4 },
        visualData: { kind: 'array-pointers', array: [0, 1, 2, 3, 4] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 5,
        description: 'Union-Find joins all pairs: no common roots found beforehand -> zero cycles.',
        action: 'update',
        variables: { cycles: 0 },
        visualData: { kind: 'array-pointers', array: [0, 1, 2, 3, 4], badgeNote: 'All 4 edges merged cleanly' }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 7,
        description: 'Graph is connected and acyclic. Valid tree!',
        action: 'return',
        variables: { is_valid_tree: true },
        visualData: { kind: 'array-pointers', array: [0, 1, 2, 3, 4], badgeNote: 'Valid Tree: TRUE' }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 34. Number of Connected Components in an Undirected Graph (#323)
  {
    id: 'number-of-connected-components-in-an-undirected-graph',
    number: 323,
    title: 'Number of Connected Components in an Undirected Graph',
    category: 'Graph',
    difficulty: 'Medium',
    pattern: 'Union-Find / Disjoint Sets',
    grindWeek: 10,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/',
    summary: 'Find the number of connected components in an undirected graph.',
    description: `You have a graph of \`n\` nodes. You are given an integer \`n\` and an array \`edges\` where \`edges[i] = [a_i, b_i]\` indicates that there is an edge between \`a_i\` and \`b_i\` in the graph.

Return the number of connected components in the graph.`,
    examples: [
      { input: 'n = 5, edges = [[0,1],[1,2],[3,4]]', output: '2', explanation: 'Components are {0,1,2} and {3,4}.' },
      { input: 'n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]', output: '1' }
    ],
    constraints: [
      '1 <= n <= 2000',
      '1 <= edges.length <= 5000'
    ],
    intuition: `Start with \`n\` isolated components (each node is its own component root).
For each edge \`[u, v]\`, union their sets. If \`u\` and \`v\` were in different sets, decrement the component count by 1.
After processing all edges, return the remaining component count.`,
    pythonSolution: `def countComponents(n: int, edges: list[list[int]]) -> int:
    """
    Union-Find with component counter decrements.
    Time: O(V + E * α(V)), Space: O(V).
    """
    parent = list(range(n))
    components = n

    def find(i):
        if parent[i] != i:
            parent[i] = find(parent[i])
        return parent[i]

    for u, v in edges:
        root_u, root_v = find(u), find(v)
        if root_u != root_v:
            parent[root_u] = root_v
            components -= 1

    return components`,
    pseudocode: [
      'components = n',
      'parent = [0, 1, ..., n-1]',
      'for each [u, v] in edges:',
      '    if find(u) != find(v):',
      '        union(u, v)',
      '        components--',
      'return components'
    ],
    timeComplexity: {
      bigO: 'O(V + E * α(V))',
      explanation: 'Nearly linear using path compression.'
    },
    spaceComplexity: {
      bigO: 'O(V)',
      explanation: 'Parent pointer array of size V.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Start with 5 isolated components {0}, {1}, {2}, {3}, {4}.',
        action: 'inspect',
        variables: { components: 5 },
        visualData: { kind: 'array-pointers', array: [0, 1, 2, 3, 4] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 7,
        description: 'Union (0, 1) and (1, 2) -> Component {0, 1, 2}. Components: 5 -> 3.',
        action: 'update',
        variables: { components: 3 },
        visualData: { kind: 'array-pointers', array: [2, 2, 2, 3, 4], badgeNote: 'Merged {0,1,2}' }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 7,
        description: 'Union (3, 4) -> Component {3, 4}. Final connected components = 2.',
        action: 'return',
        variables: { final_components: 2 },
        visualData: { kind: 'array-pointers', array: [2, 2, 2, 4, 4], badgeNote: '2 Connected Components: {0,1,2} & {3,4}' }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  }
];
