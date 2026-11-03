import { HashTableVisualState, HashBucket } from '../types/visualizer';
import { VisualStep, PseudocodeLine } from '../types/algorithm';

export const HASHING_PSEUDOCODE: Record<string, PseudocodeLine[]> = {
  'Linear Probing': [
    { num: 1, code: 'function insertLinearProbing(table, key, M):', indent: 0 },
    { num: 2, code: '  idx = key % M  // primary hash slot', indent: 1 },
    { num: 3, code: '  while table[idx] is occupied and table[idx].key != key:', indent: 1 },
    { num: 4, code: '    idx = (idx + 1) % M  // probe forward', indent: 2 },
    { num: 5, code: '  table[idx] = key  // store in first empty slot', indent: 1 },
    { num: 6, code: '  return idx', indent: 1 }
  ],
  'Chaining': [
    { num: 1, code: 'function insertChaining(table, key, M):', indent: 0 },
    { num: 2, code: '  idx = key % M  // bucket index', indent: 1 },
    { num: 3, code: '  newNode = new Node(key)', indent: 1 },
    { num: 4, code: '  newNode.next = table[idx].head', indent: 1 },
    { num: 5, code: '  table[idx].head = newNode  // insert at chain head', indent: 1 },
    { num: 6, code: '  return idx', indent: 1 }
  ]
};

function cloneHashTable(state: HashTableVisualState): HashTableVisualState {
  return {
    buckets: state.buckets.map(b => ({
      index: b.index,
      state: b.state,
      items: b.items.map(item => ({ ...item }))
    })),
    tableSize: state.tableSize,
    probingIndex: state.probingIndex,
    lastComputedHash: state.lastComputedHash,
    currentKey: state.currentKey,
    mode: state.mode,
    statusMessage: state.statusMessage
  };
}

export function generateLinearProbingSteps(
  keysToInsert: number[] = [15, 22, 29, 8],
  tableSize: number = 7
): VisualStep<HashTableVisualState>[] {
  const steps: VisualStep<HashTableVisualState>[] = [];
  const buckets: HashBucket[] = Array.from({ length: tableSize }, (_, i) => ({
    index: i,
    items: [],
    state: 'default'
  }));

  let current: HashTableVisualState = {
    buckets,
    tableSize,
    mode: 'probing',
    statusMessage: `Initialized empty hash table of capacity M = ${tableSize}. Hash formula: h(k) = k % ${tableSize}.`
  };

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 1,
    description: current.statusMessage!,
    actionType: 'traverse',
    variables: { M: tableSize, keysToInsert: [...keysToInsert] },
    state: cloneHashTable(current)
  });

  for (const key of keysToInsert) {
    const primaryHash = key % tableSize;
    let idx = primaryHash;
    let probes = 0;

    current = cloneHashTable(current);
    current.currentKey = key;
    current.lastComputedHash = primaryHash;
    current.probingIndex = idx;
    current.buckets.forEach(b => b.state = 'default');
    current.buckets[idx].state = 'inspect';

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 2,
      description: `Inserting key ${key}: calculated primary slot h(${key}) = ${key} % ${tableSize} = ${primaryHash}.`,
      actionType: 'inspect',
      variables: { key, 'h(key)': primaryHash, currentSlot: idx },
      state: cloneHashTable(current)
    });

    while (current.buckets[idx].items.length > 0 && probes < tableSize) {
      const occupiedVal = current.buckets[idx].items[0].key;
      current = cloneHashTable(current);
      current.buckets[idx].state = 'pivot'; // collision!

      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 3,
        description: `Collision at bucket [${idx}]! Slot already occupied by key ${occupiedVal}. Probing next index ((idx + 1) % ${tableSize}).`,
        actionType: 'compare',
        variables: { collisionAt: idx, occupiedKey: occupiedVal, probeNumber: probes + 1 },
        state: cloneHashTable(current)
      });

      idx = (idx + 1) % tableSize;
      probes++;
      current.probingIndex = idx;
      current.buckets.forEach((b, i) => {
        if (i !== idx) b.state = 'default';
      });
      current.buckets[idx].state = 'inspect';

      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 4,
        description: `Probed to bucket [${idx}]. Checking availability.`,
        actionType: 'traverse',
        variables: { probedSlot: idx, key },
        state: cloneHashTable(current)
      });
    }

    if (probes < tableSize) {
      current = cloneHashTable(current);
      current.buckets[idx].items = [{ key, state: 'sorted' }];
      current.buckets[idx].state = 'sorted';

      steps.push({
        stepIndex: steps.length,
        totalSteps: 0,
        line: 5,
        description: `Placed key ${key} into free bucket [${idx}] after ${probes} collision resolution probe(s).`,
        actionType: 'insert',
        variables: { key, insertedSlot: idx, totalProbes: probes },
        state: cloneHashTable(current)
      });
    }
  }

  current = cloneHashTable(current);
  current.probingIndex = undefined;
  current.buckets.forEach(b => {
    if (b.items.length > 0) b.state = 'sorted';
  });

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 6,
    description: 'All keys inserted via Linear Probing! Hash table invariant maintained.',
    actionType: 'complete',
    variables: { status: 'COMPLETE', loadFactor: `${(keysToInsert.length / tableSize).toFixed(2)}` },
    state: cloneHashTable(current)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

export function generateChainingSteps(
  keysToInsert: number[] = [14, 21, 28, 9, 16],
  tableSize: number = 7
): VisualStep<HashTableVisualState>[] {
  const steps: VisualStep<HashTableVisualState>[] = [];
  const buckets: HashBucket[] = Array.from({ length: tableSize }, (_, i) => ({
    index: i,
    items: [],
    state: 'default'
  }));

  let current: HashTableVisualState = {
    buckets,
    tableSize,
    mode: 'chaining',
    statusMessage: `Initialized empty Separate Chaining hash table (M = ${tableSize}). Each slot points to an independent linked list chain.`
  };

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 1,
    description: current.statusMessage!,
    actionType: 'traverse',
    variables: { M: tableSize, keysToInsert: [...keysToInsert] },
    state: cloneHashTable(current)
  });

  for (const key of keysToInsert) {
    const bucketIdx = key % tableSize;

    current = cloneHashTable(current);
    current.currentKey = key;
    current.lastComputedHash = bucketIdx;
    current.probingIndex = bucketIdx;
    current.buckets.forEach(b => b.state = 'default');
    current.buckets[bucketIdx].state = 'inspect';

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 2,
      description: `Evaluating h(${key}) = ${key} % ${tableSize} = ${bucketIdx}. Bucket [${bucketIdx}] selected.`,
      actionType: 'inspect',
      variables: { key, bucket: bucketIdx },
      state: cloneHashTable(current)
    });

    const isCollision = current.buckets[bucketIdx].items.length > 0;
    current = cloneHashTable(current);
    current.buckets[bucketIdx].items.unshift({ key, state: 'sorted' });
    current.buckets[bucketIdx].state = isCollision ? 'pivot' : 'sorted';

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 5,
      description: isCollision
        ? `Collision resolved via Separate Chaining! Prepended key ${key} to head of linked list at bucket [${bucketIdx}]. Chain length is now ${current.buckets[bucketIdx].items.length}.`
        : `Inserted key ${key} as head node of empty bucket [${bucketIdx}].`,
      actionType: 'insert',
      variables: { key, bucket: bucketIdx, chainLength: current.buckets[bucketIdx].items.length },
      state: cloneHashTable(current)
    });
  }

  current = cloneHashTable(current);
  current.probingIndex = undefined;
  current.buckets.forEach(b => {
    if (b.items.length > 0) b.state = 'sorted';
  });

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 6,
    description: 'Separate Chaining insertion completed. Lookups run in O(1 + \u03b1) expected time.',
    actionType: 'complete',
    variables: { status: 'COMPLETE', loadFactor: `${(keysToInsert.length / tableSize).toFixed(2)}` },
    state: cloneHashTable(current)
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}
