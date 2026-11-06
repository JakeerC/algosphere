import { Blind75Problem, Blind75Step } from '../../types/blind75';

export const MATRIX_PROBLEMS: Blind75Problem[] = [
  // 46. Set Matrix Zeroes (#73)
  {
    id: 'set-matrix-zeroes',
    number: 73,
    title: 'Set Matrix Zeroes',
    category: 'Matrix',
    difficulty: 'Medium',
    pattern: 'In-Place State Marking (Row & Col Headers)',
    grindWeek: 6,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/set-matrix-zeroes/',
    summary: 'Given an m x n integer matrix, if an element is 0, set its entire row and column to 0 in place in O(1) space.',
    description: `Given an \`m x n\` integer matrix \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`'s. You must do it in place.`,
    examples: [
      { input: 'matrix = [[1,1,1],[1,0,1],[1,1,1]]', output: '[[1,0,1],[0,0,0],[1,0,1]]' },
      { input: 'matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]', output: '[[0,0,0,0],[0,4,5,0],[0,3,1,0]]' }
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[0].length',
      '1 <= m, n <= 200',
      '-2^31 <= matrix[i][j] <= 2^31 - 1'
    ],
    intuition: `To achieve O(1) extra space, repurpose the first row \`matrix[0][c]\` and first column \`matrix[r][0]\` as marker storage indicating whether row \`r\` or col \`c\` must be zeroed out.
Use a single boolean \`row_zero\` to track whether the very first row itself needs to be zeroed out, since \`matrix[0][0]\` overlaps both row 0 and col 0.
Scan the inner matrix, then zero out inner cells, and lastly zero out row 0 and col 0 if flagged.`,
    pythonSolution: `def setZeroes(matrix: list[list[int]]) -> None:
    """
    In-place O(1) space marking using row 0 and col 0 as flags.
    Time: O(M * N), Space: O(1).
    """
    ROWS, COLS = len(matrix), len(matrix[0])
    row_zero = False

    # 1. Determine which rows and columns need to be zero
    for r in range(ROWS):
        for c in range(COLS):
            if matrix[r][c] == 0:
                matrix[0][c] = 0
                if r > 0:
                    matrix[r][0] = 0
                else:
                    row_zero = True

    # 2. Zero out inner cells based on headers
    for r in range(1, ROWS):
        for c in range(1, COLS):
            if matrix[0][c] == 0 or matrix[r][0] == 0:
                matrix[r][c] = 0

    # 3. Zero out first col if needed
    if matrix[0][0] == 0:
        for r in range(ROWS):
            matrix[r][0] = 0

    # 4. Zero out first row if needed
    if row_zero:
        for c in range(COLS):
            matrix[0][c] = 0`,
    pseudocode: [
      'row_zero = False',
      'mark first row & first col headers with 0 whenever matrix[r][c] == 0',
      'for r from 1 to ROWS-1 and c from 1 to COLS-1:',
      '    if matrix[0][c] == 0 or matrix[r][0] == 0: matrix[r][c] = 0',
      'zero out first column if matrix[0][0] == 0',
      'zero out first row if row_zero is True'
    ],
    timeComplexity: {
      bigO: 'O(M * N)',
      explanation: 'Two complete passes over the M x N matrix.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Modifies matrix in place without auxiliary data structures.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      const initialGrid = [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1]
      ];

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input matrix: cell [1,1] is 0. Target: zero out row 1 and column 1.',
        action: 'inspect',
        variables: { row_zero: false },
        visualData: { kind: 'matrix', grid: initialGrid, activeCell: { r: 1, c: 1 } }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 5,
        description: 'Set headers: mark matrix[0][1] = 0 and matrix[1][0] = 0 as flags.',
        action: 'update',
        variables: { 'matrix[0][1]': 0, 'matrix[1][0]': 0 },
        visualData: {
          kind: 'matrix',
          grid: [
            [1, 0, 1],
            [0, 0, 1],
            [1, 1, 1]
          ],
          highlightCells: [{ r: 0, c: 1 }, { r: 1, c: 0 }]
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 12,
        description: 'Propagate zeros down row 1 and col 1. Completed in O(1) space!',
        action: 'return',
        variables: { completed: true },
        visualData: {
          kind: 'matrix',
          grid: [
            [1, 0, 1],
            [0, 0, 0],
            [1, 0, 1]
          ],
          badgeNote: 'Row 1 and Col 1 Zeroed Out'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 47. Spiral Matrix (#54)
  {
    id: 'spiral-matrix',
    number: 54,
    title: 'Spiral Matrix',
    category: 'Matrix',
    difficulty: 'Medium',
    pattern: 'Shrinking 4-Boundary Simulation',
    grindWeek: 6,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/spiral-matrix/',
    summary: 'Return all elements of the matrix in spiral clockwise order.',
    description: `Given an \`m x n\` matrix, return all elements of the matrix in spiral order.`,
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[1,2,3,6,9,8,7,4,5]' },
      { input: 'matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]', output: '[1,2,3,4,8,12,11,10,9,5,6,7]' }
    ],
    constraints: [
      'm == matrix.length',
      'n == matrix[i].length',
      '1 <= m, n <= 10',
      '-100 <= matrix[i][j] <= 100'
    ],
    intuition: `Maintain four perimeter boundaries: \`top\`, \`bottom\`, \`left\`, and \`right\`.
Traverse in clockwise cycles:
1. Left to right along \`top\` row -> \`top += 1\`
2. Top to bottom down \`right\` column -> \`right -= 1\`
3. Right to left along \`bottom\` row -> \`bottom -= 1\` (if top <= bottom)
4. Bottom to top up \`left\` column -> \`left += 1\` (if left <= right)
Continue until boundaries cross!`,
    pythonSolution: `def spiralOrder(matrix: list[list[int]]) -> list[int]:
    """
    Simulate spiral traversal using 4 perimeter boundaries.
    Time: O(M * N), Space: O(1) auxiliary.
    """
    res = []
    left, right = 0, len(matrix[0])
    top, bottom = 0, len(matrix)

    while left < right and top < bottom:
        # Traverse top row left to right
        for c in range(left, right):
            res.append(matrix[top][c])
        top += 1

        # Traverse right column top to bottom
        for r in range(top, bottom):
            res.append(matrix[r][right - 1])
        right -= 1

        if not (left < right and top < bottom):
            break

        # Traverse bottom row right to left
        for c in range(right - 1, left - 1, -1):
            res.append(matrix[bottom - 1][c])
        bottom -= 1

        # Traverse left column bottom to top
        for r in range(bottom - 1, top - 1, -1):
            res.append(matrix[r][left])
        left += 1

    return res`,
    pseudocode: [
      'left = 0, right = COLS, top = 0, bottom = ROWS',
      'while left < right and top < bottom:',
      '    traverse top row from left to right; top++',
      '    traverse right col from top to bottom; right--',
      '    if boundaries crossed: break',
      '    traverse bottom row from right-1 down to left; bottom--',
      '    traverse left col from bottom-1 down to top; left++',
      'return res'
    ],
    timeComplexity: {
      bigO: 'O(M * N)',
      explanation: 'Every cell in the matrix is visited exactly once.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Excluding the output array, only boundary indices are stored.'
    },
    generateSteps: () => {
      const grid = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ];
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 4,
        line: 1,
        description: 'Initialize boundaries: top=0, bottom=3, left=0, right=3.',
        action: 'inspect',
        variables: { top: 0, bottom: 3, left: 0, right: 3 },
        visualData: { kind: 'matrix', grid, activeCell: { r: 0, c: 0 } }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 4,
        line: 5,
        description: 'Traverse top row [1, 2, 3] -> top becomes 1.',
        action: 'advance',
        variables: { collected: '[1, 2, 3]' },
        visualData: { kind: 'matrix', grid, highlightCells: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }] }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 4,
        line: 9,
        description: 'Traverse right column [6, 9] and bottom row [8, 7] -> right=2, bottom=2.',
        action: 'advance',
        variables: { collected: '[1, 2, 3, 6, 9, 8, 7]' },
        visualData: {
          kind: 'matrix',
          grid,
          highlightCells: [
            { r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 },
            { r: 1, c: 2 }, { r: 2, c: 2 }, { r: 2, c: 1 }, { r: 2, c: 0 }
          ]
        }
      });

      steps.push({
        stepIndex: 3,
        totalSteps: 4,
        line: 18,
        description: 'Traverse up left col [4] and center [5]. Spiral complete: [1,2,3,6,9,8,7,4,5].',
        action: 'return',
        variables: { result: '[1,2,3,6,9,8,7,4,5]' },
        visualData: {
          kind: 'matrix',
          grid,
          activeCell: { r: 1, c: 1 },
          badgeNote: 'All 9 cells visited in spiral order'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 48. Rotate Image (#48)
  {
    id: 'rotate-image',
    number: 48,
    title: 'Rotate Image',
    category: 'Matrix',
    difficulty: 'Medium',
    pattern: 'Transpose + Horizontal Reverse (In-Place 90°)',
    grindWeek: 6,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/rotate-image/',
    summary: 'Rotate an n x n 2D matrix by 90 degrees clockwise in-place without allocating another 2D matrix.',
    description: `You are given an \`n x n\` 2D matrix representing an image, rotate the image by 90 degrees (clockwise).

You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.`,
    examples: [
      { input: 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', output: '[[7,4,1],[8,5,2],[9,6,3]]' },
      { input: 'matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]', output: '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]' }
    ],
    constraints: [
      'n == matrix.length == matrix[i].length',
      '1 <= n <= 20',
      '-1000 <= matrix[i][j] <= 1000'
    ],
    intuition: `A 90-degree clockwise rotation is mathematically equivalent to:
1. Transpose the matrix (swap \`matrix[i][j]\` with \`matrix[j][i]\` for all \`i < j\`).
2. Reverse every row horizontally (\`matrix[r].reverse()\`).
Both operations run in-place with O(1) extra space!`,
    pythonSolution: `def rotate(matrix: list[list[int]]) -> None:
    """
    1. Transpose matrix along main diagonal.
    2. Reverse each row horizontally.
    Time: O(N^2), Space: O(1).
    """
    n = len(matrix)
    
    # 1. Transpose
    for i in range(n):
        for j in range(i + 1, n):
            matrix[i][j], matrix[j][i] = matrix[j][i], matrix[i][j]
            
    # 2. Reverse each row
    for r in range(n):
        matrix[r].reverse()`,
    pseudocode: [
      'n = len(matrix)',
      '# Step 1: Transpose',
      'for i from 0 to n-1:',
      '    for j from i+1 to n-1:',
      '        swap matrix[i][j] and matrix[j][i]',
      '# Step 2: Reverse each row',
      'for each row in matrix:',
      '    reverse row horizontally'
    ],
    timeComplexity: {
      bigO: 'O(N^2)',
      explanation: 'Transposing takes N^2/2 swaps; reversing rows takes N^2/2 swaps.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'In-place element swaps with zero auxiliary arrays.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      const orig = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9]
      ];
      const transposed = [
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9]
      ];
      const rotated = [
        [7, 4, 1],
        [8, 5, 2],
        [9, 6, 3]
      ];

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input Matrix: [[1,2,3],[4,5,6],[7,8,9]].',
        action: 'inspect',
        variables: { phase: 'original' },
        visualData: { kind: 'matrix', grid: orig }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 4,
        description: 'Step 1: Transpose along main diagonal (swap [i,j] with [j,i]). Rows become columns.',
        action: 'swap',
        variables: { phase: 'transposed' },
        visualData: { kind: 'matrix', grid: transposed, badgeNote: 'Transposed Matrix' }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 8,
        description: 'Step 2: Reverse each row horizontally. Final 90° clockwise rotation complete!',
        action: 'return',
        variables: { phase: 'rotated' },
        visualData: {
          kind: 'matrix',
          grid: rotated,
          badgeNote: '90° Clockwise Rotation Complete'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 49. Word Search (#79)
  {
    id: 'word-search',
    number: 79,
    title: 'Word Search',
    category: 'Matrix',
    difficulty: 'Medium',
    pattern: 'Backtracking Grid DFS with Path Restoral',
    grindWeek: 7,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/word-search/',
    summary: 'Determine if a target word exists in a grid of characters moving horizontally or vertically.',
    description: `Given an \`m x n\` grid of characters \`board\` and a string \`word\`, return \`true\` if \`word\` exists in the grid.

The word can be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.`,
    examples: [
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"', output: 'true' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "SEE"', output: 'true' },
      { input: 'board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCB"', output: 'false' }
    ],
    constraints: [
      'm == board.length',
      'n = board[i].length',
      '1 <= m, n <= 6',
      '1 <= word.length <= 15',
      'board and word consists of only lowercase and uppercase English letters.'
    ],
    intuition: `Backtracking DFS:
From each cell matching \`word[0]\`, launch a recursive search:
1. Base case: if \`k == len(word)\`, all characters matched -> return \`True\`.
2. Check bounds and character match: \`board[r][c] == word[k]\`.
3. Mark current cell as visited: \`board[r][c] = '#'\`.
4. Recurse in 4 directions: (up, down, left, right).
5. Backtrack: restore \`board[r][c]\` to its original character!`,
    pythonSolution: `def exist(board: list[list[str]], word: str) -> bool:
    """
    Backtracking DFS with in-place cell marking and restoration.
    Time: O(M * N * 3^L), Space: O(L) recursion stack.
    """
    ROWS, COLS = len(board), len(board[0])

    def dfs(r, c, k):
        if k == len(word):
            return True
        if (r < 0 or c < 0 or r >= ROWS or c >= COLS or
            board[r][c] != word[k]):
            return False

        # Mark visited in-place
        tmp = board[r][c]
        board[r][c] = '#'
        
        found = (dfs(r + 1, c, k + 1) or
                 dfs(r - 1, c, k + 1) or
                 dfs(r, c + 1, k + 1) or
                 dfs(r, c - 1, k + 1))
                 
        board[r][c] = tmp  # Backtrack
        return found

    for r in range(ROWS):
        for c in range(COLS):
            if dfs(r, c, 0):
                return True
    return False`,
    pseudocode: [
      'function dfs(r, c, k):',
      '    if k == len(word): return True',
      '    if out of bounds or board[r][c] != word[k]: return False',
      '    tmp = board[r][c]; board[r][c] = "#" # mark visited',
      '    found = dfs in 4 directions for k + 1',
      '    board[r][c] = tmp # backtrack',
      '    return found',
      'for each cell (r, c) matching word[0]: if dfs(r, c, 0): return True',
      'return False'
    ],
    timeComplexity: {
      bigO: 'O(M * N * 3^L)',
      explanation: 'Where L is the word length. Each branch explores at most 3 directions without reversing.'
    },
    spaceComplexity: {
      bigO: 'O(L)',
      explanation: 'Recursion stack depth equals length of the word.'
    },
    generateSteps: () => {
      const board = [
        ['A', 'B', 'C', 'E'],
        ['S', 'F', 'C', 'S'],
        ['A', 'D', 'E', 'E']
      ];
      const word = 'ABCCED';
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: `Target word: "${word}". Search starting at board[0][0] = 'A'.`,
        action: 'inspect',
        variables: { word, char_0: 'A' },
        visualData: { kind: 'matrix', grid: board, activeCell: { r: 0, c: 0 } }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 6,
        description: 'Trace path: (0,0)=\'A\' -> (0,1)=\'B\' -> (0,2)=\'C\' -> (1,2)=\'C\' -> (2,2)=\'E\'...',
        action: 'advance',
        variables: { matched_prefix: 'ABCCE' },
        visualData: {
          kind: 'matrix',
          grid: board,
          highlightCells: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 }, { r: 1, c: 2 }, { r: 2, c: 2 }]
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 2,
        description: 'Step to (2,1)=\'D\'. Complete word "ABCCED" matched! Return True.',
        action: 'return',
        variables: { word_found: true },
        visualData: {
          kind: 'matrix',
          grid: board,
          highlightCells: [
            { r: 0, c: 0 }, { r: 0, c: 1 }, { r: 0, c: 2 },
            { r: 1, c: 2 }, { r: 2, c: 2 }, { r: 2, c: 1 }
          ],
          badgeNote: 'Word "ABCCED" Found!'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  }
];
