import { Blind75Problem, Blind75Step } from '../../types/blind75';

export const INTERVAL_PROBLEMS: Blind75Problem[] = [
  // 35. Insert Interval (#57)
  {
    id: 'insert-interval',
    number: 57,
    title: 'Insert Interval',
    category: 'Interval',
    difficulty: 'Medium',
    pattern: 'Interval Partitioning & Merging',
    grindWeek: 5,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/insert-interval/',
    summary: 'Insert a new interval into a sorted array of non-overlapping intervals, merging if necessary.',
    description: `You are given an array of non-overlapping intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\` represent the start and the end of the \`i\`th interval, and \`intervals\` is sorted in ascending order by \`start_i\`. You are also given an interval \`newInterval = [start, end]\` that represents the start and end of another interval.

Insert \`newInterval\` into \`intervals\` such that \`intervals\` is still sorted in ascending order by \`start_i\` and \`intervals\` still does not have any overlapping intervals (merge overlapping intervals if necessary).`,
    examples: [
      { input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', output: '[[1,5],[6,9]]' },
      { input: 'intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]', output: '[[1,2],[3,10],[12,16]]', explanation: 'newInterval [4,8] overlaps with [3,5],[6,7],[8,10].' }
    ],
    constraints: [
      '0 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i <= end_i <= 10^5',
      'intervals is sorted by start_i in ascending order.'
    ],
    intuition: `Process in three clean sequential phases:
1. Add all intervals ending strictly before \`newInterval.start\`.
2. Merge all overlapping intervals: while \`interval.start <= newInterval.end\`, expand \`newInterval\` to \`[min(newInterval.start, interval.start), max(newInterval.end, interval.end)]\`.
3. Add the merged \`newInterval\`, then append all remaining trailing intervals.`,
    pythonSolution: `def insert(intervals: list[list[int]], newInterval: list[int]) -> list[list[int]]:
    """
    Three-phase linear scan: before, overlapping merge, after.
    Time: O(N), Space: O(N).
    """
    res = []
    i = 0
    n = len(intervals)

    # 1. Add all intervals ending before newInterval starts
    while i < n and intervals[i][1] < newInterval[0]:
        res.append(intervals[i])
        i += 1

    # 2. Merge all overlapping intervals
    while i < n and intervals[i][0] <= newInterval[1]:
        newInterval[0] = min(newInterval[0], intervals[i][0])
        newInterval[1] = max(newInterval[1], intervals[i][1])
        i += 1
    res.append(newInterval)

    # 3. Add all remaining intervals
    while i < n:
        res.append(intervals[i])
        i += 1

    return res`,
    pseudocode: [
      'res = [], i = 0',
      'while intervals[i].end < newInterval.start: res.append(intervals[i++])',
      'while intervals[i].start <= newInterval.end:',
      '    newInterval = [min(newInterval.start, intervals[i].start), max(newInterval.end, intervals[i].end)]',
      '    i++',
      'res.append(newInterval)',
      'while i < len(intervals): res.append(intervals[i++])',
      'return res'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Linear scan visiting each interval once.'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'Stores result list of intervals.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input: intervals = [[1,3],[6,9]], newInterval = [2,5].',
        action: 'inspect',
        variables: { newInterval: '[2, 5]' },
        visualData: {
          kind: 'intervals',
          intervalsList: [{ start: 1, end: 3 }, { start: 6, end: 9 }],
          currentInterval: { start: 2, end: 5 }
        }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 6,
        description: 'Merge [1,3] with [2,5]: start = min(1,2)=1, end = max(3,5)=5 -> Merged: [1,5].',
        action: 'update',
        variables: { merged: '[1, 5]' },
        visualData: {
          kind: 'intervals',
          intervalsList: [{ start: 1, end: 5, state: 'merged' }, { start: 6, end: 9 }],
          currentInterval: { start: 1, end: 5 }
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 10,
        description: 'Append remaining interval [6,9]. Result: [[1,5], [6,9]].',
        action: 'return',
        variables: { result: '[[1, 5], [6, 9]]' },
        visualData: {
          kind: 'intervals',
          intervalsList: [{ start: 1, end: 5, state: 'merged' }, { start: 6, end: 9, state: 'default' }],
          badgeNote: 'Result: [[1, 5], [6, 9]]'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 36. Merge Intervals (#56)
  {
    id: 'merge-intervals',
    number: 56,
    title: 'Merge Intervals',
    category: 'Interval',
    difficulty: 'Medium',
    pattern: 'Sorting + Linear Merge',
    grindWeek: 5,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/',
    summary: 'Merge all overlapping intervals and return non-overlapping intervals that cover all input intervals.',
    description: `Given an array of \`intervals\` where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.`,
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: 'Intervals [1,3] and [2,6] overlap, merging into [1,6].' },
      { input: 'intervals = [[1,4],[4,5]]', output: '[[1,5]]' }
    ],
    constraints: [
      '1 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i <= end_i <= 10^4'
    ],
    intuition: `1. Sort intervals by start time \`intervals.sort(key=lambda x: x[0])\`.
2. Iterate through sorted intervals:
   - If the current interval's start is <= previous interval's end, they overlap: extend the previous interval's end: \`prev[1] = max(prev[1], curr[1])\`.
   - Otherwise, there is no overlap: append \`curr\` to \`merged\`.`,
    pythonSolution: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    """
    Sort by start time and merge greedily.
    Time: O(N log N), Space: O(N).
    """
    intervals.sort(key=lambda x: x[0])
    merged = []
    
    for interval in intervals:
        if not merged or merged[-1][1] < interval[0]:
            merged.append(interval)
        else:
            merged[-1][1] = max(merged[-1][1], interval[1])
            
    return merged`,
    pseudocode: [
      'sort intervals by start time ascending',
      'merged = []',
      'for each interval in intervals:',
      '    if merged is empty or merged[-1].end < interval.start:',
      '        merged.append(interval)',
      '    else:',
      '        merged[-1].end = max(merged[-1].end, interval.end)',
      'return merged'
    ],
    timeComplexity: {
      bigO: 'O(N log N)',
      explanation: 'Sorting the intervals dominates the runtime.'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'Array of merged output intervals.'
    },
    generateSteps: () => {
      const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]];
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Intervals sorted by start time: [[1,3], [2,6], [8,10], [15,18]].',
        action: 'inspect',
        variables: { total: 4 },
        visualData: {
          kind: 'intervals',
          intervalsList: intervals.map(iv => ({ start: iv[0], end: iv[1] }))
        }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 6,
        description: '[2,6] overlaps with [1,3] since 2 <= 3. Merge: [1, max(3, 6)] = [1, 6].',
        action: 'update',
        variables: { merged_interval: '[1, 6]' },
        visualData: {
          kind: 'intervals',
          intervalsList: [
            { start: 1, end: 6, state: 'merged' },
            { start: 8, end: 10 },
            { start: 15, end: 18 }
          ]
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 7,
        description: '[8,10] and [15,18] do not overlap. Final: [[1,6], [8,10], [15,18]].',
        action: 'return',
        variables: { count: 3 },
        visualData: {
          kind: 'intervals',
          intervalsList: [
            { start: 1, end: 6, state: 'merged' },
            { start: 8, end: 10, state: 'default' },
            { start: 15, end: 18, state: 'default' }
          ],
          badgeNote: 'Merged Result: 3 non-overlapping intervals'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 37. Non-overlapping Intervals (#435)
  {
    id: 'non-overlapping-intervals',
    number: 435,
    title: 'Non-overlapping Intervals',
    category: 'Interval',
    difficulty: 'Medium',
    pattern: 'Greedy Interval Scheduling (Earliest End Time)',
    grindWeek: 12,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/',
    summary: 'Find the minimum number of intervals you need to remove to make the rest non-overlapping.',
    description: `Given an array of intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\`, return the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.`,
    examples: [
      { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', output: '1', explanation: '[1,3] can be removed and the rest of the intervals are non-overlapping.' },
      { input: 'intervals = [[1,2],[1,2],[1,2]]', output: '2' }
    ],
    constraints: [
      '1 <= intervals.length <= 10^5',
      'intervals[i].length == 2',
      '-5 * 10^4 <= start_i < end_i <= 5 * 10^4'
    ],
    intuition: `Greedy choice: When two intervals overlap, keep the one that ends *earlier*, because an earlier end time leaves more room for subsequent intervals and minimizes future conflicts.
Sort by end time (or sort by start time and pick the minimum end time on collision). Count how many intervals must be discarded.`,
    pythonSolution: `def eraseOverlapIntervals(intervals: list[list[int]]) -> int:
    """
    Greedy choice: when overlapping, discard interval with later end time.
    Time: O(N log N), Space: O(1).
    """
    intervals.sort(key=lambda x: x[0])
    removals = 0
    prev_end = intervals[0][1]
    
    for start, end in intervals[1:]:
        if start < prev_end: # Overlap detected
            removals += 1
            prev_end = min(prev_end, end) # Keep interval with earlier end
        else:
            prev_end = end
            
    return removals`,
    pseudocode: [
      'sort intervals by start time',
      'removals = 0, prev_end = intervals[0].end',
      'for each [start, end] in intervals[1:]:',
      '    if start < prev_end: # overlap',
      '        removals++',
      '        prev_end = min(prev_end, end) # drop later end',
      '    else:',
      '        prev_end = end',
      'return removals'
    ],
    timeComplexity: {
      bigO: 'O(N log N)',
      explanation: 'Sorting the intervals by start time.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'In-place sort and scalar counter.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 2,
        line: 1,
        description: 'Input intervals: [[1,2], [1,3], [2,3], [3,4]]. Removals = 0.',
        action: 'inspect',
        variables: { removals: 0 },
        visualData: {
          kind: 'intervals',
          intervalsList: [{ start: 1, end: 2 }, { start: 1, end: 3, state: 'conflict' }, { start: 2, end: 3 }, { start: 3, end: 4 }]
        }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 2,
        line: 5,
        description: 'Conflict between [1,2] and [1,3]: discard [1,3] since end time 3 > 2. Total removals = 1.',
        action: 'return',
        variables: { removals: 1 },
        visualData: {
          kind: 'intervals',
          intervalsList: [{ start: 1, end: 2 }, { start: 2, end: 3 }, { start: 3, end: 4 }],
          badgeNote: 'Min Removals: 1'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 38. Meeting Rooms (#252)
  {
    id: 'meeting-rooms',
    number: 252,
    title: 'Meeting Rooms',
    category: 'Interval',
    difficulty: 'Easy',
    pattern: 'Sorting + Adjacent Overlap Check',
    grindWeek: 2,
    estimatedMinutes: 15,
    leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms/',
    summary: 'Determine if a person could attend all meetings without overlapping schedule conflicts.',
    description: `Given an array of meeting time intervals consisting of start and end times \`[[start_1,end_1],[start_2,end_2],...]\`, determine if a person could attend all meetings.`,
    examples: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', output: 'false', explanation: '[0,30] overlaps with [5,10] and [15,20].' },
      { input: 'intervals = [[7,10],[2,4]]', output: 'true' }
    ],
    constraints: [
      '0 <= intervals.length <= 10^4',
      'intervals[i].length == 2',
      '0 <= start_i < end_i <= 10^6'
    ],
    intuition: `Sort meetings by their start times: \`intervals.sort(key=lambda x: x[0])\`.
Then check if any meeting starts before the previous meeting concludes:
If \`intervals[i][0] < intervals[i - 1][1]\`, there is a schedule conflict; return \`False\`.
If all adjacent pairs are disjoint, return \`True\`.`,
    pythonSolution: `def canAttendMeetings(intervals: list[list[int]]) -> bool:
    """
    Sort by start time and check adjacent meeting overlaps.
    Time: O(N log N), Space: O(1).
    """
    intervals.sort(key=lambda x: x[0])
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False
    return True`,
    pseudocode: [
      'sort intervals by start time ascending',
      'for i from 1 to len(intervals)-1:',
      '    if intervals[i].start < intervals[i-1].end:',
      '        return False',
      'return True'
    ],
    timeComplexity: {
      bigO: 'O(N log N)',
      explanation: 'Sorting the meetings by start time.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Constant auxiliary memory.'
    },
    generateSteps: () => {
      const intervals = [[0, 30], [5, 10], [15, 20]];
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 2,
        line: 1,
        description: 'Meetings sorted by start: [[0,30], [5,10], [15,20]].',
        action: 'inspect',
        variables: { sorted: true },
        visualData: {
          kind: 'intervals',
          intervalsList: intervals.map(iv => ({ start: iv[0], end: iv[1] }))
        }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 2,
        line: 4,
        description: 'Meeting [5,10] starts at 5, but previous meeting [0,30] ends at 30! Overlap conflict -> False.',
        action: 'return',
        variables: { conflict: true, can_attend: false },
        visualData: {
          kind: 'intervals',
          intervalsList: [{ start: 0, end: 30, state: 'conflict' }, { start: 5, end: 10, state: 'conflict' }],
          badgeNote: 'Cannot attend all: CONFLICT'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 39. Meeting Rooms II (#253)
  {
    id: 'meeting-rooms-ii',
    number: 253,
    title: 'Meeting Rooms II',
    category: 'Interval',
    difficulty: 'Medium',
    pattern: 'Chronological Two Pointers / Min-Heap',
    grindWeek: 12,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/',
    summary: 'Find the minimum number of conference rooms required to host all meetings.',
    description: `Given an array of meeting time intervals \`intervals\` where \`intervals[i] = [start_i, end_i]\`, return the minimum number of conference rooms required.`,
    examples: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2', explanation: 'Room 1: [0,30]; Room 2: [5,10], then [15,20].' },
      { input: 'intervals = [[7,10],[2,4]]', output: '1' }
    ],
    constraints: [
      '1 <= intervals.length <= 10^4',
      '0 <= start_i < end_i <= 10^6'
    ],
    intuition: `Separate start times and end times into two sorted arrays: \`starts\` and \`ends\`.
Use two pointers to walk through time chronologically:
- When \`starts[s] < ends[e]\`: a meeting is starting before another has ended, requiring an extra room: \`rooms += 1\`, \`s += 1\`.
- When \`starts[s] >= ends[e]\`: a meeting has ended, freeing up a room: \`rooms -= 1\`, \`e += 1\`.
The peak number of concurrent rooms is the answer!`,
    pythonSolution: `def minMeetingRooms(intervals: list[list[int]]) -> int:
    """
    Chronological two-pointer event timeline.
    Time: O(N log N), Space: O(N).
    """
    starts = sorted([i[0] for i in intervals])
    ends = sorted([i[1] for i in intervals])
    
    rooms = max_rooms = 0
    s = e = 0
    n = len(intervals)
    
    while s < n:
        if starts[s] < ends[e]:
            rooms += 1
            max_rooms = max(max_rooms, rooms)
            s += 1
        else:
            rooms -= 1
            e += 1
            
    return max_rooms`,
    pseudocode: [
      'starts = sorted start times',
      'ends = sorted end times',
      'rooms = 0, max_rooms = 0, s = 0, e = 0',
      'while s < len(starts):',
      '    if starts[s] < ends[e]:',
      '        rooms++; max_rooms = max(max_rooms, rooms); s++',
      '    else:',
      '        rooms--; e++',
      'return max_rooms'
    ],
    timeComplexity: {
      bigO: 'O(N log N)',
      explanation: 'Sorting the start and end time arrays.'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'Two sorted arrays of length N.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Timeline: Starts = [0, 5, 15], Ends = [10, 20, 30].',
        action: 'inspect',
        variables: { s: 0, e: 0, rooms: 0 },
        visualData: {
          kind: 'intervals',
          intervalsList: [{ start: 0, end: 30 }, { start: 5, end: 10 }, { start: 15, end: 20 }]
        }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 9,
        description: 'At time 5: meeting starts before first meeting ends at 10. Concurrent rooms needed = 2.',
        action: 'update',
        variables: { time: 5, active_rooms: 2, max_rooms: 2 },
        visualData: {
          kind: 'intervals',
          intervalsList: [{ start: 0, end: 30, state: 'active' }, { start: 5, end: 10, state: 'active' }],
          badgeNote: '2 Rooms in Simultaneous Use'
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 13,
        description: 'Meeting [5,10] ends at 10, freeing room for [15,20]. Peak rooms needed = 2.',
        action: 'return',
        variables: { min_rooms_needed: 2 },
        visualData: {
          kind: 'intervals',
          intervalsList: [{ start: 0, end: 30, state: 'merged' }, { start: 5, end: 10 }, { start: 15, end: 20 }],
          badgeNote: 'Min Conference Rooms: 2'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  }
];
