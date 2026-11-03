import { Blind75Problem, Blind75Step } from '../../types/blind75';

export const DP_PROBLEMS: Blind75Problem[] = [
  // 16. Climbing Stairs (#70)
  {
    id: 'climbing-stairs',
    number: 70,
    title: 'Climbing Stairs',
    category: 'Dynamic Programming',
    difficulty: 'Easy',
    pattern: 'Fibonacci Sequence DP',
    grindWeek: 2,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/',
    summary: 'Find the number of distinct ways to climb a staircase of n steps taking 1 or 2 steps each time.',
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb \`1\` or \`2\` steps. In how many distinct ways can you climb to the top?`,
    examples: [
      { input: 'n = 2', output: '2', explanation: 'There are two ways to climb to the top: 1. 1 step + 1 step, 2. 2 steps.' },
      { input: 'n = 3', output: '3', explanation: 'Three ways: 1. 1+1+1, 2. 1+2, 3. 2+1.' }
    ],
    constraints: [
      '1 <= n <= 45'
    ],
    intuition: `To reach step \`i\`, the last step must have been either from step \`i - 1\` (1-step hop) or step \`i - 2\` (2-step hop). Therefore, \`ways(i) = ways(i - 1) + ways(i - 2)\`. This is the Fibonacci recurrence, which can be computed in O(N) time and O(1) space using two rolling variables.`,
    pythonSolution: `def climbStairs(n: int) -> int:
    """
    Bottom-up Fibonacci DP with rolling variables.
    Time: O(N), Space: O(1).
    """
    if n <= 2:
        return n
    one, two = 1, 2
    for _ in range(3, n + 1):
        one, two = two, one + two
    return two`,
    pseudocode: [
      'if n <= 2: return n',
      'one = 1, two = 2',
      'for step from 3 to n:',
      '    next_val = one + two',
      '    one = two',
      '    two = next_val',
      'return two'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Calculates each step count iteratively up to N.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Only two scalar numbers maintained in memory.'
    },
    generateSteps: () => {
      const n = 5;
      const dp = [1, 2, 3, 5, 8];
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 4,
        line: 2,
        description: 'Base cases: 1 step has 1 way, 2 steps has 2 ways.',
        action: 'inspect',
        variables: { step_1: 1, step_2: 2 },
        visualData: { kind: 'dp-table', dp1D: [1, 2, 0, 0, 0], activeDpCell: { index: 1 } }
      });

      let one = 1, two = 2;
      for (let i = 3; i <= n; i++) {
        const nextVal = one + two;
        one = two;
        two = nextVal;
        const currentArr = [1, 2, 0, 0, 0];
        for (let j = 0; j < i; j++) currentArr[j] = dp[j];

        steps.push({
          stepIndex: steps.length,
          totalSteps: 4,
          line: 4,
          description: `Step ${i}: ways(${i - 1}) + ways(${i - 2}) = ${one} + ${two - one} = ${nextVal} ways.`,
          action: 'update',
          variables: { step: i, ways: nextVal },
          visualData: {
            kind: 'dp-table',
            dp1D: currentArr,
            activeDpCell: { index: i - 1 },
            badgeNote: `Step ${i}: ${nextVal} ways`
          }
        });
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 17. Coin Change (#322)
  {
    id: 'coin-change',
    number: 322,
    title: 'Coin Change',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    pattern: 'Unbounded Knapsack DP',
    grindWeek: 4,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/coin-change/',
    summary: 'Find the fewest number of coins needed to make up a given amount.',
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.`,
    examples: [
      { input: 'coins = [1, 2, 5], amount = 11', output: '3', explanation: '11 = 5 + 5 + 1 (3 coins)' },
      { input: 'coins = [2], amount = 3', output: '-1' },
      { input: 'coins = [1], amount = 0', output: '0' }
    ],
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    intuition: `Bottom-up 1D DP: Let \`dp[a]\` be the minimum coins needed for amount \`a\`.
Initialize \`dp[0] = 0\` and all other amounts to infinity.
For each amount \`a\` from 1 to \`amount\`, iterate through every coin:
\`if a - coin >= 0: dp[a] = min(dp[a], 1 + dp[a - coin])\`.
If \`dp[amount]\` remains infinity, return -1.`,
    pythonSolution: `def coinChange(coins: list[int], amount: int) -> int:
    """
    Bottom-up 1D DP unbounded knapsack.
    Time: O(amount * len(coins)), Space: O(amount).
    """
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for a in range(1, amount + 1):
        for c in coins:
            if a - c >= 0:
                dp[a] = min(dp[a], 1 + dp[a - c])
                
    return dp[amount] if dp[amount] != float('inf') else -1`,
    pseudocode: [
      'dp = array of size amount + 1 filled with infinity',
      'dp[0] = 0',
      'for a from 1 to amount:',
      '    for each coin c in coins:',
      '        if a - c >= 0:',
      '            dp[a] = min(dp[a], 1 + dp[a - c])',
      'return dp[amount] if dp[amount] != infinity else -1'
    ],
    timeComplexity: {
      bigO: 'O(amount * C)',
      explanation: 'Where C is the number of coin denominations.'
    },
    spaceComplexity: {
      bigO: 'O(amount)',
      explanation: '1D DP array of size amount + 1.'
    },
    generateSteps: () => {
      const coins = [1, 2, 5];
      const amount = 7;
      const dp: (number | string)[] = Array(amount + 1).fill('∞');
      dp[0] = 0;
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 8,
        line: 2,
        description: `Initialize dp[0] = 0, all others = ∞. Coins available: [${coins.join(', ')}].`,
        action: 'inspect',
        variables: { amount, coins: coins.join(', ') },
        visualData: { kind: 'dp-table', dp1D: [...dp], activeDpCell: { index: 0 } }
      });

      for (let a = 1; a <= amount; a++) {
        let minCoins = Infinity;
        for (const c of coins) {
          if (a - c >= 0 && typeof dp[a - c] === 'number') {
            minCoins = Math.min(minCoins, 1 + (dp[a - c] as number));
          }
        }
        dp[a] = minCoins === Infinity ? '∞' : minCoins;

        steps.push({
          stepIndex: steps.length,
          totalSteps: 8,
          line: 6,
          description: `Amount $${a}: Checked coins. Minimum coins needed = ${dp[a]}.`,
          action: 'update',
          variables: { amount: a, min_coins: dp[a] },
          visualData: {
            kind: 'dp-table',
            dp1D: [...dp],
            activeDpCell: { index: a },
            badgeNote: `Amount $${a} -> ${dp[a]} coins`
          }
        });
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 18. Longest Increasing Subsequence (#300)
  {
    id: 'longest-increasing-subsequence',
    number: 300,
    title: 'Longest Increasing Subsequence',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    pattern: 'Patience Sorting / Binary Search DP',
    grindWeek: 11,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/',
    summary: 'Find the length of the longest strictly increasing subsequence in an integer array.',
    description: `Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.`,
    examples: [
      { input: 'nums = [10, 9, 2, 5, 3, 7, 101, 18]', output: '4', explanation: 'The longest increasing subsequence is [2, 3, 7, 101], therefore the length is 4.' },
      { input: 'nums = [0, 1, 0, 3, 2, 3]', output: '4' }
    ],
    constraints: [
      '1 <= nums.length <= 2500',
      '-10^4 <= nums[i] <= 10^4'
    ],
    intuition: `Patience Sorting: Maintain an array \`tails\` where \`tails[i]\` stores the smallest tail of all increasing subsequences of length \`i + 1\`. For each number \`x\`, binary search \`tails\` to find the first element >= \`x\`. If none exists, append \`x\`; otherwise replace that element with \`x\`. The length of \`tails\` is the LIS length in O(N log N)!`,
    pythonSolution: `import bisect

def lengthOfLIS(nums: list[int]) -> int:
    """
    Patience sorting with binary search.
    Time: O(N log N), Space: O(N).
    """
    tails = []
    for x in nums:
        idx = bisect.bisect_left(tails, x)
        if idx == len(tails):
            tails.append(x)
        else:
            tails[idx] = x
    return len(tails)`,
    pseudocode: [
      'tails = []',
      'for each x in nums:',
      '    idx = binary_search_left(tails, x)',
      '    if idx == len(tails): tails.append(x)',
      '    else: tails[idx] = x',
      'return len(tails)'
    ],
    timeComplexity: {
      bigO: 'O(N log N)',
      explanation: 'Binary search of tails array takes O(log N) for each of N numbers.'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'Tails array stores at most N elements.'
    },
    generateSteps: () => {
      const nums = [10, 9, 2, 5, 3, 7];
      const tails: number[] = [];
      const steps: Blind75Step[] = [];

      for (let i = 0; i < nums.length; i++) {
        const x = nums[i];
        let idx = tails.findIndex(t => t >= x);
        const append = idx === -1;
        if (append) {
          tails.push(x);
          idx = tails.length - 1;
        } else {
          tails[idx] = x;
        }

        steps.push({
          stepIndex: steps.length,
          totalSteps: nums.length,
          line: 4,
          description: `Element ${x} at index ${i}: ${append ? `Larger than all tails, extend tails to [${tails.join(', ')}].` : `Binary search replaced tails[${idx}] with ${x} -> [${tails.join(', ')}].`}`,
          action: append ? 'update' : 'inspect',
          variables: { num: x, tail_index: idx, lis_length: tails.length },
          visualData: {
            kind: 'array-pointers',
            array: [...tails],
            pointers: [{ name: 'last updated', index: idx, color: 'var(--success-500)' }],
            badgeNote: `LIS Current Length: ${tails.length}`
          }
        });
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 19. Longest Common Subsequence (#1143)
  {
    id: 'longest-common-subsequence',
    number: 1143,
    title: 'Longest Common Subsequence',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    pattern: '2D Grid DP',
    grindWeek: 11,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/',
    summary: 'Find the length of the longest subsequence present in both strings text1 and text2.',
    description: `Given two strings \`text1\` and \`text2\`, return the length of their longest common subsequence. If there is no common subsequence, return 0.`,
    examples: [
      { input: 'text1 = "abcde", text2 = "ace"', output: '3', explanation: 'The longest common subsequence is "ace" and its length is 3.' },
      { input: 'text1 = "abc", text2 = "abc"', output: '3' },
      { input: 'text1 = "abc", text2 = "def"', output: '0' }
    ],
    constraints: [
      '1 <= text1.length, text2.length <= 1000',
      'text1 and text2 consist of only lowercase English characters.'
    ],
    intuition: `2D DP Table: Let \`dp[i][j]\` be the LCS length for substrings \`text1[i:]\` and \`text2[j:]\`.
- If \`text1[i] == text2[j]\`: characters match! We gain +1 and advance both pointers: \`dp[i][j] = 1 + dp[i+1][j+1]\`.
- Otherwise: take the best from either advancing in text1 or text2: \`dp[i][j] = max(dp[i+1][j], dp[i][j+1])\`.`,
    pythonSolution: `def longestCommonSubsequence(text1: str, text2: str) -> int:
    """
    Bottom-up 2D grid DP.
    Time: O(M * N), Space: O(M * N).
    """
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m - 1, -1, -1):
        for j in range(n - 1, -1, -1):
            if text1[i] == text2[j]:
                dp[i][j] = 1 + dp[i + 1][j + 1]
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j + 1])
                
    return dp[0][0]`,
    pseudocode: [
      'dp = (m+1) x (n+1) grid initialized to 0',
      'for i from m-1 down to 0:',
      '    for j from n-1 down to 0:',
      '        if text1[i] == text2[j]: dp[i][j] = 1 + dp[i+1][j+1]',
      '        else: dp[i][j] = max(dp[i+1][j], dp[i][j+1])',
      'return dp[0][0]'
    ],
    timeComplexity: {
      bigO: 'O(M * N)',
      explanation: 'Fills an M x N dynamic programming grid.'
    },
    spaceComplexity: {
      bigO: 'O(M * N)',
      explanation: 'Matrix of dimensions (M + 1) by (N + 1).'
    },
    generateSteps: () => {
      const text1 = 'ace';
      const text2 = 'abcde';
      const steps: Blind75Step[] = [];
      const dpTable = [
        [3, 2, 2, 1, 1, 0],
        [2, 2, 2, 1, 1, 0],
        [1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0]
      ];

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Initialize (m+1) x (n+1) grid with zeroes for base cases.',
        action: 'inspect',
        variables: { text1, text2 },
        visualData: {
          kind: 'dp-table',
          dpTable,
          dpRowLabels: ['a', 'c', 'e', '∅'],
          dpColLabels: ['a', 'b', 'c', 'd', 'e', '∅']
        }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 4,
        description: "Match found: text1[0]='a' matches text2[0]='a'! Value = 1 + dp[1][1] = 3.",
        action: 'match',
        variables: { match: 'a', lcs: 3 },
        visualData: {
          kind: 'dp-table',
          dpTable,
          activeDpCell: { r: 0, c: 0 },
          dpRowLabels: ['a', 'c', 'e', '∅'],
          dpColLabels: ['a', 'b', 'c', 'd', 'e', '∅'],
          badgeNote: 'LCS Length: 3 ("ace")'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 20. Word Break (#139)
  {
    id: 'word-break',
    number: 139,
    title: 'Word Break',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    pattern: '1D DP Segmentation',
    grindWeek: 6,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/word-break/',
    summary: 'Determine if a string can be segmented into space-separated dictionary words.',
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.`,
    examples: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: 'true', explanation: 'Return true because "leetcode" can be segmented as "leet code".' },
      { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: 'true' }
    ],
    constraints: [
      '1 <= s.length <= 300',
      '1 <= wordDict.length <= 1000'
    ],
    intuition: `1D DP: Let \`dp[i]\` be \`True\` if prefix \`s[:i]\` can be formed using dictionary words.
Initialize \`dp[0] = True\` (empty prefix).
For each index \`i\` from 1 to \`len(s)\`, check every index \`j < i\`:
\`if dp[j] and s[j:i] in word_set: dp[i] = True; break\`.`,
    pythonSolution: `def wordBreak(s: str, wordDict: list[str]) -> bool:
    """
    1D DP where dp[i] indicates prefix s[:i] validity.
    Time: O(N^2 * L), Space: O(N).
    """
    words = set(wordDict)
    dp = [False] * (len(s) + 1)
    dp[0] = True
    
    for i in range(1, len(s) + 1):
        for j in range(i):
            if dp[j] and s[j:i] in words:
                dp[i] = True
                break
                
    return dp[len(s)]`,
    pseudocode: [
      'dp = array of size len(s)+1 filled with False',
      'dp[0] = True',
      'for i from 1 to len(s):',
      '    for j from 0 to i-1:',
      '        if dp[j] and s[j:i] in wordDict:',
      '            dp[i] = True; break',
      'return dp[len(s)]'
    ],
    timeComplexity: {
      bigO: 'O(N^2 * L)',
      explanation: 'Two nested loops over length N with substring slicing of length L.'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'DP boolean array of length N + 1.'
    },
    generateSteps: () => {
      const s = 'leetcode';
      const dp = [true, false, false, false, true, false, false, false, true];
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 2,
        description: 'Initialize dp[0] = True (empty string base case). Words: ["leet", "code"].',
        action: 'inspect',
        variables: { s, 'dp[0]': true },
        visualData: { kind: 'dp-table', dp1D: [1, 0, 0, 0, 0, 0, 0, 0, 0] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 5,
        description: 'At i = 4: dp[0] is True and s[0:4] = "leet" is in dictionary -> dp[4] = True.',
        action: 'match',
        variables: { prefix: 'leet', 'dp[4]': true },
        visualData: {
          kind: 'dp-table',
          dp1D: [1, 0, 0, 0, 1, 0, 0, 0, 0],
          activeDpCell: { index: 4 },
          badgeNote: 'Matched "leet"'
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 5,
        description: 'At i = 8: dp[4] is True and s[4:8] = "code" is in dictionary -> dp[8] = True! Success.',
        action: 'return',
        variables: { full_string: 'leetcode', valid: true },
        visualData: {
          kind: 'dp-table',
          dp1D: [1, 0, 0, 0, 1, 0, 0, 0, 1],
          activeDpCell: { index: 8 },
          badgeNote: 'Valid segmentation: "leet" + "code"'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 21. Combination Sum IV (#377)
  {
    id: 'combination-sum-iv',
    number: 377,
    title: 'Combination Sum IV',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    pattern: 'Permutations DP',
    grindWeek: 5,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/combination-sum-iv/',
    summary: 'Find the number of possible combinations that add up to a target positive integer.',
    description: `Given an array of distinct integers \`nums\` and a target integer \`target\`, return the number of possible combinations that add up to \`target\`.`,
    examples: [
      { input: 'nums = [1, 2, 3], target = 4', output: '7', explanation: 'The possible combination ways are: (1, 1, 1, 1), (1, 1, 2), (1, 2, 1), (1, 3), (2, 1, 1), (2, 2), (3, 1).' }
    ],
    constraints: [
      '1 <= nums.length <= 200',
      '1 <= nums[i] <= 1000',
      '1 <= target <= 1000'
    ],
    intuition: `Because different permutations count as distinct combinations, loop through each target sum \`t\` first, then try every number \`num\` in \`nums\`:
\`dp[t] += dp[t - num]\` whenever \`t - num >= 0\`. Base case: \`dp[0] = 1\`.`,
    pythonSolution: `def combinationSum4(nums: list[int], target: int) -> int:
    """
    Bottom-up DP for target permutations.
    Time: O(target * len(nums)), Space: O(target).
    """
    dp = [0] * (target + 1)
    dp[0] = 1
    
    for t in range(1, target + 1):
        for num in nums:
            if t - num >= 0:
                dp[t] += dp[t - num]
                
    return dp[target]`,
    pseudocode: [
      'dp = array of size target + 1 filled with 0',
      'dp[0] = 1',
      'for t from 1 to target:',
      '    for num in nums:',
      '        if t - num >= 0:',
      '            dp[t] += dp[t - num]',
      'return dp[target]'
    ],
    timeComplexity: {
      bigO: 'O(target * N)',
      explanation: 'Iterates through target values, testing each of N candidates.'
    },
    spaceComplexity: {
      bigO: 'O(target)',
      explanation: '1D DP array of size target + 1.'
    },
    generateSteps: () => {
      const nums = [1, 2, 3];
      const target = 4;
      const dp = [1, 1, 2, 4, 7];
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 5,
        line: 2,
        description: 'Initialize dp[0] = 1. Target = 4, nums = [1, 2, 3].',
        action: 'inspect',
        variables: { target, 'dp[0]': 1 },
        visualData: { kind: 'dp-table', dp1D: [1, 0, 0, 0, 0] }
      });

      for (let t = 1; t <= target; t++) {
        const curArr = [1, 0, 0, 0, 0];
        for (let j = 0; j <= t; j++) curArr[j] = dp[j];
        steps.push({
          stepIndex: steps.length,
          totalSteps: 5,
          line: 6,
          description: `Target ${t}: dp[${t}] = ${dp[t]} valid permutations.`,
          action: 'update',
          variables: { target: t, permutations: dp[t] },
          visualData: {
            kind: 'dp-table',
            dp1D: curArr,
            activeDpCell: { index: t },
            badgeNote: `Sum ${t}: ${dp[t]} ways`
          }
        });
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 22. House Robber (#198)
  {
    id: 'house-robber',
    number: 198,
    title: 'House Robber',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    pattern: 'Include / Exclude DP',
    grindWeek: 8,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/house-robber/',
    summary: 'Find the maximum money you can rob tonight without alerting adjacent houses.',
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, the only constraint stopping you from robbing each of them is that adjacent houses have security systems connected and it will automatically contact the police if two adjacent houses were broken into on the same night.

Given an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.`,
    examples: [
      { input: 'nums = [1, 2, 3, 1]', output: '4', explanation: 'Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 1 + 3 = 4.' },
      { input: 'nums = [2, 7, 9, 3, 1]', output: '12', explanation: 'Rob house 1 (2), house 3 (9), and house 5 (1). Total = 12.' }
    ],
    constraints: [
      '1 <= nums.length <= 100',
      '0 <= nums[i] <= 400'
    ],
    intuition: `At each house \`i\`, there are two choices:
1. Rob this house: gains \`nums[i] + rob(i - 2)\`.
2. Skip this house: retain the best profit up to the previous house: \`rob(i - 1)\`.
Recurrence: \`dp[i] = max(nums[i] + dp[i - 2], dp[i - 1])\`. This can be solved in O(1) space using two variables \`rob1\` and \`rob2\`.`,
    pythonSolution: `def rob(nums: list[int]) -> int:
    """
    Include/exclude DP with two rolling variables.
    Time: O(N), Space: O(1).
    """
    rob1, rob2 = 0, 0
    # [rob1, rob2, num, ...]
    for num in nums:
        new_rob = max(num + rob1, rob2)
        rob1 = rob2
        rob2 = new_rob
    return rob2`,
    pseudocode: [
      'rob1 = 0, rob2 = 0',
      'for each num in nums:',
      '    new_rob = max(num + rob1, rob2)',
      '    rob1 = rob2',
      '    rob2 = new_rob',
      'return rob2'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Linear single-pass over the street of houses.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Two rolling variables tracking max profit.'
    },
    generateSteps: () => {
      const nums = [2, 7, 9, 3, 1];
      const steps: Blind75Step[] = [];
      let rob1 = 0, rob2 = 0;

      for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const newRob = Math.max(num + rob1, rob2);
        rob1 = rob2;
        rob2 = newRob;

        steps.push({
          stepIndex: steps.length,
          totalSteps: nums.length,
          line: 3,
          description: `House ${i} ($${num}): max(rob current + skip previous = ${num} + ${rob1}, skip current = ${rob2}) -> max = $${newRob}.`,
          action: 'update',
          variables: { house: i, money: num, best_so_far: newRob },
          visualData: {
            kind: 'array-pointers',
            array: nums,
            activeIndices: [i],
            pointers: [{ name: `$${newRob}`, index: i, color: 'var(--success-500)' }],
            badgeNote: `Running Max: $${newRob}`
          }
        });
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 23. House Robber II (#213)
  {
    id: 'house-robber-ii',
    number: 213,
    title: 'House Robber II',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    pattern: 'Include / Exclude DP (Circular)',
    grindWeek: 8,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/house-robber-ii/',
    summary: 'Rob houses arranged in a circle such that the first and last houses are adjacent.',
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed. All houses at this place are arranged in a circle. That means the first house is the neighbor of the last one.

Given an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police.`,
    examples: [
      { input: 'nums = [2, 3, 2]', output: '3', explanation: 'You cannot rob house 1 and house 3 together because they are adjacent in a circle.' },
      { input: 'nums = [1, 2, 3, 1]', output: '4' }
    ],
    constraints: [
      '1 <= nums.length <= 100',
      '0 <= nums[i] <= 1000'
    ],
    intuition: `Because house 0 and house N-1 are adjacent in a circle, you cannot rob both.
Split the circular street into two independent linear House Robber subproblems:
1. Rob houses from index \`0\` to \`N - 2\` (exclude the last house).
2. Rob houses from index \`1\` to \`N - 1\` (exclude the first house).
The answer is \`max(nums[0], robLinear(nums[:-1]), robLinear(nums[1:]))\`.`,
    pythonSolution: `def rob(nums: list[int]) -> int:
    """
    Circular robber: max of excluding first house vs excluding last house.
    Time: O(N), Space: O(1).
    """
    def helper(sub):
        r1, r2 = 0, 0
        for n in sub:
            r1, r2 = r2, max(n + r1, r2)
        return r2

    if len(nums) == 1:
        return nums[0]
    return max(helper(nums[:-1]), helper(nums[1:]))`,
    pseudocode: [
      'if len(nums) == 1: return nums[0]',
      'case1 = robLinear(nums[0 : len-1]) # exclude last house',
      'case2 = robLinear(nums[1 : len])   # exclude first house',
      'return max(case1, case2)'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Runs two linear passes of length N - 1.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Constant auxiliary variables.'
    },
    generateSteps: () => {
      const nums = [2, 3, 2];
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Circular arrangement: House 0 ($2) and House 2 ($2) are adjacent neighbors.',
        action: 'inspect',
        variables: { houses: nums.join(', ') },
        visualData: { kind: 'array-pointers', array: nums, activeIndices: [0, 2] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 2,
        description: 'Case 1: Exclude last house -> nums[0..1] = [2, 3]. Best = $3.',
        action: 'update',
        variables: { case1: 3 },
        visualData: { kind: 'array-pointers', array: [2, 3], activeIndices: [1], pointers: [{ name: 'Best 1', index: 1 }] }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 4,
        description: 'Case 2: Exclude first house -> nums[1..2] = [3, 2]. Best = $3. Final answer = max(3, 3) = $3.',
        action: 'return',
        variables: { final_max: 3 },
        visualData: {
          kind: 'array-pointers',
          array: nums,
          activeIndices: [1],
          pointers: [{ name: 'WINNER', index: 1, color: 'var(--success-500)' }],
          badgeNote: 'Max Loot: $3'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 24. Decode Ways (#91)
  {
    id: 'decode-ways',
    number: 91,
    title: 'Decode Ways',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    pattern: 'Fibonacci-like String DP',
    grindWeek: 6,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/decode-ways/',
    summary: 'Find the total number of ways to decode a message of digits mapped to A-Z.',
    description: `A message containing letters from A-Z can be encoded into numbers using the following mapping:
'A' -> "1", 'B' -> "2", ..., 'Z' -> "26".

Given a string \`s\` containing only digits, return the number of ways to decode it.`,
    examples: [
      { input: 's = "12"', output: '2', explanation: '"12" could be decoded as "AB" (1 2) or "L" (12).' },
      { input: 's = "226"', output: '3', explanation: 'Decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).' },
      { input: 's = "06"', output: '0', explanation: '"06" cannot be mapped to any letter because \'06\' has leading zeros.' }
    ],
    constraints: [
      '1 <= s.length <= 100',
      's contains only digits and may contain leading zero(s).'
    ],
    intuition: `Let \`dp[i]\` be the number of ways to decode substring \`s[:i]\`.
1. Single digit: if \`s[i-1] != '0'\`, we can take it as a 1-digit code: \`dp[i] += dp[i-1]\`.
2. Two digits: if \`10 <= int(s[i-2:i]) <= 26\`, we can take the two digits together: \`dp[i] += dp[i-2]\`.`,
    pythonSolution: `def numDecodings(s: str) -> int:
    """
    Linear DP decoding ways with 1-digit and 2-digit transitions.
    Time: O(N), Space: O(1).
    """
    if not s or s[0] == '0':
        return 0
        
    two_back, one_back = 1, 1
    for i in range(1, len(s)):
        current = 0
        # Single digit decode
        if s[i] != '0':
            current += one_back
        # Two digit decode
        two_digit = int(s[i-1:i+1])
        if 10 <= two_digit <= 26:
            current += two_back
            
        two_back, one_back = one_back, current
        
    return one_back`,
    pseudocode: [
      'if s[0] == "0": return 0',
      'two_back = 1, one_back = 1',
      'for i from 1 to len(s)-1:',
      '    current = 0',
      '    if s[i] != "0": current += one_back',
      '    if 10 <= int(s[i-1:i+1]) <= 26: current += two_back',
      '    two_back = one_back; one_back = current',
      'return one_back'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Processes each digit in constant time.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Only tracks two previous decoding totals.'
    },
    generateSteps: () => {
      const s = '226';
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 2,
        description: 'Digit 0 = "2": valid non-zero digit. Ways = 1.',
        action: 'inspect',
        variables: { s, 'ways(2)': 1 },
        visualData: { kind: 'array-pointers', array: ['2', '2', '6'], activeIndices: [0] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 5,
        description: 'Digit 1 = "2": single "2" is valid, and pair "22" <= 26 is valid -> Ways = 2 ("BB", "V").',
        action: 'update',
        variables: { prefix: '22', ways: 2 },
        visualData: { kind: 'array-pointers', array: ['2', '2', '6'], activeIndices: [0, 1] }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 5,
        description: 'Digit 2 = "6": single "6" is valid (2 ways) + pair "26" <= 26 is valid (1 way) -> Total Ways = 3.',
        action: 'return',
        variables: { full: '226', total_ways: 3 },
        visualData: {
          kind: 'array-pointers',
          array: ['2', '2', '6'],
          activeIndices: [0, 1, 2],
          badgeNote: 'Decodings: "BZ", "VF", "BBF" (3 ways)'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 25. Unique Paths (#62)
  {
    id: 'unique-paths',
    number: 62,
    title: 'Unique Paths',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    pattern: '2D Grid DP / Combinatorics',
    grindWeek: 6,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/unique-paths/',
    summary: 'Find the number of possible unique paths from top-left to bottom-right of an m x n grid.',
    description: `There is a robot on an \`m x n\` grid. The robot is initially located at the top-left corner (\`grid[0][0]\`). The robot tries to move to the bottom-right corner (\`grid[m - 1][n - 1]\`). The robot can only move either down or right at any point in time.

Given the two integers \`m\` and \`n\`, return the number of possible unique paths that the robot can take to reach the bottom-right corner.`,
    examples: [
      { input: 'm = 3, n = 7', output: '28' },
      { input: 'm = 3, n = 2', output: '3', explanation: 'Three ways: Right->Down->Down, Down->Down->Right, Down->Right->Down.' }
    ],
    constraints: [
      '1 <= m, n <= 100'
    ],
    intuition: `Any cell \`(r, c)\` can only be reached from its top neighbor \`(r - 1, c)\` or left neighbor \`(r, c - 1)\`.
Therefore: \`dp[r][c] = dp[r - 1][c] + dp[r][c - 1]\`.
Space can be optimized to a single 1D row of size \`n\` by updating left-to-right.`,
    pythonSolution: `def uniquePaths(m: int, n: int) -> int:
    """
    1D row dynamic programming.
    Time: O(M * N), Space: O(N).
    """
    row = [1] * n
    for _ in range(m - 1):
        for j in range(1, n):
            row[j] += row[j - 1]
    return row[-1]`,
    pseudocode: [
      'row = array of size n filled with 1',
      'repeat m-1 times:',
      '    for j from 1 to n-1:',
      '        row[j] = row[j] + row[j-1]',
      'return row[n-1]'
    ],
    timeComplexity: {
      bigO: 'O(M * N)',
      explanation: 'Processes each cell in an M x N grid.'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'Only stores a single row of size N.'
    },
    generateSteps: () => {
      const m = 3, n = 3;
      const steps: Blind75Step[] = [];
      const grid = [
        [1, 1, 1],
        [1, 2, 3],
        [1, 3, 6]
      ];

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Initialize grid: top row and left column have exactly 1 way to reach.',
        action: 'inspect',
        variables: { m, n },
        visualData: {
          kind: 'matrix',
          grid: [
            [1, 1, 1],
            [1, 0, 0],
            [1, 0, 0]
          ],
          activeCell: { r: 0, c: 0 }
        }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 3,
        description: 'Fill inner cells: dp[1][1] = top(1) + left(1) = 2. dp[1][2] = 2 + 1 = 3.',
        action: 'update',
        variables: { 'dp[1][1]': 2, 'dp[1][2]': 3 },
        visualData: {
          kind: 'matrix',
          grid: [
            [1, 1, 1],
            [1, 2, 3],
            [1, 0, 0]
          ],
          activeCell: { r: 1, c: 2 }
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 5,
        description: 'Bottom-right cell [2, 2]: top(3) + left(3) = 6 total unique paths!',
        action: 'return',
        variables: { total_paths: 6 },
        visualData: {
          kind: 'matrix',
          grid,
          activeCell: { r: 2, c: 2 },
          badgeNote: 'Total Unique Paths: 6'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 26. Jump Game (#55)
  {
    id: 'jump-game',
    number: 55,
    title: 'Jump Game',
    category: 'Dynamic Programming',
    difficulty: 'Medium',
    pattern: 'Greedy Farthest Reach',
    grindWeek: 6,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/jump-game/',
    summary: 'Determine if you are able to reach the last index starting from index 0.',
    description: `You are given an integer array \`nums\`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.

Return \`true\` if you can reach the last index, or \`false\` otherwise.`,
    examples: [
      { input: 'nums = [2, 3, 1, 1, 4]', output: 'true', explanation: 'Jump 1 step from index 0 to 1, then 3 steps to the last index.' },
      { input: 'nums = [3, 2, 1, 0, 4]', output: 'false', explanation: 'You will always arrive at index 3. Its maximum jump length is 0, which makes it impossible to reach the last index.' }
    ],
    constraints: [
      '1 <= nums.length <= 10^4',
      '0 <= nums[i] <= 10^5'
    ],
    intuition: `Greedy approach: Walk from left to right while maintaining \`max_reach\` (the farthest index reachable so far).
If the current index \`i > max_reach\`, we are stranded; return \`False\`.
Otherwise update \`max_reach = max(max_reach, i + nums[i])\`. If \`max_reach >= len(nums) - 1\`, return \`True\`.`,
    pythonSolution: `def canJump(nums: list[int]) -> bool:
    """
    Greedy farthest reach tracking.
    Time: O(N), Space: O(1).
    """
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + jump)
        if max_reach >= len(nums) - 1:
            return True
    return True`,
    pseudocode: [
      'max_reach = 0',
      'for i from 0 to len(nums)-1:',
      '    if i > max_reach: return False',
      '    max_reach = max(max_reach, i + nums[i])',
      '    if max_reach >= len(nums) - 1: return True',
      'return True'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Single linear scan of the array.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Only tracks a single scalar integer max_reach.'
    },
    generateSteps: () => {
      const nums = [2, 3, 1, 1, 4];
      const steps: Blind75Step[] = [];
      let maxReach = 0;

      for (let i = 0; i < nums.length; i++) {
        const jump = nums[i];
        maxReach = Math.max(maxReach, i + jump);

        steps.push({
          stepIndex: steps.length,
          totalSteps: nums.length,
          line: 4,
          description: `Index ${i} (jump = ${jump}): max_reach = max(${maxReach}, ${i} + ${jump}) = ${maxReach}. ${maxReach >= nums.length - 1 ? 'Last index reachable!' : ''}`,
          action: maxReach >= nums.length - 1 ? 'return' : 'update',
          variables: { i, jump, max_reach: maxReach, target: nums.length - 1 },
          visualData: {
            kind: 'array-pointers',
            array: nums,
            activeIndices: [i],
            pointers: [
              { name: 'curr', index: i, color: 'var(--primary-500)' },
              { name: 'reach', index: Math.min(maxReach, nums.length - 1), color: 'var(--success-500)' }
            ],
            badgeNote: `Farthest Reach: Index ${maxReach}`
          }
        });

        if (maxReach >= nums.length - 1) break;
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  }
];
