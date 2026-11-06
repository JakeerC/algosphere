import { Blind75Problem, Blind75Step } from '../../types/blind75';

export const ARRAY_PROBLEMS: Blind75Problem[] = [
  // 1. Two Sum (#1)
  {
    id: 'two-sum',
    number: 1,
    title: 'Two Sum',
    category: 'Array',
    difficulty: 'Easy',
    pattern: 'Hash Map Lookup',
    grindWeek: 1,
    estimatedMinutes: 15,
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    summary: 'Find two indices in an array that add up to a specific target value.',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.`,
    examples: [
      { input: 'nums = [2, 7, 11, 15], target = 9', output: '[0, 1]', explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].' },
      { input: 'nums = [3, 2, 4], target = 6', output: '[1, 2]' },
      { input: 'nums = [3, 3], target = 6', output: '[0, 1]' }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    intuition: `Instead of checking all pairs in O(N^2) time, use a hash map to trade O(N) space for O(N) time. As you iterate through the array, compute the complement \`target - num\`. If the complement exists in the hash map, its stored index plus the current index form the answer. Otherwise, record the current number and index in the hash map.`,
    pythonSolution: `def twoSum(nums: list[int], target: int) -> list[int]:
    """
    Find two numbers in nums that add up to target.
    Uses a hash map (val -> index) for O(1) complement lookups.
    """
    seen: dict[int, int] = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`,
    pseudocode: [
      'seen = empty hash map (value -> index)',
      'for each index i and number num in nums:',
      '    complement = target - num',
      '    if complement in seen:',
      '        return [seen[complement], i]',
      '    seen[num] = i',
      'return []'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'We iterate through the array of length N once. Each hash table lookup and insertion operates in average O(1) time.'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'In the worst case, the hash map stores up to N - 1 elements before a match is found.'
    },
    defaultInputLabel: 'Nums & Target (format: [2, 7, 11, 15] target=9)',
    defaultInputValue: '2, 7, 11, 15 | 9',
    generateSteps: () => {
      const nums = [2, 7, 11, 15];
      const target = 9;
      const steps: Blind75Step[] = [];
      const seen: Record<string, number> = {};

      steps.push({
        stepIndex: 0,
        totalSteps: 5,
        line: 1,
        description: `Initialize empty hash map 'seen'. Target sum is ${target}.`,
        action: 'inspect',
        variables: { target, i: null, num: null, complement: null },
        visualData: {
          kind: 'hash-map',
          array: nums,
          activeIndices: [],
          pointers: [],
          targetValue: target,
          hashMap: { ...seen }
        }
      });

      for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const complement = target - num;

        steps.push({
          stepIndex: steps.length,
          totalSteps: 5,
          line: 2,
          description: `Index ${i}: Current element is ${num}. Required complement = target - num = ${target} - ${num} = ${complement}.`,
          action: 'inspect',
          variables: { target, i, num, complement },
          visualData: {
            kind: 'hash-map',
            array: nums,
            activeIndices: [i],
            pointers: [{ name: 'i', index: i, color: 'var(--primary-500)' }],
            targetValue: target,
            hashMap: { ...seen },
            activeKey: String(complement),
            lookupResult: seen[complement] !== undefined ? `Found at index ${seen[complement]}` : 'Not found'
          }
        });

        if (seen[complement] !== undefined) {
          steps.push({
            stepIndex: steps.length,
            totalSteps: 5,
            line: 5,
            description: `Match found! Complement ${complement} was previously seen at index ${seen[complement]}. Solution is [${seen[complement]}, ${i}].`,
            action: 'return',
            variables: { target, i, num, complement, solution: `[${seen[complement]}, ${i}]` },
            visualData: {
              kind: 'hash-map',
              array: nums,
              activeIndices: [seen[complement], i],
              pointers: [
                { name: 'prev', index: seen[complement], color: 'var(--success-500)' },
                { name: 'i', index: i, color: 'var(--success-500)' }
              ],
              targetValue: target,
              hashMap: { ...seen },
              lookupResult: `Found complement ${complement} at index ${seen[complement]}!`
            }
          });
          break;
        }

        seen[num] = i;
        steps.push({
          stepIndex: steps.length,
          totalSteps: 5,
          line: 6,
          description: `Complement ${complement} not in map yet. Store seen[${num}] = ${i} and proceed.`,
          action: 'advance',
          variables: { target, i, num, complement },
          visualData: {
            kind: 'hash-map',
            array: nums,
            activeIndices: [i],
            pointers: [{ name: 'i', index: i }],
            targetValue: target,
            hashMap: { ...seen }
          }
        });
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 2. Best Time to Buy and Sell Stock (#121)
  {
    id: 'best-time-to-buy-and-sell-stock',
    number: 121,
    title: 'Best Time to Buy and Sell Stock',
    category: 'Array',
    difficulty: 'Easy',
    pattern: 'Sliding Window / One Pass',
    grindWeek: 1,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    summary: 'Find the maximum profit achievable from buying on one day and selling on a future day.',
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`i\`th day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.`,
    examples: [
      { input: 'prices = [7, 1, 5, 3, 6, 4]', output: '5', explanation: 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6 - 1 = 5.' },
      { input: 'prices = [7, 6, 4, 3, 1]', output: '0', explanation: 'In this case, no transactions are done and the max profit = 0.' }
    ],
    constraints: [
      '1 <= prices.length <= 10^5',
      '0 <= prices[i] <= 10^4'
    ],
    intuition: `Maintain the minimum price seen so far (\`min_price\`). At each day \`i\`, calculate the potential profit if we sold today: \`prices[i] - min_price\`. Update \`max_profit\` whenever this potential profit exceeds our record, and update \`min_price\` whenever we discover a new lowest purchase price.`,
    pythonSolution: `def maxProfit(prices: list[int]) -> int:
    """
    Track minimum price so far and maximum profit achievable.
    Time: O(N), Space: O(1).
    """
    min_price = float('inf')
    max_profit = 0
    for price in prices:
        if price < min_price:
            min_price = price
        elif price - min_price > max_profit:
            max_profit = price - min_price
    return max_profit`,
    pseudocode: [
      'min_price = infinity, max_profit = 0',
      'for each price in prices:',
      '    if price < min_price:',
      '        min_price = price',
      '    else if price - min_price > max_profit:',
      '        max_profit = price - min_price',
      'return max_profit'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Only a single pass over the array of N prices is required.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Only two scalar variables (min_price and max_profit) are tracked throughout execution.'
    },
    generateSteps: () => {
      const prices = [7, 1, 5, 3, 6, 4];
      const steps: Blind75Step[] = [];
      let minPrice = Infinity;
      let minIdx = -1;
      let maxProfit = 0;
      let bestSellIdx = -1;

      steps.push({
        stepIndex: 0,
        totalSteps: 7,
        line: 1,
        description: 'Initialize min_price = ∞, max_profit = 0.',
        action: 'inspect',
        variables: { min_price: '∞', max_profit: 0 },
        visualData: {
          kind: 'array-pointers',
          array: prices,
          pointers: []
        }
      });

      for (let i = 0; i < prices.length; i++) {
        const p = prices[i];
        if (p < minPrice) {
          minPrice = p;
          minIdx = i;
          steps.push({
            stepIndex: steps.length,
            totalSteps: 7,
            line: 4,
            description: `Day ${i} (Price $${p}): New valley found! Updated min_price = $${minPrice}.`,
            action: 'update',
            variables: { day: i, price: p, min_price: minPrice, max_profit: maxProfit },
            visualData: {
              kind: 'array-pointers',
              array: prices,
              activeIndices: [i],
              pointers: [{ name: 'min buy', index: minIdx, color: 'var(--cat-dp)' }]
            }
          });
        } else {
          const currentProfit = p - minPrice;
          const isNewMax = currentProfit > maxProfit;
          if (isNewMax) {
            maxProfit = currentProfit;
            bestSellIdx = i;
          }
          steps.push({
            stepIndex: steps.length,
            totalSteps: 7,
            line: isNewMax ? 6 : 5,
            description: `Day ${i} (Price $${p}): Potential profit = $${p} - $${minPrice} = $${currentProfit}. ${isNewMax ? `New max profit = $${maxProfit}!` : 'Does not exceed max_profit.'}`,
            action: isNewMax ? 'update' : 'inspect',
            variables: { day: i, price: p, profit: currentProfit, max_profit: maxProfit },
            visualData: {
              kind: 'array-pointers',
              array: prices,
              activeIndices: [minIdx, i],
              pointers: [
                { name: 'buy', index: minIdx, color: 'var(--cat-dp)' },
                { name: isNewMax ? 'peak sell' : 'sell', index: i, color: 'var(--success-500)' }
              ]
            }
          });
        }
      }

      steps.push({
        stepIndex: steps.length,
        totalSteps: steps.length + 1,
        line: 7,
        description: `Finished scan! Optimal strategy: Buy at Day ${minIdx} ($${prices[minIdx]}), Sell at Day ${bestSellIdx} ($${prices[bestSellIdx]}). Total profit = $${maxProfit}.`,
        action: 'return',
        variables: { min_price: minPrice, max_profit: maxProfit, buy_day: minIdx, sell_day: bestSellIdx },
        visualData: {
          kind: 'array-pointers',
          array: prices,
          activeIndices: [minIdx, bestSellIdx],
          pointers: [
            { name: 'BUY', index: minIdx, color: 'var(--primary-500)' },
            { name: 'SELL', index: bestSellIdx, color: 'var(--success-500)' }
          ],
          badgeNote: `Max Profit: $${maxProfit}`
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 3. Contains Duplicate (#217)
  {
    id: 'contains-duplicate',
    number: 217,
    title: 'Contains Duplicate',
    category: 'Array',
    difficulty: 'Easy',
    pattern: 'Hash Set Lookup',
    grindWeek: 1,
    estimatedMinutes: 15,
    leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',
    summary: 'Check if any value appears at least twice in an integer array.',
    description: `Given an integer array \`nums\`, return \`true\` if any value appears at least twice in the array, and return \`false\` if every element is distinct.`,
    examples: [
      { input: 'nums = [1, 2, 3, 1]', output: 'true' },
      { input: 'nums = [1, 2, 3, 4]', output: 'false' },
      { input: 'nums = [1, 1, 1, 3, 3, 4, 3, 2, 4, 2]', output: 'true' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^9 <= nums[i] <= 10^9'
    ],
    intuition: `Use a hash set to store elements as you encounter them. If the current number is already in the set, a duplicate exists; return true immediately. If the loop completes without finding duplicates, return false.`,
    pythonSolution: `def containsDuplicate(nums: list[int]) -> bool:
    """
    Check if nums contains any duplicates using a set.
    Time: O(N), Space: O(N).
    """
    seen = set()
    for num in nums:
        if num in seen:
            return True
        seen.add(num)
    return False`,
    pseudocode: [
      'seen = empty hash set',
      'for each num in nums:',
      '    if num in seen:',
      '        return True',
      '    seen.add(num)',
      'return False'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Inserting and querying a hash set takes average O(1) time across N numbers.'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'In the worst case where all elements are unique, the hash set stores all N values.'
    },
    generateSteps: () => {
      const nums = [1, 2, 3, 1];
      const steps: Blind75Step[] = [];
      const seen = new Set<number>();

      steps.push({
        stepIndex: 0,
        totalSteps: 5,
        line: 1,
        description: 'Initialize empty hash set seen = {}.',
        action: 'inspect',
        variables: { seen: 'set()' },
        visualData: {
          kind: 'hash-map',
          array: nums,
          hashMap: {}
        }
      });

      for (let i = 0; i < nums.length; i++) {
        const val = nums[i];
        if (seen.has(val)) {
          steps.push({
            stepIndex: steps.length,
            totalSteps: 5,
            line: 3,
            description: `Element ${val} at index ${i} is already present in hash set! Duplicate found.`,
            action: 'return',
            variables: { num: val, duplicate: true },
            visualData: {
              kind: 'hash-map',
              array: nums,
              activeIndices: [i],
              pointers: [{ name: 'duplicate', index: i, color: 'var(--danger-500)' }],
              lookupResult: `Duplicate ${val} found!`
            }
          });
          break;
        }

        seen.add(val);
        const mapRep: Record<string, number> = {};
        seen.forEach(x => { mapRep[String(x)] = 1; });

        steps.push({
          stepIndex: steps.length,
          totalSteps: 5,
          line: 4,
          description: `Element ${val} not seen yet. Add ${val} to set and continue.`,
          action: 'advance',
          variables: { num: val, set_size: seen.size },
          visualData: {
            kind: 'hash-map',
            array: nums,
            activeIndices: [i],
            pointers: [{ name: 'i', index: i }],
            hashMap: mapRep
          }
        });
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 4. Product of Array Except Self (#238)
  {
    id: 'product-of-array-except-self',
    number: 238,
    title: 'Product of Array Except Self',
    category: 'Array',
    difficulty: 'Medium',
    pattern: 'Prefix and Suffix Products',
    grindWeek: 4,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/',
    summary: 'Calculate the product of all elements except the element at index i, without using division.',
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is guaranteed to fit in a 32-bit integer.

You must write an algorithm that runs in \`O(N)\` time and without using the division operation.`,
    examples: [
      { input: 'nums = [1, 2, 3, 4]', output: '[24, 12, 8, 6]' },
      { input: 'nums = [-1, 1, 0, -3, 3]', output: '[0, 0, 9, 0, 0]' }
    ],
    constraints: [
      '2 <= nums.length <= 10^5',
      '-30 <= nums[i] <= 30'
    ],
    intuition: `Every element's answer is: (product of elements to its left) * (product of elements to its right). We can compute all prefix products in a forward pass, then multiply by suffix products during a backward pass using a single running scalar, achieving O(1) extra space.`,
    pythonSolution: `def productExceptSelf(nums: list[int]) -> list[int]:
    """
    Two-pass prefix and suffix product without division.
    Time: O(N), Space: O(1) extra (ignoring return array).
    """
    n = len(nums)
    res = [1] * n
    
    # 1. Forward pass: prefix products
    prefix = 1
    for i in range(n):
        res[i] = prefix
        prefix *= nums[i]
        
    # 2. Backward pass: multiply by suffix products
    suffix = 1
    for i in range(n - 1, -1, -1):
        res[i] *= suffix
        suffix *= nums[i]
        
    return res`,
    pseudocode: [
      'res = array of size n filled with 1',
      'prefix = 1',
      'for i from 0 to n-1:',
      '    res[i] = prefix',
      '    prefix = prefix * nums[i]',
      'suffix = 1',
      'for i from n-1 down to 0:',
      '    res[i] = res[i] * suffix',
      '    suffix = suffix * nums[i]',
      'return res'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'One forward pass of length N and one backward pass of length N equals 2N operations = O(N).'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Excluding the output array, only two scalar variables (prefix and suffix) are utilized.'
    },
    generateSteps: () => {
      const nums = [1, 2, 3, 4];
      const res = [1, 1, 1, 1];
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 9,
        line: 1,
        description: 'Initialize result array with 1s: [1, 1, 1, 1]. Starting Forward Pass for prefix products.',
        action: 'inspect',
        variables: { prefix: 1, suffix: 1 },
        visualData: {
          kind: 'array-pointers',
          array: [...res],
          pointers: []
        }
      });

      let prefix = 1;
      for (let i = 0; i < nums.length; i++) {
        res[i] = prefix;
        steps.push({
          stepIndex: steps.length,
          totalSteps: 9,
          line: 4,
          description: `Prefix pass at index ${i}: res[${i}] = ${prefix}. Updating prefix = prefix * nums[${i}] (${nums[i]}) = ${prefix * nums[i]}.`,
          action: 'update',
          variables: { i, 'nums[i]': nums[i], 'res[i]': prefix, next_prefix: prefix * nums[i] },
          visualData: {
            kind: 'array-pointers',
            array: [...res],
            activeIndices: [i],
            pointers: [{ name: 'i', index: i, color: 'var(--primary-500)' }]
          }
        });
        prefix *= nums[i];
      }

      let suffix = 1;
      for (let i = nums.length - 1; i >= 0; i--) {
        res[i] *= suffix;
        steps.push({
          stepIndex: steps.length,
          totalSteps: 9,
          line: 8,
          description: `Suffix pass at index ${i}: Multiply res[${i}] by suffix (${suffix}) -> res[${i}] = ${res[i]}. Update suffix = suffix * nums[${i}] (${nums[i]}) = ${suffix * nums[i]}.`,
          action: 'update',
          variables: { i, 'nums[i]': nums[i], suffix, 'res[i]': res[i] },
          visualData: {
            kind: 'array-pointers',
            array: [...res],
            activeIndices: [i],
            pointers: [{ name: 'i (back)', index: i, color: 'var(--cat-dp)' }]
          }
        });
        suffix *= nums[i];
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 5. Maximum Subarray (#53)
  {
    id: 'maximum-subarray',
    number: 53,
    title: 'Maximum Subarray',
    category: 'Array',
    difficulty: 'Medium',
    pattern: "Kadane's Algorithm",
    grindWeek: 1,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/',
    summary: 'Find the contiguous subarray with the largest sum and return its sum.',
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

A subarray is a contiguous non-empty sequence of elements within an array.`,
    examples: [
      { input: 'nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]', output: '6', explanation: 'The subarray [4, -1, 2, 1] has the largest sum 6.' },
      { input: 'nums = [1]', output: '1' },
      { input: 'nums = [5, 4, -1, 7, 8]', output: '23' }
    ],
    constraints: [
      '1 <= nums.length <= 10^5',
      '-10^4 <= nums[i] <= 10^4'
    ],
    intuition: `Kadane's algorithm maintains the maximum subarray ending at the current position. At each step, decide whether to append the current number to the existing subarray or start fresh from the current number: \`current_sum = max(num, current_sum + num)\`. Track the global maximum across all steps.`,
    pythonSolution: `def maxSubArray(nums: list[int]) -> int:
    """
    Kadane's algorithm for Maximum Subarray sum.
    Time: O(N), Space: O(1).
    """
    max_sum = current_sum = nums[0]
    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)
    return max_sum`,
    pseudocode: [
      'current_sum = nums[0], max_sum = nums[0]',
      'for each num in nums[1:]:',
      '    current_sum = max(num, current_sum + num)',
      '    max_sum = max(max_sum, current_sum)',
      'return max_sum'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'A single pass examining each element once.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Only tracks two scalar accumulators: current_sum and max_sum.'
    },
    generateSteps: () => {
      const nums = [-2, 1, -3, 4, -1, 2, 1];
      const steps: Blind75Step[] = [];
      let currentSum = nums[0];
      let maxSum = nums[0];

      steps.push({
        stepIndex: 0,
        totalSteps: nums.length,
        line: 1,
        description: `Start at index 0 (val = ${nums[0]}). Set current_sum = ${currentSum}, max_sum = ${maxSum}.`,
        action: 'inspect',
        variables: { i: 0, num: nums[0], current_sum: currentSum, max_sum: maxSum },
        visualData: {
          kind: 'array-pointers',
          array: nums,
          activeIndices: [0],
          pointers: [{ name: 'start', index: 0, color: 'var(--primary-500)' }]
        }
      });

      for (let i = 1; i < nums.length; i++) {
        const num = nums[i];
        const prev = currentSum;
        currentSum = Math.max(num, currentSum + num);
        const newMax = currentSum > maxSum;
        if (newMax) maxSum = currentSum;

        steps.push({
          stepIndex: steps.length,
          totalSteps: nums.length,
          line: 3,
          description: `Index ${i} (${num}): max(${num}, ${prev} + ${num} = ${prev + num}) -> current_sum = ${currentSum}. ${newMax ? `New max_sum record = ${maxSum}!` : `max_sum remains ${maxSum}.`}`,
          action: newMax ? 'update' : 'advance',
          variables: { i, num, current_sum: currentSum, max_sum: maxSum },
          visualData: {
            kind: 'array-pointers',
            array: nums,
            activeIndices: [i],
            pointers: [{ name: 'curr', index: i, color: newMax ? 'var(--success-500)' : 'var(--primary-500)' }],
            badgeNote: `Running: ${currentSum} | Best: ${maxSum}`
          }
        });
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 6. Maximum Product Subarray (#152)
  {
    id: 'maximum-product-subarray',
    number: 152,
    title: 'Maximum Product Subarray',
    category: 'Array',
    difficulty: 'Medium',
    pattern: 'Dynamic Programming / Two Pointers',
    grindWeek: 6,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/maximum-product-subarray/',
    summary: 'Find the contiguous subarray with the largest product and return its product.',
    description: `Given an integer array \`nums\`, find a subarray that has the largest product, and return the product.

The test cases are generated so that the answer will fit in a 32-bit integer.`,
    examples: [
      { input: 'nums = [2, 3, -2, 4]', output: '6', explanation: '[2, 3] has the largest product 6.' },
      { input: 'nums = [-2, 0, -1]', output: '0', explanation: 'The result cannot be 2, because [-2, -1] is not a subarray.' }
    ],
    constraints: [
      '1 <= nums.length <= 2 * 10^4',
      '-10 <= nums[i] <= 10'
    ],
    intuition: `Because negative numbers can flip a small product into a huge positive product when multiplied by another negative, we must track both the maximum product AND minimum product ending at each position. When multiplying by a negative number, the max and min swap roles.`,
    pythonSolution: `def maxProduct(nums: list[int]) -> int:
    """
    Track both current max and min product since negatives flip signs.
    Time: O(N), Space: O(1).
    """
    res = max(nums)
    cur_min = cur_max = 1
    for n in nums:
        if n == 0:
            cur_min = cur_max = 1
            continue
        tmp = cur_max * n
        cur_max = max(n * cur_max, n * cur_min, n)
        cur_min = min(tmp, n * cur_min, n)
        res = max(res, cur_max)
    return res`,
    pseudocode: [
      'res = max(nums)',
      'cur_min = 1, cur_max = 1',
      'for each n in nums:',
      '    if n == 0: cur_min = cur_max = 1; continue',
      '    tmp = cur_max * n',
      '    cur_max = max(n * cur_max, n * cur_min, n)',
      '    cur_min = min(tmp, n * cur_min, n)',
      '    res = max(res, cur_max)',
      'return res'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Linear single-pass iteration through nums.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Constant additional space for cur_min, cur_max, and res.'
    },
    generateSteps: () => {
      const nums = [2, 3, -2, 4];
      const steps: Blind75Step[] = [];
      let curMin = 1, curMax = 1, res = Math.max(...nums);

      steps.push({
        stepIndex: 0,
        totalSteps: 5,
        line: 1,
        description: 'Initialize cur_min = 1, cur_max = 1, res = max(nums).',
        action: 'inspect',
        variables: { cur_min: 1, cur_max: 1, res },
        visualData: { kind: 'array-pointers', array: nums, pointers: [] }
      });

      for (let i = 0; i < nums.length; i++) {
        const n = nums[i];
        const tmp = curMax * n;
        curMax = Math.max(n * curMax, n * curMin, n);
        curMin = Math.min(tmp, n * curMin, n);
        res = Math.max(res, curMax);

        steps.push({
          stepIndex: steps.length,
          totalSteps: 5,
          line: 6,
          description: `Index ${i} (val = ${n}): cur_max = ${curMax}, cur_min = ${curMin}, record res = ${res}.`,
          action: 'update',
          variables: { i, n, cur_max: curMax, cur_min: curMin, res },
          visualData: {
            kind: 'array-pointers',
            array: nums,
            activeIndices: [i],
            pointers: [{ name: 'i', index: i, color: 'var(--primary-500)' }],
            badgeNote: `Max: ${curMax} | Min: ${curMin}`
          }
        });
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 7. Find Minimum in Rotated Sorted Array (#153)
  {
    id: 'find-minimum-in-rotated-sorted-array',
    number: 153,
    title: 'Find Minimum in Rotated Sorted Array',
    category: 'Array',
    difficulty: 'Medium',
    pattern: 'Modified Binary Search',
    grindWeek: 4,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
    summary: 'Find the minimum element in an array of unique elements sorted in ascending order and rotated between 1 and n times.',
    description: `Suppose an array of length \`n\` sorted in ascending order is rotated between \`1\` and \`n\` times.

Given the sorted rotated array \`nums\` of unique elements, return the minimum element of this array.

You must write an algorithm that runs in \`O(log n)\` time.`,
    examples: [
      { input: 'nums = [3, 4, 5, 1, 2]', output: '1', explanation: 'The original array was [1, 2, 3, 4, 5] rotated 3 times.' },
      { input: 'nums = [4, 5, 6, 7, 0, 1, 2]', output: '0' },
      { input: 'nums = [11, 13, 15, 17]', output: '11' }
    ],
    constraints: [
      'n == nums.length',
      '1 <= n <= 5000',
      '-5000 <= nums[i] <= 5000',
      'All integers in nums are unique.'
    ],
    intuition: `Binary search! Compare the middle element with the rightmost element:
If \`nums[mid] > nums[right]\`, the inflection point (and thus the minimum) must be strictly in the right half: \`left = mid + 1\`.
Otherwise (\`nums[mid] <= nums[right]\`), the minimum lies in the left half or is \`mid\` itself: \`right = mid\`.`,
    pythonSolution: `def findMin(nums: list[int]) -> int:
    """
    Binary search for inflection point in rotated sorted array.
    Time: O(log N), Space: O(1).
    """
    left, right = 0, len(nums) - 1
    while left < right:
        mid = (left + right) // 2
        if nums[mid] > nums[right]:
            left = mid + 1
        else:
            right = mid
    return nums[left]`,
    pseudocode: [
      'left = 0, right = len(nums) - 1',
      'while left < right:',
      '    mid = (left + right) // 2',
      '    if nums[mid] > nums[right]:',
      '        left = mid + 1',
      '    else:',
      '        right = mid',
      'return nums[left]'
    ],
    timeComplexity: {
      bigO: 'O(log N)',
      explanation: 'Each step halves the search space via binary comparison.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Only three pointer indices (left, right, mid) are needed.'
    },
    generateSteps: () => {
      const nums = [4, 5, 6, 7, 0, 1, 2];
      const steps: Blind75Step[] = [];
      let left = 0, right = nums.length - 1;

      while (left < right) {
        const mid = Math.floor((left + right) / 2);
        steps.push({
          stepIndex: steps.length,
          totalSteps: 5,
          line: 3,
          description: `Window [${left}..${right}]: mid = ${mid} (val = ${nums[mid]}), right = ${right} (val = ${nums[right]}).`,
          action: 'compare',
          variables: { left, right, mid, 'nums[mid]': nums[mid], 'nums[right]': nums[right] },
          visualData: {
            kind: 'array-pointers',
            array: nums,
            activeIndices: [mid, right],
            pointers: [
              { name: 'L', index: left, color: 'var(--primary-500)' },
              { name: 'M', index: mid, color: 'var(--cat-dp)' },
              { name: 'R', index: right, color: 'var(--danger-500)' }
            ]
          }
        });

        if (nums[mid] > nums[right]) {
          left = mid + 1;
        } else {
          right = mid;
        }
      }

      steps.push({
        stepIndex: steps.length,
        totalSteps: 5,
        line: 8,
        description: `Pointers converged at index ${left}! Minimum element is ${nums[left]}.`,
        action: 'return',
        variables: { min_index: left, min_val: nums[left] },
        visualData: {
          kind: 'array-pointers',
          array: nums,
          activeIndices: [left],
          pointers: [{ name: 'MIN', index: left, color: 'var(--success-500)' }],
          badgeNote: `Minimum: ${nums[left]}`
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 8. Search in Rotated Sorted Array (#33)
  {
    id: 'search-in-rotated-sorted-array',
    number: 33,
    title: 'Search in Rotated Sorted Array',
    category: 'Array',
    difficulty: 'Medium',
    pattern: 'Modified Binary Search',
    grindWeek: 4,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    summary: 'Search for a target value in a rotated sorted array in O(log n) time.',
    description: `There is an integer array \`nums\` sorted in ascending order (with distinct values), rotated at an unknown pivot.

Given the array \`nums\` after possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      { input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 0', output: '4' },
      { input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 3', output: '-1' },
      { input: 'nums = [1], target = 0', output: '-1' }
    ],
    constraints: [
      '1 <= nums.length <= 5000',
      '-10^4 <= nums[i] <= 10^4',
      'All values of nums are unique.'
    ],
    intuition: `In any rotated sorted array, at least one half (left or right of mid) is guaranteed to be strictly sorted. Determine which half is sorted:
- If left half is sorted (\`nums[left] <= nums[mid]\`), check if target lies between \`nums[left]\` and \`nums[mid]\`. If so, search left; else search right.
- Otherwise right half is sorted: check if target lies between \`nums[mid]\` and \`nums[right]\`. If so, search right; else search left.`,
    pythonSolution: `def search(nums: list[int], target: int) -> int:
    """
    Search target in rotated sorted array in O(log N).
    """
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        # Check if left half is sorted
        if nums[left] <= nums[mid]:
            if nums[left] <= target < nums[mid]:
                right = mid - 1
            else:
                left = mid + 1
        # Otherwise right half is sorted
        else:
            if nums[mid] < target <= nums[right]:
                left = mid + 1
            else:
                right = mid - 1
    return -1`,
    pseudocode: [
      'left = 0, right = len(nums) - 1',
      'while left <= right:',
      '    mid = (left + right) // 2',
      '    if nums[mid] == target: return mid',
      '    if nums[left] <= nums[mid]: # Left half is sorted',
      '        if nums[left] <= target < nums[mid]: right = mid - 1',
      '        else: left = mid + 1',
      '    else: # Right half is sorted',
      '        if nums[mid] < target <= nums[right]: left = mid + 1',
      '        else: right = mid - 1',
      'return -1'
    ],
    timeComplexity: {
      bigO: 'O(log N)',
      explanation: 'Binary search halves the search space each step.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Only three pointer indices maintained in memory.'
    },
    generateSteps: () => {
      const nums = [4, 5, 6, 7, 0, 1, 2];
      const target = 0;
      const steps: Blind75Step[] = [];
      let left = 0, right = nums.length - 1;

      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (nums[mid] === target) {
          steps.push({
            stepIndex: steps.length,
            totalSteps: 4,
            line: 4,
            description: `Target ${target} found at index ${mid}!`,
            action: 'return',
            variables: { mid, target, found: true },
            visualData: {
              kind: 'array-pointers',
              array: nums,
              activeIndices: [mid],
              pointers: [{ name: 'FOUND', index: mid, color: 'var(--success-500)' }],
              targetValue: target
            }
          });
          break;
        }

        const leftSorted = nums[left] <= nums[mid];
        steps.push({
          stepIndex: steps.length,
          totalSteps: 4,
          line: leftSorted ? 5 : 8,
          description: `Window [${left}..${right}]: mid = ${mid} (${nums[mid]}). ${leftSorted ? 'Left half [4..7] is sorted.' : 'Right half is sorted.'}`,
          action: 'inspect',
          variables: { left, right, mid, target, 'nums[mid]': nums[mid] },
          visualData: {
            kind: 'array-pointers',
            array: nums,
            activeIndices: [mid],
            pointers: [
              { name: 'L', index: left, color: 'var(--primary-500)' },
              { name: 'M', index: mid, color: 'var(--cat-dp)' },
              { name: 'R', index: right, color: 'var(--danger-500)' }
            ],
            targetValue: target
          }
        });

        if (leftSorted) {
          if (nums[left] <= target && target < nums[mid]) {
            right = mid - 1;
          } else {
            left = mid + 1;
          }
        } else {
          if (nums[mid] < target && target <= nums[right]) {
            left = mid + 1;
          } else {
            right = mid - 1;
          }
        }
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 9. 3Sum (#15)
  {
    id: '3sum',
    number: 15,
    title: '3Sum',
    category: 'Array',
    difficulty: 'Medium',
    pattern: 'Sorting + Two Pointers',
    grindWeek: 3,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/3sum/',
    summary: 'Find all unique triplets in an array which add up to zero.',
    description: `Given an integer array \`nums\`, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.`,
    examples: [
      { input: 'nums = [-1, 0, 1, 2, -1, -4]', output: '[[-1, -1, 2], [-1, 0, 1]]' },
      { input: 'nums = [0, 1, 1]', output: '[]' },
      { input: 'nums = [0, 0, 0]', output: '[[0, 0, 0]]' }
    ],
    constraints: [
      '3 <= nums.length <= 3000',
      '-10^5 <= nums[i] <= 10^5'
    ],
    intuition: `Sort the array first in O(N log N). Loop through each element \`i\` as the anchor. Then use two pointers (\`left = i + 1\` and \`right = len(nums) - 1\`) to find pairs adding up to \`-nums[i]\`. Skip duplicate adjacent elements to avoid duplicate triplets in the output.`,
    pythonSolution: `def threeSum(nums: list[int]) -> list[list[int]]:
    """
    Sort + Two Pointers.
    Time: O(N^2), Space: O(1) or O(N) depending on sorting.
    """
    nums.sort()
    res = []
    n = len(nums)
    
    for i in range(n - 2):
        if nums[i] > 0:
            break  # Sum can never be 0 if smallest is > 0
        if i > 0 and nums[i] == nums[i - 1]:
            continue  # Skip duplicate anchor
            
        left, right = i + 1, n - 1
        while left < right:
            total = nums[i] + nums[left] + nums[right]
            if total == 0:
                res.append([nums[i], nums[left], nums[right]])
                left += 1
                right -= 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
                while left < right and nums[right] == nums[right + 1]:
                    right -= 1
            elif total < 0:
                left += 1
            else:
                right -= 1
    return res`,
    pseudocode: [
      'sort nums in ascending order',
      'res = []',
      'for i from 0 to n-3:',
      '    if nums[i] > 0: break',
      '    if i > 0 and nums[i] == nums[i-1]: continue',
      '    left = i + 1, right = n - 1',
      '    while left < right:',
      '        total = nums[i] + nums[left] + nums[right]',
      '        if total == 0: add triplet, skip duplicate pointers',
      '        else if total < 0: left++',
      '        else: right--',
      'return res'
    ],
    timeComplexity: {
      bigO: 'O(N^2)',
      explanation: 'Sorting takes O(N log N). The outer loop runs N times and the inner two-pointer scan runs in O(N), yielding O(N^2) total.'
    },
    spaceComplexity: {
      bigO: 'O(1) to O(N)',
      explanation: 'O(N) or O(log N) for Timsort stack space in Python; no extra data structures besides return array.'
    },
    generateSteps: () => {
      const sortedNums = [-4, -1, -1, 0, 1, 2];
      const steps: Blind75Step[] = [];
      const res: number[][] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 6,
        line: 1,
        description: 'First, sort the array: [-4, -1, -1, 0, 1, 2].',
        action: 'inspect',
        variables: { sorted: true },
        visualData: { kind: 'array-pointers', array: sortedNums, pointers: [] }
      });

      // Sample step for i = 1 (val = -1)
      const i = 1;
      let left = 2, right = 5;
      steps.push({
        stepIndex: 1,
        totalSteps: 6,
        line: 6,
        description: `Anchor i = ${i} (val = -1). Initialize left = ${left} (-1), right = ${right} (2).`,
        action: 'inspect',
        variables: { i, left, right, sum: sortedNums[i] + sortedNums[left] + sortedNums[right] },
        visualData: {
          kind: 'array-pointers',
          array: sortedNums,
          activeIndices: [i, left, right],
          pointers: [
            { name: 'i', index: i, color: 'var(--primary-500)' },
            { name: 'L', index: left, color: 'var(--cat-dp)' },
            { name: 'R', index: right, color: 'var(--danger-500)' }
          ]
        }
      });

      res.push([-1, -1, 2]);
      steps.push({
        stepIndex: 2,
        totalSteps: 6,
        line: 9,
        description: `Sum: (-1) + (-1) + 2 = 0! Triplet [-1, -1, 2] added to results.`,
        action: 'match',
        variables: { triplet: '[-1, -1, 2]', total_triplets: res.length },
        visualData: {
          kind: 'array-pointers',
          array: sortedNums,
          activeIndices: [i, left, right],
          pointers: [
            { name: 'MATCH', index: i, color: 'var(--success-500)' },
            { name: 'MATCH', index: left, color: 'var(--success-500)' },
            { name: 'MATCH', index: right, color: 'var(--success-500)' }
          ],
          badgeNote: 'Found [-1, -1, 2]'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 10. Container With Most Water (#11)
  {
    id: 'container-with-most-water',
    number: 11,
    title: 'Container With Most Water',
    category: 'Array',
    difficulty: 'Medium',
    pattern: 'Two Pointers (Shrinking Window)',
    grindWeek: 7,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/',
    summary: 'Find two lines that together with the x-axis form a container that stores the maximum amount of water.',
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`i\`th line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

Return the maximum amount of water a container can store. Notice that you may not slant the container.`,
    examples: [
      { input: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]', output: '49', explanation: 'The max area is between height[1]=8 and height[8]=7 with width=7 -> min(8,7)*7 = 49.' },
      { input: 'height = [1, 1]', output: '1' }
    ],
    constraints: [
      'n == height.length',
      '2 <= n <= 10^5',
      '0 <= height[i] <= 10^4'
    ],
    intuition: `Start with two pointers at the widest possible width: \`left = 0\` and \`right = len(height) - 1\`.
The area is limited by the shorter line: \`area = min(height[left], height[right]) * (right - left)\`.
To have any hope of finding a larger area as the width shrinks, we must move the pointer pointing to the shorter vertical bar, because keeping the shorter line can never yield a larger area with smaller width.`,
    pythonSolution: `def maxArea(height: list[int]) -> int:
    """
    Two pointers starting at opposite boundaries.
    Time: O(N), Space: O(1).
    """
    left, right = 0, len(height) - 1
    max_water = 0
    
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        max_water = max(max_water, width * h)
        
        # Advance the shorter wall
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
            
    return max_water`,
    pseudocode: [
      'left = 0, right = len(height) - 1',
      'max_water = 0',
      'while left < right:',
      '    h = min(height[left], height[right])',
      '    max_water = max(max_water, h * (right - left))',
      '    if height[left] < height[right]: left++',
      '    else: right--',
      'return max_water'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Both pointers move toward each other until meeting, inspecting each bar at most once.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Constant scalar memory for pointers and maximum water tracker.'
    },
    generateSteps: () => {
      const height = [1, 8, 6, 2, 5, 4, 8, 3, 7];
      const steps: Blind75Step[] = [];
      let left = 0, right = height.length - 1;
      let maxWater = 0;

      while (left < right) {
        const width = right - left;
        const h = Math.min(height[left], height[right]);
        const currentWater = width * h;
        const isNewMax = currentWater > maxWater;
        if (isNewMax) maxWater = currentWater;

        steps.push({
          stepIndex: steps.length,
          totalSteps: 9,
          line: 4,
          description: `Pointers at L=${left} (h=${height[left]}) & R=${right} (h=${height[right]}). Width = ${width}, Limiting Height = ${h}. Current Area = ${currentWater}. ${isNewMax ? `New Max Area = ${maxWater}!` : `Max remains ${maxWater}.`}`,
          action: isNewMax ? 'update' : 'advance',
          variables: { left, right, width, height_limit: h, area: currentWater, max_water: maxWater },
          visualData: {
            kind: 'array-pointers',
            array: height,
            activeIndices: [left, right],
            pointers: [
              { name: `L (${height[left]})`, index: left, color: 'var(--primary-500)' },
              { name: `R (${height[right]})`, index: right, color: 'var(--danger-500)' }
            ],
            badgeNote: `Area: ${currentWater} | Max: ${maxWater}`
          }
        });

        if (height[left] < height[right]) {
          left++;
        } else {
          right--;
        }
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  }
];
