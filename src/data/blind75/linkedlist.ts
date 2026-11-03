import { Blind75Problem, Blind75Step } from '../../types/blind75';

export const LINKED_LIST_PROBLEMS: Blind75Problem[] = [
  // 40. Reverse Linked List (#206)
  {
    id: 'reverse-linked-list',
    number: 206,
    title: 'Reverse Linked List',
    category: 'Linked List',
    difficulty: 'Easy',
    pattern: 'In-Place Pointer Rewiring',
    grindWeek: 2,
    estimatedMinutes: 15,
    leetcodeUrl: 'https://leetcode.com/problems/reverse-linked-list/',
    summary: 'Reverse a singly linked list iteratively in O(N) time and O(1) space.',
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      { input: 'head = [1, 2, 3, 4, 5]', output: '[5, 4, 3, 2, 1]' },
      { input: 'head = [1, 2]', output: '[2, 1]' },
      { input: 'head = []', output: '[]' }
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    intuition: `Maintain three pointers: \`prev = None\`, \`curr = head\`, and temporary \`nxt\`.
At each node:
1. Save \`nxt = curr.next\`.
2. Reverse the link: \`curr.next = prev\`.
3. Shift forward: \`prev = curr\`, \`curr = nxt\`.
When \`curr\` becomes \`None\`, \`prev\` points to the new head of the reversed list!`,
    pythonSolution: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head: ListNode) -> ListNode:
    """
    Iterative pointer reversal.
    Time: O(N), Space: O(1).
    """
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`,
    pseudocode: [
      'prev = None, curr = head',
      'while curr is not None:',
      '    nxt = curr.next',
      '    curr.next = prev  # reverse pointer',
      '    prev = curr',
      '    curr = nxt',
      'return prev'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Traverses each node in the list once.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'In-place pointer rewiring using three reference variables.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 4,
        line: 1,
        description: 'Initialize prev = None, curr = Head (1).',
        action: 'inspect',
        variables: { prev: 'None', curr: 1 },
        visualData: {
          kind: 'linked-list',
          nodes: [
            { id: '1', val: 1, next: '2' },
            { id: '2', val: 2, next: '3' },
            { id: '3', val: 3, next: null }
          ],
          currNodeId: '1',
          headId: '1'
        }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 4,
        line: 4,
        description: 'Reverse Node 1: 1.next points to None. Advance prev = 1, curr = 2.',
        action: 'update',
        variables: { prev: 1, curr: 2 },
        visualData: {
          kind: 'linked-list',
          nodes: [
            { id: '1', val: 1, next: null },
            { id: '2', val: 2, next: '3' },
            { id: '3', val: 3, next: null }
          ],
          prevNodeId: '1',
          currNodeId: '2'
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 4,
        line: 4,
        description: 'Reverse Node 2: 2.next points to 1. Advance prev = 2, curr = 3.',
        action: 'update',
        variables: { prev: 2, curr: 3 },
        visualData: {
          kind: 'linked-list',
          nodes: [
            { id: '2', val: 2, next: '1' },
            { id: '1', val: 1, next: null },
            { id: '3', val: 3, next: null }
          ],
          prevNodeId: '2',
          currNodeId: '3'
        }
      });

      steps.push({
        stepIndex: 3,
        totalSteps: 4,
        line: 7,
        description: 'Reverse Node 3: 3.next points to 2. curr is None. New head is 3 -> 2 -> 1.',
        action: 'return',
        variables: { new_head: 3 },
        visualData: {
          kind: 'linked-list',
          nodes: [
            { id: '3', val: 3, next: '2' },
            { id: '2', val: 2, next: '1' },
            { id: '1', val: 1, next: null }
          ],
          prevNodeId: '3',
          badgeNote: 'Reversed List: 3 -> 2 -> 1'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 41. Linked List Cycle (#141)
  {
    id: 'linked-list-cycle',
    number: 141,
    title: 'Linked List Cycle',
    category: 'Linked List',
    difficulty: 'Easy',
    pattern: "Floyd's Tortoise and Hare (Fast & Slow Pointers)",
    grindWeek: 1,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/',
    summary: 'Determine if a linked list has a cycle using O(1) memory.',
    description: `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the \`next\` pointer.

Return \`true\` if there is a cycle in the linked list. Otherwise, return \`false\`.`,
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'There is a cycle where tail connects to the 1st node (0-indexed).' },
      { input: 'head = [1,2], pos = 0', output: 'true' },
      { input: 'head = [1], pos = -1', output: 'false' }
    ],
    constraints: [
      'The number of the nodes in the list is in the range [0, 10^4].',
      '-10^5 <= Node.val <= 10^5'
    ],
    intuition: `Floyd's Cycle-Finding Algorithm:
Use two pointers, \`slow\` (moving 1 step) and \`fast\` (moving 2 steps).
If the list is acyclic, \`fast\` or \`fast.next\` will reach \`None\`.
If the list contains a cycle, the faster pointer will loop around and inevitably catch up to the slower pointer from behind inside the cycle. When \`slow == fast\`, a cycle is guaranteed!`,
    pythonSolution: `def hasCycle(head: ListNode) -> bool:
    """
    Floyd's Cycle-Finding Algorithm (Tortoise and Hare).
    Time: O(N), Space: O(1).
    """
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
    pseudocode: [
      'slow = head, fast = head',
      'while fast is not None and fast.next is not None:',
      '    slow = slow.next          # 1 step',
      '    fast = fast.next.next     # 2 steps',
      '    if slow == fast: return True # Cycle detected!',
      'return False'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Once both pointers enter the loop of length K <= N, fast catches up in at most K steps.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Only uses two pointer references with zero additional allocated nodes.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Initialize slow = 3, fast = 3. Cycle exists connecting tail (-4) back to 2.',
        action: 'inspect',
        variables: { slow: 3, fast: 3 },
        visualData: {
          kind: 'linked-list',
          nodes: [
            { id: '3', val: 3, next: '2' },
            { id: '2', val: 2, next: '0' },
            { id: '0', val: 0, next: '-4' },
            { id: '-4', val: -4, next: '2', isCycle: true }
          ],
          currNodeId: '3'
        }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 3,
        description: 'Step 1: slow moves to 2 (1 step), fast moves to 0 (2 steps).',
        action: 'advance',
        variables: { slow: 2, fast: 0 },
        visualData: {
          kind: 'linked-list',
          nodes: [
            { id: '3', val: 3, next: '2' },
            { id: '2', val: 2, next: '0' },
            { id: '0', val: 0, next: '-4' },
            { id: '-4', val: -4, next: '2', isCycle: true }
          ],
          prevNodeId: '2', // slow
          currNodeId: '0'  // fast
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 5,
        description: 'Step 2: slow moves to 0; fast loops through -4 back to 0! slow == fast -> Cycle confirmed!',
        action: 'match',
        variables: { collision_node: 0, has_cycle: true },
        visualData: {
          kind: 'linked-list',
          nodes: [
            { id: '3', val: 3, next: '2' },
            { id: '2', val: 2, next: '0' },
            { id: '0', val: 0, next: '-4', isVisited: true },
            { id: '-4', val: -4, next: '2', isCycle: true }
          ],
          currNodeId: '0',
          badgeNote: 'Cycle Detected: slow == fast at Node 0'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 42. Merge Two Sorted Lists (#21)
  {
    id: 'merge-two-sorted-lists',
    number: 21,
    title: 'Merge Two Sorted Lists',
    category: 'Linked List',
    difficulty: 'Easy',
    pattern: 'Dummy Node & Splice Merge',
    grindWeek: 1,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/merge-two-sorted-lists/',
    summary: 'Merge two sorted linked lists into one sorted linked list in O(N + M) time.',
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.

Return the head of the merged linked list.`,
    examples: [
      { input: 'list1 = [1,2,4], list2 = [1,3,4]', output: '[1,1,2,3,4,4]' },
      { input: 'list1 = [], list2 = []', output: '[]' }
    ],
    constraints: [
      'The number of nodes in both lists is in the range [0, 50].',
      '-100 <= Node.val <= 100',
      'Both list1 and list2 are sorted in non-decreasing order.'
    ],
    intuition: `Use a dummy head node to simplify boundary conditions. Maintain a \`tail\` pointer initially at the dummy.
While both \`list1\` and \`list2\` are non-empty:
- Compare their current node values.
- Attach the smaller node to \`tail.next\` and advance that list's pointer.
- Advance \`tail\`.
Once one list is exhausted, attach the entirety of the remaining non-empty list. Return \`dummy.next\`.`,
    pythonSolution: `def mergeTwoLists(list1: ListNode, list2: ListNode) -> ListNode:
    """
    Merge two sorted lists using dummy head pointer.
    Time: O(N + M), Space: O(1).
    """
    dummy = ListNode(0)
    tail = dummy
    
    while list1 and list2:
        if list1.val <= list2.val:
            tail.next = list1
            list1 = list1.next
        else:
            tail.next = list2
            list2 = list2.next
        tail = tail.next
        
    tail.next = list1 if list1 else list2
    return dummy.next`,
    pseudocode: [
      'dummy = new ListNode(0), tail = dummy',
      'while list1 is not None and list2 is not None:',
      '    if list1.val <= list2.val: tail.next = list1; list1 = list1.next',
      '    else: tail.next = list2; list2 = list2.next',
      '    tail = tail.next',
      'tail.next = list1 if list1 is not None else list2',
      'return dummy.next'
    ],
    timeComplexity: {
      bigO: 'O(N + M)',
      explanation: 'Traverses each node in both input lists exactly once.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Re-links existing nodes in place with only a dummy pointer.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Initialize dummy head. list1: [1,2,4], list2: [1,3,4].',
        action: 'inspect',
        variables: { list1_val: 1, list2_val: 1 },
        visualData: { kind: 'array-pointers', array: [1, 1, 2, 3, 4, 4] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 4,
        description: 'Compare values: splice 1 (list1), then 1 (list2), then 2 (list1)...',
        action: 'advance',
        variables: { merged_so_far: '[1, 1, 2]' },
        visualData: { kind: 'array-pointers', array: [1, 1, 2, 3, 4, 4], activeIndices: [0, 1, 2] }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 10,
        description: 'Attach remaining elements. Result list: [1, 1, 2, 3, 4, 4].',
        action: 'return',
        variables: { result: '[1, 1, 2, 3, 4, 4]' },
        visualData: {
          kind: 'array-pointers',
          array: [1, 1, 2, 3, 4, 4],
          badgeNote: 'Merged: [1, 1, 2, 3, 4, 4]'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 43. Merge k Sorted Lists (#23)
  {
    id: 'merge-k-sorted-lists',
    number: 23,
    title: 'Merge k Sorted Lists',
    category: 'Linked List',
    difficulty: 'Hard',
    pattern: 'Divide and Conquer / Min-Heap',
    grindWeek: 9,
    estimatedMinutes: 35,
    leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    summary: 'Merge k sorted linked lists and return it as one sorted list in O(N log k) time.',
    description: `You are given an array of \`k\` linked-lists \`lists\`, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.`,
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]' },
      { input: 'lists = []', output: '[]' }
    ],
    constraints: [
      'k == lists.length',
      '0 <= k <= 10^4',
      '0 <= lists[i].length <= 500',
      'The sum of lists[i].length will not exceed 10^4.'
    ],
    intuition: `Divide and Conquer:
Instead of merging one by one in O(k * N) time, pair up lists and merge them two at a time like Merge Sort!
In round 1: merge pairs (0,1), (2,3), etc., reducing k lists to k/2 lists.
In round 2: merge pairs reducing to k/4 lists.
After \`log k\` rounds, all lists are merged into a single sorted list in O(N log k) time!`,
    pythonSolution: `def mergeKLists(lists: list[ListNode]) -> ListNode:
    """
    Divide and conquer pairwise merging.
    Time: O(N log k), Space: O(1) auxiliary.
    """
    if not lists:
        return None

    def merge2(l1, l2):
        dummy = ListNode(0)
        curr = dummy
        while l1 and l2:
            if l1.val <= l2.val:
                curr.next = l1
                l1 = l1.next
            else:
                curr.next = l2
                l2 = l2.next
            curr = curr.next
        curr.next = l1 if l1 else l2
        return dummy.next

    while len(lists) > 1:
        merged = []
        for i in range(0, len(lists), 2):
            l1 = lists[i]
            l2 = lists[i + 1] if i + 1 < len(lists) else None
            merged.append(merge2(l1, l2))
        lists = merged

    return lists[0]`,
    pseudocode: [
      'if lists is empty: return None',
      'while len(lists) > 1:',
      '    merged = []',
      '    for i from 0 to len(lists)-1 step 2:',
      '        merged.append(mergeTwoLists(lists[i], lists[i+1]))',
      '    lists = merged',
      'return lists[0]'
    ],
    timeComplexity: {
      bigO: 'O(N log k)',
      explanation: 'Where N is total number of nodes across all k lists. log k merging levels.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'In-place node relinking with O(1) auxiliary node allocations.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input: 3 sorted lists: L1=[1,4,5], L2=[1,3,4], L3=[2,6].',
        action: 'inspect',
        variables: { k: 3 },
        visualData: { kind: 'array-pointers', array: [1, 1, 2, 3, 4, 4, 5, 6] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 8,
        description: 'Round 1: Merge L1 and L2 -> [1,1,3,4,4,5]. Remaining lists: 2.',
        action: 'update',
        variables: { round: 1, remaining_lists: 2 },
        visualData: { kind: 'array-pointers', array: [1, 1, 3, 4, 4, 5], activeIndices: [0, 1, 2, 3, 4, 5] }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 11,
        description: 'Round 2: Merge with L3 [2,6] -> Final: [1, 1, 2, 3, 4, 4, 5, 6].',
        action: 'return',
        variables: { final_length: 8 },
        visualData: {
          kind: 'array-pointers',
          array: [1, 1, 2, 3, 4, 4, 5, 6],
          badgeNote: 'Fully Merged: 8 nodes in O(N log k)'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 44. Remove Nth Node From End of List (#19)
  {
    id: 'remove-nth-node-from-end-of-list',
    number: 19,
    title: 'Remove Nth Node From End of List',
    category: 'Linked List',
    difficulty: 'Medium',
    pattern: 'Two Pointers with Fixed Offset Gap',
    grindWeek: 2,
    estimatedMinutes: 20,
    leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
    summary: 'Remove the nth node from the end of the list and return its head in one pass.',
    description: `Given the \`head\` of a linked list, remove the \`n\`th node from the end of the list and return its head.`,
    examples: [
      { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]', explanation: 'The 2nd node from the end is 4.' },
      { input: 'head = [1], n = 1', output: '[]' }
    ],
    constraints: [
      'The number of nodes in the list is sz.',
      '1 <= sz <= 30',
      '0 <= Node.val <= 100',
      '1 <= n <= sz'
    ],
    intuition: `Use two pointers \`left\` and \`right\` with dummy node at \`left\`.
1. Advance \`right\` pointer \`n\` steps ahead of \`left\`.
2. Move both \`left\` and \`right\` forward together until \`right\` reaches the last node.
3. Because \`right\` is \`n\` steps ahead, \`left\` is now stationed immediately before the target node to delete!
4. Rewire: \`left.next = left.next.next\`.`,
    pythonSolution: `def removeNthFromEnd(head: ListNode, n: int) -> ListNode:
    """
    Two pointers with gap of n steps for one-pass deletion.
    Time: O(N), Space: O(1).
    """
    dummy = ListNode(0, head)
    left = dummy
    right = head

    # Advance right by n nodes
    for _ in range(n):
        right = right.next

    # Shift both until right is past tail
    while right:
        left = left.next
        right = right.next

    # Delete nth node from end
    left.next = left.next.next
    return dummy.next`,
    pseudocode: [
      'dummy = ListNode(0, head)',
      'left = dummy, right = head',
      'advance right by n steps',
      'while right is not None:',
      '    left = left.next; right = right.next',
      'left.next = left.next.next # delete target node',
      'return dummy.next'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Traverses the list in a single pass.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'Only two pointer references and a dummy node.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input list: [1, 2, 3, 4, 5], n = 2. Advance right pointer by 2 steps.',
        action: 'inspect',
        variables: { n: 2 },
        visualData: { kind: 'array-pointers', array: [1, 2, 3, 4, 5], pointers: [{ name: 'L', index: 0 }, { name: 'R', index: 2 }] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 8,
        description: 'Shift both pointers forward together until R reaches end: L is at Node 3, right before Node 4.',
        action: 'advance',
        variables: { left_at: 3, delete_target: 4 },
        visualData: {
          kind: 'array-pointers',
          array: [1, 2, 3, 4, 5],
          activeIndices: [3],
          pointers: [{ name: 'L', index: 2, color: 'var(--primary-500)' }, { name: 'DELETE', index: 3, color: 'var(--danger-500)' }]
        }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 11,
        description: 'Bypass Node 4: 3.next points to 5. Result: [1, 2, 3, 5].',
        action: 'return',
        variables: { result: '[1, 2, 3, 5]' },
        visualData: {
          kind: 'array-pointers',
          array: [1, 2, 3, 5],
          badgeNote: 'Node 4 Removed Successfully'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  },

  // 45. Reorder List (#143)
  {
    id: 'reorder-list',
    number: 143,
    title: 'Reorder List',
    category: 'Linked List',
    difficulty: 'Medium',
    pattern: 'Find Middle + Reverse Second Half + Interweave',
    grindWeek: 2,
    estimatedMinutes: 25,
    leetcodeUrl: 'https://leetcode.com/problems/reorder-list/',
    summary: 'Reorder list to L0 → Ln → L1 → Ln-1 → L2 → Ln-2 → ... in place.',
    description: `You are given the head of a singly linked-list. The list can be represented as:
\`L0 → L1 → … → Ln - 1 → Ln\`

Reorder the list to be on the following form:
\`L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …\`

You may not modify the values in the list's nodes. Only nodes themselves may be changed.`,
    examples: [
      { input: 'head = [1,2,3,4]', output: '[1,4,2,3]' },
      { input: 'head = [1,2,3,4,5]', output: '[1,5,2,4,3]' }
    ],
    constraints: [
      'The number of nodes in the list is in the range [1, 5 * 10^4].',
      '1 <= Node.val <= 1000'
    ],
    intuition: `Combines three fundamental linked list techniques:
1. Find the middle of the list using slow and fast pointers.
2. Reverse the second half of the list in-place.
3. Merge / interweave the first half and the reversed second half node-by-node.`,
    pythonSolution: `def reorderList(head: ListNode) -> None:
    """
    1. Find middle, 2. Reverse second half, 3. Interleave.
    Time: O(N), Space: O(1).
    """
    if not head or not head.next:
        return

    # 1. Find middle
    slow, fast = head, head.next
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next

    # 2. Reverse second half
    second = slow.next
    slow.next = None
    prev = None
    while second:
        nxt = second.next
        second.next = prev
        prev = second
        second = nxt

    # 3. Interweave two halves
    first, second = head, prev
    while second:
        tmp1, tmp2 = first.next, second.next
        first.next = second
        second.next = tmp1
        first, second = tmp1, tmp2`,
    pseudocode: [
      'find middle node using slow and fast pointers',
      'reverse the second half of the list starting from slow.next',
      'split first half by setting slow.next = None',
      'interweave: first.next = second, second.next = first_next...',
      'return head'
    ],
    timeComplexity: {
      bigO: 'O(N)',
      explanation: 'Three sequential linear phases: N/2 steps to find middle, N/2 to reverse, N/2 to merge.'
    },
    spaceComplexity: {
      bigO: 'O(1)',
      explanation: 'In-place rewiring of existing node pointers.'
    },
    generateSteps: () => {
      const steps: Blind75Step[] = [];
      steps.push({
        stepIndex: 0,
        totalSteps: 3,
        line: 1,
        description: 'Input list: [1, 2, 3, 4, 5]. Step 1: Find middle node (3).',
        action: 'inspect',
        variables: { middle: 3 },
        visualData: { kind: 'array-pointers', array: [1, 2, 3, 4, 5], pointers: [{ name: 'mid', index: 2 }] }
      });

      steps.push({
        stepIndex: 1,
        totalSteps: 3,
        line: 8,
        description: 'Step 2: Reverse second half [4, 5] -> [5, 4].',
        action: 'update',
        variables: { first_half: '[1, 2, 3]', second_reversed: '[5, 4]' },
        visualData: { kind: 'array-pointers', array: [1, 2, 3, 5, 4], activeIndices: [3, 4] }
      });

      steps.push({
        stepIndex: 2,
        totalSteps: 3,
        line: 15,
        description: 'Step 3: Interweave: 1 -> 5 -> 2 -> 4 -> 3. Finished!',
        action: 'return',
        variables: { result: '[1, 5, 2, 4, 3]' },
        visualData: {
          kind: 'array-pointers',
          array: [1, 5, 2, 4, 3],
          badgeNote: 'Reordered: 1 -> 5 -> 2 -> 4 -> 3'
        }
      });

      const total = steps.length;
      steps.forEach(s => s.totalSteps = total);
      return steps;
    }
  }
];
