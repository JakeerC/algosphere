import { ArrayBar } from '../types/visualizer';
import { VisualStep, PseudocodeLine } from '../types/algorithm';

export type SortingVariant = 'Bubble Sort' | 'Selection Sort' | 'Insertion Sort' | 'Merge Sort' | 'Quick Sort';

export const SORTING_PSEUDOCODE: Record<SortingVariant, PseudocodeLine[]> = {
  'Bubble Sort': [
    { num: 1, code: 'function bubbleSort(A):', indent: 0 },
    { num: 2, code: '  n = length(A)', indent: 1 },
    { num: 3, code: '  for i from 0 to n-1:', indent: 1 },
    { num: 4, code: '    for j from 0 to n-i-2:', indent: 2 },
    { num: 5, code: '      if A[j] > A[j+1]:', indent: 3 },
    { num: 6, code: '        swap(A[j], A[j+1])', indent: 4 },
    { num: 7, code: '    mark A[n-i-1] as sorted', indent: 2 },
    { num: 8, code: '  return A', indent: 1 }
  ],
  'Selection Sort': [
    { num: 1, code: 'function selectionSort(A):', indent: 0 },
    { num: 2, code: '  n = length(A)', indent: 1 },
    { num: 3, code: '  for i from 0 to n-2:', indent: 1 },
    { num: 4, code: '    min_idx = i', indent: 2 },
    { num: 5, code: '    for j from i+1 to n-1:', indent: 2 },
    { num: 6, code: '      if A[j] < A[min_idx]: min_idx = j', indent: 3 },
    { num: 7, code: '    if min_idx != i: swap(A[i], A[min_idx])', indent: 2 },
    { num: 8, code: '    mark A[i] as sorted', indent: 2 }
  ],
  'Insertion Sort': [
    { num: 1, code: 'function insertionSort(A):', indent: 0 },
    { num: 2, code: '  for i from 1 to n-1:', indent: 1 },
    { num: 3, code: '    key = A[i], j = i - 1', indent: 2 },
    { num: 4, code: '    while j >= 0 and A[j] > key:', indent: 2 },
    { num: 5, code: '      A[j + 1] = A[j] // shift right', indent: 3 },
    { num: 6, code: '      j = j - 1', indent: 3 },
    { num: 7, code: '    A[j + 1] = key', indent: 2 },
    { num: 8, code: '  mark all as sorted', indent: 1 }
  ],
  'Merge Sort': [
    { num: 1, code: 'function mergeSort(A, left, right):', indent: 0 },
    { num: 2, code: '  if left >= right: return', indent: 1 },
    { num: 3, code: '  mid = floor((left + right) / 2)', indent: 1 },
    { num: 4, code: '  mergeSort(A, left, mid)', indent: 1 },
    { num: 5, code: '  mergeSort(A, mid + 1, right)', indent: 1 },
    { num: 6, code: '  merge(A, left, mid, right)', indent: 1 },
    { num: 7, code: '  // combine sorted halves into A[left...right]', indent: 2 }
  ],
  'Quick Sort': [
    { num: 1, code: 'function quickSort(A, low, high):', indent: 0 },
    { num: 2, code: '  if low < high:', indent: 1 },
    { num: 3, code: '    p = partition(A, low, high)', indent: 2 },
    { num: 4, code: '    quickSort(A, low, p - 1)', indent: 2 },
    { num: 5, code: '    quickSort(A, p + 1, high)', indent: 2 },
    { num: 6, code: 'function partition(A, low, high):', indent: 0 },
    { num: 7, code: '  pivot = A[high], i = low - 1', indent: 1 },
    { num: 8, code: '  for j = low to high - 1:', indent: 1 },
    { num: 9, code: '    if A[j] < pivot: i++, swap(A[i], A[j])', indent: 2 },
    { num: 10, code: '  swap(A[i + 1], A[high]); return i + 1', indent: 1 }
  ]
};

function cloneBars(bars: ArrayBar[]): ArrayBar[] {
  return bars.map(b => ({ ...b }));
}

// 1. Bubble Sort Generator
export function generateBubbleSortSteps(initialValues: number[]): VisualStep<ArrayBar[]>[] {
  let bars: ArrayBar[] = initialValues.map((v, idx) => ({ id: idx, value: v, state: 'default' }));
  const steps: VisualStep<ArrayBar[]>[] = [];
  const n = bars.length;

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 1,
    description: `Initialize Bubble Sort with ${n} elements.`,
    actionType: 'traverse',
    variables: { n, i: 0, j: 0 },
    state: cloneBars(bars)
  });

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparison step
      bars = cloneBars(bars);
      bars[j].state = 'inspect';
      bars[j + 1].state = 'inspect';

      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 5,
        description: `Comparing index ${j} (${bars[j].value}) and index ${j + 1} (${bars[j + 1].value}).`,
        actionType: 'compare',
        variables: { i, j, 'A[j]': bars[j].value, 'A[j+1]': bars[j + 1].value },
        state: cloneBars(bars)
      });

      if (bars[j].value > bars[j + 1].value) {
        // Swap
        bars = cloneBars(bars);
        bars[j].state = 'swap';
        bars[j + 1].state = 'swap';

        const temp = bars[j];
        bars[j] = bars[j + 1];
        bars[j + 1] = temp;

        steps.push({
          stepIndex: steps.length,
          totalSteps: 0,
          line: 6,
          description: `Since ${bars[j + 1].value} > ${bars[j].value}, swapping elements at index ${j} and ${j + 1}.`,
          actionType: 'swap',
          variables: { i, j, swapped: true },
          state: cloneBars(bars)
        });
      }

      // Reset active states
      bars[j].state = 'default';
      bars[j + 1].state = 'default';
    }

    // Mark finalized element at end
    bars[n - i - 1].state = 'sorted';
    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 7,
      description: `Element at index ${n - i - 1} (${bars[n - i - 1].value}) is locked into its permanent sorted position.`,
      actionType: 'complete',
      variables: { i, sortedIndex: n - i - 1 },
      state: cloneBars(bars)
    });
  }

  // Mark all as sorted
  bars.forEach(b => b.state = 'sorted');
  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 8,
    description: 'Bubble Sort completed! All elements are in non-decreasing order.',
    actionType: 'complete',
    variables: { status: 'SORTED' },
    state: cloneBars(bars)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

// 2. Selection Sort Generator
export function generateSelectionSortSteps(initialValues: number[]): VisualStep<ArrayBar[]>[] {
  let bars: ArrayBar[] = initialValues.map((v, idx) => ({ id: idx, value: v, state: 'default' }));
  const steps: VisualStep<ArrayBar[]>[] = [];
  const n = bars.length;

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 1,
    description: `Starting Selection Sort on array of size ${n}.`,
    actionType: 'traverse',
    variables: { n, i: 0 },
    state: cloneBars(bars)
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    bars = cloneBars(bars);
    bars[i].state = 'pivot';

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 4,
      description: `Assume current minimum is at index ${i} (value ${bars[i].value}).`,
      actionType: 'pivot',
      variables: { i, min_idx: minIdx, min_val: bars[minIdx].value },
      state: cloneBars(bars)
    });

    for (let j = i + 1; j < n; j++) {
      bars = cloneBars(bars);
      bars[j].state = 'inspect';

      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 6,
        description: `Inspecting index ${j} (${bars[j].value}) against current minimum (${bars[minIdx].value}).`,
        actionType: 'compare',
        variables: { i, j, min_idx: minIdx, 'A[j]': bars[j].value },
        state: cloneBars(bars)
      });

      if (bars[j].value < bars[minIdx].value) {
        if (minIdx !== i) bars[minIdx].state = 'default';
        minIdx = j;
        bars[minIdx].state = 'pivot';

        steps.push({
          stepIndex: steps.length,
          totalSteps: 0,
          line: 6,
          description: `Found a smaller value! New minimum is index ${minIdx} (${bars[minIdx].value}).`,
          actionType: 'pivot',
          variables: { i, j, new_min_idx: minIdx, new_min_val: bars[minIdx].value },
          state: cloneBars(bars)
        });
      } else {
        bars[j].state = 'default';
      }
    }

    if (minIdx !== i) {
      bars = cloneBars(bars);
      bars[i].state = 'swap';
      bars[minIdx].state = 'swap';

      const temp = bars[i];
      bars[i] = bars[minIdx];
      bars[minIdx] = temp;

      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 7,
        description: `Swapping minimum element (${bars[i].value}) into index ${i}.`,
        actionType: 'swap',
        variables: { i, min_idx: minIdx, swapped: true },
        state: cloneBars(bars)
      });
    }

    bars[i].state = 'sorted';
    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 8,
      description: `Subarray A[0...${i}] is now sorted.`,
      actionType: 'complete',
      variables: { i, sortedBoundary: i },
      state: cloneBars(bars)
    });
  }

  bars.forEach(b => b.state = 'sorted');
  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 8,
    description: 'Selection Sort completed! Array sorted in place.',
    actionType: 'complete',
    variables: { status: 'SORTED' },
    state: cloneBars(bars)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

// 3. Insertion Sort Generator
export function generateInsertionSortSteps(initialValues: number[]): VisualStep<ArrayBar[]>[] {
  let bars: ArrayBar[] = initialValues.map((v, idx) => ({ id: idx, value: v, state: 'default' }));
  const steps: VisualStep<ArrayBar[]>[] = [];
  const n = bars.length;

  bars[0].state = 'sorted';
  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 1,
    description: `Single element at index 0 (${bars[0].value}) is trivially sorted.`,
    actionType: 'complete',
    variables: { sortedLength: 1 },
    state: cloneBars(bars)
  });

  for (let i = 1; i < n; i++) {
    const key = bars[i].value;
    let j = i - 1;

    bars = cloneBars(bars);
    bars[i].state = 'pivot';

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 3,
      description: `Picking key = ${key} at index ${i} to insert into sorted prefix A[0...${i - 1}].`,
      actionType: 'pivot',
      variables: { i, key, j },
      state: cloneBars(bars)
    });

    while (j >= 0 && bars[j].value > key) {
      bars = cloneBars(bars);
      bars[j].state = 'inspect';

      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 4,
        description: `Since A[${j}] (${bars[j].value}) > key (${key}), shifting A[${j}] right to index ${j + 1}.`,
        actionType: 'compare',
        variables: { i, j, 'A[j]': bars[j].value, key },
        state: cloneBars(bars)
      });

      bars = cloneBars(bars);
      bars[j + 1].value = bars[j].value;
      bars[j + 1].state = 'swap';

      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 5,
        description: `Shifted element ${bars[j].value} rightward.`,
        actionType: 'overwrite',
        variables: { i, j, shiftedValue: bars[j].value },
        state: cloneBars(bars)
      });

      bars[j + 1].state = 'sorted';
      j--;
    }

    bars = cloneBars(bars);
    bars[j + 1].value = key;
    bars[j + 1].state = 'sorted';

    for (let k = 0; k <= i; k++) {
      bars[k].state = 'sorted';
    }

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 7,
      description: `Inserted key (${key}) into correct position at index ${j + 1}.`,
      actionType: 'insert',
      variables: { i, insertedAt: j + 1, key },
      state: cloneBars(bars)
    });
  }

  bars.forEach(b => b.state = 'sorted');
  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 8,
    description: 'Insertion Sort completed!',
    actionType: 'complete',
    variables: { status: 'SORTED' },
    state: cloneBars(bars)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

// 4. Quick Sort Generator
export function generateQuickSortSteps(initialValues: number[]): VisualStep<ArrayBar[]>[] {
  let bars: ArrayBar[] = initialValues.map((v, idx) => ({ id: idx, value: v, state: 'default' }));
  const steps: VisualStep<ArrayBar[]>[] = [];

  function quickSortHelper(low: number, high: number) {
    if (low >= high) {
      if (low === high && low >= 0 && low < bars.length) {
        bars[low].state = 'sorted';
      }
      return;
    }

    const pivotVal = bars[high].value;
    bars = cloneBars(bars);
    bars[high].state = 'pivot';

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 7,
      description: `Partitioning subarray [${low}...${high}]. Selected pivot ${pivotVal} at index ${high}.`,
      actionType: 'pivot',
      variables: { low, high, pivot: pivotVal },
      state: cloneBars(bars)
    });

    let i = low - 1;

    for (let j = low; j < high; j++) {
      bars = cloneBars(bars);
      bars[j].state = 'inspect';

      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 9,
        description: `Comparing A[${j}] (${bars[j].value}) with pivot (${pivotVal}).`,
        actionType: 'compare',
        variables: { low, high, j, i, 'A[j]': bars[j].value, pivot: pivotVal },
        state: cloneBars(bars)
      });

      if (bars[j].value < pivotVal) {
        i++;
        bars = cloneBars(bars);
        bars[i].state = 'swap';
        bars[j].state = 'swap';

        const temp = bars[i];
        bars[i] = bars[j];
        bars[j] = temp;

        steps.push({
          stepIndex: steps.length,
          totalSteps: 0,
          line: 9,
          description: `A[${j}] < pivot. Increment i to ${i} and swap A[${i}] and A[${j}].`,
          actionType: 'swap',
          variables: { low, high, i, j, swapped: true },
          state: cloneBars(bars)
        });

        bars[i].state = 'default';
        bars[j].state = 'default';
      } else {
        bars[j].state = 'default';
      }
    }

    // Place pivot in correct spot
    const pIdx = i + 1;
    bars = cloneBars(bars);
    bars[pIdx].state = 'swap';
    bars[high].state = 'swap';

    const temp = bars[pIdx];
    bars[pIdx] = bars[high];
    bars[high] = temp;

    bars[pIdx].state = 'sorted'; // Pivot is permanently placed!

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 10,
      description: `Placed pivot ${pivotVal} at its final partition index ${pIdx}.`,
      actionType: 'complete',
      variables: { pivotIndex: pIdx, pivotValue: pivotVal },
      state: cloneBars(bars)
    });

    quickSortHelper(low, pIdx - 1);
    quickSortHelper(pIdx + 1, high);
  }

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 1,
    description: `Initiate Quick Sort on ${bars.length} elements.`,
    actionType: 'traverse',
    variables: { low: 0, high: bars.length - 1 },
    state: cloneBars(bars)
  });

  quickSortHelper(0, bars.length - 1);

  bars.forEach(b => b.state = 'sorted');
  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 5,
    description: 'Quick Sort partition recursion complete! Array is sorted.',
    actionType: 'complete',
    variables: { status: 'SORTED' },
    state: cloneBars(bars)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

// 5. Merge Sort Generator
export function generateMergeSortSteps(initialValues: number[]): VisualStep<ArrayBar[]>[] {
  let bars: ArrayBar[] = initialValues.map((v, idx) => ({ id: idx, value: v, state: 'default' }));
  const steps: VisualStep<ArrayBar[]>[] = [];

  function merge(low: number, mid: number, high: number) {
    const leftArr = bars.slice(low, mid + 1).map(b => b.value);
    const rightArr = bars.slice(mid + 1, high + 1).map(b => b.value);

    for (let k = low; k <= high; k++) {
      bars[k].state = 'inspect';
    }

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 6,
      description: `Merging sorted subarrays [${low}...${mid}] and [${mid + 1}...${high}].`,
      actionType: 'compare',
      variables: { low, mid, high, leftLength: leftArr.length, rightLength: rightArr.length },
      state: cloneBars(bars)
    });

    let i = 0, j = 0, k = low;

    while (i < leftArr.length && j < rightArr.length) {
      bars = cloneBars(bars);
      bars[k].state = 'swap';

      if (leftArr[i] <= rightArr[j]) {
        bars[k].value = leftArr[i];
        steps.push({
          stepIndex: steps.length,
          totalSteps: 0,
          line: 7,
          description: `Left element ${leftArr[i]} ≤ Right element ${rightArr[j]}: write ${leftArr[i]} to index ${k}.`,
          actionType: 'overwrite',
          variables: { k, value: leftArr[i], side: 'left' },
          state: cloneBars(bars)
        });
        i++;
      } else {
        bars[k].value = rightArr[j];
        steps.push({
          stepIndex: steps.length,
          totalSteps: 0,
          line: 7,
          description: `Right element ${rightArr[j]} < Left element ${leftArr[i]}: write ${rightArr[j]} to index ${k}.`,
          actionType: 'overwrite',
          variables: { k, value: rightArr[j], side: 'right' },
          state: cloneBars(bars)
        });
        j++;
      }
      k++;
    }

    while (i < leftArr.length) {
      bars = cloneBars(bars);
      bars[k].value = leftArr[i];
      bars[k].state = 'swap';
      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 7,
        description: `Flushing remaining left element ${leftArr[i]} to index ${k}.`,
        actionType: 'overwrite',
        variables: { k, value: leftArr[i] },
        state: cloneBars(bars)
      });
      i++;
      k++;
    }

    while (j < rightArr.length) {
      bars = cloneBars(bars);
      bars[k].value = rightArr[j];
      bars[k].state = 'swap';
      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 7,
        description: `Flushing remaining right element ${rightArr[j]} to index ${k}.`,
        actionType: 'overwrite',
        variables: { k, value: rightArr[j] },
        state: cloneBars(bars)
      });
      j++;
      k++;
    }

    for (let idx = low; idx <= high; idx++) {
      bars[idx].state = (low === 0 && high === bars.length - 1) ? 'sorted' : 'default';
    }
  }

  function mergeSortHelper(low: number, high: number) {
    if (low >= high) return;
    const mid = Math.floor((low + high) / 2);

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 3,
      description: `Divide subarray [${low}...${high}] at mid = ${mid}.`,
      actionType: 'traverse',
      variables: { low, mid, high },
      state: cloneBars(bars)
    });

    mergeSortHelper(low, mid);
    mergeSortHelper(mid + 1, high);
    merge(low, mid, high);
  }

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 1,
    description: `Initiate Merge Sort Divide & Conquer on ${bars.length} elements.`,
    actionType: 'traverse',
    variables: { size: bars.length },
    state: cloneBars(bars)
  });

  mergeSortHelper(0, bars.length - 1);

  bars.forEach(b => b.state = 'sorted');
  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 7,
    description: 'Merge Sort complete! All divisions merged in non-decreasing order.',
    actionType: 'complete',
    variables: { status: 'SORTED' },
    state: cloneBars(bars)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}
