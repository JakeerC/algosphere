import { DpVisualState, DpCell } from '../types/visualizer';
import { VisualStep, PseudocodeLine } from '../types/algorithm';

export const DP_PSEUDOCODE: Record<string, PseudocodeLine[]> = {
  '0/1 Knapsack': [
    { num: 1, code: 'function knapsack01(weights, values, W):', indent: 0 },
    { num: 2, code: '  create DP table of size (N+1) x (W+1) initialized to 0', indent: 1 },
    { num: 3, code: '  for i from 1 to N:', indent: 1 },
    { num: 4, code: '    for w from 1 to W:', indent: 2 },
    { num: 5, code: '      if weights[i-1] <= w:', indent: 3 },
    { num: 6, code: '        dp[i][w] = max(dp[i-1][w], values[i-1] + dp[i-1][w - weights[i-1]])', indent: 4 },
    { num: 7, code: '      else:', indent: 3 },
    { num: 8, code: '        dp[i][w] = dp[i-1][w]', indent: 4 },
    { num: 9, code: '  return dp[N][W]', indent: 1 }
  ],
  'Fibonacci Memoization': [
    { num: 1, code: 'function fibonacci(n):', indent: 0 },
    { num: 2, code: '  dp[0] = 0, dp[1] = 1', indent: 1 },
    { num: 3, code: '  for i from 2 to n:', indent: 1 },
    { num: 4, code: '    dp[i] = dp[i - 1] + dp[i - 2]  // Overlapping subproblems', indent: 2 },
    { num: 5, code: '  return dp[n]', indent: 1 }
  ]
};

export function generateKnapsackSteps(): VisualStep<DpVisualState>[] {
  const steps: VisualStep<DpVisualState>[] = [];
  const weights = [2, 1, 3];
  const values = [12, 10, 20];
  const W = 4;
  const N = weights.length;

  const rowLabels = ['0 (None)', '1 (w=2,v=12)', '2 (w=1,v=10)', '3 (w=3,v=20)'];
  const colLabels = ['w=0', 'w=1', 'w=2', 'w=3', 'w=4'];

  const table: DpCell[][] = [];
  for (let r = 0; r <= N; r++) {
    const row: DpCell[] = [];
    for (let c = 0; c <= W; c++) {
      row.push({
        row: r,
        col: c,
        value: 0,
        state: 'default'
      });
    }
    table.push(row);
  }

  function cloneTable(t: DpCell[][]): DpCell[][] {
    return t.map(row => row.map(cell => ({ ...cell })));
  }

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 2,
    description: `Initialized 0/1 Knapsack DP table with capacity W = ${W} and ${N} available items.`,
    actionType: 'traverse',
    variables: { items: N, capacity: W, W },
    state: {
      table: cloneTable(table),
      rowLabels,
      colLabels,
      currentRow: 0,
      currentCol: 0
    }
  });

  for (let i = 1; i <= N; i++) {
    const wt = weights[i - 1];
    const val = values[i - 1];

    for (let w = 1; w <= W; w++) {
      // Highlight current cell
      table[i][w].state = 'inspect';
      table[i - 1][w].state = 'pivot'; // omit option

      if (wt <= w) {
        table[i - 1][w - wt].state = 'active'; // include option

        const omitVal = table[i - 1][w].value;
        const takeVal = val + table[i - 1][w - wt].value;
        const maxVal = Math.max(omitVal, takeVal);
        table[i][w].value = maxVal;

        steps.push({
          stepIndex: steps.length,
          totalSteps: 0,
          line: 6,
          description: `Item ${i} (w=${wt}, v=${val}) fits in capacity ${w}. Compare omit (${omitVal}) vs include (${val} + ${table[i - 1][w - wt].value} = ${takeVal}). Chosen: ${maxVal}.`,
          actionType: 'compare',
          variables: { i, w, itemWeight: wt, itemValue: val, omitVal, takeVal, optimal: maxVal },
          state: {
            table: cloneTable(table),
            rowLabels,
            colLabels,
            currentRow: i,
            currentCol: w
          }
        });

        table[i - 1][w - wt].state = 'default';
      } else {
        const omitVal = table[i - 1][w].value;
        table[i][w].value = omitVal;

        steps.push({
          stepIndex: steps.length,
          totalSteps: 0,
          line: 8,
          description: `Item ${i} weight (${wt}) exceeds capacity ${w}. Cannot take item; copy value from above: ${omitVal}.`,
          actionType: 'overwrite',
          variables: { i, w, itemWeight: wt, capacity: w, copiedVal: omitVal },
          state: {
            table: cloneTable(table),
            rowLabels,
            colLabels,
            currentRow: i,
            currentCol: w
          }
        });
      }

      table[i - 1][w].state = 'default';
      table[i][w].state = 'sorted';
    }
  }

  // Final answer
  table[N][W].state = 'swap';
  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 9,
    description: `Knapsack optimization complete! Maximum total value achievable within capacity ${W} is ${table[N][W].value}.`,
    actionType: 'complete',
    variables: { maxKnapsackValue: table[N][W].value },
    state: {
      table: cloneTable(table),
      rowLabels,
      colLabels,
      currentRow: N,
      currentCol: W,
      computedValue: table[N][W].value
    }
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

export function generateFibonacciSteps(n: number = 7): VisualStep<DpVisualState>[] {
  const steps: VisualStep<DpVisualState>[] = [];
  const rowLabels = ['Fib Table'];
  const colLabels = Array.from({ length: n + 1 }, (_, i) => `i=${i}`);

  const table: DpCell[][] = [
    Array.from({ length: n + 1 }, (_, c) => ({
      row: 0,
      col: c,
      value: 0,
      state: 'default'
    }))
  ];

  function cloneTable(t: DpCell[][]): DpCell[][] {
    return t.map(row => row.map(cell => ({ ...cell })));
  }

  table[0][0].value = 0;
  table[0][0].state = 'sorted';
  table[0][1].value = 1;
  table[0][1].state = 'sorted';

  steps.push({
    stepIndex: 0,
    totalSteps: 0,
    line: 2,
    description: `Base cases established: dp[0] = 0 and dp[1] = 1.`,
    actionType: 'traverse',
    variables: { 'dp[0]': 0, 'dp[1]': 1, targetN: n },
    state: {
      table: cloneTable(table),
      rowLabels,
      colLabels,
      currentRow: 0,
      currentCol: 1
    }
  });

  for (let i = 2; i <= n; i++) {
    table[0][i - 2].state = 'inspect';
    table[0][i - 1].state = 'inspect';
    table[0][i].state = 'active';

    const prev2 = table[0][i - 2].value;
    const prev1 = table[0][i - 1].value;
    const fibVal = prev1 + prev2;
    table[0][i].value = fibVal;

    steps.push({
      stepIndex: steps.length,
      totalSteps: 0,
      line: 4,
      description: `Computing dp[${i}] = dp[${i - 1}] (${prev1}) + dp[${i - 2}] (${prev2}) = ${fibVal}. Constant O(1) transition without redundant recursion.`,
      actionType: 'swap',
      variables: { i, 'dp[i-1]': prev1, 'dp[i-2]': prev2, 'dp[i]': fibVal },
      state: {
        table: cloneTable(table),
        rowLabels,
        colLabels,
        currentRow: 0,
        currentCol: i
      }
    });

    table[0][i - 2].state = 'sorted';
    table[0][i - 1].state = 'sorted';
    table[0][i].state = 'sorted';
  }

  steps.push({
    stepIndex: steps.length,
    totalSteps: 0,
    line: 5,
    description: `Fibonacci Dynamic Programming complete! F(${n}) = ${table[0][n].value}. Reduced runtime from exponential O(2^N) to linear O(N)!`,
    actionType: 'complete',
    variables: { n, result: table[0][n].value, timeComplexity: 'O(N)' },
    state: {
      table: cloneTable(table),
      rowLabels,
      colLabels,
      currentRow: 0,
      currentCol: n,
      computedValue: table[0][n].value
    }
  });

  steps.forEach(s => s.totalSteps = steps.length);
  return steps;
}

