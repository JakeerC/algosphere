import { Blind75Problem, Blind75Step } from '../../types/blind75';

export const BINARY_PROBLEMS: Blind75Problem[] = [
  // 11. Sum of Two Integers (#371)
  {
    id: 'sum-of-two-integers',
    number: 371,
    title: 'Sum of Two Integers',
    category: 'Binary',
    difficulty: 'Medium',
    pattern: 'Bitwise XOR & AND Carry',
    grindWeek: 2,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/sum-of-two-integers/',
    summary: 'Calculate the sum of two integers without using the + or - operators.',
    description: `Given two integers \`a\` and \`b\`, return the sum of the two integers without using the operators \`+\` and \`-\`.`,
    examples: [
      { input: 'a = 1, b = 2', output: '3' },
      { input: 'a = 2, b = 3', output: '5' }
    ],
    constraints: [
      '-1000 <= a, b <= 1000'
    ],
    intuition: `Bitwise XOR (\`a ^ b\`) calculates addition without carry (summing bits where at most one is 1).
Bitwise AND (\`a & b\`) identifies positions where both bits are 1, generating a carry. Shift the carry left by 1 (\`(a & b) << 1\`) and add it repeatedly until no carries remain. In Python, apply a 32-bit mask \`0xFFFFFFFF\` to handle 2's complement negative numbers.`,
    pythonSolution: `def getSum(a: int, b: int) -> int:
    """
    Simulate half-adder logic using XOR and AND bitwise operations.
    Mask to 32-bit integers in Python.
    """
    mask = 0xFFFFFFFF
    while b & mask != 0:
        carry = (a & b) << 1
        a = a ^ b
        b = carry
    return a & mask if b > 0 else a`,
    pseudocode: [
      'while b != 0:',
      '    carry = (a & b) << 1',
      '    a = a ^ b',
      '    b = carry',
      'return a'
    ],
    timeComplexity: {
      bigO: 'O(1)',
      explanation: 'At most 32 iterations for 32-bit integers.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Constant auxiliary register memory.'
    },
    generateSteps: () => {
      let a = 2, b = 3;
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 4,
        line: 1,
        description: `Initial state: a = ${a} (${a.toString(2)}₂), b = ${b} (${b.toString(2)}₂).`,
        action: 'inspect',
        variables: { a, b, 'a_bin': a.toString(2), 'b_bin': b.toString(2) },
        visualData: {
          kind: 'binary-bits',
          bits: a.toString(2).padStart(8, '0'),
          mask: b.toString(2).padStart(8, '0'),
          decimalValue: a,
          badgeNote: `a = ${a}, b = ${b}`
        }
      });

      let iter = 1;
      while (b !== 0 && iter < 10) {
        const carry = (a & b) << 1;
        const xorSum = a ^ b;

        steps.push({
          stepIndex: steps.length,
          totalSteps: 4,
          line: 2,
          description: `Iteration ${iter}: carry = (a & b) << 1 = (${a} & ${b}) << 1 = ${carry}. New a = a ^ b = ${xorSum}.`,
          action: 'update',
          variables: { a: xorSum, b: carry, carry, 'xorSum': xorSum },
          visualData: {
            kind: 'binary-bits',
            bits: xorSum.toString(2).padStart(8, '0'),
            mask: carry.toString(2).padStart(8, '0'),
            decimalValue: xorSum,
            badgeNote: `Sum (XOR): ${xorSum} | Carry: ${carry}`
          }
        });

        a = xorSum;
        b = carry;
        iter++;
      }

      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        line: 5,
        description: `Carry is now 0! Final result sum = ${a}.`,
        action: 'return',
        variables: { final_sum: a },
        visualData: {
          kind: 'binary-bits',
          bits: a.toString(2).padStart(8, '0'),
          decimalValue: a,
          badgeNote: `Final Sum: ${a}`
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 12. Number of 1 Bits (#191)
  {
    id: 'number-of-1-bits',
    number: 191,
    title: 'Number of 1 Bits',
    category: 'Binary',
    difficulty: 'Easy',
    pattern: "Brian Kernighan's Bit Trick",
    grindWeek: 2,
    estimatedMinutes: 15,
    leetcodeUrl: 'https://leetcode.com/problems/number-of-1-bits/',
    summary: 'Count the number of set bits (Hamming weight) of a positive integer.',
    description: `Given a positive integer \`n\`, write a function that returns the number of set bits it has (also known as the Hamming weight).`,
    examples: [
      { input: 'n = 11 (00000000000000000000000000001011)', output: '3', explanation: 'The input binary string has a total of three set bits.' },
      { input: 'n = 128 (00000000000000000000000010000000)', output: '1' }
    ],
    constraints: [
      '1 <= n <= 2^31 - 1'
    ],
    intuition: `Brian Kernighan's algorithm uses the bitwise operation \`n = n & (n - 1)\`.
Subtracting 1 from \`n\` flips all bits up to and including the lowest set bit. Performing bitwise AND with the original \`n\` clears that lowest set bit in exactly one operation. Thus, the loop executes exactly as many times as there are 1s!`,
    pythonSolution: `def hammingWeight(n: int) -> int:
    """
    Brian Kernighan's algorithm: clears least significant set bit each iteration.
    Time: O(number of set bits), Space: O(1).
    """
    count = 0
    while n:
        n &= n - 1
        count += 1
    return count`,
    pseudocode: [
      'count = 0',
      'while n > 0:',
      '    n = n & (n - 1)  # Clear the lowest set bit',
      '    count++',
      'return count'
    ],
    timeComplexity: {
      bigO: 'O(k)',
      explanation: 'Where k is the count of 1 bits (at most 32).'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Only an integer counter is stored.'
    },
    generateSteps: () => {
      let n = 11; // 1011 in binary
      const steps: Blind75Step[] = [];
      let count = 0;

      steps.push({
        stepIndex: 0,
        totalSteps: 4,
        line: 1,
        description: `Initial binary representation of ${n}: 00001011₂. Count = 0.`,
        action: 'inspect',
        variables: { n, binary: '1011', count: 0 },
        visualData: {
          kind: 'binary-bits',
          bits: n.toString(2).padStart(8, '0'),
          decimalValue: n,
          badgeNote: `Count: 0`
        }
      });

      while (n > 0) {
        const prevN = n;
        n = n & (n - 1);
        count++;
        steps.push({
          stepIndex: steps.length,
          totalSteps: 4,
          line: 3,
          description: `Kernighan bit trick: ${prevN} & ${prevN - 1} cleared the lowest set bit. Remaining n = ${n} (${n.toString(2)}₂). Count = ${count}.`,
          action: 'update',
          variables: { prev_n: prevN, n, count },
          visualData: {
            kind: 'binary-bits',
            bits: n.toString(2).padStart(8, '0'),
            decimalValue: n,
            badgeNote: `Set Bits Counted: ${count}`
          }
        });
      }

      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        line: 5,
        description: `n reached 0! Total number of 1-bits = ${count}.`,
        action: 'return',
        variables: { total_bits: count },
        visualData: {
          kind: 'binary-bits',
          bits: '00000000',
          decimalValue: 0,
          badgeNote: `Total 1s: ${count}`
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 13. Counting Bits (#338)
  {
    id: 'counting-bits',
    number: 338,
    title: 'Counting Bits',
    category: 'Binary',
    difficulty: 'Easy',
    pattern: 'Bit DP / Subproblem Relation',
    grindWeek: 2,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/counting-bits/',
    summary: 'Return an array ans where ans[i] is the number of 1s in the binary representation of each number from 0 to n.',
    description: `Given an integer \`n\`, return an array \`ans\` of length \`n + 1\` such that for each \`i\` (\`0 <= i <= n\`), \`ans[i]\` is the number of \`1\`'s in the binary representation of \`i\`.`,
    examples: [
      { input: 'n = 2', output: '[0, 1, 1]', explanation: '0 -> 0, 1 -> 1, 2 -> 10' },
      { input: 'n = 5', output: '[0, 1, 1, 2, 1, 2]' }
    ],
    constraints: [
      '0 <= n <= 10^5'
    ],
    intuition: `Dynamic Programming with bit shift: Notice that \`i >> 1\` is \`i // 2\`, whose 1-bits we have already computed!
The only difference between \`i\` and \`i >> 1\` is the lowest bit, which is \`i & 1\`.
Therefore: \`ans[i] = ans[i >> 1] + (i & 1)\` in O(1) time per number!`,
    pythonSolution: `def countBits(n: int) -> list[int]:
    """
    DP formula: ans[i] = ans[i >> 1] + (i & 1).
    Time: O(N), Space: O(1) extra.
    """
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i >> 1] + (i & 1)
    return dp`,
    pseudocode: [
      'dp = array of size n + 1 initialized with 0',
      'for i from 1 to n:',
      '    dp[i] = dp[i >> 1] + (i & 1)',
      'return dp'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Computes each entry in O(1) arithmetic operations.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'No auxiliary space besides the returned output array.'
    },
    generateSteps: () => {
      const n = 5;
      const dp = [0, 0, 0, 0, 0, 0];
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 6,
        line: 1,
        description: 'Initialize dp table with dp[0] = 0 (binary 0 has zero 1-bits).',
        action: 'inspect',
        variables: { i: 0, 'dp[0]': 0 },
        visualData: { kind: 'array-pointers', array: [...dp], pointers: [] }
      });

      for (let i = 1; i <= n; i++) {
        dp[i] = dp[i >> 1] + (i & 1);
        steps.push({
          stepIndex: steps.length,
          totalSteps: 6,
          line: 3,
          description: `i = ${i} (${i.toString(2)}₂): dp[${i >> 1}] + (${i} & 1) = ${dp[i >> 1]} + ${i & 1} = ${dp[i]}.`,
          action: 'update',
          variables: { i, 'i >> 1': i >> 1, 'i & 1': i & 1, 'dp[i]': dp[i] },
          visualData: {
            kind: 'array-pointers',
            array: [...dp],
            activeIndices: [i],
            secondaryIndices: [i >> 1],
            pointers: [{ name: `dp[${i}]`, index: i, color: 'var(--success-500)' }]
          }
        });
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 14. Missing Number (#268)
  {
    id: 'missing-number',
    number: 268,
    title: 'Missing Number',
    category: 'Binary',
    difficulty: 'Easy',
    pattern: 'Bitwise XOR Cancellation / Gauss Formula',
    grindWeek: 2,
    estimatedMinutes: 15,
    leetcodeUrl: 'https://leetcode.com/problems/missing-number/',
    summary: 'Find the one number missing from the range [0, n] in an array.',
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return the only number in the range that is missing from the array.`,
    examples: [
      { input: 'nums = [3, 0, 1]', output: '2', explanation: 'n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number.' },
      { input: 'nums = [0, 1]', output: '2' },
      { input: 'nums = [9, 6, 4, 2, 3, 5, 7, 0, 1]', output: '8' }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 10^4',
      '0 <= nums[i] <= n',
      'All the numbers of nums are unique.'
    ],
    intuition: `Bitwise XOR property: \`x ^ x = 0\` and \`x ^ 0 = x\`.
If we XOR all expected numbers from \`0\` to \`n\` AND all numbers in \`nums\`, every present number appears twice and cancels out to 0, leaving exclusively the single missing number! Alternatively, Gauss' sum \`n * (n + 1) // 2 - sum(nums)\`.`,
    pythonSolution: `def missingNumber(nums: list[int]) -> int:
    """
    XOR all numbers from 0 to n with all numbers in nums.
    Time: O(N), Space: O(1).
    """
    missing = len(nums)
    for i, num in enumerate(nums):
        missing ^= i ^ num
    return missing`,
    pseudocode: [
      'missing = len(nums)',
      'for each index i and num in nums:',
      '    missing = missing ^ i ^ num',
      'return missing'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Iterates through the list of length N once.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Only one accumulator variable maintained.'
    },
    generateSteps: () => {
      const nums = [3, 0, 1];
      const steps: Blind75Step[] = [];
      let missing = nums.length;

      steps.push({
        stepIndex: 0,
        totalSteps: 4,
        line: 1,
        description: `Start with missing = len(nums) = ${missing}.`,
        action: 'inspect',
        variables: { missing },
        visualData: { kind: 'array-pointers', array: nums, pointers: [] }
      });

      for (let i = 0; i < nums.length; i++) {
        const prev = missing;
        missing = missing ^ i ^ nums[i];
        steps.push({
          stepIndex: steps.length,
          totalSteps: 4,
          line: 3,
          description: `Index ${i} (num = ${nums[i]}): missing = ${prev} ^ ${i} ^ ${nums[i]} = ${missing}.`,
          action: 'update',
          variables: { i, num: nums[i], missing },
          visualData: {
            kind: 'array-pointers',
            array: nums,
            activeIndices: [i],
            pointers: [{ name: 'i', index: i, color: 'var(--primary-500)' }],
            badgeNote: `Running XOR: ${missing}`
          }
        });
      }

      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        line: 4,
        description: `All matched elements cancelled out. Missing number = ${missing}!`,
        action: 'return',
        variables: { answer: missing },
        visualData: {
          kind: 'array-pointers',
          array: nums,
          badgeNote: `Missing Number: ${missing}`
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 15. Reverse Bits (#190)
  {
    id: 'reverse-bits',
    number: 190,
    title: 'Reverse Bits',
    category: 'Binary',
    difficulty: 'Easy',
    pattern: 'Bit Shifting & Masking',
    grindWeek: 2,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/reverse-bits/',
    summary: 'Reverse the bits of a given 32 bits unsigned integer.',
    description: `Reverse bits of a given 32 bits unsigned integer.`,
    examples: [
      { input: 'n = 00000010100101000001111010011100', output: '964176192 (00111001011110000010100101000000)' }
    ],
    constraints: [
      'The input must be a binary string of length 32'
    ],
    intuition: `Iterate 32 times. In each step:
1. Shift the result left by 1 bit to make room.
2. Extract the least significant bit of \`n\` via \`n & 1\`.
3. Bitwise OR it into the result: \`res = (res << 1) | (n & 1)\`.
4. Shift \`n\` right by 1 bit: \`n >>= 1\`.`,
    pythonSolution: `def reverseBits(n: int) -> int:
    """
    Bit-by-bit reverse across 32 iterations.
    Time: O(1), Space: O(1).
    """
    res = 0
    for _ in range(32):
        res = (res << 1) | (n & 1)
        n >>= 1
    return res`,
    pseudocode: [
      'res = 0',
      'repeat 32 times:',
      '    res = (res << 1) | (n & 1)',
      '    n = n >> 1',
      'return res'
    ],
    timeComplexity: {
      bigO: 'O(1)',
      explanation: 'Always exactly 32 iterations for 32-bit integer.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Single scalar integer for reversed output.'
    },
    generateSteps: () => {
      let n = 43261596;
      let res = 0;
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 5,
        line: 1,
        description: 'Initialize res = 0. We will shift bits from n into res from right to left.',
        action: 'inspect',
        variables: { res: 0, n_bits: n.toString(2).padStart(32, '0') },
        visualData: {
          kind: 'binary-bits',
          bits: n.toString(2).padStart(32, '0'),
          mask: '0'.repeat(32),
          decimalValue: n
        }
      });

      for (let i = 0; i < 4; i++) {
        const bit = n & 1;
        res = (res << 1) | bit;
        n >>= 1;

        steps.push({
          stepIndex: steps.length,
          totalSteps: 5,
          line: 3,
          description: `Step ${i + 1}: Extracted bit ${bit}. Shifted into res -> res = ${res.toString(2)}.`,
          action: 'update',
          variables: { step: i + 1, extracted_bit: bit, res },
          visualData: {
            kind: 'binary-bits',
            bits: res.toString(2).padStart(32, '0'),
            decimalValue: res,
            badgeNote: `Bit ${bit} shifted into reversed register`
          }
        });
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  }
];
