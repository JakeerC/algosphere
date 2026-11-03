import { Blind75Problem, Blind75Category, UserProgressMap } from '../../types/blind75';
import { ARRAY_PROBLEMS } from './arrays';
import { BINARY_PROBLEMS } from './binary';
import { DP_PROBLEMS } from './dp';
import { GRAPH_PROBLEMS } from './graphs';
import { INTERVAL_PROBLEMS } from './intervals';
import { LINKED_LIST_PROBLEMS } from './linkedlist';
import { MATRIX_PROBLEMS } from './matrix';
import { STRING_PROBLEMS } from './strings';
import { TREE_PROBLEMS } from './trees';
import { HEAP_PROBLEMS } from './heaps';

export const ALL_BLIND75_PROBLEMS: Blind75Problem[] = [
  ...ARRAY_PROBLEMS,
  ...BINARY_PROBLEMS,
  ...DP_PROBLEMS,
  ...GRAPH_PROBLEMS,
  ...INTERVAL_PROBLEMS,
  ...LINKED_LIST_PROBLEMS,
  ...MATRIX_PROBLEMS,
  ...STRING_PROBLEMS,
  ...TREE_PROBLEMS,
  ...HEAP_PROBLEMS
];

export const BLIND75_CATEGORIES: Blind75Category[] = [
  'Array',
  'Binary',
  'Dynamic Programming',
  'Graph',
  'Interval',
  'Linked List',
  'Matrix',
  'String',
  'Tree',
  'Heap'
];

export function getBlind75ProblemById(id: string): Blind75Problem | undefined {
  return ALL_BLIND75_PROBLEMS.find(p => p.id === id);
}

export function getBlind75ProblemByNumber(num: number): Blind75Problem | undefined {
  return ALL_BLIND75_PROBLEMS.find(p => p.number === num);
}

export function getProblemsByCategory(category: Blind75Category): Blind75Problem[] {
  return ALL_BLIND75_PROBLEMS.filter(p => p.category === category);
}

export function getProblemsByWeek(week: number): Blind75Problem[] {
  return ALL_BLIND75_PROBLEMS.filter(p => p.grindWeek === week);
}

export interface Blind75Stats {
  total: number;
  completed: number;
  percentage: number;
  starred: number;
  easyTotal: number;
  easyCompleted: number;
  mediumTotal: number;
  mediumCompleted: number;
  hardTotal: number;
  hardCompleted: number;
}

export function calculateBlind75Stats(progressMap: UserProgressMap): Blind75Stats {
  const total = ALL_BLIND75_PROBLEMS.length;
  let completed = 0;
  let starred = 0;

  let easyTotal = 0;
  let easyCompleted = 0;
  let mediumTotal = 0;
  let mediumCompleted = 0;
  let hardTotal = 0;
  let hardCompleted = 0;

  for (const prob of ALL_BLIND75_PROBLEMS) {
    const isDone = !!progressMap[prob.id]?.completed;
    const isStar = !!progressMap[prob.id]?.starred;

    if (isDone) completed++;
    if (isStar) starred++;

    if (prob.difficulty === 'Easy') {
      easyTotal++;
      if (isDone) easyCompleted++;
    } else if (prob.difficulty === 'Medium') {
      mediumTotal++;
      if (isDone) mediumCompleted++;
    } else {
      hardTotal++;
      if (isDone) hardCompleted++;
    }
  }

  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    total,
    completed,
    percentage,
    starred,
    easyTotal,
    easyCompleted,
    mediumTotal,
    mediumCompleted,
    hardTotal,
    hardCompleted
  };
}
