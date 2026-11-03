import { Blind75Problem, Blind75Step } from '../../types/blind75';

export const HEAP_PROBLEMS: Blind75Problem[] = [
  // 74. Top K Frequent Elements (#347)
  {
    id: 'top-k-frequent-elements',
    number: 347,
    title: 'Top K Frequent Elements',
    category: 'Heap',
    difficulty: 'Medium',
    pattern: 'Bucket Sort / Min-Heap',
    grindWeek: 8,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
    summary: 'Find the k most frequent elements in an integer array in O(n) time.',
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in any order.`,
    examples: [
      { input: 'nums = [1,1,1,2,2,3], k = 2', output: '[1,2]' },
      { input: 'nums = [1], k = 1', output: '[1]' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4',
      'k is in the range [1, the number of unique elements in the array].',
      'It is guaranteed that the answer is unique.'
    ],
    intuition: `Bucket Sort in O(N) time:
1. Count frequencies with a hash map.
2. Create an array of buckets where index \`i\` holds a list of numbers that appear with frequency \`i\`. The maximum possible frequency is \`len(nums)\`.
3. Iterate backwards from the highest frequency bucket down to 1, collecting elements into the result until \`k\` elements are gathered!`,
    pythonSolution: `def topKFrequent(nums: list[int], k: int) -> list[int]:
    """
    Bucket sort by frequency in linear O(N) time.
    """
    count = {}
    for n in nums:
        count[n] = count.get(n, 0) + 1

    # buckets[freq] = list of numbers with that freq
    buckets = [[] for _ in range(len(nums) + 1)]
    for n, c in count.items():
        buckets[c].append(n)

    res = []
    for freq in range(len(buckets) - 1, 0, -1):
        for n in buckets[freq]:
            res.append(n)
            if len(res) == k:
                return res
    return res`,
    pseudocode: [
      'count = hash map counting frequency of each num',
      'buckets = array of lists of size len(nums) + 1',
      'for num, freq in count: buckets[freq].append(num)',
      'res = []',
      'for freq from len(nums) down to 1:',
      '    for num in buckets[freq]:',
      '        res.append(num)',
      '        if len(res) == k: return res',
      'return res'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Counting frequencies and bucket population are linear O(N).'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'Hash map and bucket array bounded by N.'
    },
    generateSteps: () => {
      const nums = [1, 1, 1, 2, 2, 3];
      const k = 2;
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input: [1,1,1,2,2,3], k = 2. Frequencies: {1: 3, 2: 2, 3: 1}.',
        action: 'inspect',
        variables: { k, 'freq(1)': 3, 'freq(2)': 2, 'freq(3)': 1 },
        visualData: {
          kind: 'hash-map',
          hashMap: { '1': 'freq 3', '2': 'freq 2', '3': 'freq 1' }
        }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 8,
        description: 'Bucket array: freq 3 -> [1], freq 2 -> [2], freq 1 -> [3].',
        action: 'update',
        variables: { bucket_3: '[1]', bucket_2: '[2]' },
        visualData: {
          kind: 'array-pointers',
          array: ['freq 3: [1]', 'freq 2: [2]', 'freq 1: [3]'],
          activeIndices: [0, 1]
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 14,
        description: 'Collect top 2: take 1 (from freq 3), then 2 (from freq 2). Result: [1, 2].',
        action: 'return',
        variables: { result: '[1, 2]' },
        visualData: {
          kind: 'array-pointers',
          array: [1, 2],
          badgeNote: 'Top 2 Frequent Elements: [1, 2]'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 75. Find Median from Data Stream (#295)
  {
    id: 'find-median-from-data-stream',
    number: 295,
    title: 'Find Median from Data Stream',
    category: 'Heap',
    difficulty: 'Hard',
    pattern: 'Two Heaps (Max-Heap Small Half + Min-Heap Large Half)',
    grindWeek: 9,
    estimatedMinutes: 35,
    leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/',
    summary: 'Design a data structure that dynamically finds the median of a continuous data stream in O(1) time.',
    description: `The median is the middle value in an ordered integer list. If the size of the list is even, there is no middle value, and the median is the mean of the two middle values.

Implement the \`MedianFinder\` class with \`addNum(num)\` and \`findMedian()\`.`,
    examples: [
      {
        input: '["MedianFinder", "addNum", "addNum", "findMedian", "addNum", "findMedian"]\n[[], [1], [2], [], [3], []]',
        output: '[null, null, null, 1.5, null, 2.0]'
      }
    ],
    constraints: [
      '-10^5 <= num <= 10^5',
      'There will be at least one element in the data structure before calling findMedian.',
      'At most 5 * 10^4 calls will be made to addNum and findMedian.'
    ],
    intuition: `Divide numbers into two balanced halves:
1. \`small\`: a Max-Heap storing the smaller half of numbers (inverted in Python using negative values).
2. \`large\`: a Min-Heap storing the larger half of numbers.
Invariants maintained:
- Every element in \`small\` is <= every element in \`large\`.
- The size difference between \`small\` and \`large\` is at most 1: \`abs(len(small) - len(large)) <= 1\`.
Median computation in O(1):
- If odd total elements: the root of the larger heap is the median.
- If even total elements: average of roots: \`(-small[0] + large[0]) / 2.0\`.`,
    pythonSolution: `import heapq

class MedianFinder:
    def __init__(self):
        # small is a max-heap (negated), large is a min-heap
        self.small = []
        self.large = []

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)

        # Make sure every num in small is <= every num in large
        if self.small and self.large and (-self.small[0] > self.large[0]):
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)

        # Balance sizes (difference at most 1)
        if len(self.small) > len(self.large) + 1:
            val = -heapq.heappop(self.small)
            heapq.heappush(self.large, val)
        elif len(self.large) > len(self.small) + 1:
            val = heapq.heappop(self.large)
            heapq.heappush(self.small, -val)

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        elif len(self.large) > len(self.small):
            return float(self.large[0])
        return (-self.small[0] + self.large[0]) / 2.0`,
    pseudocode: [
      'small = max_heap (stores smaller half), large = min_heap (stores larger half)',
      'function addNum(num):',
      '    push num into small (max-heap)',
      '    if max(small) > min(large): move top of small to large',
      '    rebalance heaps so size difference <= 1',
      'function findMedian():',
      '    if len(small) > len(large): return top(small)',
      '    if len(large) > len(small): return top(large)',
      '    return (top(small) + top(large)) / 2.0'
    ],
    timeComplexity: {
      bigO: 'addNum: O(log N), findMedian: O(1)',
      explanation: 'Heap push and pop operations take logarithmic time; median peek is instantaneous O(1).'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'Two heaps together hold all N streaming numbers.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Initialize Two Heaps: Max-Heap (small half) & Min-Heap (large half).',
        action: 'inspect',
        variables: { small: '[]', large: '[]' },
        visualData: {
          kind: 'array-pointers',
          array: ['small (max-heap): []', 'large (min-heap): []']
        }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 7,
        description: 'addNum(1), addNum(2): small=[-1], large=[2]. Size equal (1, 1). Median = (1 + 2) / 2 = 1.5.',
        action: 'update',
        variables: { small_top: 1, large_top: 2, median: 1.5 },
        visualData: {
          kind: 'array-pointers',
          array: ['small: [1]', 'large: [2]'],
          badgeNote: 'Median: (1 + 2) / 2 = 1.5'
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 15,
        description: 'addNum(3): inserted and balanced -> small=[1], large=[2, 3]. Large heap has 2 elements. Median = large[0] = 2.0!',
        action: 'return',
        variables: { median: 2.0 },
        visualData: {
          kind: 'array-pointers',
          array: ['small: [1]', 'large: [2, 3]'],
          badgeNote: 'Median: 2.0 (O(1) peek)'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  }
];
