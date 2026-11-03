import { LinearVisualState, LinearElement } from '../types/visualizer';
import { VisualStep, PseudocodeLine } from '../types/algorithm';

export const LINEAR_PSEUDOCODE: Record<string, PseudocodeLine[]> = {
  'Singly Linked List': [
    { num: 1, code: 'function insertHead(val):', indent: 0 },
    { num: 2, code: '  newNode = new Node(val)', indent: 1 },
    { num: 3, code: '  newNode.next = head', indent: 1 },
    { num: 4, code: '  head = newNode', indent: 1 },
    { num: 5, code: 'function deleteHead():', indent: 0 },
    { num: 6, code: '  if head == null: return', indent: 1 },
    { num: 7, code: '  temp = head; head = head.next', indent: 1 }
  ],
  'Stack (LIFO)': [
    { num: 1, code: 'function push(val):', indent: 0 },
    { num: 2, code: '  stack[++top] = val', indent: 1 },
    { num: 3, code: 'function pop():', indent: 0 },
    { num: 4, code: '  if top < 0: throw Underflow', indent: 1 },
    { num: 5, code: '  return stack[top--]', indent: 1 }
  ],
  'Queue (FIFO)': [
    { num: 1, code: 'function enqueue(val):', indent: 0 },
    { num: 2, code: '  queue[rear++] = val', indent: 1 },
    { num: 3, code: 'function dequeue():', indent: 0 },
    { num: 4, code: '  if front == rear: throw Underflow', indent: 1 },
    { num: 5, code: '  return queue[front++]', indent: 1 }
  ]
};

export function getInitialLinkedList(): LinearVisualState {
  const items: LinearElement[] = [
    { id: '1', value: 12, state: 'default', nextId: '2' },
    { id: '2', value: 99, state: 'default', nextId: '3' },
    { id: '3', value: 37, state: 'default', nextId: '4' },
    { id: '4', value: 45, state: 'default' }
  ];
  return { items, headId: '1', tailId: '4' };
}

export function generateLinkedListInsertHeadSteps(initialState: LinearVisualState, newVal: number): VisualStep<LinearVisualState>[] {
  const steps: VisualStep<LinearVisualState>[] = [];
  const currentItems = initialState.items.map(i => ({ ...i }));
  const newId = String(Date.now() % 10000);

  const newNode: LinearElement = {
    id: newId,
    value: newVal,
    state: 'active'
  };

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 2,
    description: `Allocated new memory node with value ${newVal}.`,
    actionType: 'insert',
    variables: { val: newVal, newNodeId: newId },
    state: { items: [newNode, ...currentItems], headId: initialState.headId }
  });

  newNode.nextId = initialState.headId;
  newNode.state = 'inspect';

  steps.push({
    stepIndex: 1,
    totalSteps: 0,
    line: 3,
    description: `Linked newNode.next pointer to old head (Node ${initialState.headId}).`,
    actionType: 'swap',
    variables: { 'newNode.next': initialState.headId || null },
    state: { items: [newNode, ...currentItems], headId: initialState.headId }
  });

  newNode.state = 'sorted';

  steps.push({
    stepIndex: 2,
    totalSteps: 0,
    line: 4,
    description: `Updated head pointer to point directly to new Node ${newVal}. Operation completed in O(1)!`,
    actionType: 'complete',
    variables: { head: newId },
    state: { items: [newNode, ...currentItems], headId: newId }
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

export function generateStackPushSteps(currentValues: number[], newVal: number): VisualStep<LinearVisualState>[] {
  const steps: VisualStep<LinearVisualState>[] = [];
  const items: LinearElement[] = currentValues.map((v, idx) => ({
    id: String(idx),
    value: v,
    state: 'default'
  }));

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 1,
    description: `Prepare to push value ${newVal} onto top of LIFO Stack.`,
    actionType: 'traverse',
    variables: { val: newVal, top: items.length - 1 },
    state: { items: [...items], topIndex: items.length - 1 }
  });

  const newElement: LinearElement = {
    id: String(items.length),
    value: newVal,
    state: 'swap'
  };
  const updatedItems = [...items, newElement];

  steps.push({
    stepIndex: 1,
    totalSteps: 0,
    line: 2,
    description: `Incremented top pointer to index ${updatedItems.length - 1} and stored value ${newVal}.`,
    actionType: 'insert',
    variables: { val: newVal, newTop: updatedItems.length - 1 },
    state: { items: updatedItems, topIndex: updatedItems.length - 1 }
  });

  newElement.state = 'sorted';
  steps.push({
    stepIndex: 2,
    totalSteps: 0,
    line: 2,
    description: `Push successful! New element is active at the top of the stack.`,
    actionType: 'complete',
    variables: { topValue: newVal },
    state: { items: updatedItems, topIndex: updatedItems.length - 1 }
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

export function generateQueueEnqueueSteps(currentValues: number[] = [10, 20, 30], newVal: number = 40): VisualStep<LinearVisualState>[] {
  const steps: VisualStep<LinearVisualState>[] = [];
  const items: LinearElement[] = currentValues.map((v, idx) => ({
    id: String(idx),
    value: v,
    state: 'default'
  }));

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 1,
    description: `Prepare to enqueue value ${newVal} at the REAR of the FIFO Queue.`,
    actionType: 'traverse',
    variables: { val: newVal, front: 0, rear: items.length },
    state: { items: [...items], frontIndex: 0, rearIndex: items.length }
  });

  const newElement: LinearElement = {
    id: String(items.length),
    value: newVal,
    state: 'swap'
  };
  const updatedItems = [...items, newElement];

  steps.push({
    stepIndex: 1,
    totalSteps: 0,
    line: 2,
    description: `Appended element ${newVal} at position rear = ${items.length}. Incremented rear to ${updatedItems.length}.`,
    actionType: 'insert',
    variables: { val: newVal, newRear: updatedItems.length, front: 0 },
    state: { items: updatedItems, frontIndex: 0, rearIndex: updatedItems.length }
  });

  newElement.state = 'sorted';
  steps.push({
    stepIndex: 2,
    totalSteps: 0,
    line: 2,
    description: `Enqueue completed in O(1) time! First-In First-Out order strictly maintained.`,
    actionType: 'complete',
    variables: { queueLength: updatedItems.length },
    state: { items: updatedItems, frontIndex: 0, rearIndex: updatedItems.length }
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

