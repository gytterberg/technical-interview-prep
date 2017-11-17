
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
 * @param {Number}            idx      index to start at
 * @param {[...Number]}       seq      sequence so far
 * @param {Map}               memo     the longest subsequence at each
 *                                     index that contains that index.
 */
function lis(nums, idx = 0, seq=[], memo = new Map()) {
  // Base case: at the end of the array, the longest
  // increasing subsequence is empty.
  if (idx === nums.length) return [];

  const num = nums[idx];

  // Find the longest sequence that doesn't include us.
  const whenExcluded = lis(nums, idx + 1, seq, memo);
  
  // Get the previous number in the sequence
  const prev = seq.length > 0 ? seq[seq.length - 1] : -Infinity

  // If we're smaller than the previous number in the sequence,
  // we can't be included, so just return that.
  if (num <= prev) return whenExcluded;

  // If we've visited this index before, return the result we computed then.
  if (memo.has(idx)) {
    return memo.get(idx)
  }

  whenIncluded = [num, ...lis(nums, idx + 1, [...seq, num], memo)];

  return whenIncluded.length > whenExcluded.length
    ? memo.set(idx, whenIncluded)
    : memo.set(idx, whenExcluded)
}

assert.deepEqual(lis([10, 2, 3, 6, 8, 12]), [2, 3, 6, 8, 12])