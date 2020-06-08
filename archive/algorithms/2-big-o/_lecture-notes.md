# Big O (not just my nickname during middle school)

## What is it?
- Complexity of an algorithm (time or space)
- Gets at efficiency/performance
- "Order of magnitude", rough size, "fuzzy"
- Upper bound
- How the time/space/other resource needs change as something about the input changes
- Inputs that are "arbitrarily" large

```
// O(n) where n is size of the array
// also technically correct: O(2^n), O(n!), O(n^2), O(n*log n ^ sqrt(n))
function logElems (arr) {
  arr.forEach(elem => {
    console.log(elem);
  });
}
```

## What it isn't?
- Technically not the "tight bound" (which is called "big theta"), it's the upper bound
- Not necessarily about the best case, not necessarily about the worst case. As in, it can describe any case.
- Not useful when input is small
- NOT TIME or SPACE, it is divorced from actual execution of the algorithm
- Does not *have to* relate to code
- It does not describe problems, it *does* describe solutions
- No real units

## General process
- Count the steps
  - Anytime you hit a loop, multiply `numberOfTimesWeIterate` by `maxComplexityOfAnythingInsideTheLoop`
  - Stuff inside loops multiplies
  - Nested loops: multiply
  - Sibiling loops: add
- Drop the constants
- Drop the less significant terms

```
function shuffle(arr) { // O(n) where n is the array size
  var last, rand, temp, // O(1)
    i = arr.length; // O(1)
  while(i--) { // O(n * 1) where n is the array size
    last = arr[i]; // O(1)
    rand = Math.floor(Math.random()*i); // O(1)
    temp = arr[i]; // O(1)
    arr[i] = arr[rand]; // O(1)
    arr[rand] = temp; // O(1)
  }
  return arr; // O(1)
}
```

## Common ones
- O(1): constant
- O(log n): logarthmic complexity
- O(n): linear
- O(n*log n): log-linear
- O(n^2): quadtratic
- O(n^3), O(n^2), O(n^4): polynomial
- O(2^n): exponential complexity
- O(n!): factorial

## Multivariate
- Don't confuse independent terms
- Don't drop independent terms

```
function intersection (arrA, arrB) { // O(n*p)
  const intersected = []; // O(1)
  for (let i = 0; i < arrA.length; i++) { // O(n * p) where n is arrA size
    for (let j = 0; j < arrB.length; j++) { // O(p * 1) => O(p) where p is arrB size
      if (arrA[i] === arrB[j]) { // O(1)
        intersected.push(arrA[i]); // O(1)
      }
    }
  }
  return intersected; // O(1)
}
```

## Space complexity
- Really: memory
- Otherwise the process is very similar to the process for deriving time complexity, except you "count the space"
- Generally "extra" space

## Recursion
- Diagram the call tree, then try to determine its size
- Reason about it

## Examples for students to try


```
// O(n) time
// O(1) extra space
// (O(n) total space)
function reverse (arr) {
  for (let leftIdx = 0; leftIdx < arr.length / 2; leftIdx++) {
    const rightIdx = arr.length - 1 - leftIdx;
    const left = arr[leftIdx];
    const right = arr[rightIdx];
    arr[leftIdx] = right;
    arr[rightIdx] = left;
  }
  return arr;
}
```

```
// O(n + p) time
// O(n + p) space
function concatenate (arrA, arrB) {
  const merged = [];
  arrA.forEach(elemA => {
    merged.push(elemA);
  });
  arrB.forEach(elemB => {
    merged.push(elemB);
  });
  return merged;
}
```

```
// O(log n) time where n is upto
function printPowersOfTwo (upto) {
  for (let i = 1; i <= upto; i *= 2) {
    console.log(i);
  }
}
```

```
// O(n) time where n is n
// O(2^n) time
// O(n) space
function nthFibonacciNumber (n) {
  if (n === 0) return 0;
  else if (n === 1) return 1;
  return nthFibonacciNumber(n - 1) + nthFibonacciNumber(n - 2);
}
/*
          f(3)
          /  \
        f(2)  f(1)
       /  \   /  \
    f(1) f(0)f(0) f(-1)

Memoization can help here O(n). Memoization: storing previous results of a function for use later.
*/
```

```
// O(10^n) time where n is the length
// O(n) space where n in the length
// assuming `submitOneAttempt` takes a string and returns a boolean
function guessNumericPassword (length, submitOneAttempt) {
  let n = 0;
  let attempt = '';
  while (attempt.length <= length) {
    attempt = padLeftWithZeroes('' + n, length);
    const isPassword = submitOneAttempt(attempt);
    if (isPassword) return attempt;
    n++;
  }
  throw new Error('Nothing worked!');
}

function padLeftWithZeroes (str, minTotalLength) {
  const zeroesNeeded = minTotalLength - str.length;
  if (zeroesNeeded <= 0) return str;
  return '0'.repeat(zeroesNeeded) + str;
}
```
