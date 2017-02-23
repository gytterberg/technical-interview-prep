# Optimization tricks

## Wondeful thoughts from audience
- Pruning off branches, e.g. binary search
- Using hash tables: constant time lookup for keys
- Memoization: keeping track of possible inputs and outputs for use later (relies on pure functions)
- "Shortcircuiting" out of loops, as soon as possible
- Caching values (especially regexes and functions)

## Listen for details
- Every iota of information is probably useful
- Ask questions!

## Consider the best conceivable runtime
- Determine something that is as fast as you think it could go
- Try to reverse engineer it
- Consider precomputations that are *better* than that

## Precomputation/indexing
- Convert data from one format into another
- Consider different data structures
- Hash maps are especially common
- Upfront cost
- Frequently only useful for repeated executions (something to ask interviewer)

## Sorting
- Binary search
- "Ratcheting", involves traversing a sorted array without "backtracking" or "trying all possibilities"

Example: given an array of sorted numbers, and another number (the target), return true if any pair of numbers in the array adds to the target.

```
// O(n^2) time, O(1) extra space
function hasPairSum (target, arr) {
  for (let i = 0; i < arr.length; i++) { // this loop has n steps
    for (let j = i + 1; j < arr.length; j++) { // this loop has n/2 steps (on average)
      if (arr[i] + arr[j] === target) {
        return true;
      }
    }
  }
  return false;
}

// O(n) time, O(1) extra space
function ratchetingPairSum (target, arr) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;
  while (leftIdx !== rightIdx) {
    const possibleSum = arr[leftIdx] + arr[rightIdx];
    if (possibleSum < target) {
      leftIdx++;
    } else if (possibleSum > target) {
      rightIdx--;
    } else {
      return true;
    }
  }
  return false; 
}
```

(Another optimization to consider is "starting at the smallest possible maximum" by doing a search for our target. In fact we could do a binary search.)

Now let's pretend it's not sorted.

```
hasPairSum(16, [1,11,7,9,6]);
```

Well now we could just sort it, then do ratcheting, in which case we have O(n * log n) (for our sorting) plus O(n) for ratcheting pair sum, i.e. O(n * log n).

Can we do better?

Precompute all posibilities and store in hash table O(n^2) "upfront cost", but afterward for repeated executions, this would be O(1).

What if we don't have repeated executions?

Loop throught the array and store the target minus each number. As you continue, just see if anything is in that store.

```
// O(n) time, O(n) extra space
function hashLookupPairSum (target, arr) {
  const cache = {};
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    if (cache.hasOwnProperty(num)) {
      return true;
    }
    cache[target - num] = true;
  }
  return false;
}

// O(n) time, O(n) extra space
function setLookupPairSum (target, arr) {
  const set = new Set();
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    if (set.has(num)) {
      return true;
    }
    set.add(target - num);
  }
  return false;
}
```

## "Dynamic programming"
- Overlapping subproblems
- Reuse old solutions during the algorithm, or you can build up solutions from the ground
- Bottom-to-top (tend to iterative), or top-to-bottom (tend to be recursive) alternatives

## Memoization
- Keep track of inputs corresponding to outputs
- If you see those inputs agian, immediately return the output
- Can be useful if the call tree is big and repetitive

Example: find the "nth" fibonacci number. Fibonacci sequence: `[0, 1, 1, 2, 3, 5, 8, 13, 21, ...]` (add previous two numbers).

```
// O(2^n)
function fibonacci (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// O(n), O(1) for repeated execution
const cache = {
  0: 0,
  1: 1
};
function memoizedFib (n) {
  if (cache.hasOwnProperty(n)) {
    return cache[n];
  }
  const computed = memoizedFib(n - 1) + memoizedFib(n - 2);
  cache[n] = computed;
  return computed;
}
// stateless (no extra-functional) cache
function memoizedFib (n, cache = {0: 0, 1: 1}) {
  if (cache.hasOwnProperty(n)) {
    return cache[n];
  }
  const computed =
    memoizedFib(n - 1, cache) + (1)
    memoizedFib(n - 2, cache); (1)
  cache[n] = computed;
  return computed;
}

// O(n) time, O(1) extra space
function dynamicBottomToTopFib (n) {
  const prevPrevvalue = 0;
  const prevValue = 1;
  const currentValue;
  for (let i = 2; i < n; i++) {
    const oldCurrentValue = currentValue;
    currentValue = prevValue + prevPrevValue;
    prevValue = oldCurrentValue;
    prevPrevValue = prevValue;
  }
  return currentValue;
}
```

## "Marginal" gains
- Know the difference between shifting the big O runtime and not
- Still important to consider
- Handle special cases
- Break out of loops as soon as possible
- Starting your loops as late as possible

## Try it manually
- Pretend you were asked to do this problem by hand
- Note: this process can be slow, and often not ideal for interview context
