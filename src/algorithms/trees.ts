import { TreeVisualState, TreeNodeData } from '../types/visualizer';
import { VisualStep, PseudocodeLine } from '../types/algorithm';

export const TREE_PSEUDOCODE: Record<string, PseudocodeLine[]> = {
  'BST Insert': [
    { num: 1, code: 'function insertBST(node, val):', indent: 0 },
    { num: 2, code: '  if node == null: return new Node(val)', indent: 1 },
    { num: 3, code: '  if val < node.val:', indent: 1 },
    { num: 4, code: '    node.left = insertBST(node.left, val)', indent: 2 },
    { num: 5, code: '  else if val > node.val:', indent: 1 },
    { num: 6, code: '    node.right = insertBST(node.right, val)', indent: 2 },
    { num: 7, code: '  return node', indent: 1 }
  ],
  'AVL Insert': [
    { num: 1, code: 'function insertAVL(node, val):', indent: 0 },
    { num: 2, code: '  // 1. Standard BST Insert', indent: 1 },
    { num: 3, code: '  node = bstInsert(node, val)', indent: 1 },
    { num: 4, code: '  // 2. Update node height & balance factor', indent: 1 },
    { num: 5, code: '  node.height = 1 + max(h(left), h(right))', indent: 1 },
    { num: 6, code: '  bf = height(left) - height(right)', indent: 1 },
    { num: 7, code: '  // 3. Rebalance if |bf| > 1 via rotations', indent: 1 },
    { num: 8, code: '  if bf > 1 and val < left.val: return rotateRight(node)', indent: 1 },
    { num: 9, code: '  if bf < -1 and val > right.val: return rotateLeft(node)', indent: 1 },
    { num: 10, code: '  if bf > 1 and val > left.val: leftRotate(left); return rotateRight(node)', indent: 1 },
    { num: 11, code: '  if bf < -1 and val < right.val: rightRotate(right); return rotateLeft(node)', indent: 1 }
  ]
};

function cloneTreeState(state: TreeVisualState): TreeVisualState {
  const newNodes: Record<string, TreeNodeData> = {};
  for (const key of Object.keys(state.nodes)) {
    newNodes[key] = { ...state.nodes[key] };
  }
  return {
    nodes: newNodes,
    rootId: state.rootId,
    inspectingNodeId: state.inspectingNodeId,
    activePath: state.activePath ? [...state.activePath] : undefined
  };
}

export function generateInitialTree(): TreeVisualState {
  const nodes: Record<string, TreeNodeData> = {
    '50': { id: '50', value: 50, leftId: '25', rightId: '75', height: 2, balanceFactor: 0, state: 'default' },
    '25': { id: '25', value: 25, leftId: '15', rightId: '35', height: 1, balanceFactor: 0, state: 'default' },
    '75': { id: '75', value: 75, leftId: '60', rightId: '85', height: 1, balanceFactor: 0, state: 'default' },
    '15': { id: '15', value: 15, height: 0, balanceFactor: 0, state: 'default' },
    '35': { id: '35', value: 35, height: 0, balanceFactor: 0, state: 'default' },
    '60': { id: '60', value: 60, height: 0, balanceFactor: 0, state: 'default' },
    '85': { id: '85', value: 85, height: 0, balanceFactor: 0, state: 'default' }
  };
  return { nodes, rootId: '50' };
}

// Generate BST Insertion Steps
export function generateBstInsertSteps(initialTree: TreeVisualState, newVal: number): VisualStep<TreeVisualState>[] {
  const steps: VisualStep<TreeVisualState>[] = [];
  let currentTree = cloneTreeState(initialTree);
  const newId = String(newVal);

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 1,
    description: `Begin BST insertion for value ${newVal}. Starting at root.`,
    actionType: 'traverse',
    variables: { val: newVal, current: currentTree.rootId || null },
    state: cloneTreeState(currentTree)
  });

  let currId = currentTree.rootId;
  const path: string[] = [];

  while (currId) {
    path.push(currId);
    currentTree = cloneTreeState(currentTree);
    currentTree.inspectingNodeId = currId;
    currentTree.nodes[currId].state = 'inspect';
    currentTree.activePath = [...path];

    const currNode = currentTree.nodes[currId];
    if (newVal === currNode.value) {
      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 2,
        description: `Value ${newVal} already exists in the BST! Duplicates rejected.`,
        actionType: 'complete',
        variables: { val: newVal, exists: true },
        state: cloneTreeState(currentTree)
      });
      break;
    } else if (newVal < currNode.value) {
      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 3,
        description: `Value ${newVal} < ${currNode.value}. Branching to LEFT subtree.`,
        actionType: 'compare',
        variables: { val: newVal, nodeVal: currNode.value, nextBranch: 'LEFT' },
        state: cloneTreeState(currentTree)
      });

      if (!currNode.leftId) {
        // Insert as left child
        currNode.leftId = newId;
        currentTree.nodes[newId] = {
          id: newId,
          value: newVal,
          height: 0,
          balanceFactor: 0,
          state: 'active'
        };
        currentTree.inspectingNodeId = newId;
        path.push(newId);
        currentTree.activePath = [...path];

        steps.push({
          stepIndex: steps.length,
          totalSteps: 0,
          line: 4,
          description: `Left child is null. Inserted new node ${newVal} as left child of ${currNode.value}!`,
          actionType: 'insert',
          variables: { parent: currNode.value, child: newVal, side: 'LEFT' },
          state: cloneTreeState(currentTree)
        });
        break;
      }
      currNode.state = 'visited';
      currId = currNode.leftId;
    } else {
      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 5,
        description: `Value ${newVal} > ${currNode.value}. Branching to RIGHT subtree.`,
        actionType: 'compare',
        variables: { val: newVal, nodeVal: currNode.value, nextBranch: 'RIGHT' },
        state: cloneTreeState(currentTree)
      });

      if (!currNode.rightId) {
        // Insert as right child
        currNode.rightId = newId;
        currentTree.nodes[newId] = {
          id: newId,
          value: newVal,
          height: 0,
          balanceFactor: 0,
          state: 'active'
        };
        currentTree.inspectingNodeId = newId;
        path.push(newId);
        currentTree.activePath = [...path];

        steps.push({
          stepIndex: steps.length,
          totalSteps: 0,
          line: 6,
          description: `Right child is null. Inserted new node ${newVal} as right child of ${currNode.value}!`,
          actionType: 'insert',
          variables: { parent: currNode.value, child: newVal, side: 'RIGHT' },
          state: cloneTreeState(currentTree)
        });
        break;
      }
      currNode.state = 'visited';
      currId = currNode.rightId;
    }
  }

  // Final step
  currentTree = cloneTreeState(currentTree);
  for (const nid of Object.keys(currentTree.nodes)) {
    currentTree.nodes[nid].state = 'default';
  }
  if (currentTree.nodes[newId]) {
    currentTree.nodes[newId].state = 'sorted';
  }
  currentTree.inspectingNodeId = undefined;

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 7,
    description: `BST insertion complete. Tree satisfies all binary search invariant rules.`,
    actionType: 'complete',
    variables: { inserted: newVal },
    state: cloneTreeState(currentTree)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

// Generate AVL Rotation Step
export function generateAvlDemoSteps(): VisualStep<TreeVisualState>[] {
  const steps: VisualStep<TreeVisualState>[] = [];
  
  // Unbalanced initial state (Left-Left heavy)
  let tree: TreeVisualState = {
    rootId: '30',
    nodes: {
      '30': { id: '30', value: 30, leftId: '20', height: 2, balanceFactor: 2, state: 'inspect' },
      '20': { id: '20', value: 20, leftId: '10', height: 1, balanceFactor: 1, state: 'inspect' },
      '10': { id: '10', value: 10, height: 0, balanceFactor: 0, state: 'active' }
    }
  };

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 6,
    description: 'Node 30 has Balance Factor = +2! Left-Left imbalance detected.',
    actionType: 'compare',
    variables: { node: 30, bf: '+2', status: 'UNBALANCED' },
    state: cloneTreeState(tree)
  });

  steps.push({
    stepIndex: 1,
    totalSteps: 0,
    line: 8,
    description: 'Executing Right Rotation around Node 30 to restore AVL height balance.',
    actionType: 'rotate',
    variables: { rotation: 'Right Rotation (LL)', pivotNode: 20 },
    state: cloneTreeState(tree)
  });

  // After right rotation: 20 becomes new root, left is 10, right is 30
  tree = {
    rootId: '20',
    nodes: {
      '20': { id: '20', value: 20, leftId: '10', rightId: '30', height: 1, balanceFactor: 0, state: 'sorted' },
      '10': { id: '10', value: 10, height: 0, balanceFactor: 0, state: 'default' },
      '30': { id: '30', value: 30, height: 0, balanceFactor: 0, state: 'default' }
    }
  };

  steps.push({
    stepIndex: 2,
    totalSteps: 0,
    line: 8,
    description: 'Right Rotation succeeded! Node 20 is the new root. Tree height is optimal O(log N).',
    actionType: 'complete',
    variables: { newRoot: 20, maxBF: 0, status: 'BALANCED' },
    state: cloneTreeState(tree)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}
