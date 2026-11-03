import { HeapVisualState, TreeVisualState, TreeNodeData, ArrayBar } from '../types/visualizer';
import { VisualStep, PseudocodeLine } from '../types/algorithm';

export const HEAP_PSEUDOCODE: Record<string, PseudocodeLine[]> = {
  'Max Heapify': [
    { num: 1, code: 'function maxHeapify(A, i, heapSize):', indent: 0 },
    { num: 2, code: '  left = 2*i + 1, right = 2*i + 2, largest = i', indent: 1 },
    { num: 3, code: '  if left < heapSize and A[left] > A[largest]: largest = left', indent: 1 },
    { num: 4, code: '  if right < heapSize and A[right] > A[largest]: largest = right', indent: 1 },
    { num: 5, code: '  if largest != i:', indent: 1 },
    { num: 6, code: '    swap(A[i], A[largest])', indent: 2 },
    { num: 7, code: '    maxHeapify(A, largest, heapSize)', indent: 2 }
  ],
  'Extract Max': [
    { num: 1, code: 'function extractMax(A, heapSize):', indent: 0 },
    { num: 2, code: '  if heapSize < 1: throw Underflow', indent: 1 },
    { num: 3, code: '  maxVal = A[0]', indent: 1 },
    { num: 4, code: '  A[0] = A[heapSize - 1]; heapSize--', indent: 1 },
    { num: 5, code: '  maxHeapify(A, 0, heapSize)', indent: 1 },
    { num: 6, code: '  return maxVal', indent: 1 }
  ],
  'Insert': [
    { num: 1, code: 'function insert(A, val):', indent: 0 },
    { num: 2, code: '  heapSize = heapSize + 1', indent: 1 },
    { num: 3, code: '  i = heapSize - 1; A[i] = val', indent: 1 },
    { num: 4, code: '  while i > 0 and A[parent(i)] < A[i]:', indent: 1 },
    { num: 5, code: '    swap(A[i], A[parent(i)])', indent: 2 },
    { num: 6, code: '    i = parent(i)', indent: 2 }
  ]
};

function arrayToTree(array: ArrayBar[], heapSize: number): TreeVisualState {
  const nodes: Record<string, TreeNodeData> = {};
  for (let i = 0; i < heapSize; i++) {
    const leftIdx = 2 * i + 1;
    const rightIdx = 2 * i + 2;
    nodes[String(i)] = {
      id: String(i),
      value: array[i].value,
      leftId: leftIdx < heapSize ? String(leftIdx) : undefined,
      rightId: rightIdx < heapSize ? String(rightIdx) : undefined,
      height: 0,
      state: array[i].state
    };
  }
  return {
    nodes,
    rootId: heapSize > 0 ? '0' : undefined
  };
}

function cloneHeapState(state: HeapVisualState): HeapVisualState {
  return {
    array: state.array.map(b => ({ ...b })),
    tree: {
      nodes: Object.fromEntries(
        Object.entries(state.tree.nodes).map(([k, v]) => [k, { ...v }])
      ),
      rootId: state.tree.rootId
    },
    heapSize: state.heapSize,
    activeIndices: state.activeIndices ? [...state.activeIndices] : undefined,
    highlightAction: state.highlightAction
  };
}

export function generateMaxHeapifySteps(initialValues: number[] = [20, 85, 70, 45, 60, 30, 65]): VisualStep<HeapVisualState>[] {
  const steps: VisualStep<HeapVisualState>[] = [];
  const bars: ArrayBar[] = initialValues.map((v, i) => ({ id: i, value: v, state: 'default' }));
  const heapSize = bars.length;

  let current: HeapVisualState = {
    array: bars,
    tree: arrayToTree(bars, heapSize),
    heapSize,
    activeIndices: [0],
    highlightAction: 'inspect'
  };

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 1,
    description: `Begin Max Heapify at root index 0 (val = ${bars[0].value}). Check heap-order against children.`,
    actionType: 'inspect',
    variables: { i: 0, 'A[i]': bars[0].value, heapSize },
    state: cloneHeapState(current)
  });

  let i = 0;
  while (i < heapSize) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;

    current = cloneHeapState(current);
    current.array.forEach(b => b.state = 'default');
    current.array[i].state = 'inspect';
    if (left < heapSize) current.array[left].state = 'pivot';
    if (right < heapSize) current.array[right].state = 'pivot';
    current.tree = arrayToTree(current.array, heapSize);
    current.activeIndices = [i, ...(left < heapSize ? [left] : []), ...(right < heapSize ? [right] : [])];

    if (left < heapSize && current.array[left].value > current.array[largest].value) {
      largest = left;
    }
    if (right < heapSize && current.array[right].value > current.array[largest].value) {
      largest = right;
    }

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 3,
      description: `Comparing node ${i} (${current.array[i].value}) with left child (${left < heapSize ? current.array[left].value : 'none'}) and right child (${right < heapSize ? current.array[right].value : 'none'}). Largest is index ${largest} (${current.array[largest].value}).`,
      actionType: 'compare',
      variables: { i, left: left < heapSize ? left : null, right: right < heapSize ? right : null, largest },
      state: cloneHeapState(current)
    });

    if (largest !== i) {
      current = cloneHeapState(current);
      current.array[i].state = 'swap';
      current.array[largest].state = 'swap';
      current.tree = arrayToTree(current.array, heapSize);

      const temp = current.array[i].value;
      current.array[i].value = current.array[largest].value;
      current.array[largest].value = temp;

      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 6,
        description: `Max heap violation! Swapped A[${i}] (${temp}) with A[${largest}] (${current.array[i].value}).`,
        actionType: 'swap',
        variables: { swappedWith: largest, newParentVal: current.array[i].value },
        state: cloneHeapState(current)
      });

      i = largest;
    } else {
      current = cloneHeapState(current);
      current.array[i].state = 'sorted';
      current.tree = arrayToTree(current.array, heapSize);
      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 5,
        description: `Heap property satisfied at index ${i}. Subtree is a valid Max Heap!`,
        actionType: 'complete',
        variables: { status: 'HEAP_VALID' },
        state: cloneHeapState(current)
      });
      break;
    }
  }

  current = cloneHeapState(current);
  current.array.forEach(b => b.state = 'sorted');
  current.tree = arrayToTree(current.array, heapSize);
  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 7,
    description: 'Max Heapify completed. Every parent node is greater than or equal to its children.',
    actionType: 'complete',
    variables: { status: 'DONE' },
    state: cloneHeapState(current)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

export function generateExtractMaxSteps(initialValues: number[] = [95, 80, 75, 40, 60, 35, 50]): VisualStep<HeapVisualState>[] {
  const steps: VisualStep<HeapVisualState>[] = [];
  const bars: ArrayBar[] = initialValues.map((v, i) => ({ id: i, value: v, state: 'default' }));
  let heapSize = bars.length;

  let current: HeapVisualState = {
    array: bars,
    tree: arrayToTree(bars, heapSize),
    heapSize,
    activeIndices: [0]
  };

  const maxVal = bars[0].value;
  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 3,
    description: `Target maximum value is at root index 0: maxVal = ${maxVal}.`,
    actionType: 'pivot',
    variables: { maxVal, heapSize },
    state: cloneHeapState(current)
  });

  // Swap root with last element
  current = cloneHeapState(current);
  current.array[0].state = 'swap';
  current.array[heapSize - 1].state = 'swap';
  current.tree = arrayToTree(current.array, heapSize);

  const lastVal = current.array[heapSize - 1].value;
  current.array[0].value = lastVal;
  current.array[heapSize - 1].value = maxVal;
  heapSize--;
  current.heapSize = heapSize;
  current.tree = arrayToTree(current.array, heapSize);

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 4,
    description: `Moved last element (${lastVal}) to root and removed max (${maxVal}) from active heap. Decrement heapSize to ${heapSize}.`,
    actionType: 'swap',
    variables: { newRoot: lastVal, extracted: maxVal, heapSize },
    state: cloneHeapState(current)
  });

  // Sift down root
  let i = 0;
  while (i < heapSize) {
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    let largest = i;

    current = cloneHeapState(current);
    current.array.slice(0, heapSize).forEach(b => b.state = 'default');
    current.array[i].state = 'inspect';
    if (left < heapSize) current.array[left].state = 'pivot';
    if (right < heapSize) current.array[right].state = 'pivot';
    current.tree = arrayToTree(current.array, heapSize);

    if (left < heapSize && current.array[left].value > current.array[largest].value) largest = left;
    if (right < heapSize && current.array[right].value > current.array[largest].value) largest = right;

    if (largest !== i) {
      const temp = current.array[i].value;
      current.array[i].value = current.array[largest].value;
      current.array[largest].value = temp;
      current.array[i].state = 'swap';
      current.array[largest].state = 'swap';
      current.tree = arrayToTree(current.array, heapSize);

      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 5,
        description: `Sifting down: swapped ${temp} with larger child ${current.array[i].value} at index ${largest}.`,
        actionType: 'swap',
        variables: { siftIndex: largest, heapSize },
        state: cloneHeapState(current)
      });
      i = largest;
    } else {
      break;
    }
  }

  current = cloneHeapState(current);
  current.array.slice(0, heapSize).forEach(b => b.state = 'sorted');
  current.tree = arrayToTree(current.array, heapSize);

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 6,
    description: `Extract Max completed in O(log N) time! Extracted value: ${maxVal}. Max heap invariant restored.`,
    actionType: 'complete',
    variables: { extractedValue: maxVal, remainingElements: heapSize },
    state: cloneHeapState(current)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

export function generateHeapInsertSteps(initialValues: number[] = [90, 75, 60, 40, 55], newVal: number = 88): VisualStep<HeapVisualState>[] {
  const steps: VisualStep<HeapVisualState>[] = [];
  const bars: ArrayBar[] = initialValues.map((v, i) => ({ id: i, value: v, state: 'default' }));
  const heapSize = bars.length + 1;
  bars.push({ id: bars.length, value: newVal, state: 'active' });

  let current: HeapVisualState = {
    array: bars,
    tree: arrayToTree(bars, heapSize),
    heapSize,
    activeIndices: [heapSize - 1]
  };

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 3,
    description: `Appended new value ${newVal} at index ${heapSize - 1} (leaf position). Prepare to sift up.`,
    actionType: 'insert',
    variables: { val: newVal, newIndex: heapSize - 1, heapSize },
    state: cloneHeapState(current)
  });

  let i = heapSize - 1;
  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    current = cloneHeapState(current);
    current.array.forEach(b => b.state = 'default');
    current.array[i].state = 'inspect';
    current.array[parent].state = 'pivot';
    current.tree = arrayToTree(current.array, heapSize);

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 4,
      description: `Comparing child node ${i} (${current.array[i].value}) with parent node ${parent} (${current.array[parent].value}).`,
      actionType: 'compare',
      variables: { childIndex: i, parentIndex: parent, childVal: current.array[i].value, parentVal: current.array[parent].value },
      state: cloneHeapState(current)
    });

    if (current.array[parent].value < current.array[i].value) {
      current = cloneHeapState(current);
      const temp = current.array[i].value;
      current.array[i].value = current.array[parent].value;
      current.array[parent].value = temp;
      current.array[i].state = 'swap';
      current.array[parent].state = 'swap';
      current.tree = arrayToTree(current.array, heapSize);

      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 5,
        description: `Child (${temp}) > Parent (${current.array[i].value}). Swapped node ${i} with parent ${parent}!`,
        actionType: 'swap',
        variables: { newPosition: parent, swapped: true },
        state: cloneHeapState(current)
      });
      i = parent;
    } else {
      break;
    }
  }

  current = cloneHeapState(current);
  current.array.forEach(b => b.state = 'sorted');
  current.tree = arrayToTree(current.array, heapSize);

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 6,
    description: `Insert completed! Node settled at index ${i}. Max heap property preserved in O(log N).`,
    actionType: 'complete',
    variables: { finalIndex: i, insertedValue: newVal },
    state: cloneHeapState(current)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}
