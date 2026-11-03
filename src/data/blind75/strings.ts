import { Blind75Problem, Blind75Step } from '../../types/blind75';

export const STRING_PROBLEMS: Blind75Problem[] = [
  // 50. Longest Substring Without Repeating Characters (#3)
  {
    id: 'longest-substring-without-repeating-characters',
    number: 3,
    title: 'Longest Substring Without Repeating Characters',
    category: 'String',
    difficulty: 'Medium',
    pattern: 'Sliding Window + Hash Map Last Seen',
    grindWeek: 3,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    summary: 'Find the length of the longest substring without repeating characters.',
    description: `Given a string \`s\`, find the length of the longest substring without duplicate characters.`,
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
      { input: 's = "bbbbb"', output: '1', explanation: 'The answer is "b", with the length of 1.' },
      { input: 's = "pwwkew"', output: '3', explanation: 'The answer is "wke", with the length of 3.' }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    intuition: `Sliding Window with a hash map \`last_seen\`:
As \`right\` pointer expands the window, if \`s[right]\` was previously seen within the current window (\`last_seen[s[right]] >= left\`), jump the \`left\` pointer to \`last_seen[s[right]] + 1\`.
Update \`last_seen[s[right]] = right\` and calculate window size \`right - left + 1\`.`,
    pythonSolution: `def lengthOfLongestSubstring(s: str) -> int:
    """
    Sliding window storing last seen index of each character.
    Time: O(N), Space: O(min(N, Alphabet)).
    """
    last_seen = {}
    left = 0
    max_len = 0
    
    for right, char in enumerate(s):
        if char in last_seen and last_seen[char] >= left:
            left = last_seen[char] + 1
        last_seen[char] = right
        max_len = max(max_len, right - left + 1)
        
    return max_len`,
    pseudocode: [
      'last_seen = empty map (char -> index)',
      'left = 0, max_len = 0',
      'for right from 0 to len(s)-1:',
      '    char = s[right]',
      '    if char in last_seen and last_seen[char] >= left:',
      '        left = last_seen[char] + 1',
      '    last_seen[char] = right',
      '    max_len = max(max_len, right - left + 1)',
      'return max_len'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Both left and right pointers traverse the string once.'
    },
    spaceComplexity: {
      bigO: 'O(min(N, A))',
      explanation: 'Where A is the character alphabet size (at most 128 ASCII / 256).'
    },
    generateSteps: () => {
      const s = 'abcabcbb';
      const steps: Blind75Step[] = [];
      const chars = s.split('');
      const lastSeen: Record<string, number> = {};
      let left = 0, maxLen = 0;

      for (let right = 0; right < Math.min(chars.length, 5); right++) {
        const char = chars[right];
        if (lastSeen[char] !== undefined && lastSeen[char] >= left) {
          left = lastSeen[char] + 1;
        }
        lastSeen[char] = right;
        maxLen = Math.max(maxLen, right - left + 1);

        steps.push({
          stepIndex: steps.length,
          totalSteps: 5,
          line: 5,
          description: `Window [${left}..${right}]: Substring "${s.slice(left, right + 1)}". Current length = ${right - left + 1}. Max length = ${maxLen}.`,
          action: 'advance',
          variables: { left, right, char, window_len: right - left + 1, max_len: maxLen },
          visualData: {
            kind: 'sliding-window',
            chars,
            windowStart: left,
            windowEnd: right,
            windowValid: true,
            pointers: [
              { name: 'L', index: left, color: 'var(--primary-500)' },
              { name: 'R', index: right, color: 'var(--success-500)' }
            ],
            badgeNote: `Window: "${s.slice(left, right + 1)}" (Len ${maxLen})`
          }
        });
      }

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 51. Longest Repeating Character Replacement (#424)
  {
    id: 'longest-repeating-character-replacement',
    number: 424,
    title: 'Longest Repeating Character Replacement',
    category: 'String',
    difficulty: 'Medium',
    pattern: 'Sliding Window Frequency Map',
    grindWeek: 7,
    estimatedMinutes: 30,
    leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
    summary: 'Find the length of the longest substring containing the same letter you can get after at most k replacements.',
    description: `You are given a string \`s\` and an integer \`k\`. You can choose any character of the string and change it to any other uppercase English character. You can perform this operation at most \`k\` times.

Return the length of the longest substring containing the same letter you can get after performing the above operations.`,
    examples: [
      { input: 's = "ABAB", k = 2', output: '4', explanation: 'Replace the two \'A\'s with \'B\'s or vice versa.' },
      { input: 's = "AABABBA", k = 1', output: '4', explanation: 'Replace the one \'A\' in the middle with \'B\' to form "AABBBBA" -> length 4.' }
    ],
    constraints: [
      '1 <= s.length <= 10^5',
      's consists of only uppercase English letters.',
      '0 <= k <= s.length'
    ],
    intuition: `A window of length \`len = right - left + 1\` is valid if the number of characters that need replacement \`len - max_frequency\` is <= \`k\`.
Expand \`right\` pointer and update character frequencies.
If \`(right - left + 1) - max_frequency > k\`, shrink the window by decrementing \`freq[s[left]]\` and incrementing \`left\`.
The maximum window size achieved is the answer!`,
    pythonSolution: `def characterReplacement(s: str, k: int) -> int:
    """
    Sliding window with character frequency tracking.
    Time: O(N), Space: O(26) = O(1).
    """
    count = {}
    left = 0
    max_f = 0
    max_len = 0

    for right in range(len(s)):
        count[s[right]] = count.get(s[right], 0) + 1
        max_f = max(max_f, count[s[right]])

        while (right - left + 1) - max_f > k:
            count[s[left]] -= 1
            left += 1

        max_len = max(max_len, right - left + 1)

    return max_len`,
    pseudocode: [
      'count = frequency map, left = 0, max_f = 0, max_len = 0',
      'for right from 0 to len(s)-1:',
      '    count[s[right]]++',
      '    max_f = max(max_f, count[s[right]])',
      '    while (right - left + 1) - max_f > k:',
      '        count[s[left]]--; left++',
      '    max_len = max(max_len, right - left + 1)',
      'return max_len'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Each character entered and left the sliding window at most once.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'At most 26 uppercase English characters in frequency map.'
    },
    generateSteps: () => {
      const s = 'AABABBA';
      const k = 1;
      const steps: Blind75Step[] = [];
      const chars = s.split('');

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input: s = "AABABBA", k = 1. Expand window with right pointer.',
        action: 'inspect',
        variables: { s, k },
        visualData: { kind: 'sliding-window', chars, windowStart: 0, windowEnd: 0 }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 5,
        description: 'Window [0..3] "AABA": count of A is 3, substitutions needed = 4 - 3 = 1 <= k (1). Valid!',
        action: 'match',
        variables: { window: 'AABA', len: 4, replacements_needed: 1 },
        visualData: {
          kind: 'sliding-window',
          chars,
          windowStart: 0,
          windowEnd: 3,
          windowValid: true,
          badgeNote: 'Valid Window: "AABA" (Len 4)'
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 8,
        description: 'Max repeating sequence achieved = 4 characters.',
        action: 'return',
        variables: { max_length: 4 },
        visualData: {
          kind: 'sliding-window',
          chars,
          windowStart: 0,
          windowEnd: 3,
          badgeNote: 'Max Repeating Substring: 4'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 52. Minimum Window Substring (#76)
  {
    id: 'minimum-window-substring',
    number: 76,
    title: 'Minimum Window Substring',
    category: 'String',
    difficulty: 'Hard',
    pattern: 'Sliding Window Double Frequency Match',
    grindWeek: 11,
    estimatedMinutes: 35,
    leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/',
    summary: 'Find the minimum window substring of s such that every character in t (including duplicates) is included.',
    description: `Given two strings \`s\` and \`t\` of lengths \`m\` and \`n\` respectively, return the minimum window substring of \`s\` such that every character in \`t\` (including duplicates) is included in the window. If there is no such substring, return the empty string \`""\`.`,
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: 'The minimum window substring "BANC" includes \'A\', \'B\', and \'C\' from string t.' },
      { input: 's = "a", t = "a"', output: '"a"' },
      { input: 's = "a", t = "aa"', output: '""' }
    ],
    constraints: [
      'm == s.length',
      'n == t.length',
      '1 <= m, n <= 10^5',
      's and t consist of uppercase and lowercase English letters.'
    ],
    intuition: `Maintain \`count_t\` of required character frequencies, and \`window\` for the current slice.
Track \`have\` (number of distinct characters with sufficient counts) and \`need = len(count_t)\`.
- Expand \`right\`: add \`s[right]\` to \`window\`. When a character's count matches \`count_t\`, increment \`have\`.
- While \`have == need\` (valid window): record the minimum window, then shrink from \`left\` by removing \`s[left]\` until the window is no longer valid.`,
    pythonSolution: `def minWindow(s: str, t: str) -> str:
    """
    Sliding window with have/need counter.
    Time: O(M + N), Space: O(1) alphabet.
    """
    if not t or not s:
        return ""

    count_t = {}
    for c in t:
        count_t[c] = count_t.get(c, 0) + 1

    window = {}
    have, need = 0, len(count_t)
    res, res_len = [-1, -1], float("inf")
    left = 0

    for right in range(len(s)):
        c = s[right]
        window[c] = window.get(c, 0) + 1

        if c in count_t and window[c] == count_t[c]:
            have += 1

        while have == need:
            if (right - left + 1) < res_len:
                res = [left, right]
                res_len = right - left + 1
            # Pop from left to minimize
            window[s[left]] -= 1
            if s[left] in count_t and window[s[left]] < count_t[s[left]]:
                have -= 1
            left += 1

    l, r = res
    return s[l : r + 1] if res_len != float("inf") else ""`,
    pseudocode: [
      'count_t = freq(t), need = len(count_t), have = 0',
      'left = 0, min_len = infinity',
      'for right from 0 to len(s)-1:',
      '    add s[right] to window',
      '    if s[right] in count_t and window[s[right]] == count_t[s[right]]: have++',
      '    while have == need:',
      '        update min_len and best window indices',
      '        remove s[left] from window; left++',
      'return min window substring'
    ],
    timeComplexity: {
      bigO: 'O(M + N)',
      explanation: 'Building count_t takes O(N); left and right pointers each advance at most M times.'
    },
    spaceComplexity: {
      bigO: 'O(1) / O(Alphabet)',
      explanation: 'Stores counts for at most 52 ASCII letters.'
    },
    generateSteps: () => {
      const s = 'ADOBECODEBANC';
      const steps: Blind75Step[] = [];
      const chars = s.split('');

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Target t = "ABC" (requires A:1, B:1, C:1). need = 3 characters.',
        action: 'inspect',
        variables: { s, t: 'ABC', need: 3 },
        visualData: { kind: 'sliding-window', chars, windowStart: 0, windowEnd: 0 }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 8,
        description: 'First valid window at [0..5] "ADOBEC": contains A, B, C! Length = 6.',
        action: 'match',
        variables: { window: 'ADOBEC', len: 6 },
        visualData: {
          kind: 'sliding-window',
          chars,
          windowStart: 0,
          windowEnd: 5,
          windowValid: true,
          badgeNote: 'Window: "ADOBEC" (len 6)'
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 13,
        description: 'Later window at [9..12] "BANC": contains B, A, N, C! Length = 4 (minimal). Return "BANC".',
        action: 'return',
        variables: { min_window: 'BANC', min_len: 4 },
        visualData: {
          kind: 'sliding-window',
          chars,
          windowStart: 9,
          windowEnd: 12,
          windowValid: true,
          badgeNote: 'Optimal Min Window: "BANC" (Len 4)'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 53. Valid Anagram (#242)
  {
    id: 'valid-anagram',
    number: 242,
    title: 'Valid Anagram',
    category: 'String',
    difficulty: 'Easy',
    pattern: 'Frequency Array / Hash Map Match',
    grindWeek: 1,
    estimatedMinutes: 15,
    leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',
    summary: 'Check if string t is an anagram of string s.',
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    examples: [
      { input: 's = "anagram", t = "nagaram"', output: 'true' },
      { input: 's = "rat", t = "car"', output: 'false' }
    ],
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.'
    ],
    intuition: `1. Check length: If \`len(s) != len(t)\`, return \`False\` immediately.
2. Maintain a frequency bucket of size 26.
3. For each character in \`s\`, increment its count.
4. For each character in \`t\`, decrement its count.
5. If all 26 buckets equal 0 at the end, \`t\` is an exact anagram of \`s\`!`,
    pythonSolution: `def isAnagram(s: str, t: str) -> bool:
    """
    Fixed 26-element array counting character frequencies.
    Time: O(N), Space: O(1).
    """
    if len(s) != len(t):
        return False
        
    counts = [0] * 26
    for i in range(len(s)):
        counts[ord(s[i]) - ord('a')] += 1
        counts[ord(t[i]) - ord('a')] -= 1
        
    return all(c == 0 for c in counts)`,
    pseudocode: [
      'if len(s) != len(t): return False',
      'counts = array of 26 zeros',
      'for each char in s: counts[char]++',
      'for each char in t: counts[char]--',
      'return True if all counts are 0 else False'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Single linear pass over both strings.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Array of size 26 for lowercase alphabet.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input: s = "anagram", t = "nagaram". Both have length 7.',
        action: 'inspect',
        variables: { s_len: 7, t_len: 7 },
        visualData: { kind: 'array-pointers', array: ['a:3', 'n:1', 'g:1', 'r:1', 'm:1'] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 4,
        description: 'Count frequencies: s adds letters, t cancels them out exactly.',
        action: 'update',
        variables: { matching: true },
        visualData: { kind: 'array-pointers', array: ['a:0', 'n:0', 'g:0', 'r:0', 'm:0'] }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 7,
        description: 'All 26 frequency counts are exactly 0. Valid Anagram!',
        action: 'return',
        variables: { is_anagram: true },
        visualData: {
          kind: 'array-pointers',
          array: ['a:0', 'n:0', 'g:0', 'r:0', 'm:0'],
          badgeNote: 'Valid Anagram: TRUE'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 54. Group Anagrams (#49)
  {
    id: 'group-anagrams',
    number: 49,
    title: 'Group Anagrams',
    category: 'String',
    difficulty: 'Medium',
    pattern: 'Character Frequency Tuple Hash Key',
    grindWeek: 8,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
    summary: 'Group an array of strings into sub-lists of anagrams.',
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]' },
      { input: 'strs = [""]', output: '[[""]]' }
    ],
    constraints: [
      '1 <= strs.length <= 10^4',
      '0 <= strs[i].length <= 100',
      'strs[i] consists of lowercase English letters.'
    ],
    intuition: `Two words are anagrams if and only if their sorted character representation (or 26-character frequency count tuple) is identical!
Use the sorted word (or 26-element tuple) as the key in a hash map:
\`map[tuple(count)].append(word)\`.
Return \`list(map.values())\`.`,
    pythonSolution: `from collections import defaultdict

def groupAnagrams(strs: list[str]) -> list[list[str]]:
    """
    Hash map grouping words by 26-element frequency tuple.
    Time: O(N * K), Space: O(N * K).
    """
    ans = defaultdict(list)
    for s in strs:
        count = [0] * 26
        for c in s:
            count[ord(c) - ord('a')] += 1
        ans[tuple(count)].append(s)
    return list(ans.values())`,
    pseudocode: [
      'ans = hash map (tuple -> list of strings)',
      'for each word s in strs:',
      '    count = 26-zero array',
      '    for each char in s: count[char]++',
      '    ans[tuple(count)].append(s)',
      'return list(ans.values())'
    ],
    timeComplexity: {
      bigO: 'O(N * K)',
      explanation: 'Where N is number of words and K is the maximum length of a word.'
    },
    spaceComplexity: {
      bigO: 'O(N * K)',
      explanation: 'Hash map storing all words grouped by their frequency keys.'
    },
    generateSteps: () => {
      const strs = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
      const steps: Blind75Step[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input words: ["eat", "tea", "tan", "ate", "nat", "bat"]. Group by character signatures.',
        action: 'inspect',
        variables: { total_words: 6 },
        visualData: { kind: 'array-pointers', array: strs }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 7,
        description: 'Signature "aet" collects ["eat", "tea", "ate"]. Signature "ant" collects ["tan", "nat"]. "abt" collects ["bat"].',
        action: 'update',
        variables: { groups_found: 3 },
        visualData: {
          kind: 'hash-map',
          hashMap: {
            'aet': '["eat", "tea", "ate"]',
            'ant': '["tan", "nat"]',
            'abt': '["bat"]'
          }
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 8,
        description: 'Return grouped lists: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]].',
        action: 'return',
        variables: { groups: 3 },
        visualData: {
          kind: 'array-pointers',
          array: ['["eat","tea","ate"]', '["tan","nat"]', '["bat"]'],
          badgeNote: 'Grouped into 3 Anagram Clusters'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 55. Valid Parentheses (#20)
  {
    id: 'valid-parentheses',
    number: 20,
    title: 'Valid Parentheses',
    category: 'String',
    difficulty: 'Easy',
    pattern: 'LIFO Stack Matching',
    grindWeek: 1,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/valid-parentheses/',
    summary: 'Determine if an input string of brackets is valid and properly closed in order.',
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: 'true' },
      { input: 's = "()[]{}"', output: 'true' },
      { input: 's = "(]"', output: 'false' }
    ],
    constraints: [
      '1 <= s.length <= 10^4',
      's consists of parentheses only \'()[]{}\'.'
    ],
    intuition: `Use a LIFO Stack:
For each character in \`s\`:
- If it is an opening bracket (\`(\`, \`{\`, \`[\`), push it onto the stack.
- If it is a closing bracket (\`)\`, \`}\`, \`]\`):
  Check if the stack is non-empty and the top element is its corresponding opening bracket. If yes, pop it. If not, string is invalid; return \`False\`.
After the entire string is processed, return \`len(stack) == 0\`.`,
    pythonSolution: `def isValid(s: str) -> bool:
    """
    Stack-based matching for bracket pairs.
    Time: O(N), Space: O(N).
    """
    stack = []
    close_to_open = {')': '(', '}': '{', ']': '['}

    for c in s:
        if c in close_to_open:
            if stack and stack[-1] == close_to_open[c]:
                stack.pop()
            else:
                return False
        else:
            stack.append(c)

    return len(stack) == 0`,
    pseudocode: [
      'stack = []',
      'pairs = {")": "(", "}": "{", "]": "["}',
      'for char in s:',
      '    if char in pairs:',
      '        if stack is not empty and stack.top == pairs[char]: stack.pop()',
      '        else: return False',
      '    else: stack.push(char)',
      'return len(stack) == 0'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Processes each character with O(1) push or pop operations.'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'In worst case (all opening brackets), the stack holds N characters.'
    },
    generateSteps: () => {
      const s = '{[()]}';
      const steps: Blind75Step[] = [];
      const stack: string[] = [];

      steps.push({
        stepIndex: 0,
        totalSteps: 4,
        line: 1,
        description: 'Input: "{[()]}". Initialize empty stack.',
        action: 'inspect',
        variables: { s, stack_len: 0 },
        visualData: { kind: 'stack', stackItems: [] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 4,
        line: 9,
        description: 'Encounter opening brackets "{", "[", "(": pushed onto stack.',
        action: 'advance',
        variables: { stack: "['{', '[', '(']" },
        visualData: { kind: 'stack', stackItems: ['{', '[', '('], topIndex: 2 }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 4,
        line: 5,
        description: 'Encounter ")": matches top "(". Pop! Encounter "]": matches top "[". Pop!',
        action: 'update',
        variables: { matched: '() and []' },
        visualData: { kind: 'stack', stackItems: ['{'], topIndex: 0 }
      });

      steps.push({
        stepIndex: 3,
        totalSteps: 4,
        line: 11,
        description: 'Encounter "}": matches "{". Pop! Stack is now empty. Valid Parentheses!',
        action: 'return',
        variables: { is_valid: true },
        visualData: {
          kind: 'stack',
          stackItems: [],
          badgeNote: 'All Brackets Matched Perfectly'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 56. Valid Palindrome (#125)
  {
    id: 'valid-palindrome',
    number: 125,
    title: 'Valid Palindrome',
    category: 'String',
    difficulty: 'Easy',
    pattern: 'Two Pointers Inward Scan',
    grindWeek: 1,
    estimatedMinutes: 15,
    leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
    summary: 'Check if a string is a palindrome after converting uppercase to lowercase and removing non-alphanumeric characters.',
    description: `A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Alphanumeric characters include letters and numbers.

Given a string \`s\`, return \`true\` if it is a palindrome, or \`false\` otherwise.`,
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' }
    ],
    constraints: [
      '1 <= s.length <= 2 * 10^5',
      's consists only of printable ASCII characters.'
    ],
    intuition: `Two Pointers:
Place \`left = 0\` and \`right = len(s) - 1\`.
While \`left < right\`:
- Advance \`left\` while \`s[left]\` is not alphanumeric.
- Decrease \`right\` while \`s[right]\` is not alphanumeric.
- If \`s[left].lower() != s[right].lower()\`, return \`False\`.
- Move both inward: \`left += 1\`, \`right -= 1\`.
If pointers cross without mismatch, return \`True\`!`,
    pythonSolution: `def isPalindrome(s: str) -> bool:
    """
    Two pointers inward check skipping non-alphanumeric characters.
    Time: O(N), Space: O(1).
    """
    left, right = 0, len(s) - 1

    while left < right:
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1

        if s[left].lower() != s[right].lower():
            return False

        left += 1
        right -= 1

    return True`,
    pseudocode: [
      'left = 0, right = len(s) - 1',
      'while left < right:',
      '    skip non-alphanumeric chars at left and right',
      '    if s[left].lower() != s[right].lower(): return False',
      '    left++; right--',
      'return True'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Linear two-pointer scan with each character evaluated once.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'In-place pointer traversal with no copied strings.'
    },
    generateSteps: () => {
      const s = 'A man, a plan, a canal: Panama';
      const steps: Blind75Step[] = [];
      const cleanChars = 'amanaplanacanalpanama'.split('');

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input string cleaned: "amanaplanacanalpanama". Check symmetry from outer edges inward.',
        action: 'inspect',
        variables: { s: 'amanaplanacanalpanama' },
        visualData: {
          kind: 'array-pointers',
          array: cleanChars,
          pointers: [
            { name: 'L', index: 0, color: 'var(--primary-500)' },
            { name: 'R', index: cleanChars.length - 1, color: 'var(--danger-500)' }
          ]
        }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 7,
        description: 'Pointers move inward: "a"=="a", "m"=="m", "a"=="a", "n"=="n", "p"=="p"... all match!',
        action: 'match',
        variables: { matches: true },
        visualData: {
          kind: 'array-pointers',
          array: cleanChars,
          activeIndices: [0, cleanChars.length - 1, 1, cleanChars.length - 2],
          badgeNote: 'Symmetric matching inward'
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 11,
        description: 'Pointers meet in middle at index 10 ("c"). Valid Palindrome confirmed!',
        action: 'return',
        variables: { is_palindrome: true },
        visualData: {
          kind: 'array-pointers',
          array: cleanChars,
          pointers: [{ name: 'CENTER', index: 10, color: 'var(--success-500)' }],
          badgeNote: 'Valid Palindrome: TRUE'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 57. Longest Palindromic Substring (#5)
  {
    id: 'longest-palindromic-substring',
    number: 5,
    title: 'Longest Palindromic Substring',
    category: 'String',
    difficulty: 'Medium',
    pattern: 'Expand Around Centers',
    grindWeek: 6,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-substring/',
    summary: 'Find the longest palindromic substring in a string s.',
    description: `Given a string \`s\`, return the longest palindromic substring in \`s\`.`,
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" is also a valid answer.' },
      { input: 's = "cbbd"', output: '"bb"' }
    ],
    constraints: [
      '1 <= s.length <= 1000',
      's consist of only digits and English letters.'
    ],
    intuition: `Expand Around Center:
Every palindrome centers on either a single character (odd length like "aba", centered at index \`i\`) or two adjacent characters (even length like "abba", centered at \`i, i+1\`).
There are \`2N - 1\` possible centers. For each center, expand outward as long as \`s[left] == s[right]\`. Record the longest substring found across all centers.`,
    pythonSolution: `def longestPalindrome(s: str) -> str:
    """
    Expand around 2N - 1 centers (odd and even).
    Time: O(N^2), Space: O(1).
    """
    res = ""
    res_len = 0

    for i in range(len(s)):
        # Odd length palindrome
        l, r = i, i
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > res_len:
                res = s[l : r + 1]
                res_len = r - l + 1
            l -= 1
            r += 1

        # Even length palindrome
        l, r = i, i + 1
        while l >= 0 and r < len(s) and s[l] == s[r]:
            if (r - l + 1) > res_len:
                res = s[l : r + 1]
                res_len = r - l + 1
            l -= 1
            r += 1

    return res`,
    pseudocode: [
      'res = "", max_len = 0',
      'for i from 0 to len(s)-1:',
      '    expand around odd center (i, i)',
      '    expand around even center (i, i + 1)',
      '    update res if longer palindrome found',
      'return res'
    ],
    timeComplexity: {
      bigO: 'O(N^2)',
      explanation: 'N centers, expanding outward up to N/2 steps.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Only tracks indices of the longest palindrome slice.'
    },
    generateSteps: () => {
      const s = 'babad';
      const steps: Blind75Step[] = [];
      const chars = s.split('');

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input: "babad". Test centers from index 0 to 4.',
        action: 'inspect',
        variables: { s },
        visualData: { kind: 'array-pointers', array: chars }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 6,
        description: 'Center at index 1 ("a"): expands outward to s[0..2] = "bab". Length = 3.',
        action: 'match',
        variables: { center: 1, palindrome: 'bab', length: 3 },
        visualData: {
          kind: 'array-pointers',
          array: chars,
          activeIndices: [0, 1, 2],
          pointers: [{ name: 'center', index: 1, color: 'var(--success-500)' }],
          badgeNote: 'Palindrome: "bab" (Len 3)'
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 14,
        description: 'Completed checking all centers. Longest Palindromic Substring = "bab".',
        action: 'return',
        variables: { result: 'bab' },
        visualData: {
          kind: 'array-pointers',
          array: chars,
          activeIndices: [0, 1, 2],
          badgeNote: 'Max Palindromic Substring: "bab"'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 58. Palindromic Substrings (#647)
  {
    id: 'palindromic-substrings',
    number: 647,
    title: 'Palindromic Substrings',
    category: 'String',
    difficulty: 'Medium',
    pattern: 'Expand Around Centers Counting',
    grindWeek: 6,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/palindromic-substrings/',
    summary: 'Count the total number of palindromic substrings in a string s.',
    description: `Given a string \`s\`, return the number of palindromic substrings in it.

A string is a palindrome when it reads the same backward as forward. A substring is a contiguous sequence of characters within the string.`,
    examples: [
      { input: 's = "abc"', output: '3', explanation: 'Three palindromic strings: "a", "b", "c".' },
      { input: 's = "aaa"', output: '6', explanation: 'Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".' }
    ],
    constraints: [
      '1 <= s.length <= 1000',
      's consists of lowercase English letters.'
    ],
    intuition: `Expand Around Center:
At each possible center (both odd \`(i, i)\` and even \`(i, i+1)\`), increment the count for every successful outward expansion where \`s[left] == s[right]\`. Summing counts over all centers yields the total number of palindromic substrings.`,
    pythonSolution: `def countSubstrings(s: str) -> int:
    """
    Count all palindromes expanding around 2N - 1 centers.
    Time: O(N^2), Space: O(1).
    """
    count = 0

    def countPali(l, r):
        res = 0
        while l >= 0 and r < len(s) and s[l] == s[r]:
            res += 1
            l -= 1
            r += 1
        return res

    for i in range(len(s)):
        count += countPali(i, i)      # Odd length
        count += countPali(i, i + 1)  # Even length

    return count`,
    pseudocode: [
      'count = 0',
      'for i from 0 to len(s)-1:',
      '    count += countPalindromesAround(i, i)     # odd centers',
      '    count += countPalindromesAround(i, i + 1) # even centers',
      'return count'
    ],
    timeComplexity: {
      bigO: 'O(N^2)',
      explanation: 'N centers with at most N expansions each.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Only stores an integer counter.'
    },
    generateSteps: () => {
      const s = 'aaa';
      const steps: Blind75Step[] = [];
      const chars = s.split('');

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input string: "aaa". Every individual letter is a palindrome (3 odd centers).',
        action: 'inspect',
        variables: { single_letter_palindromes: 3 },
        visualData: { kind: 'array-pointers', array: chars }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 8,
        description: 'Even centers: "aa" at [0,1] and "aa" at [1,2] -> +2 palindromes.',
        action: 'update',
        variables: { current_count: 5 },
        visualData: { kind: 'array-pointers', array: chars, activeIndices: [0, 1] }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 11,
        description: 'Full expansion around center 1 yields "aaa" -> +1 palindrome. Total = 6.',
        action: 'return',
        variables: { total_palindromic_substrings: 6 },
        visualData: {
          kind: 'array-pointers',
          array: chars,
          activeIndices: [0, 1, 2],
          badgeNote: 'Total Palindromic Substrings: 6'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 59. Encode and Decode Strings (#271)
  {
    id: 'encode-and-decode-strings',
    number: 271,
    title: 'Encode and Decode Strings',
    category: 'String',
    difficulty: 'Medium',
    pattern: 'Length-Prefixed Chunk Delimiting',
    grindWeek: 12,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/encode-and-decode-strings/',
    summary: 'Design an algorithm to encode a list of strings to a single string and decode it back.',
    description: `Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.`,
    examples: [
      { input: '["lint","code","love","you"]', output: '["lint","code","love","you"]' },
      { input: '["we", "say", ":", "yes"]', output: '["we", "say", ":", "yes"]' }
    ],
    constraints: [
      '0 <= strs.length <= 200',
      '0 <= strs[i].length <= 200',
      'strs[i] contains any possible characters out of 256 valid ASCII characters.'
    ],
    intuition: `Standard delimiters like commas fail because strings can contain commas.
Use Length-Prefixed Encoding:
Prefix each string with its length followed by a delimiter like \`'#'\`:
\`f"{len(s)}#{s}"\`.
For example, \`["lint", "code"]\` encodes as \`"4#lint4#code"\`.
During decoding, read characters until the \`'#'\`, parse the integer length \`k\`, and extract exactly the next \`k\` characters! This handles any character inside the string without ambiguity.`,
    pythonSolution: `class Codec:
    def encode(self, strs: list[str]) -> str:
        """
        Prefix each word with its length and '#' delimiter.
        Time: O(total chars), Space: O(total chars).
        """
        res = ""
        for s in strs:
            res += f"{len(s)}#{s}"
        return res

    def decode(self, s: str) -> list[str]:
        """
        Read length before '#', then extract exactly length characters.
        Time: O(total chars), Space: O(total chars).
        """
        res = []
        i = 0
        while i < len(s):
            j = i
            while s[j] != '#':
                j += 1
            length = int(s[i:j])
            res.append(s[j + 1 : j + 1 + length])
            i = j + 1 + length
        return res`,
    pseudocode: [
      'function encode(strs):',
      '    return "".join(str(len(s)) + "#" + s for s in strs)',
      'function decode(s):',
      '    i = 0, res = []',
      '    while i < len(s):',
      '        find "#" at index j',
      '        length = int(s[i:j])',
      '        res.append(s[j+1 : j+1+length])',
      '        i = j + 1 + length',
      '    return res'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Where N is total characters across all strings. Both encode and decode are single-pass.'
    },
    spaceComplexity: {
      bigO: 'O(N)',
      explanation: 'Memory proportional to total string length.'
    },
    generateSteps: () => {
      const strs = ['lint', 'code', 'love', 'you'];
      const steps: Blind75Step[] = [];
      const encoded = '4#lint4#code4#love3#you';

      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input list: ["lint", "code", "love", "you"].',
        action: 'inspect',
        variables: { word_count: 4 },
        visualData: { kind: 'array-pointers', array: strs }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 4,
        description: 'Encoded with length prefixes: "4#lint4#code4#love3#you".',
        action: 'update',
        variables: { encoded_string: encoded },
        visualData: {
          kind: 'array-pointers',
          array: ['4#lint', '4#code', '4#love', '3#you'],
          badgeNote: 'Wire Format: Length-Prefixed'
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 12,
        description: 'Decoder reads length 4 -> "lint", length 4 -> "code", length 4 -> "love", length 3 -> "you". Fully recovered!',
        action: 'return',
        variables: { decoded_matches: true },
        visualData: {
          kind: 'array-pointers',
          array: strs,
          badgeNote: 'Decoded: ["lint", "code", "love", "you"]'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  }
];
