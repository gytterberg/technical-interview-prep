# Pair Sum

## Interviewer Prompt
Given an array `arr` consisting of `N` integers, sorted in ascending order (least to greatest), and a separate number (a `sum`), determine if any 2 numbers in the array add up to the sum. Return `true` if any 2 different numbers within the array add up to sum. Return `false` if no 2 numbers in the array add up to sum.


## Examples

```js
pairSum([1, 1, 2, 3, 4, 5], 7) -> true (either 2+5 or 3+4)
pairSum([1, 2, 3, 4, 5], 10) -> false
pairSum([0, 2, 3, 6, 9, 10], 10) -> true (0 + 10)
pairSum([1, 2, 3, 7, 8], 7) -> false
pairSum([-2, 0, 4, 6, 10], 8) -> true (-2 + 10)
pairSum([1, 2, 3, 4, 5], 2) -> false
```

_Examples - Edge cases_

```js
pairSum([1], 2) -> false
pairSum([2], 2) -> false
pairSum([], 1) -> false
```

# Brute force Solution

## Approach: __Nested loops__

The easiest way to approach this problem is looping over the given array, fixing an element at position `i` and looping over it again, from `i+1` up to element at `N-1` position, adding the fixed element to the current one. If it matches `sum` returns `true`. Otherwise, continue the loop up to the end of the array. If there is no match, return `false`

## Code

```js
function pairSum(arr, sum) {
  for (let i = 0; i < arr.length-1; i++) {
    const fixed = arr[i]
    for (let j = i+1; j < arr.length; j++) {
      const current = arr[j]
      if (fixed + current === sum) {
        return true
      }
    }
  }
  return false
}
```
## Performance analysis

### Time Complexity: __O(N^2)__
- In the first loop, `i` runs from `N-2` steps. We can consider `N` interations.
- In the neasted loop, in the first interation, `j` runs for `N-2` steps. The second time, it's `N-3`. And so on.
- Considering both points about, it means the code iterates through each pair of values for `(i,j)` where `j` is bigger than `i`. When N = 6, those are the pairs:

```js
(0,1) (0,2) (0,3) (0,4)
      (1,2) (1,3) (1,4)
            (2,3) (2,4)
                  (3,4)
```

The size of this matrix is half of a `N-2 x N-2` matrix or `((N-2)ˆ2)/2`. Dropping all constants, we end with a complexity of `N^2`

### Space Complexity: __O(1)__
- The memory needed doesn't increase based on the size of the input.

# Optimized Solution

## Approach: __Pointers__

The main hint in the prompt to devise an optimized approach is that the numbers are sorted in ascending order. With that information, it's possible to create two `pointers`:
 - One pointing to the element at position `0`, that can be called `leftPointer`
 - Another one pointing to the element at position `N-1`, that can be called `rightPointer`

And using a while loop, it's possible to add the elements in the given array at `leftPointer` and `rightPointer` and compare it with `sum`. Based on the result, the possible outcomes are:

  1. They are equals, function returns `true`;
  2. The sum of the elements is smaller than `sum`, `leftPointer` is increased by one;
  3. The sum of the elements is greater than `sum`, `rightPointer` is decreased by one;

The loop should breaks out when `leftPointer` and `rightPointer` are equals, meaning all the possible sum for two elements in the array were evaluated. At this point, function can return `false`.

_visualizing the steps_

```js
input: arr = [1,3,4,5] sum = 7

                *     *
1. interation: [1,3,4,5] -> currentSum = 6 < sum -> move left pointer
                  *   *
2. interation: [1,3,4,5] -> currentSum = 8 > sum -> move right pointer
                  * *
3. interation: [1,3,4,5] -> currentSum = 7 === sum -> return true


```

## Code

```js
  function pairSum(arr, sum) {
  let leftPointer = 0
  let rightPointer = arr.length - 1
  while (leftPointer < rightPointer) {
    const currentSum = arr[leftPointer] + arr[rightPointer]
    if (currentSum === sum) {
      return true
    } else if (currentSum < sum) {
      leftPointer++
    } else {
      rightPointer--
    }
  }
  return false
}
```

## Performance analysis

### Time Complexity: __O(N)__
  - In the worst case, when there is no pair that adds up to the sum, the while loop will visit all the elements in the array only once.

### Space Complexity: __O(1)__
- The memory needed doesn't increase based on the size of the input.

# Possible Extended Question
The brute for solution works for non sorted ingeters, but the optmized solution doesn't. How can we create a solution where the time complexity is the same one as in the optimized solution, but the integers are not sorted?

## Examples

```js
pairSum([1, 5, 2, 4, 3, 1], 7) -> true
pairSum([5, 3, 2, 4, 1], 10) -> false
```

## Approach: __Using a map__

Instead of looking for pairs, it's possible to look for target values, considering the following:

`target = sum - arr[i]`

Using a `map`, we can use an object to store all the target values.

Given that, it's possible to loop over the given array, and for every value on it perform the follow:
  - check if the current value is already in the `map`. If so, it means it can be added to a previous element to add up to the `sum` and the function can return `true`;
  - Store the target value for the current element in the `map`.

If the loop breaks out without finding any match, the function returns `false`.

## Code

```js
function pairSum(arr, sum) {
  const targetMap = {}
  for (let i = 0; i < arr.length; i++) {
    const target = sum - arr[i]
    if (targetMap[arr[i]]) {
      return true
    } else {
      targetMap[target] = true
    }
  }
  return false
}
```

## Performance analysis

### Time Complexity: __O(N)__
- In the worst case, `i` runs for `N` steps.

### Space Complexity: __O(N)__
- In the worst case, a new key will be added to `targetMap` for all elements (`N`) in the array
