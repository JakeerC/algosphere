import { UnionFindVisualState, UfdsElement } from '../types/visualizer';
import { VisualStep, PseudocodeLine } from '../types/algorithm';

export const UFDS_PSEUDOCODE: Record<string, PseudocodeLine[]> = {
  'Find with Compression': [
    { num: 1, code: 'function find(i):', indent: 0 },
    { num: 2, code: '  if parent[i] == i: return i', indent: 1 },
    { num: 3, code: '  parent[i] = find(parent[i])  // Path compression', indent: 1 },
    { num: 4, code: '  return parent[i]', indent: 1 }
  ],
  'Union by Rank': [
    { num: 1, code: 'function union(i, j):', indent: 0 },
    { num: 2, code: '  rootI = find(i); rootJ = find(j)', indent: 1 },
    { num: 3, code: '  if rootI == rootJ: return  // Already in same set', indent: 1 },
    { num: 4, code: '  if rank[rootI] < rank[rootJ]: parent[rootI] = rootJ', indent: 1 },
    { num: 5, code: '  else if rank[rootI] > rank[rootJ]: parent[rootJ] = rootI', indent: 1 },
    { num: 6, code: '  else: parent[rootJ] = rootI; rank[rootI]++', indent: 1 },
    { num: 7, code: '  numSets--', indent: 1 }
  ]
};

function cloneUfds(state: UnionFindVisualState): UnionFindVisualState {
  return {
    elements: state.elements.map(e => ({ ...e })),
    numSets: state.numSets,
    activeElements: state.activeElements ? [...state.activeElements] : undefined,
    explanation: state.explanation
  };
}

export function generateFindWithCompressionSteps(
  initialElements?: UfdsElement[],
  queryNode: number = 4
): VisualStep<UnionFindVisualState>[] {
  const steps: VisualStep<UnionFindVisualState>[] = [];
  // Setup a sample tree structure: 4 -> 3 -> 1 -> 0 (root)
  const elements: UfdsElement[] = initialElements || [
    { id: 0, parent: 0, rank: 3, state: 'default' },
    { id: 1, parent: 0, rank: 2, state: 'default' },
    { id: 2, parent: 0, rank: 0, state: 'default' },
    { id: 3, parent: 1, rank: 1, state: 'default' },
    { id: 4, parent: 3, rank: 0, state: 'default' },
    { id: 5, parent: 5, rank: 0, state: 'default' }
  ];

  let current: UnionFindVisualState = {
    elements,
    numSets: 2,
    activeElements: [queryNode],
    explanation: `Find representative set leader for node ${queryNode}.`
  };

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 1,
    description: `Calling find(${queryNode}) to locate root set leader with path compression.`,
    actionType: 'traverse',
    variables: { node: queryNode, 'parent[node]': elements[queryNode].parent },
    state: cloneUfds(current)
  });

  // Traverse path to root
  const path: number[] = [];
  let curr = queryNode;
  while (current.elements[curr].parent !== curr) {
    path.push(curr);
    current = cloneUfds(current);
    current.elements.forEach(e => e.state = 'default');
    current.elements[curr].state = 'inspect';
    current.elements[current.elements[curr].parent].state = 'pivot';
    current.activeElements = [...path];

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 2,
      description: `Node ${curr} is not root (parent is ${current.elements[curr].parent}). Ascending upward.`,
      actionType: 'traverse',
      variables: { current: curr, parent: current.elements[curr].parent },
      state: cloneUfds(current)
    });

    curr = current.elements[curr].parent;
  }

  const rootId = curr;
  current = cloneUfds(current);
  current.elements[rootId].state = 'sorted';

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 2,
    description: `Reached root leader: Node ${rootId} (parent[${rootId}] == ${rootId}).`,
    actionType: 'pivot',
    variables: { root: rootId },
    state: cloneUfds(current)
  });

  // Path compression phase: point every node in path directly to rootId
  for (const pNode of path) {
    if (current.elements[pNode].parent !== rootId) {
      const oldParent = current.elements[pNode].parent;
      current = cloneUfds(current);
      current.elements[pNode].parent = rootId;
      current.elements[pNode].state = 'swap';

      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 3,
        description: `Path Compression applied! Flattened tree: redirected Node ${pNode}'s parent from ${oldParent} directly to root ${rootId}.`,
        actionType: 'swap',
        variables: { node: pNode, oldParent, newParent: rootId },
        state: cloneUfds(current)
      });
    }
  }

  current = cloneUfds(current);
  current.elements.forEach(e => e.state = 'sorted');

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 4,
    description: `find(${queryNode}) complete! Tree height collapsed. Subsequent operations now execute in amortized near-constant O(\u03b1(N)) time!`,
    actionType: 'complete',
    variables: { root: rootId, status: 'COMPRESSED' },
    state: cloneUfds(current)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

export function generateUnionByRankSteps(
  i: number = 3,
  j: number = 5
): VisualStep<UnionFindVisualState>[] {
  const steps: VisualStep<UnionFindVisualState>[] = [];
  const elements: UfdsElement[] = [
    { id: 0, parent: 0, rank: 2, state: 'default' },
    { id: 1, parent: 0, rank: 0, state: 'default' },
    { id: 2, parent: 0, rank: 0, state: 'default' },
    { id: 3, parent: 0, rank: 1, state: 'default' },
    { id: 4, parent: 4, rank: 1, state: 'default' },
    { id: 5, parent: 4, rank: 0, state: 'default' }
  ];

  let current: UnionFindVisualState = {
    elements,
    numSets: 2,
    activeElements: [i, j],
    explanation: `Execute union(${i}, ${j}) using union by rank heuristic.`
  };

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 1,
    description: `Prepare to union set containing ${i} with set containing ${j}.`,
    actionType: 'traverse',
    variables: { i, j, numSets: current.numSets },
    state: cloneUfds(current)
  });

  // Find root of i
  let rootI = i;
  while (current.elements[rootI].parent !== rootI) rootI = current.elements[rootI].parent;

  // Find root of j
  let rootJ = j;
  while (current.elements[rootJ].parent !== rootJ) rootJ = current.elements[rootJ].parent;

  current = cloneUfds(current);
  current.elements[rootI].state = 'inspect';
  current.elements[rootJ].state = 'pivot';

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 2,
    description: `Evaluated roots: root(${i}) = ${rootI} (rank ${current.elements[rootI].rank}), root(${j}) = ${rootJ} (rank ${current.elements[rootJ].rank}).`,
    actionType: 'compare',
    variables: { rootI, rootJ, rankI: current.elements[rootI].rank, rankJ: current.elements[rootJ].rank },
    state: cloneUfds(current)
  });

  if (rootI === rootJ) {
    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 3,
      description: `Both elements are already in the same disjoint set! No union needed.`,
      actionType: 'complete',
      variables: { alreadyInSameSet: true },
      state: cloneUfds(current)
    });
    steps.forEach(s => s.totalSteps = steps.length);
    return steps;
  }

  current = cloneUfds(current);
  const rankI = current.elements[rootI].rank;
  const rankJ = current.elements[rootJ].rank;

  if (rankI < rankJ) {
    current.elements[rootI].parent = rootJ;
    current.elements[rootI].state = 'swap';
    current.numSets--;
    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 4,
      description: `Rank of root ${rootI} (${rankI}) < Rank of root ${rootJ} (${rankJ}). Attached root ${rootI} under ${rootJ}.`,
      actionType: 'swap',
      variables: { attached: rootI, to: rootJ, numSets: current.numSets },
      state: cloneUfds(current)
    });
  } else if (rankI > rankJ) {
    current.elements[rootJ].parent = rootI;
    current.elements[rootJ].state = 'swap';
    current.numSets--;
    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 5,
      description: `Rank of root ${rootI} (${rankI}) > Rank of root ${rootJ} (${rankJ}). Attached root ${rootJ} under ${rootI}.`,
      actionType: 'swap',
      variables: { attached: rootJ, to: rootI, numSets: current.numSets },
      state: cloneUfds(current)
    });
  } else {
    current.elements[rootJ].parent = rootI;
    current.elements[rootI].rank++;
    current.elements[rootJ].state = 'swap';
    current.elements[rootI].state = 'sorted';
    current.numSets--;
    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 6,
      description: `Ranks were equal (${rankI}). Attached root ${rootJ} under ${rootI} and incremented rank of ${rootI} to ${current.elements[rootI].rank}.`,
      actionType: 'swap',
      variables: { attached: rootJ, to: rootI, newRank: current.elements[rootI].rank, numSets: current.numSets },
      state: cloneUfds(current)
    });
  }

  current = cloneUfds(current);
  current.elements.forEach(e => e.state = 'sorted');

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 7,
    description: `Union completed! Sets unified into single component. Total disjoint sets remaining: ${current.numSets}.`,
    actionType: 'complete',
    variables: { remainingSets: current.numSets, status: 'UNIONED' },
    state: cloneUfds(current)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}
