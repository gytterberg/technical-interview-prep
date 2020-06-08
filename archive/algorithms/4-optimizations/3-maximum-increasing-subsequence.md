# Prompt

Given an an array of numbers, find the length of the longest possible subsequence that is increasing. This subsequence can "jump" over numbers in the array. For example in `[3, 10, 4, 5]` the longest increasing subsequence (LIS) is `[3, 4, 5]`.

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

# Solution and Explanation (a)

Here is a brute force, recursive approach that would involve checking all possible combinations. We would expect this to be `O(2^n)` time complexity with `O(n)` space complexity due to the depth of the call stack.

```js
function longestIncreasingSubsequence (sequence, idx = 0, base = -Infinity) {
  if (idx === sequence.length) return 0;
  const num = sequence[idx];
  const whenExcluded = longestIncreasingSubsequence(sequence, idx + 1, base);
  if (num <= base) return whenExcluded;
  const whenIncluded = 1 + longestIncreasingSubsequence(sequence, idx + 1, num);
  return Math.max(whenIncluded, whenExcluded);
}
```

# Solution and Explanation (b)

Dynamic programming (also known as dynamic optimization) is a method for solving a complex problem by breaking it down into a collection of simpler subproblems, solving each of those subproblems just once, and storing their solutions. The next time the same subproblem occurs, instead of recomputing its solution, one simply looks up the previously computed solution, thereby saving computation time at the expense of a (hopefully) modest expenditure in storage space. (Each of the subproblem solutions is indexed in some way, typically based on the values of its input parameters, so as to facilitate its lookup.)

In this solution, we create an array `lengths` of equal length to arr, in which we store the length of the LIS found till this point for each element of sequence. We then leverage `lengths` and its stored solutions to find the next longest increasing subsequence.
We then return the maximum of `lengths`.

Time complexity is O(n^2) with an O(n) space complexity.

```js
function iterativeLIS(sequence) {
  const lengths = new Array(sequence.length).fill(1);
  
  for (let i = 1; i < sequence.length; i++) {
    for (let j = 0; j < i; j++) {
      //check 1: are we in an increasing sequence?
      const isIncreasing = sequence[j] < sequence[i];
      //check 2: what would be the sequence[i]'s sequence length if we added sequence[j]'s subsequence to it?
      //lengths[j] is the longest sequence so far that includes sequence[j], so we should build upon that
      const sequenceLength = lengths[j] + 1;
      //check 3: is the subsequence that include sequence[j] and it's longest subsquence + sequence[i] LONGER than 
      //the longest subsequence we have save in lengths for sequence[i] at lengths[i]?
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

# FOR LATER, IN-DEPTH, INDEPENDENT REVIEW

**This will not be discussed during REACTO, but will act as a resource for independent study**

There is a loglinear solution using binary search:
For each item in the sequence (length `n`) we do a binary search (`log(n)`), giving us a total runtime of `n * log(n)`

Create an array (`lastIndicesOfSubByLength` or just `sub` for now) whose indices correspond to the length of the longest found subsequence; in each store the index of the smallest, final integer from the original sequence that terminates our increasing subsequence of that length

We need to iterate through every index of the input sequence (`sequence` or just `seq` for now) and do the following:
- If `seq[i]` > `sub[lastElement]`, then append `seq[i]` to the end of `sub` (our longest subsequence is 1 longer, so we need another index in `sub`, with a terminating index of `i`)
- Otherwise we need to find the smallest element corresponding to a `terminatingIndex` in `sub`, which is >= than `seq[i]`, and change it to `seq[i]`. `sub` is sorted, so the element can be found using binary search.

Now let's do a real example:

`seq` = [3,8,4,6,1,3,12,7,10]

What we will do:
- `sub` = [] -> Initialize `sub` to empty array
- `sub` = [empty, 3] -> New largest LIS (LIS with length of 1 (the index) terminates with 3)
- `sub` = [empty, 3, 8] -> New largest LIS (LIS with length of 2 (the index) terminates with 8)
- `sub` = [empty, 3, 4] -> Changed 8 to 4 (8 is the smallest integer that is larger than our `i`. Now our LIS with length of 2 (the index) terminates with 4)
- `sub` = [empty, 3, 4, 6] -> New largest LIS (LIS with length of 3 (the index) terminates with 6)
- `sub` = [empty, 1, 4, 6] -> Changed 3 to 1 (3 is the smallest integer that is larger than our `i`. Now our LIS with length of 1 (the index) terminates with the smallest integer thus far which is 1)
- `sub` = [empty, 1, 3, 6] -> Changed 4 to 3 (4 is the smallest integer that is larger than our `i`. Now our LIS with length of 2 (the index) terminates with 3)
- `sub` = [empty, 1, 3, 6, 12] -> New largest LIS (LIS with length of 4 (the index) terminates with 12)
- `sub` = [empty, 1, 3, 6, 7] -> Changed 12 to 7 (12 is the smallest integer that is larger than our `i`. Now our LIS with length of 4 (the index) terminates with 7)
- `sub` = [empty, 1, 3, 6, 7, 10] -> New largest LIS (LIS with length of 5 (the index) terminates with 10)
So the length of the LIS is 5 because that is the length of our `sub` array.

Note that `sub` is sorted, so when we determine where our new `seq[i]` fits in our search will be a binary search!

When implementing `sub`, we will keep not the actual integers, but their index in relation to `seq`. i.e. instead of [empty, 1, 3, 6, 7, 10] we will have [empty, 4, 5, 3, 7, 8]. `seq[4]=1`, `seq[5]=3`, `seq[3]=6`, `seq[7]=7`, `seq[8]=10`.

We will still be able to do a binary search; however, we will have an extra step of finding the corresponding integer in `seq` from the indices we are storing in `sub` (i.e. `seq[sub[i]]`).

```js
function findLongestPrefixLength (currentIndex) { // binary search, O(log n)
  let low = 1;
  let high = maxSubLength;
  
  while (low <= high) {
    const mid = Math.ceil((low + high) / 2);
    if (sequence[lastIndicesOfSubByLength[mid]] < sequence[currentIndex]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  
  // after searching, low is 1 greater than the length of the longest *prefix* of `sequence[currentIndex]`
  return low - 1;
}

function longestIncreasingSubsequence (sequence) {
  let maxSubLength = 0;
  
  // Let lastIndicesOfSubByLength[pos] be defined as the smallest integer (by index) that ends an increasing subsequence of length `pos`
    // So we are keeping track of the index at which the longest subsequence of a given length terminates 
    // i.e. with the subsequence 1,3,5, if 5 is found at index 9, then index 3 (the length) would store the value 9 (lastIndicesOfSubByLength[3] = 9)
  const lastIndicesOfSubByLength = [];
  
  /*
    If the `currentIndex` correlates to the largest integer in the sequence thus far, 
    this search will return a low that will be equivalent to the `maxSubLength` found thus far.
    Because this integer is something we want to add to our LIS

    If it does not, then we will find the smallest element that is larger than `sequence[currentIndex]`. 
    We find this through a binary search on `lastIndicesOfSubByLength`,
    which is already sorted smallest to largest, but stores indices that must be looked up in `sequence` to determine their integer value.
  */
  
  for (let i = 0; i < sequence.length; i++) { // O(n)
    // find the length of the longest prefix that terminates with a number less than the current one
    const longestPrefixLength = findLongestPrefixLength(i);
    // add one to include our current one
    const longestAtCurrentIndex = longestPrefixLength + 1;
    
    if (longestAtCurrentIndex > maxSubLength) {
      maxSubLength = longestAtCurrentIndex;
    }
    
    lastIndicesOfSubByLength[longestAtCurrentIndex] = i;
  } 
  
  return maxSubLength;
}
```

## With Returning Subsequence Instead of Length

We will be doing the same as before, but with another array to help us keep track of predecessors.

Now let's do a real example (again):

`seq` = [3,8,4,6,1,3,12,7,10]

Note `predecessors[i] = sub[longestAtCurrentIndex - 1]` (refer to code below for understanding `longestAtCurrentIndex`)

What we will do (this time using indices for `sub`):
- `sub` = [empty]
- `i` = 0; `sub` = [empty, 0]; `predecessors` = [empty]
- `i` = 1; `sub` = [empty, 0, 1]; `predecessors` = [empty, 0]
- `i` = 2; `sub` = [empty, 0, 2]; `predecessors` = [empty, 0, 0]
- `i` = 3; `sub` = [empty, 0, 2, 3]; `predecessors` = [empty, 0, 0, 2]
- `i` = 4; `sub` = [empty, 4, 2, 3]; `predecessors` = [empty, 0, 0, 2, empty]
- `i` = 5; `sub` = [empty, 4, 5, 3]; `predecessors` = [empty, 0, 0, 2, empty, 4]
- `i` = 6; `sub` = [empty, 4, 5, 3, 6]; `predecessors` = [empty, 0, 0, 2, empty, 4, 3]
- `i` = 7; `sub` = [empty, 4, 5, 3, 7]; `predecessors` = [empty, 0, 0, 2, empty, 4, 3, 3]
- `i` = 8; `sub` = [empty, 4, 5, 3, 7, 8]; `predecessors` = [empty, 0, 0, 2, empty, 4, 3, 3, 7]

```js
function findLongestPrefixLength (currentIndex) { // binary search, O(log n)
  let low = 1;
  let high = maxSubLength;
  
  while (low <= high) {
    const mid = Math.ceil((low + high) / 2);
    if (sequence[lastIndicesOfSubByLength[mid]] < sequence[currentIndex]) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  
  // after searching, low is 1 greater than the length of the longest *prefix* of `sequence[currentIndex]`
  return low - 1;
}

function longestIncreasingSubsequence (sequence) {
  let maxSubLength = 0;
  
  // Let lastIndicesOfSubByLength[pos] be defined as the smallest integer (by index) that ends an increasing subsequence of length `pos`
    // So we are keeping track of the index at which the longest subsequence of a given length terminates 
    // i.e. with the subsequence 1,3,5, if 5 is found at index 9, then index 3 (the length) would store the value 9 (lastIndicesOfSubByLength[3] = 9)
  const lastIndicesOfSubByLength = [];
  
  // keep track of predecessors if you want to regenerate and return the actual subsequence
    // `predecessors` will be equal in length to `sequence`
    // Each `i` will correspond to the index of the predecessor of `sequence[i]`
  const predecessors = [];
  
  for (let i = 0; i < sequence.length; i++) { // O(n)
    // find the length of the longest prefix that terminates with a number less than the current one
    const longestPrefixLength = findLongestPrefixLength(i);
    // add one to include our current one
    const longestAtCurrentIndex = longestPrefixLength + 1;
    
    if (longestAtCurrentIndex > maxSubLength) {
      maxSubLength = longestAtCurrentIndex;
    }
    
    lastIndicesOfSubByLength[longestAtCurrentIndex] = i;

    predecessors[i] = lastIndicesOfSubByLength[longestAtCurrentIndex - 1];
  } 
  
  const subsequence = [];
  let currentSubsequenceIndex = lastIndicesOfSubByLength[maxSubLength];
  
  for (let i = maxSubLength - 1; i >= 0; i--) {
    subsequence[i] = sequence[currentSubsequenceIndex];
    // reassign the index we are looking at based on predecessor array
    currentSubsequenceIndex = predecessors[currentSubsequenceIndex];
  }
  
  return subsequence;
}
```
