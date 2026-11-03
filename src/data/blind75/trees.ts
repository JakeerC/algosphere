import { Blind75Problem, Blind75Step } from '../../types/blind75';

export const TREE_PROBLEMS: Blind75Problem[] = [
  // 60. Maximum Depth of Binary Tree (#104)
  {
    id: 'maximum-depth-of-binary-tree',
    number: 104,
    title: 'Maximum Depth of Binary Tree',
    category: 'Tree',
    difficulty: 'Easy',
    pattern: 'Recursive DFS Depth',
    grindWeek: 2,
    estimatedMinutes: 15,
    leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    summary: 'Find the maximum depth (number of nodes along the longest path from root to leaf).',
    description: `Given the \`root\` of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3' },
      { input: 'root = [1,null,2]', output: '2' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4].',
      '-100 <= Node.val <= 100'
    ],
    intuition: `A tree's maximum depth is:
\`1 + max(maxDepth(root.left), maxDepth(root.right))\`.
If \`root\` is \`None\`, its depth is \`0\`.
Recursively calculate the depth of the left and right subtrees and take the maximum.`,
    pythonSolution: `def maxDepth(root: TreeNode) -> int:
    """
    Recursive DFS tree height calculation.
    Time: O(N), Space: O(H) call stack.
    """
    if not root:
        return 0
    return 1 + max(maxDepth(root.left), maxDepth(root.right))`,
    pseudocode: [
      'if root is None: return 0',
      'left_depth = maxDepth(root.left)',
      'right_depth = maxDepth(root.right)',
      'return 1 + max(left_depth, right_depth)'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Visits every node in the binary tree exactly once.'
    },
    spaceComplexity: {
      bigO: 'O(H)',
      explanation: 'Where H is tree height (O(log N) for balanced trees, O(N) for degenerate trees).'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input tree: Root 3 with children 9 (depth 1) and 20 -> [15, 7] (depth 2).',
        action: 'inspect',
        variables: { root: 3 },
        visualData: { kind: 'array-pointers', array: [3, 9, 20, 15, 7], pointers: [{ name: 'root', index: 0 }] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 3,
        description: 'Left subtree (9) has depth 1. Right subtree (20 -> 15, 7) has depth 2.',
        action: 'update',
        variables: { left_depth: 1, right_depth: 2 },
        visualData: { kind: 'array-pointers', array: [3, 9, 20, 15, 7], activeIndices: [1, 2] }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 4,
        description: 'Total max depth = 1 + max(1, 2) = 3!',
        action: 'return',
        variables: { max_depth: 3 },
        visualData: {
          kind: 'array-pointers',
          array: [3, 9, 20, 15, 7],
          badgeNote: 'Maximum Depth: 3'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 61. Same Tree (#100)
  {
    id: 'same-tree',
    number: 100,
    title: 'Same Tree',
    category: 'Tree',
    difficulty: 'Easy',
    pattern: 'Simultaneous Dual DFS',
    grindWeek: 2,
    estimatedMinutes: 15,
    leetcodeUrl: 'https://leetcode.com/problems/same-tree/',
    summary: 'Check if two binary trees are structurally identical and have the same node values.',
    description: `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.`,
    examples: [
      { input: 'p = [1,2,3], q = [1,2,3]', output: 'true' },
      { input: 'p = [1,2], q = [1,null,2]', output: 'false' }
    ],
    constraints: [
      'The number of nodes in both trees is in the range [0, 100].',
      '-10^4 <= Node.val <= 10^4'
    ],
    intuition: `Recursive structural check:
1. If both \`p\` and \`q\` are \`None\`, they are identical -> return \`True\`.
2. If only one is \`None\` or \`p.val != q.val\`, they differ -> return \`False\`.
3. Recursively verify that both their left subtrees and right subtrees are identical:
\`isSameTree(p.left, q.left) and isSameTree(p.right, q.right)\`.`,
    pythonSolution: `def isSameTree(p: TreeNode, q: TreeNode) -> bool:
    """
    Simultaneous recursive DFS traversal.
    Time: O(N), Space: O(H).
    """
    if not p and not q:
        return True
    if not p or not q or p.val != q.val:
        return False
    return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)`,
    pseudocode: [
      'if p is None and q is None: return True',
      'if p is None or q is None or p.val != q.val: return False',
      'return isSameTree(p.left, q.left) and isSameTree(p.right, q.right)'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Visits each corresponding node pair once.'
    },
    spaceComplexity: {
      bigO: 'O(H)',
      explanation: 'Recursion stack proportional to tree height.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 2,
        line: 1,
        description: 'Compare p = [1, 2, 3] and q = [1, 2, 3] at root: 1 == 1.',
        action: 'inspect',
        variables: { p_root: 1, q_root: 1 },
        visualData: { kind: 'array-pointers', array: [1, 2, 3] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 2,
        line: 3,
        description: 'Children 2 == 2 and 3 == 3. Structural and value parity confirmed! Return True.',
        action: 'return',
        variables: { is_same: true },
        visualData: {
          kind: 'array-pointers',
          array: [1, 2, 3],
          badgeNote: 'Trees are Identical: TRUE'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 62. Invert Binary Tree (#226)
  {
    id: 'invert-binary-tree',
    number: 226,
    title: 'Invert Binary Tree',
    category: 'Tree',
    difficulty: 'Easy',
    pattern: 'DFS Subtree Child Swapping',
    grindWeek: 1,
    estimatedMinutes: 15,
    leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/',
    summary: 'Invert a binary tree (flip its left and right subtrees mirror-like).',
    description: `Given the \`root\` of a binary tree, invert the tree, and return its root.`,
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]' },
      { input: 'root = [2,1,3]', output: '[2,3,1]' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 100].',
      '-100 <= Node.val <= 100'
    ],
    intuition: `Mirror swap:
At each node \`root\`:
1. Swap its left child with its right child: \`root.left, root.right = root.right, root.left\`.
2. Recursively invert the new left subtree: \`invertTree(root.left)\`.
3. Recursively invert the new right subtree: \`invertTree(root.right)\`.
Return the root!`,
    pythonSolution: `def invertTree(root: TreeNode) -> TreeNode:
    """
    Swap left and right children recursively.
    Time: O(N), Space: O(H).
    """
    if not root:
        return None
        
    root.left, root.right = root.right, root.left
    invertTree(root.left)
    invertTree(root.right)
    return root`,
    pseudocode: [
      'if root is None: return None',
      'swap root.left and root.right',
      'invertTree(root.left)',
      'invertTree(root.right)',
      'return root'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Visits every node in the tree once.'
    },
    spaceComplexity: {
      bigO: 'O(H)',
      explanation: 'Recursion stack bounded by tree height.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input tree: Root 4 with left child 2 and right child 7.',
        action: 'inspect',
        variables: { root: 4, left: 2, right: 7 },
        visualData: { kind: 'array-pointers', array: [4, 2, 7, 1, 3, 6, 9] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 4,
        description: 'Swap root children: left becomes 7, right becomes 2!',
        action: 'swap',
        variables: { root: 4, new_left: 7, new_right: 2 },
        visualData: { kind: 'array-pointers', array: [4, 7, 2, 1, 3, 6, 9], activeIndices: [1, 2] }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 6,
        description: 'Invert subtrees of 7 (becomes 9, 6) and 2 (becomes 3, 1). Result: [4,7,2,9,6,3,1].',
        action: 'return',
        variables: { inverted: true },
        visualData: {
          kind: 'array-pointers',
          array: [4, 7, 2, 9, 6, 3, 1],
          badgeNote: 'Tree Inverted (Mirror Image)'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 63. Binary Tree Maximum Path Sum (#124)
  {
    id: 'binary-tree-maximum-path-sum',
    number: 124,
    title: 'Binary Tree Maximum Path Sum',
    category: 'Tree',
    difficulty: 'Hard',
    pattern: 'Post-Order DFS with Split Point Evaluation',
    grindWeek: 11,
    estimatedMinutes: 35,
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
    summary: 'Find the maximum path sum of any non-empty path in a binary tree.',
    description: `A path in a binary tree is a sequence of nodes where each pair of adjacent nodes has an edge connecting them. A node can only appear in the sequence at most once.

Given the \`root\` of a binary tree, return the maximum path sum of any non-empty path.`,
    examples: [
      { input: 'root = [1,2,3]', output: '6', explanation: 'Optimal path is 2 -> 1 -> 3 with path sum 2 + 1 + 3 = 6.' },
      { input: 'root = [-10,9,20,null,null,15,7]', output: '42', explanation: 'Optimal path is 15 -> 20 -> 7 with path sum 15 + 20 + 7 = 42.' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 3 * 10^4].',
      '-1000 <= Node.val <= 1000'
    ],
    intuition: `Post-order DFS:
For any node, there are two distinct concepts:
1. Subtree path sum with split: path passes through node and arches down into both left and right: \`node.val + left_gain + right_gain\`. (This could be our global maximum answer, updated at \`max_sum = max(max_sum, ...)\`).
2. Single-branch path sum returned to parent: to extend up through the parent, we can only pick ONE branch: \`node.val + max(left_gain, right_gain)\`.
Ignore negative gains using \`max(gain, 0)\`.`,
    pythonSolution: `def maxPathSum(root: TreeNode) -> int:
    """
    Post-order DFS calculating max single branch while tracking global split sum.
    Time: O(N), Space: O(H).
    """
    max_sum = float('-inf')

    def dfs(node):
        nonlocal max_sum
        if not node:
            return 0
        left_gain = max(dfs(node.left), 0)
        right_gain = max(dfs(node.right), 0)

        # Max path through current node with split
        current_path = node.val + left_gain + right_gain
        max_sum = max(max_sum, current_path)

        # Return max single branch extending upward
        return node.val + max(left_gain, right_gain)

    dfs(root)
    return max_sum`,
    pseudocode: [
      'max_sum = -infinity',
      'function dfs(node):',
      '    if node is None: return 0',
      '    left = max(dfs(node.left), 0)',
      '    right = max(dfs(node.right), 0)',
      '    max_sum = max(max_sum, node.val + left + right)',
      '    return node.val + max(left, right)',
      'dfs(root)',
      'return max_sum'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Visits every node in the binary tree exactly once.'
    },
    spaceComplexity: {
      bigO: 'O(H)',
      explanation: 'Recursion stack bounded by tree height.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input tree: [-10, 9, 20, null, null, 15, 7]. Evaluate node 20 first.',
        action: 'inspect',
        variables: { node: 20 },
        visualData: { kind: 'array-pointers', array: [-10, 9, 20, 15, 7] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 7,
        description: 'At node 20: left child 15 (+15), right child 7 (+7). Path 15 -> 20 -> 7 = 42!',
        action: 'match',
        variables: { split_sum: 42, max_sum: 42 },
        visualData: {
          kind: 'array-pointers',
          array: [-10, 9, 20, 15, 7],
          activeIndices: [2, 3, 4],
          badgeNote: 'Path: 15 + 20 + 7 = 42'
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 10,
        description: 'Global maximum path sum is 42 (superior to connecting through root -10).',
        action: 'return',
        variables: { max_path_sum: 42 },
        visualData: {
          kind: 'array-pointers',
          array: [-10, 9, 20, 15, 7],
          activeIndices: [2, 3, 4],
          badgeNote: 'Max Path Sum: 42'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 64. Binary Tree Level Order Traversal (#102)
  {
    id: 'binary-tree-level-order-traversal',
    number: 102,
    title: 'Binary Tree Level Order Traversal',
    category: 'Tree',
    difficulty: 'Medium',
    pattern: 'BFS Queue Level-by-Level',
    grindWeek: 3,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    summary: 'Return the level order traversal of a binary tree\'s nodes\' values (from left to right, level by level).',
    description: `Given the \`root\` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).`,
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]' },
      { input: 'root = [1]', output: '[[1]]' },
      { input: 'root = []', output: '[]' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 2000].',
      '-1000 <= Node.val <= 1000'
    ],
    intuition: `Standard BFS Queue:
1. Initialize queue with \`root\`.
2. While queue is non-empty:
   - Determine current level size: \`level_size = len(queue)\`.
   - Pop \`level_size\` nodes, collect their values in a sub-list, and enqueue their non-null children.
   - Append the sub-list to the result list.`,
    pythonSolution: `from collections import deque

def levelOrder(root: TreeNode) -> list[list[int]]:
    """
    BFS level-by-level traversal using a queue.
    Time: O(N), Space: O(N).
    """
    if not root:
        return []
    res = []
    q = deque([root])

    while q:
        level = []
        for _ in range(len(q)):
            node = q.popleft()
            level.append(node.val)
            if node.left:
                q.append(node.left)
            if node.right:
                q.append(node.right)
        res.append(level)

    return res`,
    pseudocode: [
      'if root is None: return []',
      'queue = [root], res = []',
      'while queue is not empty:',
      '    level = []',
      '    for each node currently in queue:',
      '        pop node, append node.val to level',
      '        enqueue non-null children',
      '    res.append(level)',
      'return res'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Every node is enqueued and dequeued once.'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'Queue holds the maximum breadth of the tree (at most N/2 for bottom leaf row).'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Level 0: Enqueue root [3]. Result: [[3]].',
        action: 'inspect',
        variables: { level_0: '[3]' },
        visualData: { kind: 'array-pointers', array: [3, 9, 20, 15, 7], pointers: [{ name: 'L0', index: 0 }] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 9,
        description: 'Level 1: Pop 3, enqueue children [9, 20]. Result: [[3], [9, 20]].',
        action: 'advance',
        variables: { level_1: '[9, 20]' },
        visualData: { kind: 'array-pointers', array: [3, 9, 20, 15, 7], activeIndices: [1, 2] }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 12,
        description: 'Level 2: Pop 9 & 20, enqueue [15, 7]. Traversal complete: [[3], [9, 20], [15, 7]].',
        action: 'return',
        variables: { result: '[[3], [9, 20], [15, 7]]' },
        visualData: {
          kind: 'array-pointers',
          array: [3, 9, 20, 15, 7],
          activeIndices: [3, 4],
          badgeNote: 'Levels: [[3], [9,20], [15,7]]'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 65. Serialize and Deserialize Binary Tree (#297)
  {
    id: 'serialize-and-deserialize-binary-tree',
    number: 297,
    title: 'Serialize and Deserialize Binary Tree',
    category: 'Tree',
    difficulty: 'Hard',
    pattern: 'Pre-order DFS String Tokenizer',
    grindWeek: 11,
    estimatedMinutes: 35,
    leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
    summary: 'Design an algorithm to serialize a binary tree into a string and deserialize it back.',
    description: `Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network.

Design an algorithm to serialize and deserialize a binary tree.`,
    examples: [
      { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [0, 10^4].',
      '-1000 <= Node.val <= 1000'
    ],
    intuition: `Pre-order DFS with null delimiters:
- Serialize: Perform pre-order traversal (Root, Left, Right). If a node is \`None\`, write \`"N"\`. Otherwise write \`f"{node.val},"\`.
- Deserialize: Split the comma-delimited string into a queue of tokens. Recursively consume the next token: if it's \`"N"\`, return \`None\`. Otherwise construct a new \`TreeNode(int(token))\`, recurse for \`.left\`, and recurse for \`.right\`.`,
    pythonSolution: `class Codec:
    def serialize(self, root: TreeNode) -> str:
        """Encodes a tree to a single pre-order string."""
        vals = []
        def dfs(node):
            if not node:
                vals.append("N")
                return
            vals.append(str(node.val))
            dfs(node.left)
            dfs(node.right)
        dfs(root)
        return ",".join(vals)

    def deserialize(self, data: str) -> TreeNode:
        """Decodes pre-order string back to tree."""
        tokens = iter(data.split(","))
        def dfs():
            val = next(tokens)
            if val == "N":
                return None
            node = TreeNode(int(val))
            node.left = dfs()
            node.right = dfs()
            return node
        return dfs()`,
    pseudocode: [
      'function serialize(root):',
      '    pre-order DFS, appending node.val or "N"',
      '    return ",".join(values)',
      'function deserialize(data):',
      '    tokens = data.split(",")',
      '    function build():',
      '        val = tokens.pop()',
      '        if val == "N": return None',
      '        node = TreeNode(val)',
      '        node.left = build()',
      '        node.right = build()',
      '        return node',
      '    return build()'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Linear pre-order serialization and deserialization.'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'String output and recursion call stack.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      const s = '1,2,N,N,3,4,N,N,5,N,N';

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input tree: Root 1 with left child 2 and right child 3 -> [4, 5].',
        action: 'inspect',
        variables: { root: 1 },
        visualData: { kind: 'array-pointers', array: [1, 2, 3, 4, 5] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 7,
        description: `Pre-order serialized stream: "${s}". Every null is safely preserved as "N".`,
        action: 'update',
        variables: { serialized: s },
        visualData: {
          kind: 'array-pointers',
          array: s.split(','),
          badgeNote: 'Serialized: "1,2,N,N,3,4,N,N,5,N,N"'
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 12,
        description: 'Deserializer reads tokens sequentially to reconstruct original binary tree.',
        action: 'return',
        variables: { deserialized: true },
        visualData: {
          kind: 'array-pointers',
          array: [1, 2, 3, 4, 5],
          badgeNote: 'Binary Tree Reconstructed Perfectly'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 66. Subtree of Another Tree (#572)
  {
    id: 'subtree-of-another-tree',
    number: 572,
    title: 'Subtree of Another Tree',
    category: 'Tree',
    difficulty: 'Easy',
    pattern: 'Recursive Subtree Comparison',
    grindWeek: 2,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/subtree-of-another-tree/',
    summary: 'Check if binary tree subRoot is a subtree of binary tree root.',
    description: `Given the roots of two binary trees \`root\` and \`subRoot\`, return \`true\` if there is a subtree of \`root\` with the same structure and node values of \`subRoot\` and \`false\` otherwise.`,
    examples: [
      { input: 'root = [3,4,5,1,2], subRoot = [4,1,2]', output: 'true' },
      { input: 'root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]', output: 'false' }
    ],
    constraints: [
      'The number of nodes in the root tree is in the range [1, 2000].',
      'The number of nodes in the subRoot tree is in the range [1, 1000].'
    ],
    intuition: `Use the \`isSameTree\` helper:
1. If \`subRoot\` is \`None\`, an empty tree is always a subtree -> \`True\`.
2. If \`root\` is \`None\`, but \`subRoot\` is not -> \`False\`.
3. If \`isSameTree(root, subRoot)\` is \`True\`, a match is found -> return \`True\`.
4. Otherwise recursively test if \`subRoot\` is a subtree of \`root.left\` or \`root.right\`.`,
    pythonSolution: `def isSubtree(root: TreeNode, subRoot: TreeNode) -> bool:
    """
    Test isSameTree at each node of root recursively.
    Time: O(R * S), Space: O(H).
    """
    def same(p, q):
        if not p and not q:
            return True
        if not p or not q or p.val != q.val:
            return False
        return same(p.left, q.left) and same(p.right, q.right)

    if not subRoot:
        return True
    if not root:
        return False
    if same(root, subRoot):
        return True
    return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)`,
    pseudocode: [
      'if subRoot is None: return True',
      'if root is None: return False',
      'if isSameTree(root, subRoot): return True',
      'return isSubtree(root.left, subRoot) or isSubtree(root.right, subRoot)'
    ],
    timeComplexity: {
      bigO: 'O(R * S)',
      explanation: 'Where R and S are node counts of root and subRoot trees.'
    },
    spaceComplexity: {
      bigO: 'O(H)',
      explanation: 'Recursion stack bounded by height of root tree.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 2,
        line: 1,
        description: 'Input root: [3, 4, 5, 1, 2], subRoot: [4, 1, 2].',
        action: 'inspect',
        variables: { root: 3, subRoot: 4 },
        visualData: { kind: 'array-pointers', array: [3, 4, 5, 1, 2] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 2,
        line: 5,
        description: 'Check root.left (node 4): isSameTree(4, subRoot) is TRUE! Valid Subtree.',
        action: 'return',
        variables: { is_subtree: true },
        visualData: {
          kind: 'array-pointers',
          array: [3, 4, 5, 1, 2],
          activeIndices: [1, 3, 4],
          badgeNote: 'Subtree [4, 1, 2] Matched'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 67. Construct Binary Tree from Preorder and Inorder Traversal (#105)
  {
    id: 'construct-binary-tree-from-preorder-and-inorder-traversal',
    number: 105,
    title: 'Construct Binary Tree from Preorder and Inorder Traversal',
    category: 'Tree',
    difficulty: 'Medium',
    pattern: 'Divide and Conquer Tree Reconstruction',
    grindWeek: 6,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
    summary: 'Construct and return a binary tree given its preorder and inorder traversal arrays.',
    description: `Given two integer arrays \`preorder\` and \`inorder\` where \`preorder\` is the preorder traversal of a binary tree and \`inorder\` is the inorder traversal of the same tree, construct and return the binary tree.`,
    examples: [
      { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', output: '[3,9,20,null,null,15,7]' },
      { input: 'preorder = [-1], inorder = [-1]', output: '[-1]' }
    ],
    constraints: [
      '1 <= preorder.length <= 3000',
      'inorder.length == preorder.length',
      '-3000 <= preorder[i], inorder[i] <= 3000',
      'preorder and inorder consist of unique values.'
    ],
    intuition: `Key invariants:
- The first element of \`preorder\` is always the root of the current subtree.
- In \`inorder\`, all elements to the left of this root belong to its left subtree, and all elements to the right belong to its right subtree!
Use a hash map \`val -> index\` for O(1) lookup of root in \`inorder\`. Divide and conquer recursively builds the tree in O(N) time.`,
    pythonSolution: `def buildTree(preorder: list[int], inorder: list[int]) -> TreeNode:
    """
    Reconstruct tree using preorder root and inorder partitions.
    Time: O(N), Space: O(N).
    """
    in_map = {val: idx for idx, val in enumerate(inorder)}
    pre_idx = 0

    def helper(left, right):
        nonlocal pre_idx
        if left > right:
            return None

        root_val = preorder[pre_idx]
        pre_idx += 1
        root = TreeNode(root_val)
        mid = in_map[root_val]

        root.left = helper(left, mid - 1)
        root.right = helper(mid + 1, right)
        return root

    return helper(0, len(inorder) - 1)`,
    pseudocode: [
      'in_map = hash map mapping value -> index in inorder',
      'pre_idx = 0',
      'function helper(left, right):',
      '    if left > right: return None',
      '    root_val = preorder[pre_idx++]',
      '    mid = in_map[root_val]',
      '    root = new TreeNode(root_val)',
      '    root.left = helper(left, mid - 1)',
      '    root.right = helper(mid + 1, right)',
      '    return root',
      'return helper(0, len(inorder) - 1)'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Constructs each of the N nodes in O(1) using the hash map.'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'Hash map of size N plus recursion stack.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]. First root is 3.',
        action: 'inspect',
        variables: { root: 3 },
        visualData: { kind: 'array-pointers', array: [3, 9, 20, 15, 7], pointers: [{ name: 'root', index: 0 }] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 7,
        description: 'In inorder, 3 is at index 1: left partition is [9], right partition is [15, 20, 7].',
        action: 'advance',
        variables: { left_partition: '[9]', right_partition: '[15, 20, 7]' },
        visualData: {
          kind: 'array-pointers',
          array: [9, 3, 15, 20, 7],
          activeIndices: [1],
          pointers: [{ name: 'mid', index: 1, color: 'var(--success-500)' }]
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 11,
        description: 'Recurse on partitions to construct complete tree: [3, 9, 20, null, null, 15, 7].',
        action: 'return',
        variables: { tree_constructed: true },
        visualData: {
          kind: 'array-pointers',
          array: [3, 9, 20, 15, 7],
          badgeNote: 'Tree Reconstructed Successfully'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 68. Validate Binary Search Tree (#98)
  {
    id: 'validate-binary-search-tree',
    number: 98,
    title: 'Validate Binary Search Tree',
    category: 'Tree',
    difficulty: 'Medium',
    pattern: 'DFS with Valid Range (Min, Max) Invariants',
    grindWeek: 4,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
    summary: 'Determine if a given binary tree is a valid binary search tree (BST).',
    description: `Given the \`root\` of a binary tree, determine if it is a valid binary search tree (BST).

A valid BST is defined as follows:
- The left subtree of a node contains only nodes with keys strictly less than the node's key.
- The right subtree of a node contains only nodes with keys strictly greater than the node's key.
- Both the left and right subtrees must also be binary search trees.`,
    examples: [
      { input: 'root = [2,1,3]', output: 'true' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: 'The root node\'s value is 5 but its right child\'s value is 4.' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [1, 10^4].',
      '-2^31 <= Node.val <= 2^31 - 1'
    ],
    intuition: `It is not enough to only compare a node with its immediate children. Every node in a BST must satisfy an allowable range \`(low, high)\`:
- Root must satisfy \`(-inf, +inf)\`.
- When going left, update upper bound: \`validate(node.left, low, node.val)\`.
- When going right, update lower bound: \`validate(node.right, node.val, high)\`.
If any node violates its \`low < node.val < high\` invariant, return \`False\`.`,
    pythonSolution: `def isValidBST(root: TreeNode) -> bool:
    """
    Validate BST properties using allowable (low, high) bounds.
    Time: O(N), Space: O(H).
    """
    def validate(node, low, high):
        if not node:
            return True
        if not (low < node.val < high):
            return False
        return (validate(node.left, low, node.val) and
                validate(node.right, node.val, high))

    return validate(root, float('-inf'), float('inf'))`,
    pseudocode: [
      'function validate(node, low, high):',
      '    if node is None: return True',
      '    if not (low < node.val < high): return False',
      '    return validate(node.left, low, node.val) and validate(node.right, node.val, high)',
      'return validate(root, -inf, +inf)'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Visits each node once.'
    },
    spaceComplexity: {
      bigO: 'O(H)',
      explanation: 'Recursion stack bounded by tree height.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 2,
        line: 1,
        description: 'Input tree: [2, 1, 3]. Root 2 is evaluated with bounds (-∞, +∞). Valid.',
        action: 'inspect',
        variables: { node: 2, low: '-∞', high: '+∞' },
        visualData: { kind: 'array-pointers', array: [2, 1, 3], pointers: [{ name: 'root', index: 0 }] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 2,
        line: 5,
        description: 'Left child 1 in (-∞, 2) is valid. Right child 3 in (2, +∞) is valid. Valid BST: TRUE.',
        action: 'return',
        variables: { is_valid_bst: true },
        visualData: {
          kind: 'array-pointers',
          array: [2, 1, 3],
          activeIndices: [1, 2],
          badgeNote: 'All BST Invariants Satisfied'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 69. Kth Smallest Element in a BST (#230)
  {
    id: 'kth-smallest-element-in-a-bst',
    number: 230,
    title: 'Kth Smallest Element in a BST',
    category: 'Tree',
    difficulty: 'Medium',
    pattern: 'In-order Traversal (Sorted BST Property)',
    grindWeek: 8,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-bst/',
    summary: 'Find the kth smallest value (1-indexed) in a binary search tree.',
    description: `Given the \`root\` of a binary search tree, and an integer \`k\`, return the \`k\`th smallest value (1-indexed) of all the values of the nodes in the tree.`,
    examples: [
      { input: 'root = [3,1,4,null,2], k = 1', output: '1' },
      { input: 'root = [5,3,6,2,4,null,null,1], k = 3', output: '3' }
    ],
    constraints: [
      'The number of nodes in the tree is n.',
      '1 <= k <= n <= 10^4',
      '0 <= Node.val <= 10^4'
    ],
    intuition: `An In-Order Traversal (Left, Root, Right) of a Binary Search Tree processes all elements in strictly ascending sorted order!
Iterative in-order traversal using a stack:
1. Walk all the way down left branches pushing nodes onto the stack.
2. Pop the top node: this is the next smallest element in order.
3. Decrement \`k\`. If \`k == 0\`, this is our \`k\`th smallest element!
4. Move to \`node.right\` and repeat.`,
    pythonSolution: `def kthSmallest(root: TreeNode, k: int) -> int:
    """
    Iterative in-order traversal with stack stopping at kth element.
    Time: O(H + k), Space: O(H).
    """
    stack = []
    curr = root

    while curr or stack:
        while curr:
            stack.append(curr)
            curr = curr.left
        curr = stack.pop()
        k -= 1
        if k == 0:
            return curr.val
        curr = curr.right`,
    pseudocode: [
      'stack = [], curr = root',
      'while curr is not None or stack is not empty:',
      '    while curr is not None: push curr; curr = curr.left',
      '    curr = stack.pop()',
      '    k--',
      '    if k == 0: return curr.val',
      '    curr = curr.right'
    ],
    timeComplexity: {
      bigO: 'O(H + k)',
      explanation: 'Travels down tree height H to smallest element, then visits k elements.'
    },
    spaceComplexity: {
      bigO: 'O(H)',
      explanation: 'Stack holds at most H nodes.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input BST: [5, 3, 6, 2, 4, 1], k = 3. In-order traversal visits in ascending order.',
        action: 'inspect',
        variables: { k: 3 },
        visualData: { kind: 'array-pointers', array: [1, 2, 3, 4, 5, 6] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 5,
        description: 'Visit 1 (k=2), Visit 2 (k=1)...',
        action: 'advance',
        variables: { visited_count: 2 },
        visualData: { kind: 'array-pointers', array: [1, 2, 3, 4, 5, 6], activeIndices: [0, 1] }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 7,
        description: 'Visit 3 (k=0)! k reached 0. 3rd smallest element is 3.',
        action: 'return',
        variables: { answer: 3 },
        visualData: {
          kind: 'array-pointers',
          array: [1, 2, 3, 4, 5, 6],
          activeIndices: [2],
          pointers: [{ name: '3rd', index: 2, color: 'var(--success-500)' }],
          badgeNote: '3rd Smallest: 3'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 70. Lowest Common Ancestor of a BST (#235)
  {
    id: 'lowest-common-ancestor-of-a-binary-search-tree',
    number: 235,
    title: 'Lowest Common Ancestor of a Binary Search Tree',
    category: 'Tree',
    difficulty: 'Medium',
    pattern: 'BST Split Point Navigation',
    grindWeek: 1,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/',
    summary: 'Find the lowest common ancestor (LCA) node of two given nodes in a BST.',
    description: `Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the definition of LCA on Wikipedia: "The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself)."`,
    examples: [
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8', output: '6', explanation: 'The LCA of nodes 2 and 8 is 6.' },
      { input: 'root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4', output: '2', explanation: 'The LCA of nodes 2 and 4 is 2 (descendant of itself).' }
    ],
    constraints: [
      'The number of nodes in the tree is in the range [2, 10^5].',
      '-10^9 <= Node.val <= 10^9',
      'All Node.val are unique.',
      'p != q',
      'p and q will exist in the BST.'
    ],
    intuition: `Use the BST ordering property:
- If both \`p.val\` and \`q.val\` are strictly less than \`curr.val\`, both targets lie in the left subtree: move \`curr = curr.left\`.
- If both \`p.val\` and \`q.val\` are strictly greater than \`curr.val\`, both targets lie in the right subtree: move \`curr = curr.right\`.
- Otherwise, a split occurs! One target is on the left and the other on the right (or \`curr\` matches \`p\` or \`q\`). This split node \`curr\` is guaranteed to be the Lowest Common Ancestor!`,
    pythonSolution: `def lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    """
    Find split point where p and q diverge in BST.
    Time: O(H), Space: O(1).
    """
    curr = root
    while curr:
        if p.val < curr.val and q.val < curr.val:
            curr = curr.left
        elif p.val > curr.val and q.val > curr.val:
            curr = curr.right
        else:
            return curr
    return None`,
    pseudocode: [
      'curr = root',
      'while curr is not None:',
      '    if p.val < curr.val and q.val < curr.val: curr = curr.left',
      '    else if p.val > curr.val and q.val > curr.val: curr = curr.right',
      '    else: return curr # Split point found!',
      'return None'
    ],
    timeComplexity: {
      bigO: 'O(H)',
      explanation: 'Navigates down a single path in the tree.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Iterative pointer traversal.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 2,
        line: 1,
        description: 'Input: Root 6, target p = 2, q = 8.',
        action: 'inspect',
        variables: { curr: 6, p: 2, q: 8 },
        visualData: { kind: 'array-pointers', array: [6, 2, 8], pointers: [{ name: 'curr (6)', index: 0 }] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 2,
        line: 6,
        description: 'p (2) < 6 and q (8) > 6: Split point detected at 6! Node 6 is the Lowest Common Ancestor.',
        action: 'return',
        variables: { lca: 6 },
        visualData: {
          kind: 'array-pointers',
          array: [6, 2, 8],
          activeIndices: [0],
          badgeNote: 'LCA: Node 6'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 71. Implement Trie (Prefix Tree) (#208)
  {
    id: 'implement-trie-prefix-tree',
    number: 208,
    title: 'Implement Trie (Prefix Tree)',
    category: 'Tree',
    difficulty: 'Medium',
    pattern: 'N-ary Prefix Tree Node Links',
    grindWeek: 4,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
    summary: 'Implement a trie with insert, search, and startsWith methods.',
    description: `A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the \`Trie\` class with \`insert\`, \`search\`, and \`startsWith\` methods.`,
    examples: [
      {
        input: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]',
        output: '[null, null, true, false, true, null, true]'
      }
    ],
    constraints: [
      '1 <= word.length, prefix.length <= 2000',
      'word and prefix consist only of lowercase English letters.',
      'At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.'
    ],
    intuition: `Each \`TrieNode\` holds:
1. \`children\`: a dictionary mapping characters to child \`TrieNode\`s.
2. \`end_of_word\`: boolean flag indicating whether a complete word terminates at this node.
- \`insert(word)\`: Traverse down character nodes, creating new nodes if missing. Mark the final node with \`end_of_word = True\`.
- \`search(word)\`: Traverse down. Return \`True\` if all characters exist and \`curr.end_of_word\` is \`True\`.
- \`startsWith(prefix)\`: Traverse down. Return \`True\` if all prefix characters exist.`,
    pythonSolution: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        curr.end_of_word = True

    def search(self, word: str) -> bool:
        curr = self.root
        for c in word:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return curr.end_of_word

    def startsWith(self, prefix: str) -> bool:
        curr = self.root
        for c in prefix:
            if c not in curr.children:
                return False
            curr = curr.children[c]
        return True`,
    pseudocode: [
      'class TrieNode: children = {}, end_of_word = False',
      'function insert(word): walk/create nodes for each char; set end_of_word = True',
      'function search(word): walk nodes; return True if all found and end_of_word is True',
      'function startsWith(prefix): walk nodes; return True if all prefix chars found'
    ],
    timeComplexity: {
      bigO: 'O(L)',
      explanation: 'Where L is the length of the word/prefix.'
    },
    spaceComplexity: {
      bigO: 'O(total characters * Alphabet)',
      explanation: 'Trie nodes allocate children mappings.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Initialize empty Trie root.',
        action: 'inspect',
        variables: { trie: 'empty' },
        visualData: { kind: 'array-pointers', array: ['root'] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 8,
        description: 'Insert "apple": creates chain root -> a -> p -> p -> l -> e (end=True).',
        action: 'update',
        variables: { inserted: 'apple' },
        visualData: {
          kind: 'array-pointers',
          array: ['root', 'a', 'p', 'p', 'l', 'e*'],
          badgeNote: 'Word "apple" Stored in Trie'
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 15,
        description: 'search("apple") -> True. search("app") -> False. startsWith("app") -> True!',
        action: 'return',
        variables: { 'search(apple)': true, 'search(app)': false, 'startsWith(app)': true },
        visualData: {
          kind: 'array-pointers',
          array: ['root', 'a', 'p', 'p', 'l', 'e*'],
          badgeNote: 'Prefix "app" Confirmed'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 72. Add and Search Word (#211)
  {
    id: 'add-and-search-word-data-structure-design',
    number: 211,
    title: 'Design Add and Search Words Data Structure',
    category: 'Tree',
    difficulty: 'Medium',
    pattern: 'Trie + Wildcard Backtracking DFS',
    grindWeek: 8,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/',
    summary: 'Design a data structure that supports adding new words and searching with "." wildcards.',
    description: `Design a data structure that supports adding new words and finding if a string matches any previously added string, where \`'.'\` matches any letter.`,
    examples: [
      {
        input: '["WordDictionary","addWord","addWord","addWord","search","search","search","search"]\n[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]',
        output: '[null,null,null,null,false,true,true,true]'
      }
    ],
    constraints: [
      '1 <= word.length <= 25',
      'word in addWord consists of lowercase English letters.',
      'word in search consist of \'.\' or lowercase English letters.',
      'At most 10^4 calls will be made.'
    ],
    intuition: `Standard Trie with a DFS search method:
When encountering a literal character \`c\`, follow child node \`curr.children[c]\`.
When encountering the wildcard character \`'.'\`, branch across ALL children of \`curr\`:
\`for child in curr.children.values(): if dfs(j + 1, child): return True\`.
If any child branch succeeds, return \`True\`.`,
    pythonSolution: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_word = False

class WordDictionary:
    def __init__(self):
        self.root = TrieNode()

    def addWord(self, word: str) -> None:
        curr = self.root
        for c in word:
            if c not in curr.children:
                curr.children[c] = TrieNode()
            curr = curr.children[c]
        self.is_word = True

    def search(self, word: str) -> bool:
        def dfs(j, root):
            curr = root
            for i in range(j, len(word)):
                c = word[i]
                if c == ".":
                    for child in curr.children.values():
                        if dfs(i + 1, child):
                            return True
                    return False
                else:
                    if c not in curr.children:
                        return False
                    curr = curr.children[c]
            return curr.is_word
            
        return dfs(0, self.root)`,
    pseudocode: [
      'addWord(word): standard Trie insertion',
      'search(word):',
      '    function dfs(index, node):',
      '        for i from index to len(word)-1:',
      '            if word[i] == ".":',
      '                for each child in node.children: if dfs(i + 1, child): return True',
      '                return False',
      '            else:',
      '                if word[i] not in node.children: return False',
      '                node = node.children[word[i]]',
      '        return node.is_word',
      '    return dfs(0, root)'
    ],
    timeComplexity: {
      bigO: 'O(M) for addWord, O(26^D) for search with wildcards',
      explanation: 'Where D is number of wildcards and M is word length.'
    },
    spaceComplexity: {
      bigO: 'O(total characters)',
      explanation: 'Trie node allocations.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 2,
        line: 1,
        description: 'Trie populated with: "bad", "dad", "mad". Query: search(".ad").',
        action: 'inspect',
        variables: { query: '.ad' },
        visualData: { kind: 'array-pointers', array: ['bad', 'dad', 'mad'] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 2,
        line: 6,
        description: 'Wildcard \'.\' branches to "b", "d", "m". All branch to "ad" (word=True). Search returns True!',
        action: 'return',
        variables: { match_found: true },
        visualData: {
          kind: 'array-pointers',
          array: ['bad', 'dad', 'mad'],
          activeIndices: [0, 1, 2],
          badgeNote: 'Wildcard Match: ".ad" matches "bad", "dad", "mad"'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 73. Word Search II (#212)
  {
    id: 'word-search-ii',
    number: 212,
    title: 'Word Search II',
    category: 'Tree',
    difficulty: 'Hard',
    pattern: 'Trie + Grid Backtracking DFS with Pruning',
    grindWeek: 9,
    estimatedMinutes: 35,
    leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/',
    summary: 'Given an m x n board of characters and a list of strings words, return all words on the board.',
    description: `Given an \`m x n\` \`board\` of characters and a list of strings \`words\`, return all words on the board.

Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.`,
    examples: [
      {
        input: 'board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]',
        output: '["eat","oath"]'
      }
    ],
    constraints: [
      'm == board.length',
      'n == board[i].length',
      '1 <= m, n <= 12',
      '1 <= words.length <= 3 * 10^4',
      '1 <= words[i].length <= 10'
    ],
    intuition: `Running Word Search I for each of 30,000 words results in Time Limit Exceeded.
Instead, build a Trie containing ALL target words:
1. Walk the board with DFS.
2. At each step, check if the board character is a valid transition in the Trie. If not, prune immediately!
3. If a Trie node marks the completion of a word, add it to the result set and clear its word marker to prevent duplicate finds.`,
    pythonSolution: `def findWords(board: list[list[str]], words: list[str]) -> list[str]:
    """
    Trie + Grid DFS with instantaneous prefix pruning.
    Time: O(M * N * 4 * 3^(L-1)), Space: O(total chars in words).
    """
    trie = {}
    for word in words:
        curr = trie
        for c in word:
            curr = curr.setdefault(c, {})
        curr['$'] = word  # Word completion marker

    ROWS, COLS = len(board), len(board[0])
    res = []

    def dfs(r, c, parent):
        char = board[r][c]
        curr_node = parent[char]

        # Word found!
        if '$' in curr_node:
            res.append(curr_node.pop('$'))

        board[r][c] = '#'  # Mark visited
        for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nr, nc = r + dr, c + dc
            if 0 <= nr < ROWS and 0 <= nc < COLS and board[nr][nc] in curr_node:
                dfs(nr, nc, curr_node)
        board[r][c] = char  # Backtrack

    for r in range(ROWS):
        for c in range(COLS):
            if board[r][c] in trie:
                dfs(r, c, trie)

    return res`,
    pseudocode: [
      'build Trie containing all words in dictionary',
      'res = []',
      'function dfs(r, c, trie_node):',
      '    if trie_node has word: res.append(word); delete word marker',
      '    mark board[r][c] visited',
      '    for each valid neighbor in trie_node.children: dfs(nr, nc, child)',
      '    restore board[r][c]',
      'for each cell (r, c) matching trie root: dfs(r, c, trie)',
      'return res'
    ],
    timeComplexity: {
      bigO: 'O(M * N * 4 * 3^(L-1))',
      explanation: 'Where L is maximum word length.'
    },
    spaceComplexity: {
      bigO: 'O(W * L)',
      explanation: 'Trie stores all W words of length up to L.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      const board = [
        ['o', 'a', 'a', 'n'],
        ['e', 't', 'a', 'e'],
        ['i', 'h', 'k', 'r']
      ];

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Trie built for words: ["oath", "pea", "eat", "rain"].',
        action: 'inspect',
        variables: { words: '["oath", "pea", "eat", "rain"]' },
        visualData: { kind: 'matrix', grid: board, activeCell: { r: 0, c: 0 } }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 8,
        description: 'DFS path: (0,0) \'o\' -> (1,1) \'a\' -> (1,1) \'t\' -> (2,1) \'h\': Found "oath"!',
        action: 'match',
        variables: { found: 'oath' },
        visualData: {
          kind: 'matrix',
          grid: board,
          highlightCells: [{ r: 0, c: 0 }, { r: 0, c: 1 }, { r: 1, c: 1 }, { r: 2, c: 1 }],
          badgeNote: 'Word "oath" Found'
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 14,
        description: 'DFS path: (1,0) \'e\' -> (0,1) \'a\' -> (1,1) \'t\': Found "eat"! Result: ["eat", "oath"].',
        action: 'return',
        variables: { result: '["eat", "oath"]' },
        visualData: {
          kind: 'matrix',
          grid: board,
          badgeNote: 'Result: ["eat", "oath"]'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  }
];
