
const Map = require('./memo')
    , assert = require('assert')

/**
 * Returns the longest increasing subsequence of numbers from an array.
 * The subsequence need not be continuous.
 * 
 * Example:
 * 
 *   lis([10, 2, 3, 6, 8, 12]) -> [2, 3, 6, 8, 12]
 *   lis([9, 2, 1, 0, 3, -1, -3, 5, 6, 7]) -> [2, 3, 5, 6, 7]
 * 
 * @param {[...Number]}       nums the numbers in question
 * @param {Index}             idx      index to start at
 * @param {[...Number]}    base     smallest number to include in sequence
 */
function lis(nums, idx = 0, base = -Infinity, memo = new Map()) {
  if (idx === nums.length) return 0;

  const num = nums[idx];

  // Find the longest sequence that doesn't include us.
  const whenExcluded = lis(nums, idx + 1, base, memo);

  // If we're smaller than the base of the se
  if (num <= base) return whenExcluded;

  if (memo.has(idx)) {
    return memo.get(idx)
  }

  whenIncluded = 1 + lis(nums, idx + 1, num, memo);
  memo[idx] = whenIncluded;
  return memo.set(idx, Math.max(whenIncluded, whenExcluded))
}

assert.equal(lis([10, 2, 3, 6, 8, 12]), 5)