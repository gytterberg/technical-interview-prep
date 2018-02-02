# Prompt

Given an an array of numbers, find the length of the longest possible subsequence that is increasing. This subsequence can "jump" over numbers in the array. For example in `[3, 10, 4, 5]` the longest increasing subsequence is `[3, 4, 5]` and the function should return its length, `3`.

# Examples

```js
longestIncreasingSubsequence([3, 4, 2, 1, 10, 6]);
// should return 3, the length of the longest increasing subsequence:
// 3, 4, 6 (or 3, 4, 10)
longestIncreasingSubsequence([10, 22, 9, 33, 20, 50, 41, 60, 80]);
// should return 6, the length of the maximum increasing subsequence:
// 10, 22, 33, 41, 60, 80 (or 10, 22, 33, 50, 60, 80)
longestIncreasingSubsequence([10, 22, 9, 33, 20, 50, 41, 60, 80, 21, 23, 24, 25, 26, 27, 28]);
// should return 9, the length of the maximum increasing subsequence:
// 10, 20, 21, 23, 24, 25, 26, 27, 28
```

# Solutions

Dynamic programming (also known as dynamic optimization) is a method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions. The next time the same subproblem occurs, instead of recomputing its solution, one simply looks up the previously computed solution, thereby saving computation time at the expense of a (hopefully) modest expenditure in storage space. (Each of the subproblem solutions is indexed in some way, typically based on the values of its input parameters, so as to facilitate its lookup.)

There are two dynamic solutions:

1. with an array to store solution for each index of the array:

In this solution, we create an array `Lengths` of equal length to arr, in which we store the maximum increasing subsequence found till this point for each element of arr. We then leverage `Lengths` and its stored solutions to find the next maximum increasing subsequence.
We then return the maximum of `Lengths`.

Time complexity is O(n^2) with an O(n) space complexity.

```js
function iterativeLIS(arr) {
  const lengths = new Array(arr.length).fill(1);
  
  for (let i = 1; i < arr.length; i++) {
    for (let j = 0; j < i; j++) {
      //check 1: are we in an increasing sequence?
      const isIncreasing = arr[j] < arr[i];
      //check 2: what would be the arr[i]'s sequence length if we added arr[j]'s subsequence to it?
      //lengths[j] is the longest sequence so far that includes arr[j], so we should build upon that
      const sequenceLength = lengths[j] + 1;
      //check 3: is the subsequence that include arr[j] and it's longest subsquence + arr[i] LONGER than 
      //the longest subsequence we have save in lengths for arr[i] at lengths[i]?
      const isLonger = sequenceLength > lengths[i];
      
      //if check 1 and check 3 are true, save that new length to the lengths array at lengths[i]
      if (isIncreasing && isLonger) {
        lengths[i] = sequenceLength;
      }
    }
  }
  return Math.max(...lengths);
}
```

2. With memoization:

This recursive solution steps through each number, considering two possibilities: excluding it from the subsequence and including in the subsequence. Thus each element generates two possible paths, both of which continue on to the next element, which generates two possible paths, etc.

```js
function memoizedLIS (nums, idx = 0, base = -Infinity, memo = {}) {
  if (idx === nums.length) return 0;
  const num = nums[idx];
  const whenExcluded = memoizedLIS(nums, idx + 1, base, memo);
  if (num <= base) return whenExcluded;
  let whenIncluded;
  if (memo.hasOwnProperty(idx)) {
    whenIncluded = memo[idx];
  } else {
    whenIncluded = 1 + memoizedLIS(nums, idx + 1, num, memo);
    memo[idx] = whenIncluded;
  }
  return Math.max(whenIncluded, whenExcluded);
}
```

Notice that we're only memoizing the `whenIncluded` results. That's because we can have very different possibilities for the `whenExcluded` branches—they're not straightforward to cache.

There is a brute force approach that would involve checking all possible combinations. There are many ways that would be better. Without memoization we would expect this to be `O(2^n)` time complexity.

```js
function longestIncreasingSubsequence (nums, idx = 0, base = -Infinity) {
  if (idx === nums.length) return 0;
  const num = nums[idx];
  const whenExcluded = longestIncreasingSubsequence(nums, idx + 1, base);
  if (num <= base) return whenExcluded;
  const whenIncluded = 1 + longestIncreasingSubsequence(nums, idx + 1, num);
  return Math.max(whenIncluded, whenExcluded);
}
```