# Prompt

Given an an array of numbers, find the length of the longest possible subsequence that is increasing. This subsequence can "jump" over numbers in the array. For example in `[3, 10, 4, 5]` the longest increasing subsequence is `[3, 4, 5]`.

# Examples

```js
longestIncreasingSubsequence([3, 4, 2, 1, 10, 6]);
// should return 3, the length of the longest increasing subsequence:
// 3, 4, 6
longestIncreasingSubsequence([10, 22, 9, 33, 20, 50, 41, 60, 80]);
// should return 6, the length of the maximum increasing subsequence:
// 10, 22, 33, 41, 60, 80 (or 10, 22, 33, 50, 60, 80)
longestIncreasingSubsequence([10, 22, 9, 33, 20, 50, 41, 60, 80, 21, 23, 24, 25, 26, 27, 28]);
// should return 9, the length of the maximum increasing subsequence:
// 10, 20, 21, 23, 24, 25, 26, 27, 28
```

# Solutions

There is a brute force approach that would involve checking all possible combinations. There are many ways that would be better.

Below is a recursive solution that steps through each number, considering two possibilities: excluding it from the subsequence and including in the subsequence. Thus each element generates two possible paths, both of which continue on to the next element, which generates two possible paths, etc. Therefore, without memoization we would expect this to be `O(2^n)` time complexity.

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

With memoization:

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
